
//10. Envoie de formulaire
const form = document.querySelector('form');

//1. on pointe tout les inputs
const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
// console.log(inputs);

//7. 
const progressBar = document.getElementById("progress-bar");

//5.Pour stocker ce qui est taper dans input
let pseudo, email, password, confirmPass;

// 3 . on crée un fonction qui se jouera en cas d'erreur

const errorDisplay = (tag,message,valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.textContent = message;
    }
}

//4. on ajoute la fonction qui gère l'affichagfe d'erreurs dans notre logique des fonction

const pseudoChecker = (value) => {

    if (value.length > 0 && (value.length< 3 || value.length > 20)) {

        errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
        pseudo=null;
        
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {

        errorDisplay("pseudo", "le pseudo ne doit pas contenir des caractères spéciaux");
        pseudo=null;

    } else {

        errorDisplay("pseudo", "", true);
        pseudo=value;

    }

    
};
//6
const emailChecker = (value) => {

    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)) {
        errorDisplay("email", "Le mail n'est pas valide");
        email = null;
    } else {
        errorDisplay('email', "", true);
        email=value;
    }
    
};

//8.
const passwordChecker = (value) => {

    //Pour eviter que les class s'enpile les un entre les autres
    progressBar.classList = "";

    if (!value.match(/^(?=(.*\d))(?!.*\s)(?=(.*[A-Z]))(?=(.*[!@#$%^&*(),.?":{}|<>]))[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)) {

        errorDisplay("password", "Minimum de 8 caractère, une majuscule, un chiffre et un caractère spécial");
        progressBar.classList.add("progessRed");
        password = null;
        
    } else if (value.length < 12){
        progressBar.classList.add('progressBlue');
        errorDisplay("password", "", true);
        password = value;
    } else {
        progressBar.classList.add('progressGreen');
        errorDisplay("password", "", true);
        password = value;
    }

    if(confirmPass) confirmChecker(confirmPass);
};

//9.
const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas");
        confirmPass = false;
    } else {
        errorDisplay("confirm", "", true)
        confirmPass = true;
    }
    
};


//2. On ajoute un évenement à chaque input
inputs.forEach((input) => {
    input.addEventListener('input', (e)=> {
        switch (e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "password":
                passwordChecker(e.target.value);
                break;
            case "confirm":
                confirmChecker(e.target.value);
                break;
        
            default:
                null;
        }
    })
});

//11.Envoie de formulaire

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pseudo && email && password && confirmPass === true) {
        
        const data = {
            pseudo,
            email,
            password,
        }
        console.log(data);  

        inputs.forEach((input) => (input.value = ""));
        progressBar.classList = "";

        pseudo = null;
        email = null;
        password = null;  
        confirmPass = null; 

        alert('Inscription valider !')
    } else {
        alert('Veuillez remplir les champs correctement');
    }
    
});