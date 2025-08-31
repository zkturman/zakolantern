import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './Home.jsx';
import {ChimeAction} from './ChimeAction.jsx';
import {JournalEntries} from './JournalEntries.jsx';
import {Invite} from './Invite.jsx';
import {InvestigationNotes} from './InvestigationNotes.jsx';
import {ButtonMenu} from './ButtonMenu.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <ButtonMenu></ButtonMenu>

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
