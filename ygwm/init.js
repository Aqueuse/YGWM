INIT_list=[]; // cookies, menu, winlist, test_asm, OpcodeTable, asmwin, DOC_GEN, DEF_ASM, template...

function INIT(o){
  INIT_list.push(o); // add the new module to the list
}

INIT(Welcome = {
    start: function () {
        w = getById("main-" + LANG.LN, "div", Welcome.div) ||
        getById("main-en", "div", Welcome.div);
        var cont = w.cloneNode(true);
        var h = getByClass("hiddenDiv", "DIV", cont);
        winman.patchInnerLinks(cont);
        return ygwm.new_window(
            "bienvenue",  // win Title
            null,  // where (DOM)
            cont,  // contents
            Math.ceil((getWidth() * 2) / 3), // width
            500,  // height
            Math.ceil(getWidth() / 6), // X
            41,  // Y
            false,  // erase callback
            true,  // footer
            true,  // header
            true,  // close button
            false, // really_hide
            "welcome");  // win_style
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
    start_iterate(0);
}