let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            // console.log("emailVerified true");
            uid = user.uid
        } else {
            window.location.assign("./email-verification.html")
        }
    } else {
        window.location.assign("./log-in.html")
    }
});

const input = document.getElementById("input");
const message = document.getElementById("message")
const addData = () => {
    message.style.display = "block"
    // firebase.database().ref('todos/' + "userId").set({
    //     todo: input.value,
    // });
    let todoValue = {
        todo: input.value,
        uid: uid
    }
    firebase.database().ref('todos/').push(todoValue).then((success) => {
        firebase.database().ref('todos/' + success.key).update({
            key: success.key
        });
        message.innerHTML = "Data saved successfully!";
        message.style.color = "green";
        setTimeout(() => {
            message.style.display = "none";
            input.value = ""
        }, 1000);

    }).catch((err) => {
        console.log(err)
    });
}


// get data
const loading = document.getElementById("loading");
const todo = document.getElementById("todo")
// firebase.database().ref('todos/' + "-NgdNXhbLkzTJShzkxSB").on("value", (res) => {
//     loading.style.display = "none";
//     todo.style.display = "block";
//     const todoValue = res.val()
//     if (todoValue === null) {
//         todo.innerHTML = "No data available!"
//     } else {
//         todo.innerHTML = res.val().todo
//     }
// })


// edit 
// const editHandler = () => {
//     firebase.database().ref('todos/' + "-NgdNXhbLkzTJShzkxSB").update({
//         todo: "123"
//     });

// }

// delete 
// const deleteHandler = () => {
//     firebase.database().ref('todos/' + "-NgdNXhbLkzTJShzkxSB").remove();
// }




// all data
const ol = document.getElementById("ol")
firebase.database().ref('todos/').on("value", (res) => {
    ol.innerHTML = ""
    loading.style.display = "none";
    todo.style.display = "none";
    ol.style.display = "none"
    if (res.val() === null) {
        todo.style.display = "block";
        todo.innerHTML = "No data available!"
    } else {
        ol.style.display = "block"
        res.forEach((value) => {
            if (value.val().uid === uid) {
                let li = document.createElement("li");
                ol.appendChild(li);
                li.innerHTML = value.val().todo;
                // edit button
                const editButton = document.createElement("button");
                li.appendChild(editButton);
                editButton.innerHTML = "Edit";
                // delete button
                const deleteButton = document.createElement("button");
                li.appendChild(deleteButton);
                deleteButton.innerHTML = "Delete"


                // edit function
                editButton.addEventListener("click", () => {
                    var pro = prompt("", value.val().todo);
                    firebase.database().ref("todos/" + value.val().key).update({
                        todo: pro
                    })
                })


                // delete function
                deleteButton.addEventListener("click", () => {
                    firebase.database().ref("todos/" + value.val().key).remove()
                })
            } 


        })
    }

})