const rp=n=>'Rp '+n.toLocaleString('id-ID'),fee=p=>Math.round(p*.1);
const ACT=[
{id:1,n:'Beginner Skate Day',s:'skateboard',p:35000,l:'Skatepark Manahan, Solo',d:'Sab, 1 Nov',t:'15.30',k:12,ty:'Pemula',by:'Coach Raka',ab:'Belajar dasar papan: berdiri, dorong, dan berhenti dengan aman. Papan & helm disediakan.'},
{id:2,n:'Fun Badminton Mix',s:'badminton',p:25000,l:'GOR Manahan, Solo',d:'Min, 2 Nov',t:'08.00',k:6,ty:'Semua level',by:'Solo Badminton',ab:'Main ganda campur santai, rotasi pasangan tiap game. Shuttlecock dari host.'},
{id:3,n:'Mini Futsal 5v5',s:'futsal',p:40000,l:'Arena Futsal Jebres',d:'Sab, 1 Nov',t:'19.00',k:4,ty:'Menengah',by:'Futsal Squad',ab:'Sparring 5v5 dua babak, wasit dari komunitas. Rompi disediakan.'},
{id:4,n:'Sunday Social Run 5K',s:'running',p:0,l:'Stadion Manahan',d:'Min, 2 Nov',t:'05.30',k:30,ty:'Santai',by:'Solo Runners',ab:'Lari santai 5K tanpa target pace, tutup dengan ngopi bareng.'},
{id:5,n:'3x3 Street Hoops',s:'basketball',p:30000,l:'Lapangan Kota Barat',d:'Jum, 31 Okt',t:'16.00',k:8,ty:'Menengah',by:'Hoops Jogja',ab:'Turnamen mini 3x3, sistem gugur. Tim dibentuk di tempat.'},
{id:6,n:'Spike Night',s:'volleyball',p:20000,l:'GOR UNS',d:'Rab, 5 Nov',t:'18.30',k:10,ty:'Pemula',by:'Spike Club',ab:'Latihan passing & spike lalu fun match. Cocok buat pemula.'}];
const COM=[['Skateboard Solo','🛹',248],['Solo Runners','👟',512],['Solo Badminton','🏸',187],['Solo Futsal Squad','⚽',329],['Hoops Jogja','🏀',144],['Spike Club Kampus','🏐',96]];
const S={idn:{nm:'',hp:'',em:'',nik:''},ci:0,scr:'splash',st:[],cat:'Semua',q:'',a:null,qty:1,bk:[],join:new Set([0]),seg:0,ob:0,mode:'in',tot:0,left:900,tm:null,user:'Fatikah',dir:'fwd',proof:null,af:'pending'};
const $=i=>document.getElementById(i);
const toast=m=>{const t=$('t');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1900)};
const MAIN=['home','explore','bookings','community','profile'];
