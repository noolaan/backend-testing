const { Endpoint, Server, User } = require('../interfaces');

class ServerEndpoint extends Endpoint {

    constructor(client) {

        super(client, {
            id: 'server',
            path: '/api/server'
        });

        this.routes = [
            ['put', this._putServer.bind(this)]
        ];

        this._handleRoutes();

        Object.defineProperty(this, 'client', {
            value: client
        });

    }

    async _putServer(req, res) {
        const { players, serverId } = req.body;
        let server = this.client.intercom.servers.get(serverId);
        if(!server) {
            server = new Server(this.client, {
                id: serverId
            });
            this.client.intercom.servers.set(serverId, server);
        }
        server._ping = new Date().getTime();
    }


}

module.exports = ServerEndpoint;