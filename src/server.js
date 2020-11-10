const { Server } = require('boardgame.io/server');
const path =  require('path')
const serve = require('koa-static')
const { MacroTactics } = require('./Game');

require('dotenv').config();

const server = Server({ games: [MacroTactics],

});

const PORT = process.env.PORT || 8000;

const frontEndBuildPath = path.resolve(__dirname, './build')
server.app.use(serve(frontEndBuildPath))



server.run(PORT, () => {
    server.app.use(
        async (ctx, next) => await serve(frontEndBuildPath)(
            Object.assign(ctx, {path : 'index.html'}),
            next
        )
    )
});


