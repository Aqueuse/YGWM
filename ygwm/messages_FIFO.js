/* yasep/gui-js/messages_FIFO.js
   was  yasep/gui-js/yasep_messages.js
    This file is distributed under terms of the Affero GPL v3 license or later, see http://yasep.org
    created Sat Mar 5 23:33:09 EST 2005 by whygee@f-cpu.org

  version Wed Mar  9 18:41:30 EST 2005 : Object-Oriented re-shaping of the code
     in order to clean it up as much as possible.
  version Wed Jun  8 20:38:45 EDT 2005 : adding memory
  2 days later : moving memory to vsp_mem.js and the registers to vsp_reg.js
  version 2005-06-15 : updating the message queue's code and fixed int2hex
  version 2005-06-17 : message queue now looking much better and int2hex is re-fixed
  version 2005-06-19 : colors added to the messages
  version 2006-08-03 : added str2int() [and removed equivalent code from other places]
  version 2006-08-06 : split from VSP/vsp_arch.js
  version 2006-09-02 : moved to vspsim/JScore/
  version 2007-04-08 : new version with a better DOM behaviour,
                       which lets the broswser do the FIFO dance itself.
  version 2007-11-05 : rebranding to YASEP
  version 2009-07-09 : added conditional definition
  version lun. oct. 17 07:12:27 CEST 2011 : closure, new directory
       now it attaches the code to a give div and provides local versions.

only used by #!ASM/ASM these days.
Oh and those closures should go away one day.
*/

function message_FIFO(div, depth){
  div.msg_number=0;
  if (!depth)
    depth=30;
  div.msg_list_depth=depth;
  div.msg_new_div=null;
  div.msg_first_div=null;
  div.msg_last_div=null;

  div.reset_messages=function() {
    // flush the whole div :
    div.innerHTML=""; // au revoir les divs, dites bonjour au ramasse-miettes !
    div.msg_number=0;
  };

  div.add_message=function(col, msg){
    // col : color-coded severity of the message (blue, green, yellow, orange, red ...)
    // msg : displayed text

    div.msg_number++;
    var tmp='<span style="background-color:' + col + '">' + div.msg_number + "</span>: " + msg + "<br>";

    if (div.msg_number==1) { // first message ?
      div.innerHTML=""; // flush any speculative error message.
      div.msg_first_div=dcE("DIV");
      div.msg_first_div.innerHTML=tmp;
      div.appendChild(div.msg_first_div);
      div.msg_last_div=div.msg_first_div;
    }
    else { // next message
      if (div.msg_number < div.msg_list_depth) {
        div.msg_new_div=dcE("DIV");
        div.msg_new_div.innerHTML=tmp;
        div.insertBefore(div.msg_new_div,div.msg_last_div);
        div.msg_last_div=div.msg_new_div;
      }
      else {
        div.msg_new_div=div.msg_first_div;
        div.msg_first_div=div.msg_first_div.previousSibling;
        rC(div.msg_new_div);
        div.msg_new_div.innerHTML=tmp;
        div.insertBefore(div.msg_new_div,div.msg_last_div);
        div.msg_last_div=div.msg_new_div;
      }
    }
  };

  return div.add_message;
}
