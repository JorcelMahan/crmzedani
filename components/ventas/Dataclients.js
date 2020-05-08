import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SideBar from '../SideBar';
import ClientData from '../ClientData';
import PromotoraData from '../Promotoras/PromotoraData';

const DataClient = () => {
  const [tipoCliente, settipoCliente] = useState('client');

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
            aria-label='tipoClient'
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
      </div>
    </SideBar>
  );
};

export default DataClient;
