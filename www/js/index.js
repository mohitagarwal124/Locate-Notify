$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
    MobileOS = device.platform;

    function openSettings() {
        cordova.plugins.diagnostic.switchToSettings(function () {},
            function (error) {
                window.plugins.toast.showWithOptions({
                    message: "Unable to open settings...",
                    duration: "long",
                    position: "bottom",
                    addPixelsY: -20 // added a negative value to move it up a bit (default 0)
                });
            });
    }

    function locationStatus(status) {
        if (MobileOS == "Android") {
            if (status == "NOT_REQUESTED") {
                locationRequest();
            } else if (status == "GRANTED") {
                locationGranted();
            } else if (status == "DENIED" || status == "DENIED_ALWAYS") {
                var content = '<div class="white-popup"><div class="row pop-main-row shadow-z-1"><span class="pop-main-text"><i class="vertalign"></i><b> Location Denied</b></span></div><p class="pop-body">Seems your GPS is off. Please turn it on via settings.</p><button class="btn btn-primary btn-md" id=settings-btn>Settings</button></div>';
                $.magnificPopup.open({
                    items: {
                        src: content, // can be a HTML string, jQuery object, or CSS selector
                        type: 'inline'
                    },
                    removalDelay: 0,
                    closeOnBgClick: true,
                    closeBtnInside: true,
                    showCloseBtn: true,
                    enableEscapeKey: true
                });
            }
        } else if (MobileOS == "iOS") {
            if (status == "NOT_REQUESTED") {
                locationRequest();
            } else if (status == "GRANTED" || status == "GRANTED_WHEN_IN_USE") {
                locationGranted();
            } else if (status == "DENIED") {
                var content = '<div class="white-popup"><div class="row pop-main-row shadow-z-1"><span class="pop-main-text"><i class="vertalign"></i><b> Location Denied</b></span></div><p class="pop-body">Seems your GPS is off. Please turn it on via settings.</p><button class="btn btn-primary btn-md" id=settings-btn>Settings</button></div>';
                $.magnificPopup.open({
                    items: {
                        src: content, // can be a HTML string, jQuery object, or CSS selector
                        type: 'inline'
                    },
                    removalDelay: 0,
                    closeOnBgClick: true,
                    closeBtnInside: true,
                    showCloseBtn: true,
                    enableEscapeKey: true
                });
            }
        }
    }

    function locationAuthorization() {
        cordova.plugins.diagnostic.getLocationAuthorizationStatus(function (status) {
            locationStatus(status);
        }, function (err) {
            return;
        });
    }

    function locationRequest() {
        cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
            locationStatus(status);
        }, function (err) {
            return;
        });
    }

    function locationGranted() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var content = '<div class="white-popup"><div class="row pop-main-row shadow-z-1"><span class="pop-main-text"><i class="vertalign"></i><b> Location Info</b></span></div><p class="pop-body">Latitude is: ' + lat + ' and Longtitude is: ' + lon + '</p></div>';
            $.magnificPopup.open({
                items: {
                    src: content, // can be a HTML string, jQuery object, or CSS selector
                    type: 'inline'
                },
                removalDelay: 0,
                closeOnBgClick: true,
                closeBtnInside: true,
                showCloseBtn: true,
                enableEscapeKey: true
            });
        }, function (err) {
            window.plugins.toast.showWithOptions({
                message: "Unable to fetch location...",
                duration: "long",
                position: "bottom",
                addPixelsY: -20 // added a negative value to move it up a bit (default 0)
            });
        }, {
            enableHighAccuracy: true,
            timeout: 2000
        });
    }

    function scheduleNotification() {
        var notifTime = $("#notif-time").val();
        var notifMsg = $("#purpose").val();
        if (notifTime == '') {
            window.plugins.toast.showWithOptions({
                message: "Specify your notification time...",
                duration: "short",
                position: "bottom",
                addPixelsY: -20 // added a negative value to move it up a bit (default 0)
            });
        } else {
            var temp = moment(notifTime);
            if (moment().isAfter(temp, 'minute')) {
                window.plugins.toast.showWithOptions({
                    message: "Seems time has elapsed, change your time...",
                    duration: "short",
                    position: "bottom",
                    addPixelsY: -20 // added a negative value to move it up a bit (default 0)
                });
            } else {
                temp = temp.format('LLL');
                notifTime = new Date(notifTime);
                if (notifMsg == '') {
                    notifMsg = 'Time for Notification';
                }
                NativeStorage.getItem('notifArray', function (val) {
                    var notifId = val.length + 1;
                    cordova.plugins.notification.local.schedule({
                        id: notifId,
                        title: 'Locate&Notify',
                        text: notifMsg,
                        at: notifTime
                    });
                    val.push({
                        id: notifId,
                        title: 'Locate&Notify',
                        text: notifMsg,
                        at: notifTime
                    });
                    NativeStorage.setItem('notifArray', val, function (set_val) {}, function (set_err) {
                        return;
                    });
                }, function (err) {
                    var notifArray = [];
                    notifArray.push({
                        id: 1,
                        title: 'Locate&Notify',
                        text: notifMsg,
                        at: notifTime
                    });
                    cordova.plugins.notification.local.schedule({
                        id: 1,
                        title: 'Locate&Notify',
                        text: notifMsg,
                        at: notifTime
                    });
                    NativeStorage.setItem('notifArray', notifArray, function (set_val) {

                    }, function (set_err) {
                        return;
                    });
                });
                window.plugins.toast.showWithOptions({
                    message: "Notification Scheduled for " + temp,
                    duration: "long",
                    position: "bottom",
                    addPixelsY: -20 // added a negative value to move it up a bit (default 0)
                });
            }
        }
    }

    locationAuthorization();

    $(document).on('click', '#settings-btn', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        openSettings();
    });

    $(document).on('click', '#notif-time', function (e) {
        e.preventDefault();
        var $temp = $(this);
        var notifTime = '';
        var options = {
            date: new Date(),
            mode: 'time'
        };
        datePicker.show(options, function (date) {
            if (date != "Cancelled") {
                date = new Date(date);
                date = moment(date);
                if (moment().isSameOrBefore(date, 'minute')) {
                    notifTime = date.format('LLL');
                } else {
                    notifTime = date.format('LT');
                    var temp1 = moment.utc().add(1, 'days').format('DD-MM-YYYY');
                    temp1 = moment.utc(temp1, 'DD-MM-YYYY');
                    temp1 = temp1.format('LLL');
                    temp1 = temp1.split('12:00 AM');
                    notifTime = temp1[0] + ' ' + notifTime;
                }
                $temp.val(notifTime).trigger('change');
            }
        }, function (error) {
            return;
        });
    });

    $(document).on('click', '#notif-btn', function (e) {
        e.preventDefault();
        if (MobileOS == "Android") {
            scheduleNotification();
        } else if (MobileOS == "iOS") {
            cordova.plugins.notification.local.hasPermission(function (gr) {
                if (gr) {
                    scheduleNotification();
                } else {
                    NativeStorage.getItem('iOSPrompt', function (get_val) {
                        var content = '<div class="white-popup"><div class="row pop-main-row shadow-z-1"><span class="pop-main-text"><i class="vertalign"></i><b> Notification Denied</b></span></div><p class="pop-body">Seems your Notification is off. Please turn it on via settings.</p><button class="btn btn-primary btn-md" id=settings-btn>Settings</button></div>';
                        $.magnificPopup.open({
                            items: {
                                src: content, // can be a HTML string, jQuery object, or CSS selector
                                type: 'inline'
                            },
                            removalDelay: 0,
                            closeOnBgClick: true,
                            closeBtnInside: true,
                            showCloseBtn: true,
                            enableEscapeKey: true
                        });
                    }, function (get_err) {
                        cordova.plugins.notification.local.registerPermission(function (granted) {
                            if (granted) {
                                scheduleNotification();
                            } else {

                            }
                        });
                        NativeStorage.setItem('iOSPrompt', 1, function (set_val) {

                        }, function (set_err) {
                            return;
                        });
                    });
                }
            });
        }
    });
}