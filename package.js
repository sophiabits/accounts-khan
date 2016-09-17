Package.describe({
  name: 'qqqry:accounts-khan',
  version: '1.0.0',
  summary: 'Login service for Khan Academy accounts',
  git: 'https://github.com/zwjcarter/accounts-khan.git',
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');

  api.use('underscore', ['server']);
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('ecmascript');

  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('KhanAcademy');

  api.addFiles(['khan_configure.html', 'khan_configure.js'], 'client');
  api.addFiles('khan_server.js', 'server');
  api.addFiles('khan_client.js', 'client');
  api.addFiles('khan.js');
});