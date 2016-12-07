define([
//  '../models/profileModel',
  '../lib/text!./../tpl/profile.html',
], function(
//  PrfileModel,
  profileTpl
) {
  return ProfileView = Backbone.View.extend({
    id: 'profile-update',
    template: _.template(profileTpl),

    events: {
      'keypress .profile-setting': 'updateProfile',
      'click #submit_profile': 'updateProfile',
      'blur #password-confirm': 'checkPassword',
    },

    load: function() {
      this.listenTo(this.parentView.model, 'change', this.render);
      this.render();
    },

    render: function() {
      this.$el.html(this.template({model: this.parentView.model.attributes}));
      $('#main').empty().append(this.el);
      this.delegateEvents();
    },

    checkPassword: function() {
      var $password = $('#password');
      var $passwordSure = $('#password-confirm');

      if ($password.val() !== $passwordSure.val()) {
        $('#pass_confirm_error').text('两次输入密码不同');
        return false;
      }
      return true;
    },

    updateProfile: function(e) {
      e.preventDefault();
      if (e.keyCode !== 13 && e.which !== 1 || !this.checkPassword()) {
        return;
      }

      var $name = $('#name');
      var $password = $('#password');
      var that = this;

      if ($name.val() !== '') {
        this.parentView.model.set({
          name: $name.val(),
        });
      }

      if ($password.val() !== '') {
        this.parentView.model.set({
          password: $password.val(),
        });
      }

      if ($name.val() !== '' || $password.val() !== '') {
        this.parentView.model.save();
      }
    },
  });
});
