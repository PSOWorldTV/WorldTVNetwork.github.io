(function(){
  const loader=document.getElementById('loader'),
        app=document.getElementById('app');
  const root=document.documentElement,
        modeBtn=document.getElementById('modeBtn'),
        modeIcon=document.getElementById('modeIcon');
  const mediaBtn=document.getElementById('mediaBtn'),
        mediaBubble=document.getElementById('mediaBubble');
  const THEME_KEY='psow_world_theme_light';

  function applyTheme(isLight){
    if(isLight) root.classList.add('light');
    else root.classList.remove('light');
    localStorage.setItem(THEME_KEY,isLight?'1':'0');
    modeIcon.textContent=isLight?'🌙':'☀️';
  }
  const saved=localStorage.getItem(THEME_KEY);
  applyTheme(saved==='1');
  modeBtn.addEventListener('click',()=>applyTheme(!root.classList.contains('light')));

  function isSupportedMobile(){
    const ua=navigator.userAgent||navigator.vendor||window.opera||'';
    return /Android|iPhone|iPod/i.test(ua);
  }
  function showUnsupportedOverlay(){
    const overlay=document.createElement('div');
    overlay.id='unsupportedOverlay';
    overlay.textContent='Please use your Phone (iOS or Android).';
    Object.assign(overlay.style,{
      position:'fixed',inset:0,display:'flex',alignItems:'center',
      justifyContent:'center',backdropFilter:'blur(12px)',color:'var(--fg)',
      fontFamily:'-apple-system',fontSize:'18px',background:'rgba(0,0,0,0.5)',
      zIndex:'200'
    });
    document.body.appendChild(overlay);
  }

  // --- Media Bubble Toggle ---
  let bubbleOpen=false;
  mediaBtn.addEventListener('click',()=>{
    bubbleOpen=!bubbleOpen;
    mediaBubble.classList.toggle('show',bubbleOpen);
  });
  document.addEventListener('click',e=>{
    if(bubbleOpen && !mediaBtn.contains(e.target) && !mediaBubble.contains(e.target)){
      bubbleOpen=false;
      mediaBubble.classList.remove('show');
    }
  });

  window.addEventListener('load',()=>{
    setTimeout(()=>{
      loader.style.opacity='0';
      setTimeout(()=>{
        loader.remove();
        app.hidden=false;
        if(!isSupportedMobile()) showUnsupportedOverlay();
      },200);
    },2000);
  });
})();
