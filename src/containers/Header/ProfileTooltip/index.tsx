import _ from 'lodash';
import React, { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { AlignType } from "@rc-component/trigger";
import Tooltip from '../../../components/Tooltip';
import './style.scss';

/** Handles arrow placement of the Progressbar tooltip
 *  because rc-tooltip doesnot display arrow correctly
 *  for progressbar tooltip out of the box.
 */
function onPopupAlign(TooltipNode: HTMLElement, align: AlignType) {
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
      position='bottomRight'
      content={tip}
      className='tooltip'
      onPopupAlign={onPopupAlign}
      showArrow={false}
    >
      {children}
    </Tooltip>
  );
}
  
export default ProfileTooltip;