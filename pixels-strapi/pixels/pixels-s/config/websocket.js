module.exports = {
  load: {
    before: ['responseTime', 'logger', 'cors', 'responses', 'gzip'],
    after: ['parser', 'router'],
  },
  settings: {
    websocket: {
      enabled: true,
      initialize: (strapi) => {
        require('../websocket')(strapi);
      },
    },
  },
}; 