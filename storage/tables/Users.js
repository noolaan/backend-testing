const { User } = require('../../interfaces/');
const { Table } = require('../interfaces/');

class UsersTable extends Table {

    constructor(client, opts = {})  {

        super(client, {
            r: opts.r,
            name: opts.name,
            index: opts.index
        });

        Object.defineProperty(this, 'client', {
            value: client
        });

    }

    async grab(id, serverId = null) {
        let user = await this.get(id); //banned, id
        if(!user) {
            user = await this.set(id, {
                id: id,
                banned: false
            });
        }

        if(serverId) user.server = serverId;
        return new User(this.client, user);

    }


}

module.exports = UsersTable;