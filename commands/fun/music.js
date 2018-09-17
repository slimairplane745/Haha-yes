const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
module.exports = class MusicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'music',
            group: 'fun',
            memberName: 'music',
            description: 'Play youtube link in vocal',
            guildOnly: true,
            args: [
                {
                    key: 'ytblink',
                    prompt: 'Wich Youtube link would you like to play?\nTo stop the bot just do "haha music stop"',
                    type: 'string',
                }
            ]
        });
    }

    async run(message, { ytblink }) {
        const { voiceChannel } = message.member;

//  If not in voice channel ask user to join
            if (!voiceChannel) {
                return message.reply('please join a voice channel first!');
                
            } else 
//  If user say "stop" make the bot leave voice channel
            if (ytblink == 'stop') {
                voiceChannel.leave()
            } else 
            voiceChannel.join().then(connection => {
                const stream = ytdl(ytblink, { filter: 'audioonly' });
                const dispatcher = connection.playStream(stream);
    
//  End at then end of the audio stream
                dispatcher.on('end', () => voiceChannel.leave());
            });

        }
    }