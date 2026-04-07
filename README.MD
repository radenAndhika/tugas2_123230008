# Notes App Fullstack

Aplikasi ini adalah Notes App fullstack sederhana yang berjalan secara lokal menggunakan:

- Frontend: HTML, CSS, JavaScript
- Backend: Express.js
- Database: MySQL
- ORM: Sequelize

## Fitur

- Tambah catatan
- Lihat daftar catatan
- Edit catatan
- Hapus catatan

Setiap catatan memiliki field:

- `id`
- `judul`
- `isi`
- `tanggal_dibuat`

## Struktur Project

```txt
config/       -> konfigurasi database
controllers/  -> logika request dan response
models/       -> query ke database
routes/       -> endpoint API
schema/       -> definisi tabel notes
index.js      -> server utama Express
index.html    -> frontend utama
styles.css    -> tampilan frontend
app.js        -> logika frontend
```

## Cara Menjalankan

1. Install dependency:

```bash
npm install
```

2. Buat database MySQL, misalnya `tugas2`.

3. Siapkan file `.env` berdasarkan `.env.example`.

4. Jalankan server:

```bash
npm run dev
```

5. Buka aplikasi di browser:

```txt
http://localhost:3000
```

## Endpoint API

- `GET /api/v1/notes`
- `GET /api/v1/notes/:id`
- `POST /api/v1/notes`
- `PUT /api/v1/notes/:id`
- `DELETE /api/v1/notes/:id`

## Migrasi ke Cloud SQL atau MySQL di VM

Untuk migrasi dari lokal ke Cloud SQL atau MySQL di Virtual Machine, cukup ubah nilai pada `.env`:

- `DB_HOST`
- `DB_USER`
- `DB_PASS`
- `DB_NAME`

Karena aplikasi memakai Sequelize dan koneksi berbasis environment variable, kode backend tidak perlu diubah lagi selama kredensial database cloud sudah benar dan host dapat diakses.
