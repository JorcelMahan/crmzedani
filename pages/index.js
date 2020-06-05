import React from "react";
import GoalWeek from "../components/Cards/GoalWeek";
import Container from "@material-ui/core/Container";
import Main from "../layouts/Main/Main";

const Home = () => {
    return (
        <Main>
            <Container maxWidth="sm" style={{height: '100vh', marginTop: '1rem'}}>
                <GoalWeek/>
            </Container>
        </Main>
    );
};

export default Home;
