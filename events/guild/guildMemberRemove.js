module.exports = {
    name: "guildMemberRemove",
    loaded: false,
    once: false,
    execute(client) {
        client.on("guildMemberRemove", function(member){
            console.log(`a member leaves a guild, or is kicked: ${member.tag}`);
        });
    }
}