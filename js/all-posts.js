// get data
const loading = document.getElementById("loading");
const postContainer = document.getElementById("post-container")
firebase.database().ref("posts/").on("value", (postResp) => {
    loading.style.display = "none"
    postContainer.style.display = "block";
    if (postResp.val() === null) {
        const noData = document.createElement("p");
        postContainer.appendChild(noData);
        noData.innerHTML = "No data available!"
    } else {
        postResp.forEach((postValue) => {
            const postData = postValue.val();
            console.log("postData", postData);
            // post
            const postDiv = document.createElement("div");
            postContainer.appendChild(postDiv);
            postDiv.setAttribute("class", "postDiv")

            // post header
            const postHeader = document.createElement("div");
            postDiv.appendChild(postHeader);
            postHeader.setAttribute("class", "postHeader")

            // user profile
            const userProfile = document.createElement("img");
            postHeader.appendChild(userProfile);
            userProfile.setAttribute("src", "https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg")

            // user name container
            const userNameContainer = document.createElement("div");
            postHeader.appendChild(userNameContainer);

            // user name
            const userName = document.createElement("p");
            userNameContainer.appendChild(userName);
            userName.innerHTML = "Hishmat Rai";

            // created date
            const createdDate = document.createElement("p");
            userNameContainer.appendChild(createdDate);
            // createdDate.innerHTML = moment(postData.createdDate).format('MMMM Do YYYY, h:mm:ss a');
            createdDate.innerHTML = moment(postData.createdDate).startOf('minutes').fromNow();;

            // title
            const title = document.createElement("h6");
            postDiv.appendChild(title);
            title.innerHTML = postData.title;


            // details
            const postDetails = document.createElement("p");
            postDiv.appendChild(postDetails);
            postDetails.innerHTML = postData.textarea;
            postDetails.setAttribute("class", "postDetails");

            // Post media
            if (postData.media) {
                if (postData.fileType === "image/webp" || postData.fileType === "image/png" || postData.fileType === "image/gif" || postData.fileType === "image/jpeg" || postData.fileType === "image/jpg") {
                    const postImage = document.createElement("img");
                    postDiv.appendChild(postImage);
                    postImage.setAttribute("src", postData.fileUrl)
                    postImage.setAttribute("class", "media");
                }
                else {
                    // video
                    const video = document.createElement("video");
                    postDiv.appendChild(video);
                    video.setAttribute("class", "media");
                    video.setAttribute("controls", "controls");
                    // source 
                    const source = document.createElement("source");
                    video.appendChild(source);
                    source.setAttribute("src", postData.fileUrl)
                    source.setAttribute("type", postData.fileType
                    )
                }


            }
        })
    }
})