var NotificationHandler = {
    isNotificationSupported: 'Notification' in window,
    isPermissionGranted: function() {
        return Notification.permission === 'granted';
    },
    requestPermission: function() {
        if (!this.isNotificationSupported) {
            console.log('The current browser does not support Notification API');
            return;
        }

        Notification.requestPermission(function(status) {
            //status授权状态，用户允许，则为granted
            console.log('status:' +status);

            //permission为只读属性
            var permission = Notification.permission;
            //defult 用户没有接收或拒绝授权，不能显示通知
            //granted 用户授权，允许显示通知
            //denied  用户拒绝授权，不允许显示通知

            console.log('permisson:' + permission);
        });
    },
    showNotification:function(){
        if(!this.isNotificationSupported){
            console.log('The current browser does not support Notification API');
            return;
        }

        if(!this.isPermissionGranted){
            console.log('The current page has not been granted for notification')
            return;
        }


        var n = new Notification('hi, you got a message',{
            icon:'/star.ico',
            body:'hello',
			vibrate:[200,100],     //设置震动模式，描述交替时间的数组,[震动，不震动]
			/*renotify:true,   //通知是否替换，设置为true，常与tag一块
			tag:true
			noscreen:false*/
        });

        //显示消息，自动执行
        n.onshow = function(){
            console.log('notification shows up!');

            setTimeout(function(){
                n.close();
            },5000);
        }


        n.onclick = function(){
            alert('open ....');

            n.close();
        }

        n.onerror = function(){
            console.log('notification encounters an error');
        }

        n.onclose = function(){
            console.log('notification is closed');
        }
    }
}

document.addEventListener('load',function(){
	NotificationHandler.requestPermission();     //让浏览器出现是否允许通知的提醒
})
