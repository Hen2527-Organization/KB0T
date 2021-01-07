const Discord = require("discord.js");
const axios = require("axios");
const lib = require("./libs/KB0T-v2.js");
const client = new Discord.Client();
const util = require("./utility.js");
const fs = require("fs");
const p = "$"; // Prefix
const { token, etc } = require("./config.json");
const cmd_dir = "./commands/"; // Commands

client.once('ready', () => {
	console.info("Bot Ready!");
	util.ready(client);
	let files = fs.readdirSync(cmd_dir);
	files.forEach(f => {
		f = f.toLowerCase();
		cmd(f);
		let alias = req(f).alias;
		if (util.isset(alias)) {
			alias.forEach(alia => {
				addAlia(alia, f);
			});
		}
	});
});


client.login(token);

function cmd(path) {
	let str = util.rmExt(path); // Remove File Extension, It's a Command
	addAlia(str, path); // Remove Dupiclated Code
}

function addAlia(alia, path) {
	let v = req(path);
	addArg(p, alia, (msg, args) => v.cmd(msg, args, client));
}

function addArg(p, cmd,  fx) {
	client.on("message", msg => {
        	if (!msg.content.startsWith(p)) return;

        	const args = msg.content.slice(p.length).trim().split(' ');
        	const cmd1 = args.shift().toLowerCase();

		if (cmd1 == cmd) {
			fx(msg, args);
		}
	});
}

function joinReturnMessage(k, v) { addCmd(k, msg => { msg.channel.send(v); }); }

function req(e) {
	return require(cmd_dir + e);
}

class Text {
	constructor(text) {
		this.text = text;
	}
}