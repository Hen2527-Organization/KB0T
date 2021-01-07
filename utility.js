exports.ready = function(client) {
	client.user.setActivity("Type $help" + "                 ", { type: "STREAMING" });	
}

exports.rmExt = filename => {
	return filename.split('.').slice(0, -1).join('.');
};

exports.isset = v => {
	if (typeof v !== 'undefined') {
		return true;
	} else {
		return false;
	}
};

exports.error = (ch, str) => {
	ch.send(str);
};

