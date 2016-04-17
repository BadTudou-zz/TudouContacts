<?php
	/*
		Copyright © BadTudou, 2016
		All rights reserved
	
		Name	:	contacts.php
		By		:	BadTudou
		Date	:	2016.04.09
		Note	:	
	*/


	/**
	 * 联系人
	 */
	class CONTACTS
	{
		protected $m_id;
		protected $m_name;
		protected $m_number;
	
		/**
		 * [构造一个联系人]
		 * @param [type] $id  [description]
		 * @param [type] $pwd [description]
		 */
		function __construct($id=null, $name=null, $number=null)
		{
			$this->m_id = $id;
			$this->m_name = $name;
			$this->m_number = $number;
		}

		/**
		 * [设置姓名]
		 * @param [string] $newName [新姓名]
		 */
		public function setName(string $newName)
		{
			$this->m_name = $newName;
			return true;
		}

		/**
		 * [获取姓名]
		 * @return [string] [姓名]
		 */
		public function getName()
		{
			return $this->m_name;
		}

		/**
		 * [设置号码]
		 * @param [string] $newNumber [新号码]
		 */
		public function setNumber(string $newNumber)
		{
			$this->m_number = $newNumber;
			return true;
		}

				/**
		 * [获取号码]
		 * @return [string] [号码]
		 */
		public function getNumber()
		{
			return $this->m_number;
		}
	}

	/**
	* 用户
	*/
	class USER
	{
		protected $m_uid;
		protected $m_pwd;
		public $m_contact;
		
		function __construct($uid, $pwd)
		{
			$this->m_uid = $uid;
			$this->m_pwd = $pwd;
			$this->m_contact = new CONTACTS();
		}
		
		/**
		 * [更改密码]
		 * @param [string] $newPWD [新密码]
		 */
		public function setPWD(string $newPWD)
		{
			$this->m_pwd = $newPWD;
			return true;
		}

	}

	//debug
	$user = new USER(1, '123');
	$user->m_contact->setName('name');
	echo $user->m_contact->getName();
?>