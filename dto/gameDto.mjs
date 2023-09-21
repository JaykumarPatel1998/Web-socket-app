import { GameMapper } from "../entityToDtoMapper/EntityToDtoMapper.mjs";

export default class GameDto {
    constructor() {
        this.id = null
        this.balls = null
        this.clients = []
    }
    static printGameArray(games){
        for (let key in games) {
            if (games.hasOwnProperty(key)) {
                const value = games[key];
                console.log(key, JSON.stringify(GameMapper(value)));
            }
        }
    }
}