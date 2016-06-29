<?php
	$result = array();

	for($i = 0; $i < 10; $i++) {
		array_push($result, 'Item Number '.$i);
	}
	
	echo json_encode($result);
?>