const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");
const util = require("../util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("intro-progressors")
        .setDescription("【攻略區發文權限】"),
    async execute(interaction, client) {
        try {
            if(util.checkRole(interaction, interaction.member._roles)){
                const embed = new EmbedBuilder()
                    .setColor(0x54BA71)
                    .setTitle("哈嗚...人家做不到啦......\n【攻略區發文權限】")
                    .setDescription("「好痛...嗚嗚...靜？靜？你在哪裡？...嗚嗚，早知道就不跟靜一起來魔獄塔冒險了」\n\n雖然人家是被靜抓著一起去魔獄塔裡冒險，但靜是我最重要的朋友，人家雖然很害怕，但是為了最重要的朋友，人家還是跟著去了。可是走著走著，靜突然看到一隻蝴蝶就開心地跑遠了，人家追不到靜...還跌倒了...嗚嗚\n\n人家現在被困在塔裡了，這裡好黑，肚子又好餓，有人可以教教人家怎麼破塔找到回家的路呢？ \n...嗚嗚，好想念舒適的房間、鬆軟的床、美味的蛋糕\n\n---------------------------------------------\n如果你願意幫助露露 \n請在下方點選「<:face_lulu07:958730738549801090> 」領取攻略組身份\n反之，請在下方點選「<:face_lulu08:963405954781704212>」取消攻略組身份\n成為露露的隊員，協助她渡過難關\n\n注意！\n領取身份組前請先閱讀 <#796932302940012546> 釘選內容\n並依照格式撰寫攻略")
                    .setImage("https://cdn.discordapp.com/attachments/933707595301150740/958727601273323540/IMG_5068.png")
                    
                const list = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId('button_progressors_1')
                        .setLabel('好，露露跟我走')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji({
                            "id": `958730738549801090`,
                            "name": `face_lulu07`,
                            "animated": false
                        }),
                    new ButtonBuilder()
                        .setCustomId('button_progressors_0')
                        .setLabel('累了，下次再說')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji({
                            "id": `963405954781704212`,
                            "name": `face_lulu08`,
                            "animated": false
                        })
                )


                const channel = await client.channels.fetch(interaction.channelId)

                await interaction.deferReply()

                await channel.send({
                    content: ``,
                    embeds: [embed],
                    components: [list],
                    ephemeral: false,
                });

                await interaction.deleteReply()
            }
        } catch (error) {
            util.appendToLogFile(error);
            util.showErrorReply(interaction, error)
        }
    }
}
