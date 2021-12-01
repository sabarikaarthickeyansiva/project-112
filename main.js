Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

cam=document.getElementById("camera");

Webcam.attach(cam);

function takesnapshot(){
    Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML='<img id="img_snap" src="'+data_uri+'" > '
    });
}

console.log(ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/a5BPRsQje/model.json",modelloaded);

function modelloaded(){
    console.log("modelloaded!!!");
}
function speak(){
    var synth= window.speechSynthesis;

    speak_data1=" the first prediction is "+prediction1;

    speak_data2=" the second prediction is "+prediction2;

    utterthis=new SpeechSynthesisUtterance(speak_data1+" "+speak_data2);

    synth.speak(utterthis);
}

function check(){
    img =document.getElementById("img_snap");
    classifier.classify(img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        prediction1 = results[0].label;

        prediction2 = results[1].label;

        speak();
        
        document.getElementById("result_emotion1").innerHTML = prediction1;

        document.getElementById("result_emotion2").innerHTML = prediction2;

        if(prediction1=="victory"){
            document.getElementById("update_emoji1").innerHTML = "&#9996;"; 
        }
        else if(prediction1=="amazing"){
            document.getElementById("update_emoji1").innerHTML = "&#128076;" ;
        }
        else if(prediction1=="best"){
            document.getElementById("update_emoji1").innerHTML = "&#128077;" ;
        }


        if(prediction2=="victory"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;"; 
        }
        else if(prediction2=="amazing"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;" ;
        }
        else if(prediction2=="best"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;" ;
        }
    }
    
    
}