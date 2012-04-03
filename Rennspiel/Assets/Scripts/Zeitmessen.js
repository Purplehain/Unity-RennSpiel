var pastTime : float;
var guiZeitAnzeige : GUIText;
var myWC : WheelCollider;
var namePlayer : String;

private var isFinished : boolean = false;

function Start () {

}

function Update () {
	var hit : WheelHit;
	if(myWC.GetGroundHit(hit)){
		if(hit.collider.gameObject.tag == "finish"){
			isFinished = true;
		}
	}
	if(!isFinished){
	pastTime += Time.deltaTime;
	}
	guiZeitAnzeige.text = pastTime.ToString();
}

function OnGUI(){
	namePlayer = GetInfos.playerName;
	if(isFinished){
		var bestTime : float = 9999;
		if(PlayerPrefs.HasKey("bestTime")){
		bestTime = PlayerPrefs.GetFloat("bestTime");
		}
		GUILayout.BeginArea(Rect((Screen.width/2)-150,(Screen.height/2)-250,300,500));
		if (pastTime <= bestTime){
			
			GUILayout.Label("Gratulation! Du hast mit" + pastTime + "eine neue Bestzeit aufgestellt.");
			PlayerPrefs.SetFloat("BestTime", pastTime);
		}
		
		if (GUILayout.Button("Zum Menü")){
		Application.LoadLevel(0);
		}
	}
	
}