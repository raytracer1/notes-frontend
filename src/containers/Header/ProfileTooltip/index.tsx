import React, { PropsWithChildren } from "react";
import Tooltip from '../../../components/Tooltip';
import './style.scss';

interface IProfileTooltipProps {
  handleLogout: () => void,
  toggleProfileModal: () => void,
}

const ProfileTooltip = ({
  handleLogout,
  toggleProfileModal,
  children,
} :  PropsWithChildren<IProfileTooltipProps>) => {

  const tip = (
    <div className='content'>
      <ul>
        <li onClick={toggleProfileModal}>
          my profile
        </li>
        <li onClick={handleLogout}>
          log out
        </li>
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