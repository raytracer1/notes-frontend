import { Route, Routes, Navigate } from "react-router-dom";
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Space from '../Space';
import './style.scss';

function Main() {
    return (
      <div className='main'>
        <Header />
        <div className='body'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/space' element={<Space />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }
  
export default Main;