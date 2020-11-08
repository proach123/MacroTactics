const { Server } = require('boardgame.io/server');
const { MacroTactics } = require('./Game');

const server = Server({ games: [MacroTactics],

});

server.run(8000, () => console.log("server running..."));


//db connect is not working as of now still on the TODO

