const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActivityType } = require("discord.js");
const util = require("../util");
const codeReply = require('../replyScript/codeReply.json');

const activityList = {
    'GAME': ActivityType.Playing,
    "LISTENING": ActivityType.Listening,
    "WATCHING": ActivityType.Watching,
    "COMPETING": ActivityType.Competing,
    "STREAMING": ActivityType.Streaming
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("edit-status")
        .setDescription("更新BOT的狀態")
        .addStringOption((option) => 
            option
                .setName("activity_name")
                .setDescription('正在進行的活動 e.g. 可愛的熊熊')
                .setRequired(true),
        )
        .addStringOption((option) => 
            option
                .setName("activity_type")
                .setDescription('活動的分類 「GAME：正在玩，LISTENING：正在聽，WATCHING：正在看，COMPETING：競爭，STREAMING：正在直播」')
                .setRequired(true),
        )
        .addStringOption((option) => 
            option
                .setName("status")
                .setDescription('BOT的狀態「ONLINE：線上，DND：請勿打擾，IDLE：閒置，INVISIBLE：隱形」')
                .setRequired(true),
        ),


    async execute(interaction, client) {
        try {
            if(util.checkRole(interaction, interaction.member._roles)){
                client.user.setPresence({
                    activities: [{
                        name: interaction.options.getString("activity_name"),
                        type: activityList[interaction.options.getString("activity_type")]
                    }],
                    status: interaction.options.getString("status")
                })
    
                interaction.reply({
                    content: `<@!${interaction.user.id}> ${codeReply["STATUS_UPDATE_SUCCESS"]}`,
                    ephemeral: false,
                });
            }
            

        } catch (error) {
            util.appendToLogFile(error);
            util.showErrorReply(interaction, error)
        }
        
    }
}
