const dotenv = require('dotenv');
const util = require('../util');
const codeReply = require('../replyScript/codeReply.json');

module.exports = {
    data: {
        name: 'button_progressors_0'
    },
    async execute(interaction, client) {
        
        interaction.member.roles.remove(process.env.DC_PROGRESSORS_ID)

        try {
            await interaction.reply({
                content: `<@!${interaction.user.id}> ${codeReply["PROGRESSORS_ROLE_REMOVED"]}`,
                ephemeral: true,
            })
        } catch (error) {
            if(error) console.log(error);
            util.appendToLogFile(error);
            util.showErrorReply(interaction, error)
        }
    }
}