# 🍲 Resep Nusantara

> **Aplikasi web modern untuk menjelajahi kekayaan kuliner Indonesia.**  
> Dibangun dengan React + Vite, didukung oleh TailwindCSS dan PWA agar bisa diinstal dan dijalankan **tanpa koneksi internet**.

---

## ✨ Tentang Proyek

**Resep Nusantara** adalah Progressive Web App (PWA) yang menghadirkan berbagai resep **masakan dan minuman khas Indonesia**.  
Aplikasi ini dirancang untuk pengalaman pengguna yang cepat, ringan, dan bisa digunakan **baik secara online maupun offline**.

**Fitur utama:**
- 🍛 Koleksi resep makanan dan minuman khas Nusantara  
- 🔍 Fitur pencarian resep  
- ❤️ Simpan resep favorit (favorit list)  
- 📱 Bisa diinstal di HP seperti aplikasi native  
- 🌐 Dapat dijalankan **offline** berkat teknologi Service Worker  
- 🧩 Antarmuka modern dengan TailwindCSS dan ikon dari Lucide React

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Deskripsi |
|------------|------------|
| **React + Vite** | Framework frontend modern dan cepat |
| **TailwindCSS** | Framework CSS untuk desain responsif |
| **Lucide React** | Icon library ringan dan elegan |
| **vite-plugin-pwa** | Plugin untuk membuat aplikasi jadi Progressive Web App |

---

## 🚀 Cara Menjalankan Proyek

### 1. Persiapan Awal
Pastikan kamu sudah menginstal **Node.js v18+** dan **npm** di sistem kamu.

### 2. Clone Repository
```bash
git clone https://github.com/sltn14/Resep-Nusantara.git
cd Resep-Nusantara
````

### 3. Instalasi Dependensi

```bash
npm install
```

Atau jika ingin instalasi manual:

```bash
npm install lucide-react
npm install -D vite-plugin-pwa
npm install tailwindcss @tailwindcss/vite
npm install axios
```

### 4. Menjalankan dalam Mode Pengembangan

```bash
npm run dev
```

Akses di browser: [http://localhost:5173](http://localhost:5173)

---

## 📦 Build untuk Produksi

```bash
npm run build
```

Untuk menjalankan hasil build:

```bash
npm install -g serve
serve -s dist
```

---

## 📱 Uji PWA di Perangkat Mobile

1. Jalankan `serve -s dist`
2. Lihat alamat **Network** yang muncul (contoh: `http://192.168.1.10:3000`)
3. Pastikan HP dan laptop berada di jaringan Wi-Fi yang sama
4. Buka alamat itu di browser HP kamu
5. Akan muncul tombol **“Add to Home Screen”** — tekan untuk menginstal aplikasi 🎉

---

## 🧩 Struktur Folder

```
📦 modul-lima
├── 📁 dist/                  # Folder hasil build produksi
├── 📁 node_modules/          # Dependensi proyek (otomatis oleh npm)
├── 📁 public/                # File statis publik (favicon, manifest, dll)
├── 📁 src/                   # Sumber utama kode aplikasi
│   ├── 📁 assets/            # Gambar, ikon, dan aset statis lainnya
│   ├── 📁 components/        # Komponen UI reusable (Navbar, Card, dll)
│   ├── 📁 config/            # Konfigurasi global aplikasi
│   ├── 📁 data/              # Data statis (misalnya daftar resep)
│   ├── 📁 hooks/             # Custom React Hooks (useRecipes, useFavorites, dll)
│   ├── 📁 pages/             # Halaman utama (Home, Detail, Favorites, dsb)
│   ├── 📁 services/          # API service & integrasi backend
│   ├── 📁 utils/             # Fungsi helper/utilitas (formatting, dll)
│   ├── 🎨 index.css          # File gaya utama (Tailwind entry)
│   ├── ⚛️ main.jsx           # Entry point React
│   └── 🧱 PWABadge.jsx       # Komponen badge untuk status PWA
│
├── ⚙️ .env                   # Variabel lingkungan (API key, base URL, dll)
├── ⚙️ .gitignore             # File/folder yang diabaikan Git
├── ⚙️ eslint.config.js       # Konfigurasi linting (aturan kode)
├── 🧱 index.html             # Template HTML utama untuk Vite
├── 📦 package.json           # Daftar dependensi dan script proyek
├── 📦 package-lock.json      # Versi terkunci dari dependensi
├── ⚙️ pwa-assets.config.js   # Konfigurasi aset untuk PWA
├── 🪄 vite.config.js         # Konfigurasi utama Vite
└── 📘 README.md              # Dokumentasi proyek

```

---

## 🧑‍💻 Kontributor

| Nama                             | Peran            | GitHub                                         |
| -------------------------------- | ---------------- | ---------------------------------------------- |
| Sultan Alexander Sarummpaet      | Pengembang Utama | [@sltn14](https://github.com/sltn14)           |
| Vira Nurul Hayati                | Kolaborator Awal | [@viraanhh](https://github.com/viraanhh)       |
| Hanum Jati Rahmaningrum          | Kolaborator Awal | [@hanumjati](https://github.com/hanumjati)     | 
| Nayla Widya Shafira              | Kolaborator Awal | [@naylawidy](https://github.com/naylawidy)     |

---

## 🪄 Lisensi

Proyek ini dirilis di bawah lisensi **MIT License** — bebas digunakan, dikembangkan, dan dimodifikasi dengan mencantumkan kredit.

---

> “Teknologi hanyalah alat. Tapi lewat ide dan semangat, sesuatu yang sederhana bisa jadi luar biasa.”
> — *Resep Nusantara Dev Team 🍳*

```

