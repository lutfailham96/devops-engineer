const app = require('./app');

const listenPort = 3000;

app.listen(listenPort, () => {
  console.log(`Node app running on port: ${listenPort}`);
});
