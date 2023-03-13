import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSpaceAction,
} from '../../store/reducers/space.reducer';
import SpaceCard from "../../components/SpaceCard";
import './style.scss';

function Home() {
  const authStatus = useAppSelector((state) => state.auth.authenticated);
  const getSpaceStatus = useAppSelector((state) => state.space.getSpace);
  const spaceList = useAppSelector((state) => state.space.spaceList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSpaceAction());
  }, []);

  return (
    <div className='home'>
      <div className='header'>
        <div className='description'>
          <h3>
            {
              authStatus ? "Join a learning space below" :
                "Sign up to start learning"
            }
          </h3>
        </div>
      </div>
      {
        getSpaceStatus === 'pending' && (
          <div className='spinner-box'>
            <div className='spinner'></div>
          </div>
        )
      }
      {
        getSpaceStatus === 'success' && spaceList && (
          <div className='body'>
            <div className='space-cards'>
              {
                spaceList.map((item) => (
                  <SpaceCard key={item._id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    description={item.description}
                    updatedAt={item.updatedAt}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
}
  
export default Home;