/* Database DEMO di localStorage (per browser/HP). 10 akun + 10 transaksi contoh dibuat otomatis.
   Akun admin: admin@sportyfy.id / admin123 · Akun user: <nama depan>@demo.id / 123456 (mis. fatikah@demo.id)
   Untuk data nyata antar-HP, ganti DB()/save() dengan Supabase atau Firebase. */
const KEY='spf_db_v1',MEM={};
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return MEM[k]||null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){MEM[k]=v}},del:k=>{try{localStorage.removeItem(k)}catch(e){delete MEM[k]}}};
function seed(){
  const N=['Fatikah','ummu','miftah','elisabet','floren','dhia','Nadia Putri','Fajar Nugroho','Citra Anjani','Dimas Aditya'],z=n=>String(n).padStart(2,'0');
  const users=[{id:'admin',nm:'Admin Sportyfy',em:'admin@sportyfy.id',pw:'admin123',role:'admin'},...N.map((n,i)=>({id:'u'+(i+1),nm:n,em:n.split(' ')[0].toLowerCase()+'@demo.id',pw:'123456',role:'user'}))];
  const tx=N.map((n,i)=>{const a=ACT[i%ACT.length],q=1+i%3,sub=a.p*q,f=Math.round(sub*.1),d=new Date(Date.now()-(10-i)*6e7*1.2*60);
    return{no:'SPF-'+String(d.getFullYear()).slice(2)+z(d.getMonth()+1)+z(d.getDate())+'-'+(1100+i*137),uid:'u'+(i+1),uname:n,aid:a.id,q,x:0,st:'paid',sub,f,tot:sub+f,
      paid:d.toLocaleString('id-ID',{dateStyle:'long',timeStyle:'short'}),who:{nm:n,hp:'0812345'+(1000+i*37),em:users[i+1].em,nik:'33720101010'+(10000+i)}}});
  const db={users,tx};save(db);return db}
function DB(){try{const d=JSON.parse(ls.get(KEY));if(d&&d.users)return d}catch(e){}return seed()}
function save(d){ls.set(KEY,JSON.stringify(d))}
const hyd=t=>({...t,a:ACT.find(x=>x.id==t.aid)});
function enter(u){S.me=u;S.user=u.nm.split(' ')[0];S.idn={nm:u.nm,hp:'',em:u.em,nik:''};S.bk=DB().tx.filter(t=>t.uid==u.id).map(hyd);ls.set('spf_me',u.id)}
function restore(){const u=DB().users.find(u=>u.id==ls.get('spf_me'));if(u)enter(u)}
function saveTx(b){const d=DB();d.tx.push({...b,a:undefined,aid:b.a.id,uid:S.me?S.me.id:'guest',uname:b.who.nm});save(d)}
function cancelBk(i){S.bk[i].x=1;const d=DB(),t=d.tx.find(t=>t.no==S.bk[i].no);if(t)t.x=1;save(d)}

/* Status pembayaran: pending (menunggu verifikasi admin) | paid | rejected | x (dibatalkan). Data lama tanpa st dianggap paid. */
const stOf=t=>t.x?'x':(t.st||'paid'),STL={pending:'MENUNGGU',paid:'LUNAS',rejected:'DITOLAK',x:'BATAL'};
