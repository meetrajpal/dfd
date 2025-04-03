import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import VerifyAccount from './VerifyAccount';
import Dashboard from './Dashboard';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {!['/verif-email', '/confirm-forgot-password', '/confirm-update-email'].includes(location.pathname) && <Header />}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/verify-email' element={<VerifyAccount />} />

      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
