#pragma strict

function Start () {

}

function Update () {
	
}

function fixedupdate(){
	GearSound();

}
function GearSound(){
	var currentPitch : float =0.00;
	
	currentPitch = Input.GetAxis("Verical")+0.8;
	audio.pitch = currentPitch;
}