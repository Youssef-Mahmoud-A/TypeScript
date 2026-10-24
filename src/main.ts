
class User {

    protected readonly _id: number;
    private _password: string;
    private _phone: string;
    private _age: number;

    constructor(
        id: number,
        public name: string,
        public email: string,
        _password: string,
        _phone: string,
        _age: number,
        public noteBook?: NoteBook
    ) {
        this.validateAge(_age);
        this._id = id;
        this._password = _password;
        this._phone = _phone;
        this._age = _age;
    }

    public get id(): number {
        return this._id;
    }

    public set password(value: string) {
        this._password = value;
    }

    public set phone(value: string) {
        this._phone = value;
    }
    public get phone(): string {
        return this._phone
    }
    public set age(value: number) {
        this.validateAge(value)
        this._age = value;
    }
    public get age(): number {
        return this._age
    }

    private validateAge(value: number): void {
        if (value < 18 || value > 60) {
            throw new Error("Age cannot be less than 18 or more than 60");
        }
    }
    displayInfo(): void {
        console.log(`id: ${this._id}, name: ${this.name}, email: ${this.email}, age: ${this.age}`);
    }
}

class Admin extends User {
    constructor(id: number, name: string, email: string, password: string, phone: string, age: number, noteBook?: NoteBook) {
        super(id, name, email, password, phone, age, noteBook)
    }

    manageNotes(): void {

    }
}

class Note {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public readonly author: User
    ) { }
    public get UserId(): number {
        return this.author.id;
    }

    preview(): string {
        const limit = 40;
        if (this.content.length <= limit) {
            return this.content
        }
        return this.content.substring(0, limit) + "...";
    }
}

class NoteBook {
    private _notes: Note[] = [];

    addNote(id: number, title: string, content: string, author: User): void {
        const note = new Note(id, title, content, author)
        this._notes.push(note);
    }

    findNote(id: number): Note | undefined {
        return this._notes.find(note => note.id === id);
    }
    removeNote(id: number): string {
        const note = this.findNote(id);

        if (!note) {
            return "There is no note with this ID";
        }

        this._notes = this._notes.filter(note => note.id !== id);
        return `Removed note "${note.title}"`;
    }
}







