import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ClientData from '../ClientData';
import PromotoraData from '../Promotoras/PromotoraData';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxClient: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));
const DataClients = () => {
  const [tipoCliente, settipoCliente] = useState('client');
  const classes = useStyles();
  const handleChange = (e) => {
    settipoCliente(e.target.value);
  };
  return (
    <div>
      <FormControl component='fieldset' className={classes.boxClient}>
        <FormLabel component='legend'>Tipo de cliente</FormLabel>
        <RadioGroup
          aria-label='tipoClient'
          name='tipoCliente'
          value={tipoCliente}
          onChange={handleChange}
          className={classes.boxRadios}
        >
          <FormControlLabel
            value='client'
            control={<Radio />}
            label='Cliente'
            className={classes.inputRadio}
          />
          <FormControlLabel
            value='promotora'
            control={<Radio />}
            label='Promotora'
            className={classes.inputRadio}
          />
        </RadioGroup>
      </FormControl>
      {tipoCliente === 'client' ? <ClientData /> : <PromotoraData />}
    </div>
  );
};

export default DataClients;
