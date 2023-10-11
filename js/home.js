firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            console.log("emailVerified true");
        } else {
            window.location.assign("./email-verification.html")
        }
    } else {
        window.location.assign("./log-in.html")
    }
});



const LogOut = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.assign("./../log-in.html")
    }).catch((error) => {
        // An error happened.
    });

    // window.location.assign("./log-in.html")
}

