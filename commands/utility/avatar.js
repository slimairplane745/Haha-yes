const { Command } = require('discord-akairo');

class AvatarCommand extends Command {
	constructor() {
		super('avatar', {
			aliases: ['avatar', 'avy'],
			category: 'utility',
			args: [
				{
					id: 'user',
					type: 'user'
				}
			],
			description: {
				content: 'Show avatar of the mentioned user or you',
				usage: '(optional) [@user]',
				examples: ['', '@user', 'username']
			}
		});
	}

	async exec(message, args) {
		if (!args.user)
			return message.channel.send('Your avatar:', {files: [message.author.displayAvatarURL() + '?size=2048']});
		else
			return message.channel.send(`${args.user.username}'s avatar:`, {files: [args.user.displayAvatarURL() + '?size=2048']});
	}
}

module.exports = AvatarCommand;