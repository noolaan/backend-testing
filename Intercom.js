const { Server } = require('./interfaces/');

class Intercom {

    constructor(client) {

        this.servers = new Map();
        this.users = new Map();

        Object.defineProperty(this, 'client', {
            value: client
        });

    }

    async _addUser(data) {
        let user = null;
        if(this.users.has(data.id)) {
            this.client.logger.error('user joined a new server without leaving one... hello???');
            return undefined;
        } else {
            user = await this.client.storageManager.tables.users.grab(data.id);
            this.users.set(user.id, user);
        }

        if(this.servers.has(data.serverId)) {
            this.servers.users.set(user.id, user);
        } else {
            const server = new Server(this.client, { 
                id: data.serverId,
                users: new Map([[user.id, user]])
            });
            this.servers.set(data.serverId, server);
        }

        return user;

    }

}

module.exports = Intercom;