import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './Home.jsx';
import {OutsideClub} from './OutsideClub.jsx';
import {Invite} from './Invite.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Routes */}
        <div className='route-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<OutsideClub />} />
            <Route path="/2026/invite" element={<Invite />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
