const sendingButton = document.querySelector("#form");

let token = '';
let logInData = {email:'', password:''};
let userId = '';

const getLogInData = (event) => {
    let logInData = {
        email: event.target.querySelector('#email').value,            
        password: event.target.querySelector('#password').value
    }
    return logInData;
};

const fetchData = async (logInData) => {
    const dataToSend = JSON.stringify(logInData); 
    let response = await fetch("http://localhost:5678/api/users/login", {
        method:"POST",
        headers : {"content-type": "application/json"},
        body: dataToSend
    });
    return await response.json();
}

sendingButton.addEventListener('submit', async function(event){
    event.preventDefault();
    const logInData = getLogInData(event);
    if (!logInData.email && !logInData.password){
        return alert ('Merci de remplir les champs de saisie;');
    };

    const response = await fetchData(logInData);
    console.log( await response);
    
    if(response.message || response.error) {
        return alert("Erreur dans l'identifiant ou le mot de passe.");
    }else if(response.token && response.userId){
        token = response.token;
        userId = response.userId;
        window.localStorage.setItem('token', `${token}`);
        window.localStorage.setItem('userId', `${userId}`);
        document.location.href = 'edition.html';   
    };
});