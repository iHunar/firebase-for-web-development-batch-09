firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            // console.log("emailVerified true");
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



// Email Change
const email = document.getElementById("email")
const emailChangeHandler = () => {
    const user = firebase.auth().currentUser;
    user.updateEmail(email.value).then(() => {
        console.log("Update successful")
    }).catch((error) => {
        console.log(error)
    });
}


// delete account
const deleteAccoundHandler = () => {
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
        alert("User deleted.")
    }).catch((error) => {
        console.log(error)
    });

}



// add data
const input = document.getElementById("input");
// var database = firebase.database();
const addData = () => {
    // firebase.database().ref("todos/" + "todo2").set({
    //     todo: input.value
    // })

    firebase.database().ref("todos/").push({
        todo: input.value,
        name:"fsdf",
        email:"fsfds",
        mobile:"Fsfsd"
    })
}