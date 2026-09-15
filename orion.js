const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];

const state={grid:true,scan:true,pulse:true,ambient:true};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function tick(){const d=new Date();const t=d.toISOString().slice(11,19);$('#utc').textContent=`UTC ${t}`;$('#clock').textContent=t;const load=58+Math.random()*13;$('#load').textContent=`${load.toFixed(1)}%`;$('#latency').textContent=`${Math.round(15+Math.random()*9)} ms`;$('#nodes').textContent=(18390+Math.round(Math.random()*170)).toLocaleString();$('#coherence').textContent=`${(98.2+Math.random()*.7).toFixed(2)}%`)}
setInterval(tick,1000);tick();

const bars=$('#energyBars');for(let i=0;i<28;i++){const e=document.createElement('i');e.style.setProperty('--h',`${20+Math.random()*80}%`);e.style.animationDelay=`${Math.random()*1.6}s`;bars.append(e)}

const telemetry=[['CORE TEMPERATURE','41.8 °C','NOMINAL'],['PROCESSING THROUGHPUT','8.42 PFLOPS','STABLE'],['NETWORK LATENCY','18 ms','WITHIN TARGET'],['POWER RESERVE','94.7%','STABLE'],['SENSOR FUSION','97.6%','ACTIVE'],['FAIL-SAFE STATE','ARMED','READY']];
$('#telemetryGrid').innerHTML=telemetry.map(([a,b,c])=>`<article><h3>${a}</h3><p><strong>${b}</strong></p><p>${c}</p><div class="spark"></div></article>`).join('');
const regions=['NORTH ATLANTIC','NORTH AMERICA','EUROPE','AFRICA','ASIA PACIFIC','SOUTH AMERICA','POLAR ORBIT','DEEP SPACE'];
$('#networkGrid').innerHTML=regions.map((r,i)=>`<article><h3>${r}</h3><p>NODE FABRIC // ${String(140+i*37).padStart(4,'0')}</p><p>LINK HEALTH <strong>${(99.2+Math.random()*.75).toFixed(2)}%</strong></p><p>PACKET FLOW ${Math.round(420+Math.random()*380)} GB/s</p><div class="spark"></div></article>`).join('');

$$('.nav').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.view;$$('.nav').forEach(x=>x.classList.toggle('active',x===btn));$$('.view').forEach(v=>v.classList.toggle('active-view',v.id===id));window.scrollTo({top:0,behavior:'smooth'})}));

$$('[data-toggle]').forEach(btn=>btn.addEventListener('click',()=>{const key=btn.dataset.toggle;state[key]=!state[key];btn.classList.toggle('on',state[key]);btn.querySelector('b').textContent=state[key]?'ON':'OFF';if(key==='scan')$('.scanlines').style.display=state[key]?'block':'none';if(key==='grid')document.body.style.setProperty('--grid-alpha',state[key]?'1':'0');if(key==='ambient')document.body.classList.toggle('low-fx',!state[key]);if(key==='pulse')$('.eye-wrap').classList.toggle('static-core',!state[key])}));

// Respect reduced-motion preferences without disabling the console.
if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.style.setProperty('scroll-behavior','auto');
