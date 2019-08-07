const express = require('express');
const bodyParser = require('body-parser');

const Logger = require('./Logger.js');
const Intercom = require('./Intercom.js');
const Registry = require('./Registry.js');
const StorageManager = require('./storage/StorageManager.js');

const { UsersTable } = require('./storage/tables/');

const options = require('./options.json');

class Client {

    constructor() {

        this.logger = new Logger(this);

        this.intercom = new Intercom(this);
        this.registry = new Registry(this);
        this.storageManager = new StorageManager(this, {
            name: 'apocalypse_rising'
        });

        this.app = express();
        this.app.listen(options.express.port, () => this.logger.debug(`Listening on port ${options.express.port}`));
        this.app.use(bodyParser.json());

        this._built = false;

    }

    async build() {

        await this.registry.loadEndpoints();

        await this.storageManager.createTables([
            ['users', UsersTable]
        ]);

        this._built = true;
    }

}

module.exports = Client; 