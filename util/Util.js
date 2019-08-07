const fs = require('fs');
const path = require('path');

class Util {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    static readdirRecursive(directory) {

        const result = [];

        (function read(directory) {
            const files = fs.readdirSync(directory);
            for(const file of files) {
                const filePath = path.join(directory, file);

                if(fs.statSync(filePath).isDirectory()) {
                    read(filePath);
                } else {
                    result.push(filePath);
                }
            }
        }(directory));

        return result;

    }

}

module.exports = Util;