const en = {
  translation: {
    langs: {
      en: 'English',
      ru: 'Русский',
    },
    navBar: {
      brand: 'Spechat',
      chat: 'Chat',
      about: 'About',
      topics: 'Topics',
      loginButton: 'Log in',
      logoutButton: 'Log out',
    },
    loginPage: {
      title: 'Authorization',
      username: 'Username',
      password: 'Password',
      login: 'Log in',
      toSignup: 'Signup',
      errors: {
        invalidPassword: 'The username or password is incorrect',
      },
    },
    signupPage: {
      title: 'Registration',
      username: 'Username',
      password: 'Password',
      passwordConfirmation: 'Confirm password',
      signup: 'Sign up',
      toLogin: 'Log in',
      errors: {
        invalidPassword: 'The username or password is incorrect',
      },
    },
    channelAdder: {
      channels: 'Channels',
      name: 'Channel name',
      add: 'Add channel',
      save: 'Save',
      cancel: 'Cancel',
      validation: {
        required: 'Name is a required field',
        notOneOf: 'Name must not be one of the following values: {{list}}',
      },
      toast: {
        success: 'Channel {{name}} was created!',
        error: 'Error creating channel {{name}}!',
      },
    },
    channelMenu: {
      rename: 'Rename',
      remove: 'Remove',
    },
    modalChannelRenamer: {
      title: 'Rename channel {{name}}',
      name: 'Channel name',
      save: 'Save',
      cancel: 'Cancel',
    },
    modalChannelRemover: {
      title: 'Remove channel {{name}}',
      remove: 'Remove',
      cancel: 'Cancel',
    },
    messagesHeader: {
      messages_zero: 'No messages',
      messages_one: '{{count}} message',
      messages_few: '{{count}} messages',
      messages_many: '{{count}} messages',
      messages_other: '{{count}} messages',
    },
    messageAdder: {
      ariaLabel: 'New message',
      placeholder: 'Type message...',
      send: 'Send',
    },
    error404: {
      message: 'Page not found. Error 404',
    },
  },
};

export default en;
