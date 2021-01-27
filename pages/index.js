import React, { useContext } from "react";
import GoalWeek from "../components/Cards/GoalWeek";
import Container from "@material-ui/core/Container";
import AuthContext from "../context/auth/AuthContext";
// old styles
// style={{ height: '100vh', marginTop: '1rem' }}

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      {user !== "elenap" ? (
        <GoalWeek />
      ) : (
        <div>
          <img src="https://previews.123rf.com/images/dizanna/dizanna1706/dizanna170601231/80855219-bienvenido-bienvenido-en-espa%C3%B1ol-nube-de-palabras-en-diferentes-idiomas-trasfondo-conceptual.jpg" />
        </div>
      )}

    </Container>
  );
};

export default Home;
