import { Route, Routes, Navigate } from "react-router-dom";
import Header from '../../containers/Header';
import Footer from '../../containers/Footer';
import Home from '../Home';
import Space from '../Space';
import Setting from '../Setting';
import Profile from '../Profile';
import './style.scss';

function Main() {
  return (
    <div className='main'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/space/:spaceId' element={<Space />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/profile/:userName' element={<Profile />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Main;