import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import AuctionsPage from '../pages/AuctionsPage';
import Auction from '../pages/AuctionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuctionsPage />} />
        <Route path="/auction/:id" element={<Auction />} />
      </Routes>
    </Router>
  );
}

export default App;
