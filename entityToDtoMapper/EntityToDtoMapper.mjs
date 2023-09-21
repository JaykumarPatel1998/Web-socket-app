import ClientDto from "../dto/clientDto.mjs";
import GameDto from "../dto/gameDto.mjs";

export function clientMapper(clientEntity) {
    const dto = new ClientDto()
    dto.id = clientEntity.id
    dto.color = clientEntity.color
    return dto;
}

export function GameMapper(gameEntity) {
    const dto = new GameDto()
    dto.id = gameEntity.id
    dto.balls = gameEntity.balls
    dto.clients = gameEntity.clients.map(client => {
        return clientMapper(client)
    });
    return dto
}