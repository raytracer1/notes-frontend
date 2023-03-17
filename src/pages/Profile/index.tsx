import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getProfileAction,
} from '../../store/reducers/profile.reducer';
import { getMonthAndYear } from '../../util/dateHelper';
import Spinner from "../../components/Spinner";
import SpaceCard from "../../components/SpaceCard";
import imgError from '../../assets/image/error.png';
import './style.scss';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userName } = useParams();
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const getProfileStatus = useAppSelector((state) => state.profile.getProfile);
  const profile = useAppSelector((state) => state.profile.profile);

  useEffect(() => {
    if (userName) {
      dispatch(getProfileAction({userName: userName}));
    }
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!authenticated) {
      navigate('/');
    }
  // eslint-disable-next-line
  }, [authenticated]);

  return (
    <div className='profile'>
      <div className='profile-banner'></div>
      {
        getProfileStatus === 'pending' && (
          <div className='spinner-box'>
            <Spinner />
          </div>
        )
      }
      {
        getProfileStatus === 'failed' ? (
          <div>no such user</div>
        ) : (
          <div className='profile-container'>
            <div className='image-content'>
              <div className='image-box'>
                <img src={profile.user.imageUrl} alt='user'
                  onError={(e) => {
                    if (e.target) {
                      (e.target as HTMLImageElement).src = imgError;
                    }
                    e.preventDefault();
                  }}
                />
              </div>
              <span>{profile.user.userName}</span>
            </div>
            <div className='profile-content'>
              <div className='country'>{profile.user.country}</div>
              <div className='time'>
                member since {getMonthAndYear(profile.user.timeStamp)}
              </div>
            </div>
            <div className='activity-content'>
              <div className='title'>
                created space
              </div>
              <div className='space-cards'>
                {
                  profile.createdSpaces && (
                    profile.createdSpaces.map((item) => (
                      <SpaceCard key={item._id}
                        id={item._id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        description={item.description}
                        updatedAt={item.updatedAt}
                      />
                    ))
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Profile;