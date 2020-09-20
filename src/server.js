import { Server } from 'boardgame.io/server';
import { ExplodingPandas } from './game';
import axios from 'axios';
import Koa from 'koa';
import koaBody from 'koa-body';
import Router from 'koa-router';
import cors from '@koa/cors';
import { SERVER_PORT, API_PORT, INTERNAL_API_PORT } from './constants';

const app = new Koa();
const router = new Router();
const server = Server({ games: [ExplodingPandas] });

// Create a new game
router.post('/create', koaBody(), async ctx => {
    const r = await axios
        .post(`http://localhost:${INTERNAL_API_PORT}/games/${ExplodingPandas.name}/create`, {
            numPlayers: ctx.request.body.numPlayers,
            setupData: ctx.request.body.setupData,
            unlisted: ctx.request.body.unlisted,
        })
        .catch(err => {
            console.error(err);
        });

    ctx.body = {
        gameID: r.data.gameID,
    };
});

// Update a game
router.post('/update', koaBody(), async ctx => {
    const gameID = ctx.request.body.gameID;
    await axios
        .post(`http://localhost:${INTERNAL_API_PORT}/games/${ExplodingPandas.name}/${gameID}/update`, {
            playerID: ctx.request.body.playerID,
            credentials: ctx.request.body.credentials,
            newName: ctx.request.body.newName,
        });
});

// Join a game
router.post('/join', koaBody(), async ctx => {
    const gameID = ctx.request.body.gameID;
    const r = await axios
        .post(`http://localhost:${INTERNAL_API_PORT}/games/${ExplodingPandas.name}/${gameID}/join`, {
            playerID: ctx.request.body.playerID,
            playerName: ctx.request.body.playerName,
        })
        .catch(err => {
            console.error(err);
        });

    ctx.body = {
        playerCredentials: r.data.playerCredentials,
    };
});

// Leave a game
router.post('/leave/:gameID', koaBody(), async ctx => {
    const gameID = ctx.params.gameID;
    // const r = await axios
    //     .get(`http://localhost:${INTERNAL_API_PORT}/games/${ExplodingPandas.name}`);
    await axios
        .post(`http://localhost:${INTERNAL_API_PORT}/games/${ExplodingPandas.name}/${gameID}/leave`, {
            playerID: ctx.request.body.playerID,
            credentials: ctx.request.body.credentials,
        });
})

// Get a game's information
router.get('/games/:gameID', async ctx => {
    const gameID = ctx.params.gameID;
    const r = await axios
        .get(`http://localhost:${INTERNAL_API_PORT}/games/${ExplodingPandas.name}/${gameID}`);
    ctx.body = {
        players: r.data.players,
        setupData: r.data.setupData,
    };
});

const serverHandle = server.run({
    port: SERVER_PORT,
    callback: () => {
        console.log(`Serving at: http://localhost:${SERVER_PORT}/`);
    },
    lobbyConfig: {
        apiPort: INTERNAL_API_PORT,
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
