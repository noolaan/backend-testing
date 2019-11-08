const Collection = require('./util/Collection.js');
const { Server, Player } = require('./interfaces/');

const delay = 60000; //delay for updating information

class Intercom {

    constructor(client) {

        this.servers = new Collection();
        this.players = new Collection();

        Object.defineProperty(this, 'client', {
            value: client
        });

        setInterval(async () => {
            await this._updateServers();
        }, delay);

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

    async _updateServers() {
        const deadServers = this.servers.filter(s=>s.lastPinged > 40000); //no ping in over 40 seconds, missed two pings (30s)
        for(const server of deadServers.values()) {
            for(let player of server.players.values()) {
                if(player.server.id === server.id) {
                    console.log("found player in dead server, purging");
                    this.players.delete(player.id);
                }
            }
            console.log("found dead server, purging");
            this.servers.delete(server.id);
        }
    }

}

module.exports = Intercom;