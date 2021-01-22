/* gui-js/lang_switcher.js
created ven. mai  2 06:47:08 CEST 2014

Add the language selector to the menu 
 //and manage the #!lang key
*/

INIT(lang_switcher={

  INIT_func: function(){
    // To be called just afer menu.INIT_func and AFTER init_cookies() !
    // Create the language picker menu
    var i, j=menu.mainMenuItem(["LNG"],"R",i8n.SelLn);

    for (i in i8n.LANGS)  // /!\ i is a string !
      menu.subMenuItem(j,
        [ LANG.FLAGS[i]='<div class="flag_'+i8n.LANGS[i]+'"></div>' ], // Initialises the array
        function(i){
          return function(){
            LANG.change_lang(i) // looks weird but it is a function that
          } // creates another function then calls it for getting a function with closure...
        }(i),
         0, // not a separator 
        i8n.LANGUAGES[i]
      ); // got it ? :-P

    LANG.change_innerHTML.push([j.firstChild, LANG.FLAGS]);
  //    LANG.change_title.push([j,i8n.SelLn]);
    // set to the current language logo 
 //    LANG.change_lang(LNG); // done later in cookies.init
  }

});
