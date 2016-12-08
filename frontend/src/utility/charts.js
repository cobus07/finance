define([
  '../lib/echarts',
  ], function(
    echarts
  ) {
  return {
    echarts: echarts,
    showGlance: function(ele, obj) {
      var chart = echarts.init(ele);
      var options = {
        title: {
        text: '历史账单',
        },

        tooltip: {
          trigger: 'axis',
        },

        legend: {
          data: ['收入', '支出'],
        },

        toolbox: {
          show: true,
          feature: {
            dataZoom: {
                 yAxisIndex: 'none',
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {},
          },
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: obj.date.map(function(item) {
            return item.replace(/^[0-9]+\//, '');
          }),
          axisTick: {
            alignWithLabel: true,
          },
        },

        yAxis: {
          type: 'value',
  /*        axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },   */
          splitLine: {
            show: false,
          },
        },

        dataZoom: [
        {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 50,
            end: 100,
        },
        {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            left: '93%',
            start: 0,
            end: 100,
        },
        {
            type: 'inside',
            xAxisIndex: [0],
            start: 50,
            end: 100,
        },
        {
            type: 'inside',
            yAxisIndex: [0],
            start: 0,
            end: 100,
        }],

        series: [
          {
            name: '收入',
            type: 'line',
            data: obj.income,
            markPoint: {
              data: [
                {type: 'max', name: '收入最多'}],
            },
            markLine: {
              data: [{type: 'average', name: '平均收入'}],
            },
          },
          {
            name: '支出',
            type: 'line',
            data: obj.outcome,
            markPoint: {
              data: [
                {type: 'max', name: '支出最多'}],
            },
            markLine: {
              data: [{type: 'average', name: '平均支出'}],
            },
          },
        ],
      };
      chart.setOption(options);
    },
  };
});
