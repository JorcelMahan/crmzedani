import React from 'react';
import {useQuery, gql} from '@apollo/client';
import Loader from "../components/Loader";


const GET_CLIENTES = gql`
    query getClientes {
        getClientes {
            id
            razonSocial
            nitoci
        }
    }
`;
const Clientes = () => {
    const {loading, error, data} = useQuery(GET_CLIENTES);
    if (loading) return <Loader />;
    if (error) return 'errror';
    const {getClientes} = data;
    return (
        <>
            <h1>Clientes</h1>
            {getClientes.map((c) => (
                <p>{c.id}</p>
            ))}
        </>
    );
};

export default Clientes;
