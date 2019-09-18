const Collection = require('./util/Collection.js');
const { Server, Player } = require('./interfaces/');

class Intercom {

    constructor(client) {

        this.servers = new Collection();
        this.players = new Collection();

        Object.defineProperty(this, 'client', {
            value: client
        });

    }

    async addPlayer(data, server) {

        const player = new Player(this.client, {
            ...data,
            server
        });
        
        this.players.set(player.id, player);

        let result = await this.client.storageManager.tables.users.get(player.id);
        if(!result) result = await this.client.storageManager.tables.users.set(player.id, player.json());

        console.log(result);

        return player;

    }

}

module.exports = Intercom;