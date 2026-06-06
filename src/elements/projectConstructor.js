export class Project {

    #tasks = new Map();
    #desc = '';

    constructor(name, desc) {
        this.name = name;
        this.desc = desc;
    }

    get tasks() {
        return this.#tasks;
    }

    set tasks(input) {
        throw new Error('You cannot reassign the tasks variable.');
    }

    get desc() {
        return this.#desc;
    }

    set desc(input) {
        if (input) this.#desc = input;
    }
}
