const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");
const util = require("../util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("intro-audlt")
        .setDescription("【高速公路瀏覽權限】"),
    async execute(interaction, client) {
        try {
            if(util.checkRole(interaction, interaction.member._roles)){
                const embed = new EmbedBuilder()
                    .setColor(0xc6a5c2)
                    .setTitle("咦？咦咦咦咦咦咦？！不見了！\n【高速公路瀏覽權限】")
                    .setDescription("露露：「咦？之前被我放在這的魔晶石不見了，怎麼辦？」\n\n露露：「到底掉在哪裡了？嗚嗚...絕對不可以被凱薩大人找到，人家可是好不容易才拿回來的」\n\n凱薩：「唷，露露在幹嘛呢」\n\n露露：「啊噫~對對對不起，人家沒做什麼壞事，凱凱凱薩大人您怎麼會來這裡呢？」\n\n凱薩：「肚子餓了，來找宵夜吃，等等 (看著獵物的眼神)，要不...哼哼」\n\n露露：「嗚嘎⋯人家還有很重要的事要做，凱薩大人很對不起！」\n\n凱薩：「喔？算了，真有急事你就去忙吧，本大爺可是很包容我的女人的，哈哈哈」\n\n凱薩：「等等，這是甚麼？ (從房間角落撿起了魔晶石) 『陰莖倍化！填滿小動物 ♡ 欲罷不能→再起不能 ♡♡』」\n\n露露：「噫！」\n\n---------------------------------------------\n⚠️欲行駛高速公路的用路人\n請先做好 <#843751524681383988> 並遵守交通規則\n確認內容後於下方點選「<:item_14:856493114457063424>」領取轉大人證明\n領取證明後一旦違規，即依規定處理")
                    .setImage("https://cdn.discordapp.com/attachments/933707595301150740/967805325128384584/IMG_6957.png")
                    
                const list = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId('button_adult_1')
                        .setLabel('讓本大爺來看看')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji({
                            "id": `856493114457063424`,
                            "name": `face_lulu07`,
                            "animated": false
                        }),
                    new ButtonBuilder()
                        .setCustomId('button_adult_0')
                        .setLabel('還是還給露露吧')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji({
                            "name": `✋`,
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
            util.showErrorReply(interaction, error)
        }
    }
}
