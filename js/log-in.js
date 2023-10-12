const message = document.getElementById("message");
const email = document.getElementById("email")
const password = document.getElementById("password")
const SignUp = () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((user) => {
            message.innerHTML = "Success";
            message.style.color = "green";
            if (user.user.emailVerified) {
                window.location.assign("./home.html")
            } else {
                window.location.assign("./email-verification.html")
            }

        }).catch((err) => {
            message.innerHTML = err.message;
            message.style.color = "red"
        })
}




// google sign
const sgnInWithGoogleHandler = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log("result", result);
            window.location.assign("./home.html")
        }).catch((error) => {
            var errorMessage = error.message;
            console.log("errorMessage", errorMessage)
        });
}