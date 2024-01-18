const { SlashCommandBuilder } = require("@discordjs/builders");
const util = require("../util");
const codeReply = require('../replyScript/codeReply.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete-msg")
        .setDescription("BOT刪除特定訊息")
        .addStringOption((option) => 
            option
                .setName("message_id")
                .setDescription('訊息ID')
                .setRequired(true),
        )
        .addStringOption((option) => 
            option
                .setName("channel_id")
                .setDescription('頻道ID')
                .setRequired(false),
        ),
    async execute(interaction, client) {
        try {
            if(util.checkRole(interaction, interaction.member._roles)){
                var channelID = (interaction.options.getString("channel_id") != null)?interaction.options.getString("channel_id").toString() :interaction.channelId
                const channel = await client.channels.cache.get(channelID)

                if(channel == undefined)
                    throw "CHANNEL_ERROR"
                    
                const messageID = interaction.options.getString("message_id")
                const message = await channel.messages.fetch(messageID)

                message.delete()

                interaction.reply({
                    content: `<@!${interaction.user.id}> ${codeReply["DELETE_MESSAGE_SUCCESS"]}${messageID}`,
                    ephemeral: false,
                });
            }
        } catch (error) {
            util.appendToLogFile(error);
            util.showErrorReply(interaction, error)
        }
        
    }
}
