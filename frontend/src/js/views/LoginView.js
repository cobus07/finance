define([
  'js/lib/backbone',
  'js/lib/text!../../tpl/login.html',
], function(Backbone, loginTpl) {
    return LoginView = Backbone.View.extend({
      tagName: 'div',
      template: _.template(loginTpl),

      events: {
        'click #login': 'login',
      },

      render: function() {
        $('#content').html(this.$el.append(this.template({
          systemName: '个人财务管理系统',
        })));
        return this;
      },

      login: function(e) {
//        e.preventDefault();
      },
    });
  });
