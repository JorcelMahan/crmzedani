import SideBar from '../components/SideBar';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Main from '../layouts/Main/Main';
const GET_PROMOTORAS = gql`
  {
    promotoras {
      id
      nombres
      apellidos
      razonSocial
      nit
      habilitada
    }
  }
`;
const Home = () => {
  //router
  // const router = useRouter();
  // const { data, loading, error } = useQuery(GET_PROMOTORAS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;
  // if (!data.promotoras) return router.push('/login');
  return <h1>from home</h1>;
};

export default Home;
