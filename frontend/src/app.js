requirejs.config({
  baseUrl: './',
/*  paths: {
    'jquery': 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',
    'underscore': 'http://apps.bdimg.com/libs/underscore.js/1.7.0/underscore-min.js',
    'backbone': 'http://apps.bdimg.com/libs/backbone.js/1.1.2/backbone-min.js',
  },
*/
  shim: {
    'jquery': {
      exports: '$',
    },
    'underscore': {
      export: '_',
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone',
    },
  },
});

require([
//  'jquery',
//  'underscore',
//  'backbone',
  './views/loginView',
  './views/homeView',
  './views/financeGlanceView',
  ], function(
    LoginView,
    HomeView,
    FinanceGlanceView
  ) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'login',
      'home': 'home',
      'home/:subview': 'homeSub',
    },

    initialize: function() {
      this.loginView = new LoginView({model: {systemName: '个人财务管理系统'}});
      this.homeView = new HomeView();
    },

    login: function() {
      this.loginView.render();
    },

    home: function() {
      this.homeView.load('glance');
    },

    homeSub: function(subview) {
      this.homeView.load(subview);
    },
  });

  app = new AppRouter();
  Backbone.history.start();
});
