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
            let intercomPlayer = this.client.intercom.players.get(player.id);
            if(intercomPlayer) {
                console.log(`found existing player: ${player.username}`); //eslint-disable-line no-console
                if(intercomPlayer.server.id !== this.id) { //update server if server doesnt match
                    console.log(`server updating for player: ${player.username}`); //eslint-disable-line no-console
                    intercomPlayer.server = this;
                }
            } else {
                console.log(`adding player: ${player.username}`); //eslint-disable-line no-console
                intercomPlayer = await this.client.intercom.addPlayer(player, this);
            }
            intercomPlayer._ping = this._ping;
        }

        //remove players if they didnt get pinged
        this.players.filter(p=>p._ping !== this._ping).map((player) => {
            console.log(`removing player: ${player.username}`); //eslint-disable-line no-console
            this.client.intercom.players.delete(player.id);
        });

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