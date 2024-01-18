const { SlashCommandBuilder } = require("@discordjs/builders");
const util = require("../util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("send-msg")
        .setDescription("BOT發送特定訊息")
        .addStringOption((option) => 
            option
                .setName("message")
                .setDescription('訊息')
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

                await interaction.deferReply()

                await channel.send({
                    content: interaction.options.getString("message"),
                    ephemeral: false,
                })

                await interaction.deleteReply()
            }
        } catch (error) {
            util.appendToLogFile(error);
            util.showErrorReply(interaction, error)
        }
        

    }
}