# Di mana mengubah teks

Tampilan dibuat JavaScript, jadi teks ada di folder `js/`. Cara paling cepat: **Ctrl+Shift+F** di VS Code, tempel teks yang kamu lihat, lalu edit di file yang muncul.

| Yang ingin diubah | File |
|---|---|
| Tagline splash, onboarding, login/daftar, checkout, QRIS, halaman sukses | `js/screens-flow.js` |
| Beranda, Explore, Detail, Booking, Komunitas, Profil | `js/screens-main.js` |
| Nama kegiatan, harga, lokasi, jadwal, komunitas, nama user | `js/data.js` |
| Biaya layanan (10%) | fungsi `fee` di `js/data.js` |
| Waktu batas bayar (15 menit) | `S.left=900` di `js/app.js` (satuan detik) |
| Isi & tampilan bukti booking yang diunduh | `js/receipt.js` |
| Pesan validasi identitas | `startPay()` di `js/app.js` |
| Warna | `:root` di `css/style.css` |

Aturan aman: ubah hanya kata di antara tag atau tanda kutip. Jangan sentuh isi `${ ... }`, `< >`, dan `onclick="..."`. Apostrof di dalam `'...'` tulis `\'`. Salah? Ctrl+Z.
