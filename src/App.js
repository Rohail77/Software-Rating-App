import { useEffect } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { authorization } from './components/gateway/auth/Authorization';
import { BrowserRouter as Router } from 'react-router-dom';
import { set } from './database/User';

function App(props) {
  useEffect(() => {
    authorization.onLoginDetection(handleLogin);
  }, []);

  const handleLogin = loggedin => {
    if (loggedin) set();
  };

  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
