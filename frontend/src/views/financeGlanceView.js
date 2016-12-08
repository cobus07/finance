define([
  '../collections/finances',
  '../lib/text!../tpl/finance-glance.html',
  '../utility/charts',
], function(
  FinanceColl,
  financeGlaceTpl,
  charts
) {
  return FinanceGlanceView = Backbone.View.extend({
    id: 'finance-glance',
    template: _.template(financeGlaceTpl),

    initialize: function() {
      this.collection = new FinanceColl();

      this.listenTo(this.collection, 'update', this.render);
    },

    render: function() {
      this.$el.html(this.template());
      charts.showGlance(this.$('#finance-glance-bar')[0], (function(coll) {
        var data = {
          date: [],
          income: [],
          outcome: [],
        };
        var sortedDateArr = coll.sortBy('date');
        var objByDate = {};

        //将按照 `date` 排序的数组转化为 时间为key的对象
        _.each(sortedDateArr, function(model) {
          var dateStr = (new Date(model.get('date'))).toLocaleDateString();
          if (objByDate[dateStr] === undefined) {
            objByDate[dateStr] = [];
          }
          objByDate[dateStr].push({
            money: model.get('number'),
            income: model.get('income'),
          });
        });

        // 分别统计每一天的收入和支出，并将其放进data.income、data.outcome中
        console.log('sortedDateArr');
        console.log(sortedDateArr);
        console.log('objByDate');
        console.log(objByDate);
        _.each(objByDate, function(arr, key) {
          data.date.push(key);
          var incomeSum = 0;
          var outcomeSum = 0;
          _.each(arr, function(item) {
            if (item.income) {
              incomeSum += item.money;
            } else {
              outcomeSum += item.money;
            }
          });
          data.income.push(incomeSum);
          data.outcome.push(outcomeSum);
        });

        return data;
      })(this.collection)
      );

      $('#main').empty().append(this.el);
      this.delegateEvents();
    },

    load: function() {
      this.render();
      this.collection.fetch();
    },
  });
});
