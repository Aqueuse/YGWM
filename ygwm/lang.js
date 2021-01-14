/* yasep/lang.js
This file is distributed under terms of the Affero GPL v3 license
   or later, see http://yasep.org or http://ygwm.org
created 20110909 by whygee@f-cpu.org
20110912 : objectified
20111122 : body_start() can change the default language
20120513 : moved the pictures as divs in logos/logos.css
20120912 : moved init_obj() to  gui-js/menu.js, added LS, LT, I8N() and window.onerror, LANG.LANG becomes LNG
20140221 : ygwm.org, cleanup...

Some definitions and general utilities for managing the languages.
Depends on i8n.js, also linked to application.js and cookies.js
(LNG is read/written by cookies.js)
*/

LANG={
  supported:false,
  LN:"", // the selected language string, can be different from browsLang

  // inline images to save some HTTP requests
  FLAGS:[], // initialised by init_obj / menu.js

  change_innerHTML: [], // beware of memory leaks !

  change_lang: function(i){
    i=+i; // in the case where the argument is a string

    var j,k;
    if ((i<0)||(i>=i8n.LANGS.length))
      i=0;

    LANG.LN=i8n.LANGS[
              LNG=i];
    cookies.save(); // see later
    changeMainWinTitle(I8N("welc").replace(/&nbsp;/gi," ")); // application.js

    // change the contents of DOM objects
    for (j in LANG.change_innerHTML){
      if (k=LANG.change_innerHTML[j])
        k[0].innerHTML=k[1][i] || k[1][0];
    }
  }
};

// detect the browser's language : 20120829
browsLang=(navigator.language||navigator.browserLanguage).slice(0,2); // reused in doc/doc.js

// LNG may be changed later when reading the cookies, it
// could become any large integer number, as it gets encoded/decoded in base66.
LNG=i8n.LANGS.indexOf(browsLang);
if (LNG<0)
  LNG=0;
else
  LANG.supported=true;

function I8N(i,t){ // dirty variable generation syntax... t is not a parameter...
  t=i8n[i];
  if (!t)
    return i; // alert("lang.js: unknown message "+i);
  if (t[LNG])
    return t[LNG];
  return t[0] || i; // if t[0] doesn't exist, return the original parameter.
} // Note : I8N can return an array of strings. Or anything else in an array stored in i8n.js !

// Alert with a variable length argument,
// interpret "" as followed by a litteral argument,
// otherwise use an internationalised string :
function Al8N(){
  var i=0,s="",t,a,l=LNG;
  while (typeof(a=arguments[i++])!="undefined"){
    if (a=="")
      s+=arguments[i++];
    else
      s+=I8N(a);
  }
  alert(s)
}

// used by yasmed.js, gen_asm.js, config.js...
function generated(c,tool){
  return "\n"+c+" "+I8N("Generated on")+" "+new Date().toGMTString() +"\n"
             +c+" "+I8N("by")+" "+document.location+"\n"
             +c+"    yasep/"+tool+" "+I8N("version")+" "+VERSION+"\n";
}

// used by menu.js
function setHTML(o,t){
  // o = DOM object to fill
  // t : string or array of strings
  if (typeof t != "string") {
    // suppose it's an array (because the contents is not optional
    if (t.length > 1)
      LANG.change_innerHTML.push([o,t]);
    t=t[LNG] || t[0];
  }
  o.innerHTML=t;
}
