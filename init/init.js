const rethinkdb = require('rethinkdbdash');
const r = new rethinkdb();

const blah = async () => {
    await r.dbCreate('apocalypse_rising');
    await r.db('apocalypse_rising').tableCreate('users');
    await r.db('apocalypse_rising').tableCreate('infractions');
};

blah();