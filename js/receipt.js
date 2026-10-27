/* Bukti booking: digambar ke canvas -> gambar PNG yang bisa diunduh.
   Dipanggil dari tombol "Unduh bukti" (layar sukses & Booking). Ubah tampilannya di sini. */
const maskId=n=>{n=(n||'').replace(/\s/g,'');return n.length>7?n.slice(0,4)+'•'.repeat(n.length-7)+n.slice(-3):n};
function receipt(i){
  const b=S.bk[i],a=b.a,w=b.who,W=800,H=1530,c=document.createElement('canvas');c.width=W;c.height=H;
  const x=c.getContext('2d'),F='"Plus Jakarta Sans",system-ui,sans-serif',INK='#0E0F0C',MUT='#7B7E72';
  const T=(t,px,py,sz,wt,col,al)=>{x.font=`${wt} ${sz}px ${F}`;x.fillStyle=col||INK;x.textAlign=al||'left';x.fillText(t,px,py)};
  const R=(px,py,pw,ph,col,r)=>{x.fillStyle=col;x.beginPath();x.moveTo(px+r,py);x.arcTo(px+pw,py,px+pw,py+ph,r);x.arcTo(px+pw,py+ph,px,py+ph,r);x.arcTo(px,py+ph,px,py,r);x.arcTo(px,py,px+pw,py,r);x.fill()};
  let y=0;const L=()=>{x.strokeStyle='#D9DBD0';x.lineWidth=2;x.setLineDash([8,8]);x.beginPath();x.moveTo(60,y);x.lineTo(740,y);x.stroke();x.setLineDash([]);y+=44};
  const row=(k,v,big)=>{T(k,60,y,24,500,MUT);T(v,740,y,big?36:26,big?800:700,INK,'right');y+=big?58:48};
  R(0,0,W,H,'#F2F3EE',0);R(0,0,W,250,INK,0);
  T('sportyfy',60,105,50,800,'#C8FF2E');T('BUKTI BOOKING',60,165,26,700,'#fff');T(b.no,740,165,24,600,'#9a9d90','right');
  R(40,200,720,1260,'#fff',36);
  R(60,232,160,48,'#C8FF2E',24);T(b.tot?'LUNAS':'GRATIS',140,266,22,800,INK,'center');T(b.paid,740,266,21,500,MUT,'right');
  y=345;T(a.n,60,y,40,800);y+=46;T(`${a.d} · ${a.t}`,60,y,26,600);y+=38;T('📍 '+a.l,60,y,24,500,MUT);y+=36;T('Host: '+a.by,60,y,24,500,MUT);y+=40;L();
  T('IDENTITAS PEMESAN',60,y,20,800,MUT);y+=44;
  row('Nama',w.nm);row('No. HP',w.hp);if(w.em)row('Email',w.em);row('No. identitas',maskId(w.nik));row('Jumlah peserta',b.q+' orang');y-=4;L();
  T('PEMBAYARAN',60,y,20,800,MUT);y+=44;
  row('Metode','QRIS');row(`Harga × ${b.q}`,b.sub?rp(b.sub):'Gratis');row('Biaya layanan',b.f?rp(b.f):'-');y+=4;row('Total',b.tot?rp(b.tot):'Gratis',1);L();
  const bits=qrBits(a.id+7),m=11,qx=(W-21*m)/2;R(qx-16,y-12,21*m+32,21*m+32,'#fff',14);
  bits.forEach((k,n)=>{if(k){x.fillStyle=INK;x.fillRect(qx+(n%21)*m,y+((n/21)|0)*m,m,m)}});y+=21*m+52;
  T('Tunjukkan QR ini saat check-in',W/2,y,24,700,INK,'center');
  T('Dokumen dibuat otomatis oleh Sportyfy',W/2,1500,19,500,MUT,'center');
  const url=c.toDataURL('image/png');
  sheet(`<h2>Bukti booking</h2><img src="${url}" alt="Bukti booking" style="width:100%;max-height:50vh;object-fit:contain;border-radius:16px;margin:14px 0;background:#fff"><a class="btn lime" download="Bukti-${b.no}.png" href="${url}" style="text-decoration:none">⬇ Unduh gambar (PNG)</a><p class="mut" style="margin:10px 0">Kalau belum terunduh di HP, tahan lama gambarnya lalu pilih Simpan.</p><button class="btn ghost" onclick="$('o').innerHTML=''">Tutup</button>`);
}
