define([
  '../views/MainView',
  '../lib/text!../../tpl/home.html',
], function(
  MainView,
  homeTpl) {
  return HomeView = Backbone.View.extend({
    tagName: 'div',
    className: 'home-wrapper',
    template: _.template(homeTpl),

    initialize: function() {
    },

    events: {
      'click #logout': 'logout',
      'click .menubar': 'showMenu',
      'click .menu-bottom': 'hideMenu',
    },

    render: function() {
      this.$el.html(this.template());

      this.mainView = this.mainView || new MainView();

      this.$('#main').append(this.mainView.render().el);
      $('#content').empty().append(this.el);
      this.delegateEvents();
    },

    logout: function(e) {
      e.preventDefault();
      $.ajax({
        url: '/api/logout',
        method: 'POST',
        success: function(data) {
          if (data.msg === 'success') {
            app.navigate('', {trigger: true, replace: true});
          }
        },
        error: function(err) {
          throw new Error(err);
        },
      });
    },

    showMenu: function() {
      $('.menu-bottom').css({'display': 'block'});
      $('.menu-bottom').addClass('menu-bottom-active');
      $('.menu-content').css({'transform': 'translate3d(250px, 0, 0)'});
    },

    hideMenu: function() {
      $('.menu-content').css({'transform': 'translate3d(0, 0, 0)'});
      $('.menu-bottom').removeClass('menu-bottom-active');
      setTimeout(function() {
        $('.menu-bottom').css({'display': 'none'});
      }, 250);
    },
  });
});
