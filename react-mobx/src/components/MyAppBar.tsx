import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../stores/StoreHelper";
import { useObserver } from "mobx-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);
const MyAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let history = useHistory();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    store.logout();
    setAnchorEl(null);
    history.push("/");
  };

  const store = useStore();
  console.log(store.isLogin);
  const classes = useStyles();
  return useObserver(() => (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          component={Link}
          to={"/"}
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Todoアプリ{store.isLogin ? "ログイン中" : "ログインしてない"}
        </Typography>
        {store.isLogin ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            component={Link}
            to={"/login"}
            className={classes.menuButton}
            color="inherit"
            disabled={store.isLogin}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  ));
};

export default MyAppBar;
