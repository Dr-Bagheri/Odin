module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::websocket',
    config: {
      enabled: true,
      initialize: (strapi) => {
        require('../websocket')(strapi);
      },
      load: {
        before: ['responseTime', 'logger', 'cors', 'responses', 'gzip'],
        after: ['parser', 'router'],
      },
    },
  },
]; 