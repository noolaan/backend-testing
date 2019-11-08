const Collection = require('./util/Collection.js');
const { Server, Player } = require('./interfaces/');

class Intercom {

    constructor(client) {

        this.servers = new Collection();
        this.players = new Collection();

        Object.defineProperty(this, 'client', {
            value: client
        });

        setInterval(() => {
            const server = this.servers.first();
            if(server) {
                console.log(server._ping, server.lastPinged);
            }
        }, 5000);

    }

    async addPlayer(data, server) {

        const player = new Player(this.client, {
            ...data,
            server
        });
        
        this.players.set(player.id, player);
        console.log("player", player);

        let result = await this.client.storageManager.tables.users.get(player.id);
        if(!result) result = await this.client.storageManager.tables.users.set(player.id, player.json());

        return player;

    }

}

module.exports = Intercom;