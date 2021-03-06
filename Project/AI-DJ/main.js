scoreleftwrist=0;
song1status="";
song2status="";
var song1="";
var song2="";
var leftwristx="";
var leftwristy="";
var rightwristx="";
var rightwristy="";

function preload(){
    song1=loadSound("centuries.mp3");
    song2=loadSound("HarryPotter.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill("aquamarine");
    stroke("gold");
    if(scoreleftwrist>0.2){
        circle(leftwristx, leftwristy, 20);
        song1.stop();
        if(song2status==false){
            song2.play()
            document.getElementById("song").innerHTML="Playing - Harry Potter"
        }
}
}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function modelLoaded(){
    console.log('poseNet is intialized');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist="+scoreleftwrist)
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwristx="+rightwristx+"rightwristy="+rightwristy);
    }
}