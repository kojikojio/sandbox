import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

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
  const classes = useStyles();
  return (
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
          Todoアプリ
        </Typography>
        <Button
          component={Link}
          to={"/login"}
          className={classes.menuButton}
          color="inherit"
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
