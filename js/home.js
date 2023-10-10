firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("log in true");
        console.log("user>>>>>>>>>>>>>>>>",user)
    } else {
        // console.log("User is signed out")
        window.location.assign("./log-in.html")
    }
});



const LogOut = () =>{
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.assign("./log-in.html")
      }).catch((error) => {
        // An error happened.
      });

    // window.location.assign("./log-in.html")
}