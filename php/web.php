<?php
	require_once('CONTACTS_MANAGE_ADMIN.php');
	require_once('CONTACTS_USER.php');
	require_once('LIB.php');
	if (isset($_POST['action']))
	{
		switch ($_POST['action']) 
		{
			case 'land':
				$arguments = explode('|', $_POST['arguments']);
				$userID = $arguments[0];
				$userPWD = $arguments[1];
				$contacts_user = new CONTACTS_USER($userID, $userPWD);
				$personlInfo = $contacts_user->login();
				if ($personlInfo)
				{
					$_SESSION['uID'] = $personlInfo['uID'];
					$_SESSION['pwd'] = $userPWD;
					SendRespond(0, '登陆成功');
				}
				else
				{
					SendRespond(1, '登陆失败');
				}
				exit();
				break;
			
			case 'signin':
				$arguments = explode('|', $_POST['arguments']);
				$userName = $arguments[0];
				$userPWD = $arguments[1];
				$userPhoneNumber = $arguments[2];
				$admin = new CONTACTS_MANAGE_ADMIN();
				$userID = $admin->addUser($userName, $userPWD, $userPhoneNumber);
				if ($userID != 0)
				{
					SendRespond(0, $userID);
				}
				else
				{
					SendRespond(1, '注册失败');
				}
				exit();
				break;

			case 'checkland':
				if (isset($_SESSION['uID']))
					SendRespond(0, '登陆成功');
				else
					SendRespond(1, '登陆失败');
				exit();
				break;
			default:
				# code...
				break;
		}

		if (isset($_SESSION['uID']))
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
					echo json_encode(($contacts_user->getFriendList()));
					break;

				default:
					# code...
					break;
			}
		}
	}
?>