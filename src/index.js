import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/UserContext.jsx';
import { CourseContextProvider } from './context/CourseContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserContextProvider>
        <CourseContextProvider>
          <App />
        </CourseContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
