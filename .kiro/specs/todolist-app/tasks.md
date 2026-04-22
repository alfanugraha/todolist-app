# Implementation Plan: TodoList App

## Overview

Implementasi aplikasi TodoList berbasis Vanilla JS dengan arsitektur MVC sederhana. Setiap task dibangun secara inkremental — dimulai dari struktur file dan model data, lalu store, renderer, controller, hingga styling dan integrasi akhir.

## Tasks

- [x] 1. Buat struktur proyek dan file dasar
  - Buat direktori `todolist-app/` dengan subdirektori `css/` dan `js/`
  - Buat file: `index.html`, `js/store.js`, `js/renderer.js`, `js/app.js`
  - Tulis markup HTML dasar di `index.html`: muat Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`), input teks, tombol tambah, area daftar task, tombol filter, tombol "Hapus Selesai", dan skrip yang memuat ketiga file JS
  - Terapkan struktur layout Tailwind di `index.html`: `<body class="bg-gray-100 min-h-screen flex items-center justify-center">` dengan card `<div class="bg-white rounded-xl shadow-md w-full max-w-md p-6">`
  - _Requirements: 1.1, 2.1, 2.2, 2.3_

- [x] 2. Implementasi Model — `TaskStore` di `js/store.js`
  - [x] 2.1 Implementasi konstruktor dan operasi CRUD dasar
    - Tulis class `TaskStore` dengan properti internal `_tasks` (array) dan `_filter` (string, default `'all'`)
    - Implementasi `addTask(description)`: validasi input (trim, tolak kosong/spasi, tolak kurang dari 3 karakter, tolak lebih dari 50 karakter), buat objek Task dengan UUID (`crypto.randomUUID()`), `completed: false`, dan `createdAt: Date.now()`, tambahkan ke `_tasks`, panggil `_save()`, kembalikan Task atau `null`
    - Implementasi `toggleTask(id)`: temukan Task berdasarkan id, balik nilai `completed`, panggil `_save()`
    - Implementasi `deleteTask(id)`: hapus Task dari `_tasks` berdasarkan id, panggil `_save()`
    - Implementasi `clearCompleted()`: filter keluar semua Task dengan `completed: true`, panggil `_save()`
    - Implementasi `getTasks()`: kembalikan salinan `_tasks`
    - _Requirements: 1.2, 1.4, 1.5, 1.6, 1.7, 3.2, 3.3, 4.2, 7.2_

  - [x] 2.2 Implementasi filter dan persistensi LocalStorage
    - Implementasi `setFilter(filter)` dan `getFilter()`
    - Implementasi `getFilteredTasks(filter)`: kembalikan subset `_tasks` sesuai nilai filter (`'all'`, `'active'`, `'completed'`)
    - Implementasi `_save()`: simpan `_tasks` ke `localStorage` dengan key `'todolist-app-tasks'` sebagai JSON string
    - Implementasi `_load()`: baca dari `localStorage`, parse JSON, validasi setiap elemen (harus punya `id` string, `description` string non-empty, `completed` boolean, `createdAt` number); jika gagal, set `_tasks = []` dan hapus key dari `localStorage`
    - Panggil `_load()` di konstruktor
    - _Requirements: 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4_

- [x] 3. Checkpoint — Verifikasi logika store
  - Pastikan semua metode `TaskStore` berjalan benar dengan membuka browser console dan menguji secara manual, atau tulis tes sederhana inline. Tanyakan kepada pengguna jika ada pertanyaan.

- [x] 4. Implementasi View — `Renderer` di `js/renderer.js`
  - [x] 4.1 Implementasi render daftar task
    - Tulis class `Renderer` yang menerima referensi elemen DOM (task list container, filter container, tombol "Hapus Selesai", pesan kosong)
    - Implementasi `renderTaskList(tasks)`: untuk setiap Task, buat elemen `<li>` dengan `data-id` dan Tailwind classes `'flex items-center gap-2 p-2 border-b border-gray-100'`; tambahkan checkbox (`'w-4 h-4 accent-blue-500 cursor-pointer'`), span deskripsi, dan tombol hapus (`'text-red-400 hover:text-red-600 text-sm'`); untuk task selesai terapkan `'flex-1 line-through text-gray-400'` pada span, untuk belum selesai `'flex-1 text-gray-800'`; jika array kosong, tampilkan pesan kosong via `renderEmptyState()`
    - Implementasi `renderEmptyState()`: tampilkan pesan dengan class `'text-center text-gray-400 py-8 text-sm'`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.4_

  - [x] 4.2 Implementasi render filter dan tombol "Hapus Selesai"
    - Implementasi `renderFilters(activeFilter)`: render tiga tombol filter ("Semua", "Belum Selesai", "Selesai"); filter aktif pakai class `'px-3 py-1 rounded-full text-sm bg-blue-500 text-white border border-blue-500'`, filter tidak aktif `'px-3 py-1 rounded-full text-sm border border-gray-300 text-gray-600 hover:bg-gray-100'`
    - Implementasi `renderClearButton(tasks)`: jika ada task selesai set `disabled=false` dan class `'text-sm text-red-500 hover:text-red-700'`; jika tidak ada set `disabled=true` dan class `'text-sm text-gray-300 cursor-not-allowed'`
    - Implementasi `render(tasks, filter)`: panggil `renderTaskList`, `renderFilters`, dan `renderClearButton` sekaligus
    - _Requirements: 5.1, 5.5, 7.1, 7.3_

- [x] 5. Implementasi Controller — `App` di `js/app.js`
  - [x] 5.1 Inisialisasi dan event listener
    - Tulis class `App` dengan konstruktor yang menerima `store` dan `renderer`
    - Implementasi `init()`: pasang event listener pada input (keydown Enter), tombol tambah (click), task list (delegasi event untuk checkbox dan tombol hapus), tombol filter (click), dan tombol "Hapus Selesai" (click)
    - Panggil `_refresh()` di akhir `init()` untuk render awal
    - _Requirements: 1.1, 1.2, 3.1, 4.1, 5.1_

  - [x] 5.2 Implementasi handler dan refresh
    - Implementasi `_onAddTask(description)`: panggil `store.addTask()`, jika hasilnya `null` (input tidak valid termasuk terlalu pendek/panjang) jangan kosongkan input; jika berhasil panggil `_refresh()` lalu kosongkan input
    - Implementasi `_onToggleTask(id)`: panggil `store.toggleTask(id)`, lalu `_refresh()`
    - Implementasi `_onDeleteTask(id)`: panggil `store.deleteTask(id)`, lalu `_refresh()`
    - Implementasi `_onClearCompleted()`: panggil `store.clearCompleted()`, lalu `_refresh()`
    - Implementasi `_onFilterChange(filter)`: panggil `store.setFilter(filter)`, lalu `_refresh()`
    - Implementasi `_refresh()`: ambil `store.getFilteredTasks(store.getFilter())` dan `store.getFilter()`, panggil `renderer.render()`
    - Buat instance `App` di bagian bawah file dan panggil `init()`
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 3.2, 3.3, 4.2, 4.3, 5.2, 5.3, 5.4, 7.2_

- [x] 6. Checkpoint — Verifikasi fungsionalitas inti
  - Pastikan semua fitur utama (tambah, toggle, hapus, filter, hapus selesai) berjalan di browser. Tanyakan kepada pengguna jika ada pertanyaan.

- [x] 7. Styling tambahan — `css/style.css` (opsional)
  - Jika ada kebutuhan visual yang tidak dapat dicapai dengan Tailwind utilities, tambahkan override minimal di `css/style.css` dan muat di `index.html`
  - Sebagian besar styling sudah ditangani oleh Tailwind classes di task 1 dan 4
  - _Requirements: 2.4, 3.4, 5.5, 7.3_

- [x] 8. Redesain UI — Neobrutalism
  - [x] 8.1 Update `index.html` dengan layout dan markup Neobrutalism
    - Ubah `<body>` menjadi `class="bg-yellow-200 min-h-screen flex items-center justify-center p-4"`
    - Ubah card utama menjadi `class="bg-white border-4 border-black w-full max-w-md p-6"` dengan `style="box-shadow: 6px 6px 0px #000;"`
    - Ubah `<h1>` menjadi `class="text-3xl font-black text-black uppercase mb-6 border-b-4 border-black pb-2"`
    - Ubah input menjadi `class="flex-1 border-2 border-black px-3 py-2 font-bold focus:outline-none focus:ring-0 focus:border-black"` dengan `style="box-shadow: 3px 3px 0px #000;"`
    - Ubah tombol "Tambah" menjadi `class="bg-pink-300 border-2 border-black px-4 py-2 font-black uppercase hover:bg-pink-400"` dengan `style="box-shadow: 3px 3px 0px #000;"`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 8.2 Update `js/renderer.js` dengan Tailwind classes Neobrutalism
    - Update `renderTaskList`: ubah `<li>` menjadi `class="flex items-center gap-3 p-3 border-b-2 border-black bg-white"`
    - Update checkbox menjadi `class="w-4 h-4 cursor-pointer accent-black"`
    - Update span deskripsi task belum selesai menjadi `class="flex-1 font-bold text-black"`
    - Update span deskripsi task selesai menjadi `class="flex-1 font-bold line-through text-gray-400"`
    - Update tombol hapus menjadi `class="font-black text-black hover:text-red-500 text-lg leading-none"` dengan teks `'✕'`
    - Update `renderEmptyState`: ubah class menjadi `'text-center font-bold text-black py-8 text-sm border-2 border-dashed border-black'`
    - Update `renderFilters`: filter tidak aktif → `'px-3 py-1 text-sm font-black border-2 border-black bg-white hover:bg-yellow-100'`; filter aktif → `'px-3 py-1 text-sm font-black border-2 border-black bg-yellow-400 text-black'`
    - Update `renderClearButton`: ada task selesai → `class="text-sm font-black border-2 border-black px-3 py-1 bg-red-400 hover:bg-red-500"` dengan `style.boxShadow = '3px 3px 0px #000'`; tidak ada → `class="text-sm font-black border-2 border-black px-3 py-1 bg-gray-200 text-gray-400 cursor-not-allowed"` dengan `style.boxShadow = 'none'`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.4, 5.1, 5.5, 7.1, 7.3_

  - [x] 8.3 Update `css/style.css` dengan utilitas Neobrutalism
    - Ganti seluruh isi file dengan utilitas hard shadow dan efek tekan tombol Neobrutalism
    - Tambahkan `.neo-shadow { box-shadow: 4px 4px 0px #000; }` dan `.neo-shadow-sm { box-shadow: 3px 3px 0px #000; }`
    - Tambahkan efek tekan: `button:not(:disabled):active { transform: translate(2px, 2px); box-shadow: 1px 1px 0px #000 !important; }`
    - Tambahkan transisi minimal: `button { transition: background-color 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease; }` dan `#task-list li span { transition: color 0.1s ease; }`
    - Pertahankan scrollbar tipis pada `#task-list`
    - _Requirements: 2.4, 3.4, 5.5, 7.3_

- [x] 9. Integrasi akhir dan verifikasi
  - [x] 9.1 Pastikan semua file terhubung dengan benar di `index.html`
    - Verifikasi urutan pemuatan skrip (`store.js` → `renderer.js` → `app.js`)
    - Pastikan semua referensi elemen DOM di `Renderer` dan `App` sesuai dengan markup di `index.html`
    - _Requirements: semua_

  - [ ]* 9.2 Tulis unit test manual untuk skenario edge case
    - Uji: input kosong tidak menambah task, input spasi tidak menambah task, input kurang dari 3 karakter tidak menambah task, input lebih dari 50 karakter tidak menambah task, toggle bolak-balik, hapus task yang tidak ada, load LocalStorage dengan data rusak
    - _Requirements: 1.4, 1.5, 1.6, 1.7, 3.2, 3.3, 6.4_

- [x] 10. Checkpoint akhir — Pastikan semua fitur dan tampilan Neobrutalism berjalan
  - Muat ulang halaman, verifikasi tampilan Neobrutalism (border hitam, shadow, warna kuning/pink), dan pastikan persistensi data dari LocalStorage serta semua filter bekerja. Tanyakan kepada pengguna jika ada pertanyaan.

## Notes

- Task bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task merujuk ke requirement spesifik untuk keterlacakan
- Aplikasi tidak memerlukan build tool — cukup buka `index.html` di browser
- Tailwind CSS dimuat via CDN, tidak perlu instalasi atau konfigurasi tambahan
