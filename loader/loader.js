var JSLoader = JSLoader || (function () {
    // cached reference to document
    var d = document; 

    function _load(uris, callback, args, scope) {

        if (args.constructor === Array) {
            callback.apply(scope || null, args);
        } else {
            callback.call(scope || null, args);
        }
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
        load: function (uris, callback, args, scope) {
            _load(uris, callback, args, scope);
        }
    };
}) ();

