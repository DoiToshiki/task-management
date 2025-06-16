import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DeadlineTasksPage from './pages/DeadLineTasksPage';
import PersistentTasksPage from './pages/PersistentTasksPage';
import './App.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link to="/tasks" className={location.pathname === '/tasks' ? 'active-tab' : ''}>
        期限付きタスク
      </Link>
      <Link to="/habit" className={location.pathname === '/habit' ? 'active-tab' : ''}>
        永続タスク
      </Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app">
          <Navigation />
        </header>

        <main className="content">
          <Routes>
            <Route path="/tasks" element={<DeadlineTasksPage />} />
            <Route path="/habit" element={<PersistentTasksPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
