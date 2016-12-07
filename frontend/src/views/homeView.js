define([
//  '../lib/jquery',
//  '../lib/underscore',
//  '../lib/backbone',
//  '../views/mainView',
  '../lib/text!./../tpl/home.html',
  '../models/profileModel',
  './financeGlanceView',
  './financeDetailView',
  './profileView',
], function(
//  $,
//  _,
//  Backbone,
//  MainView,
  homeTpl,
  ProfileModel,
  FinanceGlanceView,
  FinanceDetailView,
  ProfileView
) {
  return HomeView = Backbone.View.extend({
    tagName: 'div',
    className: 'home-wrapper',
    template: _.template(homeTpl),

    initialize: function() {
      this.childViews = {
        glance: new FinanceGlanceView(),
        detail: new FinanceDetailView(),
        profile: new ProfileView(),
      };
      _.each(this.childViews, function(view, instance) {
        view.parentView = this;
      }, this);

      this.model = new ProfileModel();
    },

    events: {
      'click #logout': 'logout',
      'click .menubar': 'showMenu',
      'click .menu-bottom': 'hideMenu',
    },

    load: function(subview) {
      var that = this;
      this.model.fetch({
        success: function(model, res) {
          if (res.id) {
            that.render(subview);
            that.childViews[subview].load();
          } else {
            console.log(res.msg);
            app.navigate('', {trigger: true, replace: true});
          }
        },
        error: function(__, res) {
          console.log(res.msg);
          app.navigate('', {trigger: true, replace: true});
        },
      });
    },

    render: function(activeView) {
      this.$el.html(this.template({active: activeView}));

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
