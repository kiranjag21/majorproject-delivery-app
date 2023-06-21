import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RoomIcon from '@material-ui/icons/Room';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const useStyles = makeStyles((theme) => ({

    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
      maxWidth:'100%'
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    }
}));

export default function DeliveryHeroUnit() {
    const classes = useStyles();
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('deliveryLogin')).username);
    const [useraddress, setAddress] = useState('');
    const [useremail, setEmail] = useState('');

    return(
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="xs">
                        {/* {console.log(user)} */}
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                        <AccountBoxIcon fontSize='large'/><br></br>
                        </Grid>
                        <Typography style={{fontFamily:"Poppins, sans-serif",maxWidth:'md'}} variant="h4" align="center" color="textPrimary" gutterBottom>
                        {username}
                        </Typography>
                       
                        
                    </Container>
                </div>
                {/* End hero unit */}
            </main>
        </React.Fragment>
    )
}