const { Command } = require('discord.js-commando');
const responseObject = require("../../json/randPic.json");
module.exports = class BadmemeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'badmeme',
            group: 'fun',
            memberName: 'badmeme',
            description: `Some very bad meme. There is currently **${Object.keys(responseObject).length}** meme`,
        });
    }

    async run(message) {
        const number = Object.keys(responseObject).length;
        const picNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
            message.channel.send(picNumber, {files: [responseObject[picNumber]]});
          }
};