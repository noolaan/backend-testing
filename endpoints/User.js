const { Endpoint } = require('../interfaces');

class UserEndpoint extends Endpoint {

    constructor(client) {

        super(client, {
            id: 'user',
            path: '/api/user'
        });

        this.routes = [
            ['get', this._getUser.bind(this)], //server requests user information
        ];

        this._handleRoutes();

    }

    async _getUser(req, res) {
        const user = await this.client.storageManager.tables.users.get(req.body.id);
        if(!user) {
            
        }

        return res.send(user.json());
    }

}

module.exports = UserEndpoint;