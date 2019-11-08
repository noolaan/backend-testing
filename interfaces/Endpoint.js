const Joi = require('@hapi/joi');

const { MethodTypes } = require('../util/Constants.js');

class Endpoint {

    constructor(client, opts = {}) {

        Object.defineProperty(this, 'client', {
            value: client
        });

        this.id = opts.id;
        this.path = opts.path;
     
        this.Joi = Joi;

        this._directory = null;

    }

    async _handleRoutes() {
        for(const [ method, func ] of this.routes) {
            if(!MethodTypes.includes(method)) {
                return this.client.logger.error(`Invalid method type "${method}".`);
            }
            this.client.app[method](this.path, async (...args) => {
                return await func(...args);
            });
        }
    }



}

module.exports = Endpoint;