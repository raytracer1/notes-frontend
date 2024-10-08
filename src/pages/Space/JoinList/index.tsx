import { getMonthAndYearAndDay, getHourAndMinute } from '../../../util/dateHelper';
import './style.scss';

interface IJoinListProps {
  joinList: {
    user: {
      userName: string,
    },
    createdAt: string,
  }[],
}

function JoinList({
  joinList
} : IJoinListProps) {

  return (
    <div className='join-lists-container'>
      <div className='join-lists'>
        <div className='join-list list-header'>
          <div className='user-name'>username</div>
          <div className='join-date'>join date</div>
        </div>
        {
          joinList.length === 0 ? (
            <div className='no-joins'>No Joins</div>
          ) : (
            joinList.map((item: any, index:number) => (
              <div className='join-list' key={index}>
                <div className='user-name'>
                  <a href={`/profile/${item.user.userName}`}>
                    {item.user.userName}
                  </a>
                </div>
                <div className='join-date'>
                  {getMonthAndYearAndDay(item.createdAt) + ' '}
                  {getHourAndMinute(item.createdAt)}
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default JoinList;