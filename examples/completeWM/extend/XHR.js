/*  yasep/gui-js/XHR.js
This file is distributed under terms of the Affero GPL v3 license or later, see http://yasep.org
created ven. sept.  9 08:26:10 CEST 2011 by whygee@f-cpu.org
version ven. sept.  9 23:01:24 CEST 2011 : added language support
version dim. sept. 18 13:43:16 CEST 2011 : back to .html, removing header and footer
mer. sept. 12 07:49:01 CEST 2012 : i8n

This file deals with synchronous, blocking, loading of data from the disk.
It mainly used to import HTML or example from external files from the YASEP site itself.
*/

// used by web/webring.js
function import_code(url, load){
  var s = dcE('script');
  s.onload = load;
  s.src = url;
  document.getElementsByTagName('head')[0].appendChild(s);
}

function import_data(url) {
  try{
    var loader= new XMLHttpRequest();
    loader.open("GET", url, false);
    loader.send(null);
    if (loader.status && (loader.status != 200)) {
      Al8N("idt1","",loader.status,"idt2","",url);
      return null;
    }
    return loader.responseText;
  }
  catch(err) {
    return null;
  }
}


function import_htmi(namebase,l) {
  if (typeof l == "undefined")
    l=LNG;
  var xhr,
      n=namebase+"."+i8n.LANGS[l]+".html";
  try{
    xhr=new XMLHttpRequest();
    xhr.open("GET", n, false);
    xhr.send(null);

//    if (xhr.status && (xhr.status >= 400))
    if (xhr.status && (xhr.status != 200))
      throw "http";
    // Opera doesn't seem to "catch" some errors in local files... :-(
    // So I add the detection of a necessary keyword.
    var startHTMI="<!--startHTMI-->";
    var endHTMI="<!--endHTMI-->";
    var s=xhr.responseText.indexOf(startHTMI);
    if (s > -1) {
      // keep only the parts between those tags:
      var e=xhr.responseText.indexOf(endHTMI,s);
      if (e<0)
        e=xhr.responseText.length;

      return xhr.responseText.slice(s,e);
    }
  }
  catch(err) {
  }
  // we get here because no return yet,
  // either "catch" worked or Opera failed.
  if (l===0) // already tried, abort
    return Al8N("R","",n,"nf");
  else // try with the default language
    return import_htmi(namebase,0);
}

function lsGet(k) {
  return localStorage.getItem(k)
}

function lsPut(k, s) {
  try {
      localStorage[k] = s
  } catch (e) {
      console.log('Setting localStorage key="' + k + '"failed\nPossible causes: quota exceeded or unsafe request origin')
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

if (window.localStorage) {
  if (localStorage.Lang) first_run = false
}
else {
  localStorage = {
      length: 0,
      removeItem: function (key) {}
  }
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
      if (!wincount) wa("welcome");
      if ((i =window.location.hash).indexOf("#!") == 0) wa(i.slice(2))
  }
};