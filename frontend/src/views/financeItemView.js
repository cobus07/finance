define([
  '../lib/text!../tpl/finance-item.html',
  ], function(
  financeItemTpl
  ) {
  return FinanceItemView = Backbone.View.extend({
    tagName: 'tr',
    className: 'list-item',
    template: _.template(financeItemTpl),

    initialize: function() {
    },

    events: {
      'click .delete': 'destroyView',
    },

    render: function() {
      this.$el.html(this.template({model: this.model.attributes}));
      return this;
    },

    destroyView: function() {
      this.model.destroy({wait: true});
    },
  });
});
