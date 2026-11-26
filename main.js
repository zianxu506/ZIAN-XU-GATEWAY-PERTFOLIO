(() => {
  'use strict';
  const body = document.body;
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const byId = id => document.getElementById(id);
  const chapters = all('.chapter');
  const index = byId('index-dialog');
  const lightbox = byId('lightbox');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = chapters[0], mode = 'directory', exploreY = 0, previousFocus;
  let scale = 1, fitWidth = 0;
  body.classList.add('js');
  function close(dialog) { if (dialog.open) dialog.close(); }
  function setMode(next, scroll = true) {
    if (mode === 'explore') exploreY = window.scrollY;
    const changed = next !== mode;
    mode = next; body.dataset.mode = next;
    all('.mode').forEach(button => {
      const active = button.dataset.mode === next;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    close(index);
    if (scroll) {
      if (next === 'directory') byId('directory').scrollIntoView({behavior:'smooth'});
      else if (changed && exploreY > 0) window.scrollTo({top:exploreY,behavior:reduced.matches?'instant':'smooth'});
      else current.scrollIntoView({behavior:'smooth'});
    }
    updateProgress();
  }
  function jump(id, push = true) {
    const target = byId(id); if (!target) return;
    if (target.closest('#journey')) setMode('explore', false);
    const parent = target.closest('.chapter'); if (parent) current = parent;
    close(index);
    if (push) history.pushState(null, '', '#' + id);
    requestAnimationFrame(() => target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'}));
  }
  function openIndex() { previousFocus = document.activeElement; index.showModal(); }
  all('.index-trigger').forEach(button => button.addEventListener('click', openIndex));
  document.addEventListener('click', event => {
    const modeButton = event.target.closest('[data-mode]');
    if (modeButton && modeButton !== body) { event.preventDefault(); setMode(modeButton.dataset.mode); history.pushState(null,'',modeButton.dataset.mode === 'directory'?'#directory':'#'+current.id); }
    const link = event.target.closest('[data-jump]');
    if (link) { event.preventDefault(); jump(link.dataset.jump); }
    const closer = event.target.closest('[data-close]');
    if (closer) close(byId(closer.dataset.close));
    const zoom = event.target.closest('.zoom');
    if (zoom) {
      previousFocus = zoom; scale = 1;
      const img = byId('lightbox-image');
      img.onload = () => { fit(); };
      img.src = zoom.dataset.src; img.alt = zoom.dataset.label;
      byId('lightbox-title').textContent = zoom.dataset.label;
      byId('open-image').href = zoom.dataset.src;
      lightbox.showModal();
      if (img.complete) requestAnimationFrame(fit);
    }
  });
  [index,lightbox].forEach(dialog => {
    dialog.addEventListener('click', e => { if(e.target===dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) close(dialog); } });
    dialog.addEventListener('close', () => { if(previousFocus?.isConnected) previousFocus.focus({preventScroll:true}); });
  });
  function fit() {
    const stage = byId('lightbox-stage'), img = byId('lightbox-image');
    if(!img.naturalWidth) return;
    fitWidth = Math.min(stage.clientWidth - 8, (stage.clientHeight - 40) * img.naturalWidth / img.naturalHeight);
    renderZoom();
  }
  function renderZoom() {
    byId('lightbox-image').style.width = Math.max(1,fitWidth*scale)+'px';
    byId('zoom-reset').textContent = scale === 1 ? 'Fit' : Math.round(scale*100)+'%';
  }
  function zoomBy(amount) { scale=Math.min(6,Math.max(1,scale+amount));renderZoom(); }
  byId('zoom-in').onclick=()=>zoomBy(.5);
  byId('zoom-out').onclick=()=>zoomBy(-.5);
  byId('zoom-reset').onclick=()=>{scale=1;fit();};
  window.addEventListener('resize',()=>{if(lightbox.open)fit();});
  const preview=byId('directory-preview');
  all('.directory-item').forEach(row=>{
    row.addEventListener('pointerenter',event=>{if(event.pointerType!=='mouse')return;preview.src=row.dataset.preview;preview.classList.add('visible');});
    row.addEventListener('pointermove',event=>{preview.style.left=Math.min(event.clientX+28,innerWidth-265)+'px';preview.style.top=Math.max(90,Math.min(event.clientY-90,innerHeight-210))+'px';});
    row.addEventListener('pointerleave',()=>preview.classList.remove('visible'));
    row.addEventListener('click',()=>preview.classList.remove('visible'));
  });
  let pending=false;
  function updateProgress() {
    if(mode!=='explore')return;
    let best=chapters[0];
    for(const chapter of chapters)if(chapter.getBoundingClientRect().top<=innerHeight*.35)best=chapter;
    current=best;
    byId('current-chapter').textContent=String(best.dataset.chapter).padStart(2,'0')+' / 09';
    const rect=best.getBoundingClientRect();
    const fraction=Math.max(0,Math.min(1,(innerHeight*.35-rect.top)/Math.max(1,rect.height-innerHeight*.35)));
    byId('progress-fill').style.height=(fraction*100)+'%';
  }
  window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;updateProgress();});}},{passive:true});
  document.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.metaKey||event.altKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||event.target.isContentEditable)return;
    if(lightbox.open){if(event.key==='+'||event.key==='='){event.preventDefault();zoomBy(.5);}if(event.key==='-'){event.preventDefault();zoomBy(-.5);}return;}
    if(index.open)return;
    if(/^[1-9]$/.test(event.key)){event.preventDefault();jump(chapters[Number(event.key)-1].id);}
    else if(event.key.toLowerCase()==='i'){event.preventDefault();openIndex();}
    else if(event.key.toLowerCase()==='e'){event.preventDefault();setMode('explore');}
    else if(event.key==='0'||event.key.toLowerCase()==='d'){event.preventDefault();setMode('directory');history.pushState(null,'','#directory');}
    else if(mode==='directory'&&['ArrowDown','ArrowUp'].includes(event.key)){
      event.preventDefault();const rows=all('.directory-link');const active=rows.indexOf(document.activeElement);
      rows[(active+(event.key==='ArrowDown'?1:-1)+rows.length)%rows.length].focus();
    }
  });
  function route() {
    const id=decodeURIComponent(location.hash.slice(1));
    if(id==='directory'){setMode('directory',false);requestAnimationFrame(()=>byId(id).scrollIntoView());}
    else if(id && byId(id))jump(id,false);
    else setMode('directory',false);
  }
  window.addEventListener('popstate',route);
  setMode('directory',false);route();
})();
