const input = document.getElementById("input")
const addData = () => {
    //    firebase.databse().ref("fdsf"+ id).set()

    // firebase.firestore().collection("users").doc("id-1").set({
    //     name: input.value,
    // }).then(() => {
    //     console.log("Document successfully written!");
    // })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });

    firebase.firestore().collection("users").add({
        name: input.value,
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef);
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// get data


// firebase.firestore().collection("users").doc("fYsh0Syo3bqyzHlgWnPG").get().then((doc) => {
//     console.log(doc)
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });


// firebase.firestore().collection("users")
//     .get()
//     .then((querySnapshot) => {
//         if (!querySnapshot.empty) {
//             querySnapshot.forEach((doc) => {
//                 console.log(doc.data())
//                 if (doc.data().pending) {
//                     console.log(" => ", doc.data());
//                 }
//             });
//         } else {
//             console.log("No such document!");
//         }

//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });


firebase.firestore().collection("users").where("pending", "==", false)
    .get()
    .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
            });
        } else {
            console.log("No such document!");
        }

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });