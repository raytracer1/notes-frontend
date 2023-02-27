import React, { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import Tooltip from '../../../components/Tooltip';
import './style.scss';

/** Handles arrow placement of the Progressbar tooltip
 *  because rc-tooltip doesnot display arrow correctly
 *  for progressbar tooltip out of the box.
 */
function placeArrow(TooltipNode: Element) {
  const toolTip = TooltipNode as HTMLElement;
  toolTip.style.right = `${parseInt(toolTip.style.right, 10) + 20000}px`;
}

interface IProfileTooltipProps {
}

const ProfileTooltip = ({
  children,
} :  PropsWithChildren<IProfileTooltipProps>) => {

  const tip = (
    <div className='content'>
      <ul>
        <li>my profile</li>
        <li>log out</li>
      </ul>
    </div>
  )

  return (
    <Tooltip
      id='profile-tooltip'
      position='bottom'
      content={tip}
      className='tooltip'
      placeArrow={placeArrow}
    >
      {children}
    </Tooltip>
  );
}
  
export default ProfileTooltip;