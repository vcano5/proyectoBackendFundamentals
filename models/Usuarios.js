class Account{
    constructor(id, password, status){
        this.id = id;
        this.password = password;
        this.status = status;
    }
}

class Librarian extends Account{
    addBookItem(){}
    blockMember(){}
    unblockMember(){}
}

class User extends Account{
    membership(){}
    rentedBooks(){}
    totalBooksRented(){}
}