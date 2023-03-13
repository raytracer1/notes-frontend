import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './style.scss';

function Home() {
  const authStatus = useAppSelector((state) => state.auth.authenticated);

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
      <div className='body'>
        home
      </div>
    </div>
  );
}
  
export default Home;