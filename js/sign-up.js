const message = document.getElementById("message");
const email = document.getElementById("email")
const fullName = document.getElementById("fullName")
const phoneNumber = document.getElementById("phoneNumber")
const password = document.getElementById("password")
const gender = document.getElementById("gender");

let selectedGender;
// gender handler

const ganderHandler = () => {
    selectedGender = gender.options[gender.selectedIndex].value
}

const SignUp = () => {
    const userData = {
        email: email.value,
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        selectedGender: selectedGender,
        profileUrl: ""
    }
    firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then((user) => {
            let userId = user.user.uid;
            user.user.sendEmailVerification()
                .then(() => {
                    // Email verification sent!
                    firebase.database().ref('users/' + userId).set(userData);
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


