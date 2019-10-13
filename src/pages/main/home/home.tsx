import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FunctionComponent = () => {
  return (
    <Link to="/user/videos">시청 기록</Link>
  );
};

export default HomePage;
