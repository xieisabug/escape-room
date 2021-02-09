export class IdGenerator {
    idKey;
    static instance;

    constructor(idKey = 0) {
        this.idKey = idKey;
    }

    static init() {
        if (!IdGenerator.instance) {
            IdGenerator.instance = new IdGenerator();
        }
        return IdGenerator.instance;
    }

    getKey() {
        return this.idKey++;
    }
}