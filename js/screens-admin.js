/* Dashboard admin: pantau pembayaran, cek bukti yang diunggah, verifikasi / tolak. */
Object.assign(V,{
admin:()=>{const d=DB(),T=d.tx,ok=T.filter(t=>stOf(t)=='paid'),pend=T.filter(t=>stOf(t)=='pending'),
 gmv=ok.reduce((s,t)=>s+t.tot,0),rev=ok.reduce((s,t)=>s+t.f,0),us=d.users.filter(u=>u.role=='user'),
 F=[['pending','Menunggu'],['paid','Lunas'],['rejected','Ditolak'],['x','Batal'],['all','Semua']],
 L=T.filter(t=>S.af=='all'||stOf(t)==S.af).reverse();
return `<div class="top sat pd"><div class="row sp"><div><p style="font-size:12px;color:#9a9d90">Admin</p><h1 style="font-size:28px">Dashboard</h1></div><button class="chip" onclick="logout()">Keluar</button></div>
<div class="info" style="margin-bottom:0"><div><span class="mut">Menunggu verifikasi</span><b style="font-size:24px">${pend.length}</b></div><div><span class="mut">Lunas</span><b style="font-size:24px">${ok.length}</b></div><div><span class="mut">GMV (lunas)</span><b style="font-size:17px">${rp(gmv)}</b></div><div><span class="mut">Pendapatan (fee 10%)</span><b style="font-size:17px">${rp(rev)}</b></div></div></div>
<div class="pd"><div class="row sp sec"><h2>Pembayaran</h2><button class="tag" onclick="csv()">⬇ CSV</button></div></div>
<div class="chips">${F.map(f=>`<button class="chip ${S.af==f[0]?'on':''}" onclick="S.af='${f[0]}';draw()">${f[1]} ${f[0]=='all'?T.length:T.filter(t=>stOf(t)==f[0]).length}</button>`).join('')}</div>
<div class="pd" style="margin-top:16px">
${L.length?L.map(t=>{const s=stOf(t);return `<div class="card" style="display:block;padding:14px 16px"><div class="row sp"><b>${t.uname}</b><b>${t.tot?rp(t.tot):'Gratis'}</b></div><div class="mut">${ACT.find(x=>x.id==t.aid).n} · ${t.q} orang</div><div class="mut">${t.who.hp}</div><div class="row sp" style="margin-top:6px"><span class="mut">${t.no} · ${t.paid}</span><span class="tag ${s=='paid'?'':'d'}">${STL[s]}</span></div>
${s=='rejected'&&t.note?`<div class="mut" style="margin-top:6px">Alasan: ${t.note}</div>`:''}
${t.proof?`<div class="row" style="margin-top:12px"><button class="btn ghost" style="padding:10px" onclick="viewProof('${t.no}')">🧾 Bukti</button>${s=='pending'?`<button class="btn lime" style="padding:10px" onclick="setSt('${t.no}','paid')">✓ Verifikasi</button><button class="btn" style="padding:10px;background:var(--red)" onclick="setSt('${t.no}','rejected')">✕ Tolak</button>`:''}</div>`:''}</div>`}).join(''):'<p class="mut" style="text-align:center;padding:30px 0">Tidak ada transaksi di sini 🙈</p>'}
<div class="sec"><h2>Pengguna (${us.length})</h2></div>
${us.map(u=>`<div class="card" style="padding:12px 16px"><div style="flex:1"><h3>${u.nm}</h3><span class="mut">${u.em}</span></div><span class="tag d">${d.tx.filter(t=>t.uid==u.id).length} trx</span></div>`).join('')}
<button class="btn ghost" style="margin-top:8px" onclick="resetDemo()">Reset data</button></div>`}
});
function viewProof(no){const t=DB().tx.find(x=>x.no==no);if(!t||!t.proof)return toast('Bukti tidak ada');const s=stOf(t);
  sheet(`<h2>Bukti pembayaran</h2><p class="mut" style="margin-top:4px">${t.uname} · ${t.no}</p><p style="margin:6px 0"><b>${t.tot?rp(t.tot):'Gratis'}</b> <span class="mut">· ${STL[s]}</span></p><img src="${t.proof}" alt="Bukti" style="width:100%;max-height:50vh;object-fit:contain;border-radius:16px;margin:10px 0;background:#fff">
  ${s=='pending'?`<button class="btn lime" onclick="setSt('${t.no}','paid')">✓ Verifikasi (LUNAS)</button><button class="btn" style="margin-top:10px;background:var(--red)" onclick="setSt('${t.no}','rejected')">✕ Tolak</button>`:''}<button class="btn ghost" style="margin-top:10px" onclick="$('o').innerHTML=''">Tutup</button>`)}
function setSt(no,st){const d=DB(),t=d.tx.find(x=>x.no==no);if(!t)return;
  if(st=='rejected'){const n=prompt('Alasan penolakan (tampil ke pengguna):','Bukti tidak sesuai nominal');if(n===null)return;t.note=n}
  t.st=st;save(d);$('o').innerHTML='';toast(st=='paid'?'Pembayaran diverifikasi ✓':'Pembayaran ditolak');draw()}
function csv(){const q=s=>'"'+String(s).replace(/"/g,'""')+'"',r=[['No','Tanggal','Nama','No HP','Kegiatan','Jumlah','Harga','Biaya layanan','Total','Status','Bukti'].join(',')];
  DB().tx.forEach(t=>r.push([t.no,t.paid,t.uname,t.who.hp,ACT.find(x=>x.id==t.aid).n,t.q,t.sub,t.f,t.tot,STL[stOf(t)],t.proof?'ADA':'-'].map(q).join(',')));
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+r.join('\n')],{type:'text/csv'}));a.download='transaksi-sportyfy.csv';a.click()}
function resetDemo(){ls.del(KEY);seed();toast('Data direset');draw()}
