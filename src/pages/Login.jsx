import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser, selectAuthError } from '../features/auth/authSlice';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    if (user) {
      navigate('/events');
    }
  }, [user, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    if (email === '') {
      setError('Please enter your email');
      return;
    }

    if (password === '') {
      setError('Please enter your password');
      return;
    }

    setError('');
    dispatch(login({ email: email, password: password }));
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Welcome Back</h1>
        <p className="auth-text">Log in to manage your events.</p>

        <form onSubmit={handleSubmit}>
          <p className="auth-label">Email</p>
          <input
            className="auth-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <p className="auth-label">Password</p>
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}
          {authError && <p className="auth-error">{authError}</p>}

          <button className="auth-button" type="submit">
            Log in
          </button>
        </form>

        <p className="auth-bottom">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;