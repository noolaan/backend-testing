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
        const { players, serverId, version } = req.body;
        console.log(req.body); //eslint-disable-line no-console
        let server = this.client.intercom.servers.get(serverId);
        if(!server) {
            server = new Server(this.client, {
                id: serverId,
                version
            });
            this.client.intercom.servers.set(serverId, server);
            console.log(`added new server: ${serverId}`);
        }
        server.update(players);
        res.send({
            actions: server.queue
        });
    }


}

module.exports = ServerEndpoint;