# Sportyfy prototype

Aplikasi mobile (web) dengan layar penuh seperti APK. Buka `index.html` lewat **Live Server** (VS Code) atau GitHub Pages. Butuh internet hanya untuk font.

```
sportyfy/
├── index.html
├── manifest.json            nama & ikon saat di-install / dibungkus jadi APK
├── css/style.css            semua gaya (warna di :root paling atas)
├── js/
│   ├── images.js            path foto + path QRIS  <- edit di sini kalau ganti nama file
│   ├── data.js              kegiatan, komunitas, state aplikasi
│   ├── components.js        kartu, QR tiket, bar bawah
│   ├── screens-main.js      Beranda, Explore, Detail, Booking, Komunitas, Profil
│   ├── screens-flow.js      Splash, Onboarding, Login, Checkout, QRIS, Sukses
│   ├── receipt.js           bukti booking (digambar ke PNG, bisa diunduh)
│   └── app.js               router, navigasi, alur bayar, skala desktop
└── assets/
    ├── images/              foto (lihat IMAGE-GUIDE.md)
    └── icons/               ikon app 192 & 512
```

## QRIS milikmu
Timpa `assets/images/payment/qris.png` dengan gambar QRIS-mu (nama sama). Format `.jpg` / `.jpeg` / `.webp` juga dicoba otomatis.
Konfirmasi bayar masih **simulasi** (ada label DEMO). Untuk verifikasi asli, ganti `confirmPay()` di `js/app.js` dengan payment gateway + webhook.

## Identitas & bukti booking
- Checkout meminta **identitas pemesan**: nama lengkap, no. HP, email (opsional), no. identitas (KTP/KTM/SIM). Validasi ada di `startPay()` di `js/app.js`.
- Setelah bayar, tiap booking menyimpan identitas, nomor bukti (`SPF-yymmdd-xxxx`), waktu bayar, rincian harga.
- **Unduh bukti**: tombol di layar sukses dan di tab Booking ("⬇ Bukti"). Hasilnya gambar PNG berisi identitas (nomor identitas disamarkan), detail kegiatan, rincian bayar, dan QR check-in. Tampilan bukti diatur di `js/receipt.js`.
- Data masih tersimpan di memori (hilang saat refresh). Untuk data permanen dan bukti resmi, perlu backend/database.

## Akun & database demo
`js/store.js` membuat database contoh di `localStorage`: 1 admin, 10 user, dan 10 transaksi. Transaksi baru dari user ikut tersimpan.
- Admin: `admin@sportyfy.id` / `admin123` → dashboard (jumlah transaksi, GMV, pendapatan, daftar transaksi & pengguna, unduh CSV, reset data).
- User: `fatikah@demo.id`, `rizky@demo.id`, `dewi@demo.id`, dst / `123456`. User hanya melihat booking miliknya.
- Daftar akun baru juga bisa.
Catatan: data ada di browser/HP yang dipakai (bukan server) dan password disimpan polos, jadi **hanya untuk demo**. Untuk data bersama antar HP, ganti `DB()`/`save()` dengan Supabase/Firebase.

## Ukuran layar
- Di HP: layar penuh (`100dvh`), tanpa bingkai.
- Di laptop: kanvas HP 390x844 yang otomatis diskala agar pas di tinggi layar (`fit()` di `js/app.js`).

## Jadi APK
Pakai salah satu: **Capacitor**, **Cordova**, atau layanan WebView (mis. WebIntoApp / Median) yang membungkus URL GitHub Pages-mu. Ikon sudah ada di `assets/icons/`.

## GitHub Pages
1. Upload **isi** folder ini ke root repo (`index.html`, `css/`, `js/`, `assets/` berdampingan).
2. Settings → Pages → *Deploy from a branch* → `main` / `(root)`.
3. Buka `https://<username>.github.io/<repo>/`, tunggu 1-2 menit.
4. Nama file **case-sensitive**: `skateboard.jpg` ≠ `Skateboard.JPG`.
5. Folder `assets/images/` harus ikut ter-commit (folder kosong tidak ikut). Semua file placeholder sudah ada supaya path-nya langsung terbentuk.
