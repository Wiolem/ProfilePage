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
import TranslateIcon from '@material-ui/icons/Translate';
import PaletteIcon from '@material-ui/icons/Palette';
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
      fontSize: 16,
      color: theme.palette.common.white,
    },
    desc: {
      marginTop: theme.spacing.unit,
      color: theme.palette.common.white,
    },
    list: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.common.white,
    },
    listTitle: {
      fontSize: 12,
      color: theme.palette.grey[500]
    },
    listCon: {
      display: 'inline',
      fontSize: 16,
      color: theme.palette.common.white,
    },
    link: {
      color: theme.palette.common.white,
    }
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
      { icon: <TranslateIcon />, name: 'Translate' },
      { icon: <PaletteIcon />, name: 'Palette' },
      { icon: <PrintIcon />, name: 'Print' },
      { icon: <ShareIcon />, name: 'Share' },
    ]
    const config = [
      { label: 'DOB', text: '06/30/1995' },
      { label: 'WORK', text: 'HANGZHOU/CHINA' },
      { label: 'EMAIL', text: 'wiolem@hotmail.com' },
      { label: 'HOME', text: 'LINZHOU/CHINA' },
      { label: 'LANGUAGE', text: 'Chinese' },
      { label: 'WEBSITE', text: <a className={classes.link} href={'https://wiolem.github.io'} >https://wiolem.github.io</a> },
      { label: 'GITHUB', text: <a className={classes.link} href={'https://github.com/Wiolem'} >https://github.com/Wiolem</a> },
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
          {config.map(({ label, text }, idx) => (
            <ListItem key={idx} >
              <ListItemText
                primary={<Typography component="span" className={classes.listTitle} color="textSecondary">
                  {label}
                </Typography>}
                secondary={
                  <React.Fragment>
                    <Typography component="span" className={classes.listCon} color="textPrimary">
                      {text}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Profile));
