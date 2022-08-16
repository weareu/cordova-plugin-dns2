"use strict";

const dns = require('node:dns');

//Fix Cordova Electron 3.0 Args Bug. Electron context bridge uses ... for receiving args. This causes
//args to be nested in another array when sent, this is not like other platform args and makes plugin compatibility hard. 
// This may change in future so we'll handle it here.
function getArgs(args) {
    if(Array.isArray(args) && args.length === 1 && Array.isArray(args[0])) {
        return args[0];
    }
    else {
        return args;
    }
}

function resolve(args) {
	args = getArgs(args);
	
	const hostname = args[0];

	return new Promise((resolve, reject) => {
		dns.lookup(hostname, (err, address, family) => {
			if(err) {
				reject(err);
			}
			
			if(address) {
				resolve(address);
			}
			else {
				reject('No Address Found');
			}
		});
	});
}

module.exports = {
	resolve: resolve
};
