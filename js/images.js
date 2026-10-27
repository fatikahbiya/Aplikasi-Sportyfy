/* ===== FOTO & QRIS (path relatif, tanpa "/" di depan: aman di Live Server & GitHub Pages) =====
   Foto tidak ketemu -> otomatis tampil ilustrasi, tidak pernah kosong.
   QRIS KAMU: taruh gambarnya di  assets/images/payment/qris.png  (atau .jpg / .jpeg / .webp) */
const QRIS_BASE='assets/images/payment/qris', QRIS_EXT=['png','jpg','jpeg','webp'];
const IMG={cover:'assets/images/onboarding/cover.jpg',hero:'assets/images/home/hero-skate-day.jpg',
skateboard:'assets/images/sports/skateboard.jpg',badminton:'assets/images/sports/badminton.jpg',basketball:'assets/images/sports/basketball.jpg',
futsal:'assets/images/sports/futsal.jpg',running:'assets/images/sports/running.jpg',volleyball:'assets/images/sports/volleyball.jpg',
c0:'assets/images/communities/skateboard-solo.jpg',c1:'assets/images/communities/solo-runners.jpg',c2:'assets/images/communities/solo-badminton.jpg',
c3:'assets/images/communities/solo-futsal-squad.jpg',c4:'assets/images/communities/hoops-jogja.jpg',c5:'assets/images/communities/spike-club-kampus.jpg',
coach:'assets/images/people/coach-raka.jpg',me:'assets/images/people/profile-fatikah.jpg'};
const SP={skateboard:['Skateboard','🛹','linear-gradient(145deg,#FF5A1F,#FFB020)'],badminton:['Badminton','🏸','linear-gradient(145deg,#12906A,#B6F36B)'],
basketball:['Basketball','🏀','linear-gradient(145deg,#E8431A,#5E1708)'],futsal:['Futsal','⚽','linear-gradient(145deg,#2D6BFF,#7AD3FF)'],
running:['Running','👟','linear-gradient(145deg,#8B3DFF,#FF6FB1)'],volleyball:['Volleyball','🏐','linear-gradient(145deg,#FFB020,#FF5A1F)']};
const G='linear-gradient(145deg,#23251f,#5b5f50)';
const ph=(k,cls='',emo,g,sh)=>`<div class="ph ${cls}" style="--g:${g||(SP[k]||[])[2]||G}"><b>${emo||(SP[k]||[])[1]||'✨'}</b><img src="${IMG[k]||''}" alt="" loading="lazy" onerror="this.remove()">${sh?'<div class="sh"></div>':''}</div>`;
function qf(i){const n=+(i.dataset.n||0)+1;if(n<QRIS_EXT.length){i.dataset.n=n;i.src=QRIS_BASE+'.'+QRIS_EXT[n]}else{i.remove();document.getElementById('qm')&&(document.getElementById('qm').style.display='block')}}
