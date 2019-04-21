import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ReactEcharts from "echarts-for-react";
import withRoot from '../../../withRoot';

const data = [{
  "value": 5,
  "name": "JavaScript"
}, {
  "value": 4,
  "name": "HTML"
}, {
  "value": 4,
  "name": "CSS"
}, {
  "value": 4,
  "name": "React"
}, {
  "value": 3,
  "name": "Vue"
}, {
  "value": 3,
  "name": "Node"
}, {
  "value": 2,
  "name": "UI"
}, {
  "value": 2,
  "name": "Java"
}, {
  "value": 2,
  "name": "Andriod"
}, {
  "value": 2,
  "name": "SQL"
}]

const star = (rate: number) => ("★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate))

for (let n in data) {
  data[n]['name'] = data[n]['name'] + ' ' + star(data[n]['value'])
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
  });

type State = {
  activeStep: number;
};


class Index extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    activeStep: 0,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ReactEcharts
          style={{ height: '100%' }}
          option={{
            tooltip: {
              trigger: 'item',
              formatter: "{b}"
            },
            series: [{
              type: 'treemap',
              width: '100%',
              height: '100%',
              roam: false,
              nodeClick: false,
              breadcrumb: {
                show: false
              },
              label: {
                normal: {
                  show: true,
                  position: ['10%', '40%']
                }
              },
              itemStyle: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 16,
                  },
                  borderWidth: 1,
                  borderColor: '#fff',
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },
              data: data
            }]
          }}
          notMerge={true}
          lazyUpdate={true}
          theme='dark'
          onChartReady={() => { }}
          onEvents={{}}
          opts={{}}
        />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
