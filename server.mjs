import { createServer } from 'http';
import { server } from 'websocket';
import Client from './model/client.mjs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Game from './model/game.mjs';
import { GameMapper, clientMapper } from './entityToDtoMapper/EntityToDtoMapper.mjs';
import ClientDto from './dto/clientDto.mjs';
import GameDto from './dto/gameDto.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const WebSocketServer = server
const httpServer = createServer();

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '\\index.html');
})

app.listen(8000, () => console.log('listening on port 8000'));
httpServer.listen(9000, () => console.log('listening on http://localhost:9000'))

//clients and games hashmap we are storing this in memory 😥
//these are server objects
const clients = {}
const games = {}

const ws = new WebSocketServer({
    httpServer: httpServer
})

ws.on('request', (request) => {
    //request accepted and connection created
    const connection = request.accept(null, request.origin)

    //connection opened and closed console log
    connection.on('open', () => console.log('connection open'))
    connection.on('close', () => console.log('connection close'))

    connection.on('message', (message) => {
        //message from the client
        const result = JSON.parse(message.utf8Data)

        //create a new game lobby
        if (result.method === 'create') {
            createGameLobby(result)
        }

        if (result.method === 'join') {
            joinGameLobby(result)
        }
    })

    //generate a unique id for client
    createConnection(connection)
})

//this function is called when new connection request is received i.e, a new client joins the server
function createConnection(connection) {
    //generate a unique id for client
    const clientId = guid();
    clients[clientId] = new Client(clientId, connection)

    const payload = {
        "method": "connect",
        "client": clientMapper(clients[clientId])
    }

    //send back the client connect
    connection.send(JSON.stringify(payload))
}

//function to create game room/lobby
function createGameLobby(result) {
    const clientId = result.clientId
    const gameId = guid()
    games[gameId] = new Game(gameId)

    const payload = {
        "method": "create",
        "game": GameMapper(games[gameId])
    }
    const con = clients[clientId].connection
    con.send(JSON.stringify(payload))
}

//functionn to join existing game lobby 
function joinGameLobby(result) {
    console.log(result)
    const clientId = result.clientId;
    const gameId = result.gameId;
    const game = games[gameId];
    ClientDto.printClientArray(clients)
    GameDto.printGameArray(games)
    if (game.clients.length >= 3) {
        //sorry max players reached
        return
    } else {
        const color = { 0: "Red", 1: "Yellow", 2: "Blue" }[game.clients.length]
        clients[clientId].setColor(color)
        game.clients.push(clients[clientId])
        const payload = {
            "method": "join",
            "game": GameMapper(game)
        }

        game.clients.forEach(client => {
            client.connection.send(JSON.stringify(payload))
        })
    }

}

const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
}
