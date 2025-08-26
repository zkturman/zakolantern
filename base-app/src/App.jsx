import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import {Home} from './Home.jsx';
import {ChimeAction} from './ChimeAction.jsx';
import {JournalEntries} from './JournalEntries.jsx';
import {Invite} from './Invite.jsx';
import {InvestigationNotes} from './InvestigationNotes.jsx';

function App() {
  const navLinkStyles = ({ isActive }) => (isActive ? "active-link" : "");

  return (
    <>
      <BrowserRouter>
        {/* Navigation with NavLink for active styling */}
        <nav>
          <NavLink to="/" className={navLinkStyles}>Home</NavLink> |{" "}
          <NavLink to="/journal" className={navLinkStyles}>Journals</NavLink> |{" "}
          <NavLink to="/investigate" className={navLinkStyles}>Research</NavLink> |{" "}
          <NavLink to="/chimes" className={navLinkStyles}>Chapel</NavLink> |{" "}
          <NavLink to="/invite" className={navLinkStyles}>Details</NavLink>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<JournalEntries />} />
          <Route path="/investigate" element={<InvestigationNotes />} />
          <Route path="/chimes" element={<ChimeAction />} />
          <Route path="/invite" element={<Invite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
