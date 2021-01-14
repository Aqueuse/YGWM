/*
 ygwm/doc/autoexec.js
 created by whygee@f-cpu.org 20140221
*/

myEval=eval; // executes in the global scope to avoid messing with start()'s variables

function start() {
  var p, i, c, d, e, a=document.getElementsByTagName('pre');
  for (i=0; i<a.length; i++) {
    c=a[i];
    if (c.className=="example") {
      p=c.parentNode;

      // label
      (d=dcE("P")).innerHTML="<u>Example:</u>";
      p.insertBefore(d,c);

      (d=dcE("PRE")).className="result";
      p.insertBefore(d,c.nextSibling);

      (e=dcE("P")).innerHTML="<u>Result:</u>";
      p.insertBefore(e,d);

      // output
      d.textContent=myEval(c.textContent || c.innerText);
    }
  }
}
