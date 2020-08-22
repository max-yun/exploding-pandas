import { Server } from 'boardgame.io/server';
import { ExplodingPandas } from './game';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Koa from 'koa';
import koaBody from 'koa-body';
import Router from 'koa-router';
import cors from '@koa/cors';
import { SERVER_PORT, API_PORT, INTERNAL_API_PORT } from './constants';

const app = new Koa();
const router = new Router();
const server = Server({ games: [ExplodingPandas] });

router.post('/create', koaBody(), async ctx => {
    const r = await axios
        .post(`http://localhost:${INTERNAL_API_PORT}/games/${ExplodingPandas.name}/create`, {
            numPlayers: ctx.request.body.numPlayers,
            unlisted: ctx.request.body.public,
        })
        .catch(err => {
            console.error(err);
        });

    ctx.body = {
        room: r.data.gameID,
    };
});

const serverHandle = server.run({
    port: SERVER_PORT,
    callback: () => {
        console.log(`Serving at: http://localhost:${SERVER_PORT}/`);
    },
    lobbyConfig: {
        apiPort: INTERNAL_API_PORT,
        uuid: uuidv4,
        apiCallback: () => {
            console.log(`Internal API serving at: http://localhost:${INTERNAL_API_PORT}/`);
        },
    }
});

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

const appHandle = app.listen(API_PORT, () => {
    console.log(`API serving at: http://localhost:${API_PORT}/`);
});
