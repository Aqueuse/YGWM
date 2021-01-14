/*
  ygwm/init.js (formerly body_first.js)
  This file is distributed under terms of the Affero GPL v3
    license or later, see http://yasep.org or http://yasep.org
  created dim. nov.  6 18:42:17 CET 2011 by whygee@f-cpu.org
  version 20140223 : renamed init_obj to INIT_list, renamed and moved the file

  Creates the data and function to handle the modules
*/

INIT_list=[]; // cookies, menu, winlist, test_asm, OpcodeTable, asmwin, DOC_GEN, DEF_ASM, template...

function INIT(o){
  INIT_list.push(o); // add the new module to the list
}