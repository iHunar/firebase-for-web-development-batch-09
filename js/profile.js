const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const profileImage = document.getElementById("profileImage");
let uid;
let selectedGender;
const ganderHandler = () => {
    selectedGender = gender.options[gender.selectedIndex].value
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            // console.log("emailVerified true");
            // get data
            uid = user.uid
            firebase.database().ref("users/" + user.uid).on("value", (res) => {
                const userData = res.val()
                console.log(userData);
                fullName.value = userData.fullName;
                phone.value = userData.phoneNumber;
                email.value = userData.email;
                selectedGender = userData.selectedGender
                // if(userData.profileUrl === ""){
                //     profileImage.setAttribute("src","https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg")
                // }else{
                //     profileImage.setAttribute("src",userData.profileUrl)
                // }
                profileImage.setAttribute("src", userData.profileUrl === "" ? "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" : userData.profileUrl)
                // gender
                for (let i = 0; i < gender.length; i++) {
                    if (gender[i].value === userData.selectedGender) {
                        gender[i].setAttribute("selected", "selected")

                    }
                }

            })
        } else {
            window.location.assign("./email-verification.html")
        }
    } else {
        window.location.assign("./log-in.html")
    }
});






// upload profile
const progressSlider = document.getElementById("progress")
const progressInner = document.getElementById("progressInner")
const profileUploadHandler = (event) => {
    var storageRef = firebase.storage().ref();
    let file = event.target.files[0];
    var uploadTask = storageRef.child(`profileImages/${uid}`).put(file);
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
                profileImage.setAttribute("src", downloadURL)
                progressSlider.style.display = "none";
                firebase.database().ref("users/" + uid).update({
                    profileUrl: downloadURL
                })
            });
        }
    );
}



// update profile
const updateProfile = () => {
    const userData = {
        fullName: fullName.value,
        phoneNumber: phone.value,
        selectedGender: selectedGender,
    }
    firebase.database().ref("users/" + uid).update(userData).then(() => {
        alert("Successfylly updated")
    })
}