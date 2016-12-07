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
          text: 'ECharts',
        },

        tooltip: {
        },

        legend: {
          data: ['账单'],
        },

        xAxis: {
          data: obj.time.map(function(item){
            var date = new Date(item);
            return (date.getMonth() + 1) + '.' + date.getDate();
          }),
        },

        yAxis: {},

        series: [
          {
          name: '账单',
          type: 'bar',
          data: obj.money,
          }
        ],
      };
      chart.setOption(options);
    },
  };
});
