
export const mockOrders = [
  {
    id: '1',
    user_id: 'user1',
    guest_name: null,
    guest_email: null,
    total: 1245.90,
    status: 'completed',
    created_at: '2024-01-20T14:30:00Z',
    items: [
      {
        id: 'item1',
        order_id: '1',
        product_id: '1',
        qty: 2,
        unit_price: 45.90,
        product_name: 'Bosch Motor Yağ Filtresi',
        created_at: '2024-01-20T14:30:00Z'
      },
      {
        id: 'item2',
        order_id: '1',
        product_id: '6',
        qty: 1,
        unit_price: 1450.00,
        product_name: 'Denso Klima Kompresörü',
        created_at: '2024-01-20T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    user_id: null,
    guest_name: 'Mehmet Yılmaz',
    guest_email: 'mehmet.yilmaz@email.com',
    total: 875.90,
    status: 'processing',
    created_at: '2024-01-19T11:15:00Z',
    items: [
      {
        id: 'item3',
        order_id: '2',
        product_id: '2',
        qty: 1,
        unit_price: 289.90,
        product_name: 'Brembo Fren Balata Takımı',
        created_at: '2024-01-19T11:15:00Z'
      },
      {
        id: 'item4',
        order_id: '2',
        product_id: '13',
        qty: 1,
        unit_price: 580.00,
        product_name: 'Eibach Pro-Kit Yay Takımı',
        created_at: '2024-01-19T11:15:00Z'
      }
    ]
  },
  {
    id: '3',
    user_id: 'user2',
    guest_name: null,
    guest_email: null,
    total: 2195.00,
    status: 'shipped',
    created_at: '2024-01-18T16:45:00Z',
    items: [
      {
        id: 'item5',
        order_id: '3',
        product_id: '8',
        qty: 1,
        unit_price: 1850.00,
        product_name: 'ZF Direksiyon Kutusu',
        created_at: '2024-01-18T16:45:00Z'
      },
      {
        id: 'item6',
        order_id: '3',
        product_id: '12',
        qty: 1,
        unit_price: 345.00,
        product_name: 'ATE Fren Diski',
        created_at: '2024-01-18T16:45:00Z'
      }
    ]
  },
  {
    id: '4',
    user_id: null,
    guest_name: 'Ayşe Demir',
    guest_email: 'ayse.demir@email.com',
    total: 320.00,
    status: 'pending',
    created_at: '2024-01-17T09:20:00Z',
    items: [
      {
        id: 'item7',
        order_id: '4',
        product_id: '24',
        qty: 1,
        unit_price: 320.00,
        product_name: 'NGK Iridium Buji Takımı',
        created_at: '2024-01-17T09:20:00Z'
      }
    ]
  },
  {
    id: '5',
    user_id: 'user3',
    guest_name: null,
    guest_email: null,
    total: 1535.00,
    status: 'completed',
    created_at: '2024-01-16T13:10:00Z',
    items: [
      {
        id: 'item8',
        order_id: '5',
        product_id: '10',
        qty: 1,
        unit_price: 1290.00,
        product_name: 'BMW Orijinal Çamurluk Sağ',
        created_at: '2024-01-16T13:10:00Z'
      },
      {
        id: 'item9',
        order_id: '5',
        product_id: '20',
        qty: 1,
        unit_price: 245.00,
        product_name: 'Mercedes Orijinal Kapı Kolu',
        created_at: '2024-01-16T13:10:00Z'
      }
    ]
  },
  {
    id: '6',
    user_id: null,
    guest_name: 'Can Özkan',
    guest_email: 'can.ozkan@email.com',
    total: 730.00,
    status: 'processing',
    created_at: '2024-01-15T15:30:00Z',
    items: [
      {
        id: 'item10',
        order_id: '6',
        product_id: '3',
        qty: 1,
        unit_price: 650.00,
        product_name: 'Bilstein B4 Amortisör Takımı',
        created_at: '2024-01-15T15:30:00Z'
      },
      {
        id: 'item11',
        order_id: '6',
        product_id: '17',
        qty: 1,
        unit_price: 75.00,
        product_name: 'Hengst Yakıt Filtresi',
        created_at: '2024-01-15T15:30:00Z'
      }
    ]
  },
  {
    id: '7',
    user_id: 'user4',
    guest_name: null,
    guest_email: null,
    total: 2150.00,
    status: 'completed',
    created_at: '2024-01-14T10:45:00Z',
    items: [
      {
        id: 'item12',
        order_id: '7',
        product_id: '15',
        qty: 1,
        unit_price: 2150.00,
        product_name: 'HJS Katalitik Konvertör',
        created_at: '2024-01-14T10:45:00Z'
      }
    ]
  },
  {
    id: '8',
    user_id: null,
    guest_name: 'Fatma Kaya',
    guest_email: 'fatma.kaya@email.com',
    total: 455.00,
    status: 'shipped',
    created_at: '2024-01-13T12:20:00Z',
    items: [
      {
        id: 'item13',
        order_id: '8',
        product_id: '9',
        qty: 2,
        unit_price: 185.00,
        product_name: 'Philips X-tremeUltinon LED H7',
        created_at: '2024-01-13T12:20:00Z'
      },
      {
        id: 'item14',
        order_id: '8',
        product_id: '11',
        qty: 1,
        unit_price: 85.00,
        product_name: 'Mann Filter Hava Filtresi',
        created_at: '2024-01-13T12:20:00Z'
      }
    ]
  }
];
