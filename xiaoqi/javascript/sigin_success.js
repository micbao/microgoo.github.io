(function($) {
	var context = {};
	$(document).ready(function() {
		init();
	});
	function init() {
		console.log(document.location.href);
		context = getSessionStorageJson("context");
		sendTicketMsg();
		$("#goDownLoader").on("click",goDownLoader);
	}
	function goDownLoader(e){
		document.location.href="/mechanic_website/download_owner.html";
	}
	function　sendTicketMsg(){
		var mobileNo = getObject(context,"registerMobile");
		if(isEmpty(mobileNo)){
			alert("手机号码不正确");
			return ;
		}
		var data = {
			mobileNo : mobileNo
		};
		$.myAjax({
			url : '/mechanic_weixin/introductionController/sendTicketMsg.do',
			data : data,
			type : 'post',
			cache : false,
			dataType : 'json',
			success : function(res) {
				if (res.ec == 0) {
					alert("恭喜您注册成功，100元现金抵用券将以短信形式发送到您的手机，赶快下载爽途APP预约使用吧");
				}else {
					alert(res.em);
				}
			},
			error : function() {
				alert("通信异常！");
			}
		});
	}
	
	
})(jQuery);