/*
JSgui/ygwm-options.js
This file is distributed under terms of the Affero GPL v3 license or later, see http://yasep.org
created jeu. sept.  8 06:53:52 CEST 2011 by whygee@f-cpu.org
version mer. nov.  9 22:46:59 CET 2011
version mar. sept.  4 00:38:03 CEST 2012 : moved changeWinTitle to ygwm.js
               moved changeTheme to YGCSS

Adds options to a ygwm window
*/

ygwm.menuClick= function(){
  var w=parentWin(this),
   h, a=w.menuButtonInside.style;

  // hide the contents, create and display the menu
  if (a.display=="none") {
    a.display=""; // show the inner dot so the button appears as a circle

    w.old_contents=w.contents_id.firstChild; // save and hide the contents
    w.old_contents.parentNode.removeChild(w.old_contents);
    
    // instead, display the menu and options
    newmenu=dcE("DIV");
    w.contents_id.appendChild(newmenu);
    var h='<h2>'+I8N("Options")+'</h2>'
      +'<p>'+I8N("wintl")
      +'<input type="text" size="30" maxlength="250" name="wintitle" onchange="ycWT(this)" value="'+w.winTitle+'"></p>';

    if (YGCSS) {
      h+=I8N("themes")+"<div>";
      for (var i in YGCSS.ColorStyles) {
        h+='<div class="'+i+'" style="position:static;float:left;cursor:pointer;margin:2px;"'
         + ' onclick="ycT(this,\''+i+'\')"><div class="ygwm_header">';
        // make the current style bold :
        if (w.className==i)
          h+="<b>"+i+"</b>";
        else
          h+=i;
        h+="</div></div>";
      }

      h+='</div><div style="clear:both">'+I8N("hint");
    } // YGCSS

    newmenu.innerHTML=h; // +"</p>";
  }
  // save the options, remove the menu and restore the original contents
  else {
    a.display="none"; // hide the dot => filled circle

    w.contents_id.firstChild.parentNode.removeChild(w.contents_id.firstChild);

    w.contents_id.appendChild(w.old_contents);
    w.old_contents=null;
  }
};

