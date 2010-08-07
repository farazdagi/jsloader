$(document).ready(function () {
    var log = function (msg) {
        if(window.console && window.console.log) {
            window.console.log(msg);
        }
    };

    var callback1 = function(arg1, arg2) {
        equals(arg1, 1, "Test first argument");
        equals(arg2, 2, "Test second argument");
        equals(this.the_ultimate_answer, 42, "Container object is accessible via this");
    },

    passMe = {x: 1, y: 2},

    callback2 = function(theOnlyArg) {
        same(theOnlyArg, passMe, "The only passed argument test for identity");
        equals(theOnlyArg.x, 1, "Test object parameters");
    },

    // object used as scope (to be passed into Function.call|apply)
    scope = {
        the_ultimate_answer: 42
    };

    module("Get Loader");

    test("Test getUserAgent", 11, function () {
        var ua;

        // Firefox
        ua = JSLoader.getUA("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.19) Gecko/20081202 Firefox (Debian-2.0.0.19-0etch1)", true);
        equals(ua.gecko, 1.8, "Firefox 2.0 on Debian");

        ua = JSLoader.getUA("Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)", true);
        equals(ua.gecko, 1.9, "Firefox 3.0 on Windows", true);

        ua = JSLoader.getUA("Mozilla/5.0 (X11; U; Linux i686; pl-PL; rv:1.9.0.2) Gecko/2008092313 Ubuntu/9.25 (jaunty) Firefox/3.8", true);
        equals(ua.gecko, 1.9, "Firefox 3.8 on Ubuntu Jaunty");

        ua = JSLoader.getUA("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2a1pre) Gecko/20090428 Firefox/3.6a1pre", true);
        equals(ua.gecko, 1.9, "Firefox 3.6a1pre on Linux");

        ua = JSLoader.getUA("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2) Gecko/20100128 Gentoo Firefox/3.6", true);
        equals(ua.gecko, 1.9, "Firefox 3.6 on Gentoo");

        ua = JSLoader.getUA("Mozilla/5.0 (Windows; U; Windows NT 6.1; hu; rv:1.9.1.9) Gecko/20100315 Firefox/3.5.9 (.NET CLR 3.5.30729)", true);
        equals(ua.gecko, 1.9, "Firefox 3.5.9 on Windows NT");

        ua = JSLoader.getUA("Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.1) Gecko/20090718 Firefox/3.5.1", true);
        equals(ua.gecko, 1.9, "Firefox 3.5.1 on Windows NT");

        ua = JSLoader.getUA("Mozilla/5.0 (X11; U; FreeBSD i386; en-US; rv:1.9.1) Gecko/20090703 Firefox/3.5", true);
        equals(ua.gecko, 1.9, "Firefox 3.5 on FreeBSD");

        ua = JSLoader.getUA("Mozilla/5.0 (X11; U; Linux x86_64; de; rv:1.9.0.3) Gecko/2008090713 Firefox/3.0.3", true);
        equals(ua.gecko, 1.9, "Firefox 3.0.3 on Linux");

        ua = JSLoader.getUA("Mozilla/5.0 (Windows; U; Windows NT 6.0; de; rv:1.9.0.15) Gecko/2009101601 Firefox 2.1 (.NET CLR 3.5.30729)", true);
        equals(ua.gecko, 1.9, "Firefox 2.1 on  Windows NT");

        ua = JSLoader.getUA("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.7.10) Gecko/20050920 Firefox/1.0.6", true);
        equals(ua.gecko, 1.7, "Firefox 1.0.6 on Linux");

        // IE
        ua = JSLoader.getUA("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)", true);
        equals(ua.ie, 9, "IE 9.0");

        ua = JSLoader.getUA("Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 1.1.4322)", true);
        equals(ua.ie, 8, "IE 8.0");

        ua = JSLoader.getUA("Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; c .NET CLR 3.0.04506; .NET CLR 3.5.30707; InfoPath.1; el-GR)", true);
        equals(ua.ie, 7, "IE 7.0");

        ua = JSLoader.getUA("Mozilla/4.0 (compatible; MSIE 6.0b; Windows NT 4.0)", true);
        equals(ua.ie, 6, "IE 6.0b");

        ua = JSLoader.getUA("Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.1)", true);
        equals(ua.ie, 5.5, "IE 5.5");

        ua = JSLoader.getUA("Mozilla/4.0 (compatible; MSIE 5.0; Windows NT 5.2; .NET CLR 1.1.4322)", true);
        equals(ua.ie, 5, "IE 5.0");

        // Chrome
        // Safari
        ua = JSLoader.getUA("Mozilla/5.0 (Windows; U; Windows NT 6.1; ja-JP) AppleWebKit/5", true);
        equals(ua.webkit, 9, "Safari 5.0 on wins");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        ua = JSLoader.getUA("", true);
        equals(ua.webkit, 9, "");

        // Opera


    });

    test("JSLoader.load() - full argument list", 3, function () {
        // full arguments test
        JSLoader.load('http://test.qubr.ru/jsloader/tests/js.php?id=1', callback1, [1, 2], scope);
    });

    test("JSLoader.loader.load() - pass array of URIs", 3, function () {

        var uris = [
            'http://test.qubr.ru/jsloader/tests/js.php?id=1',
            'http://test.qubr.ru/jsloader/tests/js.php?id=2',
            'http://test.qubr.ru/jsloader/tests/js.php?id=3'
        ];
        
        // full arguments test
        JSLoader.load(uris, callback1, [1, 2], scope);
    });

    test("JSLoader.load() - single object passed", 2, function () {
        JSLoader.load(
            'http://test.qubr.ru/jsloader/tests/js.php?id=1',
            callback2, passMe
        );
    });

    // test global scope
    // test current scope
    //


});
