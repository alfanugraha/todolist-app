---
inclusion: auto
---

# Tech

## Stack

- **HTML5** — markup semantik
- **CSS3** — flexbox untuk layout, BEM-lite untuk penamaan class
- **Vanilla JavaScript (ES6+)** — tanpa framework, tanpa build tool

## Data Model

```js
// Task
{
  id: string,          // crypto.randomUUID()
  description: string, // trimmed, non-empty
  completed: boolean,
  createdAt: number    // Date.now()
}

// Filter
'all' | 'active' | 'completed'
```

## LocalStorage

- Key: `'todolist-app-tasks'`
- Value: JSON array dari Task
- Validasi wajib saat load — jika data rusak, reset ke `[]` dan hapus key

```js
function isValidTask(t) {
  return (
    typeof t.id === 'string' &&
    typeof t.description === 'string' && t.description.trim() !== '' &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'number'
  );
}
```

## Konvensi Kode

- `const`/`let` only — tidak ada `var`
- Method private: prefix underscore (`_save`, `_load`, `_refresh`)
- Selalu `trim()` input sebelum validasi
- Event delegation pada task list container — jangan pasang listener per item
- Re-render penuh setiap perubahan state — jangan patch DOM parsial
- Semua tombol pakai `<button type="button">`
- Setiap `<li>` task wajib punya `data-id` attribute

## CSS Conventions

- Task selesai: class `.task--completed` → `text-decoration: line-through`
- Filter aktif: class `.filter--active`
- Tombol "Hapus Selesai": gunakan `disabled` attribute saat tidak ada task selesai
