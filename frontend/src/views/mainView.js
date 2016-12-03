define([
  '../lib/backbone',
  '../lib/text!../../tpl/main.html',
], function(Backbone, mainTpl) {
  return HeaderView = Backbone.View.extend({
    template: _.template(mainTpl),

    render: function() {
      this.$el.html(this.template(this.model));
      return this;
    },
  });
});
