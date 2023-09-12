const { log } = require("../core/lib");
const chokidar = require('chokidar');
const Path = require("path");
let [cm, cmd] = [0, 0];

module.exports = async client => {
    async function checkFolders(dirPath) {
        const fs = require("fs/promises");
        const path = require("path");

        return await Promise.all(
            (await fs.readdir(dirPath, { withFileTypes: true })).map(async direct => {
                const pz = path.join(dirPath, direct.name);
    
                return direct.isDirectory() ?
                    await checkFolders(pz).then(arr => arr.flat()) : pz;
            })
        )
    }

    function getOldAndNewModule(modulepath) {
        const cache = require.cache[require.resolve(modulepath)];
        let prev, next;

        prev = cache ? cache.exports : null;
        delete require.cache[require.resolve(modulepath)];

        try {  
            next = require(modulepath);
        } catch {
            next = null;
        }

        return { next, prev };
    }

    (await checkFolders(__dirname + "/../cmds/")).forEach(path => {
		try {
			if (path.length === 0) return;

            for(let k = 0; k < path.length; k++) {
                const pull = require(path[k]);
                if (pull.name) {
                    cmd++;
                    cm++;

                    client.commands.set(pull.name, pull);
                } else {
                    cmd++;
                }
            };
		} catch (err) { cmd++; }
    });

    const watcher = chokidar.watch(__dirname + "/../cmds/", {
        persistent: true,
        ignoreInitial: true,
        depth: 2
    });

    watcher.on("all", (event, path) => {
        const { prev, next } = getOldAndNewModule(path);

        if (prev) {
            client.commands.delete(prev.name, prev);
        };

        if (next) {
            client.commands.set(next.name, next);
            log(`Команда ${next.name} обновлена`,"info");
        };
    });
    watcher.on("error", err => {});

    log(`Загружено ${cm}/${cmd} команд`,"ok");
}