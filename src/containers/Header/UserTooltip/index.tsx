import React, { PropsWithChildren } from "react";
import Tooltip from '../../../components/Tooltip';
import './style.scss';

interface IUserTooltipProps {
  handleLogout: () => void,
  userName: string,
}

const UserTooltip = ({
  handleLogout,
  userName,
  children,
} :  PropsWithChildren<IUserTooltipProps>) => {

  const tip = (
    <div className='content'>
      <ul>
        <li>
          <a href={`/profile/${userName}`}>my profile</a>
        </li>
        <li>
          <a href='/setting'>account setting</a>
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

export default UserTooltip;