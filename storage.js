class Storage{
    static getSearchedUsersFromStorage(){
        //Get all users
        let users;

        if(localStorage.getItem("searched") === null){
            //Empty storage
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;
    }

    static addSearchedUserToStorage(username){
        //Add user
        let users = this.getSearchedUsersFromStorage();

        //IndexOf
        if(users.indexOf(username) === -1){
            users.push(username);
        }

        localStorage.setItem("searched", JSON.stringify(users));
    }

    static clearAllSearchedUsersFromStorage(){
        //Delete al users
        localStorage.removeItem("searched");
    }
}