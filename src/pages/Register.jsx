import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, selectUser, selectAuthError } from '../features/auth/authSlice';
import './Auth.css';

function Register() {
  const [name, setName] = useState('');
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

    if (name === '') {
      setError('Please enter your name');
      return;
    }

    if (email === '') {
      setError('Please enter your email');
      return;
    }

    if (email.includes('@') === false) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    dispatch(register({ name: name, email: email, password: password }));
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Create Account</h1>
        <p className="auth-text">Register to start booking events.</p>

        <form onSubmit={handleSubmit}>
          <p className="auth-label">Full Name</p>
          <input
            className="auth-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ahmad Bin Tariq"
          />

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
            placeholder="At least 6 characters"
          />

          {error && <p className="auth-error">{error}</p>}
          {authError && <p className="auth-error">{authError}</p>}

          <button className="auth-button" type="submit">
            Create Account
          </button>
        </form>

        <p className="auth-bottom">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;