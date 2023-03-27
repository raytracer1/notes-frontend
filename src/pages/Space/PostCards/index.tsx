import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getPostsAction
} from '../../../store/reducers/space.reducer';
import CreateCard from '../../../components/CreateCard';
import ContentCard from '../../../components/ContentCard';
import Spinner from '../../../components/Spinner';
import './style.scss';

interface IPostCardsProps {
  spaceId: string,
  isAuthor: boolean,
}

function PostCards({
  spaceId,
  isAuthor,
} : IPostCardsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getPostsStatus = useAppSelector((state) => state.space.getPosts);
  const posts = useAppSelector((state) => state.space.posts);

  useEffect(() => {
    dispatch(getPostsAction({spaceId: spaceId}));
    // eslint-disable-next-line
  }, [spaceId]);

  const handleCreate = (e:any) => {
    e.preventDefault();
    navigate(`/space/${spaceId}/post/create`);
  }

  return (
    <div className='post-cards-container'>
      <div className='post-cards'>
        {
          getPostsStatus === 'pending' && (
            <div className='spinner-box'>
              <Spinner />
            </div>
          )
        }
        {
          getPostsStatus === 'success' && (
            <React.Fragment>
              {
                isAuthor && (
                  <CreateCard handleClick={handleCreate}/>
                )
              }
              {  
                posts.postsList.length === 0 ? (
                  !isAuthor && (
                    <div className='no-posts'>No Posts</div>
                  )
                ) : (
                  posts.postsList.map((item: any) => (
                    <ContentCard key={item._id}
                      showImage={false}
                      name={item.title}
                      description={item.description}
                      updatedAt={item.updatedAt}
                      handleClick={() => {
                        navigate(`/post/${item._id}`);
                      }}
                    />)
                  )
                )
              }
            </React.Fragment>
          )
        }
      </div>
    </div>
  );
}

export default PostCards;