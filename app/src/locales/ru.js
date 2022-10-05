const ru = {
  translation: {
    langs: {
      en: 'English',
      ru: 'Русский',
    },
    authProvider: {
      toast: {
        pending: 'Загрузка данных...',
        success: 'Данные загружены!',
        error: 'Ошибка загрузки данных!',
      },
    },
    navBar: {
      brand: 'Hexlet Chat',
      chat: 'Чат',
      about: 'Про нас',
      topics: 'Топики',
      loginButton: 'Войти',
      logoutButton: 'Выйти',
    },
    loginPage: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      login: 'Войти',
      toSignup: 'Регистрация',
      errors: {
        invalidPassword: 'Неверные имя пользователя или пароль',
      },
    },
    signupPage: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      signup: 'Зарегистрироваться',
      toLogin: 'Авторизация',
      errors: {
        username: {
          required: 'Имя пользователя обязательно',
          wrongLength: 'От 3 до 20 символов',
        },
        password: {
          required: 'Пароль обязателен',
          wrongLength: 'Не менее 6 символов',
        },
        passwordConfirmation: {
          notMatch: 'Пароли должны совпадать',
        },
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
      validation: {
        required: 'Название канала является обязательным полем',
        notOneOf: 'Название канала не должно содержаться в списке: {{list}}',
      },
      toast: {
        loading: 'Переименование канала...',
        success: 'Канал переименован в {{name}}!',
        error: 'Ошибка переименования канала в {{name}}!',
      },
    },
    modalChannelRemover: {
      title: 'Удалить канал {{name}}',
      remove: 'Удалить',
      cancel: 'Отменить',
      toast: {
        loading: 'Удаление канала...',
        success: 'Канал {{name}} удалён!',
        error: 'Ошибка удаления канала {{name}}!',
      },
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
