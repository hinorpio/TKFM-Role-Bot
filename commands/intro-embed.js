const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");
const util = require("../util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("intro-embed")
        .setDescription("【Embed生成使用權限】"),
    async execute(interaction, client) {
        try {
            if(util.checkRole(interaction, interaction.member._roles)){
                const embed = new EmbedBuilder()
                    .setColor(0x7c0784)
                    .setTitle("咦？這是甚麼魔法？好帥喔！\n【Embed生成使用權限】")
                    .setDescription("「(打哈欠)...可以下班了沒呀?」\n\n那個凱薩真是的，娜娜過勞倒下了，落下的工作就自己搞定呀，『好歹你也曾是法斯帝國的公主，那隻蠢貓的文件工作就交給你了』用這種理由把工作推給露露我不管，但為什麼要抓我來一起工作呀，已經是下班睡覺的時間了...\n\n「嗚嗚嗚...抱歉阻礙到你的下班時間了...真的對不起」露露一邊鞠躬向一邊道歉，一邊對著成堆的文件手忙腳亂不知所措。\n\n「唔...等你弄完明天太陽都出來了，還是等我來吧」\n帕奈奈舉起魔法杖，隨著一陣光芒閃過，那些待處理的文件便填滿了整齊的字句。「好了，麻煩的事情做完了，我要睡覺了。」\n\n「咦？這是甚麼魔法？好帥喔！可以教人家用嗎？」露露一臉羨慕的看著帕奈奈。\n\n「哈啊？教你用魔法？麻煩死了，我才不....」等等，之前娜娜倒下就要睡上個72小時，這期間還會一直有新的工作，那我在這之前都要加班工作了？不行不行，準時放工是美德，況且教她也沒多難，直接把魔力傳給她而已，損失的量睡一覺就能補回來了。而且就算凱薩找碴，也會感應到是我的魔力，不怕會被說偷懶...好！\n\n「咳咳，既然你那麼有誠意，好吧，我先傳你一點魔力，然後看我的演示。先說好喔，我只演示一次，之後的工作就交給你了。」\n\n「好的！」\n\n---------------------------------------------\n\n⚠️欲使用帕奈奈生成訊息的用戶，必須遵從以下守則\n1.【於<#786918057054044181>使用】：由於無法防雷，僅能張貼一般向圖片\n2.【於<#988425883222155324>使用】：可以張貼符合版規之圖片 \n3.領取 「南瓜學徒」身份組之後才可以使用帕奈奈生成訊息，請特別注意遵守使用規定\n\n詳情請到 <#855399029252161536> 閱覽本群版規第8點\n\n使用指令:\n\`/embed\`  填寫表格，並在頻道生成Embed訊息\n\`/test-embed\` 填寫表格，並在頻道生成**只有你能看到的**Embed訊息\n⚠️⚠️⚠️ 注意，Embed訊息一旦發出，用戶是無法修改/刪除的\n⚠️⚠️⚠️ 不熟悉指令操作請先使用\`/test-embed\`自行測試\n\n確認內容後於下方點選「<:face_panana02:902817679474323456>」領取「南瓜學徒」身份組\n領取證明後一旦違規，即依規定處理\n\n")
                    
                const list = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId('button_embed_1')
                        .setLabel('好耶！南瓜魔法')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji({
                            "id": `902817679474323456`,
                            "name": `face_panana02`,
                            "animated": false
                        }),
                    new ButtonBuilder()
                        .setCustomId('button_embed_0')
                        .setLabel('我還是算了吧')
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
            // util.appendToLogFile(error);
            util.showErrorReply(interaction, error)
        }
    }
}
