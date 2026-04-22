// store.js — TaskStore (Model)

const STORAGE_KEY = 'todolist-app-tasks';

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} description
 * @property {boolean} completed
 * @property {number} createdAt
 */

/**
 * @typedef {'all' | 'active' | 'completed'} Filter
 */

class TaskStore {
  constructor() {
    /** @type {Task[]} */
    this._tasks = [];
    /** @type {Filter} */
    this._filter = 'all';
    this._load();
  }

  // ── CRUD ──────────────────────────────────────────────────────────────────

  /**
   * Mengembalikan salinan seluruh task.
   * @returns {Task[]}
   */
  getTasks() {
    return [...this._tasks];
  }

  /**
   * Menambah task baru. Mengembalikan Task yang dibuat, atau null jika input tidak valid.
   * @param {string} description
   * @returns {Task|null}
   */
  addTask(description) {
    if (typeof description !== 'string') return null;
    const trimmed = description.trim();
    if (!trimmed || trimmed.length < 3 || trimmed.length > 50) return null;

    const task = {
      id: crypto.randomUUID(),
      description: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    this._tasks.push(task);
    this._save();
    return task;
  }

  /**
   * Toggle status completed pada task dengan id yang diberikan.
   * @param {string} id
   */
  toggleTask(id) {
    const task = this._tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this._save();
    }
  }

  /**
   * Hapus task berdasarkan id.
   * @param {string} id
   */
  deleteTask(id) {
    this._tasks = this._tasks.filter(t => t.id !== id);
    this._save();
  }

  /**
   * Hapus semua task yang sudah selesai.
   */
  clearCompleted() {
    this._tasks = this._tasks.filter(t => !t.completed);
    this._save();
  }

  // ── FILTER ────────────────────────────────────────────────────────────────

  /**
   * Set filter aktif.
   * @param {Filter} filter
   */
  setFilter(filter) {
    this._filter = filter;
  }

  /**
   * Ambil filter aktif.
   * @returns {Filter}
   */
  getFilter() {
    return this._filter;
  }

  /**
   * Kembalikan subset task sesuai filter.
   * @param {Filter} [filter] - Jika tidak diberikan, gunakan filter aktif.
   * @returns {Task[]}
   */
  getFilteredTasks(filter) {
    const f = filter !== undefined ? filter : this._filter;
    switch (f) {
      case 'active':
        return this._tasks.filter(t => !t.completed);
      case 'completed':
        return this._tasks.filter(t => t.completed);
      default:
        return [...this._tasks];
    }
  }

  // ── PERSISTENSI ───────────────────────────────────────────────────────────

  /**
   * Simpan _tasks ke LocalStorage.
   */
  _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks));
  }

  /**
   * Muat _tasks dari LocalStorage. Jika data tidak valid, mulai dengan array kosong.
   */
  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        this._tasks = [];
        return;
      }

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        throw new Error('Data bukan array');
      }

      for (const item of parsed) {
        if (
          typeof item.id !== 'string' ||
          typeof item.description !== 'string' ||
          item.description.trim() === '' ||
          typeof item.completed !== 'boolean' ||
          typeof item.createdAt !== 'number'
        ) {
          throw new Error('Elemen tidak valid');
        }
      }

      this._tasks = parsed;
    } catch {
      this._tasks = [];
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
