import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles'
import logo from '../logo-pokemon.png';
import Badge from '@material-ui/core/Badge';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import './Styles.css'

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const favorites = useSelector(state => state.favorites.items);

  function ListItemLink(props) {
    const { primary, to, selected } = props;
    const link = React.forwardRef((props, ref) => <Link to={to} {...props} />);

    return (
      <ListItem selected={selected} button component={link}>
        {props.children}
        <ListItemText primary={primary} />
      </ListItem>
    );
  }
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const drawer = (
    <div className='logo-icon'>
      <div className={classes.toolbar} style={{ textAlign: 'center', paddingTop: '5px' }}  >
        <img alt="logo" src={logo} />
      </div>

      <List style={{display: 'flex'}}>
        <div onClick={event => handleListItemClick(event, 0)}>
          <ListItemLink  selected={selectedIndex === 0}  primary="Pokédex" to="/">
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
          </ListItemLink>
        </div>
        <div onClick={event => handleListItemClick(event, 1)}>
          <ListItemLink  selected={selectedIndex === 1}  primary="My Pokémons" to="/mypokemons">
            <ListItemIcon>
              <Badge badgeContent={favorites.length} color="primary"><FavoriteIcon /></Badge>
            </ListItemIcon>
          </ListItemLink>
        </div>


      </List>

    </div>
  );

  return (
    <div >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            {drawer}
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default ResponsiveDrawer;
