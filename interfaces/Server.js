class Server {

    constructor(client, opts) {

        this.id = opts.id;
        this.version = opts.version;

        this.queue = [];

        this._ping = null;

        Object.defineProperty(this, 'client', {
            value: client
        });

    }

    async update(players) {
        this._ping = new Date().getTime();
        for(const player of players) {
            if(this.players.has(player.id)) continue; //already in same server since last ping
            else { //joined server since last ping
                let intercomPlayer = this.client.intercom.players.get(player.id);
                if(intercomPlayer) intercomPlayer.server = this; //update server if user exists
                else intercomPlayer = await this.client.intercom.addPlayer(player, this);
                intercomPlayer._ping = this._ping;
            }
        }
        //TODO: Remove players from playerlist based on ping.
    }

    async announce() {
        
    }

    async shutdown() {

    }

    async _banUser(user, infraction) { //eslint-disable-line 
        //send api request to ban user from game
    }

    async _kickUser(user, infraction) { //eslint-disable-line
        //send api request to kick user from game
    }

    get players() {
        return this.client.intercom.players.filter(p=>p.server.id === this.id);
    }

    get lastPinged() {
        if(!this._ping) return 0;
        return new Date().getTime() - this._ping;
    }

}

module.exports = Server;