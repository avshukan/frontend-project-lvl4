const ru = {
  translation: {
    langs: {
      en: 'English',
      ru: 'Русский',
    },
    navBar: {
      brand: 'Болточат',
      chat: 'Чат',
      about: 'Про нас',
      topics: 'Топики',
      loginButton: 'Войти',
      logoutButton: 'Выйти',
    },
    loginPage: {
      title: 'Авторизация',
      username: 'Пользователь',
      password: 'Пароль',
      login: 'Войти',
      toSignup: 'Регистрация',
      errors: {
        invalidPassword: 'Неверные имя пользователя или пароль',
      },
    },
    signupPage: {
      title: 'Регистрация',
      username: 'Пользователь',
      password: 'Пароль',
      passwordConfirmation: 'Подтверждение пароля',
      signup: 'Зарегистрировать',
      toLogin: 'Авторизация',
      errors: {
        invalidPassword: 'Неверные имя пользователя или пароль',
      },
    },
    channelAdder: {
      channels: 'Каналы',
      name: 'Название канала',
      add: 'Добавить канал',
      save: 'Сохранить',
      cancel: 'Отменить',
      validation: {
        required: 'Название канала является обязательным полем',
        notOneOf: 'Название канала не должно содержаться в списке: {{list}}',
      },
      toast: {
        success: 'Создан канал {{name}}!',
        error: 'Ошибка создания канала {{name}}!',
      },
    },
    channelMenu: {
      rename: 'Переименовать',
      remove: 'Удалить',
    },
    modalChannelRenamer: {
      title: 'Переименовать канал {{name}}',
      name: 'Название канала',
      save: 'Сохранить',
      cancel: 'Отменить',
    },
    modalChannelRemover: {
      title: 'Remove channel {{name}}',
      remove: 'Remove',
      cancel: 'Cancel',
    },
    messagesHeader: {
      messages_zero: 'Нет сообщений',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      messages_other: '{{count}} сообщений',
    },
    messageAdder: {
      ariaLabel: 'Новое сообщение',
      placeholder: 'Отправьте сообщение...',
      send: 'Отправить',
    },
    error404: {
      message: 'Страница не найдена. Ошибка 404',
    },
  },
};

export default ru;
