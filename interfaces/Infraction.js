const { InfractionTypes } = require('../util/Constants.js');

class Infraction {

    constructor(client, data = {}) {

        this.target = data.target.id;
        this.executor = data.executor.id;
    
        this.case = null;
        this.type = InfractionTypes.includes(data.type) ? data.type : null;

        this.timestamp = new Date().getTime();
        this.duration = data.duration || null;
        this.expiration = data.duration ? data.duration + new Date().getTime() : null;
        this.reason = opts.reason;

        this._resolved = false;

        Object.defineProperty(this, 'client', {
            value: client
        })

    }

    async resolve() {

        if(this._resolved) return undefined;

        //code

        this._resolved = true;

    }

    _json() {
        return {
            type: this.type,
            user: this.user,
            case: this.case,
            type: this.type,
            timestamp: this.timestamp,
            duration: this.duration,
            expiration: this.expiration,
            reason: this.reason
        };
    }

}

module.exports = Infraction;