const message = document.getElementById("message");
const email = document.getElementById("email");


const resendEmailHandler = () => {
    firebase.auth().sendPasswordResetEmail(email.value)
        .then(() => {
            message.innerHTML = "Password reset email sent!";
            message.style.color = "green"
        })
        .catch((error) => {
            var errorMessage = error.message;
            message.innerHTML = errorMessage;
            message.style.color = "red"
        });
}