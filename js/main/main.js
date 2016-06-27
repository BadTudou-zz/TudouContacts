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
		url: 'php/web.php',
		type: 'POST',
	/*	dataType: 'JSON',*/
		data: {action: action, arguments: request.join('|')}
	})
	.done(function(json) 
	{
		console.log("success"+json);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function Login(arguments) 
{
	SendRequest('login', arguments);
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
	SendRequest('getfriendlist', []);
}
function AddContact()
{
	$('#contacts-list').append('<a href="#"><li><div><img class="contactsHead" src="images/head.jpg"></div><div class="contactsName">姓名</div><div class="contactsNumber">15330341014</div></li></a>')
}

function SetInformation(s)
{
	$('#information_id').text(s);
}

$(document).ready(function()
{
	AddContact();
	AddContact();
	AddContact();
	AddContact();

	$('#contacts-list').on('click', 'a', function(event) 
	{
		event.preventDefault();
		SetInformation($(this).index());
	});
	/*Login(['1', '密码']);
	GetFriendList();
	Exit();*/
});