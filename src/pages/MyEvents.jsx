import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../features/auth/authSlice';

function MyEvents() {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>My Events</h1>
      <p>Welcome, {user.name}! Here are your events:</p>
    </div>
  );
}

export default MyEvents;