/*
gui-js/menu.js
This file is distributed under terms of the Affero GPL v3 license or later, see http://yasep.org
created mar. août 30 02:24:47 CEST 2011 by whygee@f-cpu.org
version lun. sept 12 08:17:07 CEST 2011 init_obj() added (20140224: renamed to INIT_list)
version mer. avril 11 21:36:51 CEST 2012 : console.info removed
version mer. mai  9 12:58:55 CEST 2012 : changed the argument formats.

This file implements a menu bar that can be independent from ygwm.
  some features depend on winman and avoid closure.
*/

INIT(menu={
  list:{},

  unfold_menuItem: function(){
    if (ygwm.moved_div)
      return; // No display if ygwm (or dragndrop) is currently moving something
    if (this.listlength > 0)
      this.menuItemList.style.display=""; // display only if something to show
  },

  fold_menuItem: function(){
    this.menuItemList.style.display="none";
  },

  onClick: function(){
    winman.activate_window(this.key);
  },

  // langlist is a list of strings, that can be HTML to make links and pictures and stuff
  //    The first element is used as a "key" to find the entry later.
  // func can be a ygwm key string or a normal function. Leave empty if nothing.
  subMenuItem: function(n,langlist,func, sep){
/* ifdef dev :
    if (typeof langlist!="object")
      return alert("subMenuItem: expecting langlist argument to be an array");

    if (!n) {
      var s="Internal Error",i;
      for (i in arguments)
        s+="\n"+i+"="+arguments[i];
      alert(s);
    }
endif*/
    var name=langlist[0], l,
        o=dcE("DIV");
    if (l=n.list[name])
      return l; // don't create duplicates
    o.className=(sep===1)?"menuSeparator":"menuItem";
    setHTML(o,langlist);

    // click behaviour
    if (typeof func == "function")
      o.onclick=func;
    else {
      if (typeof func == "string") {
        o.onclick=menu.onClick;
        o.key=func; // avoid closure
      }
    }
    n.list[name]=o;
    n.listlength++;
    n.menuItemList.appendChild(o);
    return o;
  },

  mainMenuItem: function(langlist,dir,t){
    var i,k,l;
    if (typeof langlist=="string") {
      if (l=menu.list[langlist])
        return l; ////// LOOKUP SHOULD BE DONE WITH menu.list["xyz"]
      else
        alert(langlist+" "+I8N("not found"));
    }
    var name=langlist[0],
        m=dcE("DIV"),
        n=dcE("DIV"),
        o=dcE("SPAN");
    if (dir != "R")
      dir="L"; // class "L" by default (left-justified unless told otherwise)
    n.className="menuBarItem"+dir;
    menu.list[name]=n;

    setHTML(o,langlist);
//    setTitle(o,t);
    n.appendChild(o);

    n.list={};
    n.listlength=0;
    n.onmouseout =menu.fold_menuItem;
    n.onmouseover=menu.unfold_menuItem;
    menu.mainMenu_id.appendChild(n);
//    n.style.width=n.scrollWidth+"px"; // sets the size once and for all

    // create the folding list
    m.className="menuItemList";
    m.style.display="none";
    n.appendChild(m);
    n.menuItemList=m;

    if (t)
      menu.subMenuItem(n,t,0,1);
    return n;
  },


/////////////////////////////// Stupid code... but somewhat fun ///////////////////////////////

  rainbow_x:5,
  rainbow_i:0,

  iterate_rainbow:function(){ /* create a "rainbow" */
    var j=YGCSS.ColorStylesNames[--menu.rainbow_i];
    ygwm.new_window(j, null, "none", 160,90, menu.rainbow_x,
      Math.ceil((menu.rainbow_x/2)+60), false, true, true, true, false, j);
    menu.rainbow_x+=40;
    if (menu.rainbow_i>0)
      redraw(menu.iterate_rainbow);
  },

  key_count:0,
  key_time:0,

  iterate_keys:function(){
    if (menu.key_count>0) {
      redraw(menu.iterate_keys);
      winman.activate_window(winman.keys_list[--menu.key_count]);
    }
    else
      alert("Elapsed : "+(+new Date()-menu.key_time)+"ms");
  },

  create_menu:function(){
    (menu.mainMenu_id=dcE("DIV")).id="MainMenuBar";
    document.body.appendChild(menu.mainMenu_id);
  },
/*
  close_all:function(){
    menu.key_count=0;
    var w=ygwm.top_window.previousSibling;
    if(w.winTitle){
      ygwm.erase_window(w);
    }
  },
*/
///////////////////////////////////////////////////////////////////////////
  // Build a YASEP-specific menu :
  INIT_func: function(){

    var i, j, l='<a target="_blank" href="';
    function t(i,k){
      menu.subMenuItem(j,i,k);
    }
    function sublink(g,k){
      // first create a sub menu item, with the URL as id
      var e=menu.subMenuItem(j,[k]),
          a=dcE("A");
        a.href=k;
        a.target="_blank";
      e.innerHTML=""; //erase the string that was put
      e.appendChild(a);
      LANG.change_innerHTML.push([a,g]);
//      return e;
    }

    menu.create_menu();

  // this sequence makes a first layout to organise the menu,
  // before individual items are created, out of order.
    menu.mainMenuItem(i8n.Doc,0,i8n.Doct);
//    menu.mainMenuItem(["Tools","Outils"]); empty, items moved to other menus
//    menu.mainMenuItem(["Examples","Exemples"]); // To be (re)moved  i8n.Exa

    menu.mainMenuItem(i8n.Tools,0,i8n.vug);

    menu.mainMenuItem(["Sim"],0,i8n.sim);
    menu.mainMenuItem(["ASM"],0,i8n.asm);
    menu.mainMenuItem(["GNL"],0,"GNL is Not a Language (not yet functional)");
//    menu.mainMenuItem(["BASIC"]);  http://hackaday.com/2011/08/28/basic-programming-on-an-arduino/ + Tinybasic.pde
//    menu.mainMenuItem(["Forth"]);
//    menu.mainMenuItem(["C"]);
//    menu.mainMenuItem(["Pascal"]);
    menu.mainMenuItem(["Tuto"],0,i8n.tuto);
    menu.mainMenuItem(i8n.Dev,0,i8n.dvpt);

 // reverse order for the elements on the right side
  j=menu.mainMenuItem(i8n.win,"R"),
      t(i8n.welc, "welcome");
      t(i8n.fstr, "doc/firstrun");
      t(i8n.Ocultar,winlist.minimizeAll);
      t(i8n.Mostrar,winlist.restoreAll);
      t(i8n.Arco, function(){  /* create a "rainbow" */ 
         menu.rainbow_i=YGCSS.ColorStylesNames.length;
         menu.iterate_rainbow();
      });
      t(i8n.All, function() {
        menu.key_time=+new Date();
        menu.key_count=winman.keys_list.length;
        menu.iterate_keys();
      });
      t(i8n.Rem,function(){
        menu.key_count=0; //abort "open all"
        winlist.closeAll();        
      });
  j=menu.mainMenuItem(["Web"],"R",i8n.web);
//    t([l+'mailto:whygee%40f-cpu.org">'+I8N("Cont")+'</a>']);
      sublink(i8n.Cont,"mailto:whygee@f-cpu.org");
      sublink(i8n.Dnl,"yasep.tbz");
      sublink(i8n.Lic,"license/agpl.txt");
      t([l+'http://news.yasep.org/">blog</a>']);
      t([l+'https://www.facebook.com/pages/The-YASEP/167478153314916">facebook</a>']);
      t([l+'http://yasep.org">yasep.org</a>']);
//      t([l+'http://archives.yasep.org">Archives</a>']);
      sublink(i8n.arc,"http://archives.yasep.org");
      t([l+'http://defora.org">defora</a>']);
      sublink(i8n.demo,"http://archives.yasep.org/ygwm.mp4");
      sublink(i8n.ygwmd,"gui-js/ygwm.html");

// the rest is moved to gui-js/lang_switcher.js
  }
});
