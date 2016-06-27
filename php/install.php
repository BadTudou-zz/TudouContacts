<?php
	require_once('CONTACTS_MANAGE_ADMIN.php');
	$db = new CONTACTS_MANAGE_ADMIN();
	$db->initDatabase("db_contacts");	
	$db->addUser('昵称', '密码');
	$db->addUser('昵称2', '密码2');
?>