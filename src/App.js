import { useEffect } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { authorization } from './components/gateway/auth/Authorization';
import { BrowserRouter as Router } from 'react-router-dom';
import { set } from './database/User';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/authSlice';

function App(props) {
  useEffect(() => {
    authorization.onLoginDetection(handleLogin);
  }, []);

  const dispatch = useDispatch();

  const handleLogin = loggedin => {
    console.log(loggedin);
    if (loggedin) {
      set();
      dispatch(login());
    } else {
      dispatch(logout());
    }
  };

  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
