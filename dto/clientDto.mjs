import { clientMapper } from "../entityToDtoMapper/EntityToDtoMapper.mjs";

export default class ClientDto {
    constructor() {
        this.id = null
        this.color = null;
    }
    static printClientArray(clients){
        for (let key in clients) {
            if (clients.hasOwnProperty(key)) {
                const value = clients[key];
                console.log(key, JSON.stringify(clientMapper(value)));
            }
        }
    }
}