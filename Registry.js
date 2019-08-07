const path = require('path');

const { Endpoint } = require('./interfaces/');
const Util = require('./util/Util.js');

class Registry {

    constructor(client) {

        this.routes = new Map();

        Object.defineProperty(this, 'client', {
            value: client
        });

    }

    async loadEndpoints() {
        const directory = path.join(process.cwd(), 'endpoints');
        const files = Util.readdirRecursive(directory);

        const loaded = [];
        for(const path of files) {
            const func = require(path);
            if(typeof func !== 'function') {
                this.client.logger.error("Attempted to index an invalid function as a route.");
                continue;
            }

            const route = new func(this.client);
            loaded.push(await this.loadRoute(route, path));
        }

        return loaded;

    }

    async loadRoute(route, directory) {
        if(this.routes.has(route.id)) {
            this.client.logger.error("Attempted to reload an existing route.");
            return null;
        }
        
        if(directory) route._directory = directory;
        this.routes.set(route.id, route);
        this.client.logger.log(`Loaded route ${route.id}`);
        return route;
    }

}

module.exports = Registry;