const Hapi = require('@hapi/hapi'); // import library hapi
const routes = require('./routes');
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: {                // cors (Cross-Origin Resource Sharing) berfungsi agar web dapat menerima request yang berbeda origin
            origin: ['*'],
        },
    },
  });
 
  server.route(routes);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();
