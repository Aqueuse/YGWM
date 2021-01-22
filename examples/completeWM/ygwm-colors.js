/*
gui-js/ygwm-colors.js
This file is distributed under terms of the Affero GPL v3 license or later, see http://yasep.org
created jeu. sept.  8 07:07:48 CEST 2011 by whygee@f-cpu.org
init: taking the CSS routines out of ygwm
version : sam. sept. 10 20:48:42 CEST 2011 : new object name, new color rotation routine
version : dim. nov.  6 18:27:33 CET 2011
version : sam. déc.  3 00:46:48 CET 2011 : simplified rotate_color()
version : 20120512 : new "mussel" theme, some cleanup
*/

(YGCSS={
  insertCssRule: function(rule){
    YGCSS.StyleSheets.insertRule(rule,YGCSS.StyleSheetsLength++);
  },

  ColorStyles_tags:["~6", "~7", "~8", "~A", "~C", "~D","~F"],

  ColorStyles:{
  /* The numbers in each line are sorted in luminosity order :
      low/right border (greyish, darkest) (depth effect)
      buttons_selected
      button_unselected
      header_selected,  (could be same as above ?)
      header+footer unselected
      up-left border (light, unsaturated) (depth effect)
      text background (softest,lightest)
   */
  "default"    : "#666,#777,#888,#AAA,#CCC,#DDD,#FFF",
  "mussel"     : "#423d53,#57557a,#646a82,#737c9a,#848cbb,#a5a7d7,#c7c9f9",
  "mussl2"     : "#e95400,#ff972d,#ffbc41,#ffbb4a,#facd81,#feedc9,#fefff2",
  "mussel_old" : "#333548,#3f3f5c,#555970,#f08b13,#f0b612,#f4c84c,#f3e65e",
  "HBpen"      : "#606060,#606060,#FFFF00,#FFFF00,#606060,#A4A4A4,#A4A4A4",
  "docStyle"   : "#233558,#344569,#45567A,#6678DC,#8896EE,#b0c5ff,#fafcff",
  "WinOK"      : "#355823,#456934,#567A45,#78DC66,#96EE88,#c5ffb0,#efffe0",
  "WinKO"      : "#583523,#694534,#7A5645,#DC7866,#EE9688,#ffc5b0,#ffefe0",
  "airy"       : "#d0dced,#dfecff,#dfecff,#d0dced,#d0dced,#d0dced,#dfecff",
  "ghost"      : "#DCDCDC,#00FF00,#00FF00,#C3C3C3,#A0A0A0,#808080,#DCDCDC",
  "bluecyan"   : "#1e3853,#004891,#346ca0,#0870d8,#54a1ea,#77bdff,#aad3ff",
/* early attempts : */
  "old_yellow" : "#662,#772,#883,#AA4,#CC5,#DD5,#FF6",
  "old_cyan"   : "#266,#277,#388,#4AA,#5CC,#5DD,#6FF",
  "old_blue"   : "#226,#227,#338,#44A,#55C,#55D,#66F",
  "old_red"    : "#622,#722,#833,#A44,#C55,#D55,#F66",
  "rouge2"     : "#ff3f0c,#ff673e,#ff7854,#ff8c6e,#ffa790,#ffd1c4,#ffe8e2",
  "vert3"      : "#0fdb00,#37db2b,#4ddb43,#61db58,#89db83,#a8dba4,#c6dbc4"
},
  ColorStylesNames:[],

  default_style:"default",

  add_new_window_style: function(name){
    if (YGCSS.ColorStyles[name] && !YGCSS.ColorStyles[name].loaded){
     // continue if existing and not yet loaded

      var b="", i, j,
          cols=YGCSS.ColorStyles[name].split(",");

      for (i=0; i<YGCSS.CssTemplate.length; i++) {
        b=YGCSS.CssTemplate[i];
        for (j in cols)
        // could be better with a reverse lookup table
//        if (b.indexOf(YGCSS.ColorStyles_tags[j]) != -1)
            b=b.replace(YGCSS.regexp[j],cols[j]);
        YGCSS.insertCssRule("div."+name+b+"}");
      }
  
      YGCSS.ColorStyles[name].loaded=true;
      YGCSS.ColorStylesNames.push(name);
    }
  },

  paletize: function(theme){
    return t;
  },

  // create rainbows out of a given color theme (7 3-tuples of increasing values)
  rotate_color: function(name, theme) {
    var a=[],i=0,
        t=[["_bucy", 0, 1, 2],
           ["_cyan", 0, 2, 2],
           ["_cygr", 0, 2, 1],
           ["_gren", 0, 2, 0],
           ["_gryl", 1, 2, 0],
           ["_yelo", 2, 2, 0],
           ["_ylrd", 2, 1, 0],
           ["_red" , 2, 0, 0],
           ["_rdvl", 2, 0, 1],
           ["_viol", 2, 0, 2],
           ["_vibu", 1, 0, 2],
           ["_blue", 0, 0, 2]];

    theme=YGCSS.ColorStyles[theme].replace(/[,#]/gi,"","gi");
    while (i<theme.length){
      a.push(theme[i]+theme[i+1]);
      i+=2;
    }

    for (i in t) {
      var u=t[i],
          k=0,
          n=name+u[0],
          s="";
      if (!YGCSS.ColorStyles[n]) {
        do {
          s+="#"
           +a[k+u[1]]
           +a[k+u[2]]
           +a[k+u[3]];
          if ((k+=3)>20) //3*7=21
            break;
          s+=",";
        } while (true);
        YGCSS.ColorStyles[n]=s;
      }
    }
  },

  init: function() {
    // create the cache variable
// should try ? css = document.styleSheets[index].rules || document.styleSheets[index].cssRules;
    try{
      YGCSS.StyleSheets=document.styleSheets[document.styleSheets.length-1];
      YGCSS.StyleSheetsLength = YGCSS.StyleSheets.cssRules.length;
    }
    catch(i){
      YGCSS.insertCssRule=function(){};
      console.log("styleSheets are missing");
      return
    }

    var a=">div.ygwm_header ", i,
        c=">div.ygwm_header_selected ";
    YGCSS.CssTemplate=[
 "{ border: 2px solid; position: absolute; border-color: ~D ~6 ~6 ~D",
 ">div.ygwm_header{background-color: ~C",
 ">div.ygwm_header_selected{background-color: ~A",
 ">div.ygwm_contents{background-color:~F",
 ">div.ygwm_footer{background-color: ~C",
 ">div.ygwm_footer > div.ygwm_cornerSW{border-color:~C ~C ~8 ~8",
 ">div.ygwm_footer > div.ygwm_cornerSE{border-color:~C ~8 ~8 ~C",
 a+"> div.ygwm_corner_close   {border-color:~C ~8 ~C ~8",
 c+"> div.ygwm_corner_close   {border-color:~A ~7 ~A ~7",
 a+"> div.ygwm_corner_minimize{border-color:~8 ~C ~C ~C",
 c+"> div.ygwm_corner_minimize{border-color:~7 ~A ~A ~A",
 a+"> div.ygwm_corner_maximize{border-color:~C ~C ~8 ~C",
 c+"> div.ygwm_corner_maximize{border-color:~A ~A ~7 ~A",
 a+"> div.roundButton7{border-color:~8",
 c+"> div.roundButton7{border-color:~7",
 a+"div.roundButton3{border-color:~C",
 c+"div.roundButton3{border-color:~A",
 a+"div.ygwm_button_maximize{border-color:~8",
 c+"div.ygwm_button_maximize{border-color:~7",
 a+"div.ygwm_button_restore{border-color:~C;background-color:~8",
 c+"div.ygwm_button_restore{border-color:~A;background-color:~7"
];
    // regexp cache
    YGCSS.regexp=[];
    for (i=0; i<7; i++)
      YGCSS.regexp[i]=new RegExp(YGCSS.ColorStyles_tags[i],"g");

    YGCSS.rotate_color("sat","bluecyan");
    YGCSS.rotate_color("doc","docStyle");
    YGCSS.rotate_color("ms1","mussel");
    YGCSS.rotate_color("ms2","mussl2");

    // preload all the styles...
    for (var i in YGCSS.ColorStyles)
      YGCSS.add_new_window_style(i);
  },

  changeTheme: function(t, theme) {
    var where=parentWin(t);
    where.className=theme;
    if (where.winlist_item_id){
      if (YGCSS.ColorStyles[where.className])
        where.winlist_item_id.style.backgroundColor
          =YGCSS.ColorStyles[where.className].split(",")[4];
    }
  },

  importTheme:function(name, s){
    YGCSS.ColorStyles[name]=s;
    YGCSS.add_new_window_style(name);
    return name;    
  }
}).init();

// used only once in the JS code so not minimised :
ycT=YGCSS.changeTheme;
