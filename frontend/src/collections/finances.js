define([
//  '../lib/jquery',
//  '../lib/underscore',
//  '../lib/backbone',
  '../models/financeModel',
], function(
//  $,
//  _,
//  Backbone,
  finance
) {
  return Finances = Backbone.Collection.extend({
    url: '/api/finance',
    model: finance,

    sortByTime: function() {
      this.sortBy(function(model) {
        return (new Date(model.get('create'))).getTime();
      });
    },

    sortByMoney: function() {
      this.sortBy(function(model) {
        return (new Date(model.get('create'))).getTime();
      });
    },

    groupByDate: function() {
      return this.groupBy(function(model) {
        return new Date(model.get('create')).toLocaleDateString();
      });
    },

    groupByPurpose: function() {
      return this.groupBy(function(model) {
        return model.get('purpose');
      });
    },
  });
});
