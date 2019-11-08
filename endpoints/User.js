const { Endpoint } = require('../interfaces');

class UserEndpoint extends Endpoint {

    constructor(client) {

        super(client, {
            id: 'user',
            path: '/api/user/:id'
        });

        this.routes = [
            ['get', this._getUser.bind(this)], //server requests user information
        ];

        this._handleRoutes();

    }

    async _getUser(req, res) {
        const id = req.params.id;
        const user = await this.client.storageManager.tables.users.get(id);
        if(!user) {
            //idfk
        }

        // let data = { user };
        // if(user.banned) {
        //     const infraction = await this.client.storageManager.tables.users.grabLatestBan(id);
        //     data.infraction = infraction;
        // }

        return res.send(data);
    }

}

module.exports = UserEndpoint;