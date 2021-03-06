$(document).ready(function () {
    var log = function (msg) {
        if(window.console && window.console.log) {
            window.console.log(msg);
        }
    };

    var callback1 = function(arg1, arg2) {
            start();
            callback11.apply(this, [arg1, arg2]);
        },
        callback11 = function(arg1, arg2) {
            equals(arg1, 1, "Test first argument");
            equals(arg2, 2, "Test second argument");
            equals(this.the_ultimate_answer, 42, "Container object is accessible via this");
        },

        passMe = {x: 1, y: 2},

        callback2 = function(theOnlyArg) {
            start();
            callback21.apply(this, [theOnlyArg]);
        },
        callback21 = function(theOnlyArg) {
            same(theOnlyArg, passMe, "The only passed argument test for identity");
            equals(theOnlyArg.x, 1, "Test object parameters");
        },

        callback3 = function () {
            start();
            callback31.apply(this, []);
        },
        callback31 = function () {
            equals(1, 1, "Callback called");
        },

        // object used as scope (to be passed into Function.call|apply)
        scope = {
            the_ultimate_answer: 42
        };

    module("Get Loader");

    test("Test getUserAgent", 35, function () {
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

        // Safari
        ua = JSLoader.getUA("Mozilla/5.0 (Windows; U; Windows NT 6.1; ja-JP) AppleWebKit/5", true);
        equals(ua.webkit, 5, "Safari 5.0 on wins");

        ua = JSLoader.getUA("Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; de-de) AppleWebKit/533.16 (KHTML, like Gecko) Version/4.1 Safari/533.16", true);
        equals(ua.webkit, 533.16, "Safari 4.1 Mac");

        ua = JSLoader.getUA("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us) AppleWebKit/533.4+ (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7", true);
        equals(ua.webkit, 533.4, "Safari 4.0.5 on Mac");

        ua = JSLoader.getUA("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/528.16 (KHTML, like Gecko) Version/4.0 Safari/528.16", true);
        equals(ua.webkit, 528.16, "Safari 4.0 on Windows");

        ua = JSLoader.getUA("Mozilla/5.0 (Windows; U; Windows NT 5.2; de-DE) AppleWebKit/528+ (KHTML, like Gecko) Version/3.2.1 Safari/525.27.1", true);
        equals(ua.webkit, 528, "Safari 3.2.1 on Windows");

        ua = JSLoader.getUA("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; en-us) AppleWebKit/525.9 (KHTML, like Gecko) Version/3.1 Safari/525.9", true);
        equals(ua.webkit, 525.9, "Safari 3.1 on Mac");

        ua = JSLoader.getUA("Mozilla/5.0 (Linux; U; Ubuntu; en-us) AppleWebKit/525.13 (KHTML, like Gecko) Version/2.2 Firefox/525.13", true);
        equals(ua.webkit, 525.13, "Safari 2.2 on Linux");

        ua = JSLoader.getUA("Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.8 (KHTML, like Gecko) Safari/312.5", true);
        equals(ua.webkit, 312.8, "Safari 1.3.2 on Mac");

        // Opera
        ua = JSLoader.getUA("Opera/9.99 (Windows NT 5.1; U; pl) Presto/9.9.9", true);
        equals(ua.opera, 9.99, "Opera 9.99 on Windows");

        ua = JSLoader.getUA("Opera/9.70 (Linux i686 ; U; ; en) Presto/2.2.1", true);
        equals(ua.opera, 9.7, "Opera 9.70 on Linux");

        ua = JSLoader.getUA("Opera/9.26 (Windows NT 5.1; U; MEGAUPLOAD 2.0; en)", true);
        equals(ua.opera, 9.26, "Opera 9.26 on Wins");

        ua = JSLoader.getUA("Opera/8.51 (Macintosh; PPC Mac OS X; U; de)", true);
        equals(ua.opera, 8.51, "Opera 8.51 on Mac");

        ua = JSLoader.getUA("Opera/7.22 (Windows NT 5.1; U) [de]", true);
        equals(ua.opera, 7.22, "Opera 7.22 on Wins");

        ua = JSLoader.getUA("Mozilla/4.0 (compatible; MSIE 5.0; Windows XP) Opera 6.06 [fr]", true);
        equals(ua.opera, 6.06, "Opera 6.06 on Wins");

        ua = JSLoader.getUA("Mozilla/5.0 (Windows 2000; U) Opera 6.03 [en]", true);
        equals(ua.opera, 6.03, "Opera 6.03 on Wins");

        ua = JSLoader.getUA("Mozilla/5.0 (Windows 98; U) Opera 5.12 [de]", true);
        equals(ua.opera, 5.12, "Opera 5.12 on Wins");

        ua = JSLoader.getUA("Mozilla/5.0 (SunOS 5.8 sun4u; U) Opera 5.0 [en]", true);
        equals(ua.opera, 5, "Opera 5.0 on SunOS");

        ua = JSLoader.getUA("Opera/9.80 (X11; Linux x86_64; U; it) Presto/2.2.15 Version/10.10", true);
        equals(ua.opera, 9.8, "Opera 9.80 on Linux");

    });

    test("JSLoader.load() - full argument list", 3, function () {
        log("|-Full Argument List");
        stop(); // will resume in callback
        // full arguments test
        JSLoader.load('http://test.qubr.ru/jsloader/tests/js.php?id=Full Argument List', callback1, [1, 2], scope);
    });

    test("JSLoader.load() - empty script list", 1, function () {
        log("|-Empty Script List");
        stop(); // will resume in callback
        // full arguments test
        JSLoader.load([], callback3);
    });

    test("JSLoader.load() - test concurrent requests", 9, function () {
        log("|-Concurrent requests");
        stop(); // will resume in callback

        // we are piling the requests until previous are finished (there's artifical 0-5 secs delay
        // on script load on qubr). This test whether JSLoader is capable of managing the queue

        log("|--Single URL");
        JSLoader.load('http://test.qubr.ru/jsloader/tests/js.php?id=Full Argument List', callback11, [1, 2], scope);

        log("|--Empty list");
        JSLoader.load([], callback31);


        log("|--Multiple (3) URLs");
        var uris = [
            'http://test.qubr.ru/jsloader/tests/js.php?id=Mult 1',
            'http://test.qubr.ru/jsloader/tests/js.php?id=Mult 2',
            'http://test.qubr.ru/jsloader/tests/js.php?id=Mult 3'
        ];
        JSLoader.load(uris, callback11, [1, 2], scope);

        log("|--Pass the the single object");
        JSLoader.load(
            'http://test.qubr.ru/jsloader/tests/js.php?id=Argument as object',
            callback2, passMe
        );
    });



    test("JSLoader.loader.load() - pass array of URIs", 3, function () {
        log("|-Pass array of URIs");
        stop(); // will resume in callback
        
        var uris = [
            'http://test.qubr.ru/jsloader/tests/js.php?id=1',
            'http://test.qubr.ru/jsloader/tests/js.php?id=2',
            'http://test.qubr.ru/jsloader/tests/js.php?id=3'
        ];
        
        // full arguments test
        JSLoader.load(uris, callback1, [1, 2], scope);
    });

    test("JSLoader.load() - single object passed", 2, function () {
        log("|-Single Object Passed");
        stop(); // will resume in callback
        JSLoader.load(
            'http://test.qubr.ru/jsloader/tests/js.php?id=1',
            callback2, passMe
        );
    });

    // test global scope
    // test current scope
    //


});
