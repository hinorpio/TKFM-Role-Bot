const dotenv = require('dotenv');
const fs = require('fs')
const { Collection } = require('discord.js');
const mentionReply = require('./replyScript/mentionReply.json');
const codeReply = require('./replyScript/codeReply.json');

dotenv.config()

module.exports = {
    checkRole(interaction, roles) {
        var isValid = false
        var isUserValid = false
        roles.forEach(role => {
            if(role == process.env.DC_ROLE_BLUE_ID || role == process.env.DC_ROLE_RED_ID || role == process.env.DC_ROLE_DRAFT_ID || role == process.env.DC_ROLE_BLUE2_ID)
                isValid = true
        });
        
        if(interaction.user.id == process.env.DC_HINORPIO_ID)
            isUserValid = true

        if(!isValid && !isUserValid){
            interaction.reply({
                content: `<@!${interaction.user.id}> ${codeReply["PERMISSION_DENIED"]}`,
                ephemeral: true,
            });
        }

        return (isValid || isUserValid)
    },
    showErrorReply(interaction, err){
        const message = (codeReply.hasOwnProperty(err))?codeReply[err] :codeReply["UNKNOWN_ERROR"]
        
        interaction.reply({
            content: `<@!${interaction.user.id}> ${message}`,
            ephemeral: true,
        });
        console.error(err);
    },
    mentionReply(message){
        return `<@!${message.author.id}> ${mentionReply[Math.floor(Math.random() * mentionReply.length)]}`;
    },
    handleComments(client){
        const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
        const commands = []
        client.commands = new Collection();

        for(const file of commandFiles){
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        }

        return commands
    },
    handleButtons(client){
        const buttonFiles = fs.readdirSync("./buttons").filter(file => file.endsWith(".js"));
        const buttons = []
        client.buttons = new Collection();

        for(const file of buttonFiles){
            const button = require(`./buttons/${file}`);
            buttons.push(button.data.name);
            client.buttons.set(button.data.name, button);
        }

        return buttons
    },
    handleSelectMenus(client){
        const selectMenusFiles = fs.readdirSync("./selectMenus").filter(file => file.endsWith(".js"));
        const selectMenus = []
        client.selectMenus = new Collection();

        for(const file of selectMenusFiles){
            const selectMenu = require(`./selectMenus/${file}`);
            selectMenus.push(selectMenu.data.name);
            client.selectMenus.set(selectMenu.data.name, selectMenu);
        }

        return selectMenus
    },
    
}