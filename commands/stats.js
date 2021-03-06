const Discord = require('discord.js');
const os = require('os');

const moment = require('moment');
const { mem } = require('node-os-utils');
const { stripIndent } = require('common-tags')
module.exports.execute = async (client, message, args) => {


    const { totalMemMb, usedMemMb } = await mem.info();
    let servercount = client.guilds.cache.size;
    let usercount = client.users.cache.size;
    let channelscount = client.channels.cache.size;
    let arch = os.arch();
    let platform = os.platform();
    let shard = client.ws.shards.size;
    let NodeVersion = process.version;
    let cores = os.cpus().length;
    let djsversion = Discord.version;
    let yarnversion = client.config.version;

    let stats = new Discord.MessageEmbed()
    .setTitle(`Statistics of ${client.user.username}`)
    .setColor('RED')
    .setThumbnail(client.user.displayAvatarURL())
    .addField('Owner', '[Aspekts](https://twitch.tv/aspekts)')
    .addField("Server Count", `${servercount}`, true)
    .addField("Users Count", `${usercount}`, true)
    .addField("Channel's Count", `${channelscount}`, true)
    .addField('Architecture', `${arch}`, true)
    .addField('Platform', `${platform}`, true)
    .addField('Node-Version', `${NodeVersion}`, true)
    .addField('Shards', `${shard}`, true)
    .addField('Cores', `${cores}`, true)
    .addField('Total RAM',`${totalMemMb}MB`)
    .addField('Used RAM',`${usedMemMb}MB`)
    .addField('Discord.js Version',`${djsversion}`, 
    true)
    .addField(`Yarn Version`,`${yarnversion}`)
    .setTimestamp()
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
    message.channel.send(stats);
};

module.exports.help = {
    name: "stats",
    aliases:['info', 'i'],
    usage:'stats'
}