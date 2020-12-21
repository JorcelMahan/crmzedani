import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
    },
  
    content: {
      marginTop: theme.spacing(2),
    },
    boxSizes: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid red',
        justifyContent: 'space-around'
    },
    size: {
        border: '1px solid red'
    }
  }));          

const sizes = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]

const Store = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.boxSizes}>
            {
                sizes.map(size => (
                    <div key={size} className={classes.size}>
                        {size}
                    </div>
                ))
            }
            </div>
         
        </div>
    )
}

export default Store
