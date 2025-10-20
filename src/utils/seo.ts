
export const seoKeywords = [
  // Ana anahtar kelimeler
  'yedek parça',
  'otomotiv yedek parça',
  'araba yedek parça',
  'oto yedek parça',
  'araç yedek parça',
  'otomotiv parçaları',
  'araba parçası',
  'oto parça',
  
  // Motor parçaları
  'motor parçası',
  'motor yedek parça',
  'piston',
  'segman',
  'supap',
  'motor bloğu',
  'silindir kapağı',
  'krank mili',
  'kam mili',
  'motor contası',
  
  // Fren sistemi
  'fren balata',
  'fren diski',
  'fren kaliper',
  'fren hortumu',
  'fren sıvısı',
  'el freni teli',
  'abs sensörü',
  'fren merkezi',
  
  // Süspansiyon
  'amortisör',
  'yay',
  'rotil',
  'salıncak',
  'stabilize çubuğu',
  'amortisör takozu',
  'süspansiyon parçası',
  
  // Elektrik parçaları
  'alternatör',
  'marş motoru',
  'akü',
  'buji',
  'bobin',
  'sensör',
  'kablo takımı',
  'sigorta',
  'röleler',
  
  // Lastik ve jant
  'lastik',
  'jant',
  'oto lastik',
  'kış lastiği',
  'yaz lastiği',
  'dört mevsim lastik',
  'lastik tamiri',
  
  // Filtreler
  'hava filtresi',
  'yağ filtresi',
  'yakıt filtresi',
  'polen filtresi',
  'kabin filtresi',
  
  // Egzoz sistemi
  'egzoz',
  'susturucu',
  'katalitik konvertör',
  'egzoz borusu',
  'egzoz manifoldu',
  
  // Motor yağları
  'motor yağı',
  'şanzıman yağı',
  'diferansiyel yağı',
  'fren sıvısı',
  'antifriz',
  'cam suyu',
  
  // Kaporta parçaları
  'kaput',
  'çamurluk',
  'tampon',
  'kapı',
  'cam',
  'ayna',
  'far',
  'stop',
  
  // Klima sistemi
  'klima kompresörü',
  'klima radyatörü',
  'klima gazı',
  'klima filtresi',
  
  // Araç markaları
  'volkswagen yedek parça',
  'ford yedek parça',
  'opel yedek parça',
  'renault yedek parça',
  'peugeot yedek parça',
  'fiat yedek parça',
  'bmw yedek parça',
  'mercedes yedek parça',
  'audi yedek parça',
  'toyota yedek parça',
  'honda yedek parça',
  'hyundai yedek parça',
  'kia yedek parça',
  'nissan yedek parça',
  'mazda yedek parça',
  'mitsubishi yedek parça',
  'suzuki yedek parça',
  'dacia yedek parça',
  'skoda yedek parça',
  'seat yedek parça',
  'citroen yedek parça',
  'chevrolet yedek parça',
  
  // Lokasyon bazlı
  'istanbul yedek parça',
  'ankara yedek parça',
  'izmir yedek parça',
  'bursa yedek parça',
  'antalya yedek parça',
  'adana yedek parça',
  'konya yedek parça',
  'gaziantep yedek parça',
  'kayseri yedek parça',
  'mersin yedek parça',
  
  // Hizmet türleri
  'online yedek parça',
  'yedek parça satış',
  'ucuz yedek parça',
  'kaliteli yedek parça',
  'orijinal yedek parça',
  'muadil yedek parça',
  'yedek parça mağazası',
  'yedek parça marketi',
  'hızlı teslimat yedek parça',
  'garantili yedek parça',
  '724 yedek parça',
  'yedek parça bul',
  'parça ara',
  'oto parça bul'
];

export const seoDescriptions = {
  home: '724ParcaBul - Türkiye\'nin en büyük yedek parça satış sitesi. Binlerce otomotiv parçası, hızlı teslimat, uygun fiyat, 2 yıl garanti. Motor parçaları, fren balata, amortisör ve daha fazlası.',
  categories: 'Yedek parça kategorileri - Motor parçaları, fren sistemi, süspansiyon, elektrik parçaları, lastik, filtreler ve daha fazlası. Tüm araç markalarına uygun parçalar.',
  products: 'Kaliteli yedek parçalar uygun fiyatlarla. Orijinal ve muadil parçalar, hızlı teslimat, 2 yıl garanti. 50.000+ ürün çeşidi.',
  cart: 'Sepetiniz - Güvenli ödeme, hızlı teslimat. Kredi kartı, havale, kapıda ödeme seçenekleri. Ücretsiz kargo fırsatları.',
  account: 'Hesabım - Sipariş takibi, adres bilgileri, favori ürünler. Kişisel yedek parça alışveriş deneyimi.',
  orders: 'Siparişlerim - Sipariş durumu, kargo takibi, fatura görüntüleme. Geçmiş siparişlerinizi yönetin.'
};

export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '724ParcaBul',
    url: 'https://724parcabul.com',
    logo: 'https://724parcabul.com/logo.png',
    description: 'Türkiye\'nin en büyük yedek parça satış sitesi',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'İstanbul',
      addressRegion: 'İstanbul'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-212-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: 'Turkish'
    }
  },
  
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '724ParcaBul',
    url: 'https://724parcabul.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://724parcabul.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  },
  
  store: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: '724ParcaBul',
    description: 'Otomotiv yedek parçaları satışı',
    url: 'https://724parcabul.com',
    telephone: '+90-212-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'İstanbul'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    }
  }
};
