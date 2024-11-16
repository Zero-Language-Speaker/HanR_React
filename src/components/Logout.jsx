import React from 'react';
import { useAuth } from './AuthContext.jsx';

const Logout = () => {
  const { logout, user } = useAuth();

  return (
    <div>
      <p>Welcome, {user.username}!</p>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Logout;