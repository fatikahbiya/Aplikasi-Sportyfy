const card=a=>`<button class="card" onclick="open_(${a.id})">${ph(a.s)}<div class="in"><span class="mut">${a.d} · ${a.t}</span><h3>${a.n}</h3><div class="mut">📍 ${a.l}</div><div class="row sp" style="margin-top:8px"><span class="price">${a.p?rp(a.p):'Gratis'}</span><span class="tag d">${a.k} slot</span></div></div></button>`;
const avatar=()=>ph('me','av','😎','linear-gradient(145deg,#FF5A1F,#FFB020)');
function qrBits(seed){let h=(seed*2654435761)>>>0,o=[];for(let y=0;y<21;y++)for(let x=0;x<21;x++){let k;if((x<7||x>13)&&(y<7||y>13)&&!(x>13&&y>13)){const a=x<7?x:x-14,b=y<7?y:y-14;k=a==0||a==6||b==0||b==6||(a>1&&a<5&&b>1&&b<5)}else{h=(h*1103515245+12345)>>>0;k=(h>>16)&1}o.push(!!k)}return o}
const qr=seed=>qrBits(seed).map(k=>`<i class="${k?'k':''}"></i>`).join('');
const bar=(l,btn)=>`<div class="bb">${l}${btn}</div>`;


const V={}; // semua layar didaftarkan ke sini oleh screens-*.js
