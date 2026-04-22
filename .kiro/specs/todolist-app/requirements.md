# Requirements Document

## Introduction

Aplikasi frontend sederhana untuk mengelola daftar tugas (todo list). Pengguna dapat menambahkan, menyelesaikan, dan menghapus tugas melalui antarmuka web yang responsif. Aplikasi berjalan sepenuhnya di sisi klien (browser) tanpa memerlukan backend server.

## Glossary

- **TodoApp**: Aplikasi frontend utama yang mengelola seluruh fungsionalitas daftar tugas.
- **Task**: Sebuah item tugas yang memiliki teks deskripsi dan status (selesai atau belum selesai).
- **TaskList**: Kumpulan semua Task yang dikelola oleh TodoApp.
- **Filter**: Mekanisme untuk menampilkan subset dari TaskList berdasarkan status Task.
- **LocalStorage**: Penyimpanan data di browser yang digunakan untuk menyimpan TaskList secara persisten.

## Requirements

### Requirement 1: Menambahkan Tugas Baru

**User Story:** Sebagai pengguna, saya ingin menambahkan tugas baru ke daftar, sehingga saya dapat mencatat hal-hal yang perlu dikerjakan.

#### Acceptance Criteria

1. THE TodoApp SHALL menyediakan kolom input teks untuk memasukkan deskripsi Task baru.
2. WHEN pengguna mengetikkan teks dan menekan tombol "Tambah" atau menekan tombol Enter, THE TodoApp SHALL menambahkan Task baru ke TaskList dengan status belum selesai.
3. WHEN Task baru berhasil ditambahkan, THE TodoApp SHALL mengosongkan kolom input teks.
4. IF kolom input teks kosong saat pengguna mencoba menambahkan Task, THEN THE TodoApp SHALL tidak menambahkan Task dan tetap menampilkan kolom input dalam keadaan kosong.
5. IF teks input hanya mengandung spasi, THEN THE TodoApp SHALL tidak menambahkan Task ke TaskList.
6. IF deskripsi Task kurang dari 3 karakter setelah di-trim, THEN THE TodoApp SHALL tidak menambahkan Task ke TaskList.
7. IF deskripsi Task lebih dari 50 karakter, THEN THE TodoApp SHALL tidak menambahkan Task ke TaskList.

---

### Requirement 2: Menampilkan Daftar Tugas

**User Story:** Sebagai pengguna, saya ingin melihat semua tugas saya dalam satu daftar, sehingga saya dapat memantau apa yang perlu dikerjakan.

#### Acceptance Criteria

1. THE TodoApp SHALL menampilkan semua Task dalam TaskList secara berurutan sesuai waktu penambahan.
2. WHEN TaskList kosong, THE TodoApp SHALL menampilkan pesan informasi bahwa belum ada tugas.
3. THE TodoApp SHALL menampilkan teks deskripsi setiap Task dengan jelas.
4. THE TodoApp SHALL membedakan tampilan visual antara Task yang sudah selesai dan yang belum selesai.

---

### Requirement 3: Menandai Tugas Selesai

**User Story:** Sebagai pengguna, saya ingin menandai tugas sebagai selesai, sehingga saya dapat melacak progres pekerjaan saya.

#### Acceptance Criteria

1. THE TodoApp SHALL menyediakan checkbox atau tombol pada setiap Task untuk mengubah statusnya.
2. WHEN pengguna mengklik checkbox pada Task yang belum selesai, THE TodoApp SHALL mengubah status Task tersebut menjadi selesai.
3. WHEN pengguna mengklik checkbox pada Task yang sudah selesai, THE TodoApp SHALL mengubah status Task tersebut kembali menjadi belum selesai.
4. WHEN status Task berubah menjadi selesai, THE TodoApp SHALL menampilkan teks Task dengan gaya visual yang menandakan selesai (misalnya, teks dicoret).

---

### Requirement 4: Menghapus Tugas

**User Story:** Sebagai pengguna, saya ingin menghapus tugas yang tidak relevan, sehingga daftar saya tetap bersih dan terorganisir.

#### Acceptance Criteria

1. THE TodoApp SHALL menyediakan tombol hapus pada setiap Task.
2. WHEN pengguna mengklik tombol hapus pada sebuah Task, THE TodoApp SHALL menghapus Task tersebut dari TaskList secara permanen.
3. WHEN sebuah Task dihapus, THE TodoApp SHALL memperbarui tampilan TaskList tanpa memuat ulang halaman.

---

### Requirement 5: Memfilter Daftar Tugas

**User Story:** Sebagai pengguna, saya ingin memfilter daftar tugas berdasarkan statusnya, sehingga saya dapat fokus pada tugas yang relevan.

#### Acceptance Criteria

1. THE TodoApp SHALL menyediakan tiga pilihan Filter: "Semua", "Belum Selesai", dan "Selesai".
2. WHEN pengguna memilih Filter "Semua", THE TodoApp SHALL menampilkan seluruh Task dalam TaskList.
3. WHEN pengguna memilih Filter "Belum Selesai", THE TodoApp SHALL hanya menampilkan Task dengan status belum selesai.
4. WHEN pengguna memilih Filter "Selesai", THE TodoApp SHALL hanya menampilkan Task dengan status selesai.
5. THE TodoApp SHALL menandai Filter yang sedang aktif secara visual.

---

### Requirement 6: Persistensi Data

**User Story:** Sebagai pengguna, saya ingin data tugas saya tersimpan secara otomatis, sehingga daftar tugas tidak hilang ketika saya menutup atau memuat ulang browser.

#### Acceptance Criteria

1. WHEN pengguna menambahkan, menyelesaikan, atau menghapus Task, THE TodoApp SHALL menyimpan TaskList terbaru ke LocalStorage secara otomatis.
2. WHEN TodoApp dimuat di browser, THE TodoApp SHALL membaca dan memulihkan TaskList dari LocalStorage.
3. IF LocalStorage tidak mengandung data TaskList, THEN THE TodoApp SHALL memulai dengan TaskList kosong.
4. IF data di LocalStorage tidak valid atau rusak, THEN THE TodoApp SHALL memulai dengan TaskList kosong dan menghapus data yang rusak tersebut.

---

### Requirement 7: Menghapus Semua Tugas Selesai

**User Story:** Sebagai pengguna, saya ingin menghapus semua tugas yang sudah selesai sekaligus, sehingga saya dapat membersihkan daftar dengan cepat.

#### Acceptance Criteria

1. THE TodoApp SHALL menyediakan tombol "Hapus Selesai" untuk menghapus semua Task dengan status selesai.
2. WHEN pengguna mengklik tombol "Hapus Selesai", THE TodoApp SHALL menghapus semua Task berstatus selesai dari TaskList.
3. WHILE tidak ada Task berstatus selesai dalam TaskList, THE TodoApp SHALL menonaktifkan atau menyembunyikan tombol "Hapus Selesai".
