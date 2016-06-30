
function LoadIframe(htmlurl, ele)
{
	window.console = window.console || {log:function () {}}
	seajs.use(['jquery'], function ($) 
	{
		top.dialog(
		{
			id: 'test-dialog'+ele,
			title: 'loading..',
			url: htmlurl,
			align: "bottom",
			//quickClose: true,
			onshow: function () {
			
				console.log('onshow'+ele);
			},
			oniframeload: function () {
				console.log('oniframeload');
			},
			onclose: function () {
				if (this.returnValue) 
				{
					if(this.returnValue == 1)
					{
						window.parent.location.href = "../html/main.html";
						console.log('dddd');
					}
				}
				
			},
			onremove: function () 
			{
				console.log('onremove'+ele);
				//if (ele == )
			}
		}).show(document.getElementById(ele));
		return false;
	});
}

$(document).ready(function() 
{
	$('#button_signin').click(function(event) 
	{
		LoadIframe('signin.html', 'button_signin');
	});
	$('#button_land').click(function(event) 
	{
		LoadIframe('land.html', 'button_land');
	});

});