class Book {
    constructor(title, author){
        this.id = Date.now().toString();
        this.title = title;
        this.author = author;
    }

    getSummary(){
        return '${this.title} by ${this.author}'
    }
}

export {Book};