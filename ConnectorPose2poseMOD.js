//Duik.connector pose2pose MOD

var ctrlLayer =thisComp.layer("C | Slider 2");
var ctrlFrames = ctrlLayer.transform.xPosition

var ctrlValue = ctrlLayer.effect("Slider")(18);
var ctrlEffect = ctrlLayer.effect("Value Connector");
var useVelocity = ctrlEffect(1).value == 2;
if (useVelocity) ctrlValue = ctrlValue.velocity;
else ctrlValue = ctrlValue.value;

var tHasKeys = ctrlFrames.numKeys > 1;

function connect(keyF){



var ctrlMin = ctrlEffect(2).value; //0
var ctrlMax = ctrlEffect(3).value; //100
var result = value;
if (numKeys >= 2 && ctrlEffect.enabled)
{

var t = 0;
var beginTime = key(1).time;
var endTime = key(numKeys).time;
if (ctrlMin > ctrlMax)
{
t = linear(keyF, ctrlMin, ctrlMax, endTime, beginTime);
// t = linear(time, 0, 100, 0.0, 0.5); ????????
}
else
{
t = linear(keyF, ctrlMin, ctrlMax, beginTime, endTime);
}
result = valueAtTime(t);
}
var driver = Math.floor(result);

//
return driver;
}


sliderController = ctrlLayer.transform.xPosition;

poses = [];
temp = 1;

while ( temp <= thisComp.marker.numKeys ) {
	poses.push ( this.value );
	i = temp++ ;
}


function getValues(){
	
var obj_A = sliderController
var ID_A = obj_A.nearestKey(time).index;
var value_A;
var time_A;
var keyF_A;
var keyF_B;

	ctrlNearK = ctrlFrames.nearestKey(time);

	try{
		ctrlPrevK = ctrlNearK.time<time ? ctrlNearK : ctrlFrames.key(ctrlNearK.index-1);
	}catch(err){
		ctrlPrevK = ctrlNearK.time<time ? ctrlNearK : ctrlFrames.key(ctrlNearK.index);
	
	}try{
		ctrlNextK = ctrlFrames.key(ctrlPrevK.index+1);
	}catch(err){
		ctrlNextK = ctrlFrames.key(ctrlPrevK.index)
	}



if (obj_A.nearestKey(time).time <= time ){
 value_A = obj_A.key(ID_A).value;
 time_A = obj_A.key(ID_A).time;  
  
} else {

try{
  obj_A.key(ID_A-1).value;
  value_A = obj_A.key(ID_A-1).value;
  time_A = obj_A.key(ID_A-1).time;  
  
}catch(err){
  value_A = obj_A.key(ID_A).value;
  time_A = obj_A.key(ID_A).time;  
}


}




var obj_B = sliderController
var ID_B = obj_B.nearestKey(time).index;
var value_B;
var time_B;

if (obj_B.nearestKey(time).time >= time ){
 value_B = obj_B.key(ID_B).value;
 time_B = obj_B.key(ID_B).time;
} else {

try{
 obj_B.key(ID_B+1).value;
 value_B = obj_B.key(ID_B+1).value;
 time_B = obj_B.key(ID_B+1).time;
}catch(err){
value_B = obj_B.key(ID_B).value;
time_B = obj_B.key(ID_B).time;
}


}

keyF_A = connect(value_A);
keyF_B = connect(value_B);


	if (ctrlPrevK.value<ctrlNextK.value) {
		return linear(ctrlFrames.value, ctrlPrevK.value, ctrlNextK.value, keyF_A, keyF_B);
	} else {
		return linear(ctrlFrames.value, (ctrlNextK.value+0.1), ctrlPrevK.value, keyF_B, keyF_A);
	}

}

if(tHasKeys) getValues() else key(1).value;
