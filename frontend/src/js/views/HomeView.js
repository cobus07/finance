define([
  'js/lib/backbone',
  'js/lib/text!/tpl/home.html',
], function(Backbone, homeTpl) {
  return HomeView = Backbone.View.extend({
    tagName: 'div',
    template: _.template(homeTpl),

    render: function() {
      $('#content').empty();
    }
  });
});
