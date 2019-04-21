import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ReactEcharts from "echarts-for-react";
import 'echarts/map/js/china';
import withRoot from '../../../withRoot';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
  });

type State = {};

const chinaGeoCoordMap: any = {
  '北京市': [116.4551, 40.2539],
  "山东": [117.1582, 36.8701],
  "河南": [113.4668, 34.6234],
  "江苏": [118.8062, 31.9208],
  "浙江": [119.5313, 29.8773],
};
const chinaDatas: any = [{
  name: '北京市',
  value: 0,
  label: '学习'
}, {
  name: '山东',
  value: 0,
  label: '泰山深夜爬山看日出'
}, {
  name: '河南',
  value: 0,
  label: '出生/大学'
}, {
  name: '江苏',
  value: 0,
  label: '流水线工人'
}, {
  name: '浙江',
  value: 1,
  label: '工作'
}];
const series: any = [{
  type: 'lines',
  zlevel: 2,
  tooltip: {
    show: false
  },
  effect: {
    show: true,
    period: 4,
    trailLength: 0.02,
    symbol: 'arrow',
    symbolSize: 5,
  },
  lineStyle: {
    normal: {
      width: 1,
      opacity: 1,
      curveness: .3
    }
  },
  data: [
    [{ coord: chinaGeoCoordMap['河南'], value: 0 }, { coord: chinaGeoCoordMap['山东'] }],
    [{ coord: chinaGeoCoordMap['河南'], value: 0 }, { coord: chinaGeoCoordMap['北京市'] }],
    [{ coord: chinaGeoCoordMap['河南'], value: 0 }, { coord: chinaGeoCoordMap['江苏'] }],
    [{ coord: chinaGeoCoordMap['河南'], value: 0 }, { coord: chinaGeoCoordMap['浙江'] }],
    [{ coord: chinaGeoCoordMap['北京市'], value: 0 }, { coord: chinaGeoCoordMap['浙江'] }],
  ]
}, {
  type: 'effectScatter',
  coordinateSystem: 'geo',
  zlevel: 2,
  rippleEffect: {
    period: 4,
    brushType: 'stroke',
    scale: 4
  },
  label: {
    normal: {
      show: true,
      position: 'right',
      offset: [5, 0],
      formatter: function (params: any) {
        return params.data.name;
      },
      fontSize: 13
    },
    emphasis: {
      show: true
    }
  },
  symbol: 'circle',
  symbolSize: function (val: any) {
    return 5 + val[2] * 5;
  },
  itemStyle: {
    normal: {
      show: false,
      color: '#f00'
    }
  },
  data: chinaDatas.map(function (dataItem: any) {
    return {
      ...dataItem,
      value: chinaGeoCoordMap[dataItem.name].concat([dataItem.value]),
    };
  }),
},
{
  type: 'scatter',
  coordinateSystem: 'geo',
  zlevel: 2,
  tooltip: {
    show: false
  },
  rippleEffect: {
    period: 4,
    brushType: 'stroke',
    scale: 4
  },
  label: {
    normal: {
      show: true,
      position: 'right',
      color: '#0f0',
      formatter: '{b}',
      textStyle: {
        color: "#0f0"
      }
    },
    emphasis: {
      show: true,
      color: "#f60"
    }
  },
  symbol: 'pin',
  symbolSize: 50,
  data: [{
    value: chinaGeoCoordMap['浙江'].concat([10]),
  }],
}]

class Location extends React.Component<WithStyles<typeof styles>, State> {
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
        <ReactEcharts
          style={{ height: '100%' }}
          option={{
            tooltip: {
              trigger: 'item',
              backgroundColor: 'rgba(166, 200, 76, 0.82)',
              borderColor: '#FFFFCC',
              showDelay: 0,
              hideDelay: 0,
              enterable: true,
              transitionDuration: 0,
              extraCssText: 'z-index:100',
              formatter: function (params: any) {
                const { data: { name, label } } = params
                return "<span style='color:#fff;'>" + name + "</span><br/>事迹：" + label;
              }
            },
            backgroundColor: "#013954",
            visualMap: {
              min: 0,
              max: 1,
              calculable: true,
              show: false,
              color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
              textStyle: {
                color: '#fff'
              }
            },
            geo: {
              map: 'china',
              zoom: 3.5,
              label: {
                emphasis: {
                  show: false
                }
              },
              center: [115.97, 34.71],
              roam: true,
              itemStyle: {
                normal: {
                  color: 'rgba(51, 69, 89, .5)',
                  borderColor: '#516a89',
                  borderWidth: 1
                },
                emphasis: {
                  color: 'rgba(37, 43, 61, .5)'
                }
              }
            },
            series: series
          }}
          notMerge={true}
          lazyUpdate={true}
          theme='dark'
          onChartReady={() => {

          }}
          onEvents={{}}
          opts={{}}
        />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Location));
