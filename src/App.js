import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DeadlineTasksPage from './pages/DeadLineTasksPage';
import PersistentTasksPage from './pages/PersistentTasksPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app">
          <nav className="nav-bar"> {/* ← CSSに合わせて className を nav-bar に */}
            <Link to="/tasks">期限付きタスク</Link>
            <Link to="/habit">永続タスク</Link>
          </nav>
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
