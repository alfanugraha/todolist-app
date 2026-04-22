// app.js — App (Controller)

class App {
  /**
   * @param {TaskStore} store
   * @param {Renderer} renderer
   */
  constructor(store, renderer) {
    this._store = store;
    this._renderer = renderer;

    this._input = document.getElementById('task-input');
    this._addBtn = document.getElementById('add-btn');
    this._taskList = document.getElementById('task-list');
    this._filterContainer = document.getElementById('filter-container');
    this._clearBtn = document.getElementById('clear-completed-btn');
  }

  init() {
    // Input: tambah task saat tekan Enter
    this._input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._onAddTask(this._input.value);
    });

    // Tombol tambah
    this._addBtn.addEventListener('click', () => {
      this._onAddTask(this._input.value);
    });

    // Delegasi event pada task list (toggle & delete)
    this._taskList.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-id]');
      if (!li) return;
      const id = li.dataset.id;

      if (e.target.dataset.action === 'toggle') {
        this._onToggleTask(id);
      } else if (e.target.dataset.action === 'delete') {
        this._onDeleteTask(id);
      }
    });

    // Delegasi event pada filter container
    this._filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      this._onFilterChange(btn.dataset.filter);
    });

    // Tombol hapus selesai
    this._clearBtn.addEventListener('click', () => {
      this._onClearCompleted();
    });

    this._refresh();
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  _onAddTask(description) {
    const result = this._store.addTask(description);
    if (result === null) return; // input tidak valid — jangan kosongkan input
    this._refresh();
    this._input.value = '';
  }

  _onToggleTask(id) {
    this._store.toggleTask(id);
    this._refresh();
  }

  _onDeleteTask(id) {
    this._store.deleteTask(id);
    this._refresh();
  }

  _onClearCompleted() {
    this._store.clearCompleted();
    this._refresh();
  }

  _onFilterChange(filter) {
    this._store.setFilter(filter);
    this._refresh();
  }

  _refresh() {
    const filter = this._store.getFilter();
    const filteredTasks = this._store.getFilteredTasks(filter);
    const allTasks = this._store.getTasks();
    this._renderer.renderTaskList(filteredTasks);
    this._renderer.renderFilters(filter);
    this._renderer.renderClearButton(allTasks);
  }
}

// ── Entry point ───────────────────────────────────────────────────────────────

const store = new TaskStore();
const renderer = new Renderer(
  document.getElementById('task-list'),
  document.getElementById('filter-container'),
  document.getElementById('clear-completed-btn'),
  document.getElementById('empty-message')
);

const app = new App(store, renderer);
app.init();
