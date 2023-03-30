import React, { PropsWithChildren, useEffect } from 'react';
import Highlighter from 'web-highlighter';
import { Button } from 'reactstrap';
import { ReactComponent as IconAnnotate }  from '../../assets/svg/annotate.svg';
import { ReactComponent as IconCancel }  from '../../assets/svg/cancel.svg';
import './style.scss';

let curretAnnotate = {
  status: 'init',
  id: '',
  text: '',
};

function getPosition($node: HTMLElement | null) {
  let offset = {
    top: 0,
    left: 0
  };
  let parent = $node;

  while (parent) {
    offset.top += parent.offsetTop;
    offset.left += parent.offsetLeft;
    parent = parent.offsetParent as HTMLElement;
  }

  return offset;
}

const displayButtons = (id: string, $node: HTMLElement, highlighter: Highlighter) => {
  const buttons = document.getElementById('annotation-buttons');
  const offset = getPosition($node);
  if (buttons) {
    buttons.setAttribute('style',
      `top: ${offset.top + $node.offsetHeight + 2}px;
      left: ${offset.left + $node.offsetWidth / 2 - 30}px;
      display: block`
    );
  }
};

const disappearButtons = () => {
  const buttons = document.getElementById('annotation-buttons');
  if (buttons) {
    buttons.setAttribute('style',
      'display: none'
    );
  }
};

const createAnnotate = (id: string, text: string) => {
  const lists = document.getElementById('annotation-list');
  if (lists) {
    const $div = document.createElement('div');
    $div.dataset['id'] = id;
    $div.textContent = text;
    lists.appendChild($div);
  }
};

interface IAnnotationProps {
}

const Annotation = ({
  children,
} : PropsWithChildren<IAnnotationProps> ) => {

  const highlighter = new Highlighter({
    wrapTag: 'i',
    exceptSelectors: ['.annotation-tip', '.highlight'],
    style: {
      className: 'highlight',
    },
  });

  // add some listeners to handle interaction, such as hover
  highlighter
  .on('selection:hover', ({id}) => {
    // display different bg color when hover
    highlighter.addClass('highlight-wrap-hover', id);
  })
  .on('selection:hover-out', ({id}) => {
    // remove the hover effect when leaving
    highlighter.removeClass('highlight-wrap-hover', id);
  })
  .on('selection:create', ({sources}) => {
    sources.forEach(s => {
      const nodes = highlighter.getDoms(s.id);
      if (curretAnnotate.status === 'triggering') {
        highlighter.remove(curretAnnotate.id);
      }
      curretAnnotate.id = s.id;
      curretAnnotate.status = 'triggering';
      curretAnnotate.text += ' ' + s.text;
      displayButtons(s.id, nodes[0], highlighter);
    });
  });

  useEffect(() => {
    const hightLightArea = document.getElementById('annotation-area');
    if (hightLightArea) {
      highlighter.setOption({
        $root: hightLightArea
      });
    }
    highlighter.run();
  // eslint-disable-next-line
  }, []);

  const handleCancel = (e: any) => {
    e.preventDefault();
    highlighter.remove(curretAnnotate.id);
    curretAnnotate.status = 'init';
    curretAnnotate.id = '';
    curretAnnotate.text = '';
    disappearButtons();
  }

  const handleAnnotate = (e: any) => {
    e.preventDefault();
    if (curretAnnotate.status === 'triggering') {
      disappearButtons();
      createAnnotate(curretAnnotate.id, curretAnnotate.text);
      curretAnnotate.status = 'finished';
      curretAnnotate.text = '';
    }
  }

  return (
    <React.Fragment>
      <div id='annotation-area' className='annotation-area'>
        {children}
      </div>
      <div className='annotation'>
        <div className='annotation-title'>
          annotation
        </div>
        <div className='annotation-list' id='annotation-list'>
        </div>
      </div>
      <div id='annotation-buttons' className='annotation-buttons'>
        <Button color='primary'
          onClick={handleCancel}
        >
          <IconCancel />
        </Button>
        <Button color='primary'
          onClick={handleAnnotate}
        >
          <IconAnnotate />
        </Button>
      </div>
    </React.Fragment>
  )
}

export default Annotation;