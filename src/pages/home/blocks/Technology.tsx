import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ReactEcharts from "echarts-for-react";
import withRoot from '../../../withRoot';

var data = [{
  "value": 17.6,
  "name": "JavaScript"
}, {
  "value": 16.5,
  "name": "HTML"
}, {
  "value": 16.5,
  "name": "CSS"
}, {
  "value": 16.5,
  "name": "React"
}, {
  "value": 16.5,
  "name": "Vue"
}, {
  "value": 16.5,
  "name": "Node"
}, {
  "value": 15.5,
  "name": "UI*"
}, {
  "value": 14.8,
  "name": "Java"
}, {
  "value": 13.7,
  "name": "Andriod"
}, {
  "value": 13.4,
  "name": "SQL"
}]

for (var n in data) {
  data[n]['name'] = data[n]['name'] + ' ' + data[n]['value'] + '%'
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
              roam: false, //是否开启拖拽漫游（移动和缩放）
              nodeClick: false, //点击节点后的行为,false无反应
              breadcrumb: {
                show: false
              },
              label: { //描述了每个矩形中，文本标签的样式。
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
