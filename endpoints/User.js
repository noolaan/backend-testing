const { Endpoint } = require('../interfaces');

class UserEndpoint extends Endpoint {

    constructor(client) {

        super(client, {
            id: 'user',
            path: '/api/user'
        });

        this.routes = [
            ['get', this._getUser.bind(this)], //server requests user information
            ['post', this._postUser.bind(this)], //user joins server
            ['delete', this._deleteUser.bind(this)] //user leaves server
        ];

        this._handleRoutes();

    }

    async _getUser(req, res) {
        let user = this.client.intercom.users.get(req.body.id);
        if(!user) user = await this.client.storageManager.tables.users.grab(req.body.id);
        console.log(user);

        return res.send(user.json());
    }

    async _postUser(req, res) {
        const schema = {
            id: this.Joi.number().integer().required(),
            serverId: this.Joi.string().required()
        };

        const result = this.Joi.validate(req.body, schema);
        if(result.error) {
            return res.status(400).send(result.errors.details[0].message);
        }

        const user = await this.client.intercom._addUser(req.body);
        res.send(user.json());
    }

    async _deleteUser(req, res) {

    }

}

module.exports = UserEndpoint;