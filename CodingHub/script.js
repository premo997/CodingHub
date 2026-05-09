/* ── CURSOR ── */
const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let cx=0,cy=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY;cur.style.left=cx+'px';cur.style.top=cy+'px';});
(function animRing(){rx+=(cx-rx)*.12;ry+=(cy-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();
document.querySelectorAll('a,button,.lang-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='16px';cur.style.height='16px';ring.style.width='44px';ring.style.height='44px';});
  el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';ring.style.width='32px';ring.style.height='32px';});
});

/* ── SCROLL PROGRESS ── */
window.addEventListener('scroll',()=>{
  const p=document.documentElement;
  document.getElementById('progress').style.width=(p.scrollTop/(p.scrollHeight-p.clientHeight)*100)+'%';
});

/* ── HAMBURGER ── */
document.getElementById('ham').addEventListener('click',function(){
  this.classList.toggle('open');
});

/* ── SEARCH ── */
const topics={
  html:['HTML Basics','HTML Tags','HTML Forms','HTML Tables','HTML Semantic','HTML Links','HTML Images','HTML Lists'],
  css:['CSS Selectors','CSS Flexbox','CSS Grid','CSS Animations','CSS Variables','CSS Media Queries','CSS Box Model'],
  js:['JS Variables','JS Functions','JS Arrays','JS Objects','JS DOM','JS Events','JS ES6','JS Promises','JS Async/Await'],
  'js-advanced':['JS Closures','JS Prototypes','JS Modules','JS Fetch API','JS Design Patterns','JS Event Loop'],
  python:['Python Basics','Python Loops','Python Functions','Python OOP','Python File I/O','Python Modules'],
  'python-advanced':['Python Decorators','Python Generators','Python Async','Python NumPy','Python Pandas'],
  sql:['SQL SELECT','SQL WHERE','SQL JOIN','SQL GROUP BY','SQL INSERT','SQL UPDATE','SQL DELETE'],
  'sql-advanced':['SQL Window Functions','SQL CTEs','SQL Stored Procedures','SQL Indexes','SQL Transactions']
};

function doSearch(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();
  const res=document.getElementById('searchResults');
  if(!q){res.style.display='none';return;}
  const matches=[];
  Object.entries(topics).forEach(([lang,items])=>{
    items.forEach(item=>{
      if(item.toLowerCase().includes(q)||lang.includes(q)){
        matches.push({lang,item});
      }
    });
  });
  if(matches.length){
    res.innerHTML=matches.slice(0,12).map(m=>
      `<a class="search-tag" href="notes.html?lang=${m.lang}&topic=${encodeURIComponent(m.item)}">${m.item} <span style="opacity:.5;font-size:.65rem">(${m.lang})</span></a>`
    ).join('');
    res.style.display='flex';
  } else {
    res.innerHTML='<span class="search-tag" style="color:var(--muted)">No results found</span>';
    res.style.display='flex';
  }
}
document.getElementById('searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')doSearch();});
document.getElementById('searchInput').addEventListener('input',e=>{if(!e.target.value)document.getElementById('searchResults').style.display='none';});

function appendMsg(text,type){
  const msgs=document.getElementById('chatMsgs');
  const div=document.createElement('div');
  div.className='msg '+type;
  div.innerHTML=text;
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;

  return div;
}

(function () {
    emailjs.init("tD9tv_r87yaM7n_PI");
})();

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_ivzehsa", "template_o79x47w", this)
        .then(function () {
            alert("✅ Message sent successfully!");
            form.reset();
        })
        .catch(function (error) {
            console.error("FAILED...", error);
            alert("❌ Failed to send message. Check console.");
        });
});