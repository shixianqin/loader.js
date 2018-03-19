

function Loader(opt) {
    this.isGlobal = true;
    var option = {
        radius: 40,
        color: "#0980EC",
        borderWidth: 2
    };
    if (typeof opt == "number") {
        option.radius = opt;
    } else if (typeof opt == "object") {
        for (var i in opt) {
            option[i] = opt[i];
        }
    }
    this.createLoader(option);
}

Loader.prototype = {
    constructor: Loader,
    createLoader: function (opt) {
        this.loader = document.createElement("div");
        this.loader.setAttribute("class", "__loader__");
        var size = opt.radius * 2;
        this.loader.innerHTML = "<svg style='width: " + size + "px; height: " + size + "px;' viewBox='25 25 50 50'><circle cx='50' cy='50' r='20' fill='none' stroke='" + opt.color + "' stroke-width='" + opt.borderWidth + "' stroke-miterlimit='10'></circle></svg>";
        document.body.appendChild(this.loader);
    },
    follow: function (element) {
        var position = this.getOffset(element);
        this.loader.style.position = "absolute";
        this.isGlobal = false;
        for (var i in position) {
            this.loader.style[i] = position[i] + "px";
        }
        return this;
    },
    hide: function () {
        if (this.isGlobal) {
            document.body.style.overflow = "";
        }
        this.loader.style.display = "none";
        return this;
    },
    show: function () {
        if (this.isGlobal) {
            document.body.style.overflow = "hidden";
        }
        this.loader.style.display = "block";
        return this;
    },
    getOffset: function (el) {
        var parent = el.offsetParent;
        var top = el.offsetTop;
        var left = el.offsetLeft;
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
        }
    }
};


(function () {

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

    addStyle(".__loader__{display:none;position:fixed;left:0;top:0;width:100%;height:100%;z-index:1111;stroke:#0980ec}.__loader__:before{content:'';display:block;padding-top:100%}.__loader__ svg{animation:rotate 2s linear infinite;height:80px;transform-origin:center center;width:80px;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;stroke:inherit}.__loader__ circle{stroke-dasharray:1,200;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;stroke-linecap:round}@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}");
})();
