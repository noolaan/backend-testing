class Server {

    constructor(client, opts) {

        this.id = opts.id;
        this.users = opts.users || new Map();

        this._ping = null;

    }

    async announce() {

    }

    async shutdown() {

    }

    async _banUser(user, infraction) {
        //send api request to ban user from game
    }

    async _kickUser(user, infraction) {
        //send api request to kick user from game
    }

    get lastPinged() {
        if(!ping) return 0;
        return new Date().getTime() - this._ping;
    }

}

module.exports = Server;