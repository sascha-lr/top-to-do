export class Project {

    #desc = '';
    #id = crypto.randomUUID();

    constructor(name, desc, id) {
        this.name = name;
        this.desc = desc;
        this.id = id;
        this.tasks = localStorage[this.id];
    }

    get tasks() {
        return this.tasks;
    }

    set tasks(input) {
        if (!localStorage[this.id]) localStorage[this.id] = '[]';
        if (input) throw new Error(`You cannot reassign the tasks variable.\n[Project Name: ${this.name}, \nProject ID: ${this.id}]`);
    }

    get desc() {
        return this.#desc;
    }

    set desc(input) {
        this.#desc = input;
    }

    get id() {
        return this.#id;
    }

    set id(input) {
        if (!input) return;
        const regex = /^[a-z0-9-]{36}$/;
        if (regex.test(input)) {
            this.#id = input;
        } else {
            throw new Error(`Invalid UUID assignment to \n[Project Name: ${this.name}]!`);
        }
    }
}
