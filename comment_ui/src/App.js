// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CommentPage from './components/CommentPage';
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/comments" element={<CommentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
