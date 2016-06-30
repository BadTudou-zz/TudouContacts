/*
	Copyright © BadTudou, 2016
	All rights reserved

	Name	:	land.js
	By		:	BadTudu
	Date	:	2016年06月18日13:40:05
	Note	:	用户登陆
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


function CheckIDNumber()
{
	$('#input_idnumber').blur(function(event)	
	{
		var reg= /\b\d{1,}\b/;
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
		if($(this).val().length >= 4)
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


function Land(request) 
{
	$.ajax({
		url: '../php/web.php',
		type: 'POST',
		dataType: 'JSON',
		data: {action: 'land', arguments: request.join('|')}
	})
	.done(function(json) 
	{
		if (json.stateCode != 0)
		{
			SetTipText('用户ID或密码错误');
			$('#input_pwd').val('');
		}
		else
		{
			var dialog = top.dialog.get(window);
			dialog.close(1);	
		}
		
	})
	.fail(function(json) 
	{
		console.log("error"+json);
	})
	.always(function() {
		console.log("complete");
	});
	
}

function CheckAllInput()
{
	$('#button_land').click(function(event) 
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
			var pwd = $('#input_pwd').val();
			var idnumber =$('#input_idnumber').val();
			Land([idnumber,pwd]);
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
	CheckIDNumber();
	CheckFirstPassword();
	CheckAllInput();
});