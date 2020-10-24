const videoElem = document.getElementById('video-elem');
const togglePipButton = document.getElementById('start-pip');

let pictureInPictureActive = false;

togglePipButton.addEventListener("click", () => {
    // If picture in picture is active we should stop it 
    if(pictureInPictureActive){
      document.exitPictureInPicture();
      togglePipButton.innerHTML = "START";
      pictureInPictureActive = false;
    }
    else{
      // If there is no element in Picture-in-Picture yet, let’s request
      // Picture-in-Picture for the video, otherwise leave it.
      try {
        videoElem.requestPictureInPicture();
        togglePipButton.innerHTML = "STOP";
        pictureInPictureActive = true;
      }
      catch (err) {
        // Video failed to enter/leave Picture-in-Picture mode.
        console.error("Failed to enter picture in picture")
      }
    }
});

async function startCapture() {
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia( {"video": true, "audio": false});
  } catch(err) {
    console.error("Error: " + err);
  }
}

//Check if we can have picture in picture
if(document.pictureInPictureEnabled){
  togglePipButton.disabled = false;
  startCapture();
}

  