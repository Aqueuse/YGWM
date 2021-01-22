INIT(Welcome = {
    start: function () {
        w = getById("main-" + LANG.LN, "div", Welcome.div) ||
        getById("main-en", "div", Welcome.div);
        var cont = w.cloneNode(true);
        var h = getByClass("hiddenDiv", "DIV", cont);
        winman.patchInnerLinks(cont);
        return ygwm.new_window(
            "bienvenue",
            null,
            cont,
            Math.ceil((getWidth() * 2) / 3),
            500,
            Math.ceil(getWidth() / 6),
            41,
            false,
            true,
            true,
            true,
            false,
            "welcome");
    },
    INIT_func: function () {
        var d = Welcome.div = document.getElementById("MainContents");
        getById("BigRedWarning", "div", d).style.display = "none";
    }
});

key_list = [
    ["welcome", Welcome]
  ];

  function body_start() {
    var i, w, k = 0,
        l, c;
    getById("BigRedWarning", "div").innerHTML = I8N("Init");
    for (i in INIT_list) INIT_list[i].INIT_func();
    LANG.change_lang(LNG);
    wincount = 0;
    start_iterate(0)
}