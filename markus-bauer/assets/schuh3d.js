/* ============================================================
   Schuh in echtem 3D, gebaut mit Three.js.
   Ein stilisierter, rahmengenähter Schuh: Oberleder als
   extrudiertes Seitenprofil mit weicher Fase, eigene Sohle,
   Schnürung je Modell. Leder-Material und Farbe live schaltbar.
   Kein fremder Server, Three.js liegt lokal.
   ============================================================ */
(function(){
  'use strict';
  if (typeof THREE === 'undefined') { return; }

  function profilNiedrig(){
    // Seitenprofil eines Halbschuhs, Zehe rechts, Ferse links.
    var s = new THREE.Shape();
    s.moveTo(-2.05, 0.16);
    s.lineTo(-2.02, 0.62);
    s.quadraticCurveTo(-1.95, 0.95, -1.55, 0.98);   // Fersenkappe
    s.quadraticCurveTo(-0.7, 1.02, 0.15, 0.86);     // Rist
    s.quadraticCurveTo(1.0, 0.72, 1.7, 0.6);        // Blatt
    s.quadraticCurveTo(2.35, 0.5, 2.52, 0.34);      // Zehe oben
    s.quadraticCurveTo(2.66, 0.24, 2.5, 0.16);      // Zehenspitze
    s.lineTo(-2.05, 0.16);
    return s;
  }
  function profilHoch(){
    // Schnürboot: hoher Schaft an der Ferse.
    var s = new THREE.Shape();
    s.moveTo(-2.05, 0.16);
    s.lineTo(-2.0, 1.55);
    s.quadraticCurveTo(-1.95, 1.72, -1.7, 1.72);
    s.quadraticCurveTo(-1.4, 1.7, -1.15, 1.4);
    s.quadraticCurveTo(-0.6, 0.98, 0.2, 0.86);
    s.quadraticCurveTo(1.0, 0.72, 1.7, 0.6);
    s.quadraticCurveTo(2.35, 0.5, 2.52, 0.34);
    s.quadraticCurveTo(2.66, 0.24, 2.5, 0.16);
    s.lineTo(-2.05, 0.16);
    return s;
  }
  function sohlenProfil(){
    var s = new THREE.Shape();
    s.moveTo(-2.16, 0.0);
    s.lineTo(-2.14, 0.2);
    s.lineTo(2.56, 0.2);
    s.quadraticCurveTo(2.78, 0.12, 2.58, 0.0);
    s.lineTo(-2.16, 0.0);
    return s;
  }

  function glatt(a,b,x){ // smoothstep
    var t = Math.max(0, Math.min(1, (x-a)/(b-a)));
    return t*t*(3-2*t);
  }
  // Breite verjuengt sich zu Ferse und Zehe, damit aus dem Block ein Leisten wird.
  function breiteBei(x){
    var xn = (x + 2.05) / (2.66 + 2.05);          // 0 Ferse, 1 Zehe
    var ferse = 0.68 + 0.32 * glatt(0.0, 0.14, xn); // Ferse rund
    var zehe  = 1 - glatt(0.72, 1.0, xn) * 0.5;      // Zehe schmaler
    return ferse * zehe;
  }
  function verjuengen(g){
    var pos = g.attributes.position;
    for (var i=0; i<pos.count; i++){
      var x = pos.getX(i), z = pos.getZ(i);
      pos.setZ(i, z * breiteBei(x));
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
  }
  function extrude(shape, tiefe, fase, formen){
    var g = new THREE.ExtrudeGeometry(shape, {
      depth: tiefe, bevelEnabled: true, bevelThickness: fase,
      bevelSize: fase, bevelSegments: 5, steps: 1, curveSegments: 28
    });
    g.translate(0, 0, -tiefe/2);
    if (formen !== false) { verjuengen(g); }
    g.computeVertexNormals();
    return g;
  }

  var FINISH = {
    glatt:   { roughness:0.5,  clearcoat:0.35, clearcoatRoughness:0.35 },
    velours: { roughness:0.96, clearcoat:0.0,  clearcoatRoughness:0.9 },
    genarbt: { roughness:0.72, clearcoat:0.12, clearcoatRoughness:0.55 },
    lack:    { roughness:0.12, clearcoat:1.0,  clearcoatRoughness:0.06 }
  };

  function envTextur(renderer){
    // Weiches Studio-Environment aus einem Farbverlauf, damit Leder glänzt.
    var c = document.createElement('canvas'); c.width = 16; c.height = 128;
    var x = c.getContext('2d');
    var g = x.createLinearGradient(0,0,0,128);
    g.addColorStop(0,'#ffffff'); g.addColorStop(0.5,'#e9e2d4'); g.addColorStop(1,'#8f877a');
    x.fillStyle = g; x.fillRect(0,0,16,128);
    var tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    var pmrem = new THREE.PMREMGenerator(renderer);
    var env = pmrem.fromEquirectangular(tex).texture;
    tex.dispose(); pmrem.dispose();
    return env;
  }

  function create(canvas, opts){
    opts = opts || {};
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;

    var scene = new THREE.Scene();
    scene.environment = envTextur(renderer);

    var kamera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    kamera.position.set(0.9, 1.8, 7.0);
    kamera.lookAt(0, 0.32, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xc9bda8, 0.55));
    var key = new THREE.DirectionalLight(0xfff4e2, 1.15);
    key.position.set(3.5, 6, 4.5); key.castShadow = true;
    key.shadow.mapSize.set(1024,1024);
    key.shadow.camera.near = 1; key.shadow.camera.far = 20;
    key.shadow.camera.left=-5; key.shadow.camera.right=5; key.shadow.camera.top=5; key.shadow.camera.bottom=-5;
    key.shadow.bias = -0.0004;
    scene.add(key);
    var fill = new THREE.DirectionalLight(0xdfe6ff, 0.35); fill.position.set(-4, 2, -2); scene.add(fill);
    var rim = new THREE.DirectionalLight(0xffffff, 0.4); rim.position.set(-1, 2.5, -5); scene.add(rim);

    // Boden nur fuer Schatten
    var boden = new THREE.Mesh(
      new THREE.PlaneGeometry(30,30),
      new THREE.ShadowMaterial({ opacity: 0.16 })
    );
    boden.rotation.x = -Math.PI/2; boden.position.y = 0; boden.receiveShadow = true;
    scene.add(boden);

    var gruppe = new THREE.Group();
    gruppe.position.y = 0.02;
    scene.add(gruppe);

    var lederMat = new THREE.MeshPhysicalMaterial({ color:0x1c1a17, roughness:0.5, metalness:0.0, clearcoat:0.35, clearcoatRoughness:0.35, envMapIntensity:0.75 });
    var sohleMat = new THREE.MeshStandardMaterial({ color:0x3a2c1e, roughness:0.85, metalness:0.0 });
    var schnuerMat = new THREE.MeshStandardMaterial({ color:0x1a1712, roughness:0.7 });

    var oberMesh=null, sohleMesh=null, schnuerGruppe=null, aktuelleForm=null;

    function baue(form){
      if (form === aktuelleForm) { return; }
      aktuelleForm = form;
      if (oberMesh){ gruppe.remove(oberMesh); oberMesh.geometry.dispose(); }
      if (sohleMesh){ gruppe.remove(sohleMesh); sohleMesh.geometry.dispose(); }
      if (schnuerGruppe){ gruppe.remove(schnuerGruppe); }

      var hoch = (form === 'boot');
      var breite = 1.55;
      var ober = extrude(hoch ? profilHoch() : profilNiedrig(), breite, 0.2);
      oberMesh = new THREE.Mesh(ober, lederMat);
      oberMesh.castShadow = true;
      gruppe.add(oberMesh);

      var sg = extrude(sohlenProfil(), breite + 0.14, 0.06);
      sohleMesh = new THREE.Mesh(sg, sohleMat);
      sohleMesh.position.y = -0.02; sohleMesh.castShadow = true;
      gruppe.add(sohleMesh);

      // Schnuerung / Riemen je Modell
      schnuerGruppe = new THREE.Group();
      if (form === 'loafer'){
        var rb = breiteBei(0.5) * breite + 0.05;
        var riemen = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, rb), schnuerMat);
        riemen.position.set(0.55, 0.8, 0); riemen.castShadow = true;
        schnuerGruppe.add(riemen);
      } else {
        // Schnuerbereich am Rist: paar Querriemen, Breite folgt dem Leisten
        for (var i=0;i<4;i++){
          var xx = -0.1 + i*0.26;
          var lb = breiteBei(xx) * breite - 0.16;
          var l = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, lb), schnuerMat);
          l.position.set(xx, 0.9 - i*0.035, 0);
          l.rotation.z = -0.16;
          l.castShadow = true;
          schnuerGruppe.add(l);
        }
      }
      gruppe.add(schnuerGruppe);
    }

    function setColor(hex, finish){
      lederMat.color.set(hex);
      var f = FINISH[finish] || FINISH.glatt;
      lederMat.roughness = f.roughness;
      lederMat.clearcoat = f.clearcoat;
      lederMat.clearcoatRoughness = f.clearcoatRoughness;
      lederMat.envMapIntensity = (finish === 'lack') ? 0.5 : (finish === 'velours' ? 0.35 : 0.75);
      // Sohle harmoniert dezent mit der Lederfarbe
      var c = new THREE.Color(hex);
      var dunkel = (c.r + c.g + c.b) < 0.9;
      sohleMat.color.set(dunkel ? 0x2a2018 : 0x4a3626);
      lederMat.needsUpdate = true;
      bedarf = true;
    }

    baue('oxford');

    // Interaktion: ziehen dreht, sonst sanfte Eigendrehung
    var zielY = -0.28, istY = -0.28, istX = 0.02, zielX = 0.02;
    var autodreh = true, ziehen = false, letzteX = 0, letzteY = 0;
    var sichtbar = true, bedarf = true;

    function onDown(e){
      ziehen = true; autodreh = false;
      var p = e.touches ? e.touches[0] : e;
      letzteX = p.clientX; letzteY = p.clientY;
    }
    function onMove(e){
      if (!ziehen) { return; }
      var p = e.touches ? e.touches[0] : e;
      zielY += (p.clientX - letzteX) * 0.01;
      zielX += (p.clientY - letzteY) * 0.006;
      zielX = Math.max(-0.35, Math.min(0.6, zielX));
      letzteX = p.clientX; letzteY = p.clientY;
      bedarf = true;
    }
    function onUp(){ ziehen = false; }
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown, {passive:true});
    canvas.addEventListener('touchmove', onMove, {passive:true});
    canvas.addEventListener('touchend', onUp);

    function groesse(){
      var w = canvas.clientWidth || 400, h = canvas.clientHeight || 400;
      if (canvas.width !== w || canvas.height !== h){
        renderer.setSize(w, h, false);
        kamera.aspect = w/h; kamera.updateProjectionMatrix();
      }
    }

    function tick(){
      requestAnimationFrame(tick);
      if (!sichtbar) { return; }
      if (autodreh) { zielY += 0.0032; bedarf = true; }
      var ny = istY + (zielY - istY) * 0.12;
      var nx = istX + (zielX - istX) * 0.12;
      if (Math.abs(ny-istY) > 0.0001 || Math.abs(nx-istX) > 0.0001) { bedarf = true; }
      istY = ny; istX = nx;
      gruppe.rotation.y = istY;
      gruppe.rotation.x = istX;
      if (bedarf){ groesse(); renderer.render(scene, kamera); bedarf = false; }
    }
    tick();

    if ('IntersectionObserver' in window){
      new IntersectionObserver(function(es){
        sichtbar = es[0].isIntersecting;
        if (sichtbar) bedarf = true;
      }, {threshold:0.05}).observe(canvas);
    }
    // Nach kurzer Ruhe wieder sanft drehen
    var ruheTimer=null;
    function ruhePlanen(){ if(ruheTimer) clearTimeout(ruheTimer); ruheTimer=setTimeout(function(){autodreh=true;},3500); }
    canvas.addEventListener('mouseup', ruhePlanen);
    canvas.addEventListener('touchend', ruhePlanen);

    return {
      setColor: setColor,
      setModel: function(form){ baue(form); bedarf = true; },
      _hex: function(h,f){ setColor(h,f); }
    };
  }

  window.SchuhDreiD = { create: create };
})();
