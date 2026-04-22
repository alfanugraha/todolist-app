# TodoList App

Aplikasi web untuk mengelola daftar tugas yang berjalan sepenuhnya di sisi klien (browser). Tidak memerlukan backend server, framework JavaScript, atau proses build.

---

## Fitur Utama

- Tambah tugas baru melalui input teks atau tombol, dengan validasi panjang karakter (3–50 karakter)
- Tandai tugas sebagai selesai atau belum selesai dengan toggle checkbox
- Hapus tugas individual secara langsung
- Filter daftar tugas berdasarkan status: Semua, Belum Selesai, atau Selesai
- Hapus semua tugas selesai sekaligus dengan satu tombol
- Data tersimpan otomatis di LocalStorage — tidak hilang saat browser ditutup atau halaman dimuat ulang
- Tampilan kosong informatif saat belum ada tugas

---

## Instalasi dan Menjalankan Proyek

Proyek ini tidak memerlukan instalasi dependensi atau proses build.

**Prasyarat:** Browser modern (Chrome, Firefox, Edge, Safari versi terbaru).

**Langkah menjalankan:**

1. Clone atau unduh repositori ini.
2. Buka folder `todolist-app/`.
3. Buka file `index.html` langsung di browser.

```
# Contoh menggunakan Live Server (VS Code Extension)
Klik kanan index.html → Open with Live Server
```

Atau cukup klik dua kali file `index.html` untuk membukanya di browser default.

> Tailwind CSS dimuat via CDN, sehingga koneksi internet diperlukan agar tampilan muncul dengan benar.

---

## Struktur Folder

```
todolist-app/
├── index.html          # Markup utama dan titik masuk aplikasi
├── css/
│   └── style.css       # Override minimal untuk efek Neobrutalism
└── js/
    ├── store.js        # Model — mengelola state, CRUD, dan persistensi LocalStorage
    ├── renderer.js     # View — merender ulang DOM berdasarkan state terkini
    └── app.js          # Controller — menghubungkan event DOM ke Model dan View
```

Arsitektur mengikuti pola MVC sederhana dengan alur data satu arah:

```
User Action → Controller (app.js) → Model (store.js) → View (renderer.js)
                                           |
                                     LocalStorage
```

---

## Teknologi yang Digunakan

| Teknologi | Keterangan |
|---|---|
| HTML5 | Struktur markup halaman |
| Vanilla JavaScript (ES6+) | Logika aplikasi tanpa framework |
| Tailwind CSS (CDN) | Utility-first CSS untuk styling |
| LocalStorage API | Persistensi data di sisi klien |
| Web Crypto API (`crypto.randomUUID`) | Pembuatan ID unik untuk setiap tugas |
