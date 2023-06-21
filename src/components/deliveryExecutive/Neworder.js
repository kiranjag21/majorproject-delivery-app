import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { baseUrl } from '../config';



const useStyles = makeStyles({
    root: {
        minWidth: 275,
        border:'1px solid green',
        backgroundColor:'white',
        width:'60%',
        fontFamily:"fantasy",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        fontFamily:'poppins'
    },
    pos: {
        marginBottom: 12,
        
        fontFamily:'poppins'
    },
});

const handleAcceptClick = (props, orderInfo) => {
    props.handleAccept(orderInfo)
}
const handleRejectClick = (props, orderInfo) => {
    props.handleReject(orderInfo)
}
export default function OutlinedCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;


    return (
        <div style={{ display:'flex', justifyContent:'center' }}>
 <Card className={classes.root} variant="outlined" >

<CardContent>
    <Typography className={classes.title} color="purple" gutterBottom>
        New order: {props.orderInfo.uniqueId}
    </Typography>
    <Typography className={classes.pos} variant="h4" component="h2" style={{ fontFamily:"cursive" , color: 'black', fontWeight: 'bold', fontFamily: 'poppins' }} >
       From:- {props.orderInfo.username}
    </Typography>
    <Typography className={classes.pos} color="textSecondary" gutterBottom  variant="h5" component="h5" style={{ fontSize:"2rem", color:"burlywood"}}>
        {props.orderInfo.restName}
    </Typography>
    <Typography className={classes.title} variant="body2" component="p" style={{ fontSize:"1rem", color:"black", fontFamily:"Century Gothic" }}>
        {props.orderInfo.restAddress}
        <br />
    </Typography>
</CardContent>
<CardActions className="d-flex justify-content-center">
    <Button className="btn btn-primary" size="medium" variant="contained" fullWidth='true' style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold', fontFamily: 'poppins' }} onClick={() => handleAcceptClick(props, props.orderInfo)}>Accept Order</Button>
    <Button className="btn btn-primary" size="medium" variant="contained" fullWidth='true' style={{ backgroundColor: 'maroon', color: 'white', fontWeight: 'bold', fontFamily: 'poppins' }} onClick={() => handleRejectClick(props, props.orderInfo)}>Reject Order</Button>
</CardActions>
<div className="d-flex  justify-content-center">

</div>
</Card>
        </div>
       
    );
}
