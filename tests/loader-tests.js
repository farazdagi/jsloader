$(document).ready(function () {
    var log = function (msg) {
        if(window.console && window.console.log) {
            window.console.log(msg);
        }
    };

    var callback1 = function(arg1, arg2) {
        ok(arg1 === 1, "Argument 1 is passed ok");
        ok(arg2 === 2, "Argument 2 is passed ok");
        ok(this.the_ultimate_answer === 42, "Container object is accessible via this");
    },

    passMe = {x: 1, y: 2},

    callback2 = function(theonlyarg) {
        alert('x');
        ok(theonlyarg === passMe, theonlyarg + " = " + passMe);
    },

    // object used as scope (to be passed into Function.call|apply)
    scope = {
        the_ultimate_answer: 42
    };

    module("Get Loader");

    test("JSLoader.loader.load() - argument passing", function () {
        expect(3);
        
        // full arguments test
        JSLoader.load('http://test.qubr.ru/jsloader/tests/js.php?id=1', callback1, [1, 2], scope);
    });

    test("JSLoader.loader.load() - pass array of URIs", function () {
        expect(3);

        var uris = [
            'http://test.qubr.ru/jsloader/tests/js.php?id=1',
            'http://test.qubr.ru/jsloader/tests/js.php?id=2',
            'http://test.qubr.ru/jsloader/tests/js.php?id=3'
        ];
        
        // full arguments test
        JSLoader.load(uris, callback1, [1, 2], scope);
    });

    test("JSLoader.load() - single object passed", function () {
            alert('x');
        expect(1);
        JSLoader.load(
            'http://test.qubr.ru/jsloader/tests/js.php?id=1',
            callback2, passMe
        );
    });

    // test global scope
    // test current scope
    //


});
