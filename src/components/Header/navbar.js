import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import SignIn from '../authentications/Login';
import SignUp from '../authentications/signUp';
import { Link, Redirect , withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { removeUser, disconnect } from '../redux/reduxActions';
import axios from 'axios';
import { baseUrl } from '../config';
import VpnKeyIcon from '@material-ui/icons/VpnKey';	
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';	

const mapStateToProps = state => {
  return {
    connection: state.connection.connection,
		receivedOrders: state.receivedOrders,
		auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch(removeUser()),
  disconnect: () => dispatch(disconnect())
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    // border: "2px solid grey",
    // borderRadius:"4px"

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
    fontFamily:"Poppins, sans-serif"
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function NavBar(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);

  const handleLoginOpen = () => {
    setOpenLogin(true);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignupOpen = () => {
    setOpenSignup(true);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLoginClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setOpenLogin(false);
  };
  const handleSignupClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setOpenSignup(false);
  };
  const handleLogout = () => {
    props.removeUser();
    localStorage.removeItem('deliveryLogin');

    if(props.connection !== null) {
      props.connection.pusher.disconnect();
			console.log(props.connection.pusher)
			props.disconnect();
			axios({
				method: 'POST',
				url: `${baseUrl}orders/disconnect`,
				data: {
					status: 1,
					name: 'kiran',
					dId: props.connection.channel.name
				}
			})
			.then((response) => {
				console.log('from server: ', response);
			})
			.catch((error) => console.log(error));
    }
    
		
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.reload();
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      

      {
        localStorage.getItem('deliveryLogin') !== null ? <MenuItem onClick={handleLogout} style={{fontFamily:"Poppins, sans-serif"}}>LogOut</MenuItem>
        :<div>
          <MenuItem onClick={handleSignupOpen} style={{fontFamily:"Poppins, sans-serif"}}>Sign Up </MenuItem>
          <MenuItem onClick={handleLoginOpen} style={{fontFamily:"Poppins, sans-serif"}}>Login </MenuItem>
          </div>
      }
      

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem onClick={handleProfileMenuOpen} style={{fontFamily:"Poppins, sans-serif"}}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Dialog
        open={openLogin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLoginClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent >
          <SignIn handleLoginClose={handleLoginClose}/>
        </DialogContent>
      </Dialog>

       <Dialog
        open={openSignup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleSignupClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent >
        <SignUp handleSignupClose={handleSignupClose}/>
        </DialogContent>
      </Dialog>

      <div className={classes.grow}>
      <AppBar position="relative"  style={{ backgroundColor: "#c3073f", borderRadius: "4px" }}>
        <Toolbar>
          <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography style={{fontFamily:'Poppins, sans-serif' }} className={classes.title} variant="h4" noWrap>
             Foodiezz
          </Typography>
          </Link>
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            

           

          {	
   localStorage.getItem('deliveryLogin') !== null ? null	
     :<div style={{marginTop:'3%'}}>	
       <IconButton	
       onClick={handleLoginOpen}>	
       <VpnKeyIcon style={{ fill: "#e7e8e8"}}></VpnKeyIcon>	
     </IconButton>	
     <IconButton	
       onClick={handleSignupOpen}>	
      <AssignmentSharpIcon style={{ fill: "#e7e8e8"}}></AssignmentSharpIcon>	
     </IconButton>	
     </div> 	
 }	

            <Typography variant="h6" className={classes.title} style={{ marginTop: '3%'}}>

              {
                localStorage.getItem('deliveryLogin') !== null ?
                <span>Welcome, &nbsp; {JSON.parse(localStorage.getItem('deliveryLogin')).username}</span>
                : null
              }
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>

 {	
   localStorage.getItem('deliveryLogin') !== null ? null	
     :<div style={{marginTop:'3%'}}>	
       <IconButton	
       onClick={handleLoginOpen}>	
       <VpnKeyIcon style={{ fill: "#e7e8e8"}}></VpnKeyIcon>	
     </IconButton>	
     <IconButton	
       onClick={handleSignupOpen}>	
      <AssignmentSharpIcon style={{ fill: "#e7e8e8"}}></AssignmentSharpIcon>	
     </IconButton>	
     </div> 	
 }	
   
 <IconButton	
   edge="end"	
   aria-label="account of current user"	
   aria-controls={menuId}	
   aria-haspopup="true"	
   onClick={handleProfileMenuOpen}	
   color="inherit"	
   style={{marginTop:'3%'}}	
 >	
   <AccountCircle />	
 </IconButton>
</div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    </div>

  );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
