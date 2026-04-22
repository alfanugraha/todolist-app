---
inclusion: auto
---

# Structure

## Struktur File

```
todolist-app/
├── index.html          # Markup utama dan entry point
├── css/
│   └── style.css       # Semua styling
└── js/
    ├── store.js        # Model: TaskStore — state & LocalStorage
    ├── renderer.js     # View: Renderer — render DOM
    └── app.js          # Controller: App + entry point
```

## Arsitektur MVC

Alur data satu arah (unidirectional):

```
User Action → App (Controller) → TaskStore (Model) → Renderer (View) → DOM
                                         ↕
                                   LocalStorage
```

## Tanggung Jawab Tiap Layer

- `store.js` — mengelola state `_tasks` dan `_filter`, operasi CRUD, sinkronisasi LocalStorage. Tidak boleh menyentuh DOM.
- `renderer.js` — merender ulang DOM berdasarkan data yang diterima. Tidak boleh menyimpan state.
- `app.js` — satu-satunya penghubung antara DOM events, store, dan renderer. Inisialisasi app dan pasang semua event listener.

## Urutan Load Script di index.html

```html
<script src="js/store.js"></script>
<script src="js/renderer.js"></script>
<script src="js/app.js"></script>
```
