firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("log in true");
        // console.log("user>>>>>>>>>>>>>>>>",user)
        window.location.assign("./home.html")
    } else {
        console.log("User is signed out")
        window.location.assign("./log-in.html")
    }
});
