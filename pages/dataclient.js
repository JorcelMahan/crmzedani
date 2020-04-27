import React, { useState, useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SideBar from '../components/SideBar';
import ClientData from '../components/ClientData';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import PromotoraData from '../components/PromotoraData';
import { useMutation, gql } from '@apollo/client';
import VentasContext from '../context/ventas/VentasContext';
const ADD_VENTA = gql`
  mutation addVenta($input: VentasInput) {
    addVenta(input: $input)
  }
`;
const DataClient = () => {
  const [tipoCliente, settipoCliente] = useState('client');
  const ventasContext = useContext(VentasContext);
  const { products, promotora, total } = ventasContext;
  const [addVenta] = useMutation(ADD_VENTA);
  const handleClick = async () => {
    console.log('entre');
    try {
      await addVenta({
        variables: {
          input: {
            productos: products,
            idPromotora: promotora,
            total,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    settipoCliente(e.target.value);
  };
  return (
    <SideBar>
      <div>
        <h2>Datos facturacion</h2>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Tipo de cliente</FormLabel>
          <RadioGroup
            aria-labe='tipoClient'
            name='tipoCliente'
            value={tipoCliente}
            onChange={handleChange}
          >
            <FormControlLabel
              value='client'
              control={<Radio />}
              label='cliente'
            />
            <FormControlLabel
              value='promotora'
              control={<Radio />}
              label='promotora'
            />
          </RadioGroup>
        </FormControl>
        {tipoCliente === 'client' ? <ClientData /> : <PromotoraData />}
        <Button variant='outlined' color='default' onClick={handleClick}>
          Confirmar
        </Button>
        {/* <Link href='/checkout'>
          
        </Link> */}
      </div>
    </SideBar>
  );
};

export default DataClient;
