/**!
 * 微信内置浏览器的Javascript API，功能包括：
 *
 * 1、分享到微信朋友圈
 * 2、分享给微信好友
 * 3、分享到腾讯微博
 * 4、隐藏/显示右上角的菜单入口
 * 5、隐藏/显示底部浏览器工具栏
 * 6、获取当前的网络状态
 *
 * @author zhaoxianlie(http://www.baidufe.com)
 */
var WeixinApi = (function () {

    /**
     * 分享到微信朋友圈
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    appId      公众平台的appId（服务号可用）
     * @p-config    {String}    imageUrl   图片地址
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     * @p-config    {String}    title      分享的标题
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinShareTimeline(data, callbacks) {
        callbacks = callbacks || {};
        var shareTimeline = function (theData) {
            WeixinJSBridge.invoke('shareTimeline', {
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.link,
                "desc":theData.title,
                "title":theData.desc, // 注意这里要分享出去的内容是desc
                "img_width":"120",
                "img_height":"120"
            }, function (resp) {
                switch (resp.err_msg) {
                    // share_timeline:cancel 用户取消
                    case 'share_timeline:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // share_timeline:fail　发送失败
                    case 'share_timeline:fail':
                        callbacks.fail && callbacks.fail(resp);
                        break;
                    // share_timeline:confirm 发送成功
                    case 'share_timeline:confirm':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            if (callbacks.async && callbacks.ready) {
                if(!callbacks.__dataLoadedFuncInited) {
                    var loadedCb = callbacks.dataLoaded || new Function();
                    callbacks.dataLoaded = function (newData) {
                        loadedCb(newData);
                        shareTimeline(newData);
                    };
                    callbacks.__dataLoadedFuncInited = true;
                }
                // 然后就绪
                callbacks.ready && callbacks.ready(argv);
            } else {
                // 就绪状态
                callbacks.ready && callbacks.ready(argv);
                shareTimeline(data);
            }
        });
    }

    /**
     * 发送给微信上的好友
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    appId      公众平台的appId（服务号可用）
     * @p-config    {String}    imageUrl   图片地址
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     * @p-config    {String}    title      分享的标题
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinSendAppMessage(data, callbacks) {
        callbacks = callbacks || {};
        var sendAppMessage = function (theData) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.link,
                "desc":theData.desc,
                "title":theData.title,
                "img_width":"120",
                "img_height":"120"
            }, function (resp) {
                switch (resp.err_msg) {
                    // send_app_msg:cancel 用户取消
                    case 'send_app_msg:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // send_app_msg:fail　发送失败
                    case 'send_app_msg:fail':
                        callbacks.fail && callbacks.fail(resp);
                        break;
                    // send_app_msg:confirm 发送成功
                    case 'send_app_msg:confirm':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            if (callbacks.async && callbacks.ready) {
                if(!callbacks.__dataLoadedFuncInited) {
                    var loadedCb = callbacks.dataLoaded || new Function();
                    callbacks.dataLoaded = function (newData) {
                        loadedCb(newData);
                        sendAppMessage(newData);
                    };
                    callbacks.__dataLoadedFuncInited = true;
                }
                // 然后就绪
                callbacks.ready && callbacks.ready(argv);
            } else {
                // 就绪状态
                callbacks.ready && callbacks.ready(argv);
                sendAppMessage(data);
            }
        });
    }

    /**
     * 分享到腾讯微博
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    imageUrl   图片地址
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     * @p-config    {String}    title      分享的标题
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinShareWeibo(data, callbacks) {
        callbacks = callbacks || {};
        var shareWeibo = function (theData) {
            WeixinJSBridge.invoke('shareWeibo', {
                "content":theData.desc,
                "link":theData.link,
                "img_url":theData.imgUrl,
                "title":theData.title,
                "img_width":"120",
                "img_height":"120"
            }, function (resp) {
                switch (resp.err_msg) {
                    // share_weibo:cancel 用户取消
                    case 'share_weibo:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // share_weibo:fail　发送失败
                    case 'share_weibo:fail':
                        callbacks.fail && callbacks.fail(resp);
                        break;
                    // share_weibo:confirm 发送成功
                    case 'share_weibo:confirm':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            if (callbacks.async && callbacks.ready) {
                if(!callbacks.__dataLoadedFuncInited) {
                    var loadedCb = callbacks.dataLoaded || new Function();
                    callbacks.dataLoaded = function (newData) {
                        loadedCb(newData);
                        shareWeibo(newData);
                    };
                    callbacks.__dataLoadedFuncInited = true;
                }
                // 然后就绪
                callbacks.ready && callbacks.ready(argv);
            } else {
                // 就绪状态
                callbacks.ready && callbacks.ready(argv);
                shareWeibo(data);
            }
        });
    }

    /**
     * 显示网页右上角的按钮
     */
    function showOptionMenu() {
        WeixinJSBridge.call('showOptionMenu');
    }


    /**
     * 隐藏网页右上角的按钮
     */
    function hideOptionMenu() {
        WeixinJSBridge.call('hideOptionMenu');
    }

    /**
     * 显示底部工具栏
     */
    function showToolbar() {
        WeixinJSBridge.call('showToolbar');
    }

    /**
     * 隐藏底部工具栏
     */
    function hideToolbar() {
        WeixinJSBridge.call('hideToolbar');
    }

    /**
     * 返回如下几种类型：
     *
     * network_type:wifi     wifi网络
     * network_type:edge     非wifi,包含3G/2G
     * network_type:fail     网络断开连接
     * network_type:wwan     2g或者3g
     *
     * 使用方法：
     * WeixinApi.getNetworkType(function(networkType){
     *
     * });
     *
     * @param callback
     */
    function getNetworkType(callback) {
        if (callback && typeof callback == 'function') {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                // 在这里拿到e.err_msg，这里面就包含了所有的网络类型
                callback(e.err_msg);
            });
        }
    }

    /**
     * 当页面加载完毕后执行，使用方法：
     * WeixinApi.ready(function(Api){
     *     // 从这里只用Api即是WeixinApi
     * });
     * @param readyCallback
     */
    function wxJsBridgeReady(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            var Api = this;
            var wxReadyFunc = function () {
                readyCallback(Api);
            };
            if (typeof window.WeixinJSBridge == "undefined"){
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
                    document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
                }
            }else{
                wxReadyFunc();
            }
        }
    }
    
    function weixinData(content) {
    	var content = content || '';
		var title = (!!$('head title') && $('head title').text())||'';
		var	image = (!!$('body img') && $('body img').first().attr('src'))||'';
			
		//微信分享
		var wxData = {};
		wxData.link = window.location.href;
		if(!!SHARE.activity_share_title) {
			wxData.title = SHARE.activity_share_title;
		} else {
			wxData.title = title;
		}
		if(!!SHARE.activity_share_description) {
			if(content != '') {
				var result1 = SHARE.activity_share_result1;
				wxData.desc = result1.replace('%s', content);
			} else {
				wxData.desc = SHARE.activity_share_description;
			}
		} else {
			wxData.desc = title;
		}
		if(!!SHARE.activity_share_icon) {
			wxData.imgUrl = SHARE.activity_share_icon;
		} else {
			wxData.imgUrl = image;
		}
		
		return wxData;
    }
    
    /**
     * weixinShare
     * @param wxData {"title":"","desc":"","link":"","imgUrl":""}
     */
    function weixinShare(wxData, fnCallback) {
    	var fnCallback = fnCallback || function(){};
    	
    	// 所有功能必须包含在 WeixinApi.ready 中进行
		WeixinApi.ready(function(Api){
			// 分享的回调
			var wxCallbacks = {
			    // 分享操作开始之前
			    ready:function () {
			        // 你可以在这里对分享的数据进行重组
			    },
			    // 分享被用户自动取消
			    cancel:function (resp) {
			        // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
			    },
			    // 分享失败了
			    fail:function (resp) {
			        // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
			    },
			    // 分享成功
			    confirm:function (resp) {
			    	//添加自定义分享统计
			    	if(!!_paq) {
			    		_paq.push(['trackEvent','app','share']);
						_paq.push(['setCustomVariable','1','app','share','page']);
						_paq.push(['trackPageView']);
					}
			        // 分享成功了，我们是不是可以做一些分享统计呢？
			        fnCallback.call(this, resp);
			    },
			    // 整个分享过程结束
			    all:function (resp) {
			        // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
			    }
			};

		    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
		    Api.shareToFriend(wxData, wxCallbacks);
		 
		    // 点击分享到朋友圈，会执行下面这个代码
		    Api.shareToTimeline(wxData, wxCallbacks);
		    
		    //分享到微博
		    Api.shareToWeibo(wxData, wxCallbacks);
		});
    }

    return {
        version         :"1.2",
        ready           :wxJsBridgeReady,
        shareToTimeline :weixinShareTimeline,
        shareToWeibo    :weixinShareWeibo,
        shareToFriend   :weixinSendAppMessage,
        showOptionMenu  :showOptionMenu,
        hideOptionMenu  :hideOptionMenu,
        showToolbar     :showToolbar,
        hideToolbar     :hideToolbar,
        getNetworkType  :getNetworkType,
        weixinShare     :weixinShare
    };
})();

/**
 * 初始化分享
 * @param {Object} content
 */
function initShareWexin(content) {
	var content = content || '';
	var title = (!!$('head title') && $('head title').text())||'';
	var	image = (!!$('body img') && $('body img').first().attr('src'))||'';
		
	//微信分享
	var wxData = {};
	wxData.link = window.location.href;
	if(!!SHARE.activity_share_title) {
		wxData.title = SHARE.activity_share_title;
	} else {
		wxData.title = title;
	}
	if(!!SHARE.activity_share_description) {
		if(content != '') {
			var result1 = SHARE.activity_share_result1;
			wxData.desc = result1.replace('%s', content);
		} else {
			wxData.desc = SHARE.activity_share_description;
		}
	} else {
		wxData.desc = title;
	}
	if(!!SHARE.activity_share_icon) {
		wxData.imgUrl = SHARE.activity_share_icon;
	} else {
		wxData.imgUrl = image;
	}
	//share
	WeixinApi.weixinShare(wxData);
}

/**
 * 写日志函数
 * @param {Object} obj
 */
function write_log(obj) {
	for(key in obj) {
		$('body').append('key='+key+', value='+obj[key]+'<br/>');
	}
}