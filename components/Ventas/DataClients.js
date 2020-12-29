import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ClientData from '../ClientData';
import PromotoraData from '../Promotoras/PromotoraData';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  boxClient: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));
const DataClients = ({ setActiveBtn }) => {
  const [tipoCliente, settipoCliente] = useState('client');
  const classes = useStyles();
  const handleChange = (e) => {
    settipoCliente(e.target.value);
  };
  return (
    <div>
      <FormControl component='fieldset' className={classes.boxClient}>
        <FormLabel component='legend'>
          <Typography variant='h4'>Tipo de cliente</Typography>
        </FormLabel>

        <RadioGroup
          aria-label='tipoClient'
          name='tipoCliente'
          value={tipoCliente}
          onChange={handleChange}
          className={classes.boxRadios}>
          <Box display='flex' justifyContent='space-around'>
            <Box>
              <FormControlLabel
                value='client'
                control={<Radio />}
                label='Cliente'
                className={classes.inputRadio}
              />
            </Box>
            <Box>
              <FormControlLabel
                value='promotora'
                control={<Radio />}
                label='Promotora'
                className={classes.inputRadio}
              />
            </Box>
          </Box>
        </RadioGroup>
      </FormControl>
      {tipoCliente === 'client' ? (
        <ClientData setActiveBtn={setActiveBtn} />
      ) : (
        <PromotoraData setActiveBtn={setActiveBtn} />
      )}
    </div>
  );
};

export default DataClients;
