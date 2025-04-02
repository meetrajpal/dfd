import {Route, Routes, useLocation} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
