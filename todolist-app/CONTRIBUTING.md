# Panduan Kontribusi

Terima kasih telah meluangkan waktu untuk berkontribusi pada proyek ini. Dokumen ini menjelaskan aturan dan standar yang perlu diikuti agar proses kolaborasi berjalan lancar dan konsisten.

---

## Daftar Isi

1. [Memulai](#memulai)
2. [Alur Kerja Kontribusi](#alur-kerja-kontribusi)
3. [Aturan Pull Request](#aturan-pull-request)
4. [Standar Penulisan Kode](#standar-penulisan-kode)
5. [Standar Penulisan CSS](#standar-penulisan-css)
6. [Standar Markup HTML](#standar-markup-html)
7. [Etika Komunikasi](#etika-komunikasi)

---

## Memulai

Sebelum mulai berkontribusi, pastikan kamu sudah:

1. Membaca `README.md` untuk memahami proyek secara keseluruhan.
2. Memahami arsitektur MVC yang digunakan — Model (`store.js`), View (`renderer.js`), Controller (`app.js`).
3. Membuka issue terlebih dahulu sebelum mengerjakan perubahan besar, agar tidak terjadi duplikasi pekerjaan.

---

## Alur Kerja Kontribusi

```
fork → clone → buat branch → kerjakan perubahan → commit → push → buat Pull Request
```

1. Fork repositori ini ke akun kamu.
2. Clone fork tersebut ke mesin lokal.
3. Buat branch baru dari `main` dengan nama yang deskriptif:
   ```
   git checkout -b feat/nama-fitur
   git checkout -b fix/nama-bug
   git checkout -b docs/nama-dokumen
   ```
4. Kerjakan perubahan, lalu commit dengan pesan yang jelas (lihat format di bawah).
5. Push branch ke fork kamu, lalu buat Pull Request ke repositori utama.

### Format Pesan Commit

Gunakan format berikut secara konsisten:

```
<tipe>: <deskripsi singkat dalam bahasa Indonesia>
```

Tipe yang diizinkan:

| Tipe | Digunakan untuk |
|---|---|
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `refactor` | Mengubah struktur kode tanpa mengubah perilaku |
| `style` | Perubahan tampilan/CSS tanpa mengubah logika |
| `docs` | Perubahan dokumentasi |
| `chore` | Perubahan konfigurasi atau hal-hal non-fungsional |

Contoh:
```
feat: tambah validasi panjang maksimum deskripsi task
fix: perbaiki tombol hapus selesai yang tidak dinonaktifkan saat list kosong
docs: perbarui README dengan instruksi instalasi
```

---

## Aturan Pull Request

### Sebelum Membuat PR

- Pastikan kode berjalan dengan benar di browser tanpa error di console.
- Pastikan semua fitur yang sudah ada tidak rusak (tidak ada regresi).
- Satu PR sebaiknya hanya mengerjakan satu hal — satu fitur, satu perbaikan, atau satu refactor.

### Isi Pull Request

Setiap PR wajib menyertakan:

- **Judul** yang jelas dan deskriptif.
- **Deskripsi** yang menjelaskan: apa yang diubah, mengapa perlu diubah, dan bagaimana cara mengujinya.
- **Referensi issue** jika ada, menggunakan format `Closes #<nomor-issue>`.

Contoh deskripsi PR yang baik:

```
## Apa yang diubah
Menambahkan validasi agar deskripsi task tidak boleh lebih dari 50 karakter.

## Mengapa
Sesuai requirement 1.7 — input yang terlalu panjang harus ditolak.

## Cara menguji
1. Buka aplikasi di browser.
2. Ketik deskripsi lebih dari 50 karakter di input.
3. Klik "Tambah" — task tidak boleh ditambahkan.

Closes #12
```

### Proses Review

- Setiap PR memerlukan minimal satu approval sebelum dapat di-merge.
- Reviewer berhak meminta perubahan. Tanggapi setiap komentar dengan sopan dan konstruktif.
- Jangan merge PR milik sendiri tanpa review dari orang lain.
- PR yang tidak aktif selama lebih dari 14 hari dapat ditutup.

---

## Standar Penulisan Kode

Proyek ini menggunakan **Vanilla JavaScript (ES6+)** tanpa framework atau build tool. Ikuti standar berikut secara konsisten.

### Arsitektur

Pertahankan pemisahan tanggung jawab sesuai pola MVC yang sudah ada:

- **`store.js` (Model)** — hanya mengelola state, validasi data, dan persistensi LocalStorage. Tidak boleh menyentuh DOM.
- **`renderer.js` (View)** — hanya merender ulang DOM berdasarkan state. Tidak boleh mengubah state.
- **`app.js` (Controller)** — hanya menghubungkan event DOM ke operasi Model, lalu memicu re-render. Tidak boleh berisi logika bisnis.

Alur data harus tetap satu arah:
```
User Action → Controller → Model → View
```

### Penamaan

- Gunakan `camelCase` untuk variabel dan fungsi: `addTask`, `filteredTasks`.
- Gunakan `PascalCase` untuk nama class: `TaskStore`, `Renderer`, `App`.
- Gunakan `SCREAMING_SNAKE_CASE` untuk konstanta modul: `STORAGE_KEY`.
- Awali properti dan metode privat dengan underscore: `_tasks`, `_save()`, `_load()`.
- Gunakan nama yang deskriptif dan berbahasa Inggris untuk semua identifier kode.

### Struktur Kode

- Gunakan `class` untuk mendefinisikan komponen utama (`TaskStore`, `Renderer`, `App`).
- Gunakan JSDoc untuk mendokumentasikan parameter dan return value pada setiap metode publik:

```javascript
/**
 * Menambah task baru ke daftar.
 * @param {string} description
 * @returns {Task|null} Task yang dibuat, atau null jika input tidak valid.
 */
addTask(description) { ... }
```

- Gunakan `@typedef` untuk mendefinisikan tipe data kustom di bagian atas file:

```javascript
/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} description
 * @property {boolean} completed
 * @property {number} createdAt
 */
```

### Aturan Umum JavaScript

- Gunakan `const` untuk nilai yang tidak berubah, `let` untuk yang berubah. Hindari `var`.
- Gunakan arrow function untuk callback pendek: `tasks.filter(t => !t.completed)`.
- Gunakan template literal untuk string yang mengandung variabel.
- Gunakan `crypto.randomUUID()` untuk membuat ID unik — jangan gunakan `Math.random()`.
- Gunakan `Date.now()` untuk timestamp.
- Selalu kembalikan salinan array dari getter, bukan referensi langsung: `return [...this._tasks]`.
- Gunakan event delegation pada container, bukan memasang listener pada setiap elemen individual.
- Jangan tambahkan dependensi eksternal (library atau framework) tanpa diskusi terlebih dahulu.

### Validasi Input

Ikuti aturan validasi yang sudah ditetapkan di `store.js`:

| Kondisi | Hasil |
|---|---|
| Kosong atau hanya spasi | Tolak, kembalikan `null` |
| Kurang dari 3 karakter setelah trim | Tolak, kembalikan `null` |
| Lebih dari 50 karakter | Tolak, kembalikan `null` |
| 3–50 karakter setelah trim | Terima |

---

## Standar Penulisan CSS

Proyek ini menggunakan **Tailwind CSS via CDN** sebagai pendekatan utama. File `css/style.css` hanya untuk override yang tidak dapat dicapai dengan Tailwind utilities.

### Prinsip Utama

- Terapkan Tailwind utility classes langsung di markup HTML atau via `className` di `renderer.js`.
- Tambahkan kode ke `style.css` hanya jika benar-benar tidak ada Tailwind utility yang setara.
- Pertahankan gaya visual **Neobrutalism**: border hitam tebal, hard shadow tanpa blur, warna kontras, tipografi bold, sudut kotak (tidak rounded).

### Palet Warna yang Diizinkan

| Elemen | Nilai |
|---|---|
| Background halaman | `yellow-200` |
| Card utama | `white` |
| Border | `border-black` |
| Hard shadow | `4px 4px 0px #000` |
| Tombol "Tambah" | `pink-300` |
| Filter aktif | `yellow-400` |
| Tombol "Hapus Selesai" aktif | `red-400` |
| Teks task selesai | `gray-400` |

Jangan menambahkan warna baru di luar palet ini tanpa diskusi terlebih dahulu.

### Aturan `style.css`

- Tambahkan komentar singkat di atas setiap blok aturan untuk menjelaskan tujuannya.
- Gunakan class helper `.neo-shadow` dan `.neo-shadow-sm` untuk hard shadow yang konsisten.
- Jangan override Tailwind utilities secara global — gunakan selector yang spesifik.

---

## Standar Markup HTML

- Gunakan atribut `aria-label` pada elemen interaktif yang tidak memiliki teks label yang terlihat.
- Gunakan atribut `data-*` untuk menyimpan metadata yang dibutuhkan JavaScript: `data-id`, `data-action`, `data-filter`.
- Jangan tambahkan inline style di `index.html` kecuali untuk nilai yang tidak tersedia sebagai Tailwind utility (contoh: `box-shadow` kustom).
- Pertahankan urutan pemuatan skrip: `store.js` → `renderer.js` → `app.js`.

---

## Etika Komunikasi

Proyek ini adalah ruang kolaborasi yang terbuka dan saling menghormati. Berikut adalah standar komunikasi yang berlaku di semua saluran — issue, PR, komentar kode, maupun diskusi lainnya.

### Yang Diharapkan

- Sampaikan pendapat dengan jelas, sopan, dan berbasis argumen teknis.
- Berikan kritik pada kode, bukan pada orangnya. Fokus pada "kode ini perlu diperbaiki karena..." bukan "kamu salah karena...".
- Hargai waktu dan usaha kontributor lain, sekecil apapun kontribusinya.
- Terbuka terhadap masukan dan bersedia berdiskusi jika ada perbedaan pendapat.
- Gunakan bahasa yang inklusif dan mudah dipahami.

### Yang Tidak Diizinkan

- Komentar yang merendahkan, menyerang, atau bersifat diskriminatif dalam bentuk apapun.
- Spam, promosi yang tidak relevan, atau komentar di luar konteks proyek.
- Mengabaikan komentar reviewer tanpa penjelasan.
- Merge kode tanpa melalui proses review.

### Menangani Ketidaksepakatan

Jika ada perbedaan pendapat teknis:

1. Sampaikan argumen masing-masing dengan jelas dan berbasis fakta atau referensi.
2. Jika tidak menemukan kesepakatan, bawa diskusi ke issue untuk mendapat masukan lebih luas.
3. Keputusan akhir ada pada maintainer proyek.

Kontributor yang melanggar standar komunikasi ini dapat dikeluarkan dari proyek setelah peringatan.
