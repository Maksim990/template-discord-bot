module.exports = (client,prefix) => {
    client.on("ready", async () => {
        console.log(`${client.user.tag} is online :)`);
        client.user.setActivity(`Prefix ${prefix}`, { type: "PLAYING" });
    });
};