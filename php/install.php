<?php
	require_once('SQL.php');
	
	function initDatabase(string $dbname)
	{
		$dataserver->createDatabase($dbname);
	}
?>