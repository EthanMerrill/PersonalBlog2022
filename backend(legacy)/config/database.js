const path = require('path');

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'postgres',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   }
// });


module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connector: 'bookshelf',
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 8081),
      socketPath: `/cloudsql/${env('INSTANCE_CONNECTION_NAME')}`,
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
    }
  }
});
