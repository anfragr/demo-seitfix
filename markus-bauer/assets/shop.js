/* ============================================================
   Markus Bauer Schuhmanufaktur, Shop-Demo von Seitfix.
   Gemeinsames Skript fuer alle Seiten: Warenkorb (ueber Seiten
   per sessionStorage), Lade, Kasse, Formulare ohne Mailprogramm.
   Berater und 3D nur dort, wo die Elemente vorhanden sind.
   ============================================================ */
(function(){
  'use strict';
  var VERSAND_FREI_AB = 100, VERSAND_KOSTEN = 5;
  function euro(n){ return n.toFixed(2).replace('.', ',') + ' Euro'; }

  /* -------- Warenkorb-Datenhaltung -------- */
  var SCHL='mb-korb';
  function korbLesen(){ try{var r=sessionStorage.getItem(SCHL);return r?JSON.parse(r):[];}catch(e){return [];} }
  function korbSchreiben(k){ try{sessionStorage.setItem(SCHL,JSON.stringify(k));}catch(e){} alleAnsichten(); }
  function korbAnzahl(k){ var n=0; k.forEach(function(p){n+=p.anzahl;}); return n; }
  function zwischensumme(k){ var s=0; k.forEach(function(p){s+=p.preis*p.anzahl;}); return s; }
  function inDenKorb(prod, groesse){
    var kennung = prod.id + '|' + (groesse||'-');
    var k = korbLesen(), da=false;
    for(var i=0;i<k.length;i++){ if(k[i].kennung===kennung){ k[i].anzahl++; da=true; } }
    if(!da){ k.push({kennung:kennung, id:prod.id, name:prod.name, farbe:prod.farbe, groesse:groesse||'', preis:prod.preis, anzahl:1}); }
    korbSchreiben(k);
    ladeOeffnen();
  }

  /* -------- Lade / Drawer -------- */
  var fokusVorher=null;
  function ladeOeffnen(){
    var l=document.getElementById('lade'), s=document.getElementById('schatten'); if(!l||!s)return;
    fokusVorher=document.activeElement; s.hidden=false; s.setAttribute('data-offen',''); l.setAttribute('data-offen',''); l.setAttribute('aria-hidden','false');
    var z=document.getElementById('ladeZu'); if(z) z.focus();
  }
  function ladeSchliessen(){
    var l=document.getElementById('lade'), s=document.getElementById('schatten'); if(!l||!s)return;
    l.removeAttribute('data-offen'); l.setAttribute('aria-hidden','true'); s.removeAttribute('data-offen');
    window.setTimeout(function(){s.hidden=true;},220);
    if(fokusVorher&&fokusVorher.focus)fokusVorher.focus();
  }
  function ladeZeichnen(){
    var k=korbLesen(), liste=document.getElementById('ladeListe'); if(!liste)return;
    liste.innerHTML='';
    if(!k.length){ var li=document.createElement('li'); li.className='leer'; li.textContent='Ihr Warenkorb ist leer.'; liste.appendChild(li); }
    k.forEach(function(pos,stelle){
      var li=document.createElement('li'); li.className='pos';
      var links=document.createElement('div');
      var det = pos.farbe + (pos.groesse?', Gr. '+pos.groesse:'');
      links.innerHTML='<h3>'+pos.name+'</h3><p class="detail">'+det+'</p>';
      var st=document.createElement('div'); st.className='steuer';
      var minus=document.createElement('button'); minus.type='button'; minus.textContent='−'; minus.setAttribute('aria-label','weniger');
      minus.addEventListener('click',function(){var c=korbLesen(); if(c[stelle].anzahl>1)c[stelle].anzahl--; else c.splice(stelle,1); korbSchreiben(c);});
      var z=document.createElement('span'); z.textContent=pos.anzahl;
      var plus=document.createElement('button'); plus.type='button'; plus.textContent='+'; plus.setAttribute('aria-label','mehr');
      plus.addEventListener('click',function(){var c=korbLesen(); c[stelle].anzahl++; korbSchreiben(c);});
      var weg=document.createElement('button'); weg.type='button'; weg.className='weg'; weg.textContent='entfernen';
      weg.addEventListener('click',function(){var c=korbLesen(); c.splice(stelle,1); korbSchreiben(c);});
      st.appendChild(minus); st.appendChild(z); st.appendChild(plus); st.appendChild(weg);
      links.appendChild(st);
      var re=document.createElement('div'); re.className='summe'; re.textContent=euro(pos.preis*pos.anzahl);
      li.appendChild(links); li.appendChild(re); liste.appendChild(li);
    });
    var zw=document.getElementById('ladeZwischen'); if(zw)zw.textContent=euro(zwischensumme(k));
  }
  function kasseZeichnen(){
    var k=korbLesen(), liste=document.getElementById('kasseListe'); if(!liste)return;
    liste.innerHTML='';
    if(!k.length){ var li=document.createElement('li'); li.innerHTML='<span class="k">Noch nichts im Warenkorb</span><span></span>'; liste.appendChild(li); }
    k.forEach(function(pos){
      var li=document.createElement('li');
      var det=pos.name+(pos.groesse?', Gr. '+pos.groesse:'')+' × '+pos.anzahl;
      li.innerHTML='<span class="k">'+det+'</span><span>'+euro(pos.preis*pos.anzahl)+'</span>';
      liste.appendChild(li);
    });
    var sum=zwischensumme(k);
    var versand = (sum>0 && sum<VERSAND_FREI_AB) ? VERSAND_KOSTEN : 0;
    var zw=document.getElementById('kasseZwischen'), ve=document.getElementById('kasseVersand'), ge=document.getElementById('kasseGesamt');
    if(zw)zw.textContent=euro(sum);
    if(ve)ve.textContent = versand? euro(versand) : 'kostenlos';
    if(ge)ge.textContent=euro(sum+versand);
  }
  function korbzahlZeichnen(){ var el=document.getElementById('korbZahl'); if(el)el.textContent=korbAnzahl(korbLesen()); }
  function alleAnsichten(){ korbzahlZeichnen(); ladeZeichnen(); kasseZeichnen(); }

  /* -------- Produktseite: In den Warenkorb -------- */
  var addKnopf=document.getElementById('inKorb');
  if(addKnopf){
    addKnopf.addEventListener('click',function(){
      var prod={id:addKnopf.getAttribute('data-id'),name:addKnopf.getAttribute('data-name'),
        farbe:addKnopf.getAttribute('data-farbe'),preis:parseFloat(addKnopf.getAttribute('data-preis'))};
      var sel=document.getElementById('groesseWahl'); var g=sel?sel.value:'';
      inDenKorb(prod,g);
    });
  }

  /* -------- Netlify-Formularversand ohne Mailprogramm -------- */
  function formSenden(form, onErfolg){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var body = new URLSearchParams(new FormData(form)).toString();
      var knopf = form.querySelector('button[type="submit"]');
      if(knopf){ knopf.disabled=true; knopf.textContent='Wird gesendet'; }
      fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:body})
        .then(function(){ onErfolg(); }).catch(function(){ onErfolg(true); });
    });
  }
  function erfolgKasten(text){
    var d=document.createElement('div'); d.className='erfolg';
    d.innerHTML='<strong>Danke, wir haben Ihre Anfrage erhalten.</strong>'+text;
    return d;
  }

  var bestellForm=document.getElementById('bestellForm');
  if(bestellForm){
    bestellForm.addEventListener('submit', function(){
      var k=korbLesen();
      var text=k.map(function(p){return p.anzahl+'x '+p.name+' ('+p.farbe+(p.groesse?', Gr. '+p.groesse:'')+') je '+euro(p.preis);}).join('\n');
      var sum=zwischensumme(k); var versand=(sum>0&&sum<VERSAND_FREI_AB)?VERSAND_KOSTEN:0;
      text += '\nZwischensumme: '+euro(sum)+'\nVersand: '+(versand?euro(versand):'kostenlos')+'\nGesamt: '+euro(sum+versand);
      var inh=document.getElementById('bestellInhalt'); if(inh) inh.value=text;
    }, true);
    formSenden(bestellForm, function(){
      bestellForm.parentNode.replaceChild(
        erfolgKasten('Ihre Bestellung ist bei der Manufaktur eingegangen. Sie erhalten die Rechnung mit dem Zahlungsweg per E-Mail. Vielen Dank.'),
        bestellForm);
      try{ sessionStorage.removeItem(SCHL); }catch(e){}
      alleAnsichten();
    });
  }

  /* -------- Kopf, Lade, Handy -------- */
  var auf=document.getElementById('korbOeffnen'), zu=document.getElementById('ladeZu'), sch=document.getElementById('schatten');
  if(auf)auf.addEventListener('click',ladeOeffnen);
  if(zu)zu.addEventListener('click',ladeSchliessen);
  if(sch)sch.addEventListener('click',ladeSchliessen);
  document.addEventListener('keydown',function(e){var l=document.getElementById('lade'); if(e.key==='Escape'&&l&&l.hasAttribute('data-offen'))ladeSchliessen();});

  /* ============================================================
     Berater und 3D-Konfigurator, nur auf der Massschuh-Seite
     ============================================================ */
  function farbHex(name){
    var t=(name||'').toLowerCase();
    if(t.indexOf('schwarz')>=0) return '#1c1a17';
    if(t.indexOf('mahagoni')>=0) return '#5e2a1a';
    if(t.indexOf('marone')>=0||t.indexOf('kastanie')>=0||t.indexOf('rotbraun')>=0) return '#6b3218';
    if(t.indexOf('cognac')>=0||t.indexOf('eiche')>=0) return '#7a4423';
    if(t.indexOf('dunkelbraun')>=0||t.indexOf('braun')>=0) return '#4b2f1c';
    if(t.indexOf('dunkelblau')>=0||t.indexOf('blau')>=0||t.indexOf('marine')>=0) return '#28324c';
    if(t.indexOf('grün')>=0||t.indexOf('gruen')>=0) return '#2f4032';
    if(t.indexOf('anthrazit')>=0) return '#3a3a3c';
    if(t.indexOf('beige')>=0) return '#c1a074';
    if(t.indexOf('rot')>=0) return '#7c2320';
    return '#5b4632';
  }
  function schuhSilhouette(hex, kat){
    var laces = (kat==='loafer')
      ? '<rect x="150" y="70" width="46" height="12" rx="3" fill="rgba(255,255,255,.22)"/>'
      : '<g stroke="rgba(255,255,255,.28)" stroke-width="2"><line x1="150" y1="78" x2="188" y2="72"/><line x1="152" y1="90" x2="190" y2="84"/><line x1="154" y1="102" x2="192" y2="96"/></g>';
    var oben = (kat==='boot')
      ? 'M20 150 Q18 70 40 66 L44 30 Q46 22 58 24 Q92 30 128 60 Q180 74 232 82 Q286 90 292 132 Q294 146 290 150 Z'
      : 'M20 150 Q18 96 74 92 Q108 88 132 74 Q176 56 224 64 Q284 74 294 128 Q296 144 292 150 Z';
    return '<svg viewBox="0 0 312 168" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schuh">'
      +'<ellipse cx="156" cy="160" rx="150" ry="7" fill="rgba(35,33,30,.12)"/>'
      +'<path d="M14 150 Q12 162 30 162 L280 162 Q300 162 300 150 L300 146 L16 146 Z" fill="#3a2c1e"/>'
      +'<path d="'+oben+'" fill="'+hex+'"/>'+laces+'</svg>';
  }

  var konfigCanvas=document.getElementById('konfigCanvas'), heroCanvas=document.getElementById('heroCanvas');
  var hero3d=null, konfig3d=null;
  if(window.SchuhDreiD){
    try{
      if(heroCanvas){ hero3d=SchuhDreiD.create(heroCanvas); hero3d.setModel('oxford'); hero3d.setColor('#7a4423','glatt'); }
      if(konfigCanvas){ konfig3d=SchuhDreiD.create(konfigCanvas); }
    }catch(e){ hero3d=null; konfig3d=null; }
  }

  var berater=document.getElementById('berater');
  if(berater || konfigCanvas){
    var stand={modell:'Oxford',form:'oxford',leder:'Kalbsleder',farbe:'Schwarz',sohle:'Ledersohle, rahmengenäht',futter:'Lederfutter'};
    var FARBHEX={'Schwarz':'#1c1a17','Cognac':'#7a4423','Mahagoni':'#5e2a1a','Marineblau':'#28324c','Rot':'#7c2320','Beige':'#c1a074'};
    var LEDER_FINISH={'Kalbsleder':'glatt','Veloursleder':'velours','Hirschleder':'genarbt','Büffelleder':'genarbt','Lackleder':'lack'};
    function zusammenfassung(){ for(var k in stand){ if(!Object.prototype.hasOwnProperty.call(stand,k))continue; var el=document.querySelector('[data-zus="'+k+'"]'); if(el)el.textContent=stand[k]; } }
    function schuhAktualisieren(){ if(konfig3d){ konfig3d.setModel(stand.form); konfig3d.setColor(FARBHEX[stand.farbe]||'#1c1a17', LEDER_FINISH[stand.leder]||'glatt'); } }
    function konfigTextSetzen(){ var f=document.getElementById('massKonfig'); if(f)f.value=[stand.modell,stand.leder,stand.farbe,stand.sohle,stand.futter].join(' / '); }
    function gruppeAnbinden(gruppe){
      var name=gruppe.getAttribute('data-name'); var kn=gruppe.querySelectorAll('button');
      for(var i=0;i<kn.length;i++){(function(b){
        b.addEventListener('click',function(){
          for(var m=0;m<kn.length;m++){kn[m].setAttribute('aria-pressed','false');}
          b.setAttribute('aria-pressed','true'); var w=b.getAttribute('data-wert');
          if(name==='modell'){stand.modell=w; stand.form=b.getAttribute('data-form')||'oxford';} else {stand[name]=w;}
          zusammenfassung(); schuhAktualisieren(); konfigTextSetzen();
        });
      })(kn[i]);}
    }
    var kgrp=document.querySelectorAll('.wahl[data-name], .farbwahl[data-name]');
    for(var g=0;g<kgrp.length;g++){ gruppeAnbinden(kgrp[g]); }
    function optionSetzen(name,wert){
      var gr=document.querySelector('[data-name="'+name+'"]'); if(!gr)return;
      var kn=gr.querySelectorAll('button');
      for(var i=0;i<kn.length;i++){ var t=kn[i].getAttribute('data-wert')===wert; kn[i].setAttribute('aria-pressed',t?'true':'false');
        if(t){ if(name==='modell'){stand.modell=wert; stand.form=kn[i].getAttribute('data-form')||'oxford';} else {stand[name]=wert;} } }
    }
    var beraterWahl={anlass:'Business',saison:'Sommer'};
    var bgrp=document.querySelectorAll('.optionen[data-name]');
    for(var b2=0;b2<bgrp.length;b2++){(function(gr){
      var name=gr.getAttribute('data-name'); var kn=gr.querySelectorAll('button');
      for(var i=0;i<kn.length;i++){(function(bt){ bt.addEventListener('click',function(){
        for(var m=0;m<kn.length;m++){kn[m].setAttribute('aria-pressed','false');} bt.setAttribute('aria-pressed','true'); beraterWahl[name]=bt.getAttribute('data-wert');
      });})(kn[i]);}
    })(bgrp[b2]);}
    function empfehlungen(anlass,saison){
      var basis={
        'Business':[{m:'Oxford',f:'oxford',farbe:'Schwarz',leder:'Kalbsleder',passt:'Der Klassiker im Büro'},{m:'Derby',f:'derby',farbe:'Cognac',leder:'Kalbsleder',passt:'Etwas offener zum Anzug'},{m:'Budapester',f:'budapester',farbe:'Schwarz',leder:'Kalbsleder',passt:'Kräftig und präsent'}],
        'Fest':[{m:'Oxford',f:'oxford',farbe:'Schwarz',leder:'Lackleder',passt:'Zum festlichen Abend'},{m:'Budapester',f:'budapester',farbe:'Mahagoni',leder:'Kalbsleder',passt:'Charakter für den Anlass'},{m:'Loafer',f:'loafer',farbe:'Schwarz',leder:'Lackleder',passt:'Elegant und leicht'}],
        'Freizeit':[{m:'Loafer',f:'loafer',farbe:'Cognac',leder:'Veloursleder',passt:'Leger für jeden Tag'},{m:'Derby',f:'derby',farbe:'Marineblau',leder:'Kalbsleder',passt:'Ein farbiger Akzent'},{m:'Budapester',f:'budapester',farbe:'Rot',leder:'Kalbsleder',passt:'Auffällig, extravagant'}]
      };
      var liste=basis[anlass].map(function(o){return {m:o.m,f:o.f,farbe:o.farbe,leder:o.leder,passt:o.passt};});
      if(saison==='Winter'){ liste[2]={m:'Schnürboot',f:'boot',farbe:'Cognac',leder:'Hirschleder',passt:'Warm durch den Winter'}; if(anlass==='Freizeit'){liste[0]={m:'Budapester',f:'budapester',farbe:'Mahagoni',leder:'Kalbsleder',passt:'Geschlossen und warm'};} }
      else if(saison==='Sommer'){ if(anlass==='Freizeit'){liste[2]={m:'Loafer',f:'loafer',farbe:'Beige',leder:'Veloursleder',passt:'Leicht und hell'};} if(anlass==='Business'){liste[1]={m:'Derby',f:'derby',farbe:'Cognac',leder:'Kalbsleder',passt:'Sommerlich zum Anzug'};} }
      return liste;
    }
    function vorschlaegeZeigen(){
      var liste=empfehlungen(beraterWahl.anlass,beraterWahl.saison);
      var ziel=document.getElementById('vorschlaege'); if(!ziel)return; ziel.innerHTML='';
      liste.forEach(function(o){
        var hex=FARBHEX[o.farbe]||'#1c1a17';
        var art=document.createElement('article'); art.className='vorschlag';
        art.innerHTML='<div class="bild">'+schuhSilhouette(hex,o.f)+'</div><div class="txt"><p class="passt">'+o.passt+'</p><h3>'+o.m+'</h3><p class="beschr">'+o.leder+' in '+o.farbe+'. Rahmengenäht, im Konfigurator frei anpassbar.</p><button class="knopf knopf-linie" type="button">Diesen Schuh anpassen</button></div>';
        art.querySelector('button').addEventListener('click',function(){
          optionSetzen('modell',o.m); optionSetzen('leder',o.leder); optionSetzen('farbe',o.farbe);
          zusammenfassung(); schuhAktualisieren(); konfigTextSetzen();
          var k=document.getElementById('konfigurator'); if(k)k.scrollIntoView({behavior:'smooth',block:'start'});
        });
        ziel.appendChild(art);
      });
      ziel.hidden=false; var h=document.getElementById('beraterHint'); if(h)h.hidden=false;
      var st=document.getElementById('beraterStatus'); if(st)st.textContent=beraterWahl.anlass+', '+beraterWahl.saison;
    }
    var vk=document.getElementById('vorschlagKnopf'); if(vk)vk.addEventListener('click',vorschlaegeZeigen);

    var massForm=document.getElementById('massschuhForm');
    if(massForm){
      massForm.addEventListener('submit', konfigTextSetzen, true);
      formSenden(massForm, function(){
        massForm.parentNode.replaceChild(
          erfolgKasten('Ihre Zusammenstellung liegt bei der Manufaktur. Sie meldet sich mit Preis und einem Termin zum Maßnehmen. Vielen Dank.'),
          massForm);
      });
    }
    // Vorwahl aus Produktseite (?modell=Derby)
    try{
      var mp=new URLSearchParams(location.search).get('modell');
      if(mp){ optionSetzen('modell',mp); }
    }catch(e){}
    zusammenfassung(); schuhAktualisieren(); konfigTextSetzen();
  }

  /* -------- Start -------- */
  alleAnsichten();
})();
