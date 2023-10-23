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
        firebase.firestore().collection("users").doc(docRef.id).update({
            id: docRef.id
        })
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

const loading = document.getElementById("loading");
const container = document.getElementById("container");
const ul = document.createElement("ol");
container.appendChild(ul)
// firebase.firestore().collection("users")
//     .get()
//     .then((querySnapshot) => {
//         loading.style.display = "none";
//         container.style.display = "block"
//         if (!querySnapshot.empty) {
//             querySnapshot.forEach((doc) => {
//                 const li = document.createElement("li");
//                 ul.appendChild(li);
//                 li.innerHTML = doc.data().name
//                 console.log(doc.data())
//             });
//         } else {
//             let noData = document.createElement("p");
//             container.appendChild(noData);
//             noData.innerHTML = "No such document!"
//             console.log("No such document!");
//         }

//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });




// get data
// firebase.firestore().collection("users").doc("3UTOMgefX87Pcbz9xeJa")
// .onSnapshot((doc) => {
//     console.log( " data: ", doc.data());
// });

firebase.firestore().collection("users")
    .onSnapshot((querySnapshot) => {
        loading.style.display = "none";
        container.style.display = "block";
        var users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());

        });
        if (users.length === 0) {
            let noData = document.createElement("p");
            container.appendChild(noData);
            noData.innerHTML = "No such document!";

        } else {
            ul.innerHTML = ""
            users.map((item) => {
                const li = document.createElement("li");
                ul.appendChild(li);
                li.innerHTML = item.name;

                // edit
                const editButton = document.createElement("button");
                li.appendChild(editButton);
                editButton.innerHTML = "Edit";

                // delete 
                const deleteButton = document.createElement("button");
                li.appendChild(deleteButton);
                deleteButton.innerHTML = "Delete"

                // edit function
                editButton.addEventListener("click", () => {
                    var pro = prompt("",item.name);
                    firebase.firestore().collection("users").doc(item.id).update({
                        name: pro
                    })
                })
                // delete function
                deleteButton.addEventListener("click", () => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            firebase.firestore().collection("users").doc(item.id).delete().then(() => {
                                console.log("Document successfully deleted!");
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            }).catch((error) => {
                                console.error("Error removing document: ", error);
                            });

                        }
                    })
                })
            })
            console.log("users", users)

        }
    });