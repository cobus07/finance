requirejs.config({
  baseUrl: '/',
  shim: {
    'js/lib/backbone': {
      deps: ['js/lib/jquery', 'js/lib/underscore'],
    },
  },
});

require([
  'js/lib/backbone',
  'js/views/loginView',
  ], function(Backbone, LoginView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'login',
    },

    initialize: function() {
      this.loginView = new LoginView({model: {}});
      console.log($('#content').text());
    },

    login: function() {
      this.loginView.render();
    },
  });

  app = new AppRouter();
  Backbone.history.start();
});
