"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    name;
    email;
    noteBook;
    _id;
    _password;
    _phone;
    _age;
    constructor(id, name, email, _password, _phone, _age, noteBook) {
        this.name = name;
        this.email = email;
        this.noteBook = noteBook;
        this.validateAge(_age);
        this._id = id;
        this._password = _password;
        this._phone = _phone;
        this._age = _age;
    }
    get id() {
        return this._id;
    }
    set password(value) {
        this._password = value;
    }
    set phone(value) {
        this._phone = value;
    }
    get phone() {
        return this._phone;
    }
    set age(value) {
        this.validateAge(value);
        this._age = value;
    }
    get age() {
        return this._age;
    }
    validateAge(value) {
        if (value < 18 || value > 60) {
            throw new Error("Age cannot be less than 18 or more than 60");
        }
    }
    displayInfo() {
        console.log(`id: ${this._id}, name: ${this.name}, email: ${this.email}, age: ${this.age}`);
    }
}
class Admin extends User {
    constructor(id, name, email, password, phone, age, noteBook) {
        super(id, name, email, password, phone, age, noteBook);
    }
    manageNotes() {
    }
}
class Note {
    id;
    title;
    content;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    get UserId() {
        return this.author.id;
    }
    preview() {
        const limit = 40;
        if (this.content.length <= limit) {
            return this.content;
        }
        return this.content.substring(0, limit) + "...";
    }
}
class NoteBook {
    _notes = [];
    addNote(id, title, content, author) {
        const note = new Note(id, title, content, author);
        this._notes.push(note);
    }
    findNote(id) {
        return this._notes.find(note => note.id === id);
    }
    removeNote(id) {
        const note = this.findNote(id);
        if (!note) {
            return "There is no note with this ID";
        }
        this._notes = this._notes.filter(note => note.id !== id);
        return `Removed note "${note.title}"`;
    }
}
