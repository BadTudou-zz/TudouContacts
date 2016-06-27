<?php
	require_once('CONTACTS_MANAGE_DATABASE.php');

	class CONTACTS_MANAGE_ADMIN extends CONTACTS_MANAGE_DATABASE
	{
		public function __construct()
		{
			parent::__construct();
			$this->m_resource->selectDatabase('db_contacts');
		}

		public function addUser($nickname, $pwd, $phonenumber=null)
		{
			$sqlcmd = "INSERT INTO tb_users (nickname, pwd, phonenumber) VALUES ('$nickname', '$pwd', '$phonenumber')";
			$this->m_resource->executeQuery($sqlcmd);
			return mysqli_insert_id($this->m_resource->m_resource);
		}

	}
?>