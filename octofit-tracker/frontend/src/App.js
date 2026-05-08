import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold" to="/">
            🏋️ OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/users">
                  👤 Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/teams">
                  👥 Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/activities">
                  🏃 Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/workouts">
                  💪 Workouts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/leaderboard">
                  🏆 Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4 page-content">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </div>

      <footer>
        <div className="container-fluid text-center">
          <small>&copy; 2026 OctoFit Tracker. All rights reserved.</small>
        </div>
      </footer>
    </Router>
  );
}

export default App;

