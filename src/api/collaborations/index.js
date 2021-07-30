/* eslint-disable comma-dangle */
/* eslint-disable indent */
const CollaborationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (
    server,
    { collaborationsService, playlistsongsService, validator }
  ) => {
    const collaborationsHandler = new CollaborationsHandler(
      collaborationsService,
      playlistsongsService,
      validator
    );

    server.route(routes(collaborationsHandler));
  },
};
