import React, { PropsWithChildren } from "react";
import Tooltip from '../../../components/Tooltip';
import './style.scss';

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
      showArrow={false}
    >
      {children}
    </Tooltip>
  );
}
  
export default ProfileTooltip;