<?php
	require_once("core_functions.php");

	$user_id = $_POST['user_id'];
	$activty_id = $_POST['activty_id'];

	$dbc = getDBConnection();		
	$sql = "INSERT INTO  watm_activity_invited (user_id, activity_id) VALUES (?,?)";
	$stmt = null;


	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("ss", $user_id, $activty_id);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['value'] = true;
			}else{
				$status['value'] = false;
			}
			print json_encode($status);
		}else{
			$status['value'] = false;
			print json_encode($status);
		}
	}else{
		$dbc->close();
		return false;
	}

?>