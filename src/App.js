import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DeadlineTasksPage from './pages/DeadLineTasksPage';
import PersistentTasksPage from './pages/PersistentTasksPage';
import ProjectRoleTasksPage from './pages/ProjectRoleTasksPage';
import './App.css';

function Navigation({ theme, toggleTheme }) {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link
        to="/"
        className={location.pathname === '/' ? 'active-tab' : ''}
        style={{ marginRight: '1.5rem' }}
      >
        案件・役職
      </Link>
      <Link to="/habit" className={location.pathname === '/habit' ? 'active-tab' : ''}>
        継続タスク
      </Link>
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        style={{ marginLeft: 'auto', fontWeight: 'bold', fontSize: '1.1rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
        aria-label="テーマ切り替え"
      >
        {theme === 'dark' ? '🌙 ダーク' : '☀️ ライト'}
      </button>
    </nav>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app">
          <Navigation theme={theme} toggleTheme={toggleTheme} />
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<DeadlineTasksPage />} />
            <Route path="/tasks/:type/:name" element={<ProjectRoleTasksPage />} />
            <Route path="/habit" element={<PersistentTasksPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
