(function ($) {
    var params = {};
    $(document).ready(function () {
        init();
    });

    function init() {
        console.log("demo");
        getParam(document.location.search.substr(1), params);

        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: false
        });

        getJsApiTicket();
        $("#goNext").on("click", goNext);
    }

    function goNext(e) {
        document.location.href = "../../carOwner/html/sigin.html?callback=/mechanic_weixin/show/introduction/html/sigin_success.html&invitationCode=" + getObject(params, "invitationCode");
    }

    function getJsApiTicket() {
        var data = {
            url: location.href.split('#')[0],
            activityCode: "share1"
        };
        $.myAjax({
            url: '/mechanic_weixin/activity/getJsApiTicket.do',
            data: data,
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (res) {
                    // 微信配置
                    wx.config(res);
                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            title: '要修车，找爽途，省钱省心，不再被坑', //分享标题
                            //link: "http://www.c2bmotors.com/mechanic_weixin/show/html/helpActive.html?awardCode="+sessionStorage.getItem("awardCode"), // 分享链接
                            imgUrl: 'http://www.c2bmotors.com/mechanic_weixin/show/introduction/logo.jpg', // 分享图标
                            success: function () {},
                            cancel: function () {}
                        });
                        wx.onMenuShareAppMessage({
                            title: '要修车，找爽途，省钱省心，不再被坑', //分享标题
                            desc: '要修车，找爽途，省钱省心，不再被坑', // 分享描述
                            //link: '', // 分享链接
                            imgUrl: 'http://www.c2bmotors.com/mechanic_weixin/show/introduction/logo.jpg', // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {},
                            cancel: function () {}
                        });
                    });
                    wx.error(function (res) {
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        alert("wxInitFailed");
                    });

                },
                error: function () {
                    alert("通信异常！");
                }
        });
    }
})(jQuery);