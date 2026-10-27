/* Dashboard admin: hanya akun admin yang melihat semua transaksi. */
Object.assign(V,{
admin:()=>{const d=DB(),ok=d.tx.filter(t=>!t.x),gmv=ok.reduce((s,t)=>s+t.tot,0),rev=ok.reduce((s,t)=>s+t.f,0),us=d.users.filter(u=>u.role=='user');
return `<div class="top sat pd"><div class="row sp"><div><p style="font-size:12px;color:#9a9d90">Admin</p><h1 style="font-size:28px">Dashboard</h1></div><button class="chip" onclick="logout()">Keluar</button></div>
<div class="info" style="margin-bottom:0"><div><span class="mut">Transaksi</span><b style="font-size:24px">${ok.length}</b></div><div><span class="mut">Pengguna</span><b style="font-size:24px">${us.length}</b></div><div><span class="mut">GMV</span><b style="font-size:17px">${rp(gmv)}</b></div><div><span class="mut">Pendapatan (fee 10%)</span><b style="font-size:17px">${rp(rev)}</b></div></div></div>
<div class="pd"><div class="row sp sec"><h2>Semua transaksi</h2><button class="tag" onclick="csv()">⬇ CSV</button></div>
${d.tx.slice().reverse().map(t=>`<div class="card" style="display:block;padding:14px 16px"><div class="row sp"><b>${t.uname}</b><b>${t.tot?rp(t.tot):'Gratis'}</b></div><div class="mut">${ACT.find(x=>x.id==t.aid).n} · ${t.q} orang</div><div class="row sp" style="margin-top:6px"><span class="mut">${t.no} · ${t.paid}</span><span class="tag ${t.x?'d':''}">${t.x?'BATAL':'LUNAS'}</span></div></div>`).join('')}
<div class="sec"><h2>Pengguna (${us.length})</h2></div>
${us.map(u=>`<div class="card" style="padding:12px 16px"><div style="flex:1"><h3>${u.nm}</h3><span class="mut">${u.em}</span></div><span class="tag d">${d.tx.filter(t=>t.uid==u.id).length} trx</span></div>`).join('')}
<button class="btn ghost" style="margin-top:8px" onclick="resetDemo()">Reset data</button></div>`}
});
function csv(){const q=s=>'"'+String(s).replace(/"/g,'""')+'"',r=[['No','Tanggal','Nama','No HP','Kegiatan','Jumlah','Harga','Biaya layanan','Total','Status'].join(',')];
  DB().tx.forEach(t=>r.push([t.no,t.paid,t.uname,t.who.hp,ACT.find(x=>x.id==t.aid).n,t.q,t.sub,t.f,t.tot,t.x?'BATAL':'LUNAS'].map(q).join(',')));
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+r.join('\n')],{type:'text/csv'}));a.download='transaksi-sportyfy.csv';a.click()}
function resetDemo(){ls.del(KEY);seed();toast('Data direset');draw()}
