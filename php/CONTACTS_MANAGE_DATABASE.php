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
				nickname VARCHAR(128),
				phonenumber CHAR(11),
				PRIMARY KEY (uID, fID)
			)';
			$this->m_resource->executeQuery($sqlcmd);

			$sqlcmd = "ALTER TABLE tb_friends ADD CONSTRAINT fk_friend_uID FOREIGN KEY(uID) REFERENCES tb_users(uID) ON UPDATE CASCADE";
			$this->m_resource->executeQuery($sqlcmd);

			$sqlcmd = "ALTER TABLE tb_friends ADD CONSTRAINT fk_friend_fID FOREIGN KEY(uID) REFERENCES tb_users(fID) ON UPDATE CASCADE";
			$this->m_resource->executeQuery($sqlcmd);
		}

		public function createMessagesTable()
		{
			$sqlcmd = 'CREATE TABLE tb_messages
			(
				mID INTEGER UNSIGNED 	AUTO_INCREMENT NOT NULL 	PRIMARY KEY, 
				uID INTEGER UNSIGNED  NOT NULL,
				fID INTEGER UNSIGNED  NOT NULL,
				type INTEGER NOT NULL,
				text VARCHAR(140) NOT NULL,
				time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
			)';
			$this->m_resource->executeQuery($sqlcmd);

			$sqlcmd = "ALTER TABLE tb_messages ADD CONSTRAINT fk_message_uID FOREIGN KEY(uID) REFERENCES tb_users(uID) ON UPDATE CASCADE";
			$this->m_resource->executeQuery($sqlcmd);

			$sqlcmd = "ALTER TABLE tb_messages ADD CONSTRAINT fk_message_fID FOREIGN KEY(uID) REFERENCES tb_users(fID) ON UPDATE CASCADE";
			$this->m_resource->executeQuery($sqlcmd);
		}

		public function initDatabase($dbname)
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