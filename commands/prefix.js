exports.run = (client, message, args) => {
    const fs = require("fs");
    if (message.author.id == "267065637183029248") {
    // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    // change the configuration in memory
    commands.prefix = newPrefix;
    // Now we have to save the file.
    fs.writeFile(".././config.json", JSON.stringify(config), (err) => console.error);
  }
}