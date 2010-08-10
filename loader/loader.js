var JSLoader = JSLoader || (function () {

    var d = document,
        // reference to <head>
        head,
        
        // Processes queue - procs are executed sequentially (FIFO)
        queue = [],

        // current state of the loader
        STATUS = { PENDING: 2, READY: 4 },

        state = STATUS.READY,

        // detected User Agent (see _detectUA())
        ua = null; 

    function load(urls, callback, args, scope) {
        detectUA();
        
        registerUrls(urls);
        registerCallback(callback, args ? args : [], scope);

        dispatch();
    }

    function registerCallback(callback, params, scope) {
        if (callback) {
            queue.push(function () {
                return function () { execute(callback, params, scope)};
            }());
        }
    }

    function registerUrls(urls) {
        var i, mx;

        if (urls) {
            urls = urls.constructor === Array ? urls : [urls];
            for (i = 0, mx = urls.length; i < mx; i++) {
                queue.push(function () {
                    var url = urls[i];
                    return function () { loadScript(url); };
                }());
            }
        }
    }

    function dispatch(forceReadyState) {
        var process;
        state = forceReadyState ? STATUS.READY : state;
        if (state === STATUS.PENDING) { // previous request is processed
            return;
        }
        if (process = queue.shift()) {
            process();
        } else {
            state = STATUS.READY;
        }
    }

    function loadScript(url) {
        var i, mx, script;

        state = STATUS.PENDING;
        head = head || d.getElementsByTagName('head')[0];

        script = d.createElement('script');
        script.type = "text/javascript";
        script.src = url;

        if (ua.ie > 0) {
            script.onreadystatechange = function () {
                var rs = script.readyState;
                if (rs == "loaded" || rs == "complete") {
                    script.onreadystatechange = null;
                    dispatch(true); // activate dispatcher (clears state)
                }
            };
        } else {
            script.onload = function () {
                dispatch(true); // activate dispatcher (clears state)
            };
        }

        // actually inject script into <head>
        head.appendChild(script);
    }


    /**
     * Trigger the callback. Chose the method depending on arguments
     *
     * @param Function      callback    Callback function, triggered after all scripts are loaded
     * @param Array|Object  args        Argument(s) to be passed to callback
     * @param Object|null   scope       Callback will be triggered in context of given scope
     */
    function execute(callback, args, scope) {
        if (callback) {
            args = args.constructor === Array ? args : [args];
            callback.apply(scope || window, args);
        } 

        dispatch(true); // resume dispatching
    }

    /**
     * Obtains browser engine (user agent). Based on YUI agent detection routine.
     * Due to different routines being triggered by various browsers after script
     * nodes have been injected into document, code has to be forked to accomodate 
     * all.
     *
     * @link http://yui.yahooapis.com/combo?3.0.0/build/yui/yui.js
     */
    function detectUA(userAgent, forceReload) {
        // no need to obtain user agent yet again
        if (forceReload !== true && ua !== null) {
            return ua;
        }

        var 
            toNum = parseFloat,
            nav = navigator,
            o = {
                ie: 0,
                opera: 0,
                gecko: 0,
                webkit: 0,
                mobile: null,
                air: 0,
                caja: nav.cajaVersion,
                ssl: false
            },
            nua = userAgent ? userAgent : (nav && nav.userAgent),
            loc = window.location,
            href = loc && loc.href;

        // see whether we are behind ssl
        o.ssl = href && (href.toLowerCase().indexOf("https") === 0);

        if (nua) {
            // KHTML browsers should qualify as Safari X-Grade
            if ((/KHTML/).test(nua)) {
                o.webkit=1;
            }

            // Modern WebKit browsers are at least X-Grade
            m = nua.match(/AppleWebKit\/([^\s]*)/);
            if (m && m[1]) {
                o.webkit = toNum(m[1]);

                // Mobile browser check
                if (/ Mobile\//.test(nua)) {
                    o.mobile = "Apple"; // iPhone, iPad or iPod Touch
                } else {
                    m = nua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                    if (m) {
                        o.mobile = m[0]; // Nokia N-series, Android, webOS, ex: NokiaN95
                    }
                }

                m = nua.match(/AdobeAIR\/([^\s]*)/);
                if (m) {
                    o.air = m[0]; // Adobe AIR 1.0 or better
                }
            }

            if (!o.webkit) { // not webkit
                // @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
                m = nua.match(/Opera[\s\/]([^\s]*)/);
                if (m && m[1]) {
                    o.opera =toNum(m[1]);
                    m = nua.match(/Opera Mini[^;]*/);
                    if (m) {
                        o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                    }
                } else { // not opera or webkit
                    m = nua.match(/MSIE\s([^;]*)/);
                    if (m && m[1]) {
                        o.ie = toNum(m[1]);
                    } else { // not opera, webkit, or ie
                        m = nua.match(/Gecko\/([^\s]*)/);
                        if (m) {
                            o.gecko = 1; // Gecko detected, look for revision
                            m= nua.match(/rv:([^\s\)]*)/);
                            if (m && m[1]) {
                                o.gecko = toNum(m[1]);
                            }
                        }
                    }
                }
            }
        }

        // assign global User Agent object
        ua = o;

        return ua;
    }

    return {
        /**
         * Load script(s) unobtrusive/non-blocking manner.
         *
         * @param String|Array  uris        URI or array of URIs to be loaded
         * @param Function      callback    Callback function, triggered after all scripts are loaded
         * @param Array|Object  args        Argument(s) to be passed to callback
         * @param Object|null   scope       Callback will be triggered in context of given scope
         */
        load: load,

        /**
         * Obtain user agent browser
         */
        getUA: detectUA
    };
}) ();

