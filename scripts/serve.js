/* eslint-disable consistent-return */
/* eslint-disable no-console */

// eslint-disable-next-line import/no-unresolved
const { app } = require('../dist/server/bundle.js');

const PORT = process.env.PORT || 3000;

// Use the native Node.js cluster module to create a worker processes for each CPU

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.info(`Server running on port ${PORT}`);
});
