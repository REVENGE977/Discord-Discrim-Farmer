const Discord = require("discord.js"), bot = new Discord.Client();

bot.on("ready", () => {
	console.log("Running as " + bot.user.username);
	var currentDiscrim = bot.user.discriminator, discrimString = bot.user.discriminator.toString(), check = new RegExp("^(\d)(?!\1+$)\d{11}$");
	console.log("Current Discrim: " + currentDiscrim);
	if(!(discrimString.startsWith("000") || discrimString.endsWith("000") || discrimString == "1337" || check.test(discrimString))) {
		console.log("Changing discrim.");
		var guilds = bot.guilds.array();
		for(let guild of guilds) {
			guild.fetchMembers().then(function(m) {
				var members = guild.members.array();
				for(let member of members) {
					if(member.user.discriminator == currentDiscrim && member.user.username !== bot.user.username) {
						console.log(member.user.username);
						bot.user.setUsername(member.user.username)
                        console.log("New Discrim: " + bot.user.discriminator + ", new username: " + bot.user.username);
                        process.exit(1)

					}
				}
			});
		}
	}else {
		console.log("Discrim not changed.");
	}
});

bot.login("Your Token");
