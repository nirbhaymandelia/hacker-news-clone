// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const jest = require('jest');

let argv = process.argv.slice(2);

// Watch unless on CI, in coverage mode, explicitly adding `--no-watch`,
// or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--no-watch') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  argv.push('--watch');
}

// Jest doesn't have this option so we'll remove it
if (argv.indexOf('--no-watch') !== -1) {
  argv = argv.filter((arg) => arg !== '--no-watch');
}

jest.run(argv);
