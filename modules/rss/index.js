/* ┌──────────────────────────────────────────────┐ */
/* │ MessageNet RSS module version 0.0.1          │ */
/* ├──────────────────────────────────────────────┤ */
/* │ Copyright © 31.03.2014 by Florian Wendelborn │ */
/* ├──────────────────────────────────────────────┤ */
/* │ Licensed under the MIT license               │ */
/* └──────────────────────────────────────────────┘ */

// require area
var FeedSub = require('feedsub');

// variable area
var events = {
	"feedSubscription":[]
};

exports.Event = function (internalName, options, callback) {
	switch (internalName) {
		case "feedSubscription":
			console.log('RSS: reader added for ' + options.url);
			var reader = new FeedSub(options.url, {
				interval: options.interval || 1,
				emitOnStart: false
			});

			reader.on('item', function(item) {
				callback(false, {
					item: item
				});
			});

			reader.start();

			// define remove function
			this.remove = function () {
				reader.stop();
				console.log('RSS: reader removed');
			}
		break;
	}

	return this;
}