const message = document.getElementById("message");
const email = document.getElementById("email")
const password = document.getElementById("password")
const SignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((user) => {
            user.user.sendEmailVerification()
                .then(() => {
                    // Email verification sent!
                    message.innerHTML = "Success";
                    message.style.color = "green";
                    setTimeout(() => {
                        window.location.assign("./email-verification.html")
                    }, 2000);
                });


        }).catch((err) => {
            message.innerHTML = err.message;
            message.style.color = "red"
        })
}