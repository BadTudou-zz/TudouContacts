<?php
	require_once('SQL.php');

	class CONTACTS_MANAGE_DATABASE
	{
		protected $m_resource;

		public function __construct()
		{
			$this->m_resource = new MYSQL();
			$this->m_resource->connect();
		}

		public function createUserTable()
		{
			$sqlcmd = 'CREATE TABLE tb_users 
			(
				uID INTEGER UNSIGNED 	AUTO_INCREMENT NOT NULL 	PRIMARY KEY, 
				nickname VARCHAR(128) NOT NULL,
				pwd CHAR(128) NOT NULL,
				phonenumber CHAR(11)
			)';
			$this->m_resource->executeQuery($sqlcmd);
		}

		public function createAdminTable()
		{
			$sqlcmd = 'CREATE TABLE tb_admin 
			(
				uID INTEGER UNSIGNED 	AUTO_INCREMENT NOT NULL 	PRIMARY KEY, 
				pwd CHAR(128) NOT NULL
			)';
			$this->m_resource->executeQuery($sqlcmd);
		}

		public function createFriendsTable()
		{
			$sqlcmd = 'CREATE TABLE tb_friends
			(
				uID INTEGER UNSIGNED  NOT NULL,
				fID INTEGER UNSIGNED  NOT NULL,
				nickname VARCHAR(128) NOT NULL,
				phonenumber CHAR(11)
			)';
			$this->m_resource->executeQuery($sqlcmd);
		}

		public function createMessagesTable()
		{
			$sqlcmd = 'CREATE TABLE tb_messages
			(
				uID INTEGER UNSIGNED  NOT NULL,
				fID INTEGER UNSIGNED  NOT NULL,
				type INTEGER NOT NULL,
				text VARCHAR(140) NOT NULL
			)';
			$this->m_resource->executeQuery($sqlcmd);
		}

		public function initDatabase(string $dbname)
		{
			$this->m_resource->createDatabase($dbname);
			$this->m_resource->selectDatabase($dbname);
			$this->createUserTable();
			$this->createAdminTable();
			$this->createFriendsTable();
			$this->createMessagesTable();
		}
	}
?>