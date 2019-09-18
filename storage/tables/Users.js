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

    async grabLatestBan(target) {
        try {
            return await this._index.filter({ target, type: 'BAN' }).orderBy(this.r.desc('case')).limit(1);
        } catch(error) {
            this._error(error);
        }

    }

}

module.exports = UsersTable;