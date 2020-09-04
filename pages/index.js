import React from 'react';
import GoalWeek from '../components/Cards/GoalWeek';
import Container from '@material-ui/core/Container';

// old styles
// style={{ height: '100vh', marginTop: '1rem' }}

const Home = () => {
  return (
    <Container>
      <GoalWeek />
    </Container>
  );
};

export default Home;
