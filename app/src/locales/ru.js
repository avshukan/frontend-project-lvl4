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
      about: 'Описание',
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
          required: 'Обязательное поле',
          wrongLength: 'От 3 до 20 символов',
        },
        password: {
          required: 'Обязательное поле',
          wrongLength: 'Не менее 6 символов',
        },
        passwordConfirmation: {
          notMatch: 'Пароли должны совпадать',
        },
      },
    },
    channelAdder: {
      channels: 'Каналы',
      name: 'Имя канала',
      add: 'Добавить канал',
      save: 'Сохранить',
      cancel: 'Отменить',
      validation: {
        required: 'Название канала является обязательным полем',
        wrongLength: 'От 3 до 20 символов',
        notOneOf: 'Название канала не должно содержаться в списке: {{list}}',
      },
      toast: {
        success: 'Канал создан',
        error: 'Ошибка создания канала {{name}}!',
      },
    },
    channelMenu: {
      title: 'Управление каналом',
      rename: 'Переименовать',
      remove: 'Удалить',
    },
    modalChannelRenamer: {
      title: 'Переименовать канал {{name}}',
      name: 'Имя канала',
      save: 'Переименовать',
      cancel: 'Отменить',
      validation: {
        required: 'Название канала является обязательным полем',
        wrongLength: 'От 3 до 20 символов',
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
        success: 'Канал удалён',
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
      toIndex: 'На главную',
    },
    about: {
      header: 'Дипломный проект "Чат"',
      text: 'Цель проекта - показать спектр всех стандартных задач, с которыми придётся столкнуться в реальной жизни. Среди них: работа с веб-сокетами, взаимодействие с REST API, использование React (с хуками), Redux (через reduxjs/toolkit), организация роутинга на клиента, авторизация и аутентификация и, конечно же, сборка (webpack) и деплой (heroku).',
    },
  },
};

export default ru;
