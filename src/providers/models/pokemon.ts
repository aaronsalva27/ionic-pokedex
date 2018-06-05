export class Pokemon {
    public url?: String;
    public name?: String;

    constructor(fields?: Pokemon) {
        if (fields) {
            Object.assign(this, fields);
        }
    }

    
}