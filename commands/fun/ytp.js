const { Command } = require('discord-akairo');
const YTPGenerator = require('ytpplus-node');
const os = require('os');
const fs = require('fs');
const youtubedl = require('youtube-dl');
const { prefix } = require('../../config.json');

class ytpCommand extends Command {
	constructor() {
		super('ytp', {
			aliases: ['ytp', 'ytpplus', 'ytp+'],
			category: 'fun',
			args: [
				{
					id: 'add',
					match: 'flag',
					flag: ['--add']
				},
				{
					id: 'pool',
					match: 'flag',
					flag: ['--pool']
				},
				{
					id: 'force',
					match: 'flag',
					flag: ['--force']
				},
				{
					id: 'link',
					type: 'string'
				}
			],
			description: {
				content: 'Generate random ytp | --add with a link or attachment to add a video to the pool, only .mp4 work | --pool to see how many vid there is currently in the pool | --force to make the command work outside of nsfw channel BE AWARE THAT IT WON\'T CHANGE THE FINAL RESULT SO NSFW CAN STILL HAPPEN',
				usage: '',
				examples: ['']
			}
		});
	}

	async exec(message, args) {
		let MAX_CLIPS = 20;

		if (args.pool) {
			let mp4 = [];
			fs.readdirSync('./asset/ytp/userVid/').forEach(file => {
				if (file.endsWith('mp4')) {
					mp4.push(file);
				}
			});

			return message.channel.send(`There is currently ${mp4.length} videos, you can add yours by doing \`\`${prefix[0]}ytp --add (link or attachment)\`\``);
		}

		if (args.add) {
			let loadingmsg = await message.channel.send('Downloading <a:loadingmin:527579785212329984>');
			let Attachment = (message.attachments).array();
			let url = args.link;
			// Get attachment link
			if (Attachment[0] && !args.link) {
				url = Attachment[0].url;
			}
			
			if (url) {
				return youtubedl.exec(url, ['--format=mp4', '-o', `./asset/ytp/userVid/${message.id}.mp4`], {}, function(err) {
					if (err) {
						console.error(err);
						loadingmsg.delete();
						return message.channel.send('An error has occured, I can\'t download from the link you provided. Is it an mp4?');
					} else {
						let mp4 = [];
						fs.readdirSync('./asset/ytp/userVid/').forEach(file => {
							if (file.endsWith('mp4')) {
								mp4.push(file);
							}
						});

						loadingmsg.delete();
						return message.reply(`Video sucessfully added to the pool! There is now ${mp4.length} videos`);
					}
				});
			} else {
				loadingmsg.delete();
				return message.channel.send('You need a valid video link!');
			}
		} 


		if (!message.channel.nsfw && !args.force) return message.channel.send('Please execute this command in an NSFW channel ( Content might not be NSFW but since the video are user submitted better safe than sorry ) OR --force to make the command work outside of nsfw channel BE AWARE THAT IT WON\'T CHANGE THE FINAL RESULT SO NSFW CAN STILL HAPPEN');

		// Read userVid folder and select random vid and only take .mp4
		let mp4 = [];
		let asset = [];
		let files = fs.readdirSync('./asset/ytp/userVid/');
		// Count number of total vid
		files.forEach(file => {
			if (file.endsWith('mp4')) {
				mp4.push(file);
			}
		});
		// Select random vid depending on the ammount of MAX_CLIPS
		for (let i = 0; i < MAX_CLIPS; i++) {
			let random = Math.floor(Math.random() * files.length);
			let vid = `./asset/ytp/userVid/${files[random]}`;
			if (files[random].endsWith('mp4') && !files[random].endsWith('temp.mp4')) {
				if (!asset.includes(vid)) {
					asset.push(vid);
				}
			}
		}

		let loadingmsg = await message.channel.send(`Processing, this can take a **long** time, i'll ping you when i finished <a:loadingmin:527579785212329984>\nSome info: There is currently ${mp4.length} videos, you can add yours by doing \`\`${prefix[0]}ytp --add (link or attachment)\`\``);


		let options = {  
			debug: false, // Better set this to false to avoid flood in console
			MAX_STREAM_DURATION: Math.floor((Math.random() * 3) + 1), // Random duration of video clip
			sources: './asset/ytp/sources/',
			sounds: './asset/ytp/sounds/',
			music: './asset/ytp/music/',
			resources: './asset/ytp/resources/',
			temp: os.tmpdir(),
			sourceList: asset,
			outro: './asset/ytp/outro.mp4', // Need an outro or it won't work
			OUTPUT_FILE: `${os.tmpdir()}/${message.id}_YTP.mp4`,
			MAX_CLIPS: MAX_CLIPS,
			transitions: true,
			effects: {  
				effect_RandomSound: true,
				effect_RandomSoundMute: true,
				effect_Reverse: true,
				effect_Chorus: true,
				effect_Vibrato: true,
				effect_HighPitch: true,
				effect_LowPitch: true,
				effect_SpeedUp: true,
				effect_SlowDown: true,
				effect_Dance: true,
				effect_Squidward: false // Not yet implemented
			}
		};
	
		new YTPGenerator().configurateAndGo(options)
			.then(() => {
				loadingmsg.delete();
				return message.reply('Here is your YTP!', {files: [`${os.tmpdir()}/${message.id}_YTP.mp4`]})
					.catch(() => {
						return message.channel.send('Whoops, look like the vid might be too big for discord, my bad, please try again');
					});
			})
			.catch(err => {
				console.error(err);
				loadingmsg.delete();
				return message.reply('Oh no! An error has occured!');
			});
	}
}

module.exports = ytpCommand;