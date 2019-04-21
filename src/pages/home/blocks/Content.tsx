import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Location from './Location';
import Words from './Words';
import Gallery from './Gallery';
import Technology from './Technology'
import withRoot from '../../../withRoot';

const styles = (theme: Theme) => 
  createStyles({
    root: {
      height: '100%',
    },
    item: {
      height: '50%',
    },
    card: {
      height: '100%',
    },
    cardContent: {
      height: 'calc(100% - 63px)',
      borderTop: '1px solid #eee',
    }
  });

type State = {};

class Content extends React.Component<WithStyles<typeof styles>, State> {
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
      <Grid className={classes.root} container>
        <Grid className={classes.item} item xs={6} >
          <Card className={classes.card} >
            <CardHeader
              title='LOCATION'
              // subheader="September 14, 2016"
            />
            <CardContent className={classes.cardContent} >
              <Location />
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.item} item xs={6} >
          <Card className={classes.card} >
            <CardHeader
              title='KEYWORD'
              // subheader="September 14, 2016"
            />
            <CardContent className={classes.cardContent} >
              <Words />
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.item} item xs={6} >
          <Card className={classes.card} >
            <CardHeader
              title='Technology'
              // subheader="September 14, 2016"
            />
            <CardContent className={classes.cardContent} >
              <Technology />
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.item} item xs={6} >
          <Card className={classes.card} >
            <CardHeader
              title='Gallery'
              // subheader="September 14, 2016"
            />
            <CardContent className={classes.cardContent} >
              <Gallery />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withRoot(withStyles(styles)(Content));
