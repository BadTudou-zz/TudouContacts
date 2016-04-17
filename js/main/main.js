/*
		Copyright © BadTudou, 2016
		All rights reserved

		Name	:	main.js
		By		:	BadTudu
		Date	:	2016年4月17日11:09:05
		Note	:	联系人管理的JQuery脚本
*/

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
});