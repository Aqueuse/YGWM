WARN = "<b>\u26A0</b>&nbsp;";
bul = '<p>&#8226; ';
i8n = {
    LANGS: ["en", "fr", "es", "de"],
    LANGUAGES: ["English", "Français", "Español", "Deutsch"],
    sr: ["Special Register", "Registre Spécial", "Registro Especial", "Spezialregister"],
    srs: ["Special Registers", "Registre Spéciaux", "Registros Especiales", "Spezialregister"],
    "Generated on": [, "Généré le", "Generado en", "Hergestellt am"],
    by: [, "par", "por", "von"],
    version: [, , "versión", "Version"],
    Ierr1: ["Internal error\nmessage: ", "Erreur interne\nmessage: ", "Error interno\nmensaje: ", "Interner Fehler\nMeldung: "],
    Ierr2: ["\nLine Number: ", "\nLigne n°", "\nLinea numero", "\nZeilennummer: "],
    Ierr3: ["\nYou are hereby kindly advised to\n" + "report this message and its circumstances\n" + "* on the online chat (\"Web\" tab) or\n" + "* by email to whygee@f-cpu.org\n" + "Thanks !", "\nVous êtes cordialement invité à\n" + "reporter ce message et ses circonstances\n" + "* sur le \"chat\" (dans le menu \"Web\") ou" + "\n* par email à whygee@f-cpu.org\n" + "Merci !", "\nEstas cordialmente invitado a" + "\nme reportar este mensaje y las" + "\nrazones correspondientes\n" + "whygee@f-cpu.org\nGracias !", "\nDu bist herzlich eingeladen diese\n" + "Meldung und die Umstände ihrer Entstehung\n" + "* über \"Chat\" (im Menü \"Web\") oder per\n" + "* E-Mail an whygee@f-cpu.org zu melden\n" + "Danke !"],
    idt1: ["The server returned the status ", "Le serveur a renvoyé le statut ", "El servidor web ha enviado el estátuto ", "Der Server antwortet mit Status "],
    idt2: ["\nwhen trying to get ", "\nlors du chargement du fichier ", "\nmientras que ha tratado de cargarlo ", "\nbeim Versuch zu laden von "],
    nf: [" not found", " introuvable", " no se encuentra", " nicht erreichbar"],
    SFtitle: ["Save to a file", "Sauver sous"],
    SFfn: ["Name of the file to save:", "Nom du fichier à sauver :"],
    SFbs: ["Save", "Sauver"],
    SFLA: ["Loopback address : ", "Adresse du loopback :"],
    SFs: ["Server", "Serveur"],
    SFd: ["Data", "Données"],
    FFor: ["FF.releaseSemaphore :\nsemaphore over-release ????", "FF.releaseSemaphore :\n sémaphore déjà libéré", , "FF.releaseSemaphore :\n mehrfache Freigabe"],
    nls: ["No loopback server was found so the fallback method is used.\n" + "This method will be used from now on, until you select the loopback method again.\n" + "Please press CTRL+S to save the contents of the window that will appear.\n" + "*BEWARE* Save under a different file name and with the proper type  !", "Le serveur de loopback n'a pas été détecté donc la méthode de secours est choisie.\n" + "Vous pouvez sauver (avec CTRL+S) le contenu de la fenêtre qui va apparaître.\n" + "*ATTENTION* Sauvez ces données sous un nom différent et avec le bon type."],
    Pts: ["Probing the server...", "Recherche du serveur...", "Busqueda del servidor...", "Kontaktversuch zum Server..."],
    iur: [" is unreachable", " est injoignable", " no se encuentra", " nicht erreichbar"],
    Foip: ["File operation in progress,\nplease try again later.", "Opération de fichier en cours,\nveuillez réessayer plus tard.", "Tratamiento del archivo,\npor favor intente más tarde", "Dateizugriff nicht abgeschlossen,\nbitte später wiederholen."],
    prot: ["notice : Loopback can only work with http:// addresses", "attention : le loopback ne fonctionne qu'avec les adresses de type http://", "Cuidado, el loopback puede functionar solamente con el protocolo http://", "Hinweis: Loopback funktioniert nur mit http:// Adressen"],
    Clf: ["Can't load the file ", "Impossible de charger le fichier ", "Imposible de cargar el archivo", "Datei kann nicht lesen werden: "],
    R: ["Error: ", "Erreur : ", "Error : ", "Fehler : "],
    W: ["Warning: ", "Attention : ", "¡Atención : ", "Warnung : "],
    wiffi: ["wrong input format for int2hex", "mauvais format pour int2hex", "mal teclado de entrada para int2hex", "falsches Format für int2hex"],
    numforH: ["wrong hexadecimal number format", "mauvais format de nombre hexadécimal", "mal teclado de números hexadecimales", "falsches hexadezimal Zahlenformat"],
    numforB: ["wrong binary number format", "mauvais format de nombre binaire", "mal teclado de números binarios", "falsches Binärzahlenformat"],
    numforD: ["wrong decimal number format", "mauvais format de nombre décimal", "mal teclado de números decimales", "falsches Dezimalzahlenformat"],
    oob1: ["number out of bound (only the lower ", "nombre hors bornes (seuls les dernier ", "números fuera de rango (solamente las ultimas ", "Zahl ausserhalb des Bereichs (nur die niedrige "],
    oob2: [" bits are kept)", " bits sont gardés", " bits quedan mantenidas", " Bits gemerkt"],
    restore: [, "taille originale", "talla original", "ehemalige Größe"],
    maximize: [, "agrandir", "agrandar", "vergrößern"],
    Options: [, , "Opciones", "Optionen"],
    minimize: [, "réduire", "reducir", "reduzieren"],
    close: [, "fermer", "cerrar", "schließen"],
    "styleSheets are missing": ["no StyleSheets ? Are you using an old MSIE ?", "Pas de feuilles de styles ? Vous êtes sous un vieux MSIE ?"],
    wintl: ["Window title: ", "Titre de la fenêtre : ", "Título de la ventana : ", "Fenster Titel : "],
    themes: ["Predefined color themes:", "Couleurs prédéfinies", "Colores predefinidos", "Vordefinierte Farben :"],
    hint: ["<b>Hint:</b> you can group windows by giving them the same colors, " + "and hide/show the group with a double click on the color on the window list.", "<b>Astuce :</b> vous pouvez grouper des fenêtres en leur donnant les mêmes couleurs," + " et vous pouvez cacher/afficher ce groupe en double-cliquant sur cette couleur dans la liste des fenêtres.", "Un consejo : Puedes agrupar ventanas, dándoles el mismo color," + "de esta manera, puedes occultar o mostrar todo el grupo de ventanas haciendo doble clic sobre el color que se encuetra en la lista de ventanas", "Hinweis: gruppieren von Fenstern über gleiche Farben, " + " anwählen/verstecken der Gruppe mit Doppelklick aud die Farbe in der Fensterliste."],
    winlst: ["Windows list", "Liste des fenêtres", "Lista de ventanas", "Fensterliste"],
    WLerr1: ["winlist already running", "winlist est déjà lancé", "winlist ha sido iniciado", "winlist schon aktiv"],
    WLerr2: ["ygwm not working", "ygwm est absent ?", "¿ygwm está ausente ?", "Kein ygwm ?"],
    LstEd: ["Edit this listing", "Éditer ce listing", "modificar este programa", "Programm bearbeiten"],
    WrnKey: ["this key is not (yet) created :-/", "Cette clé n'existe pas (encore) :-/", "esta clave no existe (todavía)", "Diese Schlüssel existiert nicht :-/"],
    SelLn: ["Language", "Langue", "Idioma", "Sprache"],
    Tools: ["Tools", "Outils", "Instrumentos", "Werkzeuge"],
    vug: ["Various useful gadgets", "Quelques gadgets utiles", , "Hilfreiches Zubehör"],
    asm: ["Assembly language", "Langage assembleur", "Lenguaje ensamblador", "Assemblersprache"],
    "not found": [, "introuvable", " no se encuentra", "nicht gefunden"],
    web: ["External resources", "Ressources externes", "Enlaces externos", "Externe Ressourcen"],
    arc: ["Archives", , "Versiones antiguas", "Archive"],
    Doc: ["Doc"],
    Doct: ["Documentation", , "Documentación", "Dokumentation"],
    Dev: ["Dev", , "Sitio", "Entwicklung"],
    dvpt: ["Developer's corner", "Développement du site", "Desarrollo del sitio", "Entwicklung dieser Seite"],
    win: ["Windows", "Fenêtres", "Ventanas", "Fenster"],
    welc: ["Welcome&nbsp;!", "Bienvenue&nbsp;!", "Bienvenido", "Willkommen&nbsp;!"],
    Ocultar: ["Hide&nbsp;all", "Cacher&nbsp;tout", "Ocultar&nbsp;todo", "Alles&nbsp;verstecken"],
    Mostrar: ["Show&nbsp;all", "Montrer&nbsp;tout", "Mostrar&nbsp;todo", "Alles&nbsp;anzeigen"],
    Arco: ["Rainbow!", "Arc&nbsp;en&nbsp;ciel!", "Arco&nbsp;iris!", "Regenbogen&nbsp;!"],
    All: ["All&nbsp;windows", "Ouvrir&nbsp;tout!", "Iniciar todas las ventanas", "Alles öffnen&nbsp;!"],
    Rem: ["Close all", "Fermer tout", "Cerrar todo", "Alles schließen"],
    Lic: ["License", "Licence", "Licencia", "Lizenz"],
    Cont: ["Contact", , "Contacto", "Kontakt"],
    Dnl: ["Download", "Télécharger", "Descargar el&nbsp;sitio", ],
    demo: ["Video&nbsp;demo", "Démo&nbsp;vidéo", "Demo&nbsp;video", "Demovideo"],
    ygwmd: ["YGWM&nbsp;demo", "Démo&nbsp;YGWM", "Demo&nbsp;YGWM", ],
    Exasm: ["<hr><i>Examples:</i>", "<hr><i>Exemples:</i>", "<hr><i>Ejemplos:</i>", "<hr><i>Beispiele:</i>"],
    tuto: ["Tutorials", "Tutoriels", "Tutoriales", "Anleitung"],
    crsn: ["can't register a state that is not a number", "un état doit être un nombre", , "ein Zustand muss eine Zahl sein"],
    rtno: ["registration of a trashBin\nrequires ondelete()\nclassName=", "propriété ondelete manquante pour className=", , "trashBin : ondelete() fehlt bei className="],
    happy: [
        ["hi! I was fading away...", "ah, at last.", "time to eat :-)", "cool, my turn!", "ooh, fill that void.", "hmmm hungry...", "yay! food!", "I'm starving", "thanks for thinking about me!", "feed me!", "i can has block"],
        ["salut&nbsp;!", "coucou :-D", "ah, j'ai faim.", "bon, à table&nbsp;!", "je peux&nbsp;?", "justement, j'ai une petite faim.", "On m'appelle&nbsp;?", "c'est pour moi&nbsp;?", "hep&nbsp;! par là&nbsp;!", "il reste de la place ici", "petit petit", "viens par là toi...", "oooooh ça a l'air appétissant&nbsp;!", "i can has block", "poubelle, à votre service."],
        ["Hola !", "Tengo hambre...", "dispuesto!", "Estoy listo :-)", "ven, ven", "i can has block"],
        ["Moin, Moin!", "endlich!", "Mahlzeit!", "Cool, jetzt ich!", "Oh, darf ich?", "Ich bin da...", "mein Magen knurrt", "endlich was zu essen!", "Ich kann nicht mehr!", "i can has block"]
    ],
    ready: [
        ["alright", "there, I'm ready", "what are you waiting for?", "yay! do it!", "drop it, drop it!", "ok, now depress that mouse button", "almost there...", "it's mine! miiine! hahaha!", "now, you can't escape me...", "Come to my side...", "now you belong to me."],
        ["aaaah", "vas-y", "on y est presque", "bon, tu attends quoi?", "chouette&nbsp;?!", "allez, donne", "un bloc pour papa...", "bon, maintenant tu relâches ce bouton.", "Il est à moi maintenant !", "il ne peut plus m'échapper...", "presque, presque..."],
        ["casi...", "dámelo!", "¡es mío!"],
        ["Mach schon!", "auf was wartest Du?", "geht's bald?", "hop, hop, hop", "oiner geht noch!", "Ich hab Dich!"]
    ],
    sad: [
        ["nothing for me ?", "are you sure ?", "please!", "ohhh...", "hey come back here", "I feel empty...", "why you starve me?", "maybe next time?", "hey i'm hungry!", "bye :-(", "so sad..."],
        ["hé&nbsp;! reviens là&nbsp;!", "mais j'ai faim :-(", "pourquoi tu t'en vas&nbsp;?", "je suis au régime, c'est ça&nbsp;?", "bon, à la prochaine fois...", "radin.", "bon ben ciao", "c'était pourtant bien parti :-(", "ben alors&nbsp;?", "allez quoi", "zyva genre", "ne m'oublie pas..."],
        ["hey! regresa !", "¡por favor", "oh :-(", "adiós", "¡Vuelve pronto!", "No me olvides..."],
        ["Ach bitte!", "He, nicht weglaufen!", "Tschö mit ö", "Balla balla?", "Kannitverstaan", "He ! Zurück !", "Huh ? Warum ?", "Oh, leider..."]
    ],
    repu: [
        ["ahhh goood...", "yum yum!", "moaaarh...", "sweet!", "delicious ;-)", "thanks :-)", "*blurps*", "*crunch*", "yay! again!", "*brooops*", "thxbai!", "omnomnomnom"],
        ["ahhh ça fait du bien&nbsp;!", "miam, miam&nbsp;!", "il était temps", "on r'met ça&nbsp;?", "*blurps*", "hmm j'adore", "encore&nbsp;!", "j'en reprendrais bien un petit...", "c'est bon :-)", "délicieux&nbsp;!", "omnomnomnom", "*scrountch*"],
        ["yumyum!", "otra vez!", "omnomnomnom", "delicioso!", "Gracias!", "¡Hasta la vista!"],
        ["Hmmmmh", "Bitte nochmal", "Rülps", "Woah, ist das gut", "jetzt ein Nickerchen..."]
    ],
    asmr: ["Assembler", "Assembleur", "Ensamblador", ],
    yara: ["Re-assemble", "Ré-assemble", "Ensamblar de nuevo"],
    yaea: ["Export .yas", "Exporte .yas", "Exportar .yas"],
    yahy: ["Export .hyx", "Exporte .hyx", "Exportar .hyx"],
    yavh: ["Export .vhdl", "Exporte .vhdl", "Exportar .vhdl"],
    yafl: ["Flash .HYX"],
    aja: ["Connect to...", "Connecter à...", "Conectar a..."],
    adrd: ["Start address: ", "Adresse début : ", "Dirección base : "],
    adrs: ["Size (bytes): ", "Taille (octets) : ", "Longitud (bytes): "],
    adrf: ["Last byte: ", "Dernier octet : ", "Ultimo byte"],
    sbst: ["Substitutions", , "Sustitución"],
    sz: ["size", "taille", "tamaño"],
    val: ["Value", "Valeur", "Valor", "Wert"],
    src: ["Source", , "Fuente", "Quelle"],
    msg: ["Messages", , "Mensaje"],
    yalt1: ["Can't export if the code contains error(s)", "Export impossible si le code contient des erreurs", "Exportación imposible si el código contiene errores"],
    yalt2: [".org is not supported", ".org n'est pas supporté", ".org no es compatible actualmente"],
    even: ["The number of bytes must be even", "La taille du code doit être paire", "Longitud del código debe ser par"],
    nwol: ["; Nothing written above this line will be saved.\n", "; Les lignes précédentes ne seront pas sauvées.\n", "; Las líneas anteriores no seran conservadas.\n"],
    sztm: ["Too many instructions, memory too small", "Trop d'instructions, espace mémoire trop petit", "Demasiadas instrucciones, espacio de memoria demasiado pequeño"],
    inaa: [": instruction is not aligned on an even address", ": l'instruction n'est pas alignée sur une adresse paire", ": la instrucción no esta alineada en un una dirección par"],
    ui: ["unaligned instructions", "instructions non alignées", "instrucciónes no alineada"],
    o1oa: ["only one .org allowed", "une seule directive .org est permise", "solo una directiva es permitida"],
    iod: ["invalid .org directive", "directive .org invalide", "directiva .org no válida"],
    aanl: ["add (click), delete (ctrl+click)\nor duplicate (shift+click) a line", "ajouter (click), effacer (ctrl+click)\nou dupliquer (shift+click) une ligne"],
    mudt: ["move up/down or to trash", "déplacer en haut/bas\nou vers la corbeille"],
    wdf: ["wrong directive format", "format de directive incorrect"],
    np2: [" is not a power of 2", " n'est pas une puissance de 2"],
    ns30: ["please keep names shorter than 30 characters", "les noms doivent faire moins de 30 caractères"],
    nac: ["contains a non-alpha character", "contient un caractère non alphanumérique"],
    wnf: ["wrong number format", "format de nombre incorrect"],
    wtf: ["are you serious ???", "sérieux ??"],
    Bpn: ["Bad profile name ?", "mauvais nom de profil ?"],
    oma: ["OK, generating the opcode map automatically", "OK, génération automatique de la table d'opcodes"],
    pdne: ["This profile does not exist", "Ce profil n'existe pas"],
    Bln: ["Bad label name?", "Mauvais nom de label ?"],
    svkod: ["same value, keeping the old definition", "valeur identique, ancienne définition conservée."],
    Mws: ["Missing word to substitute", "Mot à substituer manquant"],
    whtw: [WARN + "are you sure you really want to hide <i>this</i> word ?", WARN + "êtes-vous sûr de vouloir cacher ce mot ?"],
    idtt: ["Skipping redefinition of a word by itself", "redéfinition d'un mot par lui-même : ignorée"],
    sbkw: [WARN + "Beware of substituting a keyword", WARN + "Attention : substitution d'un mot-clé"],
    ukd: ["<b>unknown directive</b>", "directive inconnue"],
    ne: ["New&nbsp;editor", "Nouvel&nbsp;éditeur"],
    tcw: ["Test completed with ", "Test achevé avec "],
    rs: [" errors", " erreurs"],
    Ts: ["OK : Test passed", "OK : test réussi"],
    rng: ["running...", "test en cours..."],
    ats: ["Autotests"],
    wrf: ["<pre>sites list failed to load\nCheck your adblocker or the URL.", "<pre>échec de chargement de la liste des sites.\nVérifiez votre bloqueur de pubs ou les URL."],
    wr: ['<h2>Homebuilt CPUs WebRing</h2>' + '<center><button onclick="previous()">Previous</button>' + '<button onclick="next()"    >Next</button>' + '<button onclick="random()"  >Random</button><br>&nbsp;</center><b>Join the ring?</b>' + '<div>The <i>Homebuilt CPUs WebRing</i> is maintained by David Brooks and dedicated to machines that' + '<br>1. use a home-built CPU, not a bought one, and' + '<br>2. have actually been built in hardware, not just simulated, etc.<p>If you wish to join the ring,' + ' use your browser to view <a href="http://members.iinet.net.au/~daveb/simplex/simplex.html#more">his page</a>\'s ' + ' source, scroll to the bottom of the page, copy the code fragment between the "Start" and "End of WebRing" comments, and paste this code into' + ' your page. Once you\'ve done this, <a href="mailto:daveb@iinet.net.au"><b>Email David</b></a> mentioning your page\'s URL and he\'ll' + ' check it out and add it to the ring.</div><br><u>List of other sites in the ring :</u><pre>'],
    bc: ["Online&nbsp;chat", "Discussions"],
    lg: ["loading...", "chargement..."],
    def: ["Export&nbsp;Defora&nbsp;asm", "Définitions&nbsp;pour&nbsp;Defora"],
    c: ["Create", "Crée"],
    tmpl: ["Template&nbsp;page", "Modèle&nbsp;de&nbsp;page"],
    stng: ["Settings&nbsp;of&nbsp;the&nbsp;site", "Paramètres&nbsp;du&nbsp;site"],
    imp: ["Import", "Importer"],
    ISM1: ["Syntax examples :", "Exemples de syntaxe :"],
    ISM2: ["JavaScript properties of this opcode :", "Propriétés JavaScript de cet opcode :"],
    ISM3: ["then <tt><b>si4</b></tt> is written to<ul>" + " <li> <tt><b>snd</b></tt>  " + "(short forms)" + " <li> <tt><b>si4</b></tt>  " + "(long immediate form)" + " <li> <tt><b>dst</b></tt>  " + "(extended forms).</ul></p>", "alors <tt><b>si4</b></tt> est écrit dans&nbsp;:<ul>" + " <li> <tt><b>snd</b></tt> " + "(formes courtes)" + " <li> <tt><b>si4</b></tt> " + "(forme immédiate longue)" + " <li> <tt><b>dst</b></tt> " + "(formes étendues).</ul></p>"],
    ISM4: [bul + 'This instruction usually works by comparing the values (with a subtraction)' + ' then conditionally aborting the write of <tt><b>si4</b></tt>. The long forms may not work in some versions of the core.</p>' + bul + 'The <a class="opcode">SMAX</a> (Signed MAXimum), <a class="opcode">SMIN</a> (Signed MINimum), <a class="opcode">UMAX</a> (Unsigned MAXimum)' + ' and <a class="opcode">UMIN</a> (Unsigned MINimum) instructions are useful when clipping coordinates or sound samples, for example.</p>' + '<pre class="instr">' + '; Signed version :\n' + ' <a class="asm">SMAX R1 R2</a>       ; If R1&gt;R2    then R1->R2\n' + ' <a class="asm">SMAX 1234h R1 R2</a> ; If R1&gt;1234h then R1->R2 else 1234h->R2\n' + ' <a class="asm">SMIN R1 R2</a>       ; If R1&lt;R2    then R1->R2\n' + ' <a class="asm">SMIN 1234h R1 R2</a> ; If R1&lt;1234h then R1->R2 else 1234h->R2\n' + '; Unsigned version :\n' + ' <a class="asm">UMAX R1 R2</a>       ; If R1&gt;R2    then R1->R2\n' + ' <a class="asm">UMAX 1234h R1 R2</a> ; If R1&gt;1234h then R1->R2 else 1234h->R2\n' + ' <a class="asm">UMIN R1 R2</a>       ; If R1&lt;R2    then R1->R2\n' + ' <a class="asm">UMIN 1234h R1 R2</a> ; If R1&lt;1234h then R1->R2 else 1234h->R2</pre>', bul + 'Cette instruction fonctionne en comparant les deux opérandes (avec une soustraction) puis, selon la retenue, en permettant l\'écriture de <tt><b>si4</b></tt>.' + ' C\'est plus complexe pour les formes longues donc elles risquent de ne pas fonctionner sur certaines version du YASEP.</p>' + bul + 'Les instructions <a class="opcode">SMAX</a> (Signed MAXimum), <a class="opcode">SMIN</a> (Signed MINimum),' + ' <a class="opcode">UMAX</a> (Unsigned MAXimum) et <a class="opcode">UMIN</a> (Unsigned MINimum) sont utiles pour les' + ' calculs avec saturation par exemple (<i>clipping</i> de coordonnées graphiques ou d\'échantillons de son, par exemple).</p>' + '<pre class="instr">' + '; Version signée :\n' + ' <a class="asm">SMAX R1 R2</a>       ; Si R1&gt;R2    alors R1->R2\n' + ' <a class="asm">SMAX 1234h R1 R2</a> ; Si R1&gt;1234h alors R1->R2 sinon 1234h->R2\n' + ' <a class="asm">SMIN R1 R2</a>       ; Si R1&lt;R2    alors R1->R2\n' + ' <a class="asm">SMIN 1234h R1 R2</a> ; Si R1&lt;1234h alors R1->R2 sinon 1234h->R2\n' + '; Version non signée :\n' + ' <a class="asm">UMAX R1 R2</a>       ; Si R1&gt;R2    alors R1->R2\n' + ' <a class="asm">UMAX 1234h R1 R2</a> ; Si R1&gt;1234h alors R1->R2 sinon 1234h->R2\n' + ' <a class="asm">UMIN R1 R2</a>       ; Si R1&lt;R2    alors R1->R2\n' + ' <a class="asm">UMIN 1234h R1 R2</a> ; Si R1&lt;1234h alors R1->R2 sinon 1234h->R2\n</pre>'],
    ISM5: [bul + 'Hint with YASEP32 : The <a class="opcode">ROR</a> and <a class="opcode">ROL</a>' + ' instruction are complementary. If a register must be ROLed by more than 15 positions,' + ' ROR the register by 32-n positions. This saves two instruction bytes...' + '<pre class="instr"><a class="asm">ROR 21 R1</a> ; 21 > 15 ' + 'so a long instruction is used\n' + '<a class="asm">ROL 11 R1</a> ; 32-21 = 11 &lt; 15 ' + 'so a short instruction is used to do the same thing</pre></p>', bul + 'Astuce avec YASEP32 : Les instructions <a class="opcode">ROR</a> et <a class="opcode">ROL</a>' + ' sont complémentaires. Si un registre doit être décalé circulairement de plus de 15 positions avec ROL,' + ' on obtient le même résultat avec un ROR de 32-n positions pour sauver 2 octets de mémoire programme.' + '<pre class="instr"><a class="asm">ROR 21 R1</a> ; 21 > 15 ' + 'donc une instruction longue est nécessaire\n' + '<a class="asm">ROL 11 R1</a> ; 32-21 = 11 &lt; 15 ' + 'donc une instruction courte obtient le même résultat</pre></p>'],
    ISM6: [bul + '<a class="opcode">CMPU</a> and <a class="opcode">CMPS</a> have been' + ' created to reduce the pressure on the register set, since only 5 registers are available&nbsp;:' + ' having <a class="opcode">SUB</a> with no register writeback saves one precious register that would hold the discarded result.</p>', bul + '<a class="opcode">CMPU</a> et <a class="opcode">CMPS</a> existent pour' + ' réduire les contraintes lors de l\'allocation des registres. Ils évitent' + ' d\'immobiliser un registre pour la destination de la soustraction.</p>'],
    ISMc: [bul + "The update of the Eq and/or C flags is disabled if the instruction is conditional and the condition is not valid.", bul + "Les flags C et/ou Eq ne sont pas mis à jour si l'instruction est conditionnelle et la condition n'est pas remplie."],
    ISM7: ['<li> a 4-bit immediate value (short immediate <a href="#!doc/forms#FORM_iR">iR</a> or extended immediate <a href="#!doc/forms#FORM_iRR">iRR</a> forms)' + '<li> the other register (<tt><b>si4</b></tt>) (short register form <a href="#!doc/forms#FORM_RR">RR</a> or extended register form <a href="#!doc/forms#FORM_RRR">RRR</a>)' + '<li> a 16-bit value (long immediate form (<a href="#!doc/forms#FORM_IRR">IRR</a>)).', '<li> une valeur immédiate sur 4 bits (forme immédiate courte <a href="#!doc/forms#FORM_iR">iR</a> ou étendue <a href="#!doc/forms#FORM_iRR">iRR</a>)' + '<li> un autre registre source (<tt><b>si4</b></tt>) (formes courte à registre <a href="#!doc/forms#FORM_RR">RR</a> ou étendue <a href="#!doc/forms#FORM_RRR">RRR</a>)' + '<li> une valeur immédiate sur 16 bits (forme longue immédiate (<a href="#!doc/forms#FORM_IRR">IRR</a>)).'],
    ISM8: ['<p><i>This instruction is optional and not definitive, so it could change later.</i></p><p>This is' + ' an unsigned operation, signed multiplies are not (yet) supported. The results can be combined' + ' (by <a class="opcode">ADD</a>) with the result of other multiplies, as explained in the the <a href="#!tuto/multiply">documentation</a>.</p>', '<p><i>Cette instruction est optionnelle, non définitive et peut changer dans le futur.</i></p>' + '<p>C\'est une opération non signée, les multiplications signées ne sont pas encore supportées.' + ' Le résultat peut être combiné (avec <a class="opcode">ADD</a>) avec les résultats d\'autres' + ' multiplications, comme expliqué dans la <a href="#!tuto/multiply">documentation</a>.</p>'],
    ISM9: [bul + 'This opcode is an <a href="#!doc/asm#asm_aliases">alias</a> to the <a class="opcode">', bul + 'Cet opcode est un <a href="#!doc/asm#asm_aliases">alias</a> vers l\'instruction <a class="opcode">'],
    ISM10: ['</a> instruction.</p>', "</a>.</p>"],
    ISM11: ["<br>&nbsp;Opcode number : ", "<br>&nbsp;&nbsp;&nbsp;n° d'opcode : "],
    ISM12: ["<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Group : ", "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Groupe : ", "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grupo : "],
    ISM13: [bul + 'Look at the <a href="#!tuto/multiply">multiply page</a> for more informations on how to use this instruction.', bul + 'Consultez la <a href="#!tuto/multiply">page sur les multiplications</a> pour de plus amples détails sur l\'utilisation de cet opcode.'],
    ISM14: [bul + 'When using the "long immediate" form (<a href="#!doc/forms#FORM_IRR">IRR</a>),' + ' only the 5 least significant bits are used with YASEP32, and 4 bits with YASEP16.' + bul + 'When using the "short immediate" form (<a href="#!doc/forms#FORM_iR">iR</a>),' + ' only 4 bits are available, they are not sign extended.' + ' Be careful with YASEP32&nbsp;: use the long form for shifts between 16 to 31 positions.', bul + 'Avec la forme "longue immédiate" (<a href="#!doc/forms#FORM_IRR">IRR</a>),' + ' seuls les 5 bits de poids faible sont pris en compte par YASEP32, et 4 bits avec YASEP16.' + bul + 'Avec la forme "courte immediate" (<a href="#!doc/forms#FORM_iR">iR</a>),' + ' seulement 4 bits sont disponibles, il n\'y a pas d\'extension de signe.' + ' Faites attention avec YASEP32&nbsp;: utilisez une forme longue pour les décalages de 16 à 31 bits)'],
    ISM15: [bul + 'When using the ' + '"long immediate" form (<a href="#!doc/forms#FORM_IRR">IRR</a>), only the 8 least significant bits are used.', bul + 'Avec la forme ' + '"longue immédiate" (<a href="#!doc/forms#FORM_IRR">IRR</a>), seuls les 8 bits de poids faible sont pris en compte.'],
    ISM16: [bul + 'This instruction is ' + '<a href="#!doc/flags#OPTIONAL">optional</a> and could be invalid, depending on the target core\'s implementation.</p>', bul + 'Cette instruction est ' + '<a href="#!doc/flags#OPTIONAL">optionnelle</a> et peut être invalide sur certains YASEP.</p>'],
    ISM17: [bul + 'This instruction is ' + '<b>preliminary</b>, it is not yet completely defined, do not use it !</p>', bul + 'Cette instruction est ' + '<b>préliminaire</b>, sa définition est en cours et les mécanismes ne sont pas encore correctement définis. Ne pas utiliser !</p>'],
    ISM18: [bul + 'This instruction is ' + 'specific to <a href="#!doc/flags#YASEP' + '32_ONLY">YASEP32' + '</a> and has no meaning with a ' + '16-bit version.</p>', bul + 'Cette instruction est ' + 'spécifique à <a href="#!doc/flags#YASEP' + '32_ONLY">YASEP32' + '</a> et n\'a aucun sens avec une version ' + '16 bits.</p>'],
    ISM20: [bul + 'You can play with this instruction in the <a href="#!tool/EU">Execution Unit simulator</a>.</p>\n', bul + 'Vous pouvez expérimenter avec cette opération dans le <a href="#!tool/EU">simulateur d\'unités d\'exécution</a>.</p>\n'],
    ISM21: ["<br>&nbsp;&nbsp;&nbsp;Description : ", , "<br>&nbsp;&nbsp;&nbsp;Descripción : "],
    ISM22: ["<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forms : ", "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formes : ", "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formas : "],
    ISM23: ["; With condition\n", "; Avec condition\n", "; Con la condición\n"],
    ISM24: ["<br>&nbsp;&nbsp;&nbsp;&nbsp;Attributes :", "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Attributs :", "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atributos :"],
    lsbx: [" is too large, only the ", " est trop grand, seulement "],
    lsbx2: [" lower bits are kept", " bits de poids faible gardés"],
    woad: ["Warning : the opcode ", "Attention : l'opcode "],
    woad2: [" is already defined", " est déjà défini"],
    ctl1: ["Error: CALL does not accept PC as source or destination", "Error: CALL n'accepte pas PC comme source ou destination"],
    ie: ["out of word access (bad alignment)", "accès non aligné, hors mot"],
    asmty: ["YASEP type reset to ", "Type de YASEP sélectionné : "],
    asmie: ["invalid (empty ?) instruction", "instruction invalide (vide ?)"],
    asmuo: ["unknown opcode ", "opcode inconnu "],
    asmmd: ["more data are needed for this pseudo-instruction.", "cette pseudo-instruction a besoin d'autres données"],
    asmqm: ["Quotation marks (\") are missing", "Il manque les guillemets  (\")"],
    asmin: ["invalid number ", "nombre invalide "],
    asmln: ["litteral number ", "le nombre littéral "],
    asmitl: [" is too large. ", " est trop grand. "],
    asmbk: [" bits kept.", " bits gardés."],
    asmtma: ["too many arguments !", "trop d'arguments !"],
    asmcpo: ["the current profile does not support this opcode.", "le profil actuel ne supporte pas cet opcode."],
    param: ["Parameter #", "Paramètre n°"],
    asmchl: ["conditional instructions preclude long immediate values", "les instructions conditionnelles excluent les valeurs immédiates longues"],
    asmiic: ["this opcode is not interruptible and does not accept conditions. Continuing anyway.", "cet opcode est ininterruptible et n'accepte pas de condition. On continue quand même."],
    asmib: ['(internal bug) "encoded_fields" is missing bits :', '(bug interne) il manque des bits dans "encoded_fields" : '],
    asmrop: ["a register operand is expected  after this condition", "un registre est attendu après cette condition"],
    asmc15: ["the number after this condition must be between 0 and 15", "le nombre qui suit cette condition doit être entre 0 et 15"],
    asmnie: ["a number is expected after this condition", "un nombre doit suivre cette condition"],
    asmtmo: ["too many operands after this condition", "trop d'opérandes après cette condition"],
    asmio: ["invalid operand: ", "opérande invalide : "],
    asmoc: ["invalid operand combination : ", "combinaison d'opérandes invalide : "],
    asmo16: [" This opcode is valid only in 16-bits mode", " Cet opcode n'est valable qu'en mode 16 bits"],
    asmo32: [" This opcode is valid only in 32-bits mode", " Cet opcode n'est valable qu'en mode 32 bits"],
    asmopc: [" This operand combination is not valid for this opcode : ", " Cette combinaison d'opérandes n'est pas valide pour cet opcode : "],
    asmlb: [" literal bytes.", " octets"],
    asmiec: [" is not a recognized escape sequence", " n'est pas une séquence d'échappement valide"],
    dsmgb: ["garbage bits found in ", "bits à 1 dans "],
    dsmuk: ["unknown or unhandled form ???", "forme inconnue ou non prise en charge ???"],
    dsmuo: ['unknown opcode "', 'opcode inconnu "'],
    dsmuos: ['" (assuming a short instruction)', '" (suppose que c\'est une instruction courte)'],
    dsmuol: ['" (assuming a long instruction)', '" (suppose que c\'est une instruction longue)'],
    dsmif: ["wrong input format", "mauvais type de paramètre"],
    opct: ["Opcode&nbsp;table", "Table&nbsp;d'opcodes"],
    res: ["&nbsp;&nbsp;Result&nbsp;", "Résultat&nbsp;", "Resultar&nbsp;"],
    Wds: ["' Wrong datapath width (must be 16 or 32)", "' mauvaise largueur (doit être 16 ou 32)"],
    EU: ["Execution&nbsp;units", "Unités&nbsp;d'exécution"],
    states: [
        ["INIT", "STEP", "RUN", "STOP", "HALT", "FAULT", "DISCONNECTED"],
        ["Initialisé", "Pas à Pas", "Simulation", "Arrêt", "Terminé", "Faute", "Déconnecté"]
    ],
    sim: ["Simulator", "Simulateur", "Simulador"],
    ysm: ["YASEP&nbsp;core", "Cœur&nbsp;YASEP", "Núcleo&nbsp;YASEP", "YASEP&nbsp;Kern"],
    cnf: ["Configuration", , "Configuración"],
    prf: ["Profile", "Profil", "Perfil"],
    slct: ["Select", "Choisir", "Seleccionar"],
    ctl: ["Control", "Contrôle", "Controle"],
    rgs: ["Registers", "Registres", "Registros"],
    mem: ["Memory", "Mémoire", "Memoria"],
    trc: ["Trace", , "Huella"],
    brk: ["Breakpoints", "Points d'arrêt"],
    rdx: ["Radix: ", "Base : "],
    ctsh: ["click to show/hide", "cliquer pour\nafficher/cacher"],
    fcsm: ["First, connect this simulator to a map", "Pour activer ce simulateur, connectez-le à une carte"],
    iia: ["Invalid instruction address", "Adresse d'instruction invalide"],
    awPL: ["the instruction attempts to write to the PC's LSB", "l'instruction essaie d'écrire dans le LSB du PC"],
    Canb: ["Create a new breakpoint", "Crée un nouveau point d'arrêt"],
    dtb: ["delete this breakpoint", "supprime ce point d'arrêt"],
    edtb: ["enable/disable this breakpoint", "active/désactive ce point d'arrêt"],
    DDax: ["Drag&Drop the arrow to the YASMed line\nwhere you want to execute code", "glissez-déposez la flèche dans YASMed\nà la ligne dont vous voulez exécuter le code"],
    Reset: [, "Réinitialisation"],
    Run: [, "Lance la simulation"],
    Stop: [, "Pause"],
    Step: [, "Un pas"],
    mStp: ["Multiple steps", "Plusieurs pas"],
    stp: ["steps:", "pas:"],
    adr: ["address", "adresse"],
    sac: ["stop at cycle", "arrêt au cycle"],
    saia: ["stop at instruction address", "arrêt à l'instruction située à"],
    sorw: ["stop on register write", "arrêt à l'écriture d'un registre"],
    sopc: ["stop on opcode", "arrêt à un opcode"],
    St: ["Status:", "État :"],
    lgnd: ['   Left: read                      Right: write\n' + ' \u204E \u2051 \u2042 Operand read (x1,x2,x3)     \u25CF  Result write\n' + '  0,o  read condition Zero (1,0)       \u25B2  Implicit (memory) write\n' + '  L,l  read condition LSB  (1,0)       \u25C6  Manual write\n' + '  M,m  read condition MSB  (1,0)\n', '   Gauche: lecture                        Droite: écriture\n' + ' \u204E \u2051 \u2042 Lecture opérande (x1,x2,x3)     \u25CF  Ecriture Résultat\n' + '  0,o  Lecture condition Zero (1,0)    \u25B2  Ecriture implicite (mémoire)\n' + '  L,l  Lecture condition LSB  (1,0)    \u25C6  Ecriture manuelle\n' + '  M,m  Lecture condition MSB  (1,0)\n'],
    shms: ["show/hide the meaning of the symbols", "afficher/cacher la signification des symboles"],
    lgd: ["Legend", "Légende"],
    comp: ["any less equal more different", "n'importe inférieur égal supérieur différent"],
    TrD: ["Trace depth", "Profondeur de trace"],
    TrDt: ["Change how many cycles\nare held in memory", "Change le nombre de cycles\ngardés en mémoire"],
    fcm: ["Flush the change marks", "Effacer les marqueurs de modification"],
    cvlv: ["Click to view the last values", "Cliquer pour voir les valeurs précédentes"],
    ho: ["History of", "Historique de"],
    Mul: ["How to multiply", "Multiplications"],
    Rm: ["Registers and memory", "Registres et mémoire"],
    d16: ["16&nbsp;vs&nbsp;32&nbsp;bits", "16&nbsp;ou&nbsp;32&nbsp;bits&nbsp;?"],
    dfr: ["Instruction&nbsp;forms", "Formes&nbsp;d'instructions"],
    ttli8n: ["Translations", "Traductions"],
    flg: ["Instruction&nbsp;flags", "Attributs&nbsp;d'instructions"],
    das: ["Assembly&nbsp;language", "Langage&nbsp;assembleur"],
    fstr: ["First&nbsp;steps", "Premiers&nbsp;pas", "Primeros&nbsp;pasos", "Erste&nbsp;Schritte"],
    tsim: ["How&nbsp;to&nbsp;simulate", "Comment&nbsp;simuler"],
    ttcw: ["Create&nbsp;a&nbsp;window", "Créer une fenêtre"],
    thx: ["Thanks!", "Merci !", "Gracias!"],
    tfb: ["Framebuffer"],
    Ipn: ["invalid profile name", "nom de profil invalide"],
    cc: ["Configure&nbsp;core", "Configurer&nbsp;le&nbsp;cœur"],
    s: ["Save", "Sauver", "Salvar"],
    ftag: ["Error finding the 'script' tag to be replaced in index.dev.html", "Erreur: tag 'script' introuvable dans index.dev.html"],
    rhg: ["Error loading html, got:\n", "Erreur lors du chargement de l'index.dev.html:\n"],
    cpt: ["Compact this site", "Compacter ce site"],
    gg: ["Edit&nbsp;a&nbsp;graph", "Éditer&nbsp;un&nbsp;graphe"],
    ggt: ["add a row", "ajouter une ligne"],
    ggi: ["add an input", "ajouter une entrée"],
    ggo: ["add an output", "ajouter une sortie"],
    gp: ["Pick&nbsp;a&nbsp;block", "Palette&nbsp;des&nbsp;blocs"],
    gpc: ["click to change input value", "cliquer pour changer le nombre"],
    gpm: ["drag&drop the block", "déplacer le bloc"],
    Mp: ["Memory&nbsp;map", "Carte&nbsp;mémoire"],
    Map: ["Memory&nbsp;map", "Carte&nbsp;de&nbsp;la&nbsp;mémoire"],
    canm: ["Create a new map", "Crée une nouvelle carte"],
    NS: ["New simulator", "Nouveau simulateur"],
    NF: ["New framebuffer", "Nouvel écran"],
    lsi: ["connected simulators", "simulateurs connectés"],
    led: ["connected editors", "éditeurs connectés"],
    dtl: ["delete this connection", "supprimer cette connexion"],
    yaem: ["Export .map", "Exporte .map", "Exportar .map"],
    fb: ["framebuffer", "mémoire graphique"],
    clr: ["clear", "effacer"],
    trk: ["Tasks &amp; bugs", "Tâches et bugs"],
    Init: ["Initialising...", "Initialisation..."],
    flsh: ["Flash console", "Console du flasheur"],
    ferm: ["Erase method", "Méthode d'effacement"],
    fct: ["Chip Type", "Type de mémoire"]
};

LANG = {
    supported: false,
    override: false,
    LN: "",
    FLAGS: [],
    change_innerHTML: [],
    change_lang: function (i) {
        i = +i;
        var j, k;
        if ((i < 0) || (i >= i8n.LANGS.length)) i = 0;
        lsPut("Lang", LANG.LN = i8n.LANGS[LNG = i]);
        changeMainWinTitle(I8N("welc").replace(/&nbsp;/gi, " "));
        for (j in LANG.change_innerHTML) {
            if (k = LANG.change_innerHTML[j]) k[0].innerHTML = k[1][i] || k[1][0]
        }
    }
};

browsLang = (navigator.language || navigator.browserLanguage).slice(0, 2);
if (i = lsGet("Lang")) {
    browsLang = i;
    LANG.override = true
}
if ((i =window.location.hash).indexOf("#lang=") == 0) {
    browsLang = i.slice(6);
    LANG.override = true
}

LNG = i8n.LANGS.indexOf(browsLang);
if (LNG < 0) LNG = 0;
else LANG.supported = true;

function I8N(i, t) {
    t = i8n[i];
    if (!t) return i;
    if (t[LNG]) return t[LNG];
    return t[0] || i
}

function Al8N() {
    var i = 0,
        s = "",
        t, a, l = LNG;
    while (typeof (a = arguments[i++]) != "undefined") {
        if (a == "") s += arguments[i++];
        else s += I8N(a)
    }
    console.log(s)
}

if (!window.I8N) {
    I8N = function (m) {
        return m
    };
    Al8N = function (m) {
        console.log(m)
    }
}

function generated(c, tool) {
    return "\n" + c + " " + I8N("Generated on") + " " + newDate().toGMTString() + "\n" + c + " " + I8N("by") + " " + document.location + "\n" + c + "    yasep/" + tool + " " + I8N("version") + " " + VERSION + "\n"
}

function setHTML(o, t) {
    if (typeof t != "string") {
        if (t.length > 1) LANG.change_innerHTML.push([o, t]);
        t = t[LNG] || t[0]
    }
    o.innerHTML = t
};
