/*
		Copyright © BadTudou, 2016
		All rights reserved

		Name	:	main.js
		By		:	BadTudu
		Date	:	2016年4月17日11:09:05
		Note	:	联系人管理的JQuery脚本
*/
var backhtml;
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
		switch(action)
		{
			case 'getfriendlist':
				console.log(JSON.stringify(json));
				$.each(json, function(index, val) 
				{
					AddContact(val['uID'], val['nickname'], val['phonenumber']);
				});
				break;

			case 'checkland':
				if (json.stateCode == 1)
				{
					alert('请登录');
					location.href = "../html/index.html";
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

function Exit() 
{
	SendRequest('exit', []);
}
function GetFriendList() 
{
	console.log('获取好友列表');
	SendRequest('getfriendlist', []);
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
    		content: '<input id="friendID" placeholder="好友ID" autofocus />'
		}).button([
        {
            value: '添加',
            callback: function () 
            {
                var friendID = $('#friendID').val();
        		console.log(friendID);
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

	$('#menuitem-exit').click(function(event)
	{
		Exit();
		location.href = "../html/index.html";
	});
}

$(document).ready(function()
{
	CheckLand([]);
	GetFriendList();
	EventHander();
	
});