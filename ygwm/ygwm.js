/*

ygwm.js
This file is distributed under terms of the Affero GPL v3 license or later,
 see http://yasep.org or http://ygwm.org

created Feb  5 08:20:34 2009 by whygee@f-cpu.org
version Feb  6 14:19:55 2009
version Feb  6 22:44:56 2009 with minimize/maximize
it took less than 2 days of work to get this :-)
version Feb  9 02:15:33 2009  added ygwm.erase_window
   and a callback to close the window at the end of a move
version Feb  9 14:42:32 2009 : scroll side-effect mitigated
version Feb 11 00:11:06 2009 : feedback from Stephane Moriaux, style changes, focus etc.
version Feb 11 22:27:33 2009 : getElement bug found by Fred on Chrome
version Feb 12 02:21:19 2009 : ygwm.slowDisplay
version Feb 13 03:13:42 2009 : dynamic detection of slow display
version Feb 15 01:46:31 2009 : Seamonkey "selection issue" spotted
version Feb 15 04:09:09 2009 : autoscroll added \o/
version Feb 16 01:23:49 2009 : autoscroll with threshold, getByName != getByClass
version Feb 19 00:19:55 2009
20090707 : moved to JSgui
20090709 : added some features :
  obj.reframe : externally set boolean, set to true if you don't want it to go outside the window
  obj.hide_all(), obj.show_all() : as the name says, called internally or externally to hide/show the whole window
  new calling option that allows the window to be hidden when clicked on the minimize button
20090830 : new_window can now be called with "where" set to null

20110809 : JSgui renamed to gui-js, trying to add "themes" (different window colors),
              ygwm_selected changed to ygwm_header_selected
20110810 : solved a little bug with ygwm.moved_div.contents_id.firstChild.style.display="none";
             sometimes we write to contents_id but we should write to contents_id.firstChild !
              this throws a warning when moving windows created manually instead of from an existing <div>
           disabled "disable_ygwm"
           added the colors/themes
20110814 : added winlist
           changed the show/hide system (now a per-window, changeable flag)
           changed last_focus to a more proper system where "ygwm.top_window" is an invisible <DIV> for "insertBefore"
20110829 : hide_all/show_all change the font color of winlist, added colors to the winlist items
20110830 : new variable for the highest (minimal value) of the window coordinates (min_coord_x, min_coord_y) for the menu system.
20110904 : adding roundButton7, no menu yet so disabled.
20110905 : menuButton machinery, event bubbling solved on header by hooking the move trigger to ygwm_header_name
20110908 : moved the CSS/color tables to ygwm-colors.js, moved the options to ygwm-options.js, added eraseCallback()
20110910 : getWidth, getHeight
20110913 : added title="" in some divs
20110914 : added Maximize
20111010 : new_window accepts parameters in an object (wrapper to newWindowObj)
           TODO : reduce the number of inline functions with closures to reduce memory footprint
20111109 : some cleanup, changed win_id.width => win_id.w, win_id.height => win_id.h
20120519 : stupid typo/bug found, hangs because can't find the maximize button
20120903 : adding callback to support persistence of window position/size
           changed ygwm.getParent into parentWin
           changed hide_all and show_all as functions without closure
           moved changeWinTitle from gui-js/ygwm-options.js
           disabled mouse_coords totally, and getTarget (used only once)
20120912 : i8n
20120913 : bit cleaner, moved cleanup_table here.
 the first part may need to be forked to ygwm-utils.js
20130927 : moved the file to ygwm/, moved the common functions to ygwm/utils.js

Known issues :
- Seamonkey=> mouseup (read mouse button status) : incurable
- Opera : detect ability to reach coordinates > 32k*32k (i'll see later)

TODO: uniform API (the parameters are not coherent from one function to another)
TODO: drop the HTML and build the tags alamano
*/


// Defined in gui-js/lang.js and uses i8n.js
// If absent (for minimalist uses such as ygwm-mini.html),
// just use the default english string.
if (! window.I8N){
  I8N=function(m){
    return m;
  };
  Al8N=function(m){
    alert(m);
  };
}


////////////////////////////////////////
// a placeholder for all ygwm-related stuff, that prevents namespace clutter

ygwm={

//mouse_coords_id:null,
//mouse_coords_timeout:null,
enableAutoscroll:true,
autoScrollThreshold:50, //px
max_coord:32300,  // 32767 minus some margin
min_coord_x:0,
min_coord_y:0,
noScrollIndex:100, // z-index of elements that prevent autoscroll onmouseover

   // Set to 0 to prevent boundary checks/clips.
slowDisplay:false,
lastTimeStamp:0,
latencyTimeOut: null,
action_function: null,
maxDisplayLatency:70, // milliseconds
redrawDelay:300,  // milliseconds
top_window: null,
last_focus: null,
moved_div: null,
mouse_xoffset: 0,
mouse_xoffset2: 0,
mouse_yoffset: 0,

min_height:60,
min_width:60,
max_height:20000, // arbitrary, can be changed, but Opera limits to 32000
max_width:8000,

move:function(id,x,y,w){
  if(id.reframe){  // closure   TODO: changer
    w=getWidth();
    if (x+id.w > w)
      x=w-id.w;
  }
  if (x<ygwm.min_coord_x)
      x=ygwm.min_coord_x;
  if (y<ygwm.min_coord_y)
      y=ygwm.min_coord_y;

  id.style.left=x+"px";
  id.style.top=y+"px";
  id.x=x;
  id.y=y;
},

// called by onclick() on a button INSIDE a window or by some
// other function (but then ev is null and "where" is the window that must be erased)
erase_window : function(e,where) {
  if (where=parentWin(where||this)) {
    ygwm.last_focus=null;
    if (where.winlist_item_id)
      winlist.removeItem(where);
    if (where.eraseCallback)
      where.eraseCallback(where);
    rC(where);
    for (var i in where)
      delete where[i]; // anti-leak
  }
  return false; // ?
},

// Latency measurement of the window display :
empty_callback: function() {
  ygwm.latencyTimeOut=null;
},

redraw_callback: function() {
  // restore the display
  ygwm.slowDisplay=false;
  var i=ygwm.moved_div;
  i.contents_id.firstChild.style.display="block";

  // restore the scroll
  i.contents_id.scrollLeft=i.lastScrollLeft;
  i.contents_id.scrollTop =i.lastScrollTop;

  ygwm.latencyTimeOut=setTimeout(ygwm.empty_callback,0);
},

//////// Auto-Scroll :
autoScroll: function(e) {
  e=e||window.event;
  var w,h,
      scrollX=0,
      scrollY=0,
      p = mousePos(e),
      over=e.target||e.srcElement; //getTarget(e);

  // Don't scroll if the cursor is over an element in foreground
  if (over && over.style && (over.style.zIndex >= ygwm.noScrollIndex))
    return;

  // scroll right/left ?
  w=e.clientX - ygwm.autoScrollThreshold;
  if (w < 0)
    scrollX=w;
  else {
    w=(e.clientX + ygwm.autoScrollThreshold) - getWidth();
    if ((w > 0) && (p.x+w < ygwm.max_coord))
      scrollX=w;
  }

  // scroll down/up ?
  h=e.clientY - ygwm.autoScrollThreshold;
  if (h < 0)
    scrollY=h;
  else {
    h =(e.clientY + ygwm.autoScrollThreshold) - getHeight();
    if ((h > 0) && (p.y+h < ygwm.max_coord))
      scrollY=h;
  }

  window.scrollBy(scrollX,scrollY);
},

// used by resize and move
mouse_move_callback: function(e) {
  // get a non-realtime timestamp to estimate the lag
  var p,d=new Date().getTime();

  if((!ygwm.slowDisplay)          // contents is displayed
    &&(ygwm.latencyTimeOut)       // and is being redisplayed
    &&(ygwm.lastTimeStamp>0)) {   // and the timestamp is initialised by a previous run.
      if (d < ygwm.lastTimeStamp) // has the time expired ?
        return false; // if not, drop the event for this time, retry later.

      // if expired, hide the display
      // (but before : save the scroll)
      ygwm.moved_div.lastScrollLeft=ygwm.moved_div.contents_id.scrollLeft;
      ygwm.moved_div.lastScrollTop =ygwm.moved_div.contents_id.scrollTop;

      ygwm.moved_div.contents_id.firstChild.style.display="none";
      ygwm.slowDisplay=true;
  }
  clearTimeout(ygwm.latencyTimeOut); // disable the redraw for this time too
  ygwm.latencyTimeOut=null;
  ygwm.lastTimeStamp = d + ygwm.maxDisplayLatency; // compute the timeout for the next turn

  p = mousePos(e);
  // call the action-specific code
  ygwm.action_function(p.x, p.y);

  ygwm.autoScroll(e);

  // fire the proper timeout
  if (ygwm.slowDisplay)
    ygwm.latencyTimeOut=setTimeout(ygwm.redraw_callback,ygwm.redrawDelay);
  else
    ygwm.latencyTimeOut=setTimeout(ygwm.empty_callback,0);
  return false;
},

// the callbacks used by resize and move
mouse_cornerSE : function(x, y) {
//  var w = x - ygwm.mouse_xoffset;
//  var h = y - ygwm.mouse_yoffset;
//  ygwm.changeDimensions(w,h,ygwm.moved_div);
  ygwm.changeDimensions(x - ygwm.mouse_xoffset, y - ygwm.mouse_yoffset, ygwm.moved_div);
},

mouse_cornerSW : function(x, y) {
  var w,h = y - ygwm.mouse_yoffset,

  // This one is more complex and tricky...
  // 1) don't let the width go past the left border of the browser
  l = x - ygwm.mouse_xoffset;
  if (l<3) {
    l=3;
    x=ygwm.mouse_xoffset+3;
  }
  // don't let the width go below min_width
  w = -( x - ygwm.mouse_xoffset2 );
  if (w < ygwm.min_width) {
    w = ygwm.min_width;
    l = ygwm.mouse_xoffset2-(ygwm.min_width+ygwm.mouse_xoffset);
  }

  if (l>ygwm.max_coord)
    return;
//  ygwm.moved_div.move(l,ygwm.moved_div.y);
  ygwm.move(ygwm.moved_div,l,ygwm.moved_div.y);
  ygwm.changeDimensions(w,h,ygwm.moved_div);
},

mouse_drag: function(x, y) {
  x -= ygwm.mouse_xoffset;
  y -= ygwm.mouse_yoffset;
  if ((x>ygwm.max_coord)||(y>ygwm.max_coord))
    return;
//  ygwm.moved_div.move(x,y);
  ygwm.move(ygwm.moved_div,x,y);
},

mouse_drop : function (/*e*/) {
  var y=ygwm.moved_div,
  // erase the window ?
      c=y.erase_callback;
  if ((ygwm.action_function==ygwm.mouse_drag) && c && c())
    ygwm.erase_window(null,y);
  // restore the display
  ygwm.moved_div.contents_id.firstChild.style.display="";
  clearTimeout(ygwm.latencyTimeOut);
//// Change the cookies here too
  if (typeof y.ondrop=="function")
    y.ondrop(y);

  ygwm.latencyTimeOut
    =ygwm.moved_div
    =document.onmousemove
    =document.onmouseup
    =ygwm.action_function
    =null;
  return false; // ?
},

// These are called when the user clicks on one of the move/resize handles

hook : function(e, where, callback) {
  // anti-window-manager-hickup :
  if (document.onmouseup)
      document.onmouseup(e);
  document.onmouseup=ygwm.mouse_drop;
  document.onmousemove=ygwm.mouse_move_callback;
  ygwm.moved_div = where;
  ygwm.action_function=callback;
  ygwm.slowDisplay=false;
  return false; // !!!!!!!! prevents selection of the header's text,
  // along with -moz-user-select: none; in the CSS
},

hook_move : function(e) {
  var p = mousePos(e),
      w = parentWin(this);
  ygwm.mouse_xoffset = p.x - w.offsetLeft;
  ygwm.mouse_yoffset = p.y - w.offsetTop;

  // the height could change when the browser window is too tight and the menu can take more than 1 line
  // so we check it again.
  if (window.menu)
    ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;

  return ygwm.hook(e, w, ygwm.mouse_drag);
},

hook_resizeSE : function(e) {
  var p = mousePos(e),
      w = parentWin(this);
  ygwm.mouse_xoffset = p.x - w.contents_id.offsetWidth;
  ygwm.mouse_yoffset = p.y - w.contents_id.offsetHeight;
  return ygwm.hook(e, w, ygwm.mouse_cornerSE);
},

hook_resizeSW : function(e) {
  var p = mousePos(e),
      w = parentWin(this);
  ygwm.mouse_xoffset = p.x - w.offsetLeft;
  ygwm.mouse_xoffset2= p.x + w.contents_id.offsetWidth;
  ygwm.mouse_yoffset = p.y - w.contents_id.offsetHeight;
  return ygwm.hook(e, w, ygwm.mouse_cornerSW);
},

////////////////////////////////////////:
// helper functions :

click_minimize: function(e){
  var w=parentWin(this);
  if(w.really_hide)
    ygwm.hide_all(w);
  else
    ygwm.showhide(null,w);
},

showhide : function(e,win,/**/p) { // ooooh ugly ! declaration of a var in the params list :-/
  if (document.onmouseup)
      document.onmouseup(e);

  if ((!e) && win)
    p=win;
  else
    p=parentWin(this);
  if (p.contents_id.style.display=="none") {
    this.className="ygwm_corner_minimize";
    p.contents_id.style.display="block";
    if (p.footer_id)
        p.footer_id.style.display="block";
  }
  else {
    this.className="ygwm_corner_maximize";
    p.contents_id.style.display="none";
    if (p.footer_id)
        p.footer_id.style.display="none";
  }
  return false;
},

center_window_obj:{
  w:null,
  delay:100, // ms
  max:8,
  counter:8,
  timer:null,
  func:function(){
    var w=ygwm.center_window_obj.w;
    if (window.menu)
      ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;

    if (((w.w + 30) > getWidth()) 
    ||  ((w.h + 50) > getHeight()))
      window.scrollTo(w.x, w.y-ygwm.min_coord_y);
    else
      window.scrollTo(((w.w - getWidth() )>>1) + w.x,
                      ((w.h - getHeight())>>1) + w.y);
  }
},
center_window:function(w){
  // no need to keep track of all the windows,
  // we just have to remember the last request.
  // This also saves a closure...
  ygwm.center_window_obj.w=w;
  delay(ygwm.center_window_obj);
},

focus_window : function(e,where, no){ // no unused ?
//  if (!where) // is it an event ?
    where=where||parentWin(this);

  if (where.contents_id) {
    // save the scroll
    where.lastScrollLeft=where.contents_id.scrollLeft;
    where.lastScrollTop=where.contents_id.scrollTop;

    // If hidden, show
    if (where.style.display=="none")
      ygwm.show_all(where);

    if (ygwm.last_focus != where) { // Is it already focused ?
      // bring on top
      if (ygwm.last_focus) {
        if (ygwm.last_focus.header_id)
          ygwm.last_focus.header_id.className="ygwm_header";
        if (ygwm.last_focus.winlist_item_id) {
          ygwm.last_focus.winlist_item_id.className="winlist_item";
          if (window.YGCSS && YGCSS.ColorStyles[ygwm.last_focus.className])
            ygwm.last_focus.winlist_item_id.style.backgroundColor
              =YGCSS.ColorStyles[ygwm.last_focus.className].split(",")[5];
        }
      }

      where.parentNode.insertBefore(where, ygwm.top_window);

      // restore the scroll
      where.contents_id.scrollLeft=where.lastScrollLeft;
      where.contents_id.scrollTop =where.lastScrollTop;
      if (where.header_id)
        where.header_id.className="ygwm_header_selected";
      if (where.winlist_item_id){
        where.winlist_item_id.className="winlist_item_selected";
        if (window.YGCSS && YGCSS.ColorStyles[where.className])
          where.winlist_item_id.style.backgroundColor
            =YGCSS.ColorStyles[where.className].split(",")[3];
      }
      ygwm.last_focus=where;
    }
  }
// else
//    console.info(where+" pas de contenu ??");
  return true; ///// IS IT BETTER THAN FALSE ?
},

changeDimensions : function(w,h,where) {
  if (w<ygwm.min_width)
      w=ygwm.min_width;
  else
    if (w>ygwm.max_width)
        w=ygwm.max_width;

  if (h<ygwm.min_height)
      h=ygwm.min_height;
  else
    if (h>ygwm.max_height)
        h=ygwm.max_height;

  if (where.header_id)
      where.header_id.style.width =w+"px";
  if (where.footer_id)
      where.footer_id.style.width =w+"px";

  where.contents_id.style.height=h+"px";
  where.contents_id.style.width =w+"px";

  where.w=w;
  where.h=h;
},

minMaxClick: function(/*e*/) {
  var w = parentWin(this);
  if (this.className=="ygwm_button_maximize") {
    this.className ="ygwm_button_restore";
    this.title=I8N("restore");

     // the height could change when the browser window is too tight and the menu can take more than 1 line
     // so we check it again.
    if (window.menu)
      ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;

    // resize first, then only scroll
    // but first, save the original size
    w.original_width =w.w;
    w.original_height=w.h;
    var x=24, //  18  // scrollbar
              //  +6;   // DIV borders
        y=48  //  18  // scrollbar of the window
              // +30  // DIV borders, header height
         +ygwm.min_coord_y;
    if (w.footer_id)
        y+=24;

    ygwm.changeDimensions(getWidth()-x,getHeight()-y,w);
  }
  else {
    this.className ="ygwm_button_maximize";
    this.title=I8N("maximize");
    // restore the size
    ygwm.changeDimensions(w.original_width,w.original_height,w);
  }
  ygwm.center_window(w);
},

hide_all:function(w){
  w.style.display="none";
  if (w.winlist_item_id)
      w.winlist_item_id.style.color="#505050";
  if (w.onhide)
      w.onhide(w);
},

show_all:function(w){
  w.style.display="block";
  ygwm.center_window(w);
  if (w.winlist_item_id)
      w.winlist_item_id.style.color="#000000";
  if (w.onshow)
      w.onshow(w);
},

changeWinTitle: function(f, val, unfiltered){
  // If called by a click, then f is the field that was changed.
  // If called by JS, f is the window and value is the new text.
  var w = f;
  if (w.header_name) {
    if (typeof val!=="string"){
      w = parentWin(f);
      val=f.value; // gets "value" from a form
    }

// Cleanup the value, escape a couple of characters
    if (unfiltered!==true)
      val=val.replace(/&/g,"&amp;").replace(/</g,"&lt;");
// modify the fields
    w.header_name.innerHTML
      = w.winTitle
      = val;
    if (w.winlist_item_id)
      winlist.rename(w.winlist_item_id,val);
  }
},

/*
///////   /!\ not used yet
winParam: {
    name: "Please change the default window name",    // string for the title
    where: null,   // ID before which to put the window
      // (necessary because the DIV must be mapped before it is fully initialised
      // can now be null if the object is not mapped yet (this triggers document.body.appendChild)
    contents: "none",// element ID (could be null or "none")
         // when null, then contents==where
    w: 300, // width
    h: 250, // height // integer / size of the contents
    X: 100,
    Y:100,    // coordinates where it will appear
    erase_callback: null, // function that returns true if the window must be erased after a move
    footer: true,  // boolean : add a footer when true, which adds msg and resize capabilities
    header: true,  // false if no header (error message ?)
    close_button: true,   // true if a "cross" button is added
    really_hide: true, // true if a click on the minimize button completely masks the window
    win_style: "ygwm_div"  // CSS name/property
},

newWindowObj: function(p) {
 // TODO  
},
*/

// The big function
new_window : function(
    winTitle,//name,    // string for the title
    where,   // ID before which to put the window
      // (necessary because the DIV must be mapped before it is fully initialised
      // can now be null if the object is not mapped yet (this triggers document.body.appendChild)
    contents,// element ID (could be null or "none")
         // when null, then contents==where
    w, h, // width/height, integer / size of the contents
    X, Y,    // coordinates where it will appear
    erase_callback, // function that returns true if the window must be erased after a move
    footer,  // boolean : add a footer when true, which adds msg and resize capabilities
    header,  // false if no header (error message ?)
    close_button,   // true if a "cross" button is added
    really_hide, // true if a click on the minimize button completely masks the window
    win_style  // CSS name/property
) {
  if(!ygwm.top_window){
    (ygwm.top_window=dcE("DIV")).id="DumbEmptyDiv";
    document.body.appendChild(ygwm.top_window);
  }

  // create and populate the root DIV
  var z="", new_id=dcE("DIV"),
    o=I8N("Options");

  new_id.really_hide=really_hide;
  new_id.winTitle=winTitle;

  if (window.YGCSS) {
    if ((typeof win_style!="string") || !YGCSS.ColorStyles[win_style]) // style absent ?
      win_style=YGCSS.default_style;
  }
  else
    win_style="ygwm_div";
  new_id.className=win_style;

  // the "structure" of the window
  if (header) {
z+='<div class="ygwm_header">';

    if (ygwm.menuClick)
z+='<div class="roundButton7" title="'+o+'"><\/div>'
  +'<div class="roundButton3" title="'+o+'"><\/div>'
  +'<div class="roundButton7margin" title="'+o+'"><\/div>';

z+=' <div class="ygwm_button_maximize" title="'+I8N("maximize")+'"><\/div>';

    if (close_button)
z+=' <div class="ygwm_corner_close" title="'+I8N("close")+'"><\/div>';

z+=' <div class="ygwm_corner_minimize" title="'+I8N("minimize")+'"><\/div>'
  +' <div class="ygwm_header_name">'+winTitle+'<\/div>'
  +'<\/div>'; }

z+='<div class="ygwm_contents"><\/div>';

  if (footer)
z+='<div class="ygwm_footer">'
  +' <div class="ygwm_cornerSW"><\/div>'
  +' <div class="ygwm_cornerSE"><\/div>'
  +' <div class="ygwm_msg"><\/div>'
  +'<\/div>';
  new_id.innerHTML=z;

  // register the new structure
  where=where||ygwm.top_window;
  where.parentNode.insertBefore(new_id, where);

  if (header) {
    new_id.header_id=getByClass("ygwm_header","DIV",new_id);

    if (ygwm.menuClick) {
      new_id.menuButton         = getByClass("roundButton7","DIV",new_id.header_id);
      new_id.menuButton.onclick = ygwm.menuClick;
      new_id.menuButtonInside   = getByClass("roundButton3","DIV",new_id.header_id);
      new_id.menuButtonInside.style.display="none";
      new_id.menuButtonInside.onclick = ygwm.menuClick;
    }

    if (close_button)
      getByClass("ygwm_corner_close","DIV",new_id.header_id).onclick=ygwm.erase_window;

    new_id.erase_callback=erase_callback;

    // show/hide hook
    getByClass("ygwm_corner_minimize","DIV",new_id.header_id).onclick=ygwm.click_minimize;

    (new_id.headerMinMax=getByClass("ygwm_button_maximize","DIV",new_id.header_id)
                       ).onclick=ygwm.minMaxClick;

    // get the title
    (new_id.header_name=getByClass("ygwm_header_name","DIV",new_id.header_id)
    // hook the move function
                      ).onmousedown=ygwm.hook_move;
  }// if (header)

  // move the contents there
  new_id.contents_id=getByClass("ygwm_contents","DIV",new_id);
  if (contents) {
    if (contents!="none")
      where=contents; //  new_id.contents_id.appendChild(contents);
    else
      where=dcE("DIV"); // new_id.contents_id.appendChild(document.createElement("DIV")); // make sure there is a <div> to prevent bugs
  }
//  else // contents==null => avoids repetition of getElementById
  new_id.contents_id.appendChild(where);

  // update the footer
  if (footer) {
    new_id.footer_id=getByClass("ygwm_footer","DIV",new_id);
    // msg
    new_id.messsage_id=getByClass("ygwm_msg","DIV",new_id.footer_id);
    new_id.shortmsg=function(msg) { // closure  TODO ?
      new_id.messsage_id.innerHTML=msg;
    };
    new_id.erase_msg=function() { // closure  TODO ?
      new_id.messsage_id.innerHTML="";
    };
    // right resize hook
    getByClass("ygwm_cornerSE","DIV",new_id.footer_id).onmousedown=ygwm.hook_resizeSE;
    // left resize hook
    getByClass("ygwm_cornerSW","DIV",new_id.footer_id).onmousedown=ygwm.hook_resizeSW;
  }
  else
    new_id.shortmsg
      =new_id.erase_msg
      =emptyFunc;

  ygwm.changeDimensions(w,h,new_id);

  new_id.reframe=false;

  // the height could change when the browser window is too tight and the menu can take more than 1 line
  // so we check it again.
  if (window.menu)
    ygwm.min_coord_y = menu.mainMenu_id.scrollHeight;

  ygwm.move(new_id,X,Y);

  // register in ygwm-winlist
  if(window.winlist)
    winlist.addWindow(new_id,winTitle,win_style);

  // click to focus
  (new_id.onmousedown=ygwm.focus_window)(null,new_id);
  ygwm.center_window(new_id);

  return new_id;
}

}; // end of ygwm object declaration

// used only once in the JS code so not minimised and safe for HTML :
ycWT=ygwm.changeWinTitle;
