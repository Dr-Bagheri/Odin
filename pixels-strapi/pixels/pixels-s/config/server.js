module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3000),
  app: {
    keys: ['myKey1', 'myKey2', 'myKey3', 'myKey4']
  }
}); 