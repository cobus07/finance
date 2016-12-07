define([
//  '../lib/jquery',
//  '../lib/underscore',
//  '../lib/backbone',
  './financeItemView',
  '../collections/finances',
  '../models/financeModel',
  '../lib/text!../tpl/finance-list.html',
  '../lib/bootstrap-datepicker',
], function(
//  $,
//  _,
//  Backbone,
  FinanceItemView,
  FinanceColl,
  FinanceModel,
  financeListTpl
) {
  return FinanceListView = Backbone.View.extend({
    tagName: 'div',
    template: _.template(financeListTpl),

    initialize: function() {
      this.collection = new FinanceColl();
      this.listenTo(this.collection, 'update', this.renderList);
      this.listenTo(this.collection, 'sort', this.renderList);
    },

    events: {
      'click #add': 'addFinanceItem',
      'keypress .add': 'addFinanceItem',
    },

    load: function() {
      this.render();
      this.collection.fetch();
    },

    render: function() {
      this.$el.html(this.template());
      this.renderList();
      $('#main').empty().append(this.el);
      this.delegateEvents();
    },

    renderList: function() {
      this.$('#finance-list tbody').empty();
      this.collection.each(function(model) {
        var financeItem = new FinanceItemView({model: model});
        this.$('#finance-list tbody').append(financeItem.render().el);
      }, this);
    },

    addFinanceItem: function(e) {
      if (e.keyCode !== 13 && e.which !== 1) {
        return;
      }
      var $number = $('#number');
      var $purpose = $('#purpose');
      var $income = $('#income');
      var $date = $('#date');
      if ($number.val() !== '' && $purpose.val() !== '') {
        var newRecord = new FinanceModel();
        newRecord.set({
          number: $number.val(),
          purpose: $purpose.val(),
          income: $income.val() === '收入' ? true : false,
          date: $date.val() ? $date.val() : Date.now(),
        });
        if (newRecord.save()) {
          this.collection.add(newRecord);
          $number.val('');
          $purpose.val('');
        }
      }
    },
  });
});
