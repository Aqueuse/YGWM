/* yasep/gui-js/dragndrop.js
  created sam. mai  5 21:30:27 CEST 2012 by whygee@f-cpu.org
  reuses stuff from the old tools/listed.js created 2009-01-23 by yg@yasep.org
mar. août 28 16:43:53 CEST 2012 : solved a little race condition, changed the dnd structure
Handles the "greedy trash bin" and moving objects around ygwm windows
*/

INIT(dragndrop={
  dragdropstate : 0, // state of the drag&drop operation
  //  0: nothing,
  //  1: move a standard block
  //  2: move an input port
  //  3: move an output port
  //  4: move a graph row
  //  5: move a whole graph
  //  6: move a YASMED line

  destination:null,
  selected:null,
//  item_moved:false,

  happy_messages:true,
  trash_message_delay:null,

  trash_message_erase: function(msg){
    dragndrop.message_id.innerHTML="&nbsp;";
    // hide if d&d is finished, but leave enough time to read the message
    if(dragndrop.dragdropstate==0)
      dragndrop.trash_div_id.style.display="none";
    dragndrop.trash_message_delay=null;
  },

  trash_message: function(msg){
    clearTimeout(dragndrop.trash_message_delay);
    if (dragndrop.happy_messages) {
      var l=LNG, m=i8n[msg];
      if (!m[l])
        l=0;
      m=m[l];
      dragndrop.message_id.innerHTML=m[intrnd(m.length)];
    }
    dragndrop.trash_message_delay=setTimeout(dragndrop.trash_message_erase,3000);    
  },

////////////////////////////////////////////////////
// Trash image animation
/*trash_image_id:null,
  trash_div_id:null,  created by start_move
  trash_frame_id:null, */
  trash_open:false,

//  trash_open_conditions:new Array,

  trash_mouseover:function() {
    if (dragndrop.dragdropstate > 0){ // drag&drop ?
      dragndrop.trash_message("ready");
      // open the trash bin
      dragndrop.trash_image_id.style.right="48px";
      dragndrop.trash_open=true;
    }
    return true;
  },

  trash_mouseout:function(n) { // called by end_move too
    if (dragndrop.dragdropstate) {
      if (typeof n!="string")
        n="sad";
      dragndrop.trash_message(n);
    }
    if (dragndrop.trash_open) {
      dragndrop.trash_image_id.style.right="0px";
      dragndrop.trash_open=false;
    }
    return false;
  },

/////////////////////////////////////////////////

  start_move: function(ev){
  // anti-window-manager-hickup :
    if (document.onmouseup)
      document.onmouseup(ev);

    // display the trash bin only if clicking on certain elements :
    if (this.dnd.trashBin==true) {
      // load the trash bin image (on demand)
      if (!dragndrop.trash_div_id) {
        var tr =(dragndrop.transport_div =dcE("DIV")),
            div=(dragndrop.trash_div_id  =dcE("DIV")),
            fr =(dragndrop.trash_frame_id=dcE("DIV")),
            msg=(dragndrop.message_id    =dcE("DIV")),
            img=(dragndrop.trash_image_id=dcE("IMG"));
        div.id="trash_div";
         fr.id="trash_frame";
        img.id="trash_image";
        msg.id="trash_msg";

        // configure and install the trash image callbacks
         tr.style.zIndex=
        div.style.zIndex=ygwm.noScrollIndex;
        img.onmouseover=dragndrop.trash_mouseover;
        img.onmouseout= dragndrop.trash_mouseout;

          img.src="img/trash.png";
          fr.appendChild(img);
        div.appendChild(fr);

        div.appendChild(msg);

        document.body.appendChild(div);
  
          tr.id="transport";
        document.body.appendChild(tr);
      }
      dragndrop.trash_message("happy");
      dragndrop.trash_div_id.style.top=(5+menu.mainMenu_id.scrollHeight)+"px";
      dragndrop.trash_div_id.style.display="block";
    } // end of trash bin display

    /////// ok here it gets serious
    ygwm.moved_div
     =dragndrop.moved_item
     =this.dndroot;
    dragndrop.selected=this;
    dragndrop.dragdropstate = this.dnd.state;
    document.onmouseup=dragndrop.end_move;
    document.onmousemove=ygwm.autoScroll;
    document.body.style.cursor='move';
    if (typeof this.dnd.ondrag=="function")
      this.dnd.ondrag(this.dndroot);    // get the clicked item's root id (the one that will be moved around)
    return false;
  },

  end_move: function(){
    var m=dragndrop.selected,
        n="sad";
    if (dragndrop.trash_open) {
      m.dnd.ondelete(m.dndroot);
      n="repu";
    }
    else
      if (typeof m.dnd.ondrop=="function")
        m.dnd.ondrop();

//  done in the callback of trash_message() :
//    dragndrop.trash_div_id.style.display="none";
    if (dragndrop.trash_div_id // check that the trash is created AND shown (could be prevented by trashBin=false)
         && dragndrop.trash_div_id.style.display=="block")
      dragndrop.trash_mouseout(n);

// Cleanup :
    dragndrop.dragdropstate = 0;
    document.body.style.cursor='auto'; // doesn't work well ?
    document.onmouseup
     =document.onmousemove
     =ygwm.moved_div
     =dragndrop.moved_item
     =dragndrop.destination
     =null;
    return false;
  },

  // register an item that will be moved
  register: function(div, args, root){
    div.onmousedown=dragndrop.start_move;
    if (typeof args.state != "number")
      Al8n("crsn");
    if (args.trashBin===true && typeof args.ondelete != "function")
      Al8n("rtno","",div.className);
    if (typeof root == "undefined")
      root=div;
    div.dnd=args;
    div.dndroot=root;
  },

  INIT_func: function(){
// TODO init dragndrop.happy_messages with cookies
  }
});
