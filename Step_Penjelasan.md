# Alur Menjelaskan Notes App Fullstack

Pendekatan yang paling enak untuk menjelaskan project ini adalah dari **server utama**, lalu turun ke **database**, **API CRUD**, dan terakhir **frontend**. Dengan alur ini, pembaca bisa melihat hubungan antara tampilan, endpoint, dan data di MySQL secara utuh.

## 1. Titik Awal: `index.js`
File ini adalah pusat aplikasi.

- **Yang dijelaskan:**
  - Inisialisasi Express.
  - Aktivasi `cors` dan `express.json()` agar frontend bisa mengirim request JSON.
  - Route `/` untuk menampilkan `index.html`.
  - Route `/styles.css` dan `/app.js` agar frontend bisa diload.
  - Pemanggilan `sequelize.sync()` untuk memastikan tabel notes tersedia sebelum server berjalan.
  - Mounting route API di `/api/v1/notes`.

## 2. Konfigurasi Database: `config/database.js`
Bagian ini menjelaskan bagaimana Node.js terhubung ke MySQL.

- **Yang dijelaskan:**
  - Penggunaan `dotenv` agar konfigurasi database disimpan di `.env`.
  - Inisialisasi Sequelize dengan `DB_NAME`, `DB_USER`, `DB_PASS`, dan `DB_HOST`.
  - Kenapa pendekatan ini memudahkan migrasi dari lokal ke Cloud SQL atau MySQL di VM.

## 3. Struktur Tabel: `schema/Note.js`
Di sini kita mendefinisikan bentuk data notes.

- **Yang dijelaskan:**
  - Model `Note` memiliki field `judul`, `isi`, dan `tanggal_dibuat`.
  - `judul` dan `isi` wajib diisi.
  - `tanggal_dibuat` otomatis terisi dengan waktu saat note dibuat.
  - Tabel disimpan sebagai `notes` di MySQL.

## 4. Query Data: `models/noteModels.js`
Bagian model menangani komunikasi langsung ke database.

- **Yang dijelaskan:**
  - `findAll()` mengambil seluruh catatan dan mengurutkan dari yang terbaru.
  - `create()` menyimpan catatan baru.
  - `findById()` mengambil satu catatan berdasarkan id.
  - `updateById()` memperbarui catatan lalu mengambil data terbaru.
  - `deleteById()` menghapus catatan dari database.

## 5. Logika API: `controllers/noteController.js`
Controller menangani request dari client dan memutuskan response yang dikirim.

- **Yang dijelaskan:**
  - Validasi sederhana agar `judul` dan `isi` tidak kosong.
  - Penggunaan `try...catch` untuk menangani error database atau validasi.
  - Pengembalian response JSON yang konsisten untuk operasi tambah, lihat, edit, dan hapus.

## 6. Routing API: `routes/noteRoutes.js`
Bagian ini menghubungkan URL dengan fungsi controller.

- **Yang dijelaskan:**
  - `GET /api/v1/notes`
  - `GET /api/v1/notes/:id`
  - `POST /api/v1/notes`
  - `PUT /api/v1/notes/:id`
  - `DELETE /api/v1/notes/:id`

## 7. Frontend: `index.html`, `styles.css`, `app.js`
Frontend dibuat tanpa framework, hanya HTML, CSS, dan JavaScript murni.

- **Yang dijelaskan:**
  - `index.html` menyediakan form input dan daftar catatan.
  - `styles.css` mengatur tampilan agar aplikasi lebih nyaman dipakai.
  - `app.js` memakai `fetch()` untuk memanggil backend Express.
  - Saat klik edit, data catatan masuk kembali ke form.
  - Saat klik hapus, frontend mengirim request `DELETE` ke API.

## 8. Pengujian API: `api.rest`
File ini dipakai untuk mengetes endpoint tanpa frontend.

- **Yang dijelaskan:**
  - Cara mencoba `GET`, `POST`, `PUT`, dan `DELETE`.
  - Cocok dipakai saat ingin membuktikan backend bekerja meskipun frontend belum dibuka.

## 9. Migrasi ke Cloud
Karena koneksi database memakai environment variable, proses migrasi cukup mengganti konfigurasi koneksi.

- **Yang dijelaskan:**
  - Database lokal bisa dipindah ke Cloud SQL atau MySQL di VM.
  - Kode backend tetap sama.
  - Yang berubah hanya host, user, password, dan nama database di `.env`.
