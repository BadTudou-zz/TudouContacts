<?php
	require_once('CONTACTS_MANAGE_ADMIN.php');
	require_once('CONTACTS_USER.php');
	if (isset($_POST['action']))
	{
		if ($_POST['action'] == 'land')
		{
			$arguments = explode('|', $_POST['arguments']);
			$userID = $arguments[0];
			$userPWD = $arguments[1];
			$contacts_user = new CONTACTS_USER($userID, $userPWD);
			$personlInfo = $contacts_user->login();
			if ($personlInfo)
			{
				$_SESSION['uID'] = $personlInfo['uID'];
				$_SESSION['pwd'] = $userPWD;
				echo '登陆成功';
			}
			else
			{
				echo '登陆失败';
			}
		}
		else if ($_POST['action'] == 'signin')
		{
			$arguments = explode('|', $_POST['arguments']);
			$userName = $arguments[0];
			$userPWD = $arguments[1];
			$userPhoneNumber = $arguments[2];
			$admin = new CONTACTS_MANAGE_ADMIN();
			echo $admin->addUser($userName, $userPWD, $userPhoneNumber);
		}
		else if (isset($_SESSION['uID']))
		{
			$contacts_user = new CONTACTS_USER($_SESSION['uID'], $_SESSION['pwd']);
			$contacts_user->login();
			switch ($_POST['action']) 
			{
				case 'exit':
					unset($_SESSION['uID']);
					unset($_SESSION['pwd']);
					break;
				
				case 'getfriendlist':
					print_r($contacts_user->getFriendList());
					break;
				default:
					# code...
					break;
			}
			echo '之前已经登陆';
		}
		else
		{
			echo '重新登陆';
		}

	}
?>