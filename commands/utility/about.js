const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class aboutCommand extends Command {
	constructor() {
		super('about', {
			aliases: ['about', 'credit'],
			category: 'utility',
			description: {
				content: 'About me ( the bot )',
				usage: '',
				examples: ['']
			}
		});
	}

	async exec(message) {
		const aboutEmbed = new MessageEmbed()
			.setColor('#ff9900')
			.setAuthor('Supositware#1616', this.client.user.avatarURL)
			.setTitle('About me')
			.setURL('https://gitlab.com/LoicBersier/DiscordBot')
			.setDescription('This bot is made using [discord.js](https://github.com/discordjs/discord.js) & [Discord-Akairo](https://github.com/discord-akairo/discord-akairo)\nHelp command from [hoshi](https://github.com/1Computer1/hoshi)\nThanks to Tina the Cyclops girl#5759 for inspiring me for making this bot!')
			.setFooter('Gitlab link in the title');
				
		message.channel.send(aboutEmbed);
	}
}

module.exports = aboutCommand;