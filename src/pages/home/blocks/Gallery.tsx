import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../../../withRoot';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const tutorialSteps = [
  {
    label: 'The landlord`s cat',
    imgPath: 'https://s2.ax1x.com/2019/04/21/EFhLiF.jpg',
    url: 'https://music.163.com/#/playlist?id=2682865252'
  },
  {
    label: '[Daily]An app that integrates Kingsoft`s daily sentence.',
    imgPath: 'https://s2.ax1x.com/2019/04/21/EF43WQ.jpg',
    url: 'https://github.com/Wiolem/Daily'
  },
];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing.unit * 4,
      backgroundColor: theme.palette.background.default,
    },
    viewCon: {
      textAlign: 'center',
    },
    img: {
      height: 255,
      overflow: 'hidden',
      cursor: 'pointer',
    },
  });

  type State = {
    activeStep: number;
  };


class Index extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = (activeStep: any) => {
    this.setState({ activeStep });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <SwipeableViews
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div className={classes.viewCon} key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={step.imgPath} alt={step.label} onClick={() => {
                  step.url && window.open(step.url)
                }} />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(Index));
