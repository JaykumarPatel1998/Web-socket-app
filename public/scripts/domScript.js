//game logic goes here
const newGameContainer = document.getElementById('newGameContainer')

function newGameEventHandler() {
    let content =
    `
    <button id="createButton">New Game</button>
    <p id="code">${game.id}<span id="copy">📋</span></p>
    <br>
    <input type="text" name="gameId" id="gameId" placeholder="game id here">
    <button id="joinButton">Join Game</button>
    `

    newGameContainer.childNodes.forEach(node => {
        node.remove()
    })
    newGameContainer.innerHTML = content
}