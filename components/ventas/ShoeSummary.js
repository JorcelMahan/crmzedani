import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Size = ({ ksize, sales, setsales }) => {
  const [sizeSell, setsizeSell] = useState(false);
  const [amount, setamount] = useState('');
  useEffect(() => {
    if (sizeSell) {
      if (sales.some((e) => e.size === ksize)) {
        setsales([{ size: ksize, amount }]);
      } else {
        setsales([...sales, { size: ksize, amount }]);
      }
    }
  }, [sizeSell, amount]);
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            name='size'
            color='primary'
            checked={sizeSell}
            onChange={(e) => setsizeSell(e.target.checked)}
          />
        }
        label={ksize}
      />
      {sizeSell && (
        <TextField
          type='number'
          variant='outlined'
          size='small'
          label='cantidad'
          value={amount}
          onChange={(e) => setamount(Number(e.target.value))}
        />
      )}
    </>
  );
};

const SizesAvailables = ({ sizes, shoe }) => {
  const sizesAva = Object.values(sizes);
  let n = 27;
  return (
    <>
      {sizesAva.map((s, i) =>
        s !== 0 ? <Size n={n} s={s} i={i} shoe={shoe} /> : null
      )}
    </>
  );
};

const ShoeSummary = ({ shoe }) => {
  const validadSize = [];
  for (let [key, value] of Object.entries(shoe.tallas)) {
    if (value !== 0) validadSize.push(key);
  }

  // const sale = [{size: '', amount: ''}]
  const [sales, setsales] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    addProperty();
  }, [sales]);
  const addProperty = () => {
    const newShoe = { ...shoe, sales };
    console.log(newShoe);
  };
  return (
    <div>
      <p>{shoe.codigo}</p>
      <Avatar src={shoe.image} variant='square' className={classes.large} />
      <p>{shoe.color}</p>
      <p>BOB {shoe.precioPublico}</p>
      {validadSize.map((ksize) => (
        <Size ksize={ksize} sales={sales} setsales={setsales} />
      ))}
      {/* <SizesAvailables sizes={shoe.tallas} shoe={shoe} /> */}
    </div>
  );
};

export default ShoeSummary;
