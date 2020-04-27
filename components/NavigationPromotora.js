import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlusOne from '@material-ui/icons/PlusOne';
import Link from 'next/link';
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function NavigationPromotora() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <Link href='/newPromotora'>
        <BottomNavigationAction label='Nueva' icon={<PlusOne />} />
      </Link>
      <BottomNavigationAction label='Habilitadas' icon={<FavoriteIcon />} />
      <BottomNavigationAction label='Desabilitads' icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}
export default NavigationPromotora;
