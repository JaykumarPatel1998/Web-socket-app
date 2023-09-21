export default class Client {
    constructor(id, connection) {
        this.id = id
        this.color = null;
        this.connection = connection
    }
    setColor(color) {
        this.color = color
    }
}