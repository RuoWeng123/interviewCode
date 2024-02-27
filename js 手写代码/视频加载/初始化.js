function init(videoStreamUrl){
  const videoEl = document.getElementById('myVideo');
  videoEl.srcObject = videoStreamUrl;
  videoEl.onloadedmetadata = function(e) {
    videoEl.play();
  }
}

function onUnMount(){
  const videoEl = document.getElementById('myVideo');
  videoEl.pause();
  videoEl.srcObject = null;
}