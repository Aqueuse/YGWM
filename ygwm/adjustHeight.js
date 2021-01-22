/* gui-js/adjustHeight.js
created sam. oct. 13 06:14:28 CEST 2012 by whygee@f-cpu.org
version dim. oct.  5 16:02:53 CEST 2014 : " return n;"

function: drag&drop the vertical size of a div
*/

// Called after insertion of d in the DOM so d.scrollHeight is set
function adjustHeight(d, height){
    var g=dcE("DIV"),
        n=dcE("DIV");
    n.style.position="relative";  // makes g's position relative to n
    n.style.height=(height||d.scrollHeight)+"px";
  d.parentNode.insertBefore(n,d);
       d.style.height="100%"; // make it fill our new frame
       d.style.overflow="auto"; // but enable the scrollbar
    n.appendChild(d); // "If the node already exists it is removed from current parent node, then added to new parent node."
// create the little floating div :
      g.className="adjHeight";
      g.innerHTML="\u21F3";
      g.title="click to resize";
      g.onmousedown=adjustHeight_click;
    n.appendChild(g);
  return n;
}

function adjustHeight_click(e){
  e.stopPropagation();
  var oldonmouseup =document.onmouseup,
      oldonmousmove=document.onmousemove,
      aH_div=this.parentNode,
      aH_Y=aH_div.scrollHeight - mousePos(e).y;

  document.onmousemove=function(e){ // closure ;-)
    e.stopPropagation();
    var h=mousePos(e).y+aH_Y;
    if (h<30) {
      h=30;
    }
    aH_div.style.height=h+"px";
    return false;
  };

  document.onmouseup=function(){ // closure ;-)
    document.onmouseup=oldonmouseup;
    document.onmousemove=oldonmousmove;
  };
  return false;
}
