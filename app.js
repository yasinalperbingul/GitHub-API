const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();


function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);


}


function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Please enter a valid username.");
    }else{
        //Get request with valid username
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                //Error Message
                ui.showError("User not founded.")
            }else{
                //Succesfull response
                ui.addSearchedUsertoUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){
    //Clear all searched persons
    if(confirm("You sure? ")){
        //Delete
        Storage.clearAllSearchedUsersFromStorage(); //Delete from storage
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    // Get the searched ones from storage, then add the UI
    let result ="";
    let users = Storage.getSearchedUsersFromStorage();

    users.forEach(user => {
        //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        

        result += `<li class="list-group-item">${user}</li>`;
    });

    lastUsers.innerHTML = result;
}