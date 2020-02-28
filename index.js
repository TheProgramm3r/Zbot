const Discord = require('discord.js');
const bot = new Discord.Client();

var servers = {};

const ytdl = require('ytdl-core');

const prefix = '!';

const token = "NjczNTgzNzE1OTA5MTA3NzIz.XjcJ0Q.hVYZLwytrQElSEG467rlAyz_ULI";

const usedCommandRecently = new Set();

bot.on('ready', () => {
    console.log('Bot is Online');
    bot.user.setActivity('AutoDesk Inventor Pro 2020', { type: 'PLAYING' }).catch(console.error);
});
bot.on('message', msg => {
    if (msg.content === "asian") {
        msg.reply('cough cough');
    }
    if (msg.content == "thanks zuhayr") {
        msg.reply('Your welcome, you mortal human being.');

    }
});

bot.on('guildMemberAdd', function (member) {
    let defaultrole = member.guild.roles.find("name", "Homeless");
    member.addRole(defaultrole);
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name == "welcome");
    if (!channel) return;
    channel.send(`Welcome ${member}, to the Homeless Hallway!`)
});

bot.on('message', message => {

    let args = message.content.substring(prefix.length).split(" ");



    switch (args[0]) {
        case 'react':
            message.channel.send('I will rule the world!').then(
            message.react('🤖')
            )
            break;
        case 'cooldown':
            if(usedCommandRecently.has(message.author.id)){
                message.reply('You cannot use that command yet! Wait 3 seconds!')
            }
            else {
                message.reply('You are not on cooldown');
                usedCommandRecently.add(message.author.id);
                setTimeout(() => {
                    usedCommandRecently.delete(message.author.id);
                }, 3000)
            }
            break;
        case 'kick':

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                
                if (member) {
                    member.kick('You were kicked from the server!').then(() => {
                        message.reply(`Successfully kicked ${user.tag}`);

                    }).catch(error => {
                        message.reply('Unable to kick Member');
                        console.log(error);
                    });

                } else {
                    message.reply("User is not is this server.")
                }
            } else {
                message.channel.send('You need to specify a person.')
            }
            break;

            case 'ban':
                const banuser = message.mentions.users.first();

                if (banuser) {
                    const member = message.guild.member(banuser);
                    
                    if (member) {
                        member.ban({reason: 'You were banned from the server!'}).then(() =>{
                            message.reply(`${banuser.tag} was banned from the server!`);



                        }).catch(error => {
                            message.reply('Unable to ban Member');
                            console.log(error);
                        });
                    } else {
                        message.reply("User is not is this server.")
                    }
                } else {
                    message.channel.send('You need to specify a person.')
                }
    
                break;

        case 'ping':
            //message.reply('pong!'); //Specific Person
            message.channel.sendMessage('pong!'); //Specific Channel
            break;
        case 'website':
            message.channel.sendMessage('Twitter.com/thgunn3r'); //Specific Channel
            break;
        case 'info':
            if (args[1] == 'version') {
                message.channel.sendMessage('**Version 1.0**'); //Specific Channel
            }
            else {
                message.channel.sendMessage('Invalid Arguments'); //Specific Channel
            }
        case 'clear':
            if (!args[1]) return message.reply('Enter an amount of messages to delete') //Specific Channel
            message.channel.bulkDelete(args[1]);
            break;
        case 'robotics':
            message.channel.sendMessage('http://brantsteele.net/hungergames/r.php?c=c81yhfAU');
            break;
        case 'grammerly':
            message.channel.sendMessage('Here is a list of premium accounts; https://pastr.io/view/7u5Hxz');
            break;
        case 'user':
            const embed = new Discord.RichEmbed()
                .setTitle('User Info')
                .addField('Username', message.author.username)
                .addField('Current Server', message.guild.name)
                .addField("Roles: ", message.member.roles.map(role => role.name).join(", ")) // user, roles
                .setColor(0x5B2C6F)
                .setThumbnail(message.author.avatarURL)
            message.channel.send(embed);
            break;
        case 'play':

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0],{filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if (server.queue[0]){
                        play(connection, message);
                    }else{
                        connection.disconnect();
                    }
                });
            }

            if(!args[1]){
                message.channel.send("You must enter a youtube url!");
                return;
            }
            if(!message.member.voiceChannel){
                message.channel.send("You must be in a channel");
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
            }
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){

                play(connection, message);
            })
            break;
        case 'skip':

    }
})


bot.login(process.env.token);