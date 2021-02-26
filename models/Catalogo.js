class catalog{
    constructor(title, author, subject, publicationDate){
        this.title = title;
        this.author = author;
        this.subject = subject;
        this.publicationDate = publicationDate;
    }

//metodos
    searchByTitle(){
        return `${this.title}`
    }
    searchByAuthor(){
        return `${this.author}`
    }
    searchBySubject(){
        return `${this.subject}`
    }
    searchByPublishDate(){
        return `${this.publicationDate}`
    }
}