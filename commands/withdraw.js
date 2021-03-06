const Discord = require("discord.js");
const ms = require("parse-ms");


exports.execute = async (client, message, args) => {

  let user = message.author;

  let member = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`)
  
  let member2 = await client.db.fetch(`money_${message.guild.id}_${user.id}.bank`)

  if (args[0] == 'all') {
    let money = await client.db.fetch(`money_${message.guild.id}_${user.id}.bank`)
    
    await client.db.subtract(`money_${message.guild.id}_${user.id}.bank`, money)
    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, money)
    
    let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have withdrawn ${args[0]} of your 🧶 from your bank`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Specify an amount to withdraw`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You can't withdraw negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You don't have that much money in the bank`);

  if (member2 < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have withdrawn ${args[0]} 🧶 from your bank`);

  message.channel.send(embed5)
  await client.db.subtract(`money_${message.guild.id}_${user.id}.bank`, parseInt(args[0]))
  await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, parseInt(args[0]))
		}
	}
module.exports.help = {
	
		name: "withdraw",
		description: "Withdraw your money from the bank!",
		category: "Economy",
		aliases: ["with"],
    usage:'withdraw <amount>'
	}
	
