/*
	Copyright © BadTudou, 2016
	All rights reserved

	Name	:	signin.js
	By		:	BadTudu
	Date	:	2016年06月18日13:40:05
	Note	:	用户注册
*/

function RemoveCheckText(obj)
{
	try
	{
		obj.next().text('');
	}
	catch(error)
	{
	}
}

function AddendCheckOkText(obj)
{
	RemoveCheckText(obj);
	if (obj.val() != '')
	{
		obj.after('<span class="inputCheckOk">√</span>');	
	}
}

function AddendCheckErrorText(obj)
{
	RemoveCheckText(obj);
	if (obj.val() != '')
	{
		obj.after('<span class="inputCheckError">×</span>');
		SetTipText(obj.attr("placeholder")+" 输入错误");
	}
}

function SetTipText(tiptext)
{
	$("#userForm-inputform-tip").text(tiptext);
}

function ShowPromptText()
{
	$("input").focus(function(event) 
	{
		if ($(this).val() == '')
		{
			SetTipText($(this).attr("placeholder"));	
		}
	});
}

/*function CheckEmail()
{ 
	$('#input_email').blur(function(event) 
	{
		var reg= /\w+[@]{1}\w+[.]\w+/;
		if (reg.test($(this).val()))
		{
			AddendCheckOkText($(this));	
		}
		else
		{
			AddendCheckErrorText($(this));
		}
	});
}
*/
function CheckName()
{
	$('#input_name').blur(function(event)	
	{
		if($(this).val().length != 0)
		{
			AddendCheckOkText($(this));
		}
		else
		{
			AddendCheckErrorText($(this));
		}
	});
}

/*function CheckAge()
{ 
	$('#input_age').blur(function(event)
	{
		AddendCheckErrorText($(this));
		var reg= /\b\d{2}\b/;
		if (reg.test($(this).val()))
		{
			var age = parseInt($(this).val());
			if (18 <= age && age < 80)
			{
				AddendCheckOkText($(this));
			}
		}	
	});
}*/

function CheckPhoneNumber()
{
	$('#input_phonenumber').blur(function(event)	
	{
		var reg= /\b\d{11}\b/;
		if(reg.test($(this).val()))
		{
			AddendCheckOkText($(this));
		}
		else
		{
			AddendCheckErrorText($(this));
		}
	});
}

function CheckPassword(obj)
{
	obj.blur(function(event)	
	{
		if($(this).val().length >= 8)
		{
			AddendCheckOkText($(this));
		}
		else
		{
			AddendCheckErrorText($(this));
		}
	});
}

function CheckFirstPassword()
{
	CheckPassword($('#input_pwd'));
}

function CheckSecondPassword()
{
	$('#input_againpwd').blur(function(event)	
	{
		CheckPassword($(this));
		if($('#input_pwd').val() == $(this).val())
		{
			AddendCheckOkText($(this));
		}
		else
		{
			AddendCheckErrorText($(this));
			SetTipText('两次的密码不一致');
		}
	});
}

function Signin(request) 
{
	$.ajax({
		url: '../php/web.php',
		type: 'POST',
		data: {action: 'signin', arguments: request.join('|')}
	})
	.done(function(json) 
	{
		if (json != 0)
		{
			alert('你的ID是'+json);
			location.href = "../html/contacts.html";
		}
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function CheckAllInput()
{
	$('#button_signin').click(function(event) 
	{
		event.stopPropagation();
		var inputState = true;
		$(".form_user_input").each(function(index, el) 
		{
			if (($(this).next().text() != '√'))
			{
				inputState = false;
				$(this).focus();
			}	
		});

		if (inputState)
		{
			var name = $('#input_name').val();
			var pwd = $('#input_pwd').val();
			var phonenumber =$('#input_phonenumber').val();
			Signin([name,pwd, phonenumber]);
		}
		else
		{
			console.log('有误');
		}

		return false;
	});
	
}


$(document).ready(function($) 
{
	
	ShowPromptText();
	//CheckEmail();
	CheckName();
	//CheckAge();
	CheckPhoneNumber();
	CheckFirstPassword();
	CheckSecondPassword();
	CheckAllInput();

	//LoadIframe();
});