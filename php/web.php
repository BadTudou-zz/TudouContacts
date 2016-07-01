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

				case 'addfriend':
					$arguments = explode('|', $_POST['arguments']);
					$friendID = $arguments[0];
					$checkMsg = $arguments[1];
					$msg = $contacts_user->sendAddFriendMsg($friendID, $checkMsg);
					if ($msg == 0)
					{
						SendRespond(1, '用户不存在，添加失败');
					}
					else
					{
						SendRespond(0, '请求已发送');
					}
					exit();

				case 'delfriend':
					$arguments = explode('|', $_POST['arguments']);
					$friendID = $arguments[0];
					$contacts_user->delfriend($friendID);
					SendRespond(0, '删除好友成功');
					exit();

				case 'acceptfriend':
					$arguments = explode('|', $_POST['arguments']);
					$friendID = $arguments[0];
					if ($contacts_user->acceptAddFriendMsg($friendID, '接收好友申请', true))
					{
						SendRespond(0, '接收好友请求成功');
					}
					else
					{
						SendRespond(1, '接收好友请求失败');	
					}
					exit();

				case 'rejectfriend':
					$arguments = explode('|', $_POST['arguments']);
					$friendID = $arguments[0];
					if ($contacts_user->acceptAddFriendMsg($friendID, '接收好友申请', false))
					{
						SendRespond(0, '已拒绝该好友请求');	
					}
					else
					{
						SendRespond(1, '未拒绝该好友请求');	
					}
					exit();
				case 'getunreadmsg':
					echo json_encode($contacts_user->getAllUnreadMsg());
					exit();

				case 'readmsg':
					$arguments = explode('|', $_POST['arguments']);
					$mID = $arguments[0];
					$contacts_user->setHasReadMsg($mID);
					SendRespond(0, '已读');
					exit();

				case 'getinfo':
					echo json_encode($contacts_user->getInfo());
					exit();

				case 'setnumber':
					$arguments = explode('|', $_POST['arguments']);
					$newPnhoeNumber = $arguments[0];
					$contacts_user->setNumber($newPnhoeNumber);
					
					SendRespond(0,$contacts_user->updateInfo());
					exit();

				default:
					# code...
					break;
			}
		}
	}
?>