//Fahrzeugsteuerung
var flWheelCollider :WheelCollider;
var frWheelCollider :WheelCollider;
var rlWheelCollider : WheelCollider;
var rrWheelCollider : WheelCollider;
var maxTorque= 150.0;
var maxBrakeTorque = 500.0;
var maxSteerAngle = 30.0;
var steerStep : float = 1.0;
var maxBackwardSpeed : float = 40;
var maxSpeed : float = 200.0;
var currentSpeed : float = 0.0;
private var isBraking : boolean = false;
//Reifenvisualisierung
var flWheel : Transform;
var frWheel : Transform;
var rlWheel : Transform;
var rrWheel : Transform;
//Geschwindigkeitsanzeige
var GuiSpeed : GUIText;
var guiSpeedPointer : Texture2D;
var guiSpeedDisplay : Texture2D;
//Gaenge
var gearSpeed : int[];
private var currentGear: int=0;

//VollBremsung
var FullBreakTorque:float = 5000.00;
private var oldForwardFriction : float = 0.00;
private var oldSidewaysFriction : float = 0.00;
private var newForwardFriction : float = 0.04;
private var newSidewaysFriction : float = 0.01;
private var stopForwardFriction : float = 1;
private var stopSidewaysFriction : float = 1;


function Start () {
	GuiSpeed.material.color = Color.green;
	rigidbody.centerOfMass.y = 0;
	oldForwardFriction = frWheelCollider.forwardFriction.stiffness;
	oldSidewaysFriction = frWheelCollider.sidewaysFriction.stiffness;
}

function FixedUpdate () {

	currentSpeed = (Mathf.PI * 2 * flWheelCollider.radius) * flWheelCollider.rpm * 60/1000;
	currentSpeed = Mathf.Round(currentSpeed);
	
	
	
	if ((currentSpeed > 0) && (Input.GetAxis("Vertical") < 0 ) || (currentSpeed < 0) && (Input.GetAxis("Vertical") > 0 )){
		isBraking = true;
	}	
	else {
		isBraking = false;
		flWheelCollider.brakeTorque = 0;
		frWheelCollider.brakeTorque = 0;
	}
	if (isBraking == false) {
		if ((currentSpeed < maxSpeed) && (currentSpeed > (maxBackwardSpeed*-1))){

			flWheelCollider.motorTorque = maxTorque * Input.GetAxis("Vertical");
			frWheelCollider.motorTorque = maxTorque * Input.GetAxis("Vertical");
	}
		else {
			flWheelCollider.motorTorque = 0;
			frWheelCollider.motorTorque = 0;
		}
	}
	else {
		flWheelCollider.brakeTorque = maxBrakeTorque;
		frWheelCollider.brakeTorque = maxBrakeTorque;
		flWheelCollider.motorTorque = 0;
		frWheelCollider.motorTorque = 0;
	}	
	
	flWheelCollider.steerAngle = maxSteerAngle * Input.GetAxis("Horizontal");
	frWheelCollider.steerAngle = maxSteerAngle * Input.GetAxis("Horizontal");

	GuiSpeed.text = currentSpeed.ToString();
	
	SetCurrentGear();
	GearSound();
}
	
	
function FullBraking() {
	if(Input.GetButton("space")){
		rlWheelCollider.brakeTorque = FullBreakTorque;
		rrWheelCollider.brakeTorque = FullBreakTorque;
		if ((Mathf.Abs(rigidbody.velocity.z)>1)||(Mathf.Abs(rigidbody.velocity.x)>1)){

			SetFriction(newForwardFriction,newSidewaysFriction);
		}
		else{
			SetFriction(stopForwardFriction,stopSidewaysFriction);

		}
		
	}
	else{
		rlWheelCollider.brakeTorque =0;
		rrWheelCollider.brakeTorque =0;
		SetFriction(oldForwardFriction,oldSidewaysFriction);
	}
}
function SetFriction(MyForwardFriction :float, MySidewaysFriction:float){
	frWheelCollider.forwardFriction.stiffnes = MyForwardFriction;
	flWheelCollider.forwardFriction.stiffnes = MyForwardFriction;
	rrWheelCollider.forwardFriction.stiffnes = MyForwardFriction;
	rlWheelCollider.forwardFriction.stiffnes = MyForwardFriction;
	
	frWheelCollider.sidewaysFriction.stiffnes = MySidewaysFriction;
	flWheelCollider.sidewaysFriction.stiffnes = MySidewaysFriction;
	rrWheelCollider.sidewaysFriction.stiffnes = MySidewaysFriction;
	rlWheelCollider.sidewaysFriction.stiffnes = MySidewaysFriction;	
}

function Update()
{
	RotateWheels();
	SteelWheels();


}
function OnGUI()
{
	var pointerPosition :float = 40.0;
	
	GUI.Box(Rect(0.0, 0.0, 140.0, 140.0), guiSpeedDisplay);
	if(currentSpeed>0){
		pointerPosition = currentSpeed + 40;
	}
	GUIUtility.RotateAroundPivot(pointerPosition,Vector2(70,70));
	GUI.DrawTexture(Rect(0.0, 0.0, 140.0, 140.0), guiSpeedPointer, ScaleMode.StretchToFill,true,0);
}
function RotateWheels() {
	flWheel.Rotate(flWheelCollider.rpm / 60 * 360 * Time.deltaTime,0,0);
	frWheel.Rotate(flWheelCollider.rpm / 60 * 360 * Time.deltaTime,0,0);	
	rlWheel.Rotate(flWheelCollider.rpm / 60 * 360 * Time.deltaTime,0,0);	
	rrWheel.Rotate(flWheelCollider.rpm / 60 * 360 * Time.deltaTime,0,0);	
}
	
function SteelWheels() {
	flWheel.localEulerAngles.y = flWheelCollider.steerAngle - flWheel.localEulerAngles.z;
	frWheel.localEulerAngles.y = flWheelCollider.steerAngle - flWheel.localEulerAngles.z;
}
function SetCurrentGear() {
	var gearNumber :int;
	gearNumber = gearSpeed.length;
	
	for (var i=0; i< gearNumber;i++){
		if(gearSpeed[i]>currentSpeed){
			currentGear = i;
			break;
		}
	}
}
function GearSound(){
	var tempMinSpeed : float=0.00;
	var tempMaxSpeed : float=0.00;
	var currenPitch : float =0.00;
	
	switch (currentGear) {
		case 0:
			tempMinSpeed = 0.00;
			tempMaxSpeed = gearSpeed[currentGear];
			break;
			
		default:
			tempMinSpeed = gearSpeed[currentGear - 1];
			tempMaxSpeed = gearSpeed[currentGear];
	}
	currentPitch =((Mathf.Abs(currentSpeed) - tempMinSpeed)/(tempMaxSpeed - tempMinSpeed))+0.8;
	audio.pitch = currentPitch;
}
