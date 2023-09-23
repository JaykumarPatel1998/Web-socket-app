let client = {};
let opponent = {};
let game = {};
let gameInstance = {};
let ws = new WebSocket('ws://localhost:9000')
ws.onmessage = (message) => {
    const response = JSON.parse(message.data)
    console.log(response)
    if (response.method === 'connect') {
        client = response.client;
        console.log('client Connected ', client)
    }
    else if (response.method === 'create') {
        game = response.game;
        console.log('game created ', game)
        newGameEventHandler()
    }
    else if (response.method === 'join') {
        game = response.game;
        console.log('game joined by client ', game)
    }
    else if (response.method === 'play') {
        gameInstance = response.gameInstance;
        console.log('game instance created ', gameInstance)
    }
}

//html element
const buttonCreate = document.getElementById('createButton');
const joinButton = document.getElementById('joinButton');
const textJoinGame = document.getElementById('gameId')

//wiring the new create event with create new game button
buttonCreate.addEventListener('click', (event) => {
    const payload = {
        method: "create",
        clientId: client.id
    }

    ws.send(JSON.stringify(payload))
})

joinButton.addEventListener('click', (event) => {
    if (!game.id) {
        console.log('here' + textJoinGame.value)
        game.id = textJoinGame.value

    }
    const payload = {
        method: "join",
        clientId: client.id,
        gameId: game.id
    }

    ws.send(JSON.stringify(payload))
})