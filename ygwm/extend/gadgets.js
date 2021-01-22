/* gui-js/gadgets.js
   created ven. nov.  9 13:21:05 CET 2012 by whygee@f-cpu.org

  these are misc. stuff used for fancy displays of things.
*/

// append a button to d, with name n and function f (and optional title t and margin m).
function button(d,n,f,t,m){
    var c=dcE("BUTTON");
    c.innerHTML=I8N(n);
    if(t)
      c.title=I8N(t);
    c.onclick=f;
    if (m)
      c.style.marginRight=m; //"1em";
  d.appendChild(c);
  return c;
}

// Create a nice separator
function h3(c,d,n,u,k){
  // c: cont (window)
  // d: the contents div
  // n: name
  // u: id of a div to resize (optional)
  // k: optinal default height of u
  var f,g;
    (f=dcE("DIV")).className="simTitle";
      g=dcE("SPAN");
      g.innerHTML='<span>\u25BD</span>&nbsp;'+I8N(n);
      g.style.cursor="pointer";
      g.onclick=showhideNext;
      g.title=I8N("ctsh");
    f.appendChild(g);
  c.appendChild(f);
  d.style.clear="both";
  d.style.position="relative";
  c.appendChild(d); // YES, d must be created BEFORE calling h3 and the code looks reversed
  if (u)
    adjustHeight(u,k);
}

// A callback that shows/hides the next element.
function showhideNext() {
  var a=this.firstChild,
      b=toggle(this.parentNode.nextSibling);
  if (a.nodeName=="SPAN")
      a.innerHTML=(b=="block")?"\u25BD":"\u25B7";
}
