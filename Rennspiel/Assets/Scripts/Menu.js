var guiStartButton : Texture2D;
var playerName : String;
function Update () {

}
function OnGUI(){
	//GUI.Label(Rect(10,100,300,100),"dies ist ein test");
		//Application.LoadLevel(1);
	GUILayout.BeginArea(Rect((Screen.width/2)-150,(Screen.height/2)-250,300,500));
	
	if (PlayerPrefs.HasKey("Player")){
		playerName = PlayerPrefs.GetString("Player");
		GUILayout.Label("Hallo" + " " + playerName);
	}
	else{
		GUILayout.Label("Name hier eingeben");
		
	}
	
	playerName = GUILayout.TextField(playerName);
	PlayerPrefs.SetString("Player",playerName);
	
	//playerName = Playerprefs.GetString("Player");
	
	if (GUILayout.Button(guiStartButton)){
		Application.LoadLevel(1);
		}
	if (GUILayout.Button(guiStartButton)){
		Application.LoadLevel(1);
		}
	GUILayout.EndArea();
	}