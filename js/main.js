/*
		Copyright © BadTudou, 2016
		All rights reserved

		Name	:	main.js
		By		:	BadTudu
		Date	:	2016年4月17日11:09:05
		Note	:	联系人管理的JQuery脚本
*/
var activeContactId;
function SendRequest(action, request) 
{
	$.ajax({
		url: '../php/web.php',
		type: 'POST',
		dataType: 'JSON',
		data: {action: action, arguments: request.join('|')}
	})
	.done(function(json) 
	{
		console.log(JSON.stringify(json));
		switch(action)
		{
			case 'getfriendlist':
				$('#contacts-list').empty();
				$.each(json, function(index, val) 
				{
					console.log('id'+val['uID']);
					AddContact(val['uID'], val['nickname'], val['phonenumber']);
				});
				break;

			case 'checkland':
				if (json.stateCode != 0)
				{
					location.href = "../html/index.html";
				}
				else
				{
					GetFriendList();
				}
				break;

			case 'addfriend':
				ShowDig(null,json.msgText);
				break;

			case 'delfriend':
				if (json.stateCode == 0)
				{
					var ele = '#contactlist'+request[0];
					$(ele).remove();
				}
				ShowDig(null,json.msgText);
				break;
				

			case 'getunreadmsg':
				if (json.length == 0) 
				{
					$('#msglist').html('暂无消息');
					break;
				}
				$.each(json,function(index, el) 
				{
					switch(el['type'])
					{
						
						case '1':
							$('#msglist').append('<li id="msgli'+el['uID']+'">好友请求：<a  href="#">'
							+el['uID']+'</a><br/>消息内容：'
							+'<b>'+el['text']+'</b><br/>'
							+'<a class="accept" id="fid'+el['uID']+'"'
							+' href="#" onclick="acceptclick($(this))">接受</a>'
							+'<a class="reject" id="fid'+el['uID']+'"'
							+' href="#" onclick="rejectclick($(this))">拒绝</a><br/></li>');	
							break;

						case '2':
							$('#msglist').append('<li id="msglim'+el['mID']+'">接受请求：<a  href="#">'
							+el['uID']+'</a>'
							+'<a class="reject" id="mid'+el['mID']+'"'
							+' href="#" onclick="readmsgclick($(this))">关闭</a></li>');	
					}
				});
				break;

			case 'acceptfriend':
				if (json.stateCode == 0)
				{
					var ele = '#msgli'+request[0];
					$(ele).remove();
					GetFriendList();
				}
				break;

			case 'rejectfriend':
				if (json.stateCode == 0)
				{
					var ele = '#msgli'+request[0];
					$(ele).remove();
				}
				break;

			case 'readmsg':
				if (json.stateCode == 0)
				{
					var ele = '#msglim'+request[0];
					$(ele).remove();
				}
				break;

			case 'getinfo':
				$('#newphonenumber').val(json.phonenumber);
				break;

			case 'setnumber':
				GetInfo();
				ShowDig(null, '个人信息更新成功');
				break;


		}
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function CheckLand(arguments) 
{
	SendRequest('checkland', arguments);
}

function Signin(arguments)
{
	SendRequest('signin', arguments);
}
function AddFriend(arguments) 
{
	SendRequest('addfriend', arguments);
}
function DelFriend(arguments)
{
	SendRequest('delfriend', arguments);	
}

function AcceptFriend(arguments)
{
	SendRequest('acceptfriend', arguments);
}
function RejectFriend(arguments)
{
	SendRequest('rejectfriend', arguments);	
}
function Exit() 
{
	SendRequest('exit', []);
}
function GetFriendList() 
{
	console.log('获取好友列表');
	SendRequest('getfriendlist', []);
}
function GetUnreadMsg(argument) 
{
	console.log('获取未读取消息');
	SendRequest('getunreadmsg', []);
}
function AddContact(eleid, nickname, phonenumber)
{
	$('#contacts-list').append('<a href="#" id="contact'
	+eleid+'""><li id="contactlist'+eleid
	+'"><div><img class="contactsHead" src="../images/head.jpg"></div><div class="contactsName">'
	+ nickname + '</div><div class="contactsNumber">'
	+ phonenumber +'</div></li></a>')
}

function SetInformation(s)
{
	$('#information_id').text(s);
}

function ShowDig(object ,msg)
{
	var d = dialog(
	{
		align: 'bottom',
		content: msg
	});
	d.show(document.getElementById('head-menu-rightbutton'));
	setTimeout(function () 
	{
	 d.close().remove();
	}, 2000);
}
function GetInfo()
{
	SendRequest('getinfo', []);
}
function SetPhoneNumber(arguments)
{
	SendRequest('setnumber', arguments);	
}
function ShowContextMenu(object)
{
	var imageMenuData = 
	[
		[/*{
			text: "编辑",
			func: function()
			{
				console.log('编辑'+activeContactId);

			}
		  },*/
		  {
			text: "删除",
			func: function()
			{
				//FileOperate('delete', GetCurrentPath(), $(this).text(), 0);
				DelFriend([activeContactId]);
				console.log('删除');
			}
		  }
		],
	];
	$(object).smartMenu(imageMenuData);
}

function AddFriendHander()
{
	$('#menuitem-add').click(function(event) 
	{
		var d = dialog(
		{
			title: '添加好友',
			content: '<input id="friendID" placeholder="好友ID" style="width:180px" autofocus /><br/>'
			+ '<textarea id="msg" placeholder="验证消息" style="height:80px; width:178px"/>'
		}).button([
		{
			value: '添加',
			callback: function () 
			{
				var friendID = $('#friendID').val();
				var msg = $('#msg').val();
				console.log(friendID+msg);
				AddFriend([friendID, msg]);
				return true;
			},
			autofocus: true
		},
		{
			value: '取消',
			callback: function () 
			{
			}
		}]);
		d.show(document.getElementById('menuitem-add'));
	});
}

function EventHander()
{
	AddFriendHander();
	$('#contacts-list').on('click', 'a', function(event) 
	{
		event.preventDefault();
		SetInformation($(this).index());
	});

	$('#head-menu-rightbutton-button').hover(function(event) 
	{
		$('#head-menu-rightbutton-list').show();
	});

	$('#head-menu-rightbutton-list').hover(function(event) {},
	function(event) 
	{
		$('#head-menu-rightbutton-list').hide();
	});

	
	$('#menuitem-msg').click(function(event) 
	{
		GetUnreadMsg();
		var d = dialog(
		{
			title: '消息中心',
			content: '<ul id="msglist"/></ul>'
		});
		d.show(document.getElementById('head-menu-rightbutton-button'));
	});

	$('#menuitem-set').click(function(event) 
	{
		var d = dialog(
		{
			title: '设置',
			content: '手机号码<br/><input id="newphonenumber" placeholder="手机号码" style="width:180px" autofocus /><br/>',
		}).button([
		{
			value: '保存',
			callback: function () 
			{
				var newphonenumber = $('#newphonenumber').val();
				SetPhoneNumber([newphonenumber]);
				return true;
			},
			autofocus: true
		},
		{
			value: '取消',
			callback: function () 
			{
			}
		}]);
		d.show(document.getElementById('head-menu-rightbutton-button'));
		GetInfo();
	});

	$('#menuitem-exit').click(function(event)
	{
		Exit();
		location.href = "../html/index.html";
	});

	$("body").on("contextmenu", 0, function(event)
	{
		event.preventDefault();
	});

	$("#contacts-list").on("mousedown","li", function(event)
	{
		console.log('鼠标');
		if (event.which == 3)
		{
			console.log('鼠标右击');
			activeContactId = $(this).attr('id').substr(11);
			ShowContextMenu($(this));
			return true;
		}
	});


}

function ReadMsg(arguments)
{
	SendRequest('readmsg', arguments);
}

function acceptclick(obj)
{
	AcceptFriend([obj.attr('id').substr(3)]);
}
function rejectclick(obj)
{
	RejectFriend([obj.attr('id').substr(3)]);
	//console.log('dddd'+obj.attr('id'));
}
function readmsgclick(obj)
{
	ReadMsg([obj.attr('id').substr(3)]);
	console.log([obj.attr('id').substr(3)]);
}
$(document).ready(function()
{
	CheckLand([]);
	GetUnreadMsg();
	EventHander();
	
});