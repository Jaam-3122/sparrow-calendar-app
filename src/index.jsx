import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CalendarApp from './components/CalendarApp';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>
);
