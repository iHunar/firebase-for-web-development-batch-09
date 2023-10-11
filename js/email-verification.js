const email = document.getElementById("email")
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        email.innerHTML = user.email
        if (user.emailVerified) {
            window.location.assign("home.html")
        }

    } else {
        window.location.assign("log-in.html")
    }
});


const message = document.getElementById("message");
const resendEmail = () => {
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
            console.log("Email verification sent!")
            message.innerHTML = "Email verification sent!";
            message.style.color = "green";
        }).catch((err) => {
            console.log("err", err)
        });

}


const homeHandler = () => {
    location.reload()
}