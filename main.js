video = "";
status = "";
objects = [];

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480 , 450);
    canvas.center();
}

function draw() {
    image(video , 0 , 0 , 480 , 450);
    if (status != ""){
      objectDectector.detect(video , gotResult);

      for(i = 0; i <= objects.length; i++)
      {
          document.getElementById("status").innerHTML = "status: object detected";
          document.getElementById("number_of_objects").innerHTML = "number of objects detected are" + objects.length;
          fill("red");
          percent = floor(objects[i].confidence*100);
          text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15);
          noFill();
         stroke("red");
         rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
      }
    }
}

function gotResult(error , results){
    if (error)
    {
        console.log(error);
    }
    console.log(results);

    objects = results;
}

function start() {
    objectDetector = ml5.objectDectector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Has Been Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}