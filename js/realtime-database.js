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
            let li = document.createElement("li");
            ol.appendChild(li);
            li.innerHTML = value.val().todo;
        })
    }

})