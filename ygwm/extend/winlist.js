/*
yasep/gui-js/winlist.js
This file is distributed under terms of the Affero GPL v3 license or later, see http://yasep.org
created sam. août 13 22:06:58 CEST 2011 by whygee@f-cpu.org
version mar. sept. 13 01:42:52 CEST 2011
version mer. nov.  9 13:40:47 CET 2011 : add counter to the delay, renamed from ygwm-winlist.js to winlist.js
           and add color-grouping

creates and maintains a foldable vertical list of open windows.
this is also the official list of all the open windows so 
that's where they are accessed and it affects the cookies too.

DOM tree :
body->winlist->header->minimize
             |       L>"Windows"
             L>winlist_bg->winlist_fg->Winlist-item
                                     L>Winlist-item
                                     L>Winlist-item
                                     ...
CSS:
winlist:
   z-index: 1000
   defined width
   has borders, background
   position: absolute at the bottom left of the page, "fixed" (moves when scrolling)
header:
   like ygwm (reuse styles)
winlist_bg:
   determines the size (height+width) of the list,
   shown/hidden to fold/unfold the list
winlist_fg:
   contains the items,
   height left to the browser and read to set the height of winlist_bg

*/

INIT(winlist={
  margin_top:80,
  firstfreespot:0,
  last_time:0,

  // delaying solved both a CPU usage concern and a display init issue.
  adjust_height_obj:{
    delay:200, // ms
    max:6,
    counter:6,
    timer:null,
    func:function(){
      var y=winlist.winlist_fg.scrollHeight,
          z=getHeight();

      if ((y+winlist.margin_top) > z) { // clip
        y = 0;
        z -= winlist.margin_top;
        if (z >= 0)
          y = z;
      }
      winlist.winlist_bg.style.height = y+"px";
    }
  },
  adjust_height:function(){
    delay(winlist.adjust_height_obj);
  },

  MinMaxClick: function(){
    if (winlist.minmax_button.className=="ygwm_corner_minimize"){
      winlist.winlist_bg.style.display="none";
      winlist.minmax_button.className="ygwm_corner_maximize";
    }
    else {
      winlist.winlist_bg.style.display="";
      winlist.minmax_button.className="ygwm_corner_minimize";
    }
    winlist.adjust_height(); // just in case.
  },

  removeItem:function(win){
    win.winlist_item_id.parentNode.removeChild(win.winlist_item_id);

    var i=win.winlist_index;
//  winlist.list.splice(win.winlist_index,1); // remove from list  NOOOO!
    delete winlist.list[i]; // creates a hole that is "skipped" by "for - in"
    if (i<winlist.firstfreespot)
          winlist.firstfreespot=i;
    winlist.adjust_height();
  },

  rename:function(item,val){
    item.innerHTML=val;
    winlist.adjust_height();
  },

  change_window:function(win,item){
    if (ygwm.last_focus != win) { // not selected=> select
      ygwm.focus_window(null,win);
      if (win.style.display=="none")
        ygwm.show_all(win);
    }
    else {
      if (win.style.display=="none")
        ygwm.show_all(win);
      else
        return ygwm.hide_all(win); // selected => hide
    }

    // in the first 2 cases, scroll to the window
    ygwm.center_window(win);
  },

  addWindow:function(win,name){
    var h=dcE("DIV");
    win.really_hide=true;
    win.winlist_item_id=h; // so ygwm.focus_window() can change h.className
//    h.className="winlist_item"; // will be changed by the focus_window() in ygwm
    h.innerHTML=name;
    h.win=win;
    h.onclick=function(e){
      // détection du temps depuis le dernier click
      var t=e.timeStamp || +new Date(), // fix for Opera, which sets the value to 0
          u=t-winlist.last_time;
      winlist.last_time=t;

      if (u>300)
        winlist.change_window(win,h);
      else {
        // get the style and state of the window
        u=win.className;
        if (win.style.display=="none") {
          // winlist.minimizeAll(u);
          for (var i in winlist.list)
            if (winlist.list[i].className==u)
              ygwm.hide_all(winlist.list[i]);
        }
        else
          // winlist.restoreAll(u);
          for (var i in winlist.list)
            if (winlist.list[i].className==u)
              ygwm.show_all(winlist.list[i]);
      }
    };
//    if (YGCSS.ColorStyles[style]) // moved to focus_window()
//      h.style.backgroundColor=YGCSS.ColorStyles[style][5];
    winlist.winlist_fg.appendChild(h);

    h=winlist.firstfreespot; // find the first free spot
    while(winlist.list[h])
      h++;

    winlist.list[
        winlist.firstfreespot=win.winlist_index=h // register then add to list
     ]=win;

    winlist.adjust_height();
  },

  minimizeAll: function(){
    for (var i in winlist.list)
      ygwm.hide_all(winlist.list[i]);
  },

  restoreAll: function(){
    for (var i in winlist.list)
      ygwm.show_all(winlist.list[i]);
  },

  closeAll: function(){
    for (var i in winlist.list)
      ygwm.erase_window(0,winlist.list[i]);
  },

  INIT_func:function(){
    if(winlist.list)
      return Al8N("WLerr1");
    if(!ygwm.new_window)
      return Al8N("WLerr2");

    winlist.list=[];

    // main DIV
    var w=dcE("DIV");
    w.className="ygwm_div";  // winlist reuses the ygwm CSS but we have to adapt it "a bit"
    w.id="winlist";  // add more style from in ygwm.css
    w.innerHTML=
       '<div class="ygwm_header_selected">'
      +'<div class="ygwm_corner_minimize"></div>'
      +'<div id="winlist_name">Windows list</div>'
      +'</div>'
      +'<div id="winlist_bg"><div id="winlist_fg"></div></div>';
    document.body.appendChild(w);
    LANG.change_innerHTML.push([
       document.getElementById("winlist_name"),i8n.winlst]);

    (winlist.header=getByClass("ygwm_header_selected","DIV",w) // header DIV
                   ).onclick=winlist.MinMaxClick;
    winlist.minmax_button=getByClass("ygwm_corner_minimize","DIV",winlist.header);    // minimize/maximize button
    winlist.winlist_bg=document.getElementById("winlist_bg");    // background of the list
    winlist.winlist_fg=document.getElementById("winlist_fg");    // foreground of the list

    window.onresize=winlist.adjust_height; // the vertical changes should be filtered
  }
});
