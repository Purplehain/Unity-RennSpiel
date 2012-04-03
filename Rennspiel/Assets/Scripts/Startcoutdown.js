var guiCountDown : GUIText;
var countMax : int;
private var countDown : int;

function Start () {
	guiCountDown.enabled=true;
	GameStart();
}

function Update () {

}
function GameStart(){
	var car = gameObject.Find("Race_Car_GLSL");
	var drivingScript = car.GetComponent("Driving");
	drivingScript.enabled=false;
	var timer = GetComponent("Zeitmessen");
	timer.enabled = false;
	var motoridle = car.GetComponent("Motoridel");
	motoridle.enabled = true;
	
	for(countDown = countMax; countDown>0;countDown--){
		guiCountDown.text = countDown.ToString();
		yield WaitForSeconds(1);
	}
	
	guiCountDown.enabled=false;
	drivingScript.enabled=true;
	timer.enabled=true;
	motoridle.enabled = false;
	
}