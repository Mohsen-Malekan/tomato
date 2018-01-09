/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function (app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  app.route('/')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });

  app.route('/landing')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the admin.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/admin.html`));
    });
}
