/* ygwm/application.js
This file is distributed under terms of the Affero GPL v3 license
  or later, see http://yasep.org or http://ygwm.org
created 20140222 by whygee@f-cpu.org from lang.js

This contains application-dependent data and functions,
  changes the behaviour of the site.
Depends on i8n.js / lang.js
*/

mainTitlePrefix="yasep.org: ";
mainTitle="";

function changeMainWinTitle(m) {
  document.title=mainTitlePrefix+
     (mainTitle=m); // save for later, if we change the prefix
}

window.onerror=function(msg, url, l){
  alert(I8N("Ierr1")+msg
       +I8N("Ierr2")+l
       +I8N("Ierr3"));
  return false
}

/*
window.onbeforeunload=function(){
  if (somethingtosave)
    return confirm("You're about to leave,\nare you sure you want\nto discard unsaved works ?");
}

blackList("info");
// shut up the debug messages if firebug is not running
try{
  console.info("starting.")
}
catch(e) {
  console={info: function(){}}
}
*/
