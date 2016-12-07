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
        var money = [];
        var time = [];
        var purpose = [];
        coll.sortByTime();
        _.each(coll.toArray(), function(model) {
          money.push(model.get('number'));
          time.push(model.get('create'));
          purpose.push(model.get('purpose'));
        });
        return {
          money: money,
          time: time,
          purpose: purpose,
        };
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
