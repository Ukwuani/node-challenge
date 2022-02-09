import config from 'config';

// TODO: see reason config.auth.jwtSecret = 'some-fake-key';

process.env.TEST_MODE = 'test';

process.on('unhandledRejection', (err: Error) => process.stderr.write(`unhandledRejection: ${err.stack}\n`));
