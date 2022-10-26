const en = {
  translation: {
    langs: {
      en: 'English',
      ru: 'Русский',
    },
    authProvider: {
      toast: {
        pending: 'Data loading...',
        success: 'Data loaded!',
        error: 'Data loading error!',
      },
    },
    navBar: {
      brand: 'Hexlet Chat',
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
        username: {
          required: 'username is required',
          wrongLength: 'Username must be at least 3 and most 20 characters',
        },
        password: {
          required: 'password is required',
          wrongLength: 'Password must be at least 6 characters',
        },
        passwordConfirmation: {
          notMatch: 'Passwords must match',
        },
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
        wrongLength: 'Channel name must be at least 3 and most 20 characters',
        notOneOf: 'Name must not be one of the existing channels',
        profanityFilter: "Channel name shouldn't include profanity",
      },
      toast: {
        success: 'Channel {{name}} was created!',
        error: 'Error creating channel {{name}}!',
      },
    },
    channelMenu: {
      title: 'Run channel',
      rename: 'Rename',
      remove: 'Remove',
    },
    modalChannelRenamer: {
      title: 'Rename channel {{name}}',
      name: 'Channel name',
      save: 'Save',
      cancel: 'Cancel',
      validation: {
        required: 'Name is a required field',
        wrongLength: 'Channel name must be at least 3 and most 20 characters',
        notOneOf: 'Name must not be one of the existing channels',
        profanityFilter: "Channel name shouldn't include profanity",
      },
      toast: {
        loading: 'Channel renaming...',
        success: 'The channel was renamed into {{name}}!',
        error: 'Error renaming channel into {{name}}!',
      },
    },
    modalChannelRemover: {
      title: 'Remove channel {{name}}',
      remove: 'Remove',
      cancel: 'Cancel',
      toast: {
        loading: 'Channel removing...',
        success: 'The channel {{name}} was removed!',
        error: 'Error removing channel {{name}}!',
      },
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
      toIndex: 'Go Home',
    },
    about: {
      header: 'Diploma project "Chat"',
      text: 'The purpose of the project is to show the range of all the standard tasks that you will have to face in real life. Among them: working with web sockets, interacting with the REST API, using React (with hooks), Redux (via reduxjs/toolkit), organizing routing to the client, authorization and authentication, and, of course, building (webpack) and deploying (heroku ).',
    },
  },
};

export default en;
