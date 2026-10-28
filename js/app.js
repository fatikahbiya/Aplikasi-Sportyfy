const exl=()=>{const q=S.q.toLowerCase(),L=ACT.filter(a=>(S.cat=='Semua'||SP[a.s][0]==S.cat)&&(a.n+a.l).toLowerCase().includes(q));return L.length?L.map(card).join(''):'<p class="mut" style="text-align:center;padding:40px 0">Belum ada hasil 🙈</p>'};
const lst=()=>{$('lst').innerHTML=exl()};
const IC={home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',explore:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>',bookings:'<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/>',community:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6M17 5a3.5 3.5 0 0 1 0 7M22 20c0-3-2-5-4-5.5"/>',profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/>'};
const LB={home:'Beranda',explore:'Explore',bookings:'Booking',community:'Komunitas',profile:'Profil'};
function draw(){const v=$('v'),k=S.scr;v.innerHTML=V[k]();v.className='';void v.offsetWidth;v.className=S.dir;
  $('n').style.display=MAIN.includes(k)?'flex':'none';$('n').innerHTML=Object.keys(LB).map(x=>`<button class="${x==k?'on':''}" onclick="tab('${x}')"><svg viewBox="0 0 24 24">${IC[x]}</svg>${LB[x]}</button>`).join('');v.scrollTop=0}
function go(s){S.st.push(S.scr);S.scr=s;S.dir='fwd';draw()}
function back(){S.scr=S.st.pop()||'home';S.dir='bwd';draw()}
function tab(s){if(s==S.scr)return;S.st=[];S.scr=s;S.dir='fade';if(s=='explore')S.q='';draw()}
function open_(id){S.a=ACT.find(x=>x.id==id);go('detail')}
function login(){let em=($('em').value||'').trim().toLowerCase();const pw=$('pw').value||'',nm=($('nm')?$('nm').value:'').trim(),d=DB();let u;
  if(em=='admin@sportyfy.id'){if(pw!='admin123')return toast('Password admin salah');return enterApp(d.users.find(x=>x.role=='admin'))}
  if(!em&&nm)em=nm.toLowerCase().replace(/\s+/g,'.')+'@mail.com';
  if(em&&!em.includes('@'))em+='@mail.com';
  if(em){u=d.users.find(x=>x.em==em&&x.role=='user');
    if(!u){const b=em.split('@')[0].replace(/[._-]+/g,' ');u={id:'u'+Date.now(),nm:nm||b.replace(/\b\w/g,c=>c.toUpperCase()),em,pw,role:'user'};d.users.push(u);save(d)}}
  else{const pool=d.users.filter(x=>x.role=='user');u=pool[Math.floor(Math.random()*pool.length)]}
  enterApp(u)}
function enterApp(u){enter(u);S.st=[];S.scr=u.role=='admin'?'admin':'home';S.dir='fade';draw()}
function logout(){ls.del('spf_me');S.me=null;S.bk=[];S.st=[];S.scr='auth';S.mode='in';S.dir='fade';draw()}
function sheet(h){$('o').innerHTML=`<div class="ov"><div>${h}</div></div>`}
function startPay(){const d=S.idn;
  if(d.nm.trim().length<3)return toast('Isi nama lengkap dulu');
  if(!/^(\+62|62|0)8\d{7,12}$/.test(d.hp.replace(/[\s-]/g,'')))return toast('No. HP tidak valid');
  if(d.em&&!/^\S+@\S+\.\S+$/.test(d.em))return toast('Email tidak valid');
  if(d.nik.replace(/\s/g,'').length<8)return toast('Isi nomor identitas');
  if(!S.tot)return finish();S.left=900;S.proof=null;go('qris');clearInterval(S.tm);S.tm=setInterval(()=>{S.left--;const c=$('cd');if(S.scr!='qris'||S.left<=0){clearInterval(S.tm);if(S.left<=0&&S.scr=='qris'){toast('Waktu habis');back()}return}c.textContent=Math.floor(S.left/60)+':'+String(S.left%60).padStart(2,'0')},1000)}
const proofPrevHtml=()=>S.proof?`<img src="${S.proof}" alt="Bukti bayar" style="width:100%;max-height:240px;object-fit:contain;border-radius:14px;margin-top:12px;background:#fff"><p class="mut" style="margin-top:6px">✓ Bukti siap dikirim</p>`:'';
function pickProof(inp){const f=inp.files&&inp.files[0];if(!f)return;
  if(!f.type.startsWith('image/'))return toast('File harus berupa gambar');
  const r=new FileReader();r.onerror=()=>toast('Gagal membaca file');
  r.onload=()=>{const im=new Image();im.onerror=()=>toast('Gambar tidak bisa dibuka');
    im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
      const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);
      S.proof=c.toDataURL('image/jpeg',.65);const p=$('pv');if(p)p.innerHTML=proofPrevHtml();toast('Bukti terpilih')};
    im.src=r.result};
  r.readAsDataURL(f);inp.value=''}
function cancelPay(){clearInterval(S.tm);back()}
function confirmPay(){if(!S.proof)return toast('Unggah bukti pembayaran dulu');clearInterval(S.tm);sheet('<div class="spin"></div><h2>Mengirim bukti…</h2><p class="mut" style="margin-top:6px">Mohon tunggu sebentar</p>');setTimeout(()=>{$('o').innerHTML='';finish()},1800)}
function finish(){const sub=S.a.p*S.qty,d=new Date(),z=n=>String(n).padStart(2,'0');
  S.bk.push({a:S.a,q:S.qty,x:0,st:S.tot?'pending':'paid',proof:S.tot?S.proof:null,who:{...S.idn},sub,f:S.tot-sub,tot:S.tot,paid:d.toLocaleString('id-ID',{dateStyle:'long',timeStyle:'short'}),
    no:'SPF-'+String(d.getFullYear()).slice(2)+z(d.getMonth()+1)+z(d.getDate())+'-'+(1000+Math.floor(Math.random()*9000))});
  S.ci=S.bk.length-1;saveTx(S.bk[S.ci]);S.proof=null;S.st=[];S.scr='done';S.dir='fwd';draw()}
function askCancel(i){sheet(`<div style="font-size:44px">🤔</div><h2 style="margin:8px 0 6px">Batalkan booking ini?</h2><p class="mut" style="margin-bottom:20px">Gratis jika lebih dari 24 jam sebelum mulai.</p><button class="btn" style="background:var(--red)" onclick="cancelBk(${i});$('o').innerHTML='';toast('Booking dibatalkan');draw()">Ya, batalkan</button><button class="btn ghost" style="margin-top:10px" onclick="$('o').innerHTML=''">Tidak jadi</button>`)}
$('o').addEventListener('click',e=>{if(e.target.classList.contains('ov'))$('o').innerHTML=''});
restore();draw();setTimeout(()=>{S.scr=S.me?(S.me.role=='admin'?'admin':'home'):'onboard';S.dir='fade';draw()},1500);

/* Desktop: skala kanvas HP supaya pas di tinggi layar. Di HP: layar penuh. */
function fit(){const r=document.querySelector('.app');if(innerWidth<600){r.style.removeProperty('--s');return}
  r.style.setProperty('--s',Math.min((innerHeight-30)/844,(innerWidth-30)/390,1.5).toFixed(3))}
addEventListener('resize',fit);fit();

/* PWA: daftarkan service worker (hanya jalan di https / localhost) */
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
