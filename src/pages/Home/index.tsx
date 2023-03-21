import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSpacesAction,
} from '../../store/reducers/space.reducer';
import ContentCard from "../../components/ContentCard";

import Spinner from "../../components/Spinner";
import './style.scss';

function Home() {
  const navigate = useNavigate();

  const authStatus = useAppSelector((state) => state.auth.authenticated);
  const getSpacesStatus = useAppSelector((state) => state.space.getSpaces);
  const spacesList = useAppSelector((state) => state.space.spacesList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSpacesAction());
    // eslint-disable-next-line
  }, []);

  return (
    <div className='home'>
      <div className='banner'>
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
        getSpacesStatus === 'pending' && (
          <div className='spinner-box'>
            <Spinner />
          </div>
        )
      }
      {
        getSpacesStatus === 'success' && spacesList && (
          <div className='content'>
            <div className='space-cards'>
              {
                spacesList.map((item: any) => (
                  <ContentCard key={item._id}
                    showImage={true}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    description={item.description}
                    updatedAt={item.updatedAt}
                    handleClick={() => {
                      navigate(`/space/${item._id}`);
                    }}
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