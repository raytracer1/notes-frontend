import { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useParams, useNavigate } from "react-router-dom";
import {
  getSpaceAction, joinSpaceAction, leaveSpaceAction
} from '../../store/reducers/space.reducer';
import Spinner from '../../components/Spinner';
import TabSelector from '../../components/TabSelector';
import { ReactComponent as IconBackLeft }  from '../../assets/svg/back-left.svg';
import imgError from '../../assets/image/demo.jpg';
import { getMonthAndYear } from '../../util/dateHelper';

import './style.scss';

const SETTINGS_TABS = [
  'posts',
  'joins',
  'related',
  'comments'
];

function Space() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.auth.authenticated);
  const user = useAppSelector((state) => state.auth.user);
  const getSpaceStatus = useAppSelector((state) => state.space.getSpace);
  const space = useAppSelector((state) => state.space.space.space);
  const join = useAppSelector((state) => state.space.space.join);

  const [tab, setTab] = useState<String>('posts');

  const isAuthor = user.userName === space.author.userName;

  useEffect(() => {
    if (spaceId) {
      dispatch(getSpaceAction({spaceId: spaceId}));
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [spaceId]);

  const joinStatus = () => {
    if (join)
      return !!(join.find((item) => item.user.userName === user.userName));
    else
      return false;
  }

  const handleJoin = (e:any) => {
    e.preventDefault();
    if (!spaceId)
      return;
    if (joinStatus() === false) {
      dispatch(joinSpaceAction({spaceId: spaceId}));
    } else {
      dispatch(leaveSpaceAction({spaceId: spaceId}));
    }
  }

  const handleEdit = (e:any) => {
    e.preventDefault();
    if (!spaceId)
      return;
    navigate(`/space/edit/${spaceId}`);
  }

  const ButtonUI = (
    !isAuthor ? (
      <Button color='primary'
        onClick={handleJoin}
      >
        {
          joinStatus() === false ? 'join' : 'leave'
        }
      </Button>
    ) : (
      <Button color='primary'
        onClick={handleEdit}
      >
        edit
      </Button>
    )
  );

  return (
    <div className='space'>
      {
        getSpaceStatus === 'pending' && (
          <div className='spinner-box'>
            <Spinner />
          </div>
        )
      }
      {
        getSpaceStatus === 'failed' ? (
          <div>no such space</div>
        ) : (
          <div className='space-container'>
            <div className='space-header'>
              <div className='name-container'>
                  <a href='/home'>
                    <div className='back-icon'><IconBackLeft /></div>
                  </a>
                <span>{space.name}</span>
              </div>
              <div className='btn-container'>
                {authStatus && ButtonUI}
              </div>
            </div>
            <div className='mobile-name'>
              <span>{space.name}</span>
            </div>
            <div className='space-description'>
              <div className='image-container'>
                <img src={space.imageUrl !== '' ? space.imageUrl : imgError}
                  alt='space icon'
                />
              </div>
              <div className='info-container'>
                <div className='author'>
                  <a href={`/profile/${space.author.userName}`}>
                    {space.author.userName}
                  </a>
                  {` created at ${getMonthAndYear(space.createdAt)}`}
                </div>
                <div className='prerequisites'>
                  prerequisites: {space.prerequisites}
                </div>
                <div className='description'>
                  decription:<br/>
                  <div className='description-content'>{space.description}</div>
                </div>
                <div className='keywords'>
                  keywords: {space.keywords}
                </div>
              </div>
            </div>
            <div className='space-content'>
              <TabSelector
                activeTab={tab}
                tabs={SETTINGS_TABS}
                selectTab={setTab}
              />
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Space;