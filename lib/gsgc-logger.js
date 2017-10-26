var winston = require('winston'),
    PapertrailTransport = require('winston-papertrail').Papertrail,
    config = null;

const defaultConfig = {
    appName: "Unnamed",
    file: './logs/' + new Date().toISOString() + '.log',
    papertrailHost: 'logs2.papertrailapp.com',
    papertrailPort: 16775
};

module.exports = {

    configure: function(configObj) {
        config = configObj || defaultConfig;

        winston.add(winston.transports.File, {
            level: 'warn',
            filename: config.file,
            maxsize: 1048576
        });

        winston.add(PapertrailTransport, {
            level: 'info',
            host: config.papertrailHost,
            port: config.papertrailPort,
            logFormat: function(level, message) {
                return '[' + level + '](' + config.appName + ') ' + message;
            }
        });

        winston.remove(winston.transports.Console);

        winston.add(winston.transports.Console, {
            level: 'debug',
            colorize: true
        });
    },

    logger: winston
};
