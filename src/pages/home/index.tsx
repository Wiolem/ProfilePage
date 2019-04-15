import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Profile from './blocks/Profile'
import Content from './blocks/Content'
import withRoot from '../../withRoot';

const styles = (theme: Theme) => 
  createStyles({
    root: {
      height: '100%',
    },
    rootLeft: {
      float: 'left',
      width: '25%',
      height: '100%',
      backgroundColor: theme.palette.primary.dark,
      color: 'red',
    },
    rootRight: {
      height: '100%',
      overflow: 'auto',
      margin: 'auto',
      color: 'red',
    },
  });

type State = {
  open: boolean;
};

class Index extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.rootLeft}>
          <Profile />
        </div>
        <div className={classes.rootRight}>
          <Content />
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
