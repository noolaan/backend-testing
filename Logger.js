const chalk = require('chalk');
const moment = require('moment');

class Logger {

    constructor(client, opts = {}) {
        if(!opts) return null;

        Object.defineProperty(this, 'client', {
            value: client
        });
    }

    log(message, opts = {}) {
        this._write(message, { ...opts, type: 'LOG' });
    }

    info(message, opts = {}) {
        this._write(message, { ...opts, type: 'INFO' });
    }

    warn(message, opts = {}) {
        this._write(message, { ...opts, type: 'WARN' });
    }

    debug(message, opts = {}) {
        this._write(message, { ...opts, type: 'DEBUG' });
    }

    error(message, opts = {}) {
        this._write(message, { ...opts, type: 'ERROR' });
    }

    _write(string = '', { type }) {

        const color = Constants.Colors[type] || Constants.Colors.NONE;
        const header = `${chalk.hex(color)(`[${this.date}]`)}`;

        console.log(`${header} : ${chalk.bold(`[${type}]`)} ${string}`); //eslint-disable-line

    }

    get date() {
        return moment().format("MM/DD hh:mm:ss");
    }

}

module.exports = Logger;

const Constants = {
    Colors: {
        NONE: 0x6e6e6e,
        LOG: 0x5e97d1,
        INFO: 0x5e97d1,
        WARN: 0xe9d15f,
        DEBUG: 0xc573d1,
        ERROR: 0xe56060,
        SUCCESS: 0x6ccf69
    }
};