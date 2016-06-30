/*
		Copyright © BadTudou, 2016
		All rights reserved

		Name	:	main.js
		By		:	BadTudu
		Date	:	2016年4月17日11:09:05
		Note	:	联系人管理的JQuery脚本
*/
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
					AddContact(val['uID'], val['nickname'], val['phonenumber']);
				});
				break;

			case 'checkland':
				if (json.stateCode != 0)
				{
					alert('请登录');
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

			case 'getunreadmsg':
				$.each(json,function(index, el) 
				{
					switch(el['type'])
					{
						
						case '1':
							$('#msglist').append('<li id="msgli'+el['uID']+'">好友请求：<a  href="#">'
							+el['uID']+'</a>'
							+'<b>'+el['text']+'</b><br/>'
							+'<a class="accept" id="fid'+el['uID']+'"'
							+' href="#" onclick="acceptclick($(this))">接受</a>'
							+'<a class="reject" id="fid'+el['uID']+'"'
							+' href="#" onclick="rejectclick($(this))">接受</a></li>');	
							break;
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

function AcceptFriend(arguments)
{
	SendRequest('acceptfriend', arguments);
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
	+eleid+'""><li><div><img class="contactsHead" src="../images/head.jpg"></div><div class="contactsName">'
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

function EventHander()
{
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
		console.log('隐藏');
		$('#head-menu-rightbutton-list').hide();
	});

	
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

	$('#menuitem-msg').click(function(event) 
	{
		/* Act on the event */
		GetUnreadMsg();
		var d = dialog(
		{
    		title: '消息中心',
    		content: '<ul id="msglist"/></ul>'
		});
		d.show(document.getElementById('head-menu-rightbutton-button'));
	});

	$('#menuitem-exit').click(function(event)
	{
		Exit();
		location.href = "../html/index.html";
	});




	
}
function acceptclick(obj)
{
	AcceptFriend([obj.attr('id').substr(3)]);
}
function rejectclick(obj)
{
	console.log('dddd'+obj.attr('id'));
}
$(document).ready(function()
{
	CheckLand([]);
	GetUnreadMsg();
	EventHander();
	
});