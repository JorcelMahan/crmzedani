import React, {useEffect} from 'react';
import {useQuery, gql} from '@apollo/client';
import WrapperZapatos from '../../components/Zapatos/WrapperZapatos';
import Main from "../../layouts/Main/Main";

const GET_ZAPATOS = gql`
    query zapatosAlmacen($almacen: String!) {
        zapatosAlmacen(almacen: $almacen) {
            id
            codigo
            stock
            image
            almacen
            color
            precioPublico
            tipo
            tallas {
                t27
                t28
                t29
                t30
                t31
                t32
                t33
                t34
                t35
                t36
                t37
                t38
                t39
                t40
                t41
                t42
                t43
                t44
                t45
            }
        }
    }
`;

const SanMiguel = () => {
    const {loading, error, data, startPolling, stopPolling} = useQuery(
        GET_ZAPATOS,
        {
            variables: {almacen: 'san-miguel'},
        }
    );
    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        };
    }, [startPolling, stopPolling]);
    if (loading) return 'Cargando...';
    if (error) return `Error ${error.message}`;
    const {zapatosAlmacen} = data;

    return (
        <Main>
            <WrapperZapatos zapatos={zapatosAlmacen} almacen="San Miguel"/>
        </Main>
    );
};
export default SanMiguel;
