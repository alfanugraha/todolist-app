// renderer.js — Renderer (View)

class Renderer {
  /**
   * @param {HTMLElement} taskListEl       - <ul> container untuk daftar task
   * @param {HTMLElement} filterContainerEl - container tombol filter
   * @param {HTMLElement} clearBtnEl        - tombol "Hapus Selesai"
   * @param {HTMLElement} emptyMessageEl    - elemen pesan kosong
   */
  constructor(taskListEl, filterContainerEl, clearBtnEl, emptyMessageEl) {
    this._taskList = taskListEl;
    this._filterContainer = filterContainerEl;
    this._clearBtn = clearBtnEl;
    this._emptyMessage = emptyMessageEl;
  }

  /**
   * Render ulang seluruh UI sekaligus.
   * @param {Task[]} tasks
   * @param {Filter} filter
   */
  render(tasks, filter) {
    this.renderTaskList(tasks);
    this.renderFilters(filter);
    this.renderClearButton(tasks);
  }

  /**
   * Render daftar task ke dalam <ul>.
   * @param {Task[]} tasks
   */
  renderTaskList(tasks) {
    this._taskList.innerHTML = '';

    if (tasks.length === 0) {
      this.renderEmptyState();
      return;
    }

    this._emptyMessage.hidden = true;

    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-3 p-3 border-b-2 border-black bg-white';
      li.dataset.id = task.id;

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'w-4 h-4 cursor-pointer accent-black';
      checkbox.checked = task.completed;
      checkbox.dataset.action = 'toggle';

      // Deskripsi
      const span = document.createElement('span');
      span.className = task.completed
        ? 'flex-1 font-bold line-through text-gray-400'
        : 'flex-1 font-bold text-black';
      span.textContent = task.description;

      // Tombol hapus
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'font-black text-black hover:text-red-500 text-lg leading-none';
      deleteBtn.textContent = '✕';
      deleteBtn.dataset.action = 'delete';

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      this._taskList.appendChild(li);
    });
  }

  /**
   * Render pesan kosong saat tidak ada task.
   */
  renderEmptyState() {
    this._emptyMessage.className = 'text-center font-bold text-black py-8 text-sm border-2 border-dashed border-black';
    this._emptyMessage.textContent = 'Belum ada tugas. Tambahkan tugas baru di atas!';
    this._emptyMessage.hidden = false;
  }

  /**
   * Render tombol filter dengan state aktif.
   * @param {Filter} activeFilter
   */
  renderFilters(activeFilter) {
    this._filterContainer.innerHTML = '';

    const filters = [
      { value: 'all', label: 'Semua' },
      { value: 'active', label: 'Belum Selesai' },
      { value: 'completed', label: 'Selesai' },
    ];

    filters.forEach(({ value, label }) => {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.dataset.filter = value;
      btn.className =
        value === activeFilter
          ? 'px-3 py-1 text-sm font-black border-2 border-black bg-yellow-400 text-black'
          : 'px-3 py-1 text-sm font-black border-2 border-black bg-white hover:bg-yellow-100';
      this._filterContainer.appendChild(btn);
    });
  }

  /**
   * Render tombol "Hapus Selesai" — aktif jika ada task selesai.
   * @param {Task[]} tasks - semua task (bukan yang difilter)
   */
  renderClearButton(tasks) {
    const hasCompleted = tasks.some((t) => t.completed);
    if (hasCompleted) {
      this._clearBtn.disabled = false;
      this._clearBtn.className = 'text-sm font-black border-2 border-black px-3 py-1 bg-red-400 hover:bg-red-500';
      this._clearBtn.style.boxShadow = '3px 3px 0px #000';
    } else {
      this._clearBtn.disabled = true;
      this._clearBtn.className = 'text-sm font-black border-2 border-black px-3 py-1 bg-gray-200 text-gray-400 cursor-not-allowed';
      this._clearBtn.style.boxShadow = 'none';
    }
  }
}
