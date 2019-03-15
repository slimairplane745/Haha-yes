const { Command } = require('discord-akairo');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class EvalCommand extends Command {
	constructor() {
		super('update', {
			aliases: ['update', 'pull', 'git pull'],
			category: 'owner',
			ownerOnly: 'true',
			description: {
				content: 'Update the bot with git pull',
				usage: '',
				examples: ['']
			}
		});
	}

	async exec(message) {
		async function update() {
			const { stdout, stderr } = await exec('git pull');
			message.channel.send(stdout);
			message.channel.send(stderr);
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		}
		update();
	}
}

module.exports = EvalCommand;