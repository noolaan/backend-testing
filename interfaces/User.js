class User {

    constructor(client, opts = {}) {

        this.id = opts.id;
        this.username = opts.username;

        this.server = opts.server;
        this.banned = Boolean(opts.banned);

    }

    async ban(infraction) {
        if(!this.server) return undefined;
        await this.server._ban(this, infraction);
    }

    async kick(infraction) {
        if(!this.server) return undefined;
        await this.server._ban(this, infraction);
    }

    json() {
        return {
            id: this.id,
            username: this.username,
            serverId: this.server,
            banned: this.banned
        };
    }

}

module.exports = User;