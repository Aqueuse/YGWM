first_run = true;

mainTitlePrefix = "yasep.org: ";
mainTitle = "";

i = "requestAnimationFrame";

function dcE(a) {
    return document.createElement(a);
}

function getById(id, tag, base) {
    base = base || document;
    tag = tag || "*";
    var i, t = base.getElementsByTagName(tag);
    for (i = 0; i < t.length; i++) {
        if (t[i].id && (t[i].id == id)) return t[i];
    }
    return null;
}

function getByClass(className, tag, base) {
    base = base ||document;
    tag = tag || "*";
    var i, t = base.getElementsByTagName(tag);
    for (i = 0; i < t.length; i++) {
        if (t[i].className && (t[i].className == className)) return t[i];
    }
    return null;
}

function toggle(a) {
    a = a.style;
    return a.display = (a.display == "none") ? "block" : "none";
}

function mousePos(e) {
    e = e || window.event;
    var t =document.body ||document.documentElement;
    return {
        x: e.pageX || e.clientX + t.scrollLeft,
        y: e.pageY || e.clientY + t.scrollTop
    };
}

function getHeight() {
    return window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
}

function getWidth() {
    return window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
}

function emptyFunc(a) {
    return a;
};


redraw = window[i] || window["moz" + i] || window["webkit" + i] || window["ms" + i] || function (f) {
    setTimeout(f, 0);
};

function delay(o) {
    if (o.timer) {
        clearTimeout(o.timer);
        o.timer = null;
    }
    if (o.max) {
        if (o.counter) {
            o.timer = setTimeout(function () {
                o.counter = o.max;
                o.timer = null;
                o.func();
            }, o.delay);
            o.counter--;
        } else {
            o.func();
            o.counter = o.max;
        }
    } else {
        o.timer = setTimeout(function () {
            o.timer = null;
            o.func();
        }, o.delay);
    }
}

function parentWin(w) {
    while (w) {
        if (w.contents_id) break;
        w = w.parentNode
    }
    return w;
}

function intrnd(x) {
    return Math.floor(F.random() * x);
}

function pad_right(s, n) {
    n -= (s + "").length;
    while (n-- > 0) s += " ";
    return s;
}

function pad_left(s, n) {
    n -= (s + "").length;
    while (n-- > 0) s = " " + s;
    return s;
}

function Clone() {}

function clone(obj) {
    Clone.prototype = obj;
    return new Clone();
}

function dontMess(id) {
    id.autocorrect = id.autocomplete = id.autocapitalize = id.spellcheck = false;
};


function changeMainWinTitle(m) {
    document.title = mainTitlePrefix + (mainTitle = m);
};

ygwm = {
    enableAutoscroll: true,
    autoScrollThreshold: 50,
    max_coord: 32300,
    min_coord_x: 0,
    min_coord_y: 0,
    noScrollIndex: 100,
    slowDisplay: false,
    lastTimeStamp: 0,
    latencyTimeOut: null,
    action_function: null,
    maxDisplayLatency: 70,
    redrawDelay: 300,
    top_window: null,
    last_focus: null,
    moved_div: null,
    mouse_xoffset: 0,
    mouse_xoffset2: 0,
    mouse_yoffset: 0,
    min_height: 60,
    min_width: 60,
    max_height: 2E4,
    max_width: 8E3,
    move: function (id, x, y, w) {
        if (id.reframe) {
            w = getWidth();
            if (x + id.w > w) x = w - id.w;
        }
        if (x < ygwm.min_coord_x) x = ygwm.min_coord_x;
        if (y < ygwm.min_coord_y) y = ygwm.min_coord_y;
        id.style.left = x + "px";
        id.style.top = y + "px";
        id.style.position = "absolute";
        id.x = x;
        id.y = y;
    },
    erase_window: function (e, where) {
        if (where = parentWin(where || this)) {
            ygwm.last_focus = null;
            if (where.winlist_item_id) winlist.removeItem(where);
            if (where.eraseCallback) where.eraseCallback(where);
            where.parentNode.removeChild(where);
            for (var i in where) delete where[i];
        }
        return false;
    },
    empty_callback: function () {
        ygwm.latencyTimeOut = null;
    },
    redraw_callback: function () {
        ygwm.slowDisplay = false;
        var i = ygwm.moved_div;
        i.contents_id.firstChild.style.display = "block";
        i.contents_id.scrollLeft = i.lastScrollLeft;
        i.contents_id.scrollTop = i.lastScrollTop;
        ygwm.latencyTimeOut = setTimeout(ygwm.empty_callback, 0);
    },
    autoScroll: function (e) {
        e = e ||window.event;
        var w, h, scrollX = 0,
            scrollY = 0,
            p = mousePos(e),
            over = e.target || e.srcElement;
        if (over && over.style && (over.style.zIndex >= ygwm.noScrollIndex)) return;
        w = e.clientX - ygwm.autoScrollThreshold;
        if (w < 0) scrollX = w;
        else {
            w = (e.clientX + ygwm.autoScrollThreshold) - getWidth();
            if ((w > 0) && (p.x + w < ygwm.max_coord)) scrollX = w
        }
        h = e.clientY - ygwm.autoScrollThreshold;
        if (h < 0) scrollY = h;
        else {
            h = (e.clientY + ygwm.autoScrollThreshold) - getHeight();
            if ((h > 0) && (p.y + h < ygwm.max_coord)) scrollY = h
        }
       window.scrollBy(scrollX, scrollY);
    },
    mouse_move_callback: function (e) {
        var p, d = new Date().getTime();
        if ((!ygwm.slowDisplay) && (ygwm.latencyTimeOut) && (ygwm.lastTimeStamp > 0)) {
            if (d < ygwm.lastTimeStamp) return false;
            ygwm.moved_div.lastScrollLeft = ygwm.moved_div.contents_id.scrollLeft;
            ygwm.moved_div.lastScrollTop = ygwm.moved_div.contents_id.scrollTop;
            ygwm.moved_div.contents_id.firstChild.style.display = "none";
            ygwm.slowDisplay = true;
        }
        clearTimeout(ygwm.latencyTimeOut);
        ygwm.latencyTimeOut = null;
        ygwm.lastTimeStamp = d + ygwm.maxDisplayLatency;
        p = mousePos(e);
        ygwm.action_function(p.x, p.y);
        ygwm.autoScroll(e);
        if (ygwm.slowDisplay) ygwm.latencyTimeOut = setTimeout(ygwm.redraw_callback, ygwm.redrawDelay);
        else ygwm.latencyTimeOut = setTimeout(ygwm.empty_callback, 0);
        return false;
    },
    mouse_cornerSE: function (x, y) {
        ygwm.changeDimensions(x - ygwm.mouse_xoffset, y - ygwm.mouse_yoffset, ygwm.moved_div);
    },
    mouse_cornerSW: function (x, y) {
        var w, h = y - ygwm.mouse_yoffset,
            l = x - ygwm.mouse_xoffset;
        if (l < 3) {
            l = 3;
            x = ygwm.mouse_xoffset + 3;
        }
        w = -(x - ygwm.mouse_xoffset2);
        if (w < ygwm.min_width) {
            w = ygwm.min_width;
            l = ygwm.mouse_xoffset2 - (ygwm.min_width + ygwm.mouse_xoffset);
        }
        if (l > ygwm.max_coord) return;
        ygwm.move(ygwm.moved_div, l, ygwm.moved_div.y);
        ygwm.changeDimensions(w, h, ygwm.moved_div);
    },
    mouse_drag: function (x, y) {
        x -= ygwm.mouse_xoffset;
        y -= ygwm.mouse_yoffset;
        if ((x > ygwm.max_coord) || (y > ygwm.max_coord)) return;
        ygwm.move(ygwm.moved_div, x, y);
    },
    mouse_drop: function () {
        var y = ygwm.moved_div,
            c = y.erase_callback;
        if ((ygwm.action_function == ygwm.mouse_drag) && c && c()) ygwm.erase_window(null, y);
        ygwm.moved_div.contents_id.firstChild.style.display = "";
        clearTimeout(ygwm.latencyTimeOut);
        if (typeof y.ondrop == "function") y.ondrop(y);
        ygwm.latencyTimeOut = ygwm.moved_div = document.onmousemove = document.onmouseup = ygwm.action_function = null;
        return false;
    },
    hook: function (e, where, callback) {
        if (document.onmouseup) document.onmouseup(e);
        document.onmouseup = ygwm.mouse_drop;
        document.onmousemove = ygwm.mouse_move_callback;
        ygwm.moved_div = where;
        ygwm.action_function = callback;
        ygwm.slowDisplay = false;
        return false;
    },
    hook_move: function (e) {
        var p = mousePos(e);
        var w = parentWin(this);
        ygwm.mouse_xoffset = p.x - w.offsetLeft;
        ygwm.mouse_yoffset = p.y - w.offsetTop;
        if (window.menu) ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;
        return ygwm.hook(e, w, ygwm.mouse_drag);
    },
    hook_resizeSE: function (e) {
        var p = mousePos(e),
            w = parentWin(this);
        ygwm.mouse_xoffset = p.x - w.contents_id.offsetWidth;
        ygwm.mouse_yoffset = p.y - w.contents_id.offsetHeight;
        return ygwm.hook(e, w, ygwm.mouse_cornerSE);
    },
    hook_resizeSW: function (e) {
        var p = mousePos(e),
            w = parentWin(this);
        ygwm.mouse_xoffset = p.x - w.offsetLeft;
        ygwm.mouse_xoffset2 = p.x + w.contents_id.offsetWidth;
        ygwm.mouse_yoffset = p.y - w.contents_id.offsetHeight;
        return ygwm.hook(e, w, ygwm.mouse_cornerSW);
    },
    click_minimize: function (e) {
        var w = parentWin(this);
        if (w.really_hide) ygwm.hide_all(w);
        else ygwm.showhide(null, w);
    },
    showhide: function (e, win, p) {
        if (document.onmouseup) document.onmouseup(e);
        if ((!e) && win) p = win;
        else p = parentWin(this);
        if (p.contents_id.style.display == "none") {
            this.className = "ygwm_corner_minimize";
            p.contents_id.style.display = "block";
            if (p.footer_id) p.footer_id.style.display = "block";
        } else {
            this.className = "ygwm_corner_maximize";
            p.contents_id.style.display = "none";
            if (p.footer_id) p.footer_id.style.display = "none";
        }
        return false;
    },
    center_window_obj: {
        w: null,
        delay: 100,
        max: 8,
        counter: 8,
        timer: null,
        func: function () {
            var w = ygwm.center_window_obj.w;
            if (window.menu) ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;
            if (((w.w + 30) > getWidth()) || ((w.h + 50) > getHeight()))window.scrollTo(w.x, w.y - ygwm.min_coord_y);
            else window.scrollTo(((w.w - getWidth()) >> 1) + w.x, ((w.h - getHeight()) >> 1) + w.y);
        }
    },
    center_window: function (w) {
        ygwm.center_window_obj.w = w;
        delay(ygwm.center_window_obj);
    },
    focus_window: function (e, where, no) {
        where = where || parentWin(this);
        if (where.contents_id) {
            where.lastScrollLeft = where.contents_id.scrollLeft;
            where.lastScrollTop = where.contents_id.scrollTop;
            if (where.style.display == "none") ygwm.show_all(where);
            if (ygwm.last_focus != where) {
                if (ygwm.last_focus) {
                    if (ygwm.last_focus.header_id) ygwm.last_focus.header_id.className = "ygwm_header";
                    if (ygwm.last_focus.winlist_item_id) {
                        ygwm.last_focus.winlist_item_id.className = "winlist_item";
                        if (window.YGCSS && YGCSS.ColorStyles[ygwm.last_focus.className]) ygwm.last_focus.winlist_item_id.style.backgroundColor = YGCSS.ColorStyles[ygwm.last_focus.className].split(",")[5];
                    }
                }
                where.parentNode.insertBefore(where, ygwm.top_window);
                where.contents_id.scrollLeft = where.lastScrollLeft;
                where.contents_id.scrollTop = where.lastScrollTop;
                if (where.header_id) where.header_id.className = "ygwm_header_selected";
                if (where.winlist_item_id) {
                    where.winlist_item_id.className = "winlist_item_selected";
                    if (window.YGCSS && YGCSS.ColorStyles[where.className]) where.winlist_item_id.style.backgroundColor = YGCSS.ColorStyles[where.className].split(",")[3];
                }
                ygwm.last_focus = where;
            }
        }
        return true;
    },
    changeDimensions: function (w, h, where) {
        if (w < ygwm.min_width) w = ygwm.min_width;
        else if (w > ygwm.max_width) w = ygwm.max_width;
        if (h < ygwm.min_height) h = ygwm.min_height;
        else if (h > ygwm.max_height) h = ygwm.max_height;
        if (where.header_id) where.header_id.style.width = w + "px";
        if (where.footer_id) where.footer_id.style.width = w + "px";
        where.contents_id.style.height = h + "px";
        where.contents_id.style.width = w + "px";
        where.w = w;
        where.h = h;
    },
    minMaxClick: function () {
        var w = parentWin(this);
        if (this.className == "ygwm_button_maximize") {
            this.className = "ygwm_button_restore";
            this.title = I8N("restore");
            if (window.menu) ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;
            w.original_width = w.w;
            w.original_height = w.h;
            var x = 24,
                y = 48 + ygwm.min_coord_y;
            if (w.footer_id) y += 24;
            ygwm.changeDimensions(getWidth() - x, getHeight() - y, w);
        } else {
            this.className = "ygwm_button_maximize";
            this.title = I8N("maximize");
            ygwm.changeDimensions(w.original_width, w.original_height, w);
        }
        ygwm.center_window(w);
    },
    hide_all: function (w) {
        w.style.display = "none";
        if (w.winlist_item_id) w.winlist_item_id.style.color = "#505050";
        if (w.onhide) w.onhide(w);
    },
    show_all: function (w) {
        w.style.display = "block";
        ygwm.center_window(w);
        if (w.winlist_item_id) w.winlist_item_id.style.color = "#000000";
        if (w.onshow) w.onshow(w);
    },
    changeWinTitle: function (f, val, unfiltered) {
        var w = f;
        if (w.header_name) {
            if (typeof val !== "string") {
                w = parentWin(f);
                val = f.value;
            }
            if (unfiltered !== true) val = val.replace(/&/g, "&amp;").replace(/</g, "&lt;");
            w.header_name.innerHTML = w.winTitle = val;
            if (w.winlist_item_id) winlist.rename(w.winlist_item_id, val);
        }
    },
    new_window: function (
        winTitle,
        where,
        contents,
        w, h,
        X, Y,
        erase_callback,
        footer,
        header,
        close_button,
        really_hide,
        win_style ) {
        if (!ygwm.top_window) {
            (ygwm.top_window = dcE("DIV")).id = "DumbEmptyDiv";
            document.body.appendChild(ygwm.top_window);
        }
        var z = "",
            new_id = dcE("DIV"),
            o = I8N("Options");
        new_id.really_hide = really_hide;
        new_id.winTitle = winTitle;
        if (window.YGCSS) {
            if ((typeof win_style != "string") || !YGCSS.ColorStyles[win_style]) win_style = YGCSS.default_style
        } else win_style = "ygwm_div";
        new_id.className = win_style;
        if (header) {
            z += '<div class="ygwm_header">';
            if (ygwm.menuClick) z += '<div class="roundButton7" title="' + o + '"><\/div>' + '<div class="roundButton3" title="' + o + '"><\/div>' + '<div class="roundButton7margin" title="' + o + '"><\/div>';
            z += ' <div class="ygwm_button_maximize" title="' + I8N("maximize") + '"><\/div>';
            if (close_button) z += ' <div class="ygwm_corner_close" title="' + I8N("close") + '"><\/div>';
            z += ' <div class="ygwm_corner_minimize" title="' + I8N("minimize") + '"><\/div>' + ' <div class="ygwm_header_name">' + winTitle + '<\/div>' + '<\/div>';
        }
        z += '<div class="ygwm_contents"><\/div>';
        if (footer) z += '<div class="ygwm_footer">' + ' <div class="ygwm_cornerSW"><\/div>' + ' <div class="ygwm_cornerSE"><\/div>' + ' <div class="ygwm_msg"><\/div>' + '<\/div>';
        new_id.innerHTML = z;
        where = where || ygwm.top_window;
        where.parentNode.insertBefore(new_id, where);
        if (header) {
            new_id.header_id = getByClass("ygwm_header", "DIV", new_id);
            if (ygwm.menuClick) {
                new_id.menuButton = getByClass("roundButton7", "DIV", new_id.header_id);
                new_id.menuButton.onclick = ygwm.menuClick;
                new_id.menuButtonInside = getByClass("roundButton3", "DIV", new_id.header_id);
                new_id.menuButtonInside.style.display = "none";
                new_id.menuButtonInside.onclick = ygwm.menuClick;
            }
            if (close_button) getByClass("ygwm_corner_close", "DIV", new_id.header_id).onclick = ygwm.erase_window;
            new_id.erase_callback = erase_callback;
            getByClass("ygwm_corner_minimize", "DIV", new_id.header_id).onclick = ygwm.click_minimize;
            (new_id.headerMinMax = getByClass("ygwm_button_maximize", "DIV", new_id.header_id)).onclick = ygwm.minMaxClick;
            (new_id.header_name = getByClass("ygwm_header_name", "DIV", new_id.header_id)).onmousedown = ygwm.hook_move;
        }
        new_id.contents_id = getByClass("ygwm_contents", "DIV", new_id);
        if (contents) {
            if (contents != "none") where = contents;
            else where = dcE("DIV");
        }
        new_id.contents_id.appendChild(where);
        if (footer) {
            new_id.footer_id = getByClass("ygwm_footer", "DIV", new_id);
            new_id.messsage_id = getByClass("ygwm_msg", "DIV", new_id.footer_id);
            new_id.shortmsg = function (msg) {
                new_id.messsage_id.innerHTML = msg;
            };
            new_id.erase_msg = function () {
                new_id.messsage_id.innerHTML = "";
            };
            getByClass("ygwm_cornerSE", "DIV", new_id.footer_id).onmousedown = ygwm.hook_resizeSE;
            getByClass("ygwm_cornerSW", "DIV", new_id.footer_id).onmousedown = ygwm.hook_resizeSW;
        } else new_id.shortmsg = new_id.erase_msg = emptyFunc;
        ygwm.changeDimensions(w, h, new_id);
        new_id.reframe = false;
        if (window.menu) ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;
        ygwm.move(new_id, X, Y);
        if (window.winlist) winlist.addWindow(new_id, winTitle, win_style);
        (new_id.onmousedown = ygwm.focus_window)(null, new_id);
        ygwm.center_window(new_id);
        return new_id;
    }
};

ycWT = ygwm.changeWinTitle;

function hiddenText(key, base) {
    return getById("hidden" + key, "SPAN", base).innerHTML;
}