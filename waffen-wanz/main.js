(function(){
  // Mobile nav
  var m=document.getElementById('mnav');
  var open=function(){m.classList.add('open');document.body.style.overflow='hidden';};
  var close=function(){m.classList.remove('open');document.body.style.overflow='';};
  var b=document.getElementById('burger'); if(b) b.addEventListener('click',open);
  var c=document.getElementById('mclose'); if(c) c.addEventListener('click',close);
  Array.prototype.forEach.call(document.querySelectorAll('#mnav a'),function(a){a.addEventListener('click',close);});

  // Reveal on scroll
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    Array.prototype.forEach.call(document.querySelectorAll('[data-rev]'),function(el){io.observe(el);});
  }else{Array.prototype.forEach.call(document.querySelectorAll('[data-rev]'),function(el){el.classList.add('in');});}

  // Gallery thumbs
  var main=document.querySelector('.gallery .main img');
  Array.prototype.forEach.call(document.querySelectorAll('.thumbs div'),function(t){
    t.addEventListener('click',function(){
      Array.prototype.forEach.call(document.querySelectorAll('.thumbs div'),function(x){x.classList.remove('on');});
      t.classList.add('on'); if(main) main.src=t.querySelector('img').src;
    });
  });

  // Filter chips (demo)
  Array.prototype.forEach.call(document.querySelectorAll('.chips .chip'),function(ch){
    ch.addEventListener('click',function(){Array.prototype.forEach.call(ch.parentNode.children,function(x){x.classList.remove('on');});ch.classList.add('on');});
  });

  // Demo form
  var f=document.getElementById('kform');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();f.innerHTML='<div class="info-card"><h3>Vielen Dank!</h3><p>Ihre Anfrage ist eingegangen. Wir melden uns innerhalb eines Werktags – in der Demo wird nichts versendet.</p></div>';});}
})();
