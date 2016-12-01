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
  'js/views/LoginView',
  'js/views/HomeView',
  ], function(
    Backbone,
    LoginView,
    HomeView
  ) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'login',
      'home': 'home',
    },

    initialize: function() {
      this.loginView = new LoginView({model: {}});
      this.homeView = new HomeView({model: {}});
    },

    login: function() {
      this.loginView.render();
    },

    home: function() {
      this.homeView.render();
    }
  });

  app = new AppRouter();
  Backbone.history.start();
});
