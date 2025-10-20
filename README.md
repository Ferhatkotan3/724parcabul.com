
# 724ParcaBul - Yedek Parça E-Ticaret Sitesi

724ParcaBul, React + TypeScript + Supabase teknolojileri kullanılarak geliştirilmiş modern bir yedek parça satış platformudur.

## 🚀 Özellikler

### Kullanıcı Tarafı
- **Ana Sayfa**: Arama kutusu, En Çok Satanlar, Yeni Eklenenler, banner
- **Kategoriler**: Fiyat aralığı ve stok filtreleri
- **Ürün Detay**: Görsel, parça kodu, açıklama, stok, fiyat, "Sepete Ekle"
- **Sepet**: Artır/azalt/sil, toplam tutar, misafir satın alma
- **Satın Alma**: "Siparişi Onayla (Test Modu)" → sipariş kaydı
- **Hesap**: Üye Ol / Giriş Yap (Supabase Auth), Profil, Siparişlerim
- **Responsive**: Mobil/masaüstü uyumlu, koyu/açık tema

### Admin Panel (/admin)
- **Giriş**: Sadece role='admin' kullanıcıları
- **Parçalar**: Liste, ekle, düzenle, sil, fiyat/stok/resim güncelle
- **Excel/CSV Import/Export**: Toplu ürün yönetimi
- **Kategoriler**: CRUD işlemleri
- **Siparişler**: Durum değiştirme (Bekliyor → Kargoda → Tamamlandı)
- **Raporlar**: Satış grafiği, en çok satanlar
- **Realtime**: Anlık değişiklik yansıması

## 🛠️ Teknolojiler

- **Frontend**: React 19, TypeScript, TailwindCSS
- **State Management**: Zustand
- **Form Validation**: React Hook Form + Zod
- **Backend**: Supabase (Auth + Database + Storage + Realtime)
- **Icons**: Remix Icons, Font Awesome
- **Notifications**: React Hot Toast

## 📦 Kurulum

### 1. Projeyi İndirin
```bash
git clone <repository-url>
cd 724parcabul
npm install
```

### 2. Environment Değişkenleri
`.env` dosyası oluşturun:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Supabase Kurulumu

#### Veritabanı Tabloları
Supabase SQL Editor'da aşağıdaki tabloları oluşturun:

```sql
-- Profiles tablosu
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Categories tablosu
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products tablosu
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  part_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders tablosu
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  guest_name TEXT,
  guest_email TEXT,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items tablosu
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  qty INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### RLS (Row Level Security) Politikaları
```sql
-- Products için RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Sadece admin yazabilir
CREATE POLICY "Products are editable by admins" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Categories için benzer politikalar
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Categories are editable by admins" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Orders için kullanıcı bazlı erişim
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Order items için benzer politika
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  )
);
```

### 4. Seed Data
Projeyi başlattıktan sonra mock veriler otomatik olarak yüklenecektir.

### 5. Projeyi Başlatın
```bash
npm run dev
```

## 👤 Test Hesapları

### Admin Hesabı
- **E-posta**: admin@724parcabul.com
- **Şifre**: Admin123!

## 📊 Excel Import/Export

### Excel Formatı
Ürün import/export için kullanılacak Excel kolonları:
```
part_code | name | description | price | stock | category | image_url
```

### Örnek Excel Satırı
```
FLT001 | Motor Yağ Filtresi | Yüksek kaliteli motor yağ filtresi | 45.90 | 150 | Motor Parçaları | https://example.com/image.jpg
```

## 🔧 API Sync

Admin panelinde API sync özelliği ile harici sistemlerden ürün verilerini senkronize edebilirsiniz.

### API Endpoint Örneği
```javascript
// GET /api/products
{
  "products": [
    {
      "part_code": "FLT001",
      "name": "Motor Yağ Filtresi",
      "description": "Yüksek kaliteli motor yağ filtresi",
      "price": 45.90,
      "stock": 150,
      "category": "Motor Parçaları",
      "image_url": "https://example.com/image.jpg"
    }
  ]
}
```

## 🚀 Deployment

### Vercel Deployment
1. Vercel hesabınıza giriş yapın
2. GitHub repository'nizi bağlayın
3. Environment variables'ları ekleyin
4. Deploy edin

### Netlify Deployment
1. Netlify hesabınıza giriş yapın
2. GitHub repository'nizi bağlayın
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Environment variables'ları ekleyin

## 🌐 Domain Bağlama

### Custom Domain
1. DNS ayarlarınızda CNAME kaydı oluşturun
2. Vercel/Netlify panelinden domain'i ekleyin
3. SSL sertifikası otomatik olarak oluşturulacaktır

### SMTP Ayarları
Supabase Auth için SMTP ayarlarını yapılandırın:
1. Supabase Dashboard → Authentication → Settings
2. SMTP ayarlarını girin
3. Email templates'leri özelleştirin

## 📱 Özellikler

### Realtime Updates
- Stok değişiklikleri anlık olarak güncellenir
- Yeni siparişler admin panelinde anlık görünür
- Fiyat değişiklikleri tüm kullanıcılara yansır

### Responsive Design
- Mobil öncelikli tasarım
- Tablet ve masaüstü uyumlu
- Touch-friendly interface

### SEO Optimizasyonu
- Meta tags
- Structured data
- Sitemap
- Open Graph tags

## 🔒 Güvenlik

### Authentication
- Supabase Auth ile güvenli giriş
- JWT token tabanlı oturum yönetimi
- Role-based access control

### Data Security
- Row Level Security (RLS)
- SQL injection koruması
- XSS koruması

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- GitHub Issues
- E-posta: support@724parcabul.com
- Telefon: +90 555 724 7272

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
