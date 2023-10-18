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




// create post

const title = document.getElementById("title")
const textarea = document.getElementById("textarea");
const checkbox = document.getElementById("checkbox");
const file = document.getElementById("file");
let fileUrl = "";
let fileType = ""
const checkboxHandler = () => {
    if (checkbox.checked) {
        file.style.display = "block"
    } else {
        file.style.display = "none"
    }
}
const createPostHandler = () => {
    const postData = {
        title: title.value,
        textarea: textarea.value,
        createdDate: moment().format(),
        fileUrl: fileUrl,
        fileType:fileType
    }

    console.log("postData", postData)
}





function generateUUID() {
    let uuid = '';
    const chars = '0123456789abcdef';

    for (let i = 0; i < 36; i++) {
        if (i === 14 || i === 19 || i === 24) {
            uuid += '-';
        } else if (i === 15) {
            uuid += '4';
        } else if (i === 20) {
            uuid += chars[(Math.random() * 4) | 8];
        } else {
            uuid += chars[Math.floor(Math.random() * 16)];
        }
    }

    return uuid;
}
// file upload
const progressSlider = document.getElementById("progress")
const progressInner = document.getElementById("progressInner")
const fileUploadHandler = (event) => {
    const randomUUID = generateUUID();
    var storageRef = firebase.storage().ref();
    let file = event.target.files[0];
    fileType = file.type
    var uploadTask = storageRef.child(`posts/${randomUUID}`).put(file);
    uploadTask.on('state_changed',
        (snapshot) => {
            progressSlider.style.display = "block"
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + Math.floor(progress) + '% done');
            progressInner.style.width = `${Math.floor(progress)}%`
            progressInner.innerHTML = `${Math.floor(progress)}%`
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                fileUrl = downloadURL
                // profileImage.setAttribute("src", downloadURL)
                progressSlider.style.display = "none";
                // firebase.database().ref("users/" + uid).update({
                //     profileUrl: downloadURL
                // })
            });
        }
    );
}



