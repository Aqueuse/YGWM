function dcE(a) {
    return document.createElement(a);
}

function rC(e) {
    e.parentNode.removeChild(e);
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
    }
}

function getHeight() {
    return window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
}

function getWidth() {
    return window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
}

function emptyFunc(a) {
    return a;
}
i = "requestAnimationFrame";
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

function cleanup_table(id) {
    var t = id.firstChild,
        t2;
    while (t) {
        t2 = t.nextSibling;
        switch (t.nodeName) {
            case "TBODY":
            case "TR":
                cleanup_table(t);
            case "TH":
            case "TD":
                break;
            default:
                rC(t)
        }
        t = t2
    }
}

function parentWin(w) {
    while (w) {
        if (w.contents_id) break;
        w = w.parentNode
    }
    return w
}

function intrnd(x) {
    returnMath.floor(F.random() * x)
}

function pad_right(s, n) {
    n -= (s + "").length;
    while (n-- > 0) s += " ";
    return s
}

function pad_left(s, n) {
    n -= (s + "").length;
    while (n-- > 0) s = " " + s;
    return s
}

function Clone() {}

function clone(obj) {
    Clone.prototype = obj;
    return new Clone()
}

function dontMess(id) {
    id.autocorrect = id.autocomplete = id.autocapitalize = id.spellcheck = false
};

first_run = true;
if (window.localStorage) {
    if (localStorage.Lang) first_run = false
} else {
    localStorage = {
        length: 0,
        removeItem: function (key) {}
    }
}

function lsGet(k) {
    return localStorage.getItem(k)
}

function lsPut(k, s) {
    try {
        localStorage[k] = s
    } catch (e) {
        alert('Setting localStorage key="' + k + '"failed\nPossible causes: quota exceeded or unsafe request origin')
    }
}

function dump_LS() {
    var i, k, l, s = "localStorage contents :\n";
    if (window.localStorage) {
        if (l = localStorage.length) {
            for (i = 0; i < l; i++) {
                k = localStorage.key(i);
                s += k + ' = ' + localStorage.getItem(k) + '\n'
            }
        } else s += "(nothing)"
    }
    return s
};
LANG = {
    supported: false,
    override: false,
    LN: "",
    FLAGS: [],
    change_innerHTML: [],
    change_lang: function (i) {
        i = +i;
        var j, k;
        if ((i < 0) || (i >= i8n.LANGS.length)) i = 0;
        lsPut("Lang", LANG.LN = i8n.LANGS[LNG = i]);
        changeMainWinTitle(I8N("welc").replace(/&nbsp;/gi, " "));
        for (j in LANG.change_innerHTML) {
            if (k = LANG.change_innerHTML[j]) k[0].innerHTML = k[1][i] || k[1][0]
        }
    }
};
browsLang = (navigator.language || navigator.browserLanguage).slice(0, 2);
if (i = lsGet("Lang")) {
    browsLang = i;
    LANG.override = true
}
if ((i =window.location.hash).indexOf("#lang=") == 0) {
    browsLang = i.slice(6);
    LANG.override = true
}
LNG = i8n.LANGS.indexOf(browsLang);
if (LNG < 0) LNG = 0;
else LANG.supported = true;

function I8N(i, t) {
    t = i8n[i];
    if (!t) return i;
    if (t[LNG]) return t[LNG];
    return t[0] || i
}

function Al8N() {
    var i = 0,
        s = "",
        t, a, l = LNG;
    while (typeof (a = arguments[i++]) != "undefined") {
        if (a == "") s += arguments[i++];
        else s += I8N(a)
    }
    alert(s)
}

function generated(c, tool) {
    return "\n" + c + " " + I8N("Generated on") + " " + newDate().toGMTString() + "\n" + c + " " + I8N("by") + " " + document.location + "\n" + c + "    yasep/" + tool + " " + I8N("version") + " " + VERSION + "\n"
}

function setHTML(o, t) {
    if (typeof t != "string") {
        if (t.length > 1) LANG.change_innerHTML.push([o, t]);
        t = t[LNG] || t[0]
    }
    o.innerHTML = t
};
mainTitlePrefix = "yasep.org: ";
mainTitle = "";

function changeMainWinTitle(m) {
    document.title = mainTitlePrefix + (mainTitle = m)
};
INIT_list = [];

function INIT(o) {
    INIT_list.push(o)
};

function message_FIFO(div, depth) {
    div.msg_number = 0;
    if (!depth) depth = 30;
    div.msg_list_depth = depth;
    div.msg_new_div = null;
    div.msg_first_div = null;
    div.msg_last_div = null;
    div.reset_messages = function () {
        div.innerHTML = "";
        div.msg_number = 0
    };
    div.add_message = function (col, msg) {
        div.msg_number++;
        var tmp = '<span style="background-color:' + col + '">' + div.msg_number + "</span>: " + msg + "<br>";
        if (div.msg_number == 1) {
            div.innerHTML = "";
            div.msg_first_div = dcE("DIV");
            div.msg_first_div.innerHTML = tmp;
            div.appendChild(div.msg_first_div);
            div.msg_last_div = div.msg_first_div
        } else {
            if (div.msg_number < div.msg_list_depth) {
                div.msg_new_div = dcE("DIV");
                div.msg_new_div.innerHTML = tmp;
                div.insertBefore(div.msg_new_div, div.msg_last_div);
                div.msg_last_div = div.msg_new_div
            } else {
                div.msg_new_div = div.msg_first_div;
                div.msg_first_div = div.msg_first_div.previousSibling;
                rC(div.msg_new_div);
                div.msg_new_div.innerHTML = tmp;
                div.insertBefore(div.msg_new_div, div.msg_last_div);
                div.msg_last_div = div.msg_new_div
            }
        }
    };
    return div.add_message
};

function import_code(url, load) {
    var s = dcE('script');
    s.onload = load;
    s.src = url;
    document.getElementsByTagName('head')[0].appendChild(s)
}

function import_data(url) {
    try {
        var loader = new XMLHttpRequest();
        loader.open("GET", url, false);
        loader.send(null);
        if (loader.status && (loader.status != 200)) {
            Al8N("idt1", "", loader.status, "idt2", "", url);
            return null;
        }
        return loader.responseText
    } catch (err) {
        return null;
    }
}

function import_htmi(namebase, l) {
    if (typeof l == "undefined") l = LNG;
    var xhr, n = namebase + "." + i8n.LANGS[l] + ".html";
    try {
        xhr = new XMLHttpRequest();
        xhr.open("GET", n, false);
        xhr.send(null);
        if (xhr.status && (xhr.status != 200)) throw "http";
        var startHTMI = "<!--startHTMI-->";
        var endHTMI = "<!--endHTMI-->";
        var s = xhr.responseText.indexOf(startHTMI);
        if (s > -1) {
            var e = xhr.responseText.indexOf(endHTMI, s);
            if (e < 0) e = xhr.responseText.length;
            return xhr.responseText.slice(s, e)
        }
    } catch (err) {}
    if (l === 0) return Al8N("R", "", n, "nf");
    else return import_htmi(namebase, 0)
};
num_array = "0123456789aAbBcCdDeEfFhH";
alpha_array = num_array + "_gijklmnopqrstuvwxyzGIJKLMNOPQRSTUVWXYZ";
alpha_chars = [];
for (var i in alpha_array) alpha_chars[alpha_array[i]] = 1;
edit_text = {
    div: null,
    old_mousehandler: null,
    current_elem: null,
    current_text: null,
    rx_num: new RegExp("[^" + num_array + "]", "ig"),
    rx_alpha: new RegExp("[^" + alpha_array + "]", "ig"),
    filter_alpha: function (t) {
        if (t.value) t.value = t.value.replace(edit_text.rx_alpha, "");
        else t.value = edit_text.current_elem.edit.defaultValue
    },
    filter_number: function (t) {
        if (t.value) t.value = t.value.replace(edit_text.rx_num, "");
        else t.value = "0"
    },
    register: function (e, o) {
        if ((typeof e == "object") && (typeof e.edit == "undefined")) {
            if (typeof o != "object") o = {};
            if (typeof o.size != "number") o.size = 30;
            if (typeof o.defaultValue == "undefined") o.defaultValue = "_empty_";
            if (typeof o.maxsize != "number") o.maxsize = 500;
            if (o.bg === true) e.className = "editTextField";
            if (e.nodeName == "INPUT") {
                e.onkeyup = o.func;
                e.size = o.size;
                e.source = e.value = o.defaultValue;
                e.maxLength = o.maxsize
            } else {
                e.edit = o;
                e.style.cursor = "pointer";
                e.onclick = edit_text.start
            }
        }
    },
    check: function (e) {
        switch ('which' in e ? e.which : e.keyCode) {
            case 13:
                edit_text.stop(true);
                break;
            case 27:
                edit_text.stop(A);
                break;
            default:
                var c = edit_text.current_elem.edit;
                if (typeof c.check == "function") {
                    c.check(this);
                    this.style.backgroundColor = edit_text.valid ? "" : "#F65"
                }
        }
    },
    start: function (e) {
        if (edit_text.current_elem != this) {
            if (edit_text.current_elem) edit_text.stop(true);
            if (!edit_text.div) edit_text.init();
            edit_text.valid = true;
            e = e ||window.event;
            e.stopPropagation();
            var d = edit_text.div,
                t = d.firstChild,
                b = document.body || document.documentElement;
            d.style.display = "block";
            d.style.left = ((e.pageX || e.clientX + b.scrollLeft) + 10) + "px";
            d.style.top = ((e.pageY || e.clientY + b.scrollTop) + 10) + "px";
            o = this.edit;
            t.size = o.size;
            t.maxLength = o.maxsize;
            if (typeof this.source != "string") this.source = this.textContent;
            t.value = this.source;
            t.style.backgroundColor = "";
            edit_text.current_elem = this;
            t.focus();
            t.onkeyup = edit_text.check;
            t.onkeyup(e);
            edit_text.old_mousehandler = document.onmousedown;
            document.onmousedown = function (e) {
                e = e ||window.event;
                var t = e.target || e.srcElement;
                if (t.id != "edit_source") edit_text.stop(true)
            }
        }
        return false
    },
    stop: function (save) {
        var l = edit_text.current_elem;
        if (l && l.nodeName != "INPUT") {
            var d = edit_text.div,
                v = d.firstChild.value;
            d.style.display = "none";
            document.onmousedown = edit_text.old_mousehandler;
            if (save && edit_text.valid) {
                l.source = l.textContent = v;
                if (typeof l.edit.func == "function") l.edit.func(l)
            }
        }
        edit_text.current_elem = null
    },
    init: function () {
        var d = dcE("DIV"),
            t = dcE("input"),
            s = d.style;
        s.position = "absolute";
        s.background = "none";
        t.type = "text";
        t.id = "edit_source";
        dontMess(t);
        d.appendChild(t);
        document.body.appendChild(d);
        if (window.ygwm) d.style.zIndex = ygwm.noScrollIndex;
        edit_text.div = d
    }
};
var hex_array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
var int_array = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "A": 10,
    "B": 11,
    "C": 12,
    "D": 13,
    "E": 14,
    "F": 15,
    "a": 10,
    "b": 11,
    "c": 12,
    "d": 13,
    "e": 14,
    "f": 15
};

function int2hex(val, maxdigits, mindigits, opt_h) {
    if (val == null) return "u";
    if (typeof val != "number") {
        add_message("orange", I8N("R") + I8N("wiffi"));
        return "??????";
    }
    var i = 0,
        b = "h";
    if (typeof maxdigits != "number") maxdigits = 7;
    if (typeof mindigits != "number") mindigits = 0;
    if (opt_h) b = "";
    do {
        b = hex_array[val & 15] + b;
        val >>= 4;
        if ((val == 0) && (i >= mindigits)) return b;
    } while (i++ < maxdigits);
    return b;
}

function _str2int(t, add_message, maxbits) {
    return str2int(t.replace(/(^\s*)|(\s*$)/g, ""), add_message, maxbits);
}

function str2int(t, add_message, maxbits) {
    if (typeof t != "string") return null;
    if (t.length < 1) return null;
    var i = 0,
        a = 0,
        b = 0,
        d = t.length - 1,
        c = t[d];
    if (((c == "h") || (c == "H")) && (d >= 0)) {
        while (i < d) {
            b = int_array[t[i]];
            if (typeof b != "number") {
                if (typeof add_message == "function") add_message("orange", I8N("R") + I8N("numforH"));
                return null;
            }
            a = (a * 16) + b;
            i++;
        }
    } else {
        if (((c == "b") || (c == "B")) && (d >= 0)) {
            while (i < d) {
                b = t[i];
                if ((b & ~1) != 48) {
                    if (typeof add_message == "function") add_message("orange", I8N("R") + I8N("numforB"));
                    return _
                }
                a += a + (b & 1);
                i++;
            }
        } else {
            var signe = 1;
            if ((t.charAt(i) == "-") && (d >= 0)) {
                signe = -1;
                i++;
            }
            while (i < t.length) {
                b = t[i];
                if ((b < 48) || (b > 57)) {
                    if (typeof add_message == "function") add_message("orange", I8N("R") + I8N("numforD"));
                    return _
                }
                a = (a * 10) + (b - 48);
                i++;
            }
            a *= signe;
        }
    }
    if (typeof (maxbits) == "number") {
        var b = a;
        if (b < 0) b = -b;
        if ((b >= (1 << maxbits)) && (typeof add_message == "function")) add_message("orange", I8N("W") + I8N("oob1") + maxbits + I8N("oob2"));
        a &= ((1 << maxbits) - 1);
    }
    return a
}

function toBin(n, l, q) {
    var m = "";
    while (l > 0) {
        m = (n & 1) + m;
        n >>>= 1;
        if (q && !n) break;
        l--;
    }
    return m
};
if (!window.I8N) {
    I8N = function (m) {
        return m
    };
    Al8N = function (m) {
        alert(m)
    }
}
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
            if (x + id.w > w) x = w - id.w
        }
        if (x < ygwm.min_coord_x) x = ygwm.min_coord_x;
        if (y < ygwm.min_coord_y) y = ygwm.min_coord_y;
        id.style.left = x + "px";
        id.style.top = y + "px";
        id.x = x;
        id.y = y
    },
    erase_window: function (e, where) {
        if (where = parentWin(where || this)) {
            ygwm.last_focus = null;
            if (where.winlist_item_id) winlist.removeItem(where);
            if (where.eraseCallback) where.eraseCallback(where);
            rC(where);
            for (var i in where) delete where[i]
        }
        return false
    },
    empty_callback: function () {
        ygwm.latencyTimeOut = _
    },
    redraw_callback: function () {
        ygwm.slowDisplay = false;
        var i = ygwm.moved_div;
        i.contents_id.firstChild.style.display = "block";
        i.contents_id.scrollLeft = i.lastScrollLeft;
        i.contents_id.scrollTop = i.lastScrollTop;
        ygwm.latencyTimeOut = setTimeout(ygwm.empty_callback, 0)
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
       window.scrollBy(scrollX, scrollY)
    },
    mouse_move_callback: function (e) {
        var p, d = newDate().getTime();
        if ((!ygwm.slowDisplay) && (ygwm.latencyTimeOut) && (ygwm.lastTimeStamp > 0)) {
            if (d < ygwm.lastTimeStamp) return false;
            ygwm.moved_div.lastScrollLeft = ygwm.moved_div.contents_id.scrollLeft;
            ygwm.moved_div.lastScrollTop = ygwm.moved_div.contents_id.scrollTop;
            ygwm.moved_div.contents_id.firstChild.style.display = "none";
            ygwm.slowDisplay = true
        }
        clearTimeout(ygwm.latencyTimeOut);
        ygwm.latencyTimeOut = null;
        ygwm.lastTimeStamp = d + ygwm.maxDisplayLatency;
        p = mousePos(e);
        ygwm.action_function(p.x, p.y);
        ygwm.autoScroll(e);
        if (ygwm.slowDisplay) ygwm.latencyTimeOut = setTimeout(ygwm.redraw_callback, ygwm.redrawDelay);
        else ygwm.latencyTimeOut = setTimeout(ygwm.empty_callback, 0);
        return false
    },
    mouse_cornerSE: function (x, y) {
        ygwm.changeDimensions(x - ygwm.mouse_xoffset, y - ygwm.mouse_yoffset, ygwm.moved_div)
    },
    mouse_cornerSW: function (x, y) {
        var w, h = y - ygwm.mouse_yoffset,
            l = x - ygwm.mouse_xoffset;
        if (l < 3) {
            l = 3;
            x = ygwm.mouse_xoffset + 3
        }
        w = -(x - ygwm.mouse_xoffset2);
        if (w < ygwm.min_width) {
            w = ygwm.min_width;
            l = ygwm.mouse_xoffset2 - (ygwm.min_width + ygwm.mouse_xoffset)
        }
        if (l > ygwm.max_coord) return;
        ygwm.move(ygwm.moved_div, l, ygwm.moved_div.y);
        ygwm.changeDimensions(w, h, ygwm.moved_div)
    },
    mouse_drag: function (x, y) {
        x -= ygwm.mouse_xoffset;
        y -= ygwm.mouse_yoffset;
        if ((x > ygwm.max_coord) || (y > ygwm.max_coord)) return;
        ygwm.move(ygwm.moved_div, x, y)
    },
    mouse_drop: function () {
        var y = ygwm.moved_div,
            c = y.erase_callback;
        if ((ygwm.action_function == ygwm.mouse_drag) && c && c()) ygwm.erase_window(null, y);
        ygwm.moved_div.contents_id.firstChild.style.display = "";
        clearTimeout(ygwm.latencyTimeOut);
        if (typeof y.ondrop == "function") y.ondrop(y);
        ygwm.latencyTimeOut = ygwm.moved_div = document.onmousemove = document.onmouseup = ygwm.action_function = null;
        return false
    },
    hook: function (e, where, callback) {
        if (B.onmouseup) document.onmouseup(e);
        document.onmouseup = ygwm.mouse_drop;
        document.onmousemove = ygwm.mouse_move_callback;
        ygwm.moved_div = where;
        ygwm.action_function = callback;
        ygwm.slowDisplay = false;
        return false
    },
    hook_move: function (e) {
        var p = mousePos(e),
            w = parentWin(this);
        ygwm.mouse_xoffset = p.x - w.offsetLeft;
        ygwm.mouse_yoffset = p.y - w.offsetTop;
        if (window.menu) ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;
        return ygwm.hook(e, w, ygwm.mouse_drag)
    },
    hook_resizeSE: function (e) {
        var p = mousePos(e),
            w = parentWin(this);
        ygwm.mouse_xoffset = p.x - w.contents_id.offsetWidth;
        ygwm.mouse_yoffset = p.y - w.contents_id.offsetHeight;
        return ygwm.hook(e, w, ygwm.mouse_cornerSE)
    },
    hook_resizeSW: function (e) {
        var p = mousePos(e),
            w = parentWin(this);
        ygwm.mouse_xoffset = p.x - w.offsetLeft;
        ygwm.mouse_xoffset2 = p.x + w.contents_id.offsetWidth;
        ygwm.mouse_yoffset = p.y - w.contents_id.offsetHeight;
        return ygwm.hook(e, w, ygwm.mouse_cornerSW)
    },
    click_minimize: function (e) {
        var w = parentWin(this);
        if (w.really_hide) ygwm.hide_all(w);
        else ygwm.showhide(null, w)
    },
    showhide: function (e, win, p) {
        if (B.onmouseup) document.onmouseup(e);
        if ((!e) && win) p = win;
        else p = parentWin(this);
        if (p.contents_id.style.display == "none") {
            this.className = "ygwm_corner_minimize";
            p.contents_id.style.display = "block";
            if (p.footer_id) p.footer_id.style.display = "block"
        } else {
            this.className = "ygwm_corner_maximize";
            p.contents_id.style.display = "none";
            if (p.footer_id) p.footer_id.style.display = "none"
        }
        return false
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
            elsewindow.scrollTo(((w.w - getWidth()) >> 1) + w.x, ((w.h - getHeight()) >> 1) + w.y)
        }
    },
    center_window: function (w) {
        ygwm.center_window_obj.w = w;
        delay(ygwm.center_window_obj)
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
                        if (window.YGCSS && YGCSS.ColorStyles[ygwm.last_focus.className]) ygwm.last_focus.winlist_item_id.style.backgroundColor = YGCSS.ColorStyles[ygwm.last_focus.className].split(",")[5]
                    }
                }
                where.parentNode.insertBefore(where, ygwm.top_window);
                where.contents_id.scrollLeft = where.lastScrollLeft;
                where.contents_id.scrollTop = where.lastScrollTop;
                if (where.header_id) where.header_id.className = "ygwm_header_selected";
                if (where.winlist_item_id) {
                    where.winlist_item_id.className = "winlist_item_selected";
                    if (window.YGCSS && YGCSS.ColorStyles[where.className]) where.winlist_item_id.style.backgroundColor = YGCSS.ColorStyles[where.className].split(",")[3]
                }
                ygwm.last_focus = where;
            }
        }
        return true
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
        ygwm.center_window(w)
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
    new_window: function (winTitle, where, contents, w, h, X, Y, erase_callback, footer, header, close_button, really_hide, win_style) {
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
            z += ' <div class="ygwm_corner_minimize" title="' + I8N("minimize") + '"><\/div>' + ' <div class="ygwm_header_name">' + winTitle + '<\/div>' + '<\/div>'
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
                new_id.menuButtonInside.onclick = ygwm.menuClick
            }
            if (close_button) getByClass("ygwm_corner_close", "DIV", new_id.header_id).onclick = ygwm.erase_window;
            new_id.erase_callback = erase_callback;
            getByClass("ygwm_corner_minimize", "DIV", new_id.header_id).onclick = ygwm.click_minimize;
            (new_id.headerMinMax = getByClass("ygwm_button_maximize", "DIV", new_id.header_id)).onclick = ygwm.minMaxClick;
            (new_id.header_name = getByClass("ygwm_header_name", "DIV", new_id.header_id)).onmousedown = ygwm.hook_move
        }
        new_id.contents_id = getByClass("ygwm_contents", "DIV", new_id);
        if (contents) {
            if (contents != "none") where = contents;
            else where = dcE("DIV")
        }
        new_id.contents_id.appendChild(where);
        if (footer) {
            new_id.footer_id = getByClass("ygwm_footer", "DIV", new_id);
            new_id.messsage_id = getByClass("ygwm_msg", "DIV", new_id.footer_id);
            new_id.shortmsg = function (msg) {
                new_id.messsage_id.innerHTML = msg
            };
            new_id.erase_msg = function () {
                new_id.messsage_id.innerHTML = ""
            };
            getByClass("ygwm_cornerSE", "DIV", new_id.footer_id).onmousedown = ygwm.hook_resizeSE;
            getByClass("ygwm_cornerSW", "DIV", new_id.footer_id).onmousedown = ygwm.hook_resizeSW
        } else new_id.shortmsg = new_id.erase_msg = emptyFunc;
        ygwm.changeDimensions(w, h, new_id);
        new_id.reframe = false;
        if (window.menu) ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;
        ygwm.move(new_id, X, Y);
        if (window.winlist) winlist.addWindow(new_id, winTitle, win_style);
        (new_id.onmousedown = ygwm.focus_window)(null, new_id);
        ygwm.center_window(new_id);
        return new_id
    }
};
ycWT = ygwm.changeWinTitle;
(YGCSS = {
    insertCssRule: function (rule) {
        YGCSS.StyleSheets.insertRule(rule, YGCSS.StyleSheetsLength++)
    },
    ColorStyles_tags: ["~6", "~7", "~8", "~A", "~C", "~D", "~F"],
    ColorStyles: {
        "default": "#666,#777,#888,#AAA,#CCC,#DDD,#FFF",
        "mussel": "#423d53,#57557a,#646a82,#737c9a,#848cbb,#a5a7d7,#c7c9f9",
        "mussl2": "#e95400,#ff972d,#ffbc41,#ffbb4a,#facd81,#feedc9,#fefff2",
        "mussel_old": "#333548,#3f3f5c,#555970,#f08b13,#f0b612,#f4c84c,#f3e65e",
        "HBpen": "#606060,#606060,#FFFF00,#FFFF00,#606060,#A4A4A4,#A4A4A4",
        "docStyle": "#233558,#344569,#45567A,#6678DC,#8896EE,#b0c5ff,#fafcff",
        "WinOK": "#355823,#456934,#567A45,#78DC66,#96EE88,#c5ffb0,#efffe0",
        "WinKO": "#583523,#694534,#7A5645,#DC7866,#EE9688,#ffc5b0,#ffefe0",
        "airy": "#d0dced,#dfecff,#dfecff,#d0dced,#d0dced,#d0dced,#dfecff",
        "ghost": "#DCDCDC,#00FF00,#00FF00,#C3C3C3,#A0A0A0,#808080,#DCDCDC",
        "bluecyan": "#1e3853,#004891,#346ca0,#0870d8,#54a1ea,#77bdff,#aad3ff",
        "old_yellow": "#662,#772,#883,#AA4,#CC5,#DD5,#FF6",
        "old_cyan": "#266,#277,#388,#4AA,#5CC,#5DD,#6FF",
        "old_blue": "#226,#227,#338,#44A,#55C,#55D,#66F",
        "old_red": "#622,#722,#833,#A44,#C55,#D55,#F66",
        "rouge2": "#ff3f0c,#ff673e,#ff7854,#ff8c6e,#ffa790,#ffd1c4,#ffe8e2",
        "vert3": "#0fdb00,#37db2b,#4ddb43,#61db58,#89db83,#a8dba4,#c6dbc4"
    },
    ColorStylesNames: [],
    default_style: "default",
    add_new_window_style: function (name) {
        if (YGCSS.ColorStyles[name] && !YGCSS.ColorStyles[name].loaded) {
            var b = "",
                i, j, cols = YGCSS.ColorStyles[name].split(",");
            for (i = 0; i < YGCSS.CssTemplate.length; i++) {
                b = YGCSS.CssTemplate[i];
                for (j in cols) b = b.replace(YGCSS.regexp[j], cols[j]);
                YGCSS.insertCssRule("div." + name + b + "}")
            }
            YGCSS.ColorStyles[name].loaded = true;
            YGCSS.ColorStylesNames.push(name)
        }
    },
    paletize: function (theme) {
        return t
    },
    rotate_color: function (name, theme) {
        var a = [],
            i = 0,
            t = [
                ["_bucy", 0, 1, 2],
                ["_cyan", 0, 2, 2],
                ["_cygr", 0, 2, 1],
                ["_gren", 0, 2, 0],
                ["_gryl", 1, 2, 0],
                ["_yelo", 2, 2, 0],
                ["_ylrd", 2, 1, 0],
                ["_red", 2, 0, 0],
                ["_rdvl", 2, 0, 1],
                ["_viol", 2, 0, 2],
                ["_vibu", 1, 0, 2],
                ["_blue", 0, 0, 2]
            ];
        theme = YGCSS.ColorStyles[theme].replace(/[,#]/gi, "", "gi");
        while (i < theme.length) {
            a.push(theme[i] + theme[i + 1]);
            i += 2
        }
        for (i in t) {
            var u = t[i],
                k = 0,
                n = name + u[0],
                s = "";
            if (!YGCSS.ColorStyles[n]) {
                do {
                    s += "#" + a[k + u[1]] + a[k + u[2]] + a[k + u[3]];
                    if ((k += 3) > 20) break;
                    s += ","
                } while (true);
                YGCSS.ColorStyles[n] = s
            }
        }
    },
    init: function () {
        try {
            YGCSS.StyleSheets = document.styleSheets[document.styleSheets.length - 1];
            YGCSS.StyleSheetsLength = YGCSS.StyleSheets.cssRules.length
        } catch (i) {
            YGCSS.insertCssRule = function () {};
            Al8N("styleSheets are missing");
            return
        }
        var a = ">div.ygwm_header ",
            i, c = ">div.ygwm_header_selected ";
        YGCSS.CssTemplate = ["{ border: 2px solid; position: absolute; border-color: ~D ~6 ~6 ~D", ">div.ygwm_header{background-color: ~C", ">div.ygwm_header_selected{background-color: ~A", ">div.ygwm_contents{background-color:~F", ">div.ygwm_footer{background-color: ~C", ">div.ygwm_footer > div.ygwm_cornerSW{border-color:~C ~C ~8 ~8", ">div.ygwm_footer > div.ygwm_cornerSE{border-color:~C ~8 ~8 ~C", a + "> div.ygwm_corner_close   {border-color:~C ~8 ~C ~8", c + "> div.ygwm_corner_close   {border-color:~A ~7 ~A ~7", a + "> div.ygwm_corner_minimize{border-color:~8 ~C ~C ~C", c + "> div.ygwm_corner_minimize{border-color:~7 ~A ~A ~A", a + "> div.ygwm_corner_maximize{border-color:~C ~C ~8 ~C", c + "> div.ygwm_corner_maximize{border-color:~A ~A ~7 ~A", a + "> div.roundButton7{border-color:~8", c + "> div.roundButton7{border-color:~7", a + "div.roundButton3{border-color:~C", c + "div.roundButton3{border-color:~A", a + "div.ygwm_button_maximize{border-color:~8", c + "div.ygwm_button_maximize{border-color:~7", a + "div.ygwm_button_restore{border-color:~C;background-color:~8", c + "div.ygwm_button_restore{border-color:~A;background-color:~7"];
        YGCSS.regexp = [];
        for (i = 0; i < 7; i++) YGCSS.regexp[i] = new RegExp(YGCSS.ColorStyles_tags[i], "g");
        YGCSS.rotate_color("sat", "bluecyan");
        YGCSS.rotate_color("doc", "docStyle");
        YGCSS.rotate_color("ms1", "mussel");
        YGCSS.rotate_color("ms2", "mussl2");
        for (var i in YGCSS.ColorStyles) YGCSS.add_new_window_style(i)
    },
    changeTheme: function (t, theme) {
        var where = parentWin(t);
        where.className = theme;
        if (where.winlist_item_id) {
            if (YGCSS.ColorStyles[where.className]) where.winlist_item_id.style.backgroundColor = YGCSS.ColorStyles[where.className].split(",")[4]
        }
    },
    importTheme: function (name, s) {
        YGCSS.ColorStyles[name] = s;
        YGCSS.add_new_window_style(name);
        return name
    }
}).init();
ycT = YGCSS.changeTheme;
ygwm.menuClick = function () {
    var w = parentWin(this),
        h, a = w.menuButtonInside.style;
    if (a.display == "none") {
        a.display = "";
        w.old_contents = w.contents_id.firstChild;
        rC(w.old_contents);
        newmenu = dcE("DIV");
        w.contents_id.appendChild(newmenu);
        var h = '<h2>' + I8N("Options") + '</h2>' + '<p>' + I8N("wintl") + '<input type="text" size="30" maxlength="250" name="wintitle" onchange="ycWT(this)" value="' + w.winTitle + '"></p>';
        if (YGCSS) {
            h += I8N("themes") + "<div>";
            for (var i in YGCSS.ColorStyles) {
                h += '<div class="' + i + '" style="position:static;float:left;cursor:pointer;margin:2px;"' + ' onclick="ycT(this,\'' + i + '\')"><div class="ygwm_header">';
                if (w.className == i) h += "<b>" + i + "</b>";
                else h += i;
                h += "</div></div>"
            }
            h += '</div><div style="clear:both">' + I8N("hint")
        }
        newmenu.innerHTML = h
    } else {
        a.display = "none";
        rC(w.contents_id.firstChild);
        w.contents_id.appendChild(w.old_contents);
        w.old_contents = _
    }
};
INIT(winlist = {
    margin_top: 80,
    firstfreespot: 0,
    last_time: 0,
    adjust_height_obj: {
        delay: 200,
        max: 6,
        counter: 6,
        timer: null,
        func: function () {
            var y = winlist.winlist_fg.scrollHeight,
                z = getHeight();
            if ((y + winlist.margin_top) > z) {
                y = 0;
                z -= winlist.margin_top;
                if (z >= 0) y = z
            }
            winlist.winlist_bg.style.height = y + "px"
        }
    },
    adjust_height: function () {
        delay(winlist.adjust_height_obj)
    },
    MinMaxClick: function () {
        if (winlist.minmax_button.className == "ygwm_corner_minimize") {
            winlist.winlist_bg.style.display = "none";
            winlist.minmax_button.className = "ygwm_corner_maximize"
        } else {
            winlist.winlist_bg.style.display = "";
            winlist.minmax_button.className = "ygwm_corner_minimize"
        }
        winlist.adjust_height()
    },
    removeItem: function (win) {
        rC(win.winlist_item_id);
        var i = win.winlist_index;
        delete winlist.list[i];
        if (i < winlist.firstfreespot) winlist.firstfreespot = i;
        winlist.adjust_height()
    },
    rename: function (item, val) {
        item.innerHTML = val;
        winlist.adjust_height()
    },
    change_window: function (win, item) {
        if (ygwm.last_focus != win) {
            ygwm.focus_window(null, win);
            if (win.style.display == "none") ygwm.show_all(win)
        } else {
            if (win.style.display == "none") ygwm.show_all(win);
            else return ygwm.hide_all(win)
        }
        ygwm.center_window(win)
    },
    addWindow: function (win, name) {
        var h = dcE("DIV");
        win.really_hide = true;
        win.winlist_item_id = h;
        h.innerHTML = name;
        h.win = win;
        h.onclick = function (e) {
            var t = e.timeStamp || +newDate(),
                u = t - winlist.last_time;
            winlist.last_time = t;
            if (u > 300) winlist.change_window(win, h);
            else {
                u = win.className;
                if (win.style.display == "none") {
                    for (var i in winlist.list)
                        if (winlist.list[i].className == u) ygwm.hide_all(winlist.list[i])
                } else
                    for (var i in winlist.list)
                        if (winlist.list[i].className == u) ygwm.show_all(winlist.list[i])
            }
        };
        winlist.winlist_fg.appendChild(h);
        h = winlist.firstfreespot;
        while (winlist.list[h]) h++;
        winlist.list[winlist.firstfreespot = win.winlist_index = h] = win;
        winlist.adjust_height()
    },
    minimizeAll: function () {
        for (var i in winlist.list) ygwm.hide_all(winlist.list[i])
    },
    restoreAll: function () {
        for (var i in winlist.list) ygwm.show_all(winlist.list[i])
    },
    closeAll: function () {
        for (var i in winlist.list) ygwm.erase_window(0, winlist.list[i])
    },
    INIT_func: function () {
        if (winlist.list) return Al8N("WLerr1");
        if (!ygwm.new_window) return Al8N("WLerr2");
        winlist.list = [];
        var w = dcE("DIV");
        w.className = "ygwm_div";
        w.id = "winlist";
        w.innerHTML = '<div class="ygwm_header_selected">' + '<div class="ygwm_corner_minimize"></div>' + '<div id="winlist_name">Windows list</div>' + '</div>' + '<div id="winlist_bg"><div id="winlist_fg"></div></div>';
        document.body.appendChild(w);
        LANG.change_innerHTML.push([document.getElementById("winlist_name"), i8n.winlst]);
        (winlist.header = getByClass("ygwm_header_selected", "DIV", w)).onclick = winlist.MinMaxClick;
        winlist.minmax_button = getByClass("ygwm_corner_minimize", "DIV", winlist.header);
        winlist.winlist_bg = document.getElementById("winlist_bg");
        winlist.winlist_fg = document.getElementById("winlist_fg");
       window.onresize = winlist.adjust_height
    }
});
INIT(menu = {
    list: {},
    unfold_menuItem: function () {
        if (ygwm.moved_div) return;
        if (this.listlength > 0) this.menuItemList.style.display = ""
    },
    fold_menuItem: function () {
        this.menuItemList.style.display = "none"
    },
    onClick: function () {
        winman.activate_window(this.key)
    },
    subMenuItem: function (n, langlist, func, sep) {
        var name = langlist[0],
            l, o = dcE("DIV");
        if (l = n.list[name]) return l;
        o.className = (sep === 1) ? "menuSeparator" : "menuItem";
        setHTML(o, langlist);
        if (typeof func == "function") o.onclick = func;
        else {
            if (typeof func == "string") {
                o.onclick = menu.onClick;
                o.key = func
            }
        }
        n.list[name] = o;
        n.listlength++;
        n.menuItemList.appendChild(o);
        return o
    },
    mainMenuItem: function (langlist, dir, t) {
        var i, k, l;
        if (typeof langlist == "string") {
            if (l = menu.list[langlist]) return l;
            else alert(langlist + " " + I8N("not found"))
        }
        var name = langlist[0],
            m = dcE("DIV"),
            n = dcE("DIV"),
            o = dcE("SPAN");
        if (dir != "R") dir = "L";
        n.className = "menuBarItem" + dir;
        menu.list[name] = n;
        setHTML(o, langlist);
        n.appendChild(o);
        n.list = {};
        n.listlength = 0;
        n.onmouseout = menu.fold_menuItem;
        n.onmouseover = menu.unfold_menuItem;
        menu.mainMenu_id.appendChild(n);
        m.className = "menuItemList";
        m.style.display = "none";
        n.appendChild(m);
        n.menuItemList = m;
        if (t) menu.subMenuItem(n, t, 0, 1);
        return n
    },
    rainbow_x: 5,
    rainbow_i: 0,
    iterate_rainbow: function () {
        var j = YGCSS.ColorStylesNames[--menu.rainbow_i];
        ygwm.new_window(j, null, "none", 160, 90, menu.rainbow_x,Math.ceil((menu.rainbow_x / 2) + 60), false, true, true, true, false, j);
        menu.rainbow_x += 40;
        if (menu.rainbow_i > 0) redraw(menu.iterate_rainbow)
    },
    key_count: 0,
    key_time: 0,
    iterate_keys: function () {
        if (menu.key_count > 0) {
            redraw(menu.iterate_keys);
            winman.activate_window(winman.keys_list[--menu.key_count])
        } else alert("Elapsed : " + (+newDate() - menu.key_time) + "ms")
    },
    create_menu: function () {
        (menu.mainMenu_id = dcE("DIV")).id = "MainMenuBar";
        document.body.appendChild(menu.mainMenu_id)
    },
    INIT_func: function () {
        var i, j, l = '<a target="_blank" href="';

        function t(i, k) {
            menu.subMenuItem(j, i, k)
        }

        function sublink(g, k) {
            var e = menu.subMenuItem(j, [k]),
                a = dcE("A");
            a.href = k;
            a.target = "_blank";
            e.innerHTML = "";
            e.appendChild(a);
            LANG.change_innerHTML.push([a, g])
        }
        menu.create_menu();
        menu.mainMenuItem(i8n.Doc, 0, i8n.Doct);
        menu.mainMenuItem(i8n.Tools, 0, i8n.vug);
        menu.mainMenuItem(["Sim"], 0, i8n.sim);
        menu.mainMenuItem(["ASM"], 0, i8n.asm);
        menu.mainMenuItem(["GNL"], 0, "GNL is Not a Language (not yet functional)");
        menu.mainMenuItem(["Tuto"], 0, i8n.tuto);
        menu.mainMenuItem(i8n.Dev, 0, i8n.dvpt);
        j = menu.mainMenuItem(i8n.win, "R"), t(i8n.welc, "welcome");
        t(i8n.fstr, "doc/firstrun");
        t(i8n.Ocultar, winlist.minimizeAll);
        t(i8n.Mostrar, winlist.restoreAll);
        t(i8n.Arco, function () {
            menu.rainbow_i = YGCSS.ColorStylesNames.length;
            menu.iterate_rainbow()
        });
        t(i8n.All, function () {
            menu.key_time = +newDate();
            menu.key_count = winman.keys_list.length;
            menu.iterate_keys()
        });
        t(i8n.Rem, function () {
            menu.key_count = 0;
            winlist.closeAll()
        });
        j = menu.mainMenuItem(["Web"], "R", i8n.web);
        sublink(i8n.Cont, "mailto:whygee@f-cpu.org");
        sublink(i8n.Dnl, "yasep.tbz");
        sublink(i8n.Lic, "license/agpl.txt");
        t([l + 'http://news.yasep.org/">blog</a>']);
        t([l + 'https://www.facebook.com/pages/The-YASEP/167478153314916">facebook</a>']);
        t([l + 'http://yasep.org">yasep.org</a>']);
        sublink(i8n.arc, "http://archives.yasep.org");
        t([l + 'http://defora.org">defora</a>']);
        sublink(i8n.demo, "http://archives.yasep.org/ygwm.mp4");
        sublink(i8n.ygwmd, "gui-js/ygwm.html")
    }
});
INIT(lang_switcher = {
    INIT_func: function () {
        var i, j = menu.mainMenuItem(["LNG"], "R", i8n.SelLn);
        for (i in i8n.LANGS) menu.subMenuItem(j, [LANG.FLAGS[i] = '<div class="flag_' + i8n.LANGS[i] + '"></div>'], function (i) {
            return function () {
                LANG.change_lang(i)
            }
        }(i), 0, i8n.LANGUAGES[i]);
        LANG.change_innerHTML.push([j.firstChild, LANG.FLAGS])
    }
});
winman = {
    base: location.href.split(/\?|#/)[0],
    window_keys: [],
    keys_list: [],
    register_key: function (key, f, m) {
        if (typeof m != "number") m = 1;
        if ((typeof key != "string") || (typeof f != "function")) return alert("Bug\nregister_key : wrong argument type");
        if (winman.window_keys[key]) {
            if (key.substr(0, 4) == "ISM/") return;
            else alert('Bug\nkey "' + key + '" already registered')
        };
        winman.window_keys[key] = {
            n: key,
            func: f,
            on: false,
            multiple: m,
            nr: winman.keys_list.length
        };
        winman.keys_list.push(key)
    },
    eraseCallback: function (w) {
        var k = w.key;
        localStorage.removeItem(w.lsname);
        k.on = false;
        k.win = _
    },
    coord_ondrop: function (w, h) {
        if (!h) h = 1;
        lsPut(w.lsname, (w.x * h) + " " + w.y + " " + w.w + " " + w.h)
    },
    coord_onhide: function (w) {
        winman.coord_ondrop(w, -1)
    },
    coord_onshow: function (w) {
        winman.coord_ondrop(w, 1)
    },
    activate_window: function (s) {
        var key, t, u, v, v2, w;
        if (typeof s != "string") {
            if (t = this.href) {
                u = t.indexOf("#!");
                s = t.slice(u + 2)
            } else return
        }
        u = s.indexOf("#");
        if (u < 0) {
            key = s;
            s = ""
        } else {
            key = s.slice(0, u);
            s = s.slice(u + 1)
        }
        v = key;
        w = winman.window_keys;
        do {
            if (!w[v]) {
                alert(I8N("R") + I8N("WrnKey") + "\n" + key);
                return false
            }
            v2 = v;
            v = w[v]
        } while (typeof v == "string");
        if (v.on == false) {
            v.win = w = v.func(v2, key);
            w.key = v;
            var eCb = w.eraseCallback;
            w.eraseCallback = function (w) {
                eCb && eCb(w);
                winman.eraseCallback(w)
            };
            if (v.multiple === 1) {
                v.on = true;
                if (window.lsGet) {
                    w.lsname = "Win_" + w.key.n;
                    w.ondrop = winman.coord_ondrop;
                    w.onhide = winman.coord_onhide;
                    w.onshow = winman.coord_onshow;
                    winman.coord_ondrop(w, 1)
                }
            }
        } else {
            w = v.win;
            ygwm.center_window(w);
            ygwm.focus_window(null, w)
        }
        if (s != "") {
            if (w.trigger) w.trigger(s);
            else document.location.href = "#" + s
        }
        return w
    },
    autoindex: function (cont, key) {
        var i, a = "",
            b, c = 0,
            h, t = "Index :<br>",
            d = getByClass("autoindex", "DIV", cont);
        if (d) {
            i = cont.firstChild;
            while (i) {
                if ((i.nodeName[0] == "H") && (i.nodeName[1] != "1")) {
                    if (a == "") {
                        a = key + "_" + c++;
                        b = dcE("A");
                        b.name = a;
                        cont.insertBefore(b, i)
                    }
                    for (h = +i.nodeName[1]; h > 0; h--) t += "&nbsp; ";
                    t += '<a href="#' + a + '">' + i.innerHTML + "</a><br>";
                    a = ""
                } else if (i.nodeName == "A") a = i.name;
                i = i.nextSibling
            }
            d.innerHTML = t
        }
    },
    autoKey: 1,
    patchInnerLinks: function (base) {
        if (!base) return;
        var i, s, t, u = base.getElementsByTagName("a"),
            v;
        for (i in u) {
            if (u[i].className == "asm") {
                u[i].href = "#!ASM/asm#a?" + u[i].textContent;
                u[i].onclick = winman.activate_window;
                u[i].className = "asm_active"
            } else {
                if (u[i].className == "disasm") {
                    u[i].href = "#!ASM/asm#d?" + u[i].textContent;
                    u[i].onclick = winman.activate_window;
                    u[i].className = "disasm_active"
                } else {
                    if (u[i].className == "opcode") {
                        u[i].href = "#!ISM/" + u[i].innerHTML;
                        u[i].onclick = winman.activate_window;
                        u[i].className = "opcode_active"
                    } else {
                        if (u[i].href) {
                            t = u[i].href;
                            if ((t.indexOf(winman.base) === 0) && (t[winman.base.length] == "#")) {
                                s = t.indexOf("#!");
                                if (s >= 0) {
                                    t = t.slice(s + 2);
                                    s = t.split("#");
                                    if (winman.window_keys[s[0]]) {
                                        u[i].onclick = winman.activate_window;
                                        u[i].className = "innerLink"
                                    }
                                }
                            } else u[i].target = "_blank"
                        }
                    }
                }
            }
        }
        u = base.getElementsByTagName("pre");
        for (i in u) {
            t = u[i];
            if (t.className == "instr") {
                s = dcE("DIV");
                s.innerHTML = "&nbsp;" + I8N("LstEd") + "&nbsp;";
                s.className = "AsmTag";
                v = dcE("DIV");
                v.appendChild(s);
                v.className = "AsmVoid";
                t.parentNode.insertBefore(v, t);
                s.onclick = winman.editListing
            }
        }
        winman.autoindex(base, "_node_" + winman.autoKey++)
    },
    editListing: function () {
        impASM.importCode(this.parentNode.nextSibling.textContent)
    }
};

function hiddenText(key, base) {
    return getById("hidden" + key, "SPAN", base).innerHTML
}
wa = winman.activate_window;

function adjustHeight(d, height) {
    var g = dcE("DIV"),
        n = dcE("DIV");
    n.style.position = "relative";
    n.style.height = (height || d.scrollHeight) + "px";
    d.parentNode.insertBefore(n, d);
    d.style.height = "100%";
    d.style.overflow = "auto";
    n.appendChild(d);
    g.className = "adjHeight";
    g.innerHTML = "\u21F3";
    g.title = "click to resize";
    g.onmousedown = adjustHeight_click;
    n.appendChild(g);
    return n
}

function adjustHeight_click(e) {
    e.stopPropagation();
    var oldonmouseup = document.onmouseup,
        oldonmousmove = document.onmousemove,
        aH_div = this.parentNode,
        aH_Y = aH_div.scrollHeight - mousePos(e).y;
    document.onmousemove = function (e) {
        e.stopPropagation();
        var h = mousePos(e).y + aH_Y;
        if (h < 30) h = 30;
        aH_div.style.height = h + "px";
        return false
    };
    document.onmouseup = function () {
        document.onmouseup = oldonmouseup;
        document.onmousemove = oldonmousmove
    };
    return false
};

function button(d, n, f, t, m) {
    var c = dcE("BUTTON");
    c.innerHTML = I8N(n);
    if (t) c.title = I8N(t);
    c.onclick = f;
    if (m) c.style.marginRight = m;
    d.appendChild(c);
    return c
}

function h3(c, d, n, u, k) {
    var f, g;
    (f = dcE("DIV")).className = "simTitle";
    g = dcE("SPAN");
    g.innerHTML = '<span>\u25BD</span>&nbsp;' + I8N(n);
    g.style.cursor = "pointer";
    g.onclick = showhideNext;
    g.title = I8N("ctsh");
    f.appendChild(g);
    c.appendChild(f);
    d.style.clear = "both";
    d.style.position = "relative";
    c.appendChild(d);
    if (u) adjustHeight(u, k)
}

function showhideNext() {
    var a = this.firstChild,
        b = toggle(this.parentNode.nextSibling);
    if (a.nodeName == "SPAN") a.innerHTML = (b == "block") ? "\u25BD" : "\u25B7"
};
INIT(dragndrop = {
    dragdropstate: 0,
    destination: null,
    selected: null,
    happy_messages: true,
    trash_message_delay: null,
    trash_message_erase: function (msg) {
        dragndrop.message_id.innerHTML = "&nbsp;";
        if (dragndrop.dragdropstate == 0) dragndrop.trash_div_id.style.display = "none";
        dragndrop.trash_message_delay = _
    },
    trash_message: function (msg) {
        clearTimeout(dragndrop.trash_message_delay);
        if (dragndrop.happy_messages) {
            var l = LNG,
                m = i8n[msg];
            if (!m[l]) l = 0;
            m = m[l];
            dragndrop.message_id.innerHTML = m[intrnd(m.length)]
        }
        dragndrop.trash_message_delay = setTimeout(dragndrop.trash_message_erase, 3E3)
    },
    trash_open: false,
    trash_mouseover: function () {
        if (dragndrop.dragdropstate > 0) {
            dragndrop.trash_message("ready");
            dragndrop.trash_image_id.style.right = "48px";
            dragndrop.trash_open = true
        }
        return true
    },
    trash_mouseout: function (n) {
        if (dragndrop.dragdropstate) {
            if (typeof n != "string") n = "sad";
            dragndrop.trash_message(n)
        }
        if (dragndrop.trash_open) {
            dragndrop.trash_image_id.style.right = "0px";
            dragndrop.trash_open = false
        }
        return false
    },
    start_move: function (ev) {
        if (B.onmouseup) document.onmouseup(ev);
        if (this.dnd.trashBin == true) {
            if (!dragndrop.trash_div_id) {
                var tr = (dragndrop.transport_div = dcE("DIV")),
                    div = (dragndrop.trash_div_id = dcE("DIV")),
                    fr = (dragndrop.trash_frame_id = dcE("DIV")),
                    msg = (dragndrop.message_id = dcE("DIV")),
                    img = (dragndrop.trash_image_id = dcE("IMG"));
                div.id = "trash_div";
                fr.id = "trash_frame";
                img.id = "trash_image";
                msg.id = "trash_msg";
                tr.style.zIndex = div.style.zIndex = ygwm.noScrollIndex;
                img.onmouseover = dragndrop.trash_mouseover;
                img.onmouseout = dragndrop.trash_mouseout;
                img.src = "img/trash.png";
                fr.appendChild(img);
                div.appendChild(fr);
                div.appendChild(msg);
                document.body.appendChild(div);
                tr.id = "transport";
                document.body.appendChild(tr)
            }
            dragndrop.trash_message("happy");
            dragndrop.trash_div_id.style.top = (5 + menu.mainMenu_id.scrollHeight) + "px";
            dragndrop.trash_div_id.style.display = "block"
        }
        ygwm.moved_div = dragndrop.moved_item = this.dndroot;
        dragndrop.selected = this;
        dragndrop.dragdropstate = this.dnd.state;
        document.onmouseup = dragndrop.end_move;
        document.onmousemove = ygwm.autoScroll;
        document.body.style.cursor = 'move';
        if (typeof this.dnd.ondrag == "function") this.dnd.ondrag(this.dndroot);
        return false
    },
    end_move: function () {
        var m = dragndrop.selected,
            n = "sad";
        if (dragndrop.trash_open) {
            m.dnd.ondelete(m.dndroot);
            n = "repu"
        } else if (typeof m.dnd.ondrop == "function") m.dnd.ondrop();
        if (dragndrop.trash_div_id && dragndrop.trash_div_id.style.display == "block") dragndrop.trash_mouseout(n);
        dragndrop.dragdropstate = 0;
        document.body.style.cursor = 'auto';
        document.onmouseup = document.onmousemove = ygwm.moved_div = dragndrop.moved_item = dragndrop.destination = null;
        return false
    },
    register: function (div, args, root) {
        div.onmousedown = dragndrop.start_move;
        if (typeof args.state != "number") Al8n("crsn");
        if (args.trashBin === true && typeof args.ondelete != "function") Al8n("rtno", "", div.className);
        if (typeof root == "undefined") root = div;
        div.dnd = args;
        div.dndroot = root
    },
    INIT_func: function () {}
});
ISM = {
    start: function (opc, orig_alias) {
        opc = opc.slice(4);
        orig_alias = orig_alias.slice(4);
        var cont = dcE("DIV"),
            op = orig_alias,
            e, h = '0',
            z = s = u = m = "";
        if (Y.table_opcode[op]) {
            if ((opc == "UMIN") || (opc == "UMAX") || (opc == "SMIN") || (opc == "SMAX")) {
                z = I8N("ISM3");
                m += I8N("ISM4")
            }
            if ((opc == "ROR") || (opc == "ROL")) m += I8N("ISM5");
            if ((opc == "CMPU") || (opc == "CMPS") || (opc == "CMPE")) m += I8N("ISM6");
            if (Y.opcode_aliases[opc]) m += I8N("ISM9") + Y.opcode_aliases[opc] + I8N("ISM10");
            var o = Y.table_opcode[op];
            t = o.val, e = t & Y.FIELD_GROUP, f = o.forms, g = o.flags;
            s = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Opcode : " + op + "\n" + I8N("ISM11") + int2hex(t) + "\n";
            if (Y.GroupNames[e]) s += I8N("ISM12") + Y.GroupNames[e].slice(6) + "\n";
            if (g & (Y.CHANGE_CARRY | Y.CHANGE_EQUAL)) m += I8N("ISMc");
            if (e == Y.GROUP_MUL) m += I8N("ISM13");
            if (g & Y.IMM16_5LSB) m += I8N("ISM14");
            if (g & Y.IMM16_8LSB) m += I8N("ISM15");
            if (op != "NOT") h = 'SI4&nbsp;(r/i4/i16)';
            if (e == Y.GROUP_ROP2) {
                if (op != "NOT") h = 'SI4&nbsp;(r/i4/i16)';
                m += '<center><table border="0" style="vertical-align:middle;text-align:right"><tr><td>SND (reg)</td>' + '<td rowspan="2"><div style="width:80px;height:60px;background: url(img/gates_80.png) no-repeat 0px -' + ((t >> 5) * 60) + 'px"></td>' + '<td rowspan="2">result</td></tr><tr><td>' + h + '</td></tr></table></center><p><table border="1">' + '<tr><td>si4</td><td>snd</td><td></td><td><a href="#!ISM/AND">AND</a></td><td><a href="#!ISM/ANDN">ANDN</a></td>' + '<td><a href="#!ISM/NAND">NAND</a></td><td><a href="#!ISM/OR">OR</a></td><td><a href="#!ISM/ORN">ORN</a></td><td>' + '<a href="#!ISM/NOR">NOR</a></td><td><a href="#!ISM/XOR">XOR</a></td><td><a href="#!ISM/XORN">XORN</a></td></tr>' + '<tr><td>0</td><td>0</td><td></td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>' + '<tr><td>0</td><td>1</td><td></td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>' + '<tr><td>1</td><td>0</td><td></td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td></tr>' + '<tr><td>1</td><td>1</td><td></td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>' + '</table></p>'
            }
            if (g & Y.OPTIONAL) m += I8N("ISM16");
            if (g & Y.Preliminary) m += I8N("ISM17");
            if (g & Y.YASEP32_ONLY) {
                u = ".profile YASEP32\n";
                m += I8N("ISM18")
            }
            if (typeof (Y.opcode_aliases[opc]) != "string" && ((typeof (Y.opcode_table[t].action32) == "function") || (typeof (Y.opcode_table[t].action16) == "function"))) m += I8N("ISM20");
            if (o.description) s += I8N("ISM21") + o.description + "\n";
            s += I8N("ISM22") + Y.form2html(f) + "\n";
            var i, j, k, n, fill = "                ";
            for (i in Y.TableForm) {
                if (f & i) {
                    j = Y.TableForm[i];
                    k = j.replace(/FORM_/, "");
                    n = Y.TableEncoders[j].ex(g, op);
                    if (n != "") n = op + " " + n;
                    else n = op;
                    u += '; <a href="#!doc/forms#FORM_' + k + '">' + j + "</a>\n" + '<a class="asm">' + n + "</a>\n";
                    if ((i & Y.FORMS_EXTENDABLE) && ((g & Y.NO_CONDITION) == 0)) u += I8N("ISM23") + '<a class="asm">' + n + " " + Y.randomCondition() + "</a>\n"
                }
            }
            if (g > 0) {
                s += I8N("ISM24");
                for (i in Y.TableFlags) {
                    if (g & i) {
                        s += ' <a href="#!doc/flags#' + Y.TableFlags[i].replace(/FLAG_/, "") + '">' + Y.TableFlags[i] + "</a>"
                    }
                }
                s += "\n"
            }
        }
        cont.innerHTML = import_htmi("ISM/" + orig_alias) + z + '<p id="doc">' + m + '</p><h3>' + I8N("ISM1") + '</h3>\n' + '<pre class="instr">' + u + '</pre>\n<h3>' + I8N("ISM2") + '</h3><div id="dump">' + s + '</div>\n';
        win = ygwm.new_window("Opcode " + orig_alias, null, cont, 500, 400, 250, 250, false, true, true, true, false, "doc_yelo");
        if (e = getById("rotrol", "ul", cont)) e.innerHTML = I8N("ISM7");
        if (e = getById("Mul", "div", cont)) e.innerHTML = I8N("ISM8");
        winman.patchInnerLinks(cont);
        return win
    }
};
var Y = {
    TableForm: [],
    MAX_FORM: 1,
    random_register: function (r1, r2) {
        var c;
        do c = Y.registers_names[intrnd(16)]; while ((c === r1) || (c === r2));
        return c
    },
    random_Imm4: function (f) {
        var m = 7;
        if (f & Y.IMM_LSB) m = 3;
        return intrnd(m) + 1
    },
    random_Imm16: function (f) {
        var a = 256,
            b = 32768 - a;
        if (f & Y.IMM20) b = 1 << 19 - a;
        else {
            if (f & Y.IMM16_5LSB) a = b = 16;
            else {
                if (f & Y.IMM16_8LSB) {
                    a = 32;
                    b = 256 - a
                }
            }
        }
        return a + intrnd(b)
    },
    encode_snd: function (data, t) {
        t.encoded_instruction |= data << Y.OFFSET_SND;
        t.encoded_fields |= Y.FIELD_SND;
        return true
    },
    encode_si4: function (data, t) {
        t.encoded_instruction |= data << Y.OFFSET_SI4;
        t.encoded_fields |= Y.FIELD_SI4;
        return true
    },
    encode_dst: function (data, t) {
        t.encoded_instruction |= data << Y.OFFSET_DST;
        t.encoded_fields |= Y.FIELD_DST;
        return true
    },
    encode_src4: function (data, t) {
        t.encoded_instruction |= data << Y.OFFSET_CND;
        return true
    },
    check_imm16: function (i, flags, t) {
        var a = t.asm_operands[i],
            c = 16;
        if (flags & Y.IMM16_5LSB) {
            if (t.YASEP_TYPE == 16) c = 4;
            else c = 5
        } else {
            if (flags & Y.IMM16_8LSB) c = 8
        }
        if ((flags & Y.IMM20) && (t.YASEP_TYPE != 16)) {
            Y.encode_snd((a >> 16) & 15, t);
            c = 20
        }
        var d = (1 << c) - 1,
            b = a & d;
        t.encoded_instruction |= 1 | (b << 16);
        t.encoded_fields |= d << 12;
        t.encoded_size_bytes = 4;
        if (((a > 0) && (a > d)) || ((a < 0) && (a < -((d + 1) >> 1)))) t.add_message("orange", I8N("W") + "Imm16 " + I8N("lsbx") + c + I8N("lsbx2"));
        return true
    },
    check_i: function (a, flags, t) {
        if ((t.X == 1) && !(t.encoded_instruction & Y.FIELD_SND)) {
            t.add_message("green", "Imm4: " + a + "=>" + Y.Imm4_PC[a]);
            a = Y.Imm4_PC[a];
            if (typeof a != "number") {
                t.add_message("red", "Wrong number (can't translate operand for PC");
                return false
            }
        }
        var b, c = 4,
            d;
        if (flags & Y.IMM_LSB) {
            if (t.YASEP_TYPE == 16) c = 1;
            else c = 2
        }
        d = (1 << c) - 1;
        b = a & d;
        if (((a > 0) && (a > d)) || ((a < 0) && (a < -((d + 1) >> 1)))) t.add_message("orange", I8N("W") + "Imm4 " + I8N("lsbx") + c + I8N("lsbx2"));
        t.encoded_fields |= d << Y.OFFSET_SI4;
        t.encoded_instruction |= b << Y.OFFSET_SI4 | ((t.X == 1) ? Y.FIELD_AUX : Y.FIELD_EXTFORM);
        return true
    },
    force_extended_form: function (t) {
        t.X = 1;
        t.encoded_instruction |= 3;
        t.encoded_size_bytes = 4;
        t.encoded_fields |= Y.FIELD_AUX | Y.FIELD_CNDCODE | Y.FIELD_CND
    },
    TableEncoders: {
        "FORM_ALONE": {
            ex: function () {
                return ""
            },
            en: function () {
                return true
            },
            de: function () {
                return "FORM_ALONE_F, AO_0()"
            },
            lsb: function () {
                return 0
            }
        },
        "FORM_R": {
            ex: function () {
                return Y.random_register()
            },
            en: function (f, t) {
                Y.encode_snd(t.asm_operands[1], t);
                if (f & Y.ALIAS_RR) {
                    if (t.X == 1) Y.encode_dst(t.asm_operands[1], t);
                    else Y.encoded_instruction |= 2;
                    Y.check_i(0, f, t)
                } else if (f & Y.NO_WRITEBACK) {
                    t.add_message("red", "Sorry, don't know how to encode this instruction");
                    return false
                }
                return true
            },
            de: function () {
                return "FORM_iR_F   , AO_1(OP_REG) /*!*/"
            },
            lsb: function () {
                return 2
            }
        },
        "FORM_RR": {
            ex: function (x, y) {
                var a, b = "";
                if (y == "CALL") b = "PC";
                a = Y.random_register(b);
                return a + " " + Y.random_register(a, b)
            },
            en: function (f, t) {
                if (f & Y.ALIAS_RR) {
                    Y.force_extended_form(t);
                    Y.encode_snd(t.asm_operands[1], t);
                    Y.encode_dst(t.asm_operands[2], t);
                    Y.check_i(0, f, t)
                } else {
                    Y.encode_si4(t.asm_operands[1], t);
                    if (t.X == 1) Y.encode_dst(t.asm_operands[2], t);
                    Y.encode_snd(t.asm_operands[2], t)
                }
                return true
            },
            de: function (f) {
                if (f & Y.ALIAS_RR) return "FORM_iRR_F  , AO_2(OP_REG,OP_REG) /*!*/";
                return "FORM_RR_F   , AO_2(OP_REG,OP_REG)"
            },
            lsb: function (f) {
                if (f & Y.ALIAS_RR) return 3;
                return 0
            }
        },
        "FORM_i": {
            ex: function () {
                return Y.random_Imm4()
            },
            en: function (f, t) {
                return Y.check_i(t.asm_operands[1], f, t)
            },
            de: function () {
                return "FORM_i_F    , AO_1(OP_IMM4)"
            },
            lsb: function () {
                return 2
            }
        },
        "FORM_iR": {
            ex: function (x, y) {
                var b = "";
                if (y == "CALL") b = "PC";
                return Y.random_Imm4() + " " + Y.random_register(b)
            },
            en: function (f, t, X) {
                if (t.X == 1) Y.encode_dst(t.asm_operands[2], t);
                Y.encode_snd(t.asm_operands[2], t);
                return Y.check_i(t.asm_operands[1], f, t)
            },
            de: function () {
                return "FORM_iR_F   , AO_2(OP_IMM4,OP_REG)"
            },
            lsb: function () {
                return 2
            }
        },
        "FORM_IRR": {
            ex: function (f) {
                var a = Y.random_register();
                return Y.random_Imm16(f) + " " + a + " " + Y.random_register(a)
            },
            en: function (f, t) {
                if (!Y.check_imm16(1, f, t)) return false;
                Y.encode_snd(t.asm_operands[2], t);
                return Y.encode_si4(t.asm_operands[3], t)
            },
            de: function (f) {
                var i = "FORM_IRR_F  , AO_3(OP_IMM";
                if (f & Y.IMM16_5LSB) return i + "5 ,OP_REG,OP_REG)";
                if (f & Y.IMM16_8LSB) return i + "8 ,OP_REG,OP_REG)";
                return i + "16,OP_REG,OP_REG)"
            },
            lsb: function () {
                return 1
            }
        },
        "FORM_IR": {
            ex: function (f, y) {
                var b = "";
                if (y == "CALL") b = "PC";
                return Y.random_Imm16(f) + " " + Y.random_register(b)
            },
            en: function (f, t) {
                if (!Y.check_imm16(1, f, t)) return false;
                var u = t.asm_operands[2];
                if (f & Y.ALIAS_IRR) Y.encode_si4(u, t);
                return Y.encode_snd(u, t)
            },
            de: function (f) {
                var i = "FORM_IR_F   , AO_2(OP_IMM";
                if (f & Y.IMM20) return i + "20,OP_REG)";
                if (f & Y.IMM16_5LSB) return i + "5 ,OP_REG)";
                if (f & Y.IMM16_8LSB) return i + "8 ,OP_REG)";
                return i + "16,OP_REG)"
            },
            lsb: function () {
                return 1
            }
        },
        "FORM_RRR": {
            ex: function () {
                var a = Y.random_register();
                var b = Y.random_register(a);
                return a + " " + b + " " + Y.random_register(a, b)
            },
            en: function (f, t) {
                Y.force_extended_form(t);
                Y.encode_si4(t.asm_operands[1], t);
                Y.encode_snd(t.asm_operands[2], t);
                Y.encode_dst(t.asm_operands[3], t);
                return true
            },
            de: function () {
                return "FORM_RRR_F  , AO_3(OP_REG,OP_REG,OP_REG)"
            },
            lsb: function () {
                return 3
            }
        },
        "FORM_iRR": {
            ex: function (f) {
                var a = Y.random_register();
                return ((a == 0) ? Y.PC_Imm4[intrnd(16)] : Y.random_Imm4(f)) + " " + a + " " + Y.random_register(a)
            },
            en: function (f, t) {
                Y.force_extended_form(t);
                Y.encode_snd(t.asm_operands[2], t);
                Y.encode_dst(t.asm_operands[3], t);
                return Y.check_i(t.asm_operands[1], f, t)
            },
            de: function (f) {
                return "FORM_iRR_F  , AO_3(OP_IMM" + (f & Y.IMM_LSB) ? 2 : 4 + ",OP_REG,OP_REG)"
            },
            lsb: function () {
                return 3
            }
        }
    },
    form2html: function (form, t, n) {
        var j = 1,
            k, a = "";
        if (!n) n = 0;
        do {
            if (form & j) {
                k = Y.TableForm[j];
                k = k.slice(5);
                n++;
                if ((n > 3) && (t == 1)) {
                    a += ",<br>";
                    n = 1
                } else if (n > 1) a += ",";
                a += '<a class="innerLink" onclick="wa(\'doc/forms#FORM_' + k + '\')" href="#!doc/forms#FORM_' + k + '">' + k + "</a>"
            }
            j <<= 1
        } while (j <= form);
        return a
    }
};
for (var i in Y.TableEncoders) {
    Y.TableForm[Y[i] = Y.MAX_FORM] = i;
    Y.MAX_FORM *= 2
};
Y.FORMS_R = Y.FORM_ALONE | Y.FORM_R | Y.FORM_RR;
Y.FORMS_i = Y.FORM_i | Y.FORM_iR;
Y.FORMS_SHORT = Y.FORMS_i | Y.FORMS_R;
Y.FORMS_I = Y.FORM_IRR | Y.FORM_IR;
Y.FORMS_EXTENDED = Y.FORM_RRR | Y.FORM_iRR;
Y.FORMS_EXTENDABLE = Y.FORMS_EXTENDED | Y.FORMS_i | Y.FORMS_R;
Y.Imm4_PC = {};
Y.PC_Imm4 = {};
for (var i = -8; i < 8; i++) {
    var j = i << 1;
    if (!(j & 8)) j |= 16;
    Y.PC_Imm4[Y.Imm4_PC[j] = i & 15] = j
};
F2 = 255;
F4 = 65535;
F8 = 0xFFFFFFFF;
Y.FIELD_IMMREG = 1;
Y.FIELD_EXTFORM = 2;
Y.FIELD_GROUP = 28;
Y.FIELD_FUNCTION = 224;
Y.FIELD_OPCODE = 252;
Y.FIELD_SND = 3840;
Y.FIELD_SI4 = 61440;
Y.FIELD_IMM6 = 258048;
Y.FIELD_IMM16 = F4 << 12;
Y.FIELD_UPD2 = 3 << 18;
Y.FIELD_UPD4 = 983040;
Y.FIELD_AUX = 1 << 20;
Y.FIELD_CNDCODE = 7 << 21;
Y.FIELD_CNDNEG = 1 << 21;
Y.FIELD_CNDBIT = 1 << 23;
Y.FIELD_CND = 15 << 24;
Y.FIELD_DST = 15 << 28;
Y.OFFSET_SND = 8;
Y.OFFSET_SI4 = 12;
Y.OFFSET_CNDCODE = 21;
Y.OFFSET_CND = 24;
Y.OFFSET_DST = 28;
Y.MAX_FLAG = 1;
Y.TableFlags = [];
Y.TableFlagsDesc = [];
(function (l) {
    for (var i in l) {
        var n = l[i][0],
            d = l[i][1];
        Y[n] = Y.MAX_FLAG;
        Y.TableFlags[Y.MAX_FLAG] = n;
        Y.TableFlagsDesc[Y.MAX_FLAG] = d;
        Y.MAX_FLAG *= 2
    }
}([
    ["OPTIONAL", "Opt"],
    ["Preliminary", "PRE"],
    ["YASEP16_ONLY", "Y16"],
    ["YASEP32_ONLY", "Y32"],
    ["ALIAS_RR", "aRR"],
    ["ALIAS_IRR", "aIRR"],
    ["NO_CONDITION", "!Cnd"],
    ["IMM_LSB"],
    ["IMM16_5LSB"],
    ["IMM16_8LSB"],
    ["IgnoreImmSign"],
    ["NO_WRITEBACK", "!WR"],
    ["ABORT_WRITE", "aWR"],
    ["CHANGE_CARRY", "C"],
    ["CHANGE_EQUAL", "Eq"],
    ["IGNORE_SND_SHORT", "!snd"],
    ["IGNORE_SND_LONG", "!SND"],
    ["IGNORE_SI4", "!SI4"],
    ["IGNORE_IMM16", "!I16"],
    ["IMM20", "I20"],
    ["READ_DST", "rD"]
]));
Y.flags2html = function (flag) {
    var s = "",
        i = 1,
        j = 0,
        t;
    while (i <= flag) {
        if ((flag & i) && (Y.TableFlagsDesc[i])) {
            if (j++ == 3) s += "<br>", j = 0;
            t = Y.TableFlags[i];
            s += ' <a class="innerLink" onclick="wa(\'doc/flags#' + t + '\')" href="#!doc/flags#' + t + '">' + Y.TableFlagsDesc[i] + "</a>"
        }
        i <<= 1
    }
    return s
};
Y.keywords = {};
Y.registers_names = ["PC", "R1", "R2", "R3", "R4", "R5", "D1", "A1", "D2", "A2", "D3", "A3", "D4", "A4", "D5", "A5"];
Y.names_registers = [];
for (var i = 0; i < 16; i++) {
    Y.keywords[Y.registers_names[i]] = true;
    Y.names_registers[Y.registers_names[i]] = i
}
Y.prefix = 0;
Y.opcode_table = [];
Y.table_opcode = [];
Y.opcode_aliases = [];
Y.NewOpcode = function (name, action32, action16, forms, flags, description, check) {
    if (Y.table_opcode[name] != undefined) {
        alert(I8N("woad") + name + I8N("woad2"));
        return
    }
    Y.keywords[name] = true;
    Y.table_opcode[name] = {
        val: Y.prefix,
        forms: forms,
        flags: flags,
        description: description,
        check: check
    };
    Y.opcode_table[Y.prefix] = {
        name: name,
        action32: action32,
        action16: action16,
        forms: forms,
        flags: flags,
        description: description
    };
    Y.prefix += 32;
    if (window.winman) winman.register_key("ISM/" + name, ISM.start)
};
Y.NewAlias = function (name, aliasTo, forms, flags, description) {
    if (window.winman) winman.register_key("ISM/" + name, ISM.start);
    Y.NewOpcode(name, null, null, forms, flags, description);
    Y.opcode_aliases[name] = aliasTo;
    Y.prefix -= 32
};
Y.NoOpcode = function () {
    Y.prefix += 32
};
Y.decorate_opcode = function (opcode) {
    var t = opcode,
        d = Y.table_opcode,
        h;
    if (typeof opcode == "number") {
        t = Y.opcode_table[opcode].name;
        d = Y.opcode_table
    }
    h = '<a onclick="wa(\'ISM/' + t + '\')" href="#!ISM/' + t + '" class="';
    if (Y.opcode_aliases[t]) h += "alias_active";
    else h += "opcode_active";
    return h + '" title="' + d[opcode].description + '">' + t + "</a>"
};
Y.GroupNames = [];
Y.newGroupName = function (name, val) {
    Y[name] = val;
    Y.GroupNames[val] = name
};
Y.newGroupName("GROUP_CTL", 0);
Y.newGroupName("GROUP_SMT", 4);
Y.newGroupName("GROUP_IE", 8);
Y.newGroupName("GROUP_SHL", 12);
Y.newGroupName("GROUP_ROP2", 16);
Y.newGroupName("GROUP_ASU", 20);
Y.newGroupName("GROUP_MUL", 24);
Y.newGroupName("GROUP_RSV", 28);
Y.tableConditionAll = {
    "ZERO": [0, 1, 0],
    "ALWAYS": [0, 0, 1],
    "NZ": [1, 1, 0],
    "NEVER": [1, 0, 0],
    "BIT1": [2, 2, 0],
    "BIT0": [3, 2, 0],
    "LSB1": [4, 1, 0],
    "ODD": [4, 1, 1],
    "CARRY": [4, 0, 0],
    "NO_BORROW": [4, 0, 1],
    "LSB0": [5, 1, 0],
    "EVEN": [5, 1, 1],
    "NO_CARRY": [5, 0, 0],
    "BORROW": [5, 0, 1],
    "MSB1": [6, 1, 0],
    "NEGATIVE": [6, 1, 1],
    "EQ": [6, 0, 0],
    "MSB0": [7, 1, 0],
    "POSITIVE": [7, 1, 1],
    "NEQ": [7, 0, 0]
};
Y.conditionTable = [];
for (var i in Y.tableConditionAll) {
    Y.keywords[i] = true;
    if (Y.tableConditionAll[i][2] == 0) Y.conditionTable.push(i)
}
Y.randomCondition = function () {
    var r, l = intrnd(Y.conditionTable.length),
        m = Y.conditionTable[l],
        n = Y.tableConditionAll[m];
    if (n[1] == 1) return m + " " + Y.random_register("PC");
    if (n[1] == 2) return m + " " + intrnd(16);
    return m
};
Y.opcodeInterface = function (o) {
    o.carry = o.equal = o.result = null;
    o.dst = o.snd = o.si4 = 0
};
Y.prefix = Y.GROUP_CTL;
Y.NewOpcode("NOP", null, null, Y.FORM_ALONE, Y.NO_WRITEBACK | Y.NO_CONDITION | Y.IGNORE_SND_SHORT | Y.IGNORE_SND_LONG | Y.IGNORE_SI4 | Y.IGNORE_IMM16, "Do nothing");
Y.NewOpcode("CRIT", null, null, Y.FORM_i, Y.IgnoreImmSign | Y.NO_WRITEBACK | Y.NO_CONDITION | Y.IGNORE_SND_LONG | Y.IGNORE_SND_SHORT | Y.IGNORE_SI4 | Y.IGNORE_IMM16 | Y.OPTIONAL, "Start a CRITical section: disable IRQs for imm4 instructions");
Y.NewOpcode("GET", null, null, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.IGNORE_SND_LONG, "Read from the Special Registers space");
Y.NewOpcode("PUT", null, null, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.NO_WRITEBACK | Y.NO_CONDITION, "Write to the Special Registers space");
Y.NewOpcode("IN", null, null, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.Preliminary, "Read data from I/O on data bus");
Y.NewOpcode("OUT", null, null, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.Preliminary | Y.NO_WRITEBACK | Y.NO_CONDITION, "Send data to I/O on the address bus");
Y.NewOpcode("CALL", null, null, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.IMM20 | Y.IGNORE_SND_LONG, "Jump to SI4/IMM16/IMM20 (R/I/i) and write the NPC to SND", function (t, a, p) {
    for (var i = 1; i < a.length; i++)
        if (a[i] == "PC") {
            t.add_message("red", I8N("ctl1"));
            return false
        } return true
});
Y.NewOpcode("CALL2", null, null, Y.FORM_RRR | Y.FORM_IRR | Y.FORM_iRR, Y.Preliminary, "Jump to SND+(SI4/IMM16) and write the NPC to SND/DST");
Y.prefix = Y.GROUP_ASU;

function carry_16(a, b) {
    return (((a ^ F4) + 1) + b) >> 16
}

function carry_ADD32(a, b) {
    var res = (b & F4) + (a & F4);
    res = ((b >> 16) & F4) + ((a >> 16) & F4) + ((res >> 16) & 1);
    return (res >> 16) & 1
}

function carry_SUB32(a, b) {
    return carry_ADD32((a ^ F8) + 1, b)
}
Y.NewOpcode("ADD", function (s) {
    s.result = (s.snd + s.si4) & F8;
    s.carry = carry_ADD32(s.snd, s.si4)
}, function (s) {
    s.result = s.snd + s.si4;
    s.carry = 1 & (s.result >> 16);
    s.result &= F4
}, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.ALIAS_IRR | Y.CHANGE_CARRY, "Addition");
Y.NewAlias("NEG", "SUB", Y.FORM_RR | Y.FORM_R, Y.ALIAS_RR | Y.CHANGE_CARRY, "arithmetic negation");
Y.NewOpcode("SUB", function (s) {
    s.result = (s.si4 - s.snd) & F8;
    s.carry = carry_SUB32(s.snd, s.si4)
}, function (s) {
    s.result = (s.si4 - s.snd) & F4;
    s.carry = carry_16(s.snd, s.si4)
}, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.ALIAS_IRR | Y.CHANGE_CARRY, "Subtraction");
Y.NewAlias("CMPE", "CMPU", Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.NO_WRITEBACK | Y.CHANGE_CARRY | Y.CHANGE_EQUAL, "CoMPare for Equality");
Y.NewOpcode("CMPU", function (s) {
    s.carry = carry_SUB32(s.snd, s.si4);
    s.equal = s.snd ^ s.si4 ? 0 : 1
}, function (s) {
    s.carry = carry_16(s.snd, s.si4);
    s.equal = s.snd ^ s.si4 ? 0 : 1
}, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.NO_WRITEBACK | Y.CHANGE_CARRY | Y.CHANGE_EQUAL, "unsigned subtract the 2 operands and update the flags");
Y.NewOpcode("CMPS", function (s) {
    s.carry = carry_SUB32(s.snd ^ 1 << 31, s.si4 ^ 1 << 31);
    s.equal = s.snd ^ s.si4 ? 0 : 1
}, function (s) {
    s.carry = carry_16(s.snd ^ 32768, s.si4 ^ 32768);
    s.equal = s.snd ^ s.si4 ? 0 : 1
}, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.NO_WRITEBACK | Y.CHANGE_CARRY | Y.CHANGE_EQUAL, "signed subtract the 2 operands and update the flags");
Y.NewOpcode("UMIN", function (s) {
    if (!carry_SUB32(s.snd, s.si4)) s.result = s.si4
}, function (s) {
    if (!carry_16(s.snd, s.si4)) s.result = s.si4
}, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.ABORT_WRITE | Y.ALIAS_IRR, "Set dest to imm16/si4 if snd's value is less (unsigned) than imm16/si4");
Y.NewOpcode("SMIN", function (s) {
    if (!carry_SUB32(s.snd ^ 1 << 31, s.si4 ^ 1 << 31)) s.result = s.si4
}, function (s) {
    if (!carry_16(s.snd ^ 32768, s.si4 ^ 32768)) s.result = s.si4
}, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.ABORT_WRITE | Y.ALIAS_IRR, "Set dest to imm16/si4 if snd's value is less (signed) than imm16/si4");
Y.NewOpcode("UMAX", function (s) {
    if (carry_SUB32(s.snd, s.si4)) s.result = s.si4
}, function (s) {
    if (carry_16(s.snd, s.si4)) s.result = s.si4
}, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.ABORT_WRITE | Y.ALIAS_IRR, "Set dest to imm16/si4 if snd's value is greater (unsigned) than imm16/si4");
Y.NewOpcode("SMAX", function (s) {
    if (carry_SUB32(s.snd ^ 1 << 31, s.si4 ^ 1 << 31)) s.result = s.si4
}, function (s) {
    if (carry_16(s.snd ^ 32768, s.si4 ^ 32768)) s.result = s.si4
}, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.ABORT_WRITE | Y.ALIAS_IRR, "Set dest to imm16/si4 if snd's value is greater (signed) than imm16/si4");
Y.prefix = Y.GROUP_ROP2;
var f = Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_RRR | Y.FORM_iRR,
    g = Y.ALIAS_IRR;
Y.NewOpcode("AND", function (s) {
    s.result = (s.si4 & s.snd) & F8
}, function (s) {
    s.result = (s.si4 & s.snd) & F4
}, f, g, "Boolean AND");
Y.NewOpcode("ANDN", function (s) {
    s.result = (s.si4 & ~s.snd) & F8
}, function (s) {
    s.result = (s.si4 & ~s.snd) & F4
}, f, g, "Boolean AND with one negated input");
Y.NewOpcode("NAND", function (s) {
    s.result = ~(s.si4 & s.snd) & F8
}, function (s) {
    s.result = ~(s.si4 & s.snd) & F4
}, f, g, "Boolean AND with negated output");
Y.NewAlias("NOT", "ORN", Y.FORM_RR | Y.FORM_R, Y.ALIAS_RR, "Boolean negation (alias to ORN)");
Y.NewOpcode("ORN", function (s) {
    s.result = (s.si4 | ~s.snd) & F8
}, function (s) {
    s.result = (s.si4 | ~s.snd) & F4
}, f, g, "Boolean OR with one negated input");
Y.NewOpcode("OR", function (s) {
    s.result = (s.si4 | s.snd) & F8
}, function (s) {
    s.result = (s.si4 | s.snd) & F4
}, f, g, "Boolean OR");
Y.NewOpcode("NOR", function (s) {
    s.result = ~(s.si4 | s.snd) & F8
}, function (s) {
    s.result = ~(s.si4 | s.snd) & F4
}, f, g, "Boolean OR with negated output");
Y.NewOpcode("XOR", function (s) {
    s.result = (s.si4 ^ s.snd) & F8
}, function (s) {
    s.result = (s.si4 ^ s.snd) & F4
}, f, g, "Boolean XOR");
Y.NewOpcode("XORN", function (s) {
    s.result = (s.si4 ^ ~s.snd) & F8
}, function (s) {
    s.result = (s.si4 ^ ~s.snd) & F4
}, f, g, "Boolean XOR with negated output");
Y.prefix = Y.GROUP_SHL;
var f = Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR,
    g = Y.IMM16_5LSB | Y.IgnoreImmSign | Y.ALIAS_IRR;
Y.NewOpcode("SHR", function (s) {
    var t = s.si4 & 31;
    if (t == 0) s.result = s.snd;
    else s.result = s.snd >>> t
}, function (s) {
    var t = s.si4 & 15;
    if (t == 0) s.result = s.snd & F4;
    else s.result = (s.snd >>> t) & F4
}, f, g, "SHift logic Right");
Y.NewOpcode("SHRO", function (s) {
    var t = s.si4 & 31;
    if (t == 0) s.result |= s.snd;
    else s.result |= s.snd >>> t
}, function (s) {
    var t = s.si4 & 15;
    if (t == 0) s.result |= s.snd & F4;
    else s.result |= (s.snd >>> t) & F4
}, Y.FORM_IRR | Y.FORM_iRR | Y.FORM_RRR, Y.IMM16_5LSB | Y.IgnoreImmSign | Y.READ_DST | Y.OPTIONAL, "SHift logic Right and OR");
Y.NewOpcode("SAR", function (s) {
    s.result = s.snd >> (s.si4 & 31)
}, function (s) {
    s.result = (s.snd >> (s.si4 & 15)) & F4
}, f, g, "Shift Arithmetic Right");
Y.NewOpcode("SHL", function (s) {
    s.result = s.snd << (s.si4 & 31)
}, function (s) {
    s.result = (s.snd << (s.si4 & 15)) & F4
}, f, g, "SHift logic Left");
Y.NewOpcode("SHLO", function (s) {
    s.result |= s.snd << (s.si4 & 31)
}, function (s) {
    s.result |= (s.snd << (s.si4 & 15)) & F4
}, Y.FORM_IRR | Y.FORM_iRR | Y.FORM_RRR, Y.IMM16_5LSB | Y.IgnoreImmSign | Y.READ_DST | Y.OPTIONAL, "SHift logic Left and OR");
Y.NewOpcode("ROR", function (s) {
    var sa = s.si4 & 31;
    var sb = (32 - sa) & 31;
    s.result = (s.snd << sb) | (s.snd >>> sa)
}, function (s) {
    var sa = s.si4 & 15;
    var sb = (16 - sa) & 15;
    s.result = ((s.snd << sb) | (s.snd >>> sa)) & F4
}, f, g, "ROtate Right");
Y.NewOpcode("ROL", function (s) {
    var sa = s.si4 & 31;
    var sb = (32 - sa) & 31;
    s.result = (s.snd << sa) | (s.snd >>> sb)
}, function (s) {
    var sa = s.si4 & 15;
    var sb = (16 - sa) & 15;
    s.result = ((s.snd << sa) | (s.snd >>> sb)) & F4
}, f, g, "ROtate Left");
Y.NewOpcode("BSWAP", function (s) {
    s.result = (s.snd << 24) | ((s.snd & 65280) << 8) | ((s.snd >> 8) & 65280) | ((s.snd >> 24) & F2)
}, function (s) {
    s.result = ((s.snd << 8) | ((s.snd >> 8) & F2)) & F4
}, Y.FORM_RR, Y.ALIAS_RR | Y.IGNORE_SI4 | Y.OPTIONAL, "Switch endianness");
Y.prefix = Y.GROUP_IE;
Y.NewOpcode("MOV", function (s) {
    s.result = s.si4 & F8
}, function (s) {
    s.result = s.si4 & F4
}, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.IGNORE_SND | Y.IMM20, "Write imm16/imm20/si4 to dest");
Y.NewOpcode("IB", function (s) {
    var a = (s.si4 & 3) * 8;
    s.result = ((s.snd & F2) << a) | (s.dst & ~(F2 << a))
}, function (s) {
    var a = (s.si4 & 1) * 8;
    s.result = ((s.snd & F2) << a) | (s.dst & ~(F2 << a))
}, Y.FORM_iRR | Y.FORM_RRR, Y.READ_DST | Y.IMM_LSB, "Insert a byte into a (half)word");
Y.NewOpcode("EZB", function (s) {
    s.result = F2 & (s.snd >> ((s.si4 & 3) * 8))
}, function (s) {
    s.result = F2 & (s.snd >> ((s.si4 & 1) * 8))
}, Y.FORM_iRR | Y.FORM_RRR, Y.IMM_LSB, "Extract and Zero-extend Byte");
Y.NewOpcode("ESB", function (s) {
    s.result = F2 & (s.snd >> ((s.si4 & 3) * 8));
    if (s.result & 128) s.result |= F8 - F2
}, function (s) {
    s.result = F2 & (s.snd >> ((s.si4 & 1) * 8));
    if (s.result & 128) s.result |= F4 - F2
}, Y.FORM_iRR | Y.FORM_RRR, Y.IMM_LSB, "Extract and Sign-extend Byte");
Y.NewOpcode("MOVH", function (s) {
    s.result = (s.snd & F4) | ((s.si4 & F4) << 16)
}, null, Y.FORM_RR | Y.FORM_RRR | Y.FORM_IR | Y.FORM_iR | Y.FORM_IRR | Y.FORM_iRR, Y.YASEP32_ONLY | Y.ALIAS_IRR, "Shift operand (R/i4/i16) left by 16 bits");
Y.NewOpcode("IH", function (s) {
    var a = (s.si4 & 3) * 8;
    s.result = ((s.snd & F4) << a) | (s.dst & ~(F4 << a));
    s.carry = 0;
    if ((s.si4 & 3) > 2) {
        s.carry = 1;
        s.result &= F8
    }
}, null, Y.FORM_iRR | Y.FORM_RRR, Y.YASEP32_ONLY | Y.READ_DST | Y.IMM_LSB | Y.CHANGE_CARRY, "Insert the second operand's Half-word into destination");
Y.NewOpcode("EZH", function (s) {
    s.carry = ((s.si4 & 3) > 2) ? 1 : 0;
    s.result = F4 & (s.snd >>> ((s.si4 & 3) * 8))
}, null, Y.FORM_iRR | Y.FORM_RRR, Y.YASEP32_ONLY | Y.IMM_LSB | Y.CHANGE_CARRY, "Extract and Zero-extend Half-word");
Y.NewOpcode("ESH", function (s) {
    s.carry = ((s.si4 & 3) > 2) ? 1 : 0;
    s.result = F4 & (s.snd >>> ((s.si4 & 3) * 8));
    if (s.result & 128) s.result |= F8 - F4
}, null, Y.FORM_iRR | Y.FORM_RRR, Y.YASEP32_ONLY | Y.IMM_LSB | Y.CHANGE_CARRY, "Extract and Sign-extend Half-word");
Y.prefix = Y.GROUP_SMT;
Y.NewOpcode("HALT", null, null, Y.FORM_ALONE | Y.FORM_i, Y.NO_WRITEBACK | Y.NO_CONDITION | Y.IGNORE_SND | Y.IGNORE_SI4 | Y.IGNORE_IMM16, "Stop the core");
Y.NewOpcode("IPC", null, null, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.NO_WRITEBACK | Y.NO_CONDITION | Y.Preliminary, "InterProcess Call");
Y.NewOpcode("IPE", null, null, Y.FORM_R, Y.IGNORE_SI4 | Y.IGNORE_IMM16 | Y.IGNORE_SND | Y.NO_CONDITION | Y.Preliminary, "InterProcess Entry");
Y.NewOpcode("IPR", null, null, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.NO_WRITEBACK | Y.NO_CONDITION | Y.Preliminary, "InterProcess Return");
Y.prefix = Y.GROUP_MUL;
Y.NewOpcode("MUL8L", function (s) {
    var sa = s.snd & F2,
        sb = s.si4 & F2;
    s.result = sa * sb
}, function (s) {
    var sa = s.snd & F2,
        sb = s.si4 & F2;
    s.result = sa * sb
}, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.OPTIONAL | Y.ALIAS_IRR | Y.IMM16_8LSB | Y.IgnoreImmSign, "Multiply lower byte (unsigned)");
Y.NewOpcode("MUL8H", function (s) {
    var sa = s.si4 & F2,
        sb = (s.snd >> 8) & F2;
    s.result = sa * sb
}, function (s) {
    var sa = s.si4 & F2,
        sb = (s.snd >> 8) & F2;
    s.result = sa * sb
}, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.OPTIONAL | Y.ALIAS_IRR | Y.IMM16_8LSB | Y.IgnoreImmSign, "Multiply higher byte (unsigned)");
Y.NewOpcode("MULI", null, null, Y.FORM_RR | Y.FORM_IR | Y.FORM_iR, Y.NO_CONDITION | Y.OPTIONAL | Y.NO_WRITEBACK | Y.IgnoreImmSign, "Initialize one multiply LUT entry");
Y.NewOpcode("LUT8", null, null, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.Preliminary | Y.ALIAS_IRR | Y.IMM16_8LSB | Y.IgnoreImmSign, "XOR source register with LookUp Table's contents (1 byte in, 2 or 4 bytes out)");
Y.NewOpcode("MUL16L", function (s) {
    var sa = s.snd & F4,
        sb = s.si4 & F4;
    s.result = sa * sb
}, null, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.OPTIONAL | Y.ALIAS_IRR | Y.IgnoreImmSign | Y.YASEP32_ONLY, "Multiply lower halfword (unsigned)");
Y.NewOpcode("MUL16H", function (s) {
    var sa = s.si4 & F4,
        sb = (s.snd >> 16) & F4;
    s.result = sa * sb
}, null, Y.FORM_RR | Y.FORM_IRR | Y.FORM_iR | Y.FORM_IR | Y.FORM_iRR | Y.FORM_RRR, Y.OPTIONAL | Y.ALIAS_IRR | Y.IgnoreImmSign | Y.YASEP32_ONLY, "Multiply higher halfword (unsigned)");
Y.prefix = Y.GROUP_RSV;
Y.NoOpcode();
Y.NoOpcode();
Y.NoOpcode();
Y.NoOpcode();
Y.NoOpcode();
Y.NoOpcode();
Y.NoOpcode();
Y.NewOpcode("INV", null, null, Y.FORM_ALONE, Y.NO_WRITEBACK | Y.NO_CONDITION | Y.IGNORE_SND_SHORT | Y.IGNORE_SND_LONG | Y.IGNORE_SI4 | Y.IGNORE_IMM16, "Forbidden (invalid) opcode");
profiles = {
    "empty": {
        profile: "empty",
        mask: "0000000000000000",
        comment: "empty profile",
        readonly: 1,
        datapath: 16,
        multiplier: 0,
        PC_length: 8,
        CondR1: 0,
        SplitMem: 0,
        PtrUpd: 0,
        Park: 0
    }
};
ProfUtils = {
    ProfList: ["YASEP32:FEFEFEFEBEBEBCBD:wide datapath, full-featured version::32:16:32:1::1:1", "YASEP16:FEFEFEFE9C9C9C9D:narrow datapath version:::8:16:1::1:1", "microYASEP:AC0C8C8C08088809:narrow, minimal core with limited data memory access::::16:1:1", "miniYASEP:AC0C8C8C08088809:faster and more features than miniYASEP::::16:1:1:1"],
    inherit: function (from) {
        if (typeof (from) == "string") {
            from = profiles[from];
            if (!from) from = profiles["empty"]
        }
        if (!from.profile) alert("ProfUtils.inherit:\nInvalid profile or argument");
        return clone(from)
    },
    decodeMask: function (h) {
        var m = h.mask,
            o = {},
            c, i = 0,
            j = 0,
            v = [];
        if (m.length != 16) return alert("decodeMask : wrong hex string size (" + m + ")");
        while (i < 256) {
            if (!(i & 12)) c = int_array[m[j++]];
            v[i] = 0;
            if ((c & 8) && Y.opcode_table[i]) o[Y.opcode_table[i].name] = v[i] = 1;
            c += c;
            i += 4
        }
        h.valid = v;
        h.valid_instructions = o
    },
    encodeMask: function (b) {
        var o = "",
            i, j = 0,
            c;
        if (b.length != 64) return alert("decodeInstructionMask : wrong hex string size (" + h + ")");
        while (j < 64) {
            c = 0;
            for (i = 0; i < 4; i++) c += c + (b[j++] & 1);
            o += hex_array[c]
        }
        return o
    },
    exportString: function (from) {
        var s = "",
            i, p, d, c = ProfUtils.inherit(from),
            e = profiles["empty"];
        for (c in e) {
            d = e[c];
            p = from[c];
            switch (typeof d) {
                case "string":
                    if (!p) p = "";
                    s += p.replace(/"/g, '\\"').replace(/'/g, "\\'").replace(/:/g, '\\:') + ":";
                    break;
                case "number":
                    if (!p || (p == d)) p = "";
                    s += p + ":";
                    break
            }
        }
        return s.replace(/:*$/g, '')
    },
    importString: function (s) {
        into = ProfUtils.inherit("empty");
        var t = s.split(":"),
            e = profiles["empty"],
            i = 0,
            d, u;
        for (c in e) {
            d = e[c];
            u = t[i];
            switch (typeof d) {
                case "string":
                    if (u.length > 0) into[c] = u;
                    i++;
                    break;
                case "number":
                    if (u.length > 0) into[c] = +u;
                    i++;
                    break
            }
            if (i >= t.length) break
        }
        ProfUtils.decodeMask(into);
        return into
    },
    collapse: function (a) {
        for (var i = 0; i < 64; i++)
            if (typeof a[i] != "number") a[i] = 0;
        return a.join("")
    },
    exportVHDL: function (from) {
        var c = ProfUtils.inherit(from),
            line, col, cvi, f, i, n, t, j, index, instr, vhdl = generated("--", "yasep_profiles.js") + '-- Profile name : ' + c.profile + '\n' + '-- Profile string : ' + ProfUtils.exportString(c) + '\n' + '\n' + 'Library ieee;\n' + '    use ieee.std_logic_1164.all;\n' + '    use ieee.numeric_std.all;\n' + '\n' + 'package yasep_definitions is\n' + '----------------------------------------------------------\n' + '-- user defined values :\n' + '  constant YASEP_SIZE : natural := ' + c.datapath + ';\n' + '  constant YASEP_MUL  : natural := ' + c.multiplier + ';\n' + '  constant Enable_CondR1 : natural := ' + c.CondR1 + ';\n' + '  constant Enable_Parking : natural := ' + c.Park + ';\n' + '  constant Split_Memories : natural := ' + c.SplitMem + ';\n' + '  constant RegisterPostUpdate : natural := ' + c.PtrUpd + ';\n' + '  constant PC_LENGTH  : natural := ',
            valid_instructions = [],
            noWriteBack = [],
            noCondition = [],
            IMM_5LSB = [],
            abortWrite = [],
            IgnoreSND_s = [],
            IgnoreSND_L = [],
            IgnoreSI4 = [],
            IgnoreImm16 = [],
            ChangeCarry = [],
            Imm20 = [],
            ChangeEqual = [];
        if (typeof c.PC_length == "number") vhdl += c.PC_length;
        else vhdl += 'YASEP_SIZE';
        vhdl += ';\n\n' + '----------------------------------------------------------\n' + '-- exported from the JavaScript definitions :\n\n' + '  subtype SLV2   is std_logic_vector( 1 downto 0);\n' + '  subtype SLV3   is std_logic_vector( 2 downto 0);\n' + '  subtype SLV4   is std_logic_vector( 3 downto 0);\n' + '  subtype SLV5   is std_logic_vector( 4 downto 0);\n' + '  subtype SLV6   is std_logic_vector( 5 downto 0);\n' + '  subtype SLV8   is std_logic_vector( 7 downto 0);\n' + '  subtype SLV16  is std_logic_vector(15 downto 0);\n' + '  subtype SLV32  is std_logic_vector(31 downto 0);\n' + '  subtype SLVr64 is std_logic_vector(0 to 63);\n' + '  subtype SLVY   is std_logic_vector(YASEP_SIZE-1 downto 0);\n' + '  subtype SLVAI  is std_logic_vector(PC_LENGTH-1 downto 1);\n\n';
        for (i = 0; i < 16; i++) {
            t = Y.registers_names[i];
            vhdl += '  constant REG_' + pad_right(t, 4) + ': SLV4 := "' + toBin(i, 4) + '";\n'
        }
        vhdl += '\n';
        for (line = 0; line < 32; line += 4) {
            t = Y.GroupNames[line];
            if (typeof t == "string") {
                vhdl += "  constant " + t;
                i = t.length;
                while (i < 10) {
                    i++;
                    vhdl += ' '
                }
                vhdl += ' : SLV3 :=    "' + toBin(line >> 2, 3) + '";\n'
            }
            for (col = 0; col < 8; col++) {
                index = line | (col << 5);
                instr = Y.opcode_table[index];
                if (typeof instr == 'object') {
                    n = instr.name;
                    i = index >> 2;
                    f = instr.flags;
                    if (c.valid_instructions[n] === 1) {
                        valid_instructions[i] = 1;
                        if (f & Y.NO_WRITEBACK) noWriteBack[i] = 1;
                        if (f & Y.NO_CONDITION) noCondition[i] = 1;
                        if (f & Y.IMM16_5LSB) IMM_5LSB[i] = 1;
                        if (f & Y.ABORT_WRITE) abortWrite[i] = 1;
                        if (f & Y.IGNORE_SND_SHORT) IgnoreSND_s[i] = 1;
                        if (f & Y.IGNORE_SND_LONG) IgnoreSND_L[i] = 1;
                        if (f & Y.IGNORE_SI4) IgnoreSI4[i] = 1;
                        if (f & Y.IGNORE_IMM16) IgnoreImm16[i] = 1;
                        if (f & Y.CHANGE_CARRY) ChangeCarry[i] = 1;
                        if (f & Y.CHANGE_EQUAL) ChangeEqual[i] = 1;
                        if ((f & Y.IMM20) && (c.datapath == 32)) Imm20[i] = 1
                    }
                    vhdl += '  constant Op_' + n;
                    f = n.length;
                    while (f < 7) {
                        f++;
                        vhdl += ' '
                    }
                    vhdl += ' : SLV6 := "' + toBin(i, 6) + '";' + '  constant F_' + n;
                    f = n.length;
                    while (f < 6) {
                        f++;
                        vhdl += ' '
                    }
                    vhdl += ' : SLV3 := "' + toBin(i >> 3, 3) + '";';
                    if (c.valid_instructions[n] !== 1) vhdl += ' -- disabled';
                    vhdl += '\n'
                }
            }
            vhdl += '\n'
        }
        vhdl += '\n-- Flags :\n' + '  constant FlagValidInstruction : SLVr64 := "' + (cvi = ProfUtils.collapse(valid_instructions)) + '";\n-- Compacted mask: ' + ProfUtils.encodeMask(cvi) + ';\n  constant FlagNoWriteBack      : SLVr64 := "' + ProfUtils.collapse(noWriteBack) + '";\n  constant FlagNoCondition      : SLVr64 := "' + ProfUtils.collapse(noCondition) + '";\n  constant FlagIMM16_5LSB       : SLVr64 := "' + ProfUtils.collapse(IMM_5LSB) + '";\n  constant FlagAbortWrite       : SLVr64 := "' + ProfUtils.collapse(abortWrite) + '";\n  constant FlagIgnoreSND_short  : SLVr64 := "' + ProfUtils.collapse(IgnoreSND_s) + '";\n  constant FlagIgnoreSND_Long   : SLVr64 := "' + ProfUtils.collapse(IgnoreSND_L) + '";\n  constant FlagIgnoreSI4        : SLVr64 := "' + ProfUtils.collapse(IgnoreSI4) + '";\n  constant FlagIgnoreImm16      : SLVr64 := "' + ProfUtils.collapse(IgnoreImm16) + '";\n  constant FlagChangeCarry      : SLVr64 := "' + ProfUtils.collapse(ChangeCarry) + '";\n  constant FlagChangeEqual      : SLVr64 := "' + ProfUtils.collapse(ChangeEqual) + '";\n  constant FlagImm20            : SLVr64 := "' + ProfUtils.collapse(Imm20) + '";\n' + 'end yasep_definitions;\n' + '\n' + 'package body yasep_definitions is\n' + '  -- empty\n' + 'end yasep_definitions;\n';
        SaveFile.save("yasep_def.vhdl", vhdl)
    },
};
for (var i in ProfUtils.ProfList) {
    var p = ProfUtils.importString(ProfUtils.ProfList[i]);
    profiles[p.profile] = p
};
Y.pseudo_instructions_names = ["DB", "DH", "DW", "YASEP", "YASEP16", "YASEP32"];
Y.table_pseudo_instructions = {
    "DU": 0,
    "DB": 1,
    "DH": 2,
    "DW": 4,
    "YASEP": 0,
    "YASEP16": 0,
    "YASEP32": 0
};
for (var i in Y.table_pseudo_instructions) Y.keywords[i] = true;
ASCIIescapes = {
    '"': 34,
    '\\': 92,
    '/': 47,
    'b': 8,
    'f': 12,
    'n': 10,
    'r': 13,
    't': 9
};
Y.ASM_context = function (add_message, emit_bin, silent, core, shorten) {
    this.add_message = emptyFunc;
    if (typeof add_message == "function") this.add_message = add_message;
    this.YASEP_TYPE = 32;
    this.shorten = true;
    if (typeof shorten == "boolean") this.shorten = shorten;
    this.emit_bin = emptyFunc;
    if (emit_bin) this.emit_bin = emit_bin;
    this.silent = false;
    if (typeof silent == "boolean") this.silent = silent;
    this.core = false;
    if (typeof core == "object") this.core = core
};
Y.encode_instruction = function (input_text, t) {
    t.asm_operands = [];
    t.encoded_fields = t.encoded_instruction = t.encoded_size_bytes = t.pseudo_flag = t.X = 0;
    t.name = t.form = t.to = t.cond = "";
    var a, b, c, i, f = 0,
        g = 0,
        k, I = false,
        n, p = "",
        r, to, Ytype, s = input_text.toUpperCase();
    s = s.replace(/[;].*/, "");
    s = s.replace(/[,]/g, " ");
    s = s.replace(/\s+/g, " ");
    s = s.replace(/(^[ ])|([ ]$)/g, "");
    a = s.split(" ");
    n = a.length;
    if (a[0] == "") {
        if (t.silent) return true;
        t.add_message("red", I8N("R") + I8N("asmie"));
        return false
    }
    if (Y.table_opcode[a[0]] == undefined) {
        t.encoded_size_bytes = 0;
        var bytes = Y.table_pseudo_instructions[a[0]];
        if (typeof bytes != "number") {
            t.add_message("red", I8N("R") + I8N("asmuo") + a[0]);
            return false
        } else {
            Ytype = I8N("asmty");
            switch (a[0]) {
                case "YASEP":
                    t.YASEP_TYPE = 0;
                    t.add_message("green", Ytype + "default.");
                    return true;
                case "YASEP16":
                    t.YASEP_TYPE = 16;
                    t.add_message("green", Ytype + "16-bit.");
                    return true;
                case "YASEP32":
                    t.YASEP_TYPE = 32;
                    t.add_message("green", Ytype + "32-bit.");
                    return true
            }
            t.pseudo_flag = 1;
            t.encoded_instruction = 0;
            if (n < 2) {
                t.add_message("red", I8N("R") + I8N("asmmd"));
                return false
            }
            if (a[0] == "DU") {
                if ((i = input_text.indexOf('"')) < 0) {
                    t.add_message("red", I8N("R") + I8N("asmqm"));
                    return false
                }
                i++;
                while (i < input_text.length) {
                    c = input_text[i++];
                    if (c == '"') {
                        t.add_message("blue", " OK, " + t.encoded_size_bytes + I8N("asmlb"));
                        return true
                    }
                    if (c == '\\') {
                        if (typeof (f = input_text[i]) == "undefined") break;
                        if (typeof (f = ASCIIescapes[f]) == "number") {
                            t.emit_bin(f, 1);
                            t.encoded_size_bytes++;
                            i++;
                            continue
                        } else {
                            t.add_message("red", I8N("R") + "\\" + i + " " + I8N("asmiec"));
                            return false
                        }
                    }
                    c = unescape(encodeURIComponent(c));
                    for (b in c) {
                        t.emit_bin(c.charCodeAt(b), 1);
                        t.encoded_size_bytes++
                    }
                }
                t.add_message("red", I8N("R") + I8N("asmqm"));
                return false
            }
            for (i = 1; i < n; i++) {
                r = str2int(a[i]);
                if (r == null) {
                    t.add_message("red", I8N("R") + I8N("asmin") + a[i]);
                    return false
                }
                b = 0;
                c = bytes;
                while (c > 0) {
                    b = (b << 8) | 255;
                    c--
                }
                b &= r;
                if (b != r) t.add_message("orange", I8N("W") + I8N("asmln") + a[i] + I8N("asmitl") + (bytes * 8) + I8N("asmbk"));
                t.emit_bin(b, bytes);
                if (t.encoded_size_bytes < 4) t.encoded_instruction += (b << (t.encoded_size_bytes * 8));
                t.encoded_size_bytes += bytes
            }
            t.add_message("blue", " OK, " + t.encoded_size_bytes + I8N("asmlb"))
        }
    } else {
        if (n > 7) {
            t.add_message("red", I8N("R") + I8N("asmtma"));
            return false
        }
        to = Y.table_opcode[t.name = a[0]];
        t.encoded_instruction = to.val;
        t.encoded_fields = 255;
        t.encoded_size_bytes = 2;
        f = to.forms;
        g = to.flags;
        if (g & Y.READ_DST) Y.force_extended_form(t);
        if (t.core && t.core.valid_instructions[Y.opcode_table[to.val].name] != 1) {
            t.add_message("orange", I8N("R") + I8N("asmcpo"));
            return false
        }
        for (i = 1; i < n; i++) {
            r = Y.names_registers[a[i]];
            if (typeof r == "number") {
                p += "R";
                t.asm_operands[i] = r
            } else {
                r = str2int(a[i]);
                if (typeof r == "number") {
                    p += "I";
                    t.asm_operands[i] = r
                } else {
                    if (k = Y.tableConditionAll[a[i]]) {
                        if (g & Y.NO_CONDITION) t.add_message("orange", I8N("W") + I8N("asmiic"));
                        Y.force_extended_form(t);
                        t.encoded_instruction |= k[0] << Y.OFFSET_CNDCODE;
                        r = k[1];
                        t.cond = a[i];
                        if (r > 0) {
                            i++;
                            if (r == 1) {
                                r = Y.names_registers[a[i]];
                                if (typeof r == "number") Y.encode_src4(r, t);
                                else {
                                    t.add_message("red", I8N("R") + I8N("asmrop"));
                                    return false
                                }
                            } else {
                                r = str2int(a[i]);
                                if (typeof r == "number") {
                                    if ((r < 0) || (r > 16)) {
                                        t.add_message("red", I8N("R") + I8N("asmc15"));
                                        return false
                                    }
                                    Y.encode_src4(r, t)
                                } else {
                                    t.add_message("red", I8N("R") + I8N("asmnie"));
                                    return false
                                }
                            }
                        }
                        if (i + 1 != n) {
                            t.add_message("red", I8N("R") + I8N("asmtmo"));
                            return false
                        }
                    } else {
                        t.add_message("red", I8N("R") + I8N("asmio") + a[i]);
                        return false
                    }
                }
            }
        }
        if (p == "") p = "FORM_ALONE";
        else p = "FORM_" + p;
        if (!Y.TableEncoders[p]) {
            p = p.replace(/i/g, "I");
            if (!Y.TableEncoders[p]) {
                t.add_message("red", I8N("R") + I8N("asmoc") + p);
                return false
            }
        }
        if ((t.YASEP_TYPE == 32) && (g & Y.YASEP16_ONLY)) {
            t.add_message("orange", I8N("W") + a[0] + I8N("asmo16"))
        } else {
            if ((t.YASEP_TYPE == 16) && (g & Y.YASEP32_ONLY)) {
                t.add_message("orange", I8N("W") + a[0] + I8N("asmo32"))
            }
        }
        if (!(f & Y[p])) {
            t.add_message("orange", I8N("R") + p + I8N("asmopc") + a[0]);
            return false
        }
        if ((typeof to.check == "function") && (!to.check(t, a, p))) return false;
        if (!Y.TableEncoders[p].en(g, t)) return false;
        if (~(t.encoded_fields) & t.encoded_instruction) t.add_message("orange", I8N("W") + I8N("asmib") + " encoded_fields=" + int2hex(t.encoded_fields) + " instruction=" + int2hex(t.encoded_instruction));
        t.form = p;
        t.ot = Y.opcode_table[to.val];
        t.add_message("blue", " OK: opcode=" + Y.decorate_opcode(t.encoded_instruction & Y.FIELD_OPCODE) + " form=" + p + " " + t.encoded_size_bytes + " bytes mask=" + int2hex(t.encoded_fields, (t.encoded_size_bytes * 2) - 1, (t.encoded_size_bytes * 2) - 1));
        t.emit_bin(t.encoded_instruction, t.encoded_size_bytes)
    }
    return true
};
Y.encode_instruction_2014 = function (input_text, t) {
    t.asm_operands = [];
    t.encoded_fields = t.encoded_instruction = t.encoded_size_bytes = t.pseudo_flag = t.X = 0;
    t.name = t.form = t.to = t.cond = "";
    return true
};
Y.DISASM_context = function (add_message) {
    if (typeof add_message == "function") this.add_message = add_message;
    else this.add_message = emptyFunc;
    this.YASEP_TYPE = 0
};
Y.DISASM = function (input, t) {
    function garbage(a, field) {
        if (a != 0) t.add_message("yellow", I8N("W") + I8N("dsmgb") + field)
    }

    function decode_short(t, f, g) {
        var i4 = t.si4;
        if (!(g & Y.IgnoreImmSign) && (i4 >= 8)) i4 -= 16;
        if (t.input & 2) {
            if (t.si4 == 0) {
                if (t.name == "SUB") {
                    t.name = "NEG";
                    t.instruction = " " + Y.registers_names[t.snd];
                    return "FORM_R"
                }
                if (t.name == "ORN") {
                    t.name = "NOT";
                    t.instruction = " " + Y.registers_names[t.snd];
                    return "FORM_R"
                }
            }
            if (f & Y.FORM_iR) {
                t.instruction = " " + i4 + " " + Y.registers_names[t.snd];
                return "FORM_iR"
            }
        } else {
            if ((f & Y.FORM_R) && !(g & Y.ALIAS_RR)) {
                garbage(t.si4, "SI4");
                t.instruction = " " + Y.registers_names[t.snd];
                return "FORM_R"
            }
        }
        if (f & Y.FORM_i) {
            if ((f & Y.FORM_ALONE) && (t.si4 == 0)) {
                garbage(t.snd, "SND");
                return "FORM_ALONE"
            }
            t.instruction = " " + i4;
            garbage(t.snd, "SND");
            return "FORM_i"
        }
        if (f & Y.FORM_ALONE) {
            garbage(t.si4, "SI4");
            garbage(t.snd, "SND");
            return "FORM_ALONE"
        }
        if (t.input == 0) {
            t.name = "NOP";
            return "FORM_ALONE"
        }
        t.instruction = " " + Y.registers_names[t.si4] + " " + Y.registers_names[t.snd];
        return "FORM_RR"
    };

    function decode_long(t, f, g) {
        var l = (t.input >> 16) & F4;
        var s = 16;
        if ((g & Y.IMM20) && (t.YASEP_TYPE != 16)) {
            s = 20;
            l |= t.snd << 16
        }
        if (!(g & Y.IgnoreImmSign) && (l >= (1 << (s - 1)))) l -= (1 << s);
        if (g & Y.IGNORE_IMM16) {
            t.form = "FORM_ALONE";
            garbage(l, "IMM16");
            garbage(t.snd, "SND");
            garbage(t.si4, "SI4")
        }
        if (f & Y.FORM_IR) {
            if (g & Y.ALIAS_IRR) {
                if (t.snd == t.si4) {
                    t.instruction = " " + l + " " + Y.registers_names[t.snd];
                    return "FORM_IR"
                }
            } else {
                if (g & Y.SWAP_IR) {
                    if (s != 20) garbage(t.snd, "SND");
                    t.instruction = " " + l + " " + Y.registers_names[t.si4]
                } else {
                    garbage(t.si4, "SI4");
                    t.instruction = " " + l + " " + Y.registers_names[t.snd]
                }
                return "FORM_IR"
            }
        }
        t.instruction = " " + l + " " + Y.registers_names[t.snd] + " " + Y.registers_names[t.si4];
        return "FORM_IRR"
    }

    function decode_extended(t, f, g) {
        if (t.input & Y.FIELD_AUX) {
            var i4 = t.si4;
            if (!(t.dst)) {
                if (g & Y.NO_WRITEBACK) t.add_message("orange", "This one might cause trouble ! No reg write but SND decoded as PC + Imm4 adjusted !");
                i4 = Y.PC_Imm4[i4]
            } else if (!(g & Y.IgnoreImmSign) && (i4 >= 8)) i4 -= 16;
            if ((t.si4 == 0) && (t.snd == t.dst)) {
                if (t.name == "SUB") {
                    t.name = "NEG";
                    t.instruction = " " + Y.registers_names[t.snd];
                    if (t.snd == t.dst) return "FORM_R";
                    t.instruction = " " + Y.registers_names[t.dst];
                    return "FORM_RR"
                }
                if (t.name == "ORN") {
                    t.name = "NOT";
                    t.instruction = " " + Y.registers_names[t.snd];
                    if (t.snd == t.dst) return "FORM_R";
                    t.instruction = " " + Y.registers_names[t.dst];
                    return "FORM_RR"
                }
            }
            if ((f & (Y.FORM_iR | Y.FORM_iRR)) && (t.snd == t.dst)) {
                t.instruction = " " + i4 + " " + Y.registers_names[t.snd];
                return "FORM_iR"
            }
            if (f & Y.FORM_iRR) {
                t.instruction = " " + i4 + " " + Y.registers_names[t.snd] + " " + Y.registers_names[t.dst];
                return "FORM_iRR"
            }
        } else {
            if ((f & Y.FORM_RR) && (t.snd == t.dst)) {
                t.instruction = " " + Y.registers_names[t.si4] + " " + Y.registers_names[t.dst];
                return "FORM_RR"
            }
            if (f & Y.FORM_RRR) {
                t.instruction = " " + Y.registers_names[t.si4] + " " + Y.registers_names[t.snd] + " " + Y.registers_names[t.dst];
                return "FORM_RRR"
            }
        }
        t.add_message("red", I8N("R") + I8N("dsmuk"))
    }
    ConditionPC = ["", " NEVER", " BIT1 0", " BIT0 0", " CARRY", " NO_CARRY", " EQ", " NEQ"];

    function decode_condition(t) {
        var r, cond = (t.input & Y.FIELD_CNDCODE) >> Y.OFFSET_CNDCODE;
        if (t.src4 == 0) return ConditionPC[cond];
        r = Y.registers_names[t.src4];
        switch (cond) {
            case 0:
                return " ZERO " + r;
            case 1:
                return " NZ " + r;
            case 2:
                return " BIT1 " + t.src4;
            case 3:
                return " BIT0 " + t.src4;
            case 4:
                return " LSB1 " + r;
            case 5:
                return " LSB0 " + r;
            case 6:
                return " MSB1 " + r;
            case 7:
                return " MSB0 " + r
        }
    }
    t.form = null;
    t.prefix = input & (Y.FIELD_IMMREG | Y.FIELD_EXTFORM);
    t.opcode = input & Y.FIELD_OPCODE;
    t.input = input;
    t.instruction = "";
    t.size_bytes = 0;
    t.snd = (input & Y.FIELD_SND) >> Y.OFFSET_SND;
    t.si4 = (input & Y.FIELD_SI4) >> Y.OFFSET_SI4;
    t.name = null;
    if (typeof input != "number") {
        t.add_message("red", I8N("R") + I8N("dsmif"));
        return
    }
    t.O = Y.opcode_table[t.opcode];
    if (typeof t.O != "object") {
        if (input & Y.FIELD_IMMREG) {
            t.add_message("red", I8N("R") + I8N("dsmuo") + int2hex(t.opcode) + I8N("dsmuol"));
            t.instruction = "DW " + int2hex(input, 7, 7);
            t.size_byte = 4
        } else {
            t.add_message("red", I8N("R") + I8N("dsmuo") + int2hex(t.opcode) + I8N("dsmuos"));
            garbage(input & Y.FIELD_IMM16, "the MSB");
            t.instruction = "DH " + int2hex(input & F4);
            t.size_byte = 2
        }
        return
    }
    t.name = t.O.name;
    var f = t.O.forms,
        g = t.O.flags;
    if (input & Y.FIELD_IMMREG) {
        t.size_bytes = 4;
        if (input & Y.FIELD_EXTFORM) {
            t.dst = (input >> Y.OFFSET_DST) & 15;
            t.src4 = (input >> Y.OFFSET_CND) & 15;
            t.form = decode_extended(t, f, g);
            t.instruction += decode_condition(t)
        } else {
            if ((input & 255 << 24) && (g & Y.IMM16_8LSB) || (input & 2047 << 21) && (g & Y.IMM16_5LSB)) t.add_message("yellow", I8N("W") + I8N("dsmgb") + "IMM16");
            t.form = decode_long(t, f, g)
        }
    } else {
        t.size_bytes = 2;
        t.form = decode_short(t, f, g)
    }
    if (t.form != null) {
        t.instruction = t.name + t.instruction;
        t.add_message("blue", " OK: opcode=" + Y.decorate_opcode(t.opcode) + " instruction=<b>" + t.instruction + "</b> (" + t.form + ")")
    }
};
INIT(DOC_GEN = {
    valid_keys: {
        "doc/asm": {
            titles: i8n.das,
            onLoad: function (cont, h) {
                var t = [],
                    i = 0;
                for (var u in Y.table_opcode) {
                    if (Y.table_opcode[u].forms > 0) t[i++] = Y.decorate_opcode(u)
                }
                getById("opcodes", "span", cont).innerHTML = t.sort().join(" ");
                t = [];
                i = 0;
                for (var u in Y.tableConditionAll) t[i++] = u;
                document.getElementById("condcodes").innerHTML = t.sort().join(" ")
            }
        },
        "doc/reg-mem": {
            titles: i8n.Rm,
            onLoad: function (cont, h) {
                var i, t = '<center><table style="font-family: monospace">',
                    r = getById("regtable", "DIV", cont);
                if (r) {
                    for (i in Y.registers_names) t += '<tr style="background-color:#' + (i & 1 ? 'EEE' : 'FFF') + '"><td>#' + i + ':</td><td class="' + Y.registers_names[i][0] + '">&nbsp;<a href="#' + Y.registers_names[i] + '">' + Y.registers_names[i] + "</a>&nbsp;</td></tr>";
                    r.innerHTML = t + "</table></center>"
                }
                var m1 = [],
                    m0 = [],
                    i, m;
                for (i in profiles) {
                    m = '<a onclick="wa(\"VHDL/config#name=' + i + '\")" href="#!VHDL/config#name=' + i + '">' + i + '</a>';
                    if (profiles[i].Park == 1) m1.push(m);
                    else m0.push(m)
                }
                getById("parkOK", "SPAN", cont).innerHTML = m1.join(", ");
                getById("parkKO", "SPAN", cont).innerHTML = m0.join(", ")
            }
        },
        "doc/forms": {
            titles: i8n.dfr,
            onLoad: function (cont, h) {
                var a, b, c, d, e, i, FormUsage = [],
                    pr = "<hr>" + hiddenText(1, h);
                for (c in Y.table_opcode)
                    if (Y.table_opcode[c].forms > 0) {
                        e = Y.table_opcode[c];
                        t = " " + Y.decorate_opcode(c);
                        i = 1;
                        while (i <= e.forms) {
                            if (i & e.forms) {
                                b = Y.TableForm[i];
                                if (typeof FormUsage[b] != "string") FormUsage[b] = pr + t;
                                else FormUsage[b] += t
                            }
                            i += i
                        }
                    } d = cont.getElementsByTagName("div");
                for (a in d)
                    if (d[a].className == "ex") {
                        b = d[a];
                        c = FormUsage[b.id.slice(1)];
                        if (typeof c == "string") b.innerHTML = c
                    }
            }
        },
        "doc/flags": {
            titles: i8n.flg,
            onLoad: function (cont, h) {
                var a, b, c, d, e, i, FlagsUsage = [],
                    pr1 = hiddenText(1, h);
                pr2 = hiddenText(2, h);
                for (c in Y.table_opcode)
                    if (Y.table_opcode[c].flags > 0) {
                        e = Y.table_opcode[c];
                        t = " " + Y.decorate_opcode(c);
                        i = 1;
                        while (i <= e.flags) {
                            if (i & e.flags) {
                                b = Y.TableFlags[i];
                                if (!FlagsUsage[b]) FlagsUsage[b] = "<br>" + pr1 + "<b>" + b + "</b>" + pr2;
                                FlagsUsage[b] += t
                            }
                            i += i
                        }
                    } d = cont.getElementsByTagName("div");
                for (a in d)
                    if (d[a].className == "ex") {
                        b = d[a];
                        c = FlagsUsage[b.id.slice(1)];
                        if (typeof c == "string") b.innerHTML = c + "<br>&nbsp;"
                    }
            }
        },
        "doc/16-32": {
            titles: i8n.d16,
            onLoad: function (cont, h) {
                var f, Usage16 = [],
                    Usage32 = [];
                for (var name in Y.table_opcode) {
                    if (Y.table_opcode[name].forms > 0) {
                        f = Y.table_opcode[name].flags;
                        if (Y.YASEP16_ONLY & f) Usage16.push(Y.decorate_opcode(name));
                        if (Y.YASEP32_ONLY & f) Usage32.push(Y.decorate_opcode(name))
                    }
                }
                if (Usage16.length) getById("y16", "div", cont).innerHTML = Usage16.sort().join(" ");
                if (Usage32.length) getById("y32", "div", cont).innerHTML = Usage32.sort().join(" ")
            }
        },
        "doc/uYASEP": {
            titles: ["microYASEP"]
        },
        "doc/mYASEP": {
            titles: ["miniYASEP"]
        },
        "doc/firstrun": {
            titles: i8n.fstr,
            menu: "",
            style: "ms2_ylrd",
            onLoad: function (cont, h) {
                var w = parentWin(cont);
                ygwm.changeDimensions(F.ceil((getWidth() * 3) / 4),Math.ceil((getHeight() * 3) / 4), w);
                ygwm.move(w, 0, 0);
                if (!first_run) getById("NoCookie", "p", cont).innerHTML = "";
                if (browsLang != LANG.LN) getById("changelang", "span", cont).innerHTML = hiddenText(1, h) + " <tt>" + browsLang + "</tt>" + (LANG.supported ? "" : "</tt> " + hiddenText(2, h))
            }
        },
        "doc/thanks": {
            titles: i8n.thx,
            menu: "Dev",
            style: "ms2_ylrd"
        },
        "tuto/tuto_sim": {
            titles: i8n.tsim,
            menu: "Tuto"
        },
        "tuto/multiply": {
            titles: i8n.Mul,
            menu: "Tuto"
        },
        "tuto/tuto_fb": {
            titles: i8n.tfb,
            menu: "Tuto",
            style: "ms2_ylrd"
        },
        "tuto/translations": {
            titles: i8n.ttli8n,
            menu: "Tuto",
            style: "ms2_ylrd"
        },
        "tuto/newWin": {
            titles: i8n.ttcw,
            menu: "Tuto",
            onLoad: function (cont, h) {
                var h = "";
                for (var i in winman.window_keys) h += ' <a href="#!' + i + '" onclick="wa(\'' + i + '\')">' + i + "</a></li>";
                getById("window_keys_list", "div", cont).innerHTML = h
            }
        }
    },
    start: function (key) {
        var k = DOC_GEN.valid_keys[key],
            s = k.style || "doc_cyan",
            cont = dcE("DIV");
        cont.innerHTML = import_htmi(key);
        var h = getByClass("hiddenDiv", "DIV", cont),
            win = ygwm.new_window(h ? hiddenText(0, h) : key, null, cont, 500, 400, 250, 250, false, true, true, true, false, s),
            f = k.onLoad;
        if (typeof f == "function") f(cont, h);
        winman.patchInnerLinks(cont);
        return win
    },
    INIT_func: function () {
        for (var key in DOC_GEN.valid_keys) {
            winman.register_key(key, DOC_GEN.start);
            var t = DOC_GEN.valid_keys[key],
                m = t.menu || "Doc";
            if (t.menu !== "") menu.subMenuItem(menu.list[m], t.titles, key, 0, t.title)
        }
    }
});

function emit_bin_example() {
    var asmout = document.getElementById("emitbin_example"),
        msgout = document.getElementById("emitbin_msg"),
        asmin = document.getElementById("ex_asm_input").value,
        h = "",
        m = "",
        emit_bin_buffer = new Y.ASM_context(function (col, msg) {
            m += '<br><span style="background-color:' + col + '">&nbsp;</span> ' + msg
        }, function (data, size) {
            while (size--) {
                h += " " + int2hex(data & 255);
                data >>= 8
            }
            h += ","
        });
    Y.encode_instruction(asmin, emit_bin_buffer);
    asmout.innerHTML = h;
    msgout.innerHTML = m
};
INIT(asmwin = {
    win: null,
    size_id: null,
    space_regex: new RegExp("([&][Nn][Bb][Ss][Pp][;])|([%]20)|([%]C2[%]A0)", "g"),
    update_asm: function () {
        asmwin.value_hex.value = "";
        asmwin.size_id.innerHTML = "";
        if (Y.encode_instruction(asmwin.value_asm.value, asmwin.ASM)) asmwin.size_id.innerHTML = asmwin.msgsize + asmwin.ASM.encoded_size_bytes + asmwin.msgunit;
        return false
    },
    update_hex: function () {
        Y.DISASM(_str2int(asmwin.value_hex.value), asmwin.DISASM);
        if (asmwin.DISASM.form != null) {
            asmwin.value_asm.value = asmwin.DISASM.instruction;
            asmwin.size_id.innerHTML = asmwin.msgsize + asmwin.DISASM.size_bytes + asmwin.msgunit
        } else {
            asmwin.size_id.innerHTML = ""
        }
        return false
    },
    trigger_asm: function (loc) {
        if (loc != "") {
            loc = loc.replace(asmwin.space_regex, " ");
            var i = loc.indexOf("?");
            if (i == 1) {
                var a = loc.slice(2);
                if (loc[0] == "a") {
                    if (a) {
                        asmwin.value_asm.value = unescape(a);
                        asmwin.update_asm()
                    }
                } else if (loc[0] == "d") {
                    if (a) {
                        asmwin.value_hex.value = unescape(a);
                        asmwin.update_hex()
                    }
                }
            }
        }
    },
    start: function () {
        var h, i, cont = asmwin.cont = dcE("DIV");
        cont.innerHTML = import_htmi("ASM/asm");
        winman.patchInnerLinks(cont);
        h = getByClass("hiddenDiv", "DIV", cont);
        asmwin.win = ygwm.new_window(hiddenText(0, h), null, cont, 600, 400, 250, 150, false, true, true, true, false, "doc_cygr");
        asmwin.msgsize = hiddenText(2, h);
        asmwin.msgunit = hiddenText(3, h);
        asmwin.size_id = getById("ASM_size_id", "SPAN", cont);
        asmwin.messages = getById("ASM_messages", "DIV", cont);
        i = message_FIFO(asmwin.messages);
        asmwin.ASM = new Y.ASM_context(i, function (v, s) {
            s = (s * 2) - 1;
            asmwin.value_hex.value += int2hex(v, s, s) + " "
        });
        asmwin.DISASM = new Y.DISASM_context(i);
        i("blue", hiddenText(1, h));
        B["asm_form"].onsubmit = getById("submitAsm", "*", cont).onclick = asmwin.update_asm;
        B["hex_form"].onsubmit = getById("submitDisasm", "*", cont).onclick = asmwin.update_hex;
        asmwin.value_asm = getById("value_asm", "*", cont);
        asmwin.value_hex = getById("value_hex", "*", cont);
        asmwin.win.trigger = asmwin.trigger_asm;
        return asmwin.win
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["ASM"], i8n.asmr, "ASM/asm")
    }
});
INIT(OpcodeTable = {
    start: function () {
        OpcodeTable.cont = dcE("DIV");
        OpcodeTable.cont.innerHTML = import_htmi("tool/opcode_map");
        winman.patchInnerLinks(OpcodeTable.cont);
        var index, instr, t, h = getByClass("hiddenDiv", "DIV", OpcodeTable.cont);
        OpcodeTable.win = ygwm.new_window(hiddenText(0, h), null, OpcodeTable.cont, 850,Math.ceil((getHeight() * 3) / 4), 50, 50, false, true, true, true, false, "docStyle");
        var m = '<tr> <td colspan="2"></td> <td colspan="8" class="haut">' + hiddenText(1, h) + "</td> </tr> <td></td> <td></td>";
        for (var t = 0; t < 8; t++) m += ' <td class="haut">' + int2hex(t << 5, 1, 1) + "</td>\n";
        m += '</tr><tr><td class="haut" rowspan="16">' + hiddenText(2, h) + "</td>\n";
        for (var line = 0; line < 32; line += 4) {
            m += '<td class="side">' + int2hex(line, 1, 1);
            if (typeof Y.GroupNames[line] == "string") m += "<br>" + Y.GroupNames[line].replace(/GROUP_/, "");
            m += "</td>\n";
            for (var col = 0; col < 8; col++) {
                index = line | (col << 5);
                instr = Y.opcode_table[index];
                if (typeof instr == "object") {
                    t = Y.decorate_opcode(index);
                    m += "<td ";
                    if (instr.flags & Y.Preliminary) {
                        m += 'style="background-color:#FA8" '
                    } else if (instr.flags & Y.OPTIONAL) {
                        m += 'style="background-color:#DDD" '
                    }
                    m += 'title="' + instr.description + '" id="' + instr.name + '"><a name="' + instr.name + '">' + t + ' <span style="float:right">' + int2hex(index, 1, 1) + "</span><br>" + Y.form2html(instr.forms, 1) + "<br>" + Y.flags2html(instr.flags) + '</a>' + "</td>\n"
                } else m += '<td>' + "</td>\n"
            }
            m += "</tr>" + '<tr>\n'
        }
        getById("optab_ISM").innerHTML = m;
        m = "<tr><td>Alias</td><td>" + hiddenText(3, h) + "</td><td>" + hiddenText(4, h) + "</td></tr>";
        var j = 0;
        for (var i in Y.opcode_aliases) {
            m += "<tr";
            if (j ^= 1) m += ' bgcolor="#EEEEFF"';
            m += ">" + '<td class="f">' + Y.decorate_opcode(i) + "</td>" + '<td class="f">' + Y.form2html(Y.table_opcode[i].forms) + "</td>" + '<td class="f">' + Y.decorate_opcode(Y.opcode_aliases[i]) + "</td>" + '</tr>\n'
        }
        getById("optab_aliases").innerHTML = m;
        m = "<tr><td>" + hiddenText(5, h) + "</td><td>" + hiddenText(6, h) + "</td><td>Opcodes</td></tr>";
        var i;
        var FormUsage = [];
        var FlagUsage = [];
        for (i = 1; i < Y.MAX_FORM; i += i) FormUsage[i] = [];
        for (i = 1; i < Y.MAX_FLAG; i += i) FlagUsage[i] = [];
        for (var name in Y.table_opcode) {
            if (Y.table_opcode[name].forms > 0) {
                instr = Y.table_opcode[name];
                t = Y.decorate_opcode(name) + " ";
                i = 1;
                while (i <= instr.forms) {
                    if (i & instr.forms) FormUsage[i][FormUsage[i].length] = t;
                    i += i
                }
                i = 1;
                while (i <= instr.flags) {
                    if (i & instr.flags) FlagUsage[i][FlagUsage[i].length] = t;
                    i += i
                }
            }
        }
        var j = 0;
        for (var i in Y.TableForm) {
            m += ("<tr");
            if (j ^= 1) m += ' bgcolor="#EEEEFF"';
            var t = Y.TableForm[i];
            m += ">" + '<td class="f">' + "<a href=\"#!doc/forms#" + t + '" class="innerLink" onclick="wa(\'doc/forms#' + t + '\')">' + t + "</a></td>" + '<td class="f">' + FormUsage[i].length + "</td>" + '<td class="f">\n' + FormUsage[i].sort().join(" ") + "</td></tr>\n"
        }
        getById("optab_forms").innerHTML = m;
        m = "<tr><td>Flag</td><td>" + hiddenText(6, h) + "</td><td>Opcodes</td></tr>";
        j = 0;
        for (var i in Y.TableFlags) {
            m += "<tr";
            if (j ^= 1) m += ' bgcolor="#EEEEFF"';
            var t = Y.TableFlags[i];
            m += ">" + '<td class="f">' + "<a class=\"innerLink\" onclick=\"wa('doc/flags#" + t + '\')" href="#!doc/flags#' + t + '">' + t + "</a></td>" + '<td class="f">' + FlagUsage[i].length + "</td>" + '<td class="f">' + "\n" + FlagUsage[i].sort().join(" ") + "</td></tr>\n"
        }
        getById("optab_flags").innerHTML = m;
        return OpcodeTable.win
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Tools"], i8n.opct, "doc/opcodes")
    }
});
INIT(EU = {
    number_delay: null,
    conv: int2hex,
    bin: function (i) {
        return i !== null ? toBin(i, EU.size, 1) + "b" : "u"
    },
    dec: function (i) {
        return i !== null ? i : "u"
    },
    update_group: function () {
        var g = EU.grp[EU.group_counter++],
            i, j, k = EU.ops[g],
            l;
        for (i in k) {
            j = k[i];
            l = j.id;
            EU.equal = null;
            EU.carry = null;
            EU.result = null;
            if (EU.size == 16) Y.opcode_table[j.i].action16(EU);
            else Y.opcode_table[j.i].action32(EU);
            l.innerHTML = EU.conv(EU.result);
            if (EU.carry != null) {
                l = l.nextSibling;
                l.innerHTML = EU.carry;
                if (EU.equal != null) {
                    l.nextSibling.innerHTML = EU.equal
                }
            }
        }
        if (EU.group_counter < EU.grp.length) redraw(EU.update_group)
    },
    update: function () {
        EU.dst = EU.mask_data & _str2int(EU.dst_id.value);
        EU.snd = EU.mask_data & _str2int(EU.snd_id.value);
        EU.si4 = EU.mask_data & _str2int(EU.si4_id.value);
        EU.dst_id.value = EU.conv(EU.dst);
        EU.snd_id.value = EU.conv(EU.snd);
        EU.si4_id.value = EU.conv(EU.si4);
        if (EU.group_counter >= EU.grp.length) redraw(EU.update_group);
        EU.group_counter = 0
    },
    buildResults: function () {
        var g, h, i, j, k = EU.results.firstChild,
            tb, tr, td, tb2, tr2, td2;
        if (k) rC(k);
        (tb2 = dcE("TABLE")).className = "maingroups";
        tr2 = dcE("TR");
        for (g in EU.grp) {
            td2 = dcE("TD");
            h = EU.grp[g];
            (tb = dcE("TABLE")).className = "regs";
            tb.cellspacing = "0";
            tr = dcE("TR");
            (td = dcE("TD")).innerHTML = Y.GroupNames[h];
            td.className = "head";
            td.colSpan = "4";
            tr.appendChild(td);
            tb.appendChild(tr);
            tr = dcE("TR");
            (td = dcE("TD")).innerHTML = "Opc.";
            tr.appendChild(td);
            (td = dcE("TD")).innerHTML = I8N("res");
            tr.appendChild(td);
            (td = dcE("TD")).innerHTML = "C";
            tr.appendChild(td);
            (td = dcE("TD")).innerHTML = "=";
            tr.appendChild(td);
            tb.appendChild(tr);
            k = EU.ops[h];
            for (i in k) {
                j = k[i];
                tr = dcE("TR");
                (td = dcE("TD")).innerHTML = Y.decorate_opcode(Y.opcode_table[j.i].name) + ":";
                td.className = "CQ";
                tr.appendChild(td);
                (td = dcE("TD")).innerHTML = "u";
                td.className = "CQ";
                k[i].id = td;
                tr.appendChild(td);
                (td = dcE("TD")).className = "CQ";
                tr.appendChild(td);
                (td = dcE("TD")).className = "CQ";
                tr.appendChild(td);
                tb.appendChild(tr)
            }
            td2.appendChild(tb);
            tr2.appendChild(td2)
        }
        tb2.appendChild(tr2);
        EU.results.appendChild(tb2);
        EU.group_counter = EU.grp.length;
        EU.update()
    },
    init16: function () {
        if (EU.size != 16) {
            EU.size = 16;
            EU.button_size.innerHTML = hiddenText(1, EU.h);
            EU.mask_data = F4;
            EU.grp = EU.grp16;
            EU.ops = EU.ops16;
            EU.buildResults()
        }
    },
    init32: function () {
        if (EU.size != 32) {
            EU.size = 32;
            EU.button_size.innerHTML = hiddenText(2, EU.h);
            EU.mask_data = F8;
            EU.grp = EU.grp32;
            EU.ops = EU.ops32;
            EU.buildResults()
        }
    },
    trigger: function (size) {
        size = +size;
        switch (size) {
            case 16:
                return EU.init16();
            case 32:
                return EU.init32();
            default:
                Al8N("", "#!tool/EU : '", "", size, "Wds")
        }
    },
    check: function (e) {
        if ((e.which || e.keyCode) == 13) EU.update();
        return true
    },
    start: function () {
        EU.size = 32;
        if (!EU.grp16) {
            var ops16 = [],
                ops32 = [],
                grp16 = [],
                grp32 = [],
                i, g;
            for (i in Y.opcode_table) {
                g = i & Y.FIELD_GROUP;
                if (typeof Y.opcode_table[i].action16 == "function") {
                    if (!ops16[g]) {
                        ops16[g] = [];
                        grp16.push(g)
                    }
                    ops16[g].push({
                        i: i
                    })
                }
                if (typeof Y.opcode_table[i].action32 == "function") {
                    if (!ops32[g]) {
                        ops32[g] = [];
                        grp32.push(g)
                    }
                    ops32[g].push({
                        i: i
                    })
                }
            }
            EU.grp32 = grp32;
            EU.ops32 = ops32;
            EU.grp16 = grp16;
            EU.ops16 = ops16
        }
        var cont = dcE("DIV");
        cont.innerHTML = import_htmi("tool/EU");
        winman.patchInnerLinks(cont);
        var h = EU.h = getByClass("hiddenDiv", "DIV", cont),
            win = EU.win = ygwm.new_window(hiddenText(0, h), null, cont, 700, 440, 20, 50, false, true, true, true, false, "docStyle");

        function createText(val) {
            var inp = dcE("INPUT");
            inp.type = "text";
            inp.value = val;
            inp.maxLength = inp.size = 12;
            inp.onkeyup = EU.check;
            inp.onblur = EU.update;
            return inp
        }

        function createButton(val, func) {
            var bt = dcE("BUTTON");
            bt.innerHTML = val;
            bt.onclick = func;
            return bt;
        }

        function inc_val(id, inc) {
            return function () {
                id.value = int2hex(_str2int(id.value) + inc);
                EU.update()
            }
        }
        var tb, tr, td;
        (tb = dcE("TABLE")).className = "control";
        tr = dcE("TR");
        (td = dcE("TD")).innerHTML = hiddenText(4, h);
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(EU.snd_id = createText("1234h"));
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(createButton(" + ", inc_val(EU.snd_id, 1)));
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(createButton(" - ", inc_val(EU.snd_id, -1)));
        tr.appendChild(td);
        tb.appendChild(tr);
        tr = dcE("TR");
        (td = dcE("TD")).innerHTML = hiddenText(5, h);
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(EU.si4_id = createText("5678h"));
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(createButton(" + ", inc_val(EU.si4_id, 1)));
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(createButton(" - ", inc_val(EU.si4_id, -1)));
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(createButton(" bin ", function () {
            EU.conv = EU.bin;
            EU.update()
        }));
        td.appendChild(createButton(" dec ", function () {
            EU.conv = EU.dec;
            EU.update()
        }));
        td.appendChild(createButton(" hex ", function () {
            EU.conv = int2hex;
            EU.update()
        }));
        tr.appendChild(td);
        tb.appendChild(tr);
        tr = dcE("TR");
        (td = dcE("TD")).innerHTML = hiddenText(3, h);
        tr.appendChild(td);
        (td = dcE("TD")).style.textAlign = "left";
        td.appendChild(EU.dst_id = createText("9ABCh"));
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(createButton(" + ", inc_val(EU.dst_id, 1)));
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(createButton(" - ", inc_val(EU.dst_id, -1)));
        tr.appendChild(td);
        (td = dcE("TD")).appendChild(EU.button_size = createButton("_", function () {
            if (EU.size == 16) EU.init32();
            else EU.init16()
        }));
        tr.appendChild(td);
        tb.appendChild(tr);
        cont.appendChild(tb);
        cont.appendChild(EU.results = dcE("DIV"));
        win.trigger = EU.trigger;
        Y.opcodeInterface(EU);
        EU.init16();
        return win
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Tools"], i8n.EU, "tool/EU")
    }
});
INIT(template = {
    win: null,
    start: function () {
        template.cont = dcE("DIV");
        template.cont.innerHTML = import_htmi("test/template");
        winman.patchInnerLinks(template.cont);
        var t, h = getByClass("hiddenDiv", "DIV", template.cont);
        template.win = ygwm.new_window(hiddenText(0, h), null, template.cont, 500, 400, 250, 250, false, true, true, true, false, "WinOK");
        getById("template_id", "SPAN", template.cont).innerHTML = hiddenText(1, h);
        return template.win
    },
    INIT_func: function () {
        template.menuItem = menu.subMenuItem(menu.list["Dev"], i8n.tmpl, "test/template")
    }
});
INIT(DEF_ASM = {
    win: null,
    make_reg: function () {
        var h = "/* defora/src/arch/yasep.reg\n" + "   Copyright (c) 2011-2012 Yann Guidon <whygee@f-cpu.org>\n" + "    derived from code created by Pierre Pronchery <khorben@defora.org>\n" + "   This file is part of DeforaOS Devel asm\n" + generated("  ", "defora/gen_asm.js") + " */\n\n";
        for (var i in Y.registers_names) {
            h += "REG(" + pad_right(Y.registers_names[i].toLowerCase(), 4) + ", W, " + pad_left(i, 3) + ")\n"
        }
        SaveFile.save("yasep.reg", h)
    },
    make_S: function () {
        var errnum = 0,
            msg_number = 0,
            h = "/* DeforaOS/Apps/Devel/src/asm/test/yasep.S\n" + "   Copyright (c) 2011 Pierre Pronchery <khorben@defora.org>\n" + "   Copyright (c) 2011-2012 Yann Guidon <whygee@f-cpu.org>\n" + "   This file is part of DeforaOS Devel asm\n\n" + "   Assembly language dump to test the Defora\n" + "    assembler for the YASEP architecture.\n" + "   Bytes are in little endian order.\n\n" + generated("  ", "defora/gen_asm.js") + " */\n\n.text\n";

        function add_message(col, msg) {
            if ((col == "blue") || (col == "green")) return;
            h += " ###### " + msg + "*/\n"
        }
        var ASM = new Y.ASM_context(add_message);
        ASM.YASEP_TYPE = 32;

        function test_opcode(x) {
            h += "\t" + pad_right(x, 24).toLowerCase() + "/* ";
            if (Y.encode_instruction(x, ASM)) {
                var e = ASM.encoded_instruction,
                    s = ASM.encoded_size_bytes,
                    t = " ";
                while (s--) {
                    t += pad_left("0x" + int2hex(e & 255, 1, 1, 1), 5);
                    e >>= 8
                }
                h += pad_right(ASM.form, 10) + pad_right(t, 25) + " */\n"
            } else errnum++
        }
        for (var cur_opcode in DEF_ASM.sorted_opcodes) {
            var name = DEF_ASM.sorted_opcodes[cur_opcode],
                instr = Y.table_opcode[name];
            index = instr.val, f = instr.forms, g = instr.flags, i = 1, j = "", a = Y.opcode_aliases[name];
            if (g & Y.YASEP16_ONLY) {
                h += "#if defined(ARCH_yasep16)\n";
                j = "#endif\n"
            } else if (g & Y.YASEP32_ONLY) {
                h += "#if defined(ARCH_yasep32)\n";
                j = "#endif\n"
            }
            if (a) {
                h += "#if defined(ALLOW_YASEP_ALIASES)\n";
                j += "#endif\n"
            }
            h += "/* 0x" + (int2hex(index, 1, 1, 1)) + " = " + name;
            if (a) h += " (alias to " + a + ")";
            h += " : " + instr.description + "*/\n";
            do {
                if (f & i) {
                    var w = Y.TableEncoders[Y.TableForm[i]].ex(g, name);
                    if (w == "") w = name;
                    else w = name + " " + w;
                    test_opcode(w);
                    if ((i & Y.FORMS_EXTENDABLE) && ((g & Y.NO_CONDITION) == 0)) test_opcode(w + " " + Y.randomCondition())
                }
                i <<= 1
            } while (i <= f);
            h += j + "\n"
        }
        SaveFile.save("yasep.S", h)
    },
    make_flags: function () {
        var i, j, t, h = "/* DeforaOS/Apps/Devel/src/asm/src/arch/yasep.flags\n" + "   Copyright (c) 2011 Yann Guidon <whygee@f-cpu.org>\n" + "   This file is part of DeforaOS Devel asm\n" + generated("  ", "defora/gen_asm.js") + " */\n\n";
        for (i in Y.TableFlags) {
            h += "#define " + pad_right(Y.TableFlags[i], 15) + pad_left(i, 8) + "\n"
        }
        h += "\n\nuint32_t _yasep_flags[64]={\n";
        i = 0;
        while (true) {
            h += "0";
            if (t = Y.opcode_table[i << 2]) {
                h += " /* " + pad_right(t.name, 6) + "*/";
                j = 1;
                t = t.flags;
                while (j <= t) {
                    if (j & t) h += " | " + Y.TableFlags[j];
                    j <<= 1
                }
            }
            i++;
            if (i >= 64) break;
            h += ",\n"
        }
        h += "\n};\n\n";
        for (i in Y.TableForm) {
            h += "#define " + pad_right(Y.TableForm[i], 11) + pad_left(i, 6) + "\n"
        }
        h += "\n\nuint32_t _yasep_forms[64]={\n";
        i = 0;
        while (true) {
            h += "0";
            if (t = Y.opcode_table[i << 2]) {
                h += " /* " + pad_right(t.name, 6) + "*/";
                j = 1;
                t = t.forms;
                while (j <= t) {
                    if (j & t) h += " | " + Y.TableForm[j];
                    j <<= 1
                }
            }
            i++;
            if (i >= 64) break;
            h += ",\n"
        }
        h += "\n}\n";
        SaveFile.save("yasep.flags", h)
    },
    make_ins: function () {
        var i, j = 0,
            k = 0,
            h = "/* DeforaOS/Apps/Devel/src/asm/src/arch/yasep.ins\n" + "   Copyright (c) 2011 Yann Guidon <whygee@f-cpu.org>\n" + "   Derived from :\n" + "   Copyright (c) 2011 Pierre Pronchery <khorben@defora.org>\n" + "   This file is part of DeforaOS Devel asm\n" + generated("  ", "defora/gen_asm.js") + " */\n\n" + "#define OP_REG    AO_REGISTER(0,  W,  0)\n" + "#define OP_IMM2   AO_IMMEDIATE(0, 2,  0)\n" + "#define OP_IMM4   AO_IMMEDIATE(0, 4,  0)\n" + "#define OP_IMM5   AO_IMMEDIATE(0, 5,  0)\n" + "#define OP_IMM8   AO_IMMEDIATE(0, 8,  0)\n" + "#define OP_IMM16  AO_IMMEDIATE(0, 16, 0)\n" + "#define OP_IMM20  AO_IMMEDIATE(0, 20, 0)\n" + "\n";
        for (i in Y.TableForm) h += "#define " + pad_right(Y.TableForm[i] + "_F", 12) + pad_left(j++, 3) + "|(16 << AOD_SIZE)\n";
        h += "\n";
        for (var cur_opcode in DEF_ASM.sorted_opcodes) {
            var name = DEF_ASM.sorted_opcodes[cur_opcode],
                instr = Y.table_opcode[name],
                index = instr.val,
                s, t, f = instr.forms,
                g = instr.flags,
                i = 1,
                j = "",
                a = Y.opcode_aliases[name];
            h += "#if defined(OPCODE_YASEP_" + name + ")\n";
            j = "#endif\n";
            if (a) {
                h += "#if defined(ALLOW_YASEP_ALIASES)\n";
                j += "#endif\n"
            }
            h += '/**** ' + name;
            if (a) h += " (alias to " + a + ")";
            h += ' ****/\n';
            do {
                t = Y.TableForm[i];
                if ((f & i) && Y.TableEncoders[t].de) {
                    s = Y.TableEncoders[t].lsb(g);
                    h += "{ " + pad_right('"' + name.toLowerCase() + '", ', 9) + "0x" + int2hex(index | s, 1, 1, 1) + ", " + Y.TableEncoders[t].de(g) + " },\n"
                }
                i <<= 1
            } while (i <= f);
            h += j + "\n"
        }
        SaveFile.save("yasep.ins", h.slice(0, -2))
    },
    start: function () {
        DEF_ASM.sorted_opcodes = [];
        for (var name in Y.table_opcode) {
            if (Y.table_opcode[name].forms > 0) DEF_ASM.sorted_opcodes.push(name)
        }
        DEF_ASM.sorted_opcodes = DEF_ASM.sorted_opcodes.sort();
        var div = dcE("DIV"),
            c = I8N("c") + " ",
            b = '</button><br><button id="';
        div.innerHTML = '<button id="save_S">' + c + 'yasep.S' + b + 'save_ins">' + c + 'yasep.ins' + b + 'save_flags">' + c + 'yasep.flags' + b + 'save_prof">' + c + ' !! yasep_profile.c !! ' + b + 'save_conf">' + c + ' !! project.conf !! ' + b + 'save_reg">' + c + 'yasep.reg</button>';
        getById("save_S", null, div).onclick = DEF_ASM.make_S;
        getById("save_ins", null, div).onclick = DEF_ASM.make_ins;
        getById("save_reg", null, div).onclick = DEF_ASM.make_reg;
        getById("save_prof", null, div).onclick = getById("save_conf", null, div).onclick = function () {
            alert(" PAS ENCORE FAIT !")
        };
        getById("save_flags", null, div).onclick = DEF_ASM.make_flags;
        return (DEF_ASM.win = ygwm.new_window("Defora ASM files", null, div, 150, 120, 600, 70, false, true, true, true, false, "doc_gryl"))
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Dev"], i8n.def, "def/asm")
    }
});
INIT(Map = {
    MapList: [],
    MapCount: 1,
    changeLastAddress: function (w) {
        w.memory.last = w.memory.first + w.memory.size;
        w.memory.last_id.innerHTML = (w.memory.size > 0) ? (w.memory.last - 1) : "/"
    },
    changeStartAddress: function (w, f) {
        w.memory.first_id.innerHTML = w.memory.first = +f;
        Map.changeLastAddress(w)
    },
    changeSize: function (w, s) {
        w.memory.size_id.innerHTML = w.memory.size = +s;
        Map.changeLastAddress(w)
    },
    changeRights: function (w, rwx) {
        w.memory.rwx = +rwx
    },
    NewMem: function (w, a, rwx, c, f, s) {
        var cMS = Map.createMapSel(w),
            d = dcE("DIV");

        function n(i) {
            var e = dcE("DIV"),
                g = dcE("SPAN");
            e.innerHTML = I8N(i);
            g.style.fontStyle = "italic";
            e.appendChild(g);
            d.appendChild(e);
            return g
        }
        w.memory = {
            mem: [],
            Align: a,
            first: +f,
            first_id: n("adrd"),
            size: +s,
            size_id: n("adrs"),
            last_id: n("adrf"),
            callback: c
        };
        Map.changeStartAddress(w, f);
        Map.changeRights(w, rwx);
        Map.changeSize(w, s);
        cMS.insertBefore(d, cMS.firstChild);
        return cMS
    },
    export_MAP: function () {},
    export_ASM: function () {},
    export_HEX: function () {},
    export_VHDL: function () {},
    openMap: function () {
        var m = wa("sim/map"),
            s = parentWin(this);
        if (s.regs) Map.addSim(s, m);
        else Map.addEdit(s, m);
        delay(Map.mapSelDelay)
    },
    createMapSel: function (w) {
        var d = dcE("DIV"),
            e = dcE("DIV"),
            f = d.style;
        f.whiteSpace = "pre";
        f.position = "relative";
        f.cssFloat = "right";
        f.border = "1px solid #AAA";
        button(e, "canm", Map.openMap);
        e.appendChild(w.MapSel = dcE("FORM"));
        h3(d, e, "aja");
        delay(Map.mapSelDelay);
        return d
    },
    focusParent: function () {
        ygwm.focus_window(0, this.parentNode.w)
    },
    focusDiv: function () {
        ygwm.focus_window(0, this.w)
    },
    changeEdit: function () {
        var e = parentWin(this),
            m = this.parentNode.w;
        if (this.checked) Map.addEdit(e, m);
        else Map.delEdit(e, m)
    },
    addEdit: function (e, m) {
        e.Maps[m.MapCount] = m;
        m.edList[e.YasCount] = e;
        var d = Map.makeLine(e, Map.buttonDelEdit);
        e.MapDiv[m.MapCount] = d;
        m.edListDiv.appendChild(d)
    },
    buttonDelEdit: function () {
        Map.delEdit(this.parentNode.w, parentWin(this))
    },
    delEdit: function (e, m) {
        var f = e.MapDiv[m.MapCount];
        rC(f);
        delete m.edList[e.YasCount];
        delete e.Maps[m.MapCount];
        delay(Map.mapSelDelay)
    },
    delAllEdit: function (w) {
        for (var i in w.Maps) Map.delEdit(w, w.Maps[i])
    },
    makeLine: function (u, c) {
        var d = dcE("DIV"),
            f = dcE("DIV");
        d.innerHTML = u.winTitle;
        d.w = u;
        d.className = "BPitem";
        d.onclick = Map.focusDiv;
        f.className = "minus";
        f.onclick = c;
        f.title = I8N("dtl");
        d.appendChild(f);
        delay(Map.mapSelDelay);
        return d
    },
    changeSim: function () {
        var s = parentWin(this);
        if (this.checked) Map.addSim(s, this.parentNode.w);
        else Map.delSim(s)
    },
    addSim: function (s, m) {
        if (s.Map) Map.delSim(s);
        s.Map = m;
        sim.resetState(s);
        m.simListDiv.appendChild(s.MapDiv = Map.makeLine(s, Map.buttonDelSim));
        m.simList[s.simCount] = s
    },
    buttonDelSim: function () {
        Map.delSim(this.parentNode.w)
    },
    delSim: function (s) {
        m = s.Map;
        if (m && m.simList) {
            delete m.simList[s.simCount];
            rC(s.MapDiv)
        }
        s.Map = null;
        sim.resetState(s, 6);
        delay(Map.mapSelDelay)
    },
    mapSelDelay: {
        delay: 500,
        max: 20,
        counter: 20,
        timer: null,
        func: function () {
            var w, j, d, e, g, i, j;
            for (j in winlist.list) {
                w = winlist.list[j];
                if (d = w.MapSel) {
                    d.innerHTML = "";
                    for (i in Map.MapList) {
                        (e = dcE("DIV")).w = Map.MapList[i];
                        e.className = "BPitem";
                        g = dcE("INPUT");
                        if (w.regs) {
                            g.name = w.simCount;
                            g.type = "radio";
                            g.onchange = Map.changeSim;
                            if (w.Map && w.Map == e.w) g.checked = true
                        } else {
                            g.type = "checkbox";
                            g.onchange = Map.changeEdit;
                            if (w.Maps[e.w.MapCount] == e.w) g.checked = true
                        }
                        e.appendChild(g);
                        (g = dcE("SPAN")).innerHTML = e.w.winTitle;
                        g.onclick = Map.focusParent;
                        g.style.cursor = "pointer";
                        e.appendChild(g);
                        d.appendChild(e)
                    }
                }
            }
        }
    },
    removeMap: function (m) {
        delete Map.MapList[m.MapCount];
        for (var i in m.simList) Map.delSim(m.simList[i]);
        for (var i in m.edList) Map.delEdit(m.edList[i], m);
        delay(Map.mapSelDelay)
    },
    adrEdLookup: function (p, a) {
        if (p) {
            var i, l = p.edList,
                w, m;
            for (i in l) {
                w = l[i];
                m = w.memory;
                if (m && a >= m.first && a < m.last) return w
            }
        }
        return _
    },
    MemRead: function (mp, o, a, sim, rwx) {
        var m, w = o.w;
        if (!w || !(m = w.memory) || (a < m.first) || (a >= m.last)) w = Map.adrEdLookup(mp, a);
        if (w && (m = w.memory)) {
            o.w = w;
            if (rwx & m.rwx) {
                a -= m.first;
                if (m.callback) m.callback(w, a, rwx, sim);
                return m.mem[a]
            }
        }
        return o.w = _
    },
    MemWrite: function (mp, o, a, sim, d) {
        var m, w = o.w;
        if (!w || !(m = w.memory) || a < m.first || a > m.last) w = Map.adrEdLookup(mp, a);
        if (w && (m = w.memory)) {
            o.w = w;
            if (2 & m.rwx) {
                a -= m.first;
                if (m.callback) m.callback(w, a, 2, sim, d);
                m.mem[a] = d;
                return true
            }
        }
        return o.w = _
    },
    start: function () {
        function Niy() {
            alert("Not implemented yet.\nStay tuned !")
        }
        var cont = dcE("DIV"),
            c, d = dcE("DIV"),
            e, f, g, w = ygwm.new_window(I8N("Mp") + " #" + Map.MapCount, null, cont, 400, 500, 100, 170, false, true, true, true, false, "doc_blue");
        cont.innerHTML = WARN + ' Incomplete, please stay tuned...<br>';
        w.eraseCallback = Map.removeMap;
        w.simList = [];
        w.edList = [];
        cont.appendChild(d);
        button(d = w.simListDiv = dcE("DIV"), "NS", function () {
            Map.addSim(wa('sim/YASim'), parentWin(this))
        });
        h3(cont, d, "lsi");
        button(d = w.edListDiv = dcE("DIV"), "ne", function () {
            Map.addEdit(wa('ASM/YASMed'), parentWin(this))
        });
        button(d, "NF", function () {
            Map.addEdit(wa('sim/fb'), parentWin(this))
        });
        h3(cont, d, "led");
        cont.appendChild(dcE("HR"));
        delay(Map.mapSelDelay);
        return Map.MapList[w.MapCount = Map.MapCount++] = w
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Sim"], i8n.Map, "sim/map")
    }
});
INIT(sim = {
    simCount: 1,
    create_cursor: function (col, cont, omd, w) {
        var c = dcE("DIV");
        c.ed = null;
        c.win = w;
        c.className = "tag";
        c.style.color = col;
        c.innerHTML = cont + "\u25B6";
        c.onmousedown = omd;
        return c
    },
    changeState: function (w, n) {
        sim.logLine(w);
        w.shortmsg("&nbsp;" + I8N("St") + "&nbsp;<i>" + I8N("states")[w.state = n] + "</i>");
        w.arrowDiv.style.display = (n < 6) ? "block" : "none";
        if ((n > 4) && w.arrow.ed) YASMed.unlinkArrow(w)
    },
    resetState: function (w, s) {
        var i;
        sim.changeState(w, s || 0);
        w.currentInstruction = null;
        sim.stop(w);
        w.cycle_id.textContent = w.cycle = w.address = w.result = s ? "u" : 0;
        w.reg_park = [];
        for (i in w.regs) {
            w.regs[i] = null;
            w.regs_id[i].innerHTML = "u";
            w.regs_hint[i] = {};
            w.regs_id[i].id = "";
            (w.regs_histo[i] = dcE("DIV")).nl = 0
        }
        sim.changeCarry(w, null);
        sim.changeEqual(w, null);
        w.trace_id.innerHTML = "";
        w.traceLen = w.validRegs = 0;
        w.logBuff = "";
        sim.displayRegHistory(0, w);
        sim.regWrite(w, 0, 0);
        w.carry = w.equal = 0;
        w.Carry_id.checked = w.Equal_id.checked = w.BPstop = false;
        sim.flushChanges(0, w);
        if (Map.MemRead(w.Map, w.regs_hint[0], 0, w, 1) !== null) sim.change_profile(w.regs_hint[0].w.asmctx.profile || "YASEP32", w);
        sim.instrLoad(w);
        sim.updateASM(w)
    },
    flushChanges: function (e, t) {
        var i, w = parentWin(t || this);
        for (i in w.regs) w.regs_changed[i].innerHTML = ""
    },
    abort: function (w, n, e, t) {
        if (t) sim.traceLog(w, t);
        if (n > 4) w.currentInstruction = null;
        sim.changeState(w, n);
        w.BPstop = true;
        if (e) e.id = "XX";
        return false
    },
    instrLoad: function (w) {
        var a, b, m = w.Map;
        for (var i = 0; i < 32; i++) w.regMod[i] = " ";
        if (m) {
            w.flags = 0;
            w.instrLen = 2;
            if ((a = Map.MemRead(m, w.regs_hint[0], w.currentAddress = w.regs[0] & ~1, w, 1)) === null) return sim.abort(w, 5, w.regs_id[0], "can't read instruction halfword@" + w.currentAddress);
            if (a & 1) {
                w.instrLen = 4;
                if ((b = Map.MemRead(m, w.regs_hint[0], w.currentAddress + 2, w, 1)) === null) return sim.abort(w, 5, w.regs_id[0], "can't read instruction halfword@" + (w.currentAddress + 2));
                a |= b << 16
            }
            if (!(w.regs_hint[0].w.memory.rwx & w.bpBits)) sim.traceLog(w, "Incompatible datapath size (YASim=" + w.bpBits + ")");
            w.currentInstruction = a;
            w.opcode = (a &= 252);
            if (!w.profile.valid[a]) {
                sim.traceLog(w, "This opcode is invalid for this profile");
                sim.changeState(w, 5);
                w.BPstop = true
            }
            w.flags = Y.opcode_table[a].flags;
            w.validRegs |= 1
        } else w.currentInstruction = _
    },
    updateASM: function (w) {
        var a = w.currentInstruction;
        w.Disas_hex.innerHTML = int2hex(a);
        w.Disas_msg.innerHTML = "";
        if (a !== null) {
            if (w.profile.valid[a & 252]) {
                Y.DISASM(a, w.DISASM);
                w.Disas_out.innerHTML = w.DISASM.instruction;
                w.Disas_out.style.backgroundColor = ""
            } else {
                w.Disas_out.style.backgroundColor = "orange";
                w.Disas_out.innerHTML = I8N("asmie")
            }
        } else {
            w.Disas_out.style.backgroundColor = "#777";
            w.Disas_out.innerHTML = "u";
            w.Disas_msg.innerHTML = I8N(w.Map ? "iia" : "fcsm")
        }
    },
    multiread: {
        " ": "\u204E",
        "\u204E": "\u2051",
        "\u2051": "\u2042"
    },
    readReg: function (w, n, sym) {
        n &= 15;
        var b = sim.regIndexDisplay[n];
        if (w.validRegs & (1 << n)) {
            w.regMod[b] = sym || sim.multiread[w.regMod[b]] || "?";
            return w.regs[n]
        } else {
            sim.traceLog(w, "attempt to read an invalid register " + Y.registers_names[n]);
            return _
        }
    },
    oneStep: function (w) {
        var dst = -1,
            cond = true,
            condReg, condFunc, a = w.currentInstruction,
            b, c = Y.opcode_table[w.opcode],
            name = c.name,
            fx = c["action" + w.bpBits];
        w.result = w.dst = w.snd = w.si4 = null;
        if (((a & 3) == 3) && !(Y.NO_CONDITION & w.flags)) {
            condReg = (a >> 24) & 15;
            if ((condFunc = (a >> 22) & 3) == 1) {
                if ((b = sim.readReg(w, 1)) === null) return sim.abort(w, 5);
                cond = (b >> condReg) & 1
            } else {
                if (condReg != 0) {
                    if ((b = sim.readReg(w, condReg)) === null) return sim.abort(w, 5);
                    switch (condFunc) {
                        case 0:
                            cond = (b == 0);
                            break;
                        case 2:
                            cond = b & 1;
                            break;
                        case 3:
                            cond = 1 & (b >> (w.bpBits - 1))
                    }
                } else {
                    switch (condFunc) {
                        case 0:
                            break;
                        case 2:
                            if ((1 << 16) & w.validRegs) cond = w.carry;
                            else return sim.abort(w, 5, null, "Carry flag not written yet");
                            break;
                        case 3:
                            if ((1 << 17) & w.validRegs) cond = w.equal;
                            else return sim.abort(w, 5, null, "Equal flag not written yet")
                    }
                }
            }
            if (Y.FIELD_CNDNEG & a) cond = !cond
        }
        if (cond) {
            if (!(Y.IGNORE_SND & w.flags))
                if ((w.snd = sim.readReg(w, a >> 8)) === null) return sim.abort(w, 5);
                else w.snd &= w.bpMask;
            if (!(Y.IGNORE_SI4 & w.flags)) {
                if (a & 1) {
                    if (a & 2) {
                        if (a & Y.FIELD_AUX) {
                            w.si4 = (a >> 12) & 15;
                            if (!((a >> 28) & 15)) w.si4 = Y.PC_Imm4[w.si4];
                            else if ((w.si4 & 8) && ((a & 28) != 12)) w.si4 |= ~7
                        } else if ((w.si4 = sim.readReg(w, a >> 12)) === null) return sim.abort(w, 5)
                    } else if (!(Y.IGNORE_IMM16 & w.flags)) {
                        w.si4 = a >> 16;
                        if ((Y.IMM20 & w.flags) && (w.bpBits > 16)) {
                            w.si4 &= F4;
                            w.si4 |= ((a & 3840) << 20) >> 12
                        }
                    }
                } else {
                    if (a & 2) {
                        w.si4 = (a >> 12) & 15;
                        if ((w.si4 & 8) && ((a & 28) != 12)) w.si4 |= ~7
                    } else if ((w.si4 = sim.readReg(w, a >> 12)) === null) return sim.abort(w, 5)
                }
                w.si4 &= w.bpMask
            }
            if (((a & 3) == 3) && (Y.READ_DST & w.flags))
                if ((w.dst = sim.readReg(w, a >> 24)) === null) return sim.abort(w, 5);
                else w.dst &= w.bpMask;
            if (typeof fx == "function") fx(w);
            else switch (name) {
                case "NOP":
                case "CALL":
                case "CRIT":
                    break;
                case "HALT":
                    return sim.abort(w, (a & ~Y.FIELD_OPCODE) == 61442 ? 5 : 4);
                default:
                    if (name != "INV") sim.traceLog(w, "Opcode non géré");
                    return sim.abort(w, 5)
            }
            if (!(Y.NO_WRITEBACK & w.flags)) {
                if (name == "CALL") {
                    w.result = w.instrLen + w.currentAddress;
                    w.instrLen = 0;
                    w.currentAddress = w.si4
                }
                dst = (a >> ((a & 1) ? 28 : 8)) & 15;
                if (!sim.regWrite(w, dst, w.result)) return
            }
            if (Y.CHANGE_CARRY & w.flags) sim.changeCarry(w, w.carry);
            if (Y.CHANGE_EQUAL & w.flags) sim.changeEqual(w, w.equal)
        }
        sim.logLine(w);
        if (w.cycleTraps[w.cycle_id.innerHTML = ++w.cycle] == true) return abort(w, 3);
        if (dst != 0) sim.regWrite(w, 0, w.instrLen + w.currentAddress);
        sim.instrLoad(w)
    },
    runNext: null,
    insertRun: function (w, s) {
        w.BPstop = false;
        sim.changeState(w, s);
        var a = sim.runNext;
        if (a) {
            var p = w.runNext = a.runNext;
            a.runNext = w;
            w.runPrev = p.runPrev;
            p.runPrev = w
        } else {
            sim.runNext = w.runNext = w.runPrev = w;
            redraw(sim.multiRun)
        }
    },
    stop: function (w) {
        if (w.state < 3) sim.changeState(w, 3);
        var n = w.runNext;
        if (n) {
            if (w == n) sim.runNext = null;
            else {
                if (w == sim.runNext) sim.runNext = n;
                var a = w.runPrev;
                a.runNext = n;
                n.runPrev = a
            }
            w.runNext = w.runPrev = _
        }
        sim.updateASM(w)
    },
    buttonReset: function () {
        var w = parentWin(this);
        if (w.state < 6) sim.resetState(w)
    },
    buttonStop: function () {
        sim.stop(parentWin(this))
    },
    buttonStep: function () {
        var w = parentWin(this);
        if (w.state < 4) {
            sim.stop(w);
            sim.oneStep(w);
            sim.updateASM(w)
        }
    },
    buttonMultiStep: function (e, t) {
        var w = parentWin(t || this);
        if (w.state < 4) {
            sim.stop(w);
            w.skipCount = w.skipCycles;
            sim.insertRun(w, 1)
        }
    },
    buttonRun: function (e, t) {
        var w = parentWin(t || this);
        sim.stop(w);
        if (w.state < 4) sim.insertRun(w, 2)
    },
    multiRun: function () {
        if (sim.runNext) {
            var d = +newDate() + 500,
                w = sim.runNext;
            do {
                sim.oneStep(w);
                if (w.BPstop || (w.state == 1 && (--w.skipCount < 1))) return sim.stop(w);
                sim.runNext = w = w.runNext
            } while (d > +newDate());
            w = sim.runNext;
            do {
                sim.updateASM(w);
                w = w.runNext
            } while (w != sim.runNext);
            redraw(sim.multiRun)
        }
    },
    change_profile: function (a, w) {
        var l, m = 0,
            p, t = this,
            found = false;
        if (typeof a != "string") {
            if (w) t = w.ProfileSel;
            else w = parentWin(t);
            a = t.options[t.selectedIndex].text
        } else {
            if (typeof profiles[a] != "object") return Al8N("Ipn");
            var i, sel = w.ProfileSel;
            for (i in sel.options) {
                if (sel.options[i].text == a) {
                    found = true;
                    break
                }
            }
            if (!found) {
                i = sel.options.length;
                sel.options[i] = new Option(a)
            }
            sel.selectedIndex = i
        }
        a = (w.profile = profiles[w.profileName = a]).datapath;
        if (w.bpBits != a) {
            w.algnMask = a == 16 ? -2 : -4;
            w.DISASM.YASEP_TYPE = w.bpBits = a;
            while (a--) m += m + 1;
            w.bpMask = m | 0;
            l = w.BPdiv.getElementsByTagName("INPUT");
            for (b in l)
                if (l[b].id == "num") l[b].onkeyup();
            sim.redisReg(w)
        }
    },
    update_proflist: function (u, t) {
        t = t || this;
        var p, s = t.selectedIndex,
            i = 0;
        for (p in profiles) {
            if (!t.options[i] || (t.options[i].text != p)) t.options[i] = new Option(p);
            i++
        }
        t.selectedIndex = s > 0 ? s : 0
    },
    listBlur: function () {
        var w = parentWin(this);
        sim.change_profile(w.profileName, w)
    },
    chBase: function (t) {
        var i, w = parentWin(t);
        w.num_func = sim["num_" + t.value];
        sim.redisReg(w)
    },
    num_bin: function (n, d) {
        return toBin(n, d, 1) + "b"
    },
    num_dec: function (n) {
        return n
    },
    num_hex: function (n) {
        return int2hex(n)
    },
    redisReg: function (w) {
        var r;
        for (i in w.regs) {
            r = w.regs[i];
            w.regs_id[i].innerHTML = r !== null ? w.num_func(w.regs[i] & w.bpMask, w.bpBits) : "u"
        }
    },
    displayRegHistory: function (n, w) {
        if (!w) {
            n = this.nr;
            w = parentWin(this)
        }
        w.regName.innerHTML = Y.registers_names[n];
        var f = w.HistoDiv;
        if (f.firstChild) rC(f.firstChild);
        f.appendChild(w.regs_histo[n])
    },
    regIndexDisplay: [0, 2, 4, 6, 8, 10, 20, 30, 18, 28, 16, 26, 14, 24, 12, 22],
    regWrite: function (w, r, v, sym, dis) {
        r &= 15;
        var rs = 1 << r,
            a, b, c, d, i, j, m = w.Map,
            id = "";
        if (v !== null) {
            v &= w.bpMask;
            if (!r) {
                if (v & 1) sim.traceLog(w, I8N("awPL"));
                v &= ~1
            }
            w.validRegs |= rs
        } else w.validRegs &= ~rs;
        w.regs[r] = v;
        n = w.regs_id[r].textContent = (v === null) ? "u" : w.num_func(v, w.bpBits);
        if (r >= 6) {
            a = r ^ 1;
            if (r & 1) {
                if ((w.profile.Park == 1) && (v === w.bpMask)) {
                    id = "P";
                    w.reg_park[r] = 1
                } else {
                    w.reg_park[r] = 0;
                    if (v !== null) {
                        v &= w.algnMask;
                        if ((b = Map.MemRead(m, w.regs_hint[r], v, w, 4)) === null) {
                            id = "XX";
                            w.validRegs &= ~rs
                        } else if (w.bpBits > 16) {
                            if ((c = Map.MemRead(m, w.regs_hint[r], v + 2, w, 4)) === null) {
                                b = null;
                                id = "XX";
                                w.validRegs &= ~rs
                            } else b |= c << 16
                        }
                    } else b = v;
                    sim.regWrite(w, a, b, "\u25B2", true)
                }
                if (w.regs_id[r].id != id) w.regs_id[r].id = id
            } else {
                if ((v !== null) && (dis !== true) && (w.reg_park[a] != 1)) {
                    if (w.validRegs & (1 << a)) {
                        b = w.regs[a] & w.algnMask;
                        if (Map.MemWrite(m, w.regs_hint[a], b, w, v & F4) === null) return sim.abort(w, 5, w.regs_id[a], "can't write memory");
                        if (w.bpBits > 16)
                            if (Map.MemWrite(m, w.regs_hint[a], b | 2, w, v >>> 16) === null) return sim.abort(w, 5, w.regs_id[a], "can't write memory")
                    } else return sim.abort(w, 5, w.regs_id[a], "can't write memory: invalid address")
                }
            }
        }
        w.regMod[sim.regIndexDisplay[r] + 1] = w.regs_changed[r].textContent = sym || "\u25CF";
        i = w.regs_histo[r];
        j = i.nl;
        if (w.traceMax) {
            j++;
            (d = dcE("DIV")).innerHTML = pad_left(w.cycle, 10) + pad_left(w.currentAddress, 12) + "  " + pad_left(n, 10);
            w.regs_histo[r].appendChild(d)
        }
        while (j > w.traceMax) {
            rC(i.firstChild);
            j--
        }
        i.nl = j;
        return true
    },
    checkRegister: function (t) {
        if (t.value == "u") t.value = 0;
        var n = sim.numval = str2int(t.value),
            w = sim.pw || (sim.pw = parentWin(edit_text.current_elem)),
            m = w.bpMask + 1;
        edit_text.valid = !((n === null) || (n >= m) || (n < (m / -2)))
    },
    validRegister: function (t) {
        sim.regWrite(sim.pw, t.rn, sim.numval, "\u25C6");
        if (t.rn == 0) {
            if (w.state < 5) sim.changeState(w, 3);
            sim.instrLoad(sim.pw);
            sim.updateASM(sim.pw)
        }
        t.source = sim.pw = _
    },
    changeCarry: function (w, v) {
        if (v === null) {
            w.validRegs &= ~(1 << 16);
            w.Carry_id.disabled = true
        } else {
            v = (v == true);
            w.Carry_id.disabled = false;
            w.Carry_id.checked = w.carry = v;
            w.validRegs |= 1 << 16
        }
    },
    changeEqual: function (w, v) {
        if (v === null) {
            w.validRegs &= ~(1 << 17);
            w.Equal_id.disabled = true
        } else {
            v = (v == true);
            w.Equal_id.disabled = false;
            w.Equal_id.checked = w.equal = v;
            w.validRegs |= 1 << 17
        }
    },
    clickCarry: function (v) {
        var w = parentWin(this);
        sim.changeCarry(w, w.Carry_id.checked)
    },
    clickEqual: function (v) {
        var w = parentWin(this);
        sim.changeEqual(w, w.Equal_id.checked)
    },
    addNewBP: function (d) {
        var e, f;
        (e = dcE("DIV")).className = "BPitem";
        e.id = "off";
        f = dcE("DIV");
        f.className = "minus";
        f.onclick = sim.deleteBP;
        f.title = I8N("dtb");
        e.appendChild(f);
        f = dcE("INPUT");
        f.type = "checkbox";
        f.title = I8N("edtb");
        f.onchange = sim.click_toggleBr;
        e.active_id = f;
        e.appendChild(f);
        d.appendChild(e);
        if (d.style.display != "block") d.previousSibling.spanShow.onclick();
        d.total_id.innerHTML = ++d.total;
        return e
    },
    checkNumber: function (ev) {
        var t = this,
            d = t.parentNode,
            w = parentWin(d),
            m = w.bpMask + 1,
            n = str2int(t.value);
        a = d.active_id;
        if (a.checked) {
            a.checked = false;
            a.onchange()
        }
        if ((n === null) || (n >= m) || (n < (m / -2))) {
            n = null;
            t.style.backgroundColor = "#F65"
        } else t.style.backgroundColor = "";
        t.parentNode.number = n
    },
    addNumberField: function () {
        var e = dcE("INPUT");
        e.id = "num";
        edit_text.register(e, {
            size: 10,
            maxsize: 33,
            defaultValue: "0",
            func: sim.checkNumber
        });
        return e
    },
    deleteBP: function (e, t) {
        t = (t || this);
        var u = t.parentNode,
            d = u.parentNode;
        d.total_id.innerHTML = --d.total;
        if (t.nextSibling.checked) d.active_id.innerHTML = --d.active;
        rC(u)
    },
    click_addBr_cycle: function (e, t) {
        var w = parentWin(t || this),
            i = w.BPcycle_id,
            d = sim.addNewBP(i);
        d.appendChild(sim.addNumberField())
    },
    click_addBr_addr: function (e, t) {
        var w = parentWin(t || this),
            i = w.BPaddr_id,
            d = sim.addNewBP(i);
        d.appendChild(sim.addNumberField())
    },
    click_addBr_valReg: function (e, t) {
        var w = parentWin(t || this),
            i = w.BPvalReg_id,
            j, s, d = sim.addNewBP(i),
            r = I8N("comp").split(" ");
        d.appendChild(s = sim.regSel.cloneNode(true));
        s.selectedIndex = 1;
        s = dcE("SELECT");
        for (j in r) sim.relSel.options[j] = new Option(r[j]);
        d.appendChild(s);
        s.selectedIndex = 2;
        d.appendChild(sim.addNumberField())
    },
    click_addBr_opc: function (e, t) {
        var w = parentWin(t || this),
            i = w.BPopc_id,
            j, k = 0,
            v = [],
            s = dcE("SELECT"),
            d = sim.addNewBP(i);
        for (j in profiles[w.profileName].valid_instructions) v.push(j);
        v.sort();
        for (j in v) s.options[k++] = new Option(v[j]);
        d.appendChild(s)
    },
    click_toggleBr: function (e, t) {
        t = t || this;
        var p = t.parentNode,
            d = p.parentNode;
        if (p.number !== null) {
            d.active_id.innerHTML = (d.active += t.checked ? 1 : -1)
        } else t.checked = false
    },
    traceLog: function (w, msg) {
        w.logBuff += "\n" + WARN + msg
    },
    logLine: function (w) {
        var i = w.traceLen + 1,
            j = w.currentInstruction & 252,
            o = Y.opcode_table[j],
            f = dcE("DIV");
        f.innerHTML = pad_left(w.cycle, 9) + pad_left(w.currentAddress, 11) + pad_left(o ? o.name : ("(" + j + ")"), 6) + " " + w.regMod.join("") + " c Z" + pad_left(w.result, 12) + w.logBuff;
        w.logBuff = "";
        w.trace_id.appendChild(f);
        w.trace_id.scrollTop = w.trace_id.scrollHeight;
        w.HistoDiv.scrollTop = w.HistoDiv.scrollHeight;
        while (i > w.traceMax) {
            rC(w.trace_id.firstChild);
            i--
        }
        w.traceLen = i
    },
    checkTraceMax: function (t) {
        var n = sim.numval = str2int(t.value);
        edit_text.valid = ((n !== null) && (n >= 0))
    },
    validTraceMax: function (t) {
        parentWin(edit_text.current_elem).traceMax = sim.numval;
        t.source = _
    },
    eraseCallback: function (w) {
        Map.delSim(w)
    },
    start: function () {
        var cont = dcE("DIV"),
            w = ygwm.new_window("YASim " + sim.simCount, null, cont, 600, 700, 40, 70, false, true, true, true, false, "ms2_yelo"),
            c, d, f, i, p, tt, tb, tr, td, sel = dcE("SELECT");
        w.eraseCallback = sim.eraseCallback;
        w.Map = null;
        w.regs = [];
        w.regs_histo = [];
        w.regs_id = [];
        w.regs_hint = [];
        w.regs_changed = [];
        w.regMod = [];
        Y.opcodeInterface(w);
        (e = w.arrowDiv = dcE("DIV")).className = "tagArea";
        e.appendChild(w.arrow = sim.create_cursor("red", sim.simCount, null, w));
        e.style.display = "none";
        cont.appendChild(e);
        w.state = sim.INIT;
        d = dcE("DIV");
        button(d, "\u21E4", sim.buttonReset, "Reset");
        button(d, "\u25B6", sim.buttonRun, "Run");
        button(d, "\u25FC", sim.buttonStop, "Stop");
        button(d, "\u21B7", sim.buttonStep, "Step");
        button(d, "\u21B7\u21B7\u21B7", sim.buttonMultiStep, "mStp");
        (e = dcE("SPAN")).innerHTML = "&nbsp;" + I8N("stp");
        d.appendChild(e);
        d.appendChild(e = dcE("INPUT"));
        edit_text.register(e, {
            size: 5,
            maxsize: 5,
            defaultValue: "10",
            func: function (ev) {
                var t = this;
                edit_text.filter_number(t);
                var n = str2int(t.value);
                if (n < 2) n = 2;
                parentWin(t).skipCycles = t.value = n
            }
        });
        w.skipCycles = 10;
        (e = dcE("SPAN")).innerHTML = "&nbsp;" + I8N("Cycle") + "&nbsp;#";
        d.appendChild(e);
        d.appendChild(w.cycle_id = dcE("SPAN"));
        cont.appendChild(d);
        (e = dcE("DIV")).innerHTML = I8N("Instruction") + ':&nbsp;<span id="hex">u</span>=<a style="cursor:pointer" class="asm_active" id="disas" onclick="wa(\'ASM/asm#a?\'+this.innerHTML)"> </a> &nbsp; <span id="msg"></span>';
        (w.Disas_div = e).style.margin = "2px";
        d.appendChild(e);
        w.Disas_out = getById("disas", "A", e);
        w.Disas_hex = getById("hex", "SPAN", e);
        w.Disas_msg = getById("msg", "SPAN", e);
        w.DISASM = new Y.DISASM_context(function (col, msg) {
            if (col != "blue") {
                w.Disas_out.style.backgroundColor = col;
                w.Disas_msg.innerHTML = msg
            }
        });
        (d = dcE("DIV")).appendChild(Map.createMapSel(w));
        (e = dcE("DIV")).innerHTML = I8N("TrD") + ':<span id="traceMax"></span> &nbsp; ' + I8N("prf") + ":&nbsp;";
        sel.onblur = sim.listBlur;
        e.appendChild(w.ProfileSel = sel);
        d.appendChild(e);
        (f = getById("traceMax", "SPAN", e)).title = I8N("TrDt");
        edit_text.register(f, {
            size: 4,
            maxsize: 4,
            defaultValue: f.innerHTML = w.traceMax = 20,
            check: sim.checkTraceMax,
            func: sim.validTraceMax
        });
        h3(cont, d, "cnf");
        (tt = dcE("TABLE")).style.fontFamily = "monospace";
        tt.style.textAlign = "right";
        tt.style.borderSpacing = "0px";
        tt.appendChild(tb = dcE("TBODY"));
        c = '<th onclick="sim.flushChanges(0,this)" title="' + I8N("fcm") + '"style="cursor:pointer">\u2260</th><th>Reg</th><th>' + I8N("val") + '</th><th>&nbsp;</th>';
        (tr = dcE("TR")).innerHTML = c + c;
        tb.appendChild(tr);
        for (i in Y.registers_names) {
            w.regs[i] = null;
            c = Y.registers_names[i];
            if (!(+i & 1)) tr = dcE("TR");
            (td = dcE("TD")).className = c[0];
            tr.appendChild(w.regs_changed[i] = td);
            (td = dcE("TD")).className = c[0];
            td.innerHTML = c + ":";
            td.title = I8N("cvlv");
            td.style.cursor = "pointer";
            td.nr = +i;
            td.onclick = sim.displayRegHistory;
            td.style.padding = "1px";
            tr.appendChild(td);
            (td = w.regs_id[i] = dcE("TD")).className = c[0];
            edit_text.register(td, {
                size: 10,
                maxsize: 33,
                defaultValue: "0",
                check: sim.checkRegister,
                func: sim.validRegister
            });
            td.rn = i;
            tr.appendChild(td);
            tr.appendChild(dcE("TD"));
            if (+i & 1) tb.appendChild(tr)
        };

        function flag(name) {
            tr.appendChild(dcE("TD"));
            (td = dcE("TD")).colSpan = 2;
            td.innerHTML = name + ":";
            (e = dcE("INPUT")).type = "checkbox";
            e.onchange = sim["click" + name];
            td.style.cursor = "pointer";
            td.appendChild(w[name + "_id"] = e);
            tr.appendChild(td);
            tr.appendChild(dcE("TD"))
        }
        tr = dcE("TR");
        flag("Carry");
        flag("Equal");
        tb.appendChild(tr);
        (e = dcE("DIV")).appendChild(tt);
        e.style.position = "relative";
        e.style.cssFloat = "left";
        (d = dcE("DIV")).appendChild(e);
        d.appendChild(e = dcE("FORM"));
        e.style.fontSize = "70%";
        f = '<input type="radio" name="rb" onclick="sim.chBase(this)" value=';
        e.innerHTML = I8N("rdx") + f + '"bin"/> bin&nbsp;' + f + '"dec"/> dec&nbsp;' + f + '"hex" checked="checked"/> hex';
        d.appendChild(e = dcE("DIV"));
        e.id = "histoReg";
        e.innerHTML = '<u>' + I8N("ho") + ' <span id="regName"></span>:</u><br>   cycle     ' + pad_left(I8N("adr"), 8) + '    ' + pad_left(I8N("val"), 7) + '<div id="HistoDiv"></div>';
        w.regName = getById("regName", "SPAN", e);
        adjustHeight(w.HistoDiv = getById("HistoDiv", "DIV", e), 100);
        h3(cont, d, "rgs");
        w.num_func = sim.num_hex;

        function newBP(text, fun, i) {
            (f = dcE("DIV")).className = "simBP";
            var g = dcE("DIV");
            g.onclick = fun;
            g.className = "plus";
            g.title = I8N("Canb");
            f.appendChild(g);
            (g = dcE("SPAN")).innerHTML = '<span>\u25BD</span>&nbsp;<i>(<span id="active"></span>/<span id="total"></span>)</i>&nbsp; ' + I8N(text) + " :";
            g.onclick = showhideNext;
            g.title = I8N("ctsh");
            g.style.cursor = "pointer";
            f.spanShow = g;
            f.appendChild(g);
            d.appendChild(f);
            d.appendChild(g = w[i] = dcE("DIV"));
            g.style.display = "block";
            (g.active_id = getById("active", "SPAN", f)).innerHTML = g.active = (g.total_id = getById("total", "SPAN", f)).innerHTML = g.total = 0
        }
        w.opcTraps = [];
        w.cycleTraps = [];
        (w.BPdiv = d = dcE("DIV")).style.display = "block";
        newBP("sac", sim.click_addBr_cycle, "BPcycle_id");
        newBP("saia", sim.click_addBr_addr, "BPaddr_id");
        newBP("sorw", sim.click_addBr_valReg, "BPvalReg_id");
        newBP("sopc", sim.click_addBr_opc, "BPopc_id");
        h3(cont, d, "brk", d);
        (d = dcE("DIV")).style.fontFamily = "monospace";
        d.style.whiteSpace = "pre";
        f = '<span style="background-color:#';
        i = '</span>';
        d.innerHTML = '<div style="position:absolute;top:-1.3em;right:1em;cursor:pointer;background-color:#DFD"' + ' title="' + I8N("shms") + '" onclick="toggle(this.nextSibling)">' + I8N("lgd") + '</div>' + '<div style="display:none;border:2px solid #dedefa">' + I8N("lgnd") + '</div>' + '<div>    cycle    address  opc  PC' + f + 'A0A0D0">R1R2R3R4R5' + i + f + 'D0A0A0">D1D2D3D4D5' + i + f + 'A0D0A0">A1A2A3A4A5' + i + ' C Z   value</div>';
        d.appendChild(w.trace_id = dcE("DIV"));
        h3(cont, d, "trc", w.trace_id, 150);
        cont.appendChild(dcE("HR"));
        (sel.onfocus = sim.update_proflist)(0, sel);
        (sel.onchange = sim.change_profile)(0, w);
        sim.resetState(w, 6);
        w.simCount = sim.simCount++;
        return w
    },
    INIT_func: function () {
        sim.regSel = dcE("SELECT");
        for (var i in Y.registers_names) sim.regSel.options[i] = new Option(Y.registers_names[i]);
        menu.subMenuItem(menu.list["Sim"], i8n.ysm, "sim/YASim")
    }
});
INIT(fb = {
    serial: 0,
    redrawList: [],
    putPixel: function (w, a, v) {
        var f = w.fb.data;
        switch (w.bpp) {
            case 8:
                a *= 4;
                f[a] = f[a + 1] = f[a + 2] = v & F2;
                f[a + 3] = F2;
                f[a + 4] = f[a + 5] = f[a + 6] = (v >> 8) & F2;
                f[a + 7] = F2;
                break;
            case 16:
                a *= 2;
                f[a] = (v & 31) << 3;
                f[a + 1] = (v >> 3) & 252;
                f[a + 2] = (v >> 8) & 248;
                f[a + 3] = F2;
                break;
            case 32:
                if (a & 2) f[a] = v & F2;
                else {
                    f[a] = v & F2;
                    f[a + 1] = (v >> 8) & F2;
                    f[a + 3] = F2
                }
                break
        }
        if (!w.dpy) {
            w.dpy = true;
            fb.redrawList.push(w);
            redraw(fb.displayCallback)
        }
    },
    clear: function (e, w) {
        w = w || parentWin(this);
        var i = 0,
            j = w.Ypx * w.Xpx * 4,
            f = w.fb.data;
        while (i < j) f[i++] = F2;
        j = w.bytes;
        i = 0;
        f = w.memory.mem;
        while (i < j) {
            f[i] = F4;
            i += 2
        }
        w.ctx.putImageData(w.fb, 0, 0)
    },
    mire: function (e, w) {
        w = w || parentWin(this);
        var i = 0,
            j = w.Ypx * w.Xpx,
            f = w.memory.mem;
        switch (w.bpp) {
            case 8:
                for (; i < j; i += 2) fb.putPixel(w, i, f[i] = (((i + 1) & F2) << 8) + (i & F2));
                break;
            case 16:
                for (; i < j; i++) fb.putPixel(w, i * 2, f[i * 2] = i);
                break;
            case 32:
                for (; i < j; i++) {
                    fb.putPixel(w, i * 4, f[i * 4] = i);
                    fb.putPixel(w, (i * 4) + 2, f[(i * 4) + 2] = i >> 16)
                }
                break
        }
    },
    changeBpp: function (w, b) {
        w.bpp = (w.Bpp = b) * 8;
        Map.changeSize(w, w.bytes = w.Ypx * w.Xpx * w.Bpp);
        var i, s = w.selBpp;
        for (i in s.options)
            if (b == s.options[i].value) {
                s.selectedIndex = i;
                break
            } fb.mire(0, w)
    },
    selectChangeBpp: function () {
        fb.changeBpp(parentWin(this), +this.options[this.selectedIndex].value)
    },
    displayCallback: function () {
        var w, i;
        for (i in fb.redrawList) {
            w = fb.redrawList[i];
            w.dpy = false;
            w.ctx.putImageData(w.fb, 0, 0)
        }
        fb.redrawList = []
    },
    eraseCallback: function (w) {
        Map.delAllEdit(w)
    },
    memCallback: function (w, a, rwx, sim, d) {
        if (rwx == 2) fb.putPixel(w, a, d)
    },
    start: function () {
        var w, b, c, d, e, f, i, can, l = 256,
            h = 256,
            cont = dcE("DIV"),
            s = document.createElement("SELECT"),
            w = ygwm.new_window("fb#" + (fb.serial++), null, cont, 300, 420, 300, 260, false, true, true, true, false, "doc_cygr");
        w.eraseCallback = fb.eraseCallback;
        w.Maps = [];
        w.MapDiv = [];
        cont.innerHTML = WARN + "Work in progress...";
        d = dcE("DIV");
        d.appendChild(Map.NewMem(w, 1, 14, fb.memCallback, 1 << 17, 0));
        (c = dcE("DIV")).innerHTML = l + "*" + h + "px<br>";
        d.appendChild(c);
        button(d, "clr", fb.clear, 0, "1em");
        s.options[0] = new Option("8bpp", 1);
        s.options[1] = new Option("16bpp", 2);
        s.options[2] = new Option("24bpp", 4);
        s.title = "Color depth";
        s.onchange = fb.selectChangeBpp;
        d.appendChild(w.selBpp = s);
        cont.appendChild(d);
        can = w.canvas = dcE("canvas");
        if (can.getContext) {
            can.style.border = "1px solid black";
            w.fb = (w.ctx = can.getContext('2d')).createImageData(can.width = w.Xpx = l, can.height = w.Ypx = h);
            cont.appendChild(can);
            fb.changeBpp(w, 4)
        } else cont.innerHTML = WARN + "HTML5 Canvas not supported\nUse a more capable browser";
        return w
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Sim"], i8n.fb, "sim/fb")
    }
});
INIT(config = {
    win: null,
    opcodes_id: [],
    mul_id: [],
    cond_id: [],
    size_id: [],
    park_id: [],
    SplitMem_id: [],
    PtrUpd_id: [],
    empty: false,
    multable: {
        "MUL8L": 8,
        "MUL8H": 8,
        "MULI": 8,
        "LUT8": 8,
        "MUL16H": 16,
        "MUL16L": 16
    },
    changeInstruction: function (val, n, force) {
        if (typeof config.core != "object") wa("VHDL/config#name=empty");
        if ((force === true) || (val != config.opcodes_id[n].checked)) {
            var c = config.core,
                t;
            if ((val === true) && config.empty) {
                if ((c.datapath != 32) && config.Y32_id[n]) {
                    config.core.datapath = 32;
                    config.win.shortmsg("force datapath=32")
                }
                if ((t = config.multable[n]) && (t > c.multiplier)) {
                    config.core.multiplier = t;
                    config.win.shortmsg("force multiplier=" + t)
                }
            }
            c.valid_instructions[n] = (val === true) ? 1 : 0;
            config.opcodes_id[n].checked = val;
            delay(config.delay_check)
        }
    },
    changeBox: function () {
        config.changeInstruction(this.checked, this.id, true)
    },
    check: function () {
        var n, c = config.core;
        switch (c.multiplier) {
            case 0:
            case 8:
            case 16:
                break;
            default:
                c.multiplier = 0
        }
        if (c.datapath != 32) c.datapath = 16;
        config.size_id[c.datapath].checked = true;
        switch (c.datapath) {
            case 16:
                if (c.multiplier == 16) c.multiplier = 8;
                for (n in config.Y32_id) config.changeInstruction(A, n);
                break;
            case 32:
                break
        }
        if (c.Park != 1) c.Park = 0;
        config.park_id[c.Park].checked = true;
        config.cond_id[c.CondR1].checked = true;
        config.mul_id[c.multiplier].checked = true;
        config.park_id[c.Park].checked = true;
        config.SplitMem_id[c.SplitMem].checked = true;
        config.PtrUpd_id[c.PtrUpd].checked = true;
        for (n in config.multable)
            if (config.multable[n] > c.multiplier) config.changeInstruction(A, n);
        if (c.PC_length < 3) c.PC_length = 3;
        if (c.PC_length > c.datapath) c.PC_length = c.datapath;
        config.PCwidth_id.innerHTML = config.PCwidth_id.source = c.PC_length
    },
    emit_VHDL: function () {
        config.check();
        ProfUtils.exportVHDL(config.core)
    },
    changeRadio: function () {
        config.trigger(this.name + "=" + this.value)
    },
    trigger: function (s) {
        if (s == "") return;
        if (s == "emitVHDL") return config.emit_VHDL();
        var i, j = 0,
            u, v;
        s = s.split(',');
        for (i in s) {
            u = s[i].split("=");
            if (u.length == 2) {
                v = u[0];
                if (v == "name") {
                    if (j) return alert("Malformed configuration request: the profile name must be the first parameter");
                    else config.change_profile(u[1])
                } else if (typeof config.core[v] == "number") config.core[v] = +u[1];
                j++;
                config.check()
            } else return alert("Malformed configuration request : missing argument ?")
        }
    },
    AddProfile: function () {},
    change_profile: function (a) {
        if (typeof profiles[a] != "object") return Al8N("Ipn");
        config.core = ProfUtils.inherit(a);
        config.name_id.innerHTML = a;
        config.empty = (a == "empty");
        config.block_id.style.display = "block";
        var n, p = profiles[a];
        for (n in config.opcodes_id) config.changeInstruction(p.valid_instructions[n] === 1, n, true)
    },
    list_profiles: function () {
        var l = config.list_div,
            p, d = dcE("div"),
            m = "<table>";
        while (l.firstChild) rC(l.firstChild);
        for (p in profiles) m += '<tr><td class="fr"><button onclick="wa(\'VHDL/config#name=' + p + '\')">' + p + "</button></td><td>" + profiles[p].comment + "<br>&nbsp;</td></tr>";
        d.innerHTML = m + "</table>";
        l.appendChild(d)
    },
    start: function () {
        var cont = dcE("DIV");
        cont.innerHTML = import_htmi("VHDL/config");
        winman.patchInnerLinks(cont);
        var opcodes_id, h = getByClass("hiddenDiv", "DIV", cont),
            w = ygwm.new_window(hiddenText(0, h), null, cont, 500, 500, 40, 40, false, true, true, true, false, "WinOK");
        config.delay_check = {
            delay: 200,
            func: config.check
        };
        toggle(config.block_id = getById("profConfig", "div", cont));
        getById("save_V", "button", config.cont).onclick = config.emit_VHDL;
        (config.mul_id[0] = getById("mul0", "input", cont)).onclick = (config.mul_id[8] = getById("mul8", "input", cont)).onclick = (config.mul_id[16] = getById("mul16", "input", cont)).onclick = (config.size_id[16] = getById("size16", "input", cont)).onclick = (config.size_id[32] = getById("size32", "input", cont)).onclick = (config.cond_id[0] = getById("bit0", "input", cont)).onclick = (config.cond_id[1] = getById("bit1", "input", cont)).onclick = (config.park_id[0] = getById("Park0", "input", cont)).onclick = (config.park_id[1] = getById("Park1", "input", cont)).onclick = (config.SplitMem_id[0] = getById("SplitMem0", "input", cont)).onclick = (config.SplitMem_id[1] = getById("SplitMem1", "input", cont)).onclick = (config.PtrUpd_id[0] = getById("PtrUpd0", "input", cont)).onclick = (config.PtrUpd_id[1] = getById("PtrUpd1", "input", cont)).onclick = config.changeRadio;
        config.list_div = getById("profiles_list", "div", cont);
        config.name_id = getById("profName", "tt", cont);
        edit_text.register((config.PCwidth_id = getById("PCwidth", "span", cont)), {
            size: 4,
            maxsize: 4,
            defaultValue: "16",
            bg: true,
            func: function (t) {
                config.core.PC_length = +t.source;
                config.check()
            },
            check: function (t) {
                edit_text.filter_number(t);
                t = +t.value;
                edit_text.valid = ((t >= 3) && (t <= config.core.datapath))
            }
        });
        edit_text.register((config.addButton_id = getById("add", "button", cont)), {
            size: 16,
            maxsize: 20,
            defaultValue: hiddenText(1, h),
            func: function () {
                w.shortmsg(this.value)
            }
        });
        toggle(config.addButton_id);
        config.Y32_id = [];
        config.opcodes_id = [];
        var cb, col, line, instr, sp, tr, td, n, tab = config.optable_id = getById("sel_opcodes", "table", cont);
        for (line = 0; line < 32; line += 4) {
            tr = dcE("TR");
            (td = dcE("TD")).innerHTML = Y.GroupNames[line].slice(6) + ":&nbsp;";
            td.className = "fr";
            tr.appendChild(td);
            for (col = 0; col < 256; col += 32) {
                if (instr = Y.opcode_table[line + col]) {
                    n = instr.name;
                    (td = dcE("TD")).className = "miniInstr";
                    (cb = config.opcodes_id[n] = dcE("input")).type = "checkbox";
                    if (instr.flags & Y.YASEP32_ONLY) config.Y32_id[n] = 1;
                    cb.id = n;
                    cb.onchange = config.changeBox;
                    td.appendChild(cb);
                    (sp = dcE("span")).innerHTML = n;
                    td.appendChild(sp);
                    tr.appendChild(td)
                }
            }
            tab.appendChild(tr)
        }
        config.list_profiles();
        adjustHeight(config.list_div);
        w.eraseCallback = function () {
            clearTimeout(config.delay_check.timer);
            config.core = null;
            delete config.core
        };
        w.trigger = config.trigger;
        return (config.win = w)
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Tools"], i8n.cc, "VHDL/config")
    }
});
INIT(Welcome = {
    start: function () {
        var w = getById("main-" + LANG.LN, "div", Welcome.div) || getById("main-en", "div", Welcome.div),
            cont = w.cloneNode(true),
            h = getByClass("hiddenDiv", "DIV", cont);
        winman.patchInnerLinks(cont);
        getById("YASEP_update", "span", cont).innerHTML = VERSION;
        return ygwm.new_window(hiddenText(0, h), null, cont,Math.ceil((getWidth() * 2) / 3), 500,Math.ceil(getWidth() / 6), 41, false, true, true, true, false, "docStyle")
    },
    INIT_func: function () {
        var d = Welcome.div = document.getElementById("MainContents");
        getById("BigRedWarning", "div", d).style.display = "none";
        rC(d)
    }
});
SaveFile = {
    win: null,
    lock: false,
    queue_list: {},
    queue_head: 0,
    queue_tail: 0,
    queue_next: function () {
        var t = SaveFile.queue_list[SaveFile.queue_tail];
        SaveFile.filename_id.value = t.n;
        SaveFile.data_id.value = t.d;
        delete SaveFile.queue_list[SaveFile.queue_tail++];
        SaveFile.probe(true)
    },
    URL_valid: function (x, r) {
        SaveFile.server_OK = x;
        SaveFile.URL_id.id = "URL_" + (x ? "OK" : "KO");
        if (r) SaveFile.iframe_id.srcdoc = r.responseText || r;
        SaveFile.lock = false;
        if (SaveFile.queue_head > SaveFile.queue_tail) SaveFile.queue_next()
    },
    probe: function (x) {
        if (!SaveFile.lock) {
            SaveFile.lock = true;
            var XHR, f = SaveFile.URL_valid;
            try {
                (XHR = new XMLHttpRequest()).open("GET", SaveFile.URL, true);
                XHR.onreadystatechange = function () {
                    if (XHR.readyState == 4) {
                        if ((XHR.status == 200) && (XHR.responseText == "Loopback ready\n")) {
                            if (x) {
                                if (!SaveFile.filename_id.value) f(A, "Missing file name");
                                else {
                                    SaveFile.form.action = SaveFile.URL + "?FileName=" + SaveFile.filename_id.value;
                                    SaveFile.form.submit()
                                }
                            }
                            setTimeout(function () {
                                f(true, XHR)
                            }, 300)
                        } else f(A, XHR)
                    }
                };
                XHR.timeout = 5E3;
                XHR.ontimeout = function () {
                    f(A, "Request time out")
                };
                XHR.send()
            } catch (r) {
                f(A, XHR)
            }
        }
    },
    changeURL: function (url) {
        lsPut("SaveFile.Address", SaveFile.URL = SaveFile.URL_id.textContent = url);
        SaveFile.probe()
    },
    start: function () {
        var w, e, c = SaveFile.cont = dcE("DIV"),
            i = SaveFile.filename_id = dcE("INPUT"),
            f = SaveFile.form = dcE("FORM"),
            d = dcE("DIV"),
            p = dcE("P"),
            t = dcE("SPAN"),
            w = ygwm.new_window(I8N("SFtitle"), null, c, 90, 90, 20, 50, false, true, true, true, false);
        (p.appendChild(t)).textContent = I8N("SFLA");
        t = dcE("SPAN");
        (p.appendChild(t)).id = "LoopbackServerURL";
        edit_text.register(SaveFile.URL_id = t, {
            size: 40,
            func: function (t) {
                SaveFile.changeURL(t.source)
            }
        });
        d.appendChild(p);
        (SaveFile.iframe_id = t = dcE("IFRAME")).name = t.id = "LoopbackOutput";
        d.appendChild(t);
        h3(c, d, "SFs");
        adjustHeight(t).id = "LoopbackOut";
        d = dcE("DIV");
        p = dcE("P");
        button(p, "SFbs", function () {
            if (!SaveFile.lock) SaveFile.probe(true)
        }, null, "1em");
        t = dcE("SPAN");
        (p.appendChild(t)).textContent = I8N("SFfn") + " ";
        i.type = "text";
        (p.appendChild(i)).size = 30;
        d.appendChild(p);
        f.target = "LoopbackOutput";
        f.method = "post";
        (SaveFile.data_id = t = dcE("TEXTAREA")).name = t.id = "Contents";
        dontMess(t);
        f.appendChild(t);
        d.appendChild(f);
        h3(c, d, "SFd");
        adjustHeight(d).id = "LoopbackOut";
        SaveFile.changeURL(lsGet("SaveFile.Address") || "CGI/SaveFile.php");
        return SaveFile.win = w
    },
    save: function (name, data) {
        wa("save");
        SaveFile.queue_list[SaveFile.queue_head++] = {
            n: name,
            d: data
        };
        if (!SaveFile.lock) SaveFile.queue_next()
    }
};
INIT(Flash = {
    win: null,
    box_div: null,
    iFrame_id: null,
    div_iFrame_id: null,
    current_type: lsGet("Flash.type") || "M25P40",
    capa: 19,
    url_id: null,
    Types: {
        "25LC1024": [17, "SE32KLC,PE"],
        "M25P40": [19, "SE64K"],
        "A25L40P": [19, "SE64K"],
        "AT26DF321": [22, "SE4K,SE64K,SE32K"],
        "W25Q128F": [24, "SE4K,SE64K,SE32K"]
    },
    set_capa: function (c) {
        if (c < 16) c = 16;
        if (c > 24) c = 24;
        Flash.capa_id.textContent = " " + (1 << (Flash.capa = c) - 10) + " kiB"
    },
    changeType: function (n) {
        var t = Flash.Types[n],
            w = Flash.win;
        if (typeof t == "object") {
            lsPut("Flash.type", Flash.current_type = n);
            Flash.set_capa(t[0]);
            getById(n, "INPUT", Flash.chipType_id).checked = true;
            var a, i, k, j = Flash.erase_id.getElementsByTagName("INPUT");
            for (i in j) {
                if ((k = j[i].id) != "BE") {
                    if (("," + t[1] + ",").indexOf("," + k + ",") != -1) j[i].disabled = false;
                    else {
                        j[i].checked = false;
                        j[i].disabled = true
                    }
                }
            }
        }
    },
    changeURL: function (s) {
        lsPut("Flash.URL", Flash.url_id.textContent = Flash.CGI_URL = s)
    },
    go: function (hyx) {
        wa("Flash");
        var opt = "",
            i, t = Flash.option_id.getElementsByTagName("INPUT");
        for (i in t) {
            if (t[i].checked) {
                opt += "." + t[i].id;
                if (t[i].id == "BE") opt += "." + Flash.capa
            }
        }
        lsPut("Flash.opt", opt);
        Flash.form.setAttribute("action", Flash.CGI_URL + "?" + opt);
        Flash.dat.setAttribute("name", "Flash");
        Flash.dat.setAttribute("value", hyx);
        Flash.form.submit()
    },
    start: function () {
        Flash.cont = dcE("DIV");
        Flash.cont.innerHTML = import_htmi("CGI/Flash");
        winman.patchInnerLinks(Flash.cont);
        var a, a2, b, c, d, t, i, h = getByClass("hiddenDiv", "DIV", Flash.cont);
        w = (Flash.win = ygwm.new_window(hiddenText(0, h), null, Flash.cont, 500, 600, 50, 50, false, true, true, true, false, "default"));
        Flash.box_div = a = getById("ShownIfFlashOK", "div", Flash.cont);
        Flash.option_id = a2 = getById("FlashOptions", "div", Flash.cont);
        Flash.erase_id = b = getById("EraseSelect", "DIV", Flash.box_div);
        h3(a2, b, "ferm");
        adjustHeight(Flash.iFrame_id = getById("FlashOutput", "IFRAME", Flash.box_div)).id = "FlashOut";
        Flash.url_id = getById("FlashServerURL", "SPAN", Flash.cont);
        Flash.changeURL(lsGet("Flash.URL") || "CGI/update_SPI_Flash.cgi");
        edit_text.register(Flash.url_id, {
            size: 40,
            func: function (t) {
                Flash.changeURL(t.source)
            }
        });
        Flash.chipType_id = b = getById("SPIChipType", "DIV", Flash.box_div);
        h3(a, b, "fct");
        Flash.capa_id = c = getById("chipcapa", "SPAN", Flash.cont);
        d = c.parentNode;
        d.insertBefore(button(c, "-", function () {
            Flash.set_capa(Flash.capa - 1)
        }), c);
        d.appendChild(button(c, "+", function () {
            Flash.set_capa(Flash.capa + 1)
        }), c.nextSibling);
        for (i in (t = Flash.Types)) {
            d = dcE("DIV");
            d.innerHTML = '<input type="radio" id="' + i + '" name="ChipType" onclick="cT(this.id)"> &nbsp;<tt>' + i + "</tt> <i>" + (1 << (t[i][0] - 17)) + "Mbits</i>";
            b.appendChild(d)
        }
        cT(Flash.current_type);
        if (t = lsGet("Flash.opt")) {
            t = t.split(".");
            for (i in t) {
                if (c = getById(t[i], "INPUT", Flash.option_id)) c.checked = true
            }
        }
        return w
    },
    INIT_func: function () {
        Flash.menuItem = menu.subMenuItem(menu.list["Tools"], i8n.flsh, "Flash");
        var f = dcE("form"),
            h = document.createElement("input");
        Flash.form = f;
        Flash.dat = h;
        f.target = "FlashOutput";
        f.setAttribute("method", "POST");
        h.setAttribute("type", "hidden");
        f.appendChild(h);
        document.body.appendChild(f)
    }
});
cT = Flash.changeType;
INIT(impASM = {
    win: null,
    edit_id: null,
    importFile: function (name) {
        var s = name;
        if (s) impASM.importCode(s)
    },
    trigger: function (s) {
        if (s != "") {
            var c = config.win;
            ygwm.hide_all(impASM.win);
            s = import_data(s);
            if (typeof s == "string") impASM.importCode(s);
            if (config.win && !c) ygwm.hide_all(config.win)
        }
    },
    importCode: function (s) {
        var w = YASMed.start(),
            i;
        if (typeof s !== "string" && impASM.win) s = impASM.edit_id.value;
        s = s.split('\n');
        for (i in s) YASMed.NewLine(w, s[i]);
        YASMed.AdjustPClen(w);
        return w
    },
    start: function () {
        impASM.cont = dcE("DIV");
        impASM.cont.innerHTML = import_htmi("ASM/importASM");
        var h = getByClass("hiddenDiv", "DIV", impASM.cont);
        impASM.win = ygwm.new_window(hiddenText(0, h), null, impASM.cont, 450, 450, 50, 50, false, true, true, true, false, "WinOK");
        getById("importASM", "button", impASM.cont).onclick = impASM.importCode;
        impASM.edit_id = getById("importArea", "textarea", impASM.cont);
        impASM.win.trigger = impASM.trigger;
        return impASM.win
    },
    INIT_func: function () {
        impASM.menuItem = menu.subMenuItem(menu.list["ASM"], i8n.imp, "ASM/impASM")
    }
});
INIT(YASMed = {
    header: ";;;;;;;;;;;;;;; end auto header ;;;;;;;;;;;;;;;",
    serial: 0,
    OddEvenArray: ["even", "odd"],
    Types: "Empty Code Org Align Name".split(" "),
    AdjustPClen: function (w) {
        if (w.asmctx.name != "" && w.asmctx.core === false && config.core) {
            var t = w.memory.last,
                i = 0;
            while (t > 0) {
                i++;
                t >>>= 1
            }
            config.core.PC_length = i;
            delay(config.delay_check)
        }
    },
    reassemble: function (ev, w) {
        w = parentWin(w || this);
        var n = impASM.importCode(YASMed.export_ASM(-1, w));
        ygwm.changeDimensions(w.w, w.h, n);
        ygwm.move(n, w.x, w.y);
        for (var i in w.Maps) Map.addEdit(n, w.Maps[i]);
        ygwm.erase_window(null, w)
    },
    export_ASM: function (ev, w) {
        if (w = parentWin(w || this)) {
            var h = "; " + w.FuncName + generated(";", "ASM/YASMed.js"),
                t = w.list_header_id.nextSibling,
                i, j = "";
            if (w.subst.length > 0) {
                h += "; Dump of the substitution table :\n";
                for (i in w.subst) h += ".subst " + w.subst[i].src + " " + w.subst[i].dst + "\n"
            }
            h += I8N("nwol") + YASMed.header + "\n";
            while (t) {
                j += t.source_id.source + "\n";
                if (t.source_id.source == YASMed.header) j = "";
                t = t.nextSibling
            }
            t = j.length - 1;
            while (j[t] == "\n") t--;
            j = j.slice(0, t + 1);
            YASMed.AdjustPClen(w);
            h += j;
            if (ev === -1) return h;
            else SaveFile.save(w.FuncName + ".yas", h)
        }
    },
    HYX: function (w, l) {
        var h = ";;hyx1\n" + (l ? ";; Dump of " + w.FuncName + generated(";;", "ASM/YASMed.js") : ""),
            t = w.list_header_id.nextSibling,
            i, j = -1,
            k;
        while (t) {
            if ((t.Type == YASMed.Org) && (t.org != -1)) h += ":" + int2hex(t.org, 7, 0, 1) + "\n";
            if (t.bytes)
                for (i in t.bytes_array) {
                    k = t.bytes_array[i];
                    if (k == j) h += ".";
                    else h += int2hex(k, 1, 1, 1) + (l ? " " : "");
                    j = k
                }
            if (l && t.source_id.source != "") h += "; " + t.source_id.source + "\n";
            t = t.nextSibling
        }
        h += "@";
        YASMed.AdjustPClen(w);
        return h
    },
    flash_HYX: function (ev, w) {
        if (w = parentWin(w || this)) {
            if (w.errors) return Al8N("yalt1");
            Flash.go(YASMed.HYX(w))
        }
    },
    export_HEX: function (ev, w) {
        if (w = parentWin(w || this)) {
            if (w.errors) return Al8N("yalt1");
            SaveFile.save(w.FuncName + ".hyx", YASMed.HYX(w, true))
        }
    },
    export_VHDL: function (ev, w) {
        if (w = parentWin(w || this)) {
            if (w.errors) return Al8N("yalt1");
            if (w.memory.last & 1) return Al8N("even");
            if (w.memory.first) return Al8N("yalt2");
            if ((typeof w.asmctx.core == "object") && (typeof w.asmctx.core.PC_length == "number") && (w.memory.last > (1 << w.asmctx.core.PC_length))) return Al8N("", "memory.last=", "", w.memory.last, "", "\nPClength=", "", w.asmctx.core.PC_length, "sztm");
            var r = w.memory.rwx & 48,
                size = w.memory.last >> 1,
                t = w.list_header_id.nextSibling,
                i, j = 0,
                k;
            h = "-- Dump of " + w.FuncName + generated("--", "ASM/YASMed.js") + "Library work;\n" + "    use work.yasep_definitions.all;\n" + "    use work.yasep_utils.all;\n" + "Library ieee;\n" + "    use ieee.std_logic_1164.all;\n" + "    use ieee.numeric_std.all;\n" + "\n" + "entity SynchRam16 is\n" + " port(\n" + "  clk, reset, en: in std_logic := '0';\n" + "  NPC: in SLVAI;\n" + "  RAM_out: out SLV16);\n" + "end SynchRam16;\n" + "\n" + "architecture " + w.FuncName + " of SynchRam16 is\n" + "  signal latched_addr : SLVAI := (SLVAI'range=>'0');\n" + "  type RAM_array_type is array(0 to " + size + ") of SLV16;\n" + "  constant RAM_array : RAM_array_type := (\n";

            function emit_SLV16(s, k) {
                var m = '",';
                for (i = 16; i > 0; i--) {
                    if (k & 1) m = (s & 1) + m;
                    else m = '-' + m;
                    s >>>= 1;
                    k >>>= 1
                }
                h += ' "' + m
            }
            while (t) {
                if (t.bytes) {
                    if (t.ot !== "") {
                        if (j || (t.address & 1)) return Al8N("Ierr2", "", t.TrLineNr, "inaa");
                        emit_SLV16(t.encoded_instruction, t.encoded_fields);
                        if (t.bytes > 2) emit_SLV16(t.encoded_instruction >>> 16, t.encoded_fields >>> 16)
                    } else {
                        for (i in t.bytes_array) {
                            var s = toBin(t.bytes_array[i], 8);
                            if (!j++) k = s;
                            else {
                                j = 0;
                                h += ' "' + s + k + '",'
                            }
                        }
                    }
                }
                if (t.source_id.source != "") h += " -- " + t.source_id.source + "\n";
                t = t.nextSibling
            }
            YASMed.AdjustPClen(w);
            h += " \"1111111111111111\" );\n" + "\n" + "begin\n" + "\n" + "  assert YASEP_SIZE=" + r + ' report "YASEP_SIZE is not ' + r + '" severity warning;\n' + "\n" + "  process(clk, en)\n" + "  begin\n" + "    if rising_edge(clk) and en='0' then\n" + "      latched_addr <= NPC;\n" + "    end if;\n" + "  end process;\n" + "\n" + "  process(latched_addr ,reset)\n" + "    variable adr: integer;\n" + "  begin\n" + "    if reset/='1' then\n" + "      RAM_out <= (RAM_out'range=>'0');\n" + "    else\n" + "      adr := safe_to_integer(latched_addr);\n" + "      if adr < 0 or adr >= RAM_array'length then\n" + "        report \" Accessing instruction beyond limit at \" & integer'image(adr);\n" + "        RAM_out <= (RAM_out'range=>'1');\n" + "      else\n" + "        RAM_out <= RAM_array(adr);\n" + "      end if;\n" + "    end if;\n" + "  end process;\n" + "end " + w.FuncName + ";\n";
            SaveFile.save(w.FuncName + ".vhdl", h)
        }
    },
    renumber_lines: function (w, t, n, ad) {
        var u, orgNr = 0,
            adi, err = w.errors,
            first = w.memory.first,
            size = ad - first;
        if (size < 0) size = 0;
        if (!t || (t.previousSibling == w.list_header_id)) {
            t = w.list_header_id.nextSibling;
            n = ad = size = first = 0;
            err = false ;
            w.memory.mem = [];
            w.memory.Id = [];
            w.erase_msg()
        }

        function mem(b) {
            var m = w.memory;
            if (size & 1) b = (b << 8) | m.mem[size - 1];
            else m.Id[size] = t;
            m.mem[(size++) & ~1] = b
        }
        while (t != null) {
            t.address = ad;
            t.numero_id.innerHTML = t.TrLineNr = n++;
            u = t.bgCol;
            if (t.Type == YASMed.Org) {
                if (orgNr++ > 0) {
                    u = "error";
                    w.shortmsg(I8N("R") + I8N("o1oa"))
                } else {
                    if (ad > 0) {
                        u = "error";
                        w.shortmsg(I8N("R") + I8N("iod"))
                    } else {
                        u = "";
                        if (t.org == -1) w.memory.rwx &= ~8;
                        else {
                            w.memory.rwx |= 8;
                            first = t.address = ad = t.org
                        }
                    }
                }
            } else if ((u === "") || (u == "unaligned")) {
                u = "unaligned";
                if (t.encoded_fields && (t.address & 1)) w.shortmsg(I8N("R") + I8N("ui"));
                else u = ""
            }
            if (!(t.bgCol = u)) u = YASMed.OddEvenArray[t.TrLineNr & 1];
            else err = true;
            t.className = u;
            adi = "";
            switch (t.Type) {
                case YASMed.Align:
                    adi = ad;
                    var m = t.algn - 1,
                        i = t.algn - (ad & m);
                    ad += i;
                    if (i != t.bytes) {
                        t.bytes = t.size_id.innerHTML = i;
                        t.bytes_array = [];
                        while (i--) {
                            mem(0);
                            t.bytes_array.push(0)
                        }
                    }
                    break;
                default:
                    if (t.bytes > 0) {
                        adi = ad;
                        ad += t.bytes;
                        for (var i in t.bytes_array) mem(t.bytes_array[i])
                    }
            }
            t.address_id.ad.innerHTML = adi;
            t = t.nextSibling
        }
        w.lines = n;
        if (first != w.memory.first) Map.changeStartAddress(w, first);
        Map.changeSize(w, size);
        if ((w.errors === NaN) || (w.errors != err)) {
            ygwm.changeWinTitle(w, (err ? WARN : "") + w.FuncName, true);
            w.errors = err
        }
    },
    Reassemble_line: function (t) {
        var u = t.parentNode;
        YASMed.AssembleLine(parentWin(u), u, t.source, u.TrLineNr, u.address)
    },
    thContents: {
        "address": "&nbsp;&nbsp;$&nbsp;&nbsp;",
        "size": "sz",
        "value": "val",
        "source": "src",
        "message": "msg"
    },
    MakeRow: function (c, th) {
        var i, j, k, l, t = dcE("TR");
        t.onmouseover = YASMed.mouseover_row;
        for (i in c) {
            j = dcE(th || "TD");
            k = c[i];
            t[k + '_id'] = j;
            j.className = k;
            if (th && (l = YASMed.thContents[k])) j.innerHTML = I8N(l);
            switch (k) {
                case "plus":
                    j.title = I8N("aanl");
                    j.onclick = th ? YASMed.FirstLine : YASMed.duplicate_listing_row;
                    break;
                case "numero":
                    j.title = I8N("mudt");
                    if (!th) dragndrop.register(j, YASMed.dndRow, t);
                    break;
                case "address":
                    j.appendChild(j.ad = dcE("SPAN"));
                    break;
                case "source":
                    if (!th) edit_text.register(j, {
                        size: 60,
                        maxsize: 200,
                        func: YASMed.Reassemble_line
                    })
            }
            t.appendChild(j)
        }
        return t
    },
    AssembleLine: function (w, t, s, n, ad) {
        t.bgCol = t.message_id.innerHTML = t.value_id.innerHTML = t.size_id.innerHTML = t.ot = "";
        t.source_id.source = s;
        t.source_id.innerHTML = s.replace(/[<]/g, "&lt;").replace(/[&]/g, "&amp;");
        t.bytes_array = [];
        t.Type = YASMed.Code;
        t.org = t.algn = null;
        t.bytes = 0;
        for (var i in w.subst) s = s.replace(w.subst[i].rx, w.subst[i].dst);

        function add_message(col, msg) {
            t.message_id.innerHTML += '<span style="background-color:' + col + '">&nbsp;</span> ' + msg + '<br>';
            if ((col == "red") || ((col == "orange") && (t.bgCol != "red"))) t.bgCol = col
        }
        var a = w.asmctx;
        a.add_message = add_message;
        a.emit_bin = function (data, size) {
            var h = "";
            while (size--) {
                t.bytes_array.push(data & 255);
                h = int2hex(data & 255, 1, 1, 1) + h;
                data >>= 8
            }
            t.value_id.innerHTML += h + " "
        };
        if (s.length && s[0] === '.') {
            s = s.replace(/[;].*/, "");
            s = s.replace(/\s+/g, " ");
            s = s.replace(/[ ]$/g, "");
            var i, s2 = s.split(" ");

            function parse_parameter2() {
                if (s2.length != 2) return add_message("red", I8N("wdf"));
                s2 = s2[1];
                if (s2.length > 30) return add_message("red", I8N("ns30"));
                i = 0;
                while (i < s2.length)
                    if (alpha_chars[s2[i++]] !== 1) return add_message("red", WARN + I8N("nac"));
                return s2
            }
            switch (s2[0]) {
                case ".name":
                    s = parse_parameter2();
                    if (typeof s == "string") {
                        t.Type = YASMed.Name;
                        w.FuncName = s;
                        w.errors = NaN
                    }
                    break;
                case ".org":
                    s = parse_parameter2();
                    if (s == "auto") {
                        t.Type = YASMed.Org;
                        t.org = -1
                    } else {
                        i = str2int(s);
                        if ((i === null) || (i < 0)) {
                            add_message("red", I8N("wnf") + ' ' + s);
                            break
                        }
                        t.Type = YASMed.Org;
                        t.org = i;
                        t = _
                    }
                    break;
                case ".align":
                    s = parse_parameter2();
                    i = str2int(s);
                    if ((i === null) || (i < 1)) {
                        add_message("red", I8N("wnf") + ' ' + s);
                        break
                    }
                    if (i > 512) {
                        add_message("red", i + "??? " + I8N("wtf"));
                        break
                    }
                    if (i & (~i)) {
                        add_message("red", i + I8N("np2"));
                        break
                    }
                    t.Type = YASMed.Align;
                    t.algn = i;
                    break;
                case ".profile":
                    s = parse_parameter2();
                    if (typeof s != "string") {
                        add_message("red", I8N("Bpn"));
                        break
                    }
                    if (s == "auto") {
                        t.message_id.innerHTML += I8N("oma");
                        a.core = false;
                        break
                    }
                    if (typeof profiles[s] != "object") {
                        add_message("red", I8N("pdne"));
                        break
                    }
                    t.Type = YASMed.Empty;
                    a.profile = s;
                    i = a.YASEP_TYPE = (a.core = profiles[s]).datapath;
                    if ((i == 16) || (i == 32)) w.memory.rwx = (w.memory.rwx & ~48) | i;
                    break;
                case ".":
                    s = parse_parameter2();
                    if (typeof s != "string") {
                        add_message("red", I8N("Bln"));
                        break
                    }
                    if ((typeof (i = w.tsbus[s2[1]]) == "number") && (w.subst[i].dst != ad)) {
                        t.message_id.innerHTML += I8N("svkod");
                        break
                    }
                    s2 = [A, s, "" + ad];
                case ".subst":
                    if (s2.length < 2) {
                        add_message("red", I8N("Mws"));
                        break
                    }
                    var tr, dst = "";
                    if (s2.length < 3) t.message_id.innerHTML += I8N("whtw");
                    else {
                        i = 2;
                        while (true) {
                            dst += s2[i++];
                            if (!s2[i]) break;
                            dst += " "
                        }
                    }
                    if (dst == s2[1]) {
                        t.message_id.innerHTML += I8N("idtt");
                        break
                    }
                    if (Y.keywords[s2[1].toUpperCase()] === true) {
                        add_message("red", I8N("sbkw"))
                    }(tr = dcE("DIV")).innerHTML = "<b>" + s2[1].replace(/[<]/g, "&lt;").replace(/[&]/g, "&amp;") + "</b> = \"<i>" + dst.replace(/[<]/g, "&lt;").replace(/[&]/g, "&amp;") + "\"</i>";
                    var o = {
                        src: s2[1],
                        dst: dst,
                        rx: new RegExp(s2[1], "g"),
                        tr: tr
                    };
                    w.subst_id.appendChild(tr);
                    if (typeof (i = w.tsbus[s2[1]]) == "number") {
                        rC(w.subst[i].tr);
                        w.subst[i] = o
                    } else {
                        w.tsbus[s2[1]] = w.subst.length;
                        w.subst.push(o)
                    }
                    t.Type = YASMed.Empty;
                    break;
                default:
                    add_message("red", I8N("ukd"))
            }
        } else {
            Y.encode_instruction(s, a);
            if (t.bytes = a.encoded_size_bytes) {
                t.size_id.innerHTML = t.bytes;
                t.encoded_fields = a.encoded_fields;
                t.encoded_instruction = a.encoded_instruction;
                t.ot = a.ot;
                if (a.name != "" && a.core === false) {
                    config.changeInstruction("true", a.name);
                    if (config.empty) switch (a.cond) {
                        case "BIT0":
                        case "BIT1":
                            config.trigger("CondR1=1")
                    }
                }
            } else t.Type = YASMed.Empty
        }
        YASMed.renumber_lines(w, t, n, ad)
    },
    listed_idNames: ["plus", "numero", "address", "size", "value", "source", "message"],
    NewLine: function (w, s) {
        var t = YASMed.MakeRow(YASMed.listed_idNames);
        w.listed_id.appendChild(t);
        YASMed.AssembleLine(w, t, s, w.lines, w.memory.last)
    },
    FirstLine: function (ev) {
        var w = parentWin(this),
            t = YASMed.MakeRow(YASMed.listed_idNames);
        w.listed_id.insertBefore(t, w.list_header_id.nextSibling);
        YASMed.AssembleLine(w, t, "", 0, w.memory.first);
        return false
    },
    duplicate_listing_row: function (ev) {
        var originalTR = this.parentNode,
            p = originalTR.parentNode,
            w = parentWin(p);
        if (!ev.ctrlKey) {
            var newTR = YASMed.MakeRow(YASMed.listed_idNames);
            p.insertBefore(newTR, originalTR.nextSibling);
            YASMed.AssembleLine(w, newTR, ev.shiftKey ? originalTR.source_id.source : "", originalTR.TrLineNr + 1, originalTR.address + originalTR.bytes)
        } else YASMed.remove_row(originalTR)
    },
    remove_row: function (tr) {
        var w = parentWin(tr);
        rC(tr);
        YASMed.renumber_lines(w)
    },
    mousedrop_row: function () {
        if (YASMed.moved_row_newWin != YASMed.orig_win) YASMed.renumber_lines(YASMed.moved_row_newWin);
        YASMed.renumber_lines(YASMed.orig_win)
    },
    mouseover_row: function () {
        if ((dragndrop.dragdropstate == 6) && (this != dragndrop.moved_item)) {
            var newIndex = this,
                parent = this.parentNode,
                win = parentWin(parent);
            if (YASMed.moved_row_newWin == win) {
                if ((this.TrLineNr > YASMed.moved_row_prev_index) || ((this.TrLineNr == YASMed.moved_row_prev_index) && (this.previousSibling == dragndrop.moved_item))) newIndex = this.nextSibling
            } else ygwm.focus_window(null, YASMed.moved_row_newWin = win);
            dragndrop.moved_item = parent.insertBefore(dragndrop.moved_item, newIndex);
            YASMed.moved_row_prev_index = this.TrLineNr;
            return false
        }
        return true
    },
    start_move_row: function (row) {
        YASMed.orig_win = YASMed.moved_row_newWin = parentWin(row);
        YASMed.moved_row_prev_index = row.TrLineNr;
        YASMed.moved_row_prevSibling = row.previousSibling;
        row.className = "selected"
    },
    unlinkArrow: function (s) {
        var a = s.arrow;
        s.arrowDiv.appendChild(a);
        delete a.ed.simArrows[s.simCount];
        a.ed = _
    },
    eraseCallback: function (w) {
        var i, s;
        for (i in w.simArrows) {
            (s = w.simArrows[i]).BPstop = true;
            sim.resetState(s, 5)
        }
        Map.delAllEdit(w)
    },
    memCallback: function (w, a, rwx, sim, d) {
        if (rwx & 1) {
            var r = sim.arrow,
                c = sim.simCount,
                t = w.memory.Id[a];
            if (t) {
                t.address_id.appendChild(r);
                if (r.ed != w) {
                    if (r.ed && r.ed.simArrows) delete r.ed.simArrows[c];
                    w.simArrows[c] = sim;
                    r.ed = w
                }
            }
        }
    },
    start: function () {
        var plus, w, tt, tb, tr, c, d, e, f = "function" + YASMed.serial,
            cont = dcE("DIV");
        w = ygwm.new_window("YASMed " + f, null, cont, 600, 450, 120, 60, false, true, true, true, false, "doc_cygr");
        w.lines = 0;
        w.FuncName = f;
        w.YasCount = YASMed.serial++;
        w.eraseCallback = YASMed.eraseCallback;
        w.Maps = [];
        w.MapDiv = [];
        d = dcE("DIV");
        d.appendChild(Map.NewMem(w, 1, 13, YASMed.memCallback, 0, 0));
        w.memory.Id = [];
        button(d, "yara", YASMed.reassemble, 0, "1em");
        button(d, "yaea", YASMed.export_ASM, 0, "1em");
        button(d, "yahy", YASMed.export_HEX, 0, "1em");
        button(d, "yavh", YASMed.export_VHDL, 0, "1em");
        button(d, "yafl", YASMed.flash_HYX, 0, "1em");
        d.appendChild(c = dcE("DIV"));
        cont.appendChild(d);
        (tt = dcE("TABLE")).className = "listed";
        (w.listed_id = dcE("TBODY")).appendChild(w.list_header_id = YASMed.MakeRow(YASMed.listed_idNames, "TH"));
        tt.appendChild(w.listed_id);
        cont.appendChild(tt);
        w.errors = false;
        w.asmctx = new Y.ASM_context(null, null, true, profiles["YASEP32"]);
        w.simArrows = [];
        w.subst = [];
        w.tsbus = [];
        cont.appendChild(e = dcE("P"));
        e.innerHTML = "<u>" + I8N("sbst") + " :</u>";
        cont.appendChild(w.subst_id = dcE("DIV"));
        w.subst_id.className = "subst";
        return w
    },
    INIT_func: function () {
        var r = ". .NAME .SUBST .PROFILE .ORG .ALIGN".split(" "),
            i;
        for (i in r) Y.keywords[r[i]] = true;
        for (i in YASMed.Types) YASMed[YASMed.Types[i]] = i;
        YASMed.dndRow = {
            trashBin: true,
            ondelete: YASMed.remove_row,
            ondrag: YASMed.start_move_row,
            ondrop: YASMed.mousedrop_row,
            state: 6
        };
        menu.subMenuItem(menu.list["ASM"], i8n.ne, "ASM/YASMed")
    }
});
list_yas = ["fbLFSR", "first_boot", "fractal", "keywords", "Mul16x16"];
INIT({
    INIT_func: function () {
        var i, j, k = menu.list["ASM"];
        menu.subMenuItem(k, i8n.Exasm, null, 1);
        for (i in list_yas) {
            j = list_yas[i];
            menu.subMenuItem(k, ["&nbsp;" + j], "ASM/impASM#examples/" + j + ".yas")
        }
    }
});
test_asm = {
    win: null,
    chunks: 15,
    HTML: "",
    add_message: function (col, msg) {
        test_asm.HTML += '      <span style="background-color:' + col + '">' + (test_asm.msg_number++) + "</span>: " + msg + "\n"
    },
    test_opcode: function (x) {
        var a = ' <a id="end_error" name="end_error"> ';
        test_asm.HTML += '  <a class="asm_active" onclick="wa(\'ASM/asm#a?' + x + '\')" href="#!ASM/asm#a?' + x + '">' + x + "</a>\n";
        if (Y.encode_instruction(x, test_asm.ASM)) {
            Y.DISASM(test_asm.ASM.encoded_instruction, test_asm.DISASM);
            if (test_asm.DISASM.instruction != x) {
                test_asm.add_message("red", a + "output != input</a>");
                test_asm.errnum++
            }
        } else {
            test_asm.add_message("red", a + "error </a>");
            test_asm.errnum++
        }
    },
    scan_opcode_table: function () {
        if (test_asm.cur_opcode >= test_asm.max_opcode) {
            if (test_asm.errnum > 0) {
                test_asm.win.shortmsg(I8N("tcw") + test_asm.errnum + I8N("rs"));
                document.location.href = "#end_error";
                YGCSS.changeTheme(test_asm.win, "doc_red")
            } else {
                test_asm.win.shortmsg(I8N("Ts"));
                YGCSS.changeTheme(test_asm.win, "doc_gryl")
            }
        } else {
            test_asm.HTML = "";
            var chunk = test_asm.chunks;
            while ((chunk > 0) && (test_asm.cur_opcode < test_asm.max_opcode)) {
                chunk--;
                var name = test_asm.sorted_opcodes[test_asm.cur_opcode++],
                    index = Y.table_opcode[name].val,
                    instr = Y.opcode_table[index],
                    f = instr.forms,
                    i = 1;
                test_asm.HTML += "<hr>" + int2hex(index) + ' : <a href="#!ISM/' + name + '">' + name + '</a>    "<i>' + instr.description + '"</i>\n';
                do {
                    if (f & i) {
                        var j = Y.TableForm[i],
                            k = j.replace(/FORM_/, ""),
                            v = ' -<a href="#docs/instructions.html#' + k + '">' + j + "</a>",
                            w = Y.TableEncoders[j].ex(instr.flags, name);
                        if (w == "") w = instr.name;
                        else w = instr.name + " " + w;
                        test_asm.HTML += v + "\n";
                        test_asm.test_opcode(w);
                        if ((i & Y.FORMS_EXTENDABLE) && ((instr.flags & Y.NO_CONDITION) == 0)) test_asm.test_opcode(w + " " + Y.randomCondition())
                    }
                    i <<= 1
                } while (i <= f)
            }
            var new_pre = dcE("pre");
            new_pre.innerHTML = test_asm.HTML;
            test_asm.win.contents_id.firstChild.appendChild(new_pre);
            redraw(test_asm.scan_opcode_table)
        }
    },
    trigger: function (s) {
        test_asm.msg_number = 0;
        test_asm.errnum = 0;
        test_asm.cur_opcode = 0;
        while ((s = test_asm.win.contents_id.firstChild.lastChild)["nodeName"] == "PRE") rC(s);
        YGCSS.changeTheme(test_asm.win, "default");
        test_asm.win.shortmsg(I8N("rng"));
        redraw(test_asm.scan_opcode_table)
    },
    start: function () {
        test_asm.sorted_opcodes = [];
        test_asm.max_opcode = 0;
        test_asm.win = ygwm.new_window("", null, "none", 650,Math.ceil((getHeight() * 3) / 4), 100, 50, false, true, true, true, false);
        test_asm.win.contents_id.firstChild.innerHTML = import_htmi("regression/test_asm");
        winman.patchInnerLinks(test_asm.win.contents_id);
        ygwm.changeWinTitle(test_asm.win, hiddenText(0, getByClass("hiddenDiv", "DIV", test_asm.win.contents_id)));
        test_asm.ASM = new Y.ASM_context(test_asm.add_message);
        test_asm.DISASM = new Y.DISASM_context(test_asm.add_message);
        test_asm.ASM.YASEP_TYPE = 32;
        for (var name in Y.table_opcode) {
            if ((Y.table_opcode[name].forms > 0) && (typeof Y.opcode_aliases[name]) == "undefined") test_asm.sorted_opcodes[test_asm.max_opcode++] = name
        }
        test_asm.sorted_opcodes = test_asm.sorted_opcodes.sort();
        (test_asm.win.trigger = test_asm.trigger)();
        return test_asm.win
    },
};
INIT(regression = {
    win: null,
    example_nr: 0,
    test_asm_nr: 0,
    scan_examples: function () {
        if (regression.example_nr < list_yas.length) {
            winman.activate_window("ASM/impASM#examples/" + list_yas[regression.example_nr++] + ".yas");
            redraw(regression.scan_examples)
        } else regression.example_nr = 0
    },
    functs: {
        "examples": function () {
            if (regression.example_nr == 0) redraw(regression.scan_examples)
        },
        "opcodes": function () {
            if (regression.test_asm_nr == 0) winman.activate_window("Dev/test_asm#again")
        }
    },
    trigger: function (s) {
        var f = regression.functs;
        if (s == "all") {
            for (s in f) f[s]()
        } else {
            typeof (s = f[s]) == "function" && s()
        }
    },
    start: function () {
        var i, j, win = regression.win = ygwm.new_window("", null, "none", 650,Math.ceil((getHeight() * 3) / 4), 100, 50, false, true, true, true, false);
        win.contents_id.firstChild.innerHTML = import_htmi("regression/regression");
        for (i in regression.functs) {
            (j = dcE("div")).innerHTML = '<a href="#!Dev/regression#' + i + '"><button>' + i + "</button></a>";
            win.contents_id.firstChild.appendChild(j)
        }
        winman.patchInnerLinks(win.contents_id);
        ygwm.changeWinTitle(win, hiddenText(0, getByClass("hiddenDiv", "DIV", win.contents_id)));
        win.trigger = regression.trigger;
        return win
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Dev"], i8n.ats, "Dev/regression")
    }
});
INIT(track = {
    start: function () {
        var c = dcE("DIV");
        c.innerHTML = import_htmi("tracker/track");
        winman.patchInnerLinks(c);
        var t, w = ygwm.new_window("Tracker", null, c, 600, 450, 300, 200, false, true, true, true, false, "ms2_bucy");
        return w
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Dev"], i8n.trk, "track")
    }
});
INIT(webring = {
    win: null,
    loaded: 0,
    fill_window: function () {
        if (typeof sites != "object" && webring.loaded++ < 200) {
            webring.cont.innerHTML += " .";
            setTimeout(webring.fill_window, 100);
            return
        }
        var i, j, h;
        if (typeof sites != "object") h = I8N("wrf");
        else {
            h = I8N("wr");
            for (i in sites) {
                j = sites[i];
                if (j && j.indexOf("yasep") == -1) h += '<a target="_blank" href="' + j + '">' + j + '</a>\n'
            }
        }
        webring.cont.innerHTML = h + '</pre>'
    },
    start: function () {
        if (webring.loaded == 0) import_code("http://members.iinet.net.au/~daveb/simplex/webring.js", function () {
            webring.loaded += 300
        });
        (webring.cont = dcE("DIV")).innerHTML = "loading";
        webring.fill_window();
        webring.win = ygwm.new_window("Webring", null, webring.cont, 450, 300, 30, 40, false, true, true, true, false, "doc_vibu");
        return webring.win
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Web"], ["WebRing"], "webring")
    }
});
INIT(bouchot = {
    win: null,
    iframe: null,
    cnt: 0,
    currentTitle: "",
    refresh_ms: 4E3,
    url: ["http://yasep.org/tribune", "http://my-bouchot.appspot.com/yasep/"],
    current_url: 0,
    start: function () {
        var i = dcE("IFRAME");
        (bouchot.iframe = i).innerHTML = I8N("lg");
        i.style.width = i.style.height = "100%";
        i.style.border = "0px solid red";
        i.src = bouchot.url[bouchot.current_url];
        bouchot.win = ygwm.new_window(I8N("bc"), null, i, 550, 500, 60, 30, false, true, true, true, false, "mussel");
        bouchot.win.contents_id.style.overflow = "visible";
        setTimeout(bouchot.pollTitle, 100);
        return bouchot.win;
    },
    pollTitle: function () {
        if (bouchot.win.winTitle) {
            var t = I8N("bc");
            try {
                t = bouchot.iframe.contentDocument.title
            } catch (e) {}
            if (t != bouchot.currentTitle) ygwm.changeWinTitle(bouchot.win, bouchot.currentTitle = t, true);
            setTimeout(bouchot.pollTitle, bouchot.refresh_ms)
        }
    },
    INIT_func: function () {
        menu.subMenuItem(menu.list["Web"], i8n.bc, "bouchot")
    }
});
lib_nodes = {
    misc: [
        [
            [],
            [], "#CBC", "NOP"
        ],
        [
            [{
                number: "4h"
            }],
            [], "#BCB", "CRIT"
        ],
        [
            [{
                number: "1234h"
            }],
            [{
                port: "output1"
            }], "#BCB", "const"
        ],
        [
            [{
                port: "addr"
            }],
            [{
                port: "data"
            }], "#BBC", "ReadMem"
        ],
        [
            [{
                port: "data"
            }, {
                port: "addr"
            }],
            [], "#CBB", "SR_Put"
        ],
        [
            [{
                port: "addr"
            }],
            [{
                port: "data"
            }], "#BCC", "SR_Get"
        ],
        [
            [{
                port: "data"
            }, {
                port: "addr"
            }],
            [], "#CCB", "WriteMem"
        ],
        [
            [{
                port: "input1"
            }, {
                port: "input2"
            }],
            [{
                port: "output1"
            }, {
                port: "output2"
            }, {
                port: "output3"
            }], "#F99", "stupid_example"
        ]
    ],
    arith: [
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "sum"
            }], "#F99", "ADD"
        ],
        [
            [{
                port: "plus"
            }, {
                port: "minus"
            }],
            [{
                port: "diff"
            }], "#F99", "SUB"
        ],
        [
            [{
                port: "plus"
            }, {
                port: "minus"
            }],
            [], "#F99", "CMPU"
        ],
        [
            [{
                port: "plus"
            }, {
                port: "minus"
            }],
            [], "#F99", "CMPS"
        ],
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "diff"
            }], "#F99", "UMIN"
        ],
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "diff"
            }], "#F99", "UMAX"
        ],
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "diff"
            }], "#F99", "SMIN"
        ],
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "diff"
            }], "#F99", "SMAX"
        ]
    ],
    bool: [
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "x"
            }], "#F99", "AND"
        ],
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "x"
            }], "#F99", "OR"
        ],
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "x"
            }], "#F99", "XOR"
        ],
        [
            [{
                port: "a_"
            }, {
                port: "b"
            }],
            [{
                port: "x"
            }], "#F99", "ANDN"
        ],
        [
            [{
                port: "a_"
            }, {
                port: "b"
            }],
            [{
                port: "x"
            }], "#F99", "ORN"
        ],
        [
            [{
                port: "a_"
            }, {
                port: "b"
            }],
            [{
                port: "x"
            }], "#F99", "XORN"
        ],
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "x_"
            }], "#F99", "NAND"
        ],
        [
            [{
                port: "a"
            }, {
                port: "b"
            }],
            [{
                port: "x_"
            }], "#F99", "NOR"
        ]
    ],
    conditions: [
        [
            [{
                port: "val"
            }, {
                port: "yes"
            }, {
                port: "no"
            }],
            [{
                port: "x"
            }], "#F9F", "Zero"
        ],
        [
            [{
                port: "val"
            }, {
                port: "yes"
            }, {
                port: "no"
            }],
            [{
                port: "x"
            }], "#F9F", "Not Zero"
        ],
        [
            [{
                port: "val"
            }, {
                port: "yes"
            }, {
                port: "no"
            }],
            [{
                port: "x"
            }], "#F9F", "LSB=1"
        ],
        [
            [{
                port: "val"
            }, {
                port: "yes"
            }, {
                port: "no"
            }],
            [{
                port: "x"
            }], "#F9F", "LSB=0"
        ],
        [
            [{
                port: "val"
            }, {
                port: "yes"
            }, {
                port: "no"
            }],
            [{
                port: "x"
            }], "#F9F", "MSB=1"
        ],
        [
            [{
                port: "val"
            }, {
                port: "yes"
            }, {
                port: "no"
            }],
            [{
                port: "x"
            }], "#F9F", "MSB=0"
        ],
        [
            [{
                number: "4h"
            }, {
                port: "val"
            }, {
                port: "yes"
            }, {
                port: "no"
            }],
            [{
                port: "x"
            }], "#F9F", "bit=1"
        ],
        [
            [{
                number: "3h"
            }, {
                port: "val"
            }, {
                port: "yes"
            }, {
                port: "no"
            }],
            [{
                port: "x"
            }], "#F9F", "bit=0"
        ]
    ]
};
INIT(graph = {
    win: null,
    serial: 0,
    reflow: function (r, n, t) {
        while (true) {
            r.number = n;
            if (r.className == "outputs") {
                t.row_last = t.row_output.previousSibling;
                t.row_first = t.row_input.nextSibling;
                t.rows_number = n;
                return
            }
            r.number_id.firstChild.innerHTML = "&nbsp;<br>" + (n++) + "<br>&nbsp;";
            r = r.nextSibling
        }
    },
    add_row: function (r) {
        if (typeof r.items != "number") r = this.parentNode;
        var n = r.number,
            t = r.parentNode;
        t.insertBefore(graph.create_row(n, 1), r);
        graph.reflow(r.previousSibling, n, t)
    },
    add_input: function () {
        var t = this.parentNode.parentNode,
            u = palette.create_node([
                [{
                    number: t.serial_in
                }],
                [{
                    port: "port"
                }], "#9F9", "input_" + t.serial_in++
            ], 2);
        t.row_input.NodeDiv.appendChild(u);
        t.row_input.NodeDiv.appendChild(graph.create_inter(2));
        palette.fix(u)
    },
    add_output: function () {
        var t = this.parentNode.parentNode,
            u = palette.create_node([
                [{
                    port: "port"
                }],
                [{
                    result: "uuu"
                }], "#99F", "output_" + t.serial_out++
            ], 3);
        t.row_output.NodeDiv.appendChild(u);
        t.row_output.NodeDiv.appendChild(graph.create_inter(3));
        palette.fix(u)
    },
    delete_row: function (r) {
        var n = r.number,
            s = r.nextSibling;
        t = r.parentNode;
        if (r.className == "outputs") return;
        rC(r);
        graph.reflow(s, n, t)
    },
    ondropGraphRow: function () {
        graph.onmouseout_row()
    },
    onmousein_row: function () {
        if (dragndrop.dragdropstate == 4 && this != dragndrop.selected) {
            this.style.borderWidth = "3px";
            this.style.margin = "0px";
            dragndrop.destination = this;
            graph.dndGraphRow.ondrop = graph.ondropGraphRow
        }
        return false
    },
    onmouseout_row: function () {
        var t = dragndrop.destination;
        if (!t || t.style.borderWidth == "0px") return;
        t.style.borderWidth = "0px";
        t.style.margin = "3px";
        dragndrop.destination = graph.dndGraphRow.ondrop = null;
        return false
    },
    inter_left: null,
    inter_right: null,
    ondrag_node: function (root) {
        graph.inter_left = root.nextSibling;
        graph.inter_right = root.previousSibling
    },
    ondrop_node: function () {
        if (dragndrop.destination) {
            graph.onmouseout_inter()
        } else {}
    },
    ondelete_node: function () {
        var d = dragndrop.selected.dndroot;
        var p = d.parentNode;
        rC(d.nextSibling);
        rC(d);
        if (!(--p.parentNode.parentNode.items)) {}
    },
    onmousein_inter: function () {
        if ((dragndrop.dragdropstate == this.state) && (this != graph.inter_left) && (this != graph.inter_right)) {
            this.style.borderWidth = "3px";
            this.style.margin = "0px";
            (dragndrop.destination = this).onmouseout = graph.onmouseout_inter
        }
        return false
    },
    onmouseout_inter: function () {
        var t = dragndrop.destination;
        if (t) {
            t.style.borderWidth = "0px";
            t.style.margin = "3px";
            t.onmouseout = dragndrop.destination = _
        }
        return false
    },
    create_inter: function (state) {
        var d = dcE("DIV");
        d.innerHTML = "&nbsp;<br>&nbsp;<br>&nbsp;";
        d.className = "inter";
        d.state = state;
        d.onmouseover = graph.onmousein_inter;
        return d
    },
    create_row: function (n, t) {
        var classes = ["plus", "number", "nodes", "bin_out", "asm_out"],
            r = dcE("TR"),
            c, d, j, k;
        r.number = n;
        r.items = 0;
        for (j in classes) {
            c = dcE("TD");
            c.className = k = classes[j];
            r[k + "_id"] = c;
            switch (k) {
                case "plus":
                    if ((t != 1) && (t != 3)) break;
                    c.onclick = graph.add_row;
                    c.title = I8N("ggt");
                    break;
                case "number":
                    if (t == 1) {
                        d = dcE("DIV");
                        d.onmouseover = graph.onmousein_row;
                        d.onmouseout = graph.onmouseout_row;
                        d.className = "NumberOver";
                        d.title = I8N("mudt");
                        dragndrop.register(d, graph.dndGraphRow, r);
                        c.appendChild(d)
                    }
                    break;
                case "nodes":
                    d = dcE("DIV");
                    d.className = "NodeDiv";
                    d.appendChild(graph.create_inter(t));
                    c.appendChild(d);
                    r.NodeDiv = d;
                    d = dcE("DIV");
                    d.className = "ShuffleDiv";
                    d.innerHTML = "&nbsp;";
                    d.state = 1;
                    d.onmouseover = graph.onmousein_inter;
                    c.appendChild(d);
                    r.ShuffleDiv = d;
                    break;
                case "asm_out":
                case "bin_out":
                    c.innerHTML = "&nbsp;";
                    break;
                default:
                    c.innerHTML = classes[j]
            }
            r.appendChild(c)
        }
        return r
    },
    start: function () {
        var c, r, t, g = "graph_" + graph.serial++,
            i, j, k, win, cont = (graph.cont = dcE("DIV"));
        cont.innerHTML = import_htmi("GNL/graph");
        win = ygwm.new_window("GNL&nbsp;-&nbsp;" + g, null, cont, 450, 350, 100, 120, false, true, true, true, false, "WinOK");
        (win.name_id = getByClass("graph_name", "SPAN", win)).innerHTML = win.FuncName = g;
        edit_text.register(win.name_id, {
            size: 40,
            func: function (t) {
                ygwm.changeWinTitle(win, "GNL&nbsp;-&nbsp;" + (win.FuncName = t.source), true)
            },
            check: edit_text.filter_alpha
        });
        t = dcE("TABLE");
        t.className = "graph";
        for (i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    j = 2;
                    break;
                case 3:
                    j = 3;
                    break;
                default:
                    j = 1
            }
            r = graph.create_row(i, j);
            if (i == 0) {
                t.row_input = r;
                r.className = "inputs";
                r.number_id.innerHTML = "";
                r.number_id.className = "plus";
                r.number_id.title = I8N("ggi");
                r.number_id.onclick = graph.add_input;
                r.plus_id.innerHTML = "?";
                r.plus_id.className = "number";
                r.plus_id.onclick = _
            }
            t.appendChild(r)
        }
        r.className = "outputs";
        r.number_id.innerHTML = "";
        r.number_id.className = "plus";
        r.number_id.title = I8N("ggo");
        r.number_id.onclick = graph.add_output;
        rC(r.ShuffleDiv);
        t.row_output = r;
        t.rows_number = 0;
        graph.reflow(t.row_input.nextSibling, 1, t);
        cont.appendChild(t);
        t.serial_in = 1;
        t.row_input.number_id.onclick();
        r = t.row_first.NodeDiv;
        r.appendChild(palette.create_node(lib_nodes.arith[0], 1));
        r.appendChild(graph.create_inter(1));
        r.appendChild(palette.create_node(lib_nodes.arith[1], 1));
        r.appendChild(graph.create_inter(1));
        r.appendChild(palette.create_node(lib_nodes.arith[2], 1));
        r.appendChild(graph.create_inter(1));
        r.appendChild(palette.create_node(lib_nodes.arith[3], 1));
        r.appendChild(graph.create_inter(1));
        r = t.row_last.NodeDiv;
        r.appendChild(palette.create_node([
            [{
                port: "input1"
            }, {
                port: "input2"
            }, {
                port: "input3"
            }],
            [{
                port: "output1"
            }, {
                port: "output2"
            }], "#F99", "exemple1"
        ], 1));
        r.appendChild(graph.create_inter(1));
        r.appendChild(palette.create_node([
            [{
                port: "input1"
            }, {
                port: "input2"
            }],
            [{
                port: "output1"
            }, {
                port: "output2"
            }, {
                port: "output3"
            }], "#F99", "exemple2"
        ], 1));
        r.appendChild(graph.create_inter(1));
        t.row_last.items = 2;
        t.serial_out = 1;
        t.row_output.number_id.onclick();
        palette.fix_sizes(t);
        return (graph.win = win)
    },
    INIT_func: function () {
        graph.dndGraphRow = {
            trashBin: true,
            ondelete: graph.delete_row,
            state: 4
        };
        menu.subMenuItem(menu.list["GNL"], i8n.gg, "GNL/graph")
    }
});
INIT(palette = {
    win: null,
    flea_border: 4,
    clear: function () {
        var c = dcE("DIV");
        c.className = "clear";
        return c
    },
    dndNodes: [],
    create_node: function (l, state) {
        var c, d = dcE("DIV"),
            e, f, g, h, i, r, s;

        function create_ports(list, border, p) {
            if (list.length) {
                var j = 0;
                for (i in list) {
                    if (list[i].port) {
                        (e = dcE("DIV")).className = "GNLport";
                        e.innerHTML = list[i].port;
                        e.style[border] = "0px";
                        if (j++ > 0) e.style.borderLeft = "0px";
                        h = dcE("DIV");
                        h.className = "flea_offset";
                        h.style[p] = "0px";
                        g = dcE("DIV");
                        g.className = "flea";
                        h.appendChild(g);
                        e.appendChild(h);
                        d.appendChild(e)
                    } else {
                        if (list[i].number) {
                            (e = dcE("DIV")).className = "GNLnumber";
                            edit_text.register(e, {
                                size: 30,
                                func: function (x) {
                                    x.innerHTML = x.source = "" + (str2int(x.source));
                                    palette.fix(d)
                                },
                                check: edit_text.filter_number
                            });
                            e.innerHTML = list[i].number;
                            e.title = I8N("gpc");
                            d.appendChild(e)
                        } else {
                            if (list[i].result) {
                                (e = dcE("DIV")).className = "GNLnumber";
                                e.style.backgroundColor = "#DDD";
                                e.innerHTML = list[i].result;
                                d.appendChild(e)
                            }
                        }
                    }
                }
            } else {
                (e = dcE("DIV")).className = "placeholder";
                e.innerHTML = "&nbsp;";
                d.appendChild(e)
            }
        }
        d.className = "GNLnode";
        d.style.backgroundColor = l[2];
        d.appendChild(palette.clear());
        create_ports(l[0], "borderTop", "top");
        d.appendChild(palette.clear());
        (s = dcE("DIV")).className = "NodeName";
        s.title = I8N("gpm");
        dragndrop.register(s, palette.dndNodes[state], d);
        s.innerHTML = l[3];
        d.appendChild(s);
        d.appendChild(palette.clear());
        create_ports(l[1], "borderBottom", "bottom");
        return d
    },
    fix: function (node) {
        var d, w, tr, td, div, max_len = 0,
            div_in, div_mid, div_out, len_in, len_mid, len_out;

        function scan(v) {
            w = v;
            d = div;
            div = div.nextSibling;
            while (div && div.className != "clear") {
                w += 1 + div.scrollWidth;
                div = div.nextSibling
            }
            if (w > max_len) max_len = w;
            return d
        }
        div = node.firstChild;
        div_in = scan(1);
        len_in = w;
        div_mid = scan(6);
        len_mid = w;
        div_out = scan(1);
        len_out = w;

        function adjust(d, l) {
            d.style.width = ((max_len - l) >> 1) + "px"
        }
        adjust(div_in, len_in);
        adjust(div_mid, len_mid);
        adjust(div_out, len_out)
    },
    fix_sizes: function (base) {
        var i, t = base.getElementsByTagName("DIV");
        for (i = 0; i < t.length; i++)
            if (t[i].className && (t[i].className == "GNLnode")) palette.fix(t[i])
    },
    toggle: function () {
        toggle(this.parentNode.nextSibling);
        return false
    },
    dndNewNode: {
        ondrag: function () {
            graph.inter_left = graph.inter_right = _
        },
        trashBin: false,
        state: 1,
        ondrop: function () {
            graph.ondrop_node()
        }
    },
    start: function () {
        var h, cont = (palette.cont = dcE("DIV"));
        cont.innerHTML = import_htmi("GNL/palette");
        h = getByClass("hiddenDiv", "DIV", palette.cont);
        palette.win = ygwm.new_window(hiddenText(0, h), null, cont, 350, 250, 40, 40, false, true, true, true, false, "sat_gryl");
        var c, d, e, f, g, i, j, k, l, u;
        for (j in lib_nodes) {
            k = lib_nodes[j];
            u = [];
            (l = dcE("DIV")).className = "palette_label";
            cont.appendChild(l);
            (d = dcE("DIV")).className = "palette_main";
            for (i in k) {
                u.push(k[i][3]);
                (e = dcE("DIV")).className = "NodeContainer";
                (f = dcE("DIV")).className = "nodeMargin";
                f.appendChild(palette.create_node(k[i], 1));
                f.appendChild(palette.clear());
                e.appendChild(f);
                (g = dcE("DIV")).className = "nodeOver";
                dragndrop.register(g, palette.dndNewNode, f.firstChild);
                e.appendChild(g);
                d.appendChild(e)
            }
            d.appendChild(palette.clear());
            cont.appendChild(d);
            l.innerHTML = '<span style="cursor:pointer" title="show/hide box"><b>' + j + '</b></span>&nbsp;&nbsp;&nbsp;<font size="-1"><i>(' + u.join(",&nbsp;") + ")</font></i>";
            l.firstChild.onclick = palette.toggle;
            palette.fix_sizes(d)
        }
        return palette.win
    },
    INIT_func: function () {
        for (var i = 1; i <= 3; i++) palette.dndNodes[i] = {
            trashBin: true,
            ondelete: graph.ondelete_node,
            ondrag: graph.ondrag_node,
            ondrop: graph.ondrop_node,
            state: i
        };
        palette.menuItem = menu.subMenuItem(menu.list["GNL"], i8n.gp, "GNL/palette")
    }
});
key_list = [
    ["def/asm", DEF_ASM],
    ["doc/opcodes", OpcodeTable],
    ["tool/EU", EU],
    ["welcome", Welcome],
    ["test/template", template],
    ["VHDL/config", config],
    ["ASM/asm", asmwin],
    ["save", SaveFile],
    ["Flash", Flash],
    ["bouchot", bouchot],
    ["track", track],
    ["webring", webring],
    ["ASM/impASM", impASM],
    ["ASM/YASMed", YASMed, -1],
    ["sim/YASim", sim, -1],
    ["sim/map", Map, -1],
    ["sim/fb", fb, -1],
    ["GNL/graph", graph, -1],
    ["GNL/palette", palette],
    ["Dev/test_asm", test_asm],
    ["Dev/regression", regression]
];
for (var i in key_list) {
    var j = key_list[i];
    if (j[1]) winman.register_key(j[0], j[1].start, j[2])
};

function body_start() {
    var i, w, k = 0,
        l, c;
    getById("BigRedWarning", "div").innerHTML = I8N("Init");
    for (i in INIT_list) INIT_list[i].INIT_func();
    LANG.change_lang(LNG);
    wincount = 0;
    start_iterate(0)
}

function start_iterate(i) {
    var k, l, w, n = localStorage.key(i++),
        c;
    if (n.indexOf("Win_") == 0) {
        c = lsGet(n).split(" ");
        l = +c[0];
        n = n.slice(4);
        if (winman.window_keys[n]) {
            w = wa(n);
            if (typeof w == "object") {
                if (l < 0) {
                    l = -l;
                    ygwm.hide_all(w)
                }
                ygwm.move(w, l, +c[1]);
                ygwm.changeDimensions(+c[2], +c[3], w);
                winman.coord_ondrop(w);
                wincount++
            }
        }
    }
    if (i < localStorage.length) {
        redraw(function () {
            start_iterate(i)
        })
    } else {
        if (first_run) wa("doc/firstrun");
        if (!wincount) wa("welcome");
        if ((i =window.location.hash).indexOf("#!") == 0) wa(i.slice(2))
    }
};