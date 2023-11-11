const ayran_codeshare_discord = require("discord.js")

module.exports = {
    slash: new ayran_codeshare_discord.SlashCommandBuilder()
        .setName('durum')
        .setDescription('Botun Durumunu Değiştirir')
        .addStringOption(option =>
            option.setName("yazı")
                .setDescription("Durumda Yazacak Yazıyı Giriniz")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("aktivite")
                .setDescription("Aktivite Türünü Giriniz")
                .setChoices(
                    {
                        name: "Oynuyor",
                        value: "ayran_codeshare_discord.gg/akparti_playing"
                    },
                    {
                        name: "İzliyor",
                        value: "ayran_codeshare_discord.gg/akparti_watching"
                    },
                    {
                        name: "Dinliyor",
                        value: "ayran_codeshare_discord.gg/akparti_listening"
                    },
                    {
                        name:"Yarışıyor",
                        value:"ayran_codeshare_discord.gg/akparti_compeating"
                    },
                    {
                        name: "Yayında",
                        value: "ayran_codeshare_discord.gg/akparti_streaming"
                    },
                    {
                        name: "Özel Durum",
                        value: "ayran_codeshare_discord.gg/akparti_custom"
                    }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName("durum")
                .setDescription("Durumu Seçiniz")
                .setChoices(
                    {
                        name: "Çevrimiçi",
                        value: "ayran_codeshare_discord.gg/akparti_online"
                    },
                    {
                        name: "Boşta",
                        value: "ayran_codeshare_discord.gg/akparti_idle"
                    },
                    {
                        name: "Rahatsız Etmeyin",
                        value: "ayran_codeshare_discord.gg/akparti_dnd"
                    }
                )
                .setRequired(true))
    ,
    // https://discordjs.guide/slash-commands/advanced-creation.html#adding-options
    /**
     * 
     * @param {ayran_codeshare_discord.Client} client 
     * @param {ayran_codeshare_discord.ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        let owners;
        const application = await client.application.fetch();
        if (application.owner instanceof ayran_codeshare_discord.Team) {
            owners = application.owner.members.map(member => member.user);
        }
        else {
            owners = [application.owner];
        }
        if (!owners.some(owner => owner.id === interaction.user.id)) {
            return interaction.reply({ content: "Bu komutu kullanabilmek için botun sahibi olmanız gerekiyor.", ephemeral: true });
        }
        await interaction.deferReply({ephemeral:true});
        const yazı = interaction.options.getString("yazı", true);
        const aktivite = interaction.options.getString("aktivite", true);
        const durum = interaction.options.getString("durum", true);
        let actibity;
        let status;
        switch (aktivite) {
            case "ayran_codeshare_discord.gg/akparti_playing":
                actibity = ayran_codeshare_discord.ActivityType.Playing;
                break;
            case "ayran_codeshare_discord.gg/akparti_watching":
                actibity = ayran_codeshare_discord.ActivityType.Watching;
                break;
            case "ayran_codeshare_discord.gg/akparti_listening":
                actibity = ayran_codeshare_discord.ActivityType.Listening;
                break;
            case "ayran_codeshare_discord.gg/akparti_compeating":
                actibity = ayran_codeshare_discord.ActivityType.Competing;
                break;
            case "ayran_codeshare_discord.gg/akparti_streaming":
                actibity = ayran_codeshare_discord.ActivityType.Streaming;
                break;
            case "ayran_codeshare_discord.gg/akparti_custom":
                actibity = ayran_codeshare_discord.ActivityType.Custom;
                break;
        }
        switch (durum) {
            case "ayran_codeshare_discord.gg/akparti_online":
                status = ayran_codeshare_discord.PresenceUpdateStatus.Online;
                break;
            case "ayran_codeshare_discord.gg/akparti_idle":
                status = ayran_codeshare_discord.PresenceUpdateStatus.Idle;
                break;
            case "ayran_codeshare_discord.gg/akparti_dnd":
                status = ayran_codeshare_discord.PresenceUpdateStatus.DoNotDisturb;
                break;
        }
        if (actibity === ayran_codeshare_discord.ActivityType.Streaming) {
            client.user.setPresence({
                activities: [{
                    name: yazı,
                    type: actibity,
                    url: "https://www.twitch.tv/ayran_codeshare_discord"
                }],
                status: status
            });
        }
        else if (actibity == ayran_codeshare_discord.ActivityType.Custom) {
            client.user.setPresence({
                activities: [{
                    name: "Ayran Codeshare",
                    state: yazı,
                    type: actibity
                }],
                status: status
            });
        }
        else {
            client.user.setPresence({
                activities: [{
                    name: yazı,
                    type: actibity
                }],
                status: status
            });
        }
        interaction.editReply({ content: "Durum Değiştirildi", ephemeral: true });
    }
}