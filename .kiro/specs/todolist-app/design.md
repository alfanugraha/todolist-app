# Design Document: TodoList App

## Overview

TodoList App adalah aplikasi frontend berbasis web yang memungkinkan pengguna mengelola daftar tugas (todo list) sepenuhnya di sisi klien (browser). Aplikasi ini dibangun dengan HTML, JavaScript murni (Vanilla JS), dan **Tailwind CSS** (dimuat via CDN) untuk styling — tanpa dependensi framework atau backend server.

Fitur utama meliputi:
- Menambahkan tugas baru dengan validasi input
- Menampilkan daftar tugas dengan pembeda visual status
- Menandai tugas sebagai selesai/belum selesai (toggle)
- Menghapus tugas individual
- Memfilter tugas berdasarkan status
- Persistensi data menggunakan LocalStorage
- Menghapus semua tugas selesai sekaligus

---

## Architecture

Aplikasi menggunakan arsitektur **MVC sederhana** yang diimplementasikan dalam satu halaman HTML:

```
┌─────────────────────────────────────────────────────┐
│                     Browser                         │
│                                                     │
│  ┌──────────┐    ┌──────────┐    ┌───────────────┐  │
│  │   View   │◄──►│Controller│◄──►│     Model     │  │
│  │  (DOM)   │    │  (app.js)│    │  (store.js)   │  │
│  └──────────┘    └──────────┘    └───────┬───────┘  │
│                                          │           │
│                                  ┌───────▼───────┐  │
│                                  │  LocalStorage │  │
│                                  └───────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Lapisan arsitektur:**

- **Model (store.js)**: Mengelola state TaskList, operasi CRUD, dan sinkronisasi dengan LocalStorage.
- **View (renderer.js)**: Bertanggung jawab merender ulang DOM berdasarkan state terkini. Menerapkan Tailwind utility classes langsung saat membangun elemen DOM.
- **Controller (app.js)**: Menghubungkan event dari DOM ke operasi Model, lalu memicu re-render View.
- **Styling**: Tailwind CSS dimuat via CDN (`<script src="https://cdn.tailwindcss.com"></script>`) di `index.html`. File `css/style.css` bersifat opsional — hanya untuk override minimal yang tidak dapat dicapai dengan Tailwind utilities.

**Alur data (unidirectional):**
```
User Action → Controller → Model (update state) → View (re-render)
                                    ↕
                              LocalStorage
```

---

## Components and Interfaces

### 1. TaskStore (Model)

Mengelola state dan persistensi data.

```javascript
// Interface TaskStore
class TaskStore {
  constructor()                    // Memuat data dari LocalStorage
  getTasks()                       // Mengembalikan semua Task
  getFilteredTasks(filter)         // Mengembalikan Task sesuai filter aktif
  addTask(description)             // Menambah Task baru, return Task | null (null jika kosong, < 3 char, atau > 50 char)
  toggleTask(id)                   // Toggle status selesai Task
  deleteTask(id)                   // Hapus Task berdasarkan id
  clearCompleted()                 // Hapus semua Task selesai
  setFilter(filter)                // Set filter aktif
  getFilter()                      // Ambil filter aktif
  _save()                          // (private) Simpan ke LocalStorage
  _load()                          // (private) Muat dari LocalStorage
}
```

### 2. Renderer (View)

Merender ulang seluruh UI berdasarkan state.

```javascript
// Interface Renderer
class Renderer {
  render(tasks, filter)            // Render ulang seluruh task list dan filter UI
  renderTaskList(tasks)            // Render daftar task
  renderFilters(activeFilter)      // Render tombol filter dengan state aktif
  renderClearButton(tasks)         // Render tombol "Hapus Selesai" (aktif/nonaktif)
  renderEmptyState()               // Render pesan kosong
}
```

### 3. App (Controller)

Menginisialisasi aplikasi dan menghubungkan event listener.

```javascript
// Interface App
class App {
  constructor(store, renderer)     // Injeksi dependensi
  init()                           // Pasang event listener, render awal
  _onAddTask(description)          // Handler tambah task
  _onToggleTask(id)                // Handler toggle task
  _onDeleteTask(id)                // Handler hapus task
  _onClearCompleted()              // Handler hapus semua selesai
  _onFilterChange(filter)          // Handler ganti filter
  _refresh()                       // Ambil state terbaru, panggil render
}
```

### 4. Struktur File

```
todolist-app/
├── index.html          # Markup utama + Tailwind CDN script
├── css/
│   └── style.css       # (Opsional) Override minimal — Tailwind menangani sebagian besar styling
└── js/
    ├── store.js        # Model: TaskStore
    ├── renderer.js     # View: Renderer (menerapkan Tailwind classes via JS)
    └── app.js          # Controller: App + entry point
```

---

## UI Design (Neobrutalism — Tailwind CSS)

Gaya visual **Neobrutalism**: border hitam tebal, hard shadow hitam tajam (tanpa blur), warna latar kontras (kuning terang, merah muda), tipografi bold, dan sudut kotak (tidak rounded). Seluruh styling menggunakan Tailwind CSS utility classes diterapkan langsung di HTML markup dan via `className` di `renderer.js`. Tailwind dimuat via CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Palet Warna

| Elemen | Warna |
|---|---|
| Background halaman | `#fef08a` (kuning terang / `yellow-200`) |
| Card utama | `#ffffff` (putih) |
| Border | `#000000` (hitam, `border-black`) |
| Hard shadow | `4px 4px 0px #000` |
| Tombol "Tambah" | `#f9a8d4` (merah muda / `pink-300`) |
| Tombol filter aktif | `#fbbf24` (kuning / `amber-400`) |
| Tombol hapus task | `#000000` teks, hover `#ef4444` |
| Tombol "Hapus Selesai" aktif | `#f87171` (merah / `red-400`) |
| Teks utama | `#000000` |
| Teks task selesai | `#6b7280` (abu / `gray-500`) |

### Layout Keseluruhan

Background kuning terang dengan card putih ber-border hitam tebal dan hard shadow:

```html
<body class="bg-yellow-200 min-h-screen flex items-center justify-center p-4">
  <div class="bg-white border-4 border-black w-full max-w-md p-6" style="box-shadow: 6px 6px 0px #000;">
    <!-- konten aplikasi -->
  </div>
</body>
```

Judul menggunakan font bold besar dengan garis bawah hitam tebal:

```html
<h1 class="text-3xl font-black text-black uppercase mb-6 border-b-4 border-black pb-2">Daftar Tugas</h1>
```

### Area Input

Input dan tombol "Tambah" dengan border hitam tebal dan hard shadow:

```html
<div class="flex gap-2 mb-4">
  <input class="flex-1 border-2 border-black px-3 py-2 font-bold focus:outline-none focus:ring-0 focus:border-black" style="box-shadow: 3px 3px 0px #000;" ... />
  <button class="bg-pink-300 border-2 border-black px-4 py-2 font-black uppercase hover:bg-pink-400 active:translate-x-1 active:translate-y-1" style="box-shadow: 3px 3px 0px #000;">Tambah</button>
</div>
```

### Daftar Task

Setiap item task dirender sebagai `<li>` dengan border bawah hitam tebal:

```javascript
// Di renderer.js — Neobrutalism task item
li.className = 'flex items-center gap-3 p-3 border-b-2 border-black bg-white';
checkbox.className = 'w-4 h-4 cursor-pointer accent-black';
descSpan.className = 'flex-1 font-bold text-black';
deleteBtn.className = 'font-black text-black hover:text-red-500 text-lg leading-none';
deleteBtn.textContent = '✕';
```

**Task selesai** — deskripsi dicoret dengan warna abu:
```javascript
descSpan.className = 'flex-1 font-bold line-through text-gray-400';
```

### Tombol Filter

Tombol kotak (tidak rounded) dengan border hitam; filter aktif pakai background kuning:

```javascript
// Filter tidak aktif
btn.className = 'px-3 py-1 text-sm font-black border-2 border-black bg-white hover:bg-yellow-100';
// Filter aktif
btn.className = 'px-3 py-1 text-sm font-black border-2 border-black bg-yellow-400 text-black';
```

Wrapper filter:
```html
<div id="filter-container" class="flex gap-2 mb-4"></div>
```

### Tombol "Hapus Selesai"

Border hitam tebal dengan hard shadow; dinonaktifkan saat tidak ada task selesai:

```javascript
// Ada task selesai
clearBtn.className = 'text-sm font-black border-2 border-black px-3 py-1 bg-red-400 hover:bg-red-500 active:translate-x-0.5 active:translate-y-0.5';
clearBtn.style.boxShadow = '3px 3px 0px #000';
clearBtn.disabled = false;

// Tidak ada task selesai
clearBtn.className = 'text-sm font-black border-2 border-black px-3 py-1 bg-gray-200 text-gray-400 cursor-not-allowed';
clearBtn.style.boxShadow = 'none';
clearBtn.disabled = true;
```

### Empty State

Pesan kosong dengan border putus-putus hitam dan teks bold:

```javascript
emptyMsg.className = 'text-center font-bold text-black py-8 text-sm border-2 border-dashed border-black';
emptyMsg.textContent = 'Belum ada tugas. Tambahkan tugas baru di atas!';
```

### Override di `css/style.css`

Hard shadow dan transisi tidak tersedia sebagai Tailwind utility standar, sehingga ditambahkan via `css/style.css`:

```css
/* Hard shadow Neobrutalism */
.neo-shadow { box-shadow: 4px 4px 0px #000; }
.neo-shadow-sm { box-shadow: 3px 3px 0px #000; }

/* Efek tekan tombol */
button:not(:disabled):active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #000 !important;
}

/* Transisi minimal */
button { transition: background-color 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease; }
#task-list li span { transition: color 0.1s ease; }
```

---

## Data Models

### Task

```javascript
/**
 * @typedef {Object} Task
 * @property {string} id          - UUID unik untuk setiap task
 * @property {string} description - Teks deskripsi task (trimmed, min 3 karakter, maks 50 karakter)
 * @property {boolean} completed  - Status selesai (true) atau belum (false)
 * @property {number} createdAt   - Timestamp Unix (ms) saat task dibuat
 */
```

Contoh:
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "description": "Beli bahan makanan",
  "completed": false,
  "createdAt": 1700000000000
}
```

### TaskList

```javascript
/**
 * @typedef {Task[]} TaskList
 * Diurutkan berdasarkan createdAt ascending (urutan penambahan).
 */
```

### Filter

```javascript
/**
 * @typedef {'all' | 'active' | 'completed'} Filter
 * - 'all'       → tampilkan semua task
 * - 'active'    → tampilkan task belum selesai
 * - 'completed' → tampilkan task selesai
 */
```

### LocalStorage Schema

```javascript
// Key: 'todolist-app-tasks'
// Value: JSON string dari TaskList
// Contoh:
localStorage.setItem('todolist-app-tasks', JSON.stringify(taskList));
```

Validasi saat load:
- Harus berupa array JSON yang valid
- Setiap elemen harus memiliki field `id` (string), `description` (string, min 3 karakter, maks 50 karakter), `completed` (boolean), `createdAt` (number)
- Jika validasi gagal → mulai dengan array kosong dan hapus key dari LocalStorage

### Aturan Validasi Deskripsi Task

| Kondisi | Hasil |
|---|---|
| Kosong / hanya spasi | Tolak (`addTask` return `null`) |
| Kurang dari 3 karakter (setelah trim) | Tolak (`addTask` return `null`) |
| Lebih dari 50 karakter | Tolak (`addTask` return `null`) |
| 3–50 karakter (setelah trim) | Diterima |

