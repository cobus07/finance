define([
//  '../lib/jquery',
//  '../lib/underscore',
//  'backbone',
], function(
//  $,
//  _,
//  Backbone
) {
  return FinanceModel = Backbone.Model.extend({
    url: '/api/finance',
    idAttribute: '_id',
    defaults: {
      number: 0,
      purpose: '',
      income: false,
      date: Date.now(),
      create: Date.now(),
      update: Date.now(),
    },

    initialize: function() {
      if (this.url === '/api/finance') {
        if (this.id) {
          this.updateUrl();
        } else {
          this.once('change', this.updateUrl);
        }
      }
    },

    validate: function(attrs, options) {
      if (_.isNaN(parseFloat(attrs.number))) {
        return 'Money must be a number!';
      }
      if (!_.isString(attrs.purpose)) {
        return 'Monry must bew a number!';
      }
    },

    updateUrl: function() {
      if (this.id) {
        this.url = this.url + '/' + this.id;
      }
    },
  });
});
