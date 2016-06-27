<?php
	/*
		Copyright © BadTudou, 2016
		All rights reserved
	
		Name	:	contacts.php
		By		:	BadTudou
		Date	:	2016.04.09
		Note	:	
	*/
	require_once('SQL.php');
	class CONTACTS_USER
	{
		protected $m_id;
		protected $m_nickname;
		protected $m_phonenumber;
		protected $m_pwd;
		protected $m_conn;
	
		/**
		 * [构造一个联系人]
		 * @param [type] $id  [description]
		 * @param [type] $pwd [description]
		 */
		public function __construct($id=null, $pwd=null, $nickname=null, $number=null)
		{
			$this->m_id = $id;
			$this->m_nickname = $nickname;
			$this->m_phonenumber = $number;
			$this->m_pwd = $pwd;
			$this->m_conn = new MYSQL();
			$this->m_conn->connect();
			$this->m_conn->selectDatabase('db_contacts');
		}

		public function login()
		{
			$sqlcmd = "SELECT uID, nickname, phonenumber FROM tb_users WHERE uID = ".$this->getID()." AND pwd = '".$this->getPWD()."'";
			$queryresult = $this->m_conn->executeQuery($sqlcmd);
			if ($queryresult)
			{
				$personalInfo = mysqli_fetch_array($queryresult);
				$this->setID($personalInfo['uID']);
				$this->setName($personalInfo['nickname']);
				$this->setNumber($personalInfo['phonenumber']);	
				return $personalInfo;	
			}
			return false;
		}

		public function setID($id)
		{

			$this->m_id = $id;
		}

		public function getID()
		{
			return $this->m_id;
		}

		public function setName($newName)
		{
			$this->m_name = $newName;
		}

	/*	public function login()
		{
			$sqlcmd = "SELECT uID"
		}*/

		public function getName()
		{
			return $this->m_nickname;
		}

		/**
		 * [设置号码]
		 * @param [string] $newNumber [新号码]
		 */
		public function setNumber($newNumber)
		{
			$this->m_number = $newNumber;
		}

		/*
		 * [更改密码]
		 * @param [string] $newPWD [新密码]
		 */
		public function ChangePWD($pwd, $newPWD)
		{
			$sqlcmd = "UPDATE tb_users SET pwd = $newPWD WHERE pwd = $pwd";
			$this->m_conn->executeQuery($sqlcmd);
			$this->m_pwd = $newPWD;
		}

		public function getPWD()
		{
			return $this->m_pwd;
		}

		/**
		 * [获取号码]
		 * @return [string] [号码]
		 */
		public function getNumber()
		{
			return $this->m_number;
		}

		public function addMessage($fid, $type, $text)
		{
			$sqlcmd = "INSERT INTO tb_messages (uID, fID, type, text) VALUES (".$this->getID().", $fid, $type , '$text')";
			$this->m_conn->executeQuery($sqlcmd);
		}

		public function sendAddFriendMsg($fid, $text)
		{
			$this->addMessage($fid, 1, $text);
		}

		public function getAllUnreadMsg()
		{
			$sqlcmd = "SELECT * FROM tb_messages WHERE uID = ".$this->getID()." AND type != 0";
			$queryresult = $this->m_conn->executeQuery($sqlcmd);
			$arUnreadMsg = array();
			while ($unreadMsg = mysqli_fetch_array($queryresult)) 
			{
				array_push($arUnreadMsg, $unreadMsg);
			}
			return $arUnreadMsg;
		}

		public function setHasReadMsg($mID)
		{
			$sqlcmd = "UPDATE tb_messages SET type = 0 WHERE mID = $mID";
			$this->m_conn->executeQuery($sqlcmd);
		}

		public function acceptAddFriendMsg($fid, $text)
		{
			$sqlcmd = "SELECT mID FROM tb_messages WHERE uID = $fid AND type = 1 AND fID = ".$this->getID();
			$queryresult = $this->m_conn->executeQuery($sqlcmd);
			$mID = mysqli_fetch_array($queryresult);
			if ($mID)
			{
				$this->addFriend($this->getID(), $fid);
				$this->addFriend($fid, $this->getID());
				$this->addMessage($fid, 2, $text);
				$this->setHasReadMsg($mID['mID']);	
			}
		}

		public function getFriendList()
		{
			$arFriend = array();
			$sqlcmd = "SELECT uID, nickname, phonenumber FROM tb_users WHERE uID IN (SELECT fID FROM tb_friends WHERE uID = ".$this->getID().")";
			$queryresult = $this->m_conn->executeQuery($sqlcmd);
			while ($friend = mysqli_fetch_array($queryresult)) 
			{
				array_push($arFriend, $friend);
			}
			return $arFriend;
		}

		public function addFriend($uid, $fid)
		{
			$sqlcmd = "INSERT INTO tb_friends (uID, fID) VALUES ($uid, $fid )";
			$this->m_conn->executeQuery($sqlcmd);
		}

		public function addContact($nickname, $phonenumber)
		{
			$sqlcmd = "INSERT INTO tb_friends (uID, nickname, phonenumber) VALUES (".$this->getID().", '$nickname', '$phonenumber')";
			$this->m_conn->executeQuery($sqlcmd);
		}

		public function delFriend($fid)
		{
			$sqlcmd = "DELETE FROM tb_friends WHERE uID = $this->getID() AND fID = $fid ";
			$this->m_conn->executeQuery($sqlcmd);
		}

	}

	//debug
	/*$user = new TUDOU_USER(3,'密码');
	print_r($user->login());
	echo 'tes'.$user->getName();
	$user->sendAddFriendMsg(2, 'hello');
	$user->sendAddFriendMsg(2, 'hellokkk');
	$user->getAllUnreadMsg();
	$user->setHasReadMsg(1);
	print_r($user->getAllUnreadMsg());
	print_r($user->getFriendList());
	$user2 = new TUDOU_USER(2,'密码');
	$user2->acceptAddFriendMsg(1,'好了');
	print_r($user2->getFriendList());*/
?>
