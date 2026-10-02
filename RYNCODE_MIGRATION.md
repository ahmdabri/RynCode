# RynCode — Migrasi Laravel → React + Tailwind + Supabase

> Dokumen ini adalah **spesifikasi lengkap** untuk AI agent (AntiGravity) agar membangun ulang proyek **RynCode Landing & Admin** dengan stack baru. Baca seluruh dokumen sebelum menulis kode.

Repo sumber (Laravel, jadikan referensi): https://github.com/Rynnsza/Ryn_Code.git

---

## 1. Ringkasan Proyek

**RynCode** adalah platform digital untuk **Desa Digital, Sekolah (SIAKAD), dan UMKM**.
Proyek terdiri dari dua bagian:

1. **Landing page publik** — value proposition, portofolio, partner, testimoni, FAQ, kontak.
2. **Panel admin** — CRUD penuh untuk konten landing + pengaturan situs.

Tujuan migrasi: ganti Laravel + Blade + Alpine + SB Admin 2 + MySQL menjadi **SPA modern** dengan backend-as-a-service **Supabase**. Tampilan dan fitur landing harus **tetap sama** (parity), admin di-redesain dengan Tailwind (bukan Bootstrap).

---

## 2. Stack: Lama vs Baru

| Layer | Lama | Baru (target) |
|---|---|---|
| Framework | Laravel 11 (PHP, Blade) | **React 18 + Vite + TypeScript** |
| Routing | Laravel routes | **React Router v6** |
| Styling | Tailwind + SB Admin 2 (Bootstrap 4) | **Tailwind CSS v3/v4 saja** (admin juga Tailwind) |
| Interaktivitas | Alpine.js | React state/hooks + **Framer Motion** (opsional) |
| Database | MySQL/MariaDB | **Supabase Postgres** |
| Auth admin | Session Laravel | **Supabase Auth** (email + password) |
| File upload | `storage/app/public` | **Supabase Storage** (bucket publik) |
| Validasi | Laravel Request | **React Hook Form + Zod** |
| Data fetching | Server-render | **TanStack Query** + `@supabase/supabase-js` |
| Deploy | — | Vercel / Netlify (static SPA) |

> Catatan: jika memilih Vue, padanannya: Vue 3 + Vite + Vue Router + Pinia + VeeValidate/Zod + `@tanstack/vue-query`. Dokumen ini ditulis untuk **React**; struktur dan skema DB identik.

---

## 3. Desain Visual (Wajib Dipertahankan)

Referensi dari landing saat ini:

- **Tema**: dark mode default — background navy gelap (`~#030712`), aksen **hijau emerald** (`emerald-400/500`) untuk highlight kata kunci, tombol utama, dan status.
- **Dark/light toggle**: tombol ikon bulan di navbar; simpan preferensi di `localStorage`, gunakan strategi `class` pada Tailwind (`darkMode: 'class'`).
- **Navbar**: logo + nama situs + tagline kecil ("Desa Digital · SIAKAD · UMKM"), menu: **Beranda, Layanan, Portofolio, Testimoni, Kontak**, tombol CTA hijau **"Diskusi Kebutuhan"**. Menu aktif berwarna hijau (scroll-spy).
- **Hero**:
  - Badge pill: "Platform digital untuk desa, sekolah, dan UMKM".
  - Headline: "Menghubungkan **Desa Digital**, **SIAKAD**, dan **UMKM** dalam satu ekosistem." (kata kunci berwarna hijau).
  - **Persona switcher** (tab pill): Desa / Sekolah / UMKM → mengubah paragraf deskripsi dan teks typewriter.
  - Deskripsi default (Desa): "RynCode membantu pemerintah desa mengelola data warga, layanan administrasi, dan transparansi pembangunan secara modern."
  - Dua tombol: **"Jelajahi Layanan"** (solid hijau) dan **"Jadwalkan Demo"** (outline).
  - Tiga statistik dengan **counter animasi**: `10+ Desa` (Implementasi), `4 Jenjang` (Unit Pendidikan), `50+ Pelaku` (UMKM Terbantu).
  - Kartu kanan **"SNAPSHOT EKOSISTEM"**: badge "Real-time", kotak terminal bergaya monospace dengan efek **typewriter**, footer "Fitur akan ditulis bergantian secara otomatis." + status "Terhubung".
  - Scroll hint dengan animasi bounce.
- Font: sans modern (Inter/Plus Jakarta Sans) untuk teks, monospace untuk kartu terminal.
- Responsif penuh (mobile-first).

---

## 4. Fitur Landing Page

| # | Section | Perilaku |
|---|---|---|
| 1 | Hero | Persona switcher, counter angka animasi (trigger saat terlihat via IntersectionObserver), scroll hint |
| 2 | Snapshot Ekosistem | Typewriter loop, teks tergantung persona aktif; fitur per persona didefinisikan sebagai konstanta |
| 3 | Layanan | Ringkasan fitur Desa / SIAKAD / UMKM (konten statis di kode) |
| 4 | Portofolio | Daftar dari tabel `portfolios` (kategori, judul, ringkasan); opsional filter kategori |
| 5 | Partner & Integrasi | Slider **1 kartu per partner**, panah kiri/kanan, **autoplay** (pause saat hover), tampil logo, nama, tipe, deskripsi |
| 6 | Testimoni | Slider otomatis, indikator **dot**, tombol prev/next |
| 7 | FAQ | Accordion dari tabel `faqs` |
| 8 | Kontak | Email & WhatsApp dari `settings`; form kontak dengan **validasi real-time** + loader submit + toast |
| 9 | UX tambahan | Floating CTA WhatsApp (mobile; link ke `wa` dari settings, fallback scroll ke form), tombol back-to-top, toast sederhana, dark mode |

Form kontak sebelumnya hanya simulasi. Di versi baru: **simpan ke tabel `contact_messages`** (lihat §6) dan tampilkan toast sukses.

---

## 5. Fitur Panel Admin (`/admin/*`)

Seluruh route admin diproteksi (redirect ke `/admin/login` jika tidak ada sesi Supabase).

- **Login** — email/password via Supabase Auth; tampilkan logo + nama situs dari settings.
- **Dashboard** (`/admin/dashboard`) — kartu hitungan: total testimoni, partner, portofolio, FAQ, pesan masuk.
- **Testimoni** — index (search, pagination, badge status, modal detail), create, edit, delete (modal konfirmasi).
- **Partner** — sama seperti di atas + **upload logo** ke Storage, thumbnail di tabel, status aktif/nonaktif.
- **Portofolio** — CRUD.
- **FAQ** — CRUD (+ urutan).
- **Pesan Masuk** *(baru)* — daftar pesan dari form kontak, tandai sudah dibaca, hapus.
- **Pengaturan Umum** — nama situs, upload logo utama, email, nomor WhatsApp. Logo dipakai di header landing, favicon (landing/login/admin), sidebar admin, dan header login.

### Komponen reusable admin (padanan partials Blade)

| Laravel | React |
|---|---|
| `partials/search.blade.php` | `<SearchInput />` (debounce 300ms, sync ke query string) |
| `partials/pagination.blade.php` | `<Pagination />` |
| `partials/delete-modal.blade.php` | `<ConfirmDeleteModal />` |
| — | `<DataTable />`, `<StatusBadge />`, `<ImageUpload />`, `<DetailModal />` |

Gunakan Tailwind murni atau **shadcn/ui** (Radix + Tailwind) untuk modal, dropdown, dan form agar konsisten.

---

## 6. Skema Database Supabase

> ⚠️ Nama kolom di bawah adalah **asumsi** berdasarkan deskripsi fitur. **Cocokkan dulu dengan file migration Laravel di `database/migrations/`** pada repo, lalu sesuaikan jika ada kolom tambahan.

```sql
-- ============ TABLES ============
create table public.settings (
  id          int primary key default 1,
  site_name   text not null default 'RynCode',
  logo_url    text,
  email       text,
  wa          text,
  updated_at  timestamptz default now(),
  constraint settings_singleton check (id = 1)
);
insert into public.settings (id) values (1) on conflict do nothing;

create table public.testimonials (
  id          bigint generated always as identity primary key,
  name        text not null,
  role        text,
  company     text,
  quote       text not null,
  is_active   boolean not null default true,
  created_at  timestamptz default now()
);

create table public.partners (
  id          bigint generated always as identity primary key,
  name        text not null,
  type        text,
  description text,
  logo_url    text,
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz default now()
);

create table public.portfolios (
  id          bigint generated always as identity primary key,
  category    text not null,            -- desa | sekolah | umkm
  title       text not null,
  summary     text,
  is_active   boolean not null default true,
  created_at  timestamptz default now()
);

create table public.faqs (
  id          bigint generated always as identity primary key,
  question    text not null,
  answer      text not null,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz default now()
);

create table public.contact_messages (
  id          bigint generated always as identity primary key,
  name        text not null,
  email       text not null,
  message     text not null,
  is_read     boolean not null default false,
  created_at  timestamptz default now()
);

-- ============ RLS ============
alter table public.settings         enable row level security;
alter table public.testimonials     enable row level security;
alter table public.partners         enable row level security;
alter table public.portfolios       enable row level security;
alter table public.faqs             enable row level security;
alter table public.contact_messages enable row level security;

-- Publik: baca konten aktif
create policy "public read settings"     on public.settings     for select using (true);
create policy "public read testimonials" on public.testimonials for select using (is_active);
create policy "public read partners"     on public.partners     for select using (is_active);
create policy "public read portfolios"   on public.portfolios   for select using (is_active);
create policy "public read faqs"         on public.faqs         for select using (is_active);

-- Publik: kirim pesan kontak (hanya insert)
create policy "public insert messages" on public.contact_messages
  for insert to anon, authenticated with check (true);

-- Admin (authenticated): akses penuh
create policy "admin all settings"     on public.settings         for all to authenticated using (true) with check (true);
create policy "admin all testimonials" on public.testimonials     for all to authenticated using (true) with check (true);
create policy "admin all partners"     on public.partners         for all to authenticated using (true) with check (true);
create policy "admin all portfolios"   on public.portfolios       for all to authenticated using (true) with check (true);
create policy "admin all faqs"         on public.faqs             for all to authenticated using (true) with check (true);
create policy "admin all messages"     on public.contact_messages for all to authenticated using (true) with check (true);
```

> Karena hanya admin yang punya akun, **nonaktifkan public sign-up** di Supabase Auth dan buat user admin manual lewat dashboard.

### Storage

- Bucket publik: `partners`, `settings`.
- Policy: `select` untuk publik; `insert/update/delete` hanya `authenticated`.
- Simpan **URL publik** (`getPublicUrl`) ke kolom `logo_url`. Saat mengganti/menghapus, hapus file lama dari bucket.
- Validasi client: hanya image (png/jpg/webp/svg), maks 2 MB.

---

## 7. Struktur Folder yang Diharapkan

```
ryncode/
├─ public/
├─ src/
│  ├─ lib/
│  │  ├─ supabase.ts            # createClient dari env
│  │  └─ queryClient.ts
│  ├─ types/
│  │  └─ database.ts            # tipe tabel (generate: supabase gen types)
│  ├─ hooks/
│  │  ├─ useTheme.ts
│  │  ├─ useCounter.ts
│  │  ├─ useTypewriter.ts
│  │  ├─ useInView.ts
│  │  ├─ useAutoplay.ts
│  │  └─ useSettings.ts
│  ├─ services/                 # fungsi akses Supabase per entitas
│  │  ├─ testimonials.ts
│  │  ├─ partners.ts
│  │  ├─ portfolios.ts
│  │  ├─ faqs.ts
│  │  ├─ messages.ts
│  │  ├─ settings.ts
│  │  └─ storage.ts
│  ├─ components/
│  │  ├─ ui/                    # Button, Modal, Toast, Badge, Input, dll
│  │  └─ landing/
│  │     ├─ Navbar.tsx
│  │     ├─ Hero.tsx
│  │     ├─ EcosystemSnapshot.tsx
│  │     ├─ Services.tsx
│  │     ├─ Portfolio.tsx
│  │     ├─ PartnerSlider.tsx
│  │     ├─ TestimonialSlider.tsx
│  │     ├─ Faq.tsx
│  │     ├─ ContactForm.tsx
│  │     ├─ FloatingWhatsApp.tsx
│  │     └─ BackToTop.tsx
│  ├─ pages/
│  │  ├─ LandingPage.tsx
│  │  └─ admin/
│  │     ├─ AdminLayout.tsx     # sidebar + topbar
│  │     ├─ Login.tsx
│  │     ├─ Dashboard.tsx
│  │     ├─ testimonials/ (List, Form)
│  │     ├─ partners/ (List, Form)
│  │     ├─ portfolios/ (List, Form)
│  │     ├─ faqs/ (List, Form)
│  │     ├─ messages/List.tsx
│  │     └─ Settings.tsx
│  ├─ components/admin/         # DataTable, SearchInput, Pagination, ConfirmDeleteModal, ImageUpload
│  ├─ routes/
│  │  ├─ index.tsx
│  │  └─ ProtectedRoute.tsx
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css                 # @tailwind directives + CSS variables
├─ .env.example
├─ tailwind.config.ts
├─ vite.config.ts
└─ package.json
```

---

## 8. Routing

| Path | Halaman | Akses |
|---|---|---|
| `/` | Landing (anchor: `#beranda`, `#layanan`, `#portfolio`, `#testimoni`, `#kontak`) | Publik |
| `/admin/login` | Login admin | Publik (redirect ke dashboard jika sudah login) |
| `/admin/dashboard` | Dashboard | Admin |
| `/admin/testimonials`, `/create`, `/:id/edit` | CRUD testimoni | Admin |
| `/admin/partners`, `/create`, `/:id/edit` | CRUD partner | Admin |
| `/admin/portfolios`, `/create`, `/:id/edit` | CRUD portofolio | Admin |
| `/admin/faqs`, `/create`, `/:id/edit` | CRUD FAQ | Admin |
| `/admin/messages` | Pesan masuk | Admin |
| `/admin/settings` | Pengaturan umum | Admin |

Gunakan **lazy loading** (`React.lazy`) untuk seluruh halaman admin agar bundle landing tetap kecil.

---

## 9. Padanan Alpine.js → React

| Alpine (lama) | React (baru) |
|---|---|
| `x-data` state lokal | `useState` / `useReducer` |
| `x-show`, `x-if` | Conditional rendering |
| `x-init` + `setInterval` (typewriter, autoplay) | `useEffect` + cleanup |
| Counter animasi | `useCounter(target, { duration, start })` dipicu `useInView` |
| Dark mode `$store` | `useTheme` + class `dark` pada `<html>` |
| Toast global | Context `ToastProvider` + `useToast()` |
| Validasi real-time form | React Hook Form (`mode: 'onChange'`) + Zod |

---

## 10. Environment Variables

`.env.example`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

- Hanya pakai **anon key** di frontend. **Jangan pernah** memakai `service_role` key di kode client.
- Pastikan `.env` masuk `.gitignore`.

---

## 11. Rencana Eksekusi (Urut)

Kerjakan per fase, commit setelah tiap fase, dan pastikan `npm run build` lolos sebelum lanjut.

**Fase 0 — Audit**
- Clone repo Laravel, baca `routes/web.php`, `app/Models`, `database/migrations`, `resources/views` (landing + admin).
- Sesuaikan skema §6 dengan migration asli; catat selisih.

**Fase 1 — Setup**
- Inisialisasi Vite + React + TS, Tailwind, React Router, TanStack Query, RHF + Zod, supabase-js, lucide-react.
- Konfigurasi Tailwind (`darkMode: 'class'`, warna aksen emerald, font).

**Fase 2 — Supabase**
- Jalankan SQL §6, buat bucket storage + policy, nonaktifkan sign-up, buat user admin.
- Buat `src/lib/supabase.ts`, generate tipe, dan seluruh `services/*`.

**Fase 3 — Landing**
- Bangun komponen sesuai §3–4 dengan data nyata dari Supabase (loading skeleton + empty state).
- Implementasi hooks (`useTypewriter`, `useCounter`, dst.), slider partner/testimoni, FAQ, form kontak → insert `contact_messages`.

**Fase 4 — Admin**
- Auth + `ProtectedRoute`, `AdminLayout` (sidebar responsif).
- CRUD berurutan: Settings → Partner (dengan upload) → Testimoni → Portofolio → FAQ → Pesan.
- Komponen reusable (§5).

**Fase 5 — Polish & Deploy**
- SEO (title, meta, OG), favicon dinamis dari `logo_url`, aksesibilitas (label, fokus, `aria-*`).
- Seed data contoh (SQL) agar landing tidak kosong saat demo.
- Deploy ke Vercel (tambahkan rewrite SPA ke `index.html`), set env vars.
- Tulis `README.md` baru (setup, env, SQL, cara membuat admin).

---

## 12. Aturan untuk Agent

1. **Parity dulu**: jangan menghilangkan fitur lama; tambahan hanya yang tercantum (pesan masuk, dashboard counts).
2. TypeScript **strict**, tanpa `any`.
3. Semua teks UI dalam **Bahasa Indonesia**.
4. Tangani state **loading / error / empty** di setiap query.
5. Jangan hardcode kredensial; jangan commit `.env`.
6. Mutasi admin: tampilkan toast sukses/gagal dan invalidate query terkait.
7. Pertahankan komponen kecil dan reusable; hindari file > ~250 baris.
8. Tanyakan klarifikasi hanya jika ada konflik antara repo lama dan dokumen ini; selain itu ambil keputusan terbaik dan catat di `README`.

---

## 13. Kriteria Selesai

- [ ] Landing identik secara visual & fungsional dengan versi Laravel (dark/light, semua interaksi).
- [ ] Semua konten (portofolio, partner, testimoni, FAQ, settings) dinamis dari Supabase.
- [ ] Admin dapat login dan CRUD seluruh entitas, termasuk upload logo.
- [ ] Form kontak menyimpan pesan dan tampil di admin.
- [ ] RLS aktif; pengunjung publik tidak dapat menulis selain `contact_messages`.
- [ ] Responsif di mobile, tablet, desktop.
- [ ] `npm run build` bersih tanpa error TypeScript/ESLint.
- [ ] Ter-deploy dan `README.md` terbaru tersedia.
