requirejs.config({
  baseUrl: './',
  shim: {
    './lib/backbone': {
      deps: ['./lib/jquery', './lib/underscore'],
    },
  },
});

require([
  './lib/jquery',
  './lib/underscore',
  './lib/backbone',
  './views/LoginView',
  './views/HomeView',
  ], function(
    $,
    _,
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
      this.loginView = new LoginView({model: {systemName: '个人财务管理系统'}});
      this.homeView = new HomeView({model: {}});
    },

    login: function() {
      this.loginView.render();
    },

    home: function() {
      this.homeView.render();
    },
  });

  app = new AppRouter();
  Backbone.history.start();
});
