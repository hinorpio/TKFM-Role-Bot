const dotenv = require('dotenv');
const util = require('../util');
const codeReply = require('../replyScript/codeReply.json');

module.exports = {
    data: {
        name: 'button_progressors_1'
    },
    async execute(interaction, client) {
        
        interaction.member.roles.add(process.env.DC_PROGRESSORS_ID)
        
        try {
            await interaction.reply({
                content: `<@!${interaction.user.id}> ${codeReply["PROGRESSORS_ROLE_CLAIMED"]}`,
                ephemeral: true,
            })
        } catch (error) {
            if(error) console.log(error);
            // util.appendToLogFile(error);
            util.showErrorReply(interaction, error)
        }
    }
}