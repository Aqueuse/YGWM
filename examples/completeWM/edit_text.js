/* gui-js/edit_text.js
  This file is distributed under terms of the Affero GPL v3 license or later, see http://yasep.org
created mar. févr. 14 09:57:00 CET 2012
version mar. févr. 14 14:08:14 CET 2012
version mar. oct.  9 06:36:39 CEST 2012 => standard number text input, added edit_text.valid to prevent save is check fails

Edit the textContent/innerHTML of a DOM element that registered to this service.
 then put the typed string in the .source of the element

TODO: apply the filters etc. to normal input.text tags
*/

num_array="0123456789aAbBcCdDeEfFhH"; // Valid characters for dec,bin and hex numbers
alpha_array=num_array+"_gijklmnopqrstuvwxyzGIJKLMNOPQRSTUVWXYZ";
alpha_chars=[];
for (var i in alpha_array)
  alpha_chars[alpha_array[i]]=1;

edit_text={
  div:null,
//  valid:true, // set by start()
  old_mousehandler:null,
  current_elem: null,
  current_text: null,
  rx_num:new RegExp("[^"+num_array+"]","ig"),
  rx_alpha:new RegExp("[^"+alpha_array+"]","ig"),

  filter_alpha: function(t){
    if (t.value)  // TODO : recode
      t.value=t.value.replace(edit_text.rx_alpha,"");
    else
      t.value=edit_text.current_elem.edit.defaultValue;
  },

  filter_number: function(t){
    if (t.value)  // TODO : recode
      t.value=t.value.replace(edit_text.rx_num,"");
    else
      t.value="0";
  },

  register: function(e, o) {
    if ((typeof e=="object") && (typeof e.edit=="undefined")){
/* format :
    {
      size:,
      maxsize:,
      defaultValue:,
      bg:, (add a background : true or absent)
      check:,
      func:  // callback function
    }
*/
      if (typeof o!="object")
        o={};
      if (typeof o.size!="number")
        o.size=30;
      if (typeof o.defaultValue=="undefined")
        o.defaultValue="_empty_";
      if (typeof o.maxsize !="number")
        o.maxsize=500;
      if (o.bg===true) // change the background style of the element
                       // to make it look a bit more like an "input" field
        e.className="editTextField";

      if (e.nodeName=="INPUT"){
        e.onkeyup=o.func;
        e.size=o.size;
        e.source
         =e.value
         =o.defaultValue;
        e.maxLength=o.maxsize;
      } else {
        e.edit=o;
        e.style.cursor="pointer";
        e.onclick=edit_text.start;
      }
    }
  },

  check:function(e){
    switch('which' in e ? e.which : e.keyCode){
      case 13: edit_text.stop(true);  break; // Enter
      case 27: edit_text.stop(false); break; // Esc
      default:  // check
        var c=edit_text.current_elem.edit;
        if(typeof c.check=="function") {
          c.check(this);
          this.style.backgroundColor=edit_text.valid?"":"#F65";
        }
    }
  },
/*
  hookup: function()  {

  },

  start_input:function(e) {
    if(edit_text.current_elem!=this){
    }
    return false;
  }
*/
  start: function(e) {
    if(edit_text.current_elem!=this){
      if(edit_text.current_elem)
        edit_text.stop(true);
      if (!edit_text.div)
        edit_text.init(); // ensure the DIV exists
      edit_text.valid=true; // useless since the t.focus(); trick, but always write back a value and necessary for the old clients
      e=e||window.event;
      e.stopPropagation();
      var d=edit_text.div, // the div
          t=d.firstChild,  // the text
          b=document.body || document.documentElement;

      d.style.display="block"; // make the div visible near the mouse pointer
      d.style.left=((e.pageX || e.clientX + b.scrollLeft)+10)+"px";
      d.style.top =((e.pageY || e.clientY + b.scrollTop )+10)+"px";

      o=this.edit;
      t.size=o.size; // resize the text input
      t.maxLength=o.maxsize; // Limit the number of characters
      if(typeof this.source!="string")
        this.source=this.textContent; //innerHTML.replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
      t.value=this.source;

      t.style.backgroundColor=""; // reset, just in case it was left in red
      edit_text.current_elem=this;
      t.focus();
      t.onkeyup=edit_text.check;
      t.onkeyup(e); // run a first test
      edit_text.old_mousehandler=document.onmousedown;
      document.onmousedown=function(e){
        e=e||window.event;
        var t= e.target || e.srcElement;
        if (t.id!="edit_source")
          edit_text.stop(true);
      }
    }
    return false;
  },

  stop: function(save) {
    var l=edit_text.current_elem;
    if (l && l.nodeName!="INPUT"){
      var d=edit_text.div,
        v=d.firstChild.value;
      d.style.display="none"; // hide the div
      // restore the old handler
      document.onmousedown=edit_text.old_mousehandler;

      if(save && edit_text.valid) {
        // update the element
        l.source= //v;
//        if(v)
//          v=v.replace(/[<]/g,"&lt;").replace(/[&]/g,"&amp;");
        l.textContent=v; //innerHTML=v;

        // finally call eventual user functions
        if (typeof l.edit.func == "function")
          l.edit.func(l);
      }
     }
    edit_text.current_elem=null;
  },

  init: function(){
    // initialise the floating input and hide it
    var d=dcE("DIV"),
        t=dcE("input"),
        s=d.style;
    s.position="absolute";
    s.background="none";

    t.type="text";
    t.id="edit_source";
    dontMess(t);
    d.appendChild(t);
    document.body.appendChild(d);
    if (window.ygwm)
      d.style.zIndex=ygwm.noScrollIndex;
    edit_text.div=d;
  }
};
