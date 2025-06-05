let myLocalVideo = null; 
let remoteVideos = []; 
let p5lm = null; 

function setup() {
  createCanvas(800, 700, WEBGL); 
  textSize(14);
  stroke(173, 216, 244);
  strokeWeight(2);

  myLocalVideo = createCapture(VIDEO, gotLocalStream);
  myLocalVideo.hide(); // Hide the HTML element of the webcam
}

let angleX = 0; 
let angleY = 0; 

function draw() {
  background(0);
  orbitControl(); 

  resetMatrix(); 
  fill(255); 
  textSize(24);
  textAlign(CENTER, CENTER); 
  text("Welcome to Haley's TV Camera", 0, -height / 2 + 30); 
 
  rotateX(angleX);
  rotateY(angleY);

  if (myLocalVideo) {
    for (let i = 0; i < 6; i++) {
      push();
      rotateCubeFace(i);
      
      if (i === 0 && remoteVideos.length > 0) {
        texture(remoteVideos[0]);
      } else {
        texture(myLocalVideo);
      }
      
      plane(300, 300); 
      pop();
    }
  }

  angleX += 0.005;
  angleY += 0.01;
}

// Position each face of the cube
function rotateCubeFace(i) {
  resetMatrix();

  if (i === 0) {
    translate(0, 0, 100,100);
  } else if (i === 1) {
    rotateY(HALF_PI);
    translate(-100,0, 150,50);
  } else if (i === 2) {
    rotateY(PI);
    translate(0, 10, -20,100);
  } else if (i === 3) {
    rotateY(-HALF_PI);
    translate(100, 0, 150);
  } else if (i === 4) {
    rotateX(-HALF_PI);
    translate(0, -100, 150);
  } else if (i === 5) {
    rotateX(HALF_PI);
    translate(0, 100, 150);
  }
}

function gotLocalStream(stream) {
  console.log('Got local webcam stream!');
  
  p5lm = new p5LiveMedia(this, "CAPTURE", stream, "live-web-ima");
  p5lm.on("stream", gotRemoteStream);
}

function gotRemoteStream(stream) {
  console.log('Got remote stream!');
  stream.hide(); 
  remoteVideos.push(stream); 
}