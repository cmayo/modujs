/* modujs 0.0.2 - 2015-01-23 */
(function (window) {
    "use strict";

    var modules = {};
    var modujs = {};
    var instances = {};

    function getCleanName(name) {
        return name.split('/').join('_');
    }

    function getDeps(deps) {
        var depsObjs = [];

        for (var i = 0; i < deps.length; i++) {
            var depObj = resolve(deps[i]);
            depsObjs.push(depObj);
        }

        return depsObjs;
    }

    function execute(callback, deps, name) {
        if (name && typeof instances[name] != 'undefined') {
            return instances[name];
        }
        deps = [].concat(deps);
        var args = getDeps(deps);
        var instance = callback.apply(undefined, args);

        if (name) {
            instances[name]=instance;
        }

        return instance;
    }

    function resolve(name) {
        var cname = getCleanName(name);
        var module = modules[cname];

        if (!module) {
            throw 'Module ' + name + ' is not defined';
        }

        return execute(module.cb, module.deps, module.name);
    }

    modujs.define = function (name, deps, callback) {

        if (typeof callback == 'undefined') {
            callback = deps;
            deps = [];
        }

        var cname = getCleanName(name);

        modules[cname] = {
            name: cname,
            deps: deps,
            cb: callback
        }

    }

    modujs.require = function (deps, callback) {
        if (callback && Object.prototype.toString.call(callback) == '[object Function]') {
            return execute(callback, deps);
        } else {
            return resolve(deps);
        }
    }

    window.modujs = modujs;

})(this);