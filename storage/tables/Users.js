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

}

module.exports = UsersTable;