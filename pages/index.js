import React from "react";
import GoalWeek from "../components/Cards/GoalWeek";
import Container from "@material-ui/core/Container";


const Home = () => {
    return (
        <Container maxWidth="sm" style={{height: '100vh', marginTop: '1rem'}}>
            <GoalWeek/>
        </Container>

    );
};

export default Home;
