/* yasep/gui-js/messages_FIFO.js
   was  yasep/gui-js/yasep_messages.js
    This file is distributed under terms of the Affero GPL v3 license or later, see http://yasep.org
    created Sat Mar 5 23:33:09 EST 2005 by whygee@f-cpu.org
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
        div.msg_new_div.parentNode.removeChild(div.msg_new_div);
        div.msg_new_div.innerHTML=tmp;
        div.insertBefore(div.msg_new_div,div.msg_last_div);
        div.msg_last_div=div.msg_new_div;
      }
    }
  };

  return div.add_message;
}
