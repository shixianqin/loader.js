(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Loader = factory());
}(this, (function () {

    //添加样式
    function addStyle(css) {
        var style = document.createElement("style");
        var head = document.getElementsByTagName('head')[0];
        head.insertBefore(style, head.firstChild);
        style.setAttribute("type", "text/css");
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.innerHTML = css;
        }
    }

    //获取绑定元素的尺寸
    function getOffset(el) {
        var parent = el.offsetParent,
            top = el.offsetTop,
            left = el.offsetLeft;
        while (parent) {
            top += parent.offsetTop;
            left += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        return {
            left: left,
            top: top,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
    }

    //创建一个加载器
    function createLoader(opt) {
        var loader = document.createElement("div");
        loader.className = "__loader__";
        loader.innerHTML = '<svg style="width:' + opt.size + 'px;height:' + opt.size + 'px;" viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke="' + opt.color + '" stroke-width="' + opt.borderWidth + '" stroke-miterlimit="10"></circle></svg>';
        document.body.appendChild(loader);
        return loader;
    }

    function Loader(opt) {
        var option = {size: 80, color: '#0088ff', borderWidth: 2};
        if (typeof opt == "number") {
            option.radius = opt;
        } else if (typeof opt == "object") {
            for (var i in opt) {
                option[i] = opt[i];
            }
        }
        this.isGlobal = true;
        this.loaderElement = createLoader(option);
    }

    //显示状态切换
    function toggle(obj, show) {
        if (obj.isGlobal) {
            document.body.style.overflow = show ? "hidden" : "";
        }
        obj.loaderElement.className = "__loader__" + (show ? " show" : "");
    }

    Loader.prototype = {
        //绑定某个元素
        follow: function (el) {
            var position = getOffset(el), cssText = "position:absolute;";
            for (var i in position) {
                cssText += i + ":" + position[i] + "px;";
            }
            this.isGlobal = false;
            this.loaderElement.style.cssText = cssText;
            return this;
        },
        //显示
        show: function () {
            toggle(this, true);
            return this;
        },
        //隐藏
        hide: function () {
            toggle(this);
            return this;
        }
    };

    addStyle(".__loader__{display:none;position:fixed;left:0;top:0;width:100%;height:100%;z-index:1111;stroke:#08f}.__loader__:before{content:'';display:block;padding-top:100%}.__loader__ svg{height:80px;transform-origin:center center;width:80px;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;stroke:inherit}.__loader__ circle{stroke-dasharray:1,200;stroke-dashoffset:0;stroke-linecap:round}.__loader__.show{display:block}.__loader__.show svg{animation:loader__rotate 2s linear infinite}.__loader__.show circle{animation:loader__dash 1.5s ease-in-out infinite}@keyframes loader__rotate{100%{transform:rotate(360deg)}}@keyframes loader__dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}");

    return Loader;
})));
