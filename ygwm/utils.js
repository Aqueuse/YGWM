/*
ygwm/utils.js
This file is distributed under terms of the Affero GPL v3 license
or later, see http://yasep.org or http://ygwm.org

utils.js is the first included file, because it contains general
functions that are used by ygwm.js and shared with the rest of the site.

created Feb  5 08:20:34 2009 by whygee@f-cpu.org
20130927 : forking from ygwm.js
20140126
20140222
*/

// Several DOM Shortcuts

function dcE(a){
  return document.createElement(a);
}

function rC(e){
  e.parentNode.removeChild(e);
}

// Beware : getById and getByClass are different !
function getById(id,tag,base) {
  base=base||document;
  tag=tag||"*";

  var i, t=base.getElementsByTagName(tag);
  for (i=0; i<t.length; i++) {
    if (t[i].id && (t[i].id == id))
      return t[i];
  }
  return null;
}

function getByClass(className,tag,base) {
  base=base||document;
  tag=tag||"*";

  var i, t=base.getElementsByTagName(tag);
  for (i=0; i<t.length; i++) {
    if(t[i].className && (t[i].className==className))
      return t[i];
  }
  return null;
}

function toggle(a){
  a=a.style;
  return a.display
    =(a.display=="none")?"block":"none";
}

// Coordinates and dimensions

function mousePos(e) {
  e = e || window.event;
  var t = document.body || document.documentElement;
  return {
    x: e.pageX || e.clientX + t.scrollLeft,
    y: e.pageY || e.clientY + t.scrollTop
  };
}

function getHeight(){
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function getWidth(){
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

// Empty

function emptyFunc(a){
  // empty, as the name says
  return a; // yeah... but useful anyway here and there
}

// Refresh the screen

////// Regression cause by Firefox16 !!! 20121013
i="requestAnimationFrame";
redraw=window[i]
     ||window["moz"+i]
     ||window["webkit"+i]
     ||window["ms"+i]
     ||function(f){ setTimeout(f,0); };

// Generic anti-congestion for the UI :
// gets an object and performs the action after a delay or until a counter reached 0
function delay(o){
  if (o.timer){
    clearTimeout(o.timer);
    o.timer=null; // necessary ?
  }

  if (o.max) {
    if (o.counter){
      o.timer=setTimeout(function(){
        o.counter=o.max;
        o.timer=null; // necessary ?
        o.func();
      },o.delay);
      o.counter--;
    }
    else {
      o.func();
      o.counter=o.max;
    }
  }

  else {  // max is absent : just delay.
    o.timer=setTimeout(function(){
      o.timer=null; // necessary ?
      o.func();
    },o.delay);
  }
}

//////////////////////////////////////////////////////
// cleanup a table, remove any #text and #comment
// nodes inbetween the TR TH and TDs (proved to be necessary......)
function cleanup_table(id) {
  var t=id.firstChild, t2;

  // scan the tbody
  while (t) {
    // preload the next sibling because we might remove t
    t2=t.nextSibling;
    switch(t.nodeName) {
      case "TBODY": // recurse
      case "TR":    // recurse
        //alert("recursing in "+t.nodeName);
        cleanup_table (t);
        // fold !
      case "TH":
      case "TD": break; // ne fait rien, passe au suivant

      default : // enlève le tag (c'est un screugneugneu de #text)
        //alert("removing "+t.nodeName);
        rC(t);
    }
    t=t2;
  }
}

function parentWin(w){
  // get back to the root of the tree of a window, searching a content_id
  while (w) {
    if (w.contents_id)
      break;
    w=w.parentNode;
  }
  return w;
}

/// More misc. stuff:

function intrnd(x) {
  return Math.floor(Math.random()*x);
}

function pad_right(s, n) {
  n-=(s+"").length;
  while (n-- > 0)
    s+=" ";
  return s;
}

function pad_left(s, n) {
  n-=(s+"").length;
  while (n-- > 0)
    s=" "+s;
  return s;
}

