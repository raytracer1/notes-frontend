import React, { PropsWithChildren, useEffect, useState } from 'react';
import Highlighter from 'web-highlighter';
import { Button } from 'reactstrap';
import { ReactComponent as IconAnnotate }  from '../../assets/svg/annotate.svg';
import { ReactComponent as IconCancel }  from '../../assets/svg/cancel.svg';
import './style.scss';

const PLACEHOLDER = '         ';

let curretAnnotate = {
  status: 'init',
  id: '',
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

const displayEdit = ($node: HTMLElement) => {
  const container = document.getElementById('annotation-edit');
  const offset = getPosition($node);
  if (container) {
    container.setAttribute('style',
      `top: ${offset.top + $node.offsetHeight + 2}px;
      left: ${offset.left + $node.offsetWidth / 2 - 135}px;
      visibility: visible`
    );
    const edit = document.getElementById('edit-box');
    if (edit) {
      edit.focus();
    }
  }
};

const disappearEdit = () => {
  const container = document.getElementById('annotation-edit');
  if (container) {
    container.setAttribute('style',
      'visibility: hidden'
    );
  }
};

const createAnnotate = (id: string, text: string) => {
  localStorage.setItem(`annotate-${id}`, text.slice(PLACEHOLDER.length));
};

interface IAnnotationProps {
}

const displayView = ($node: HTMLElement) => {
  const container = document.getElementById('annotation-view');
  const offset = getPosition($node);
  if (container) {
    container.setAttribute('style',
      `top: ${offset.top - $node.offsetHeight - 82}px;
      left: ${offset.left + $node.offsetWidth / 2 - 135}px;
      visibility: visible`
    );
  }
};

const disappearView = () => {
  const container = document.getElementById('annotation-view');
  if (container) {
    container.setAttribute('style',
      'visibility: hidden'
    );
  }
};

const Annotation = ({
  children,
} : PropsWithChildren<IAnnotationProps> ) => {

  const [curAnnotateEdit, setCurAnnotateEdit] = useState<string>(PLACEHOLDER);
  const [curAnnotateView, setCurAnnotateView] = useState<string>(PLACEHOLDER);

  const highlighter = new Highlighter({
    wrapTag: 'i',
    exceptSelectors: ['.annotation-edit', '.highlight'],
    style: {
      className: 'highlight',
    },
  });

  highlighter
  .on('selection:hover', ({id}) => {
    highlighter.addClass('highlight-wrap-hover', id);
    const nodes = highlighter.getDoms(id);
    const annotate = localStorage.getItem(`annotate-${id}`); 
    if (annotate) {
      setCurAnnotateView(annotate);
      displayView(nodes[0]);
    }
  })
  .on('selection:hover-out', ({id}) => {
    highlighter.removeClass('highlight-wrap-hover', id);
    disappearView();
  })
  .on('selection:create', ({sources}) => {
    sources.forEach(s => {
      const nodes = highlighter.getDoms(s.id);
      if (curretAnnotate.status === 'triggering') {
        highlighter.remove(curretAnnotate.id);
      }
      curretAnnotate.id = s.id;
      curretAnnotate.status = 'triggering';
      displayEdit(nodes[0]);
    });
  });

  useEffect(() => {
    const hightLightArea = document.getElementById('annotation-area');
    if (hightLightArea) {
      highlighter.setOption({
        $root: hightLightArea
      });
    }
    // highlighter.run();
  // eslint-disable-next-line
  }, []);

  const handleCancel = (e: any) => {
    e.preventDefault();
    highlighter.remove(curretAnnotate.id);
    curretAnnotate.status = 'init';
    curretAnnotate.id = '';
    disappearEdit();
    setCurAnnotateEdit(PLACEHOLDER);
  }

  const handleAnnotate = (e: any) => {
    e.preventDefault();
    if (curretAnnotate.status === 'triggering') {
      disappearEdit();
      setCurAnnotateEdit(PLACEHOLDER);
      createAnnotate(curretAnnotate.id, curAnnotateEdit);
      curretAnnotate.status = 'finished';
    }
  }

  return (
    <React.Fragment>
      <div id='annotation-area' className='annotation-area'>
        {children}
      </div>
      <div id='annotation-edit' className='annotation-edit'>
        <div className='buttons-container'>
          <Button color='primary'
            onClick={handleCancel}
          >
            <IconCancel />
          </Button>
          <Button color='primary'
            onClick={handleAnnotate}
            disabled={curAnnotateEdit === PLACEHOLDER}
          >
            <IconAnnotate />
          </Button>
        </div>
        <textarea
          className='edit-box'
          id='edit-box'
          value={curAnnotateEdit}
          onChange={(e) => {
            if (e.target.value.length >= PLACEHOLDER.length) {
              setCurAnnotateEdit(e.target.value)
            }
          }}
          rows={4}
        />
      </div>
      <div id='annotation-view' className='annotation-view'>
        <p>{curAnnotateView}</p>
      </div>
    </React.Fragment>
  )
}

export default Annotation;