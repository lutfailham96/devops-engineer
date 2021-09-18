const app = require('./app');

require('dotenv').config();

const listenPort = parseInt(process.env.LISTEN_PORT);

app.listen(listenPort, () => {
  console.log(`Node app running on port: ${listenPort}`);
});
