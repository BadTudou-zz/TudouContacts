function LoadIframe()
{
	window.console = window.console || {log:function () {}}
	seajs.use(['jquery'], function ($) {

	$('button[data-event=test]').on('click', function () {
		top.dialog({
			id: 'test-dialog',
			title: 'loading..',
			url: 'signin.html',
			//quickClose: true,
			onshow: function () {
				console.log('onshow');
			},
			oniframeload: function () {
				console.log('oniframeload');
			},
			onclose: function () {
				if (this.returnValue) {
					$('#value').html(this.returnValue);
				}
				console.log('onclose');
			},
			onremove: function () {
				console.log('onremove');
			}
		})
		.show(this);
		return false;
	});

	$('button[data-event=reload]').on('click', function () {
		location.reload();
		return false;
	});

});
}

$(document).ready(function($) 
{
	$('#radio1').click(function(event) {
		/* Act on the event */
		console.log('dddd');
		LoadIframe();
	});;
});
