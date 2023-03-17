import React, { useState } from 'react';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as ArrowIcon } from '../../assets/svg/ico-arrow-down.svg';

import './style.scss';

interface ITabSelectorProps {
  activeTab: String,
  tabs: String[],
  selectTab: (tab: String) => void,
}

const TabSelector = ({
  activeTab,
  tabs,
  selectTab,
} : ITabSelectorProps) => {
  const desktop = useMediaQuery({ minWidth: 768 });
  const [currentSelected, setCurrentSelected] = useState<String>(activeTab);
  const [isTabClosed, setIsTabClosed] = useState<boolean>(true);

  const onActiveClick = (tab: String) => {
    setCurrentSelected(tab);
    setIsTabClosed(true);
    selectTab(tab);
  };

  const desktopTab = (
    <ul className="tab">
      {
        tabs.map((tab, index) => (
          <li
            key={index}
            className={cn('item', { active: tab === currentSelected })}
            onClick={() => onActiveClick(tab)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') {
                return;
              }
              onActiveClick(tab);
            }}
            role="presentation"
          >
            {tab}
          </li>
        ))
      }
    </ul>
  );

  const mobileTab = (
    <React.Fragment>
      <div
        className="mobile-tab-container"
        role="presentation"
        onClick={() => setIsTabClosed(!isTabClosed)}
      >
        <p className="title">{currentSelected}</p>
        <div
          role="presentation"
          className={cn('icon', { down: !isTabClosed })}
          onClick={() => setIsTabClosed(!isTabClosed)}
        >
          <ArrowIcon />
        </div>
      </div>
      {
        !isTabClosed && (
          <div className="mobile-tab-expanded">
            {
              tabs.map((tab, index) => (
                <div
                  key={index}
                  role="presentation"
                  onClick={() => onActiveClick(tab)}
                  className={cn('item', { active: tab === currentSelected })}
                >
                  <p>{tab}</p>
                </div>
              ))
            }
          </div>
        )
      }
    </React.Fragment>
  );

  return desktop ? desktopTab : mobileTab;
};

export default TabSelector;
