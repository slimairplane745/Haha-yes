const { Command } = require('discord-akairo');

class OwnedCommand extends Command {
	constructor() {
		super('owned', {
			aliases: ['owned'],
			category: 'general',
			description: {
				content: 'OWNED',
				usage: '',
				examples: ['']
			}
		});
	}

	async exec(message) {
		let ownedMessage = ['TROLOLOLO OWNED EPIC STYLE', 'Owned noob', 'HAHA BRO YOU JUST GOT OOOOOOOOWNED HAHAHAHAHHAHA NOOOB NOOOOB NOOOB OWNED NOOB<:youngtroll:488559163832795136>', '<a:op:516341492982218756> op op op owned epic style <a:op:516341492982218756>'];
		ownedMessage = ownedMessage[Math.floor( Math.random() * ownedMessage.length )];
		message.channel.send(ownedMessage);
	}
}

module.exports = OwnedCommand;