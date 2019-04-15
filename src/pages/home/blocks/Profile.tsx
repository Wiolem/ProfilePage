import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PetsIcon from '@material-ui/icons/Pets';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import withRoot from '../../../withRoot';

const styles = (theme: Theme) => 
  createStyles({
    root: {
      position: 'relative',
      height: '100%',
      padding: theme.spacing.unit * 6,
      textAlign: 'center',
      color: theme.palette.common.white,
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing.unit * 6,
      right: theme.spacing.unit * 6,
    },
    avatar: {
      width: theme.spacing.unit * 15,
      height: theme.spacing.unit * 15,
      margin: 'auto',
    },
    name: {
      marginTop: theme.spacing.unit * 2,
    },
    desc: {
      marginTop: theme.spacing.unit,
    },
    list: {
      color: theme.palette.common.white,
    },
    listTitle: {
      fontSize: 12,
    },
    listCon: {
      display: 'inline',
      fontSize: 16,
      color: theme.palette.common.white,
    },
  });

type State = {
  open: boolean;
};

class Profile extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    open: false,
    hidden: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;
    const actions = [
      { icon: <PrintIcon />, name: 'Print' },
      { icon: <ShareIcon />, name: 'Share' },
    ]
    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel=''
          className={classes.speedDial}
          hidden={hidden}
          icon={<PetsIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
          direction='up'
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={this.handleClick}
            />
          ))}
        </SpeedDial>
        <div>
          <Avatar
            className={classes.avatar}
            alt="Wiolem"
            src="https://avatars2.githubusercontent.com/u/29952695?s=400&u=96f37ce339a68f4bd723edf3619b99bc694e823c&v=4" />
          <Typography component="span" className={classes.name} color="textSecondary">
            Wiolem
          </Typography>
          <Typography component="span" className={classes.desc} color="textSecondary">
            Front-End Developer
          </Typography>
        </div>
        <List className={classes.list}>
          <ListItem>
            <ListItemText
              primary={<Typography component="span" className={classes.listTitle} color="textSecondary">
                LANGUAGE
              </Typography>}
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.listCon} color="textPrimary">
                    Chinese
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography component="span" className={classes.listTitle} color="textSecondary">
                EMAIL
              </Typography>}
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.listCon} color="textPrimary">
                    wiolem@hotmail.com
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography component="span" className={classes.listTitle} color="textSecondary">
                PHONE
              </Typography>}
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.listCon} color="textPrimary">
                    17839221892
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography component="span" className={classes.listTitle} color="textSecondary">
                DOB
              </Typography>}
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.listCon} color="textPrimary">
                    06/30/1995 (24)
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography component="span" className={classes.listTitle} color="textSecondary">
                ADDRISE
              </Typography>}
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.listCon} color="textPrimary">
                    HANGZHOU/CHINA
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Profile));
