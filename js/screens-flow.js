/* Splash, Onboarding, Login/Daftar, Checkout, Bayar QRIS, Sukses */
Object.assign(V,{
splash:()=>`<div style="height:100%;background:var(--ink);display:grid;place-items:center;text-align:center;color:#fff"><div><div style="font-size:70px">🛹</div><h1 style="font-size:44px;color:var(--lime);margin-top:6px">sportyfy</h1><p class="mut" style="margin-top:10px;color:#9a9d90">Find. Join. Book. Pay. Play.</p></div></div>`,

onboard:()=>{const D=[['Temukan main-mu','Skate, badminton, futsal, lari. Semua kegiatan olahraga di kotamu satu aplikasi.','cover','🛹'],['Gabung & booking','Pilih jadwal, amankan slot, bayar cepat dengan QRIS.','hero','🎟️'],['Main bareng','Ketemu komunitas yang pas dan mulai dari level apa pun.','c1','🤝']],d=D[S.ob];
return `<div style="height:100%;position:relative;background:var(--ink);color:#fff"><div style="position:absolute;inset:0">${ph(d[2],'',d[3],'linear-gradient(145deg,#FF5A1F,#FFB020 60%,#C8FF2E)',1).replace('class="ph "','class="ph " style="width:100%;height:100%;--e:150px;--g:linear-gradient(145deg,#FF5A1F,#FFB020 60%,#C8FF2E)"')}</div>
<div style="position:absolute;z-index:5;left:0;right:0;bottom:0;padding:24px 24px calc(env(safe-area-inset-bottom,0px) + 28px)"><div class="dots">${D.map((_,i)=>`<i class="${i==S.ob?'on':''}"></i>`).join('')}</div><h1 style="font-size:40px;margin:16px 0 10px">${d[0]}</h1><p style="opacity:.8;font-size:15px;line-height:1.5;margin-bottom:24px">${d[1]}</p>
<button class="btn lime" onclick="${S.ob<2?'S.ob++;draw()':"S.mode='up';go('auth')"}">${S.ob<2?'Lanjut':'Mulai sekarang'}</button>${S.ob<2?`<button class="mut" style="display:block;margin:16px auto 0;color:#fffa" onclick="go('auth')">Lewati</button>`:''}</div></div>`},

auth:()=>{const up=S.mode=='up';return `<div class="pd sat" style="padding-bottom:30px"><div style="font-size:42px;margin-top:20px">👋</div><h1 style="margin:12px 0 6px">${up?'Buat akunmu':'Selamat datang'}</h1><p class="mut" style="margin-bottom:22px">${up?'Gratis, cuma butuh semenit.':'Masuk untuk lanjut main.'}</p>
<div class="seg"><button class="${!up?'on':''}" onclick="S.mode='in';draw()">Masuk</button><button class="${up?'on':''}" onclick="S.mode='up';draw()">Daftar</button></div>
${up?'<label class="fld"><span>NAMA</span><input id="nm" placeholder="Nama lengkap"></label>':''}<label class="fld"><span>EMAIL</span><input id="em" placeholder="kamu@email.com" type="email" autocapitalize="off"></label><label class="fld"><span>PASSWORD</span><input id="pw" placeholder="••••••••" type="password"></label>
<button class="btn" style="margin-top:14px" onclick="login()">${up?'Daftar':'Masuk'}</button></div>`},

checkout:()=>{const a=S.a,sub=a.p*S.qty,f=fee(sub);S.tot=sub+f;S.idn.nm=S.idn.nm||S.user;return `<div class="pd sat"><div class="row"><button class="rb" onclick="back()">←</button><h2>Ringkasan booking</h2></div>
<div class="card" style="margin-top:20px">${ph(a.s)}<div class="in"><h3>${a.n}</h3><p class="mut">${a.d} · ${a.t}</p><p class="mut">📍 ${a.l}</p></div></div>
<div class="card row sp" style="padding:16px 20px"><div><h3>Jumlah peserta</h3><span class="mut">Maks. 4 orang</span></div><div class="cnt"><button onclick="S.qty=Math.max(1,S.qty-1);draw()">−</button><b style="font-size:18px">${S.qty}</b><button onclick="S.qty=Math.min(4,S.qty+1);draw()">+</button></div></div>
<h2 style="margin:20px 0 10px">Identitas pemesan</h2>
<label class="fld"><span>NAMA LENGKAP (SESUAI KTP / KARTU PELAJAR)</span><input value="${S.idn.nm}" placeholder="Nama lengkap" oninput="S.idn.nm=this.value"></label>
<label class="fld"><span>NO. HP / WHATSAPP</span><input value="${S.idn.hp}" placeholder="08xxxxxxxxxx" type="tel" inputmode="tel" oninput="S.idn.hp=this.value"></label>
<label class="fld"><span>EMAIL (OPSIONAL)</span><input value="${S.idn.em}" placeholder="kamu@email.com" type="email" oninput="S.idn.em=this.value"></label>
<label class="fld"><span>NO. IDENTITAS (KTP / KTM / SIM)</span><input value="${S.idn.nik}" placeholder="Nomor identitas" inputmode="numeric" oninput="S.idn.nik=this.value"></label>
<p class="mut" style="margin:-2px 4px 0">Dipakai host untuk verifikasi saat check-in. Peserta tambahan cukup menyebut nama pemesan.</p>
<h2 style="margin:20px 0 10px">Metode bayar</h2><div class="card" style="border:2px solid var(--ink);margin:0"><div style="font-size:30px;padding:0 6px">📱</div><div style="flex:1"><h3>QRIS</h3><span class="mut">Semua e-wallet & m-banking</span></div><span>✓</span></div>
<div class="card" style="display:block;margin-top:16px;padding:18px"><div class="row sp"><span class="mut">Harga × ${S.qty}</span><b>${rp(sub)}</b></div><div class="row sp" style="margin-top:8px"><span class="mut">Biaya layanan 10%</span><b>${rp(f)}</b></div><hr style="border:0;border-top:1px dashed var(--line);margin:14px 0"><div class="row sp"><b>Total</b><b style="font-size:20px">${rp(S.tot)}</b></div></div></div>
${bar('',`<button class="btn lime" onclick="startPay()">${S.tot?'Bayar '+rp(S.tot):'Konfirmasi gratis'}</button>`)}`},

qris:()=>{const m=Math.floor(S.left/60),s=String(S.left%60).padStart(2,'0');return `<div class="pd sat"><div class="row"><button class="rb" onclick="cancelPay()">✕</button><h2>Bayar dengan QRIS</h2></div>
<div class="pay" style="margin-top:20px"><span class="tag d">⏱ Bayar dalam <span id="cd">${m}:${s}</span></span><p class="mut" style="margin-top:16px">Total pembayaran</p><h1 style="font-size:36px;margin:2px 0">${rp(S.tot)}</h1>
<div class="qimg"><img src="${QRIS_BASE}.${QRIS_EXT[0]}" alt="QRIS" onerror="qf(this)"><div id="qm" style="display:none;padding:18px;font-size:12px;color:var(--mut);font-weight:600;line-height:1.5">Taruh gambar QRIS kamu di<br><b style="color:var(--ink)">assets/images/payment/qris.png</b></div></div>
<div class="step"><b>1</b><span>Buka e-wallet / m-banking lalu pilih <b style="all:unset;font-weight:800">Scan QR</b>.</span></div><div class="step"><b>2</b><span>Scan kode di atas & pastikan nominal <b style="all:unset;font-weight:800">${rp(S.tot)}</b>.</span></div><div class="step"><b>3</b><span>Selesai? Tekan tombol di bawah.</span></div></div>
</div>
${bar('',`<button class="btn lime" onclick="confirmPay()">Saya sudah bayar</button>`)}`},

done:()=>{const b=S.bk[S.ci],a=b.a,w=b.who;return `<div class="pd sat" style="text-align:center"><div style="font-size:60px;margin-top:16px">🎉</div><h1 style="margin:8px 0 6px">Booking berhasil!</h1><p class="mut">Simpan bukti & tunjukkan QR saat check-in.</p>
<div class="tk" style="margin-top:20px;text-align:left"><div class="row sp"><span class="tag">LUNAS</span><span class="mut">${b.no}</span></div><h2 style="margin-top:14px">${a.n}</h2><p class="mut" style="margin-top:2px">${a.d} · ${a.t} · ${b.q} orang</p><p class="mut">📍 ${a.l}</p>
<div class="qr">${qr(a.id+7)}</div><hr style="border:0;border-top:1px dashed var(--line);margin:6px 0 14px">
<span class="mut">Pemesan</span><h3>${w.nm}</h3><p class="mut">${w.hp}${w.em?' · '+w.em:''}</p><p class="mut">Identitas: ${maskId(w.nik)}</p>
<hr style="border:0;border-top:1px dashed var(--line);margin:14px 0"><div class="row sp"><span class="mut">Dibayar ${b.paid}</span><b>${b.tot?rp(b.tot):'Gratis'}</b></div></div>
<button class="btn lime" style="margin-top:18px" onclick="receipt(${S.ci})">⬇ Unduh bukti booking</button><button class="btn" style="margin-top:10px" onclick="S.seg=0;S.st=[];S.scr='bookings';S.dir='fwd';draw()">Lihat booking saya</button><button class="btn ghost" style="margin-top:10px" onclick="S.st=[];S.scr='home';draw()">Kembali ke beranda</button></div>`}
});
