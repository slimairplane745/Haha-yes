const { Command } = require('discord.js-commando');
const responseObject = require("../../randPic.json");
module.exports = class BadmemeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'badmeme',
            group: 'fun',
            memberName: 'badmeme',
            description: 'Send some very bad memes.',
        });
    }

    run(message) {
        const number = 17;
        const picNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
            message.channel.send(`${picNumber}: ${responseObject[picNumber]}`);
          }
};