const { Endpoint, Server } = require('../interfaces');

class ServerEndpoint extends Endpoint {

    constructor(client) {

        super(client, {
            id: 'server',
            path: '/api/server'
        });

        this.routes = [
            ['post', this._postServer.bind(this)]
        ];

        this._handleRoutes();

        Object.defineProperty(this, 'client', {
            value: client
        });

    }

    async _postServer(req, res) {
        const { players, serverId } = req.body;
        let server = this.client.intercom.servers.get(serverId);
        if(!server) {
            server = new Server(this.client, {
                id: serverId
            });
            this.client.intercom.servers.set(serverId, server);
        }
        server.update(players);
        res.send({
            actions: server.queue
        });
    }


}

module.exports = ServerEndpoint;