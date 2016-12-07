define([
//  'jquery',
//  '../lib/underscore',
//  '../lib/backbone',
  '../lib/text!../tpl/login.html',
], function(
//  $,
//  _,
//  Backbone,
  loginTpl
) {
    return LoginView = Backbone.View.extend({
      tagName: 'div',
      template: loginTpl,

      events: {
        'click #login': 'login',
      },

      render: function() {
        $('#content').empty().html(
          this.$el.html(
            _.template(this.template)(this.model)
          )
        );
        this.delegateEvents();
        return this;
      },

      login: function(e) {
        var $loginBtn = $(e.target);
        var $user = $('#username');
        var $pass = $('#password');

        e.preventDefault();

        // cleanup error msg
        $user.removeClass('form-error');
        $pass.removeClass('form-error');
        $('#user_error').text('');
        $('#pass_error').text('');
        $('#invalid_login').text('');
        $loginBtn.removeClass('disabled');


        if ($user.val() === '') {
          $user.addClass('form-error');
          $('#user_error').text('请输入您的用户名');
          $user.focus();
          return;
        }

        if ($pass.val() === '') {
          $pass.addClass('form-error');
          $('#pass_error').text('请输入您的密码');
          $pass.focus();
          return;
        }

        $loginBtn.addClass('disabled');

        $.ajax({
          url: '/api/auth',
          method: 'POST',
          data: 'username=' + $user.val() + '&password=' + $pass.val(),
          success: function(data) {
            if (data.msg == 'Authenticated') {
              app.navigate('home', {trigger: true, replace: true});
            } else {
              $('#invalid_login').text('用户名或密码不正确');
              $pass.val('');
              $user.val('').focus();
              $loginBtn.removeClass('disabled');
            }
          },
        });
      },
    });
  });
