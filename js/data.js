// Sample product data
const sampleProducts = [
    {
        id: '1',
        slug: 'rolex-submariner-date',
        name: 'Submariner Date',
        brand: 'Rolex',
        category: 'Diver',
        description: 'The epitome of divers watches, featuring a Cerachrom bezel and Chromalight display. The Oyster Perpetual Submariner Date is the reference point for divers watches.',
        price: 42500,
        reference_number: 'RO-126610LN',
        case_material: 'Oystersteel',
        diameter: '41mm',
        movement_type: 'Automatic',
        water_resistance: '300m',
        strap_type: 'Oyster bracelet',
        stock_quantity: 3,
        featured: true,
        images: [
            'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=1000&fit=crop'
        ],
        created_at: '2024-01-15'
    },
    {
        id: '2',
        slug: 'omega-speedmaster-moonwatch',
        name: 'Speedmaster Moonwatch',
        brand: 'Omega',
        category: 'Chronograph',
        description: 'The first watch on the moon, featuring manual-winding movement and Hesalite crystal. A true icon of space exploration.',
        price: 32750,
        reference_number: 'OM-3103042',
        case_material: 'Stainless Steel',
        diameter: '42mm',
        movement_type: 'Manual-winding',
        water_resistance: '50m',
        strap_type: 'NATO strap',
        stock_quantity: 5,
        featured: true,
        images: [
            'https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?w=800&h=1000&fit=crop'
        ],
        created_at: '2024-01-20'
    },
    {
        id: '3',
        slug: 'audemars-piguet-royal-oak',
        name: 'Royal Oak',
        brand: 'Audemars Piguet',
        category: 'Luxury',
        description: 'Iconic octagonal bezel with exposed screws and integrated bracelet. The Royal Oak revolutionized luxury sports watches.',
        price: 87500,
        reference_number: 'AP-15500ST',
        case_material: 'Stainless Steel',
        diameter: '41mm',
        movement_type: 'Automatic',
        water_resistance: '50m',
        strap_type: 'Integrated bracelet',
        stock_quantity: 2,
        featured: true,
        images: [
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=1000&fit=crop'
        ],
        created_at: '2024-01-10'
    },
    {
        id: '4',
        slug: 'patek-philippe-nautilus',
        name: 'Nautilus',
        brand: 'Patek Philippe',
        category: 'Luxury',
        description: 'Porthole-inspired design with horizontal embossing and date window. The Nautilus is a masterpiece of elegance and sportiness.',
        price: 125000,
        reference_number: 'PP-5711A',
        case_material: 'Stainless Steel',
        diameter: '40mm',
        movement_type: 'Automatic',
        water_resistance: '120m',
        strap_type: 'Integrated bracelet',
        stock_quantity: 1,
        featured: true,
        images: [
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&h=1000&fit=crop'
        ],
        created_at: '2024-01-05'
    },
    {
        id: '5',
        slug: 'tag-heuer-carrera',
        name: 'Carrera',
        brand: 'TAG Heuer',
        category: 'Racing',
        description: 'Chronograph with tachymeter scale inspired by motor racing. The Carrera embodies TAG Heuers racing heritage.',
        price: 18500,
        reference_number: 'TH-CBN201A',
        case_material: 'Stainless Steel',
        diameter: '44mm',
        movement_type: 'Automatic',
        water_resistance: '100m',
        strap_type: 'Leather strap',
        stock_quantity: 8,
        featured: false,
        images: [
            'https://images.unsplash.com/photo-1585123334904-845d60e6b8d6?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1585123334904-845d60e6b8d6?w=800&h=1000&fit=crop'
        ],
        created_at: '2024-01-25'
    },
    {
        id: '6',
        slug: 'cartier-tank-francaise',
        name: 'Tank Française',
        brand: 'Cartier',
        category: 'Dress',
        description: 'Rectangular case with Roman numerals and cabochon crown. The Tank Française combines elegance with modern design.',
        price: 22400,
        reference_number: 'CA-W5001156',
        case_material: 'Steel',
        diameter: '36mm',
        movement_type: 'Quartz',
        water_resistance: '30m',
        strap_type: 'Steel bracelet',
        stock_quantity: 4,
        featured: true,
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=1000&fit=crop'
        ],
        created_at: '2024-01-18'
    }
];

// Sample testimonials
const sampleTestimonials = [
    {
        id: '1',
        customer_name: 'Ahmed Al Mansouri',
        customer_city: 'Abu Dhabi',
        quote: 'The attention to detail and authenticity checks gave me complete confidence in my purchase. My Rolex arrived in perfect condition with all papers.',
        rating: 5,
        approved: true
    },
    {
        id: '2',
        customer_name: 'Fatima K.',
        customer_city: 'Dubai',
        quote: 'WhatsApp ordering was seamless. Their team responded within minutes and my watch arrived within 24 hours. Exceptional service!',
        rating: 5,
        approved: true
    },
    {
        id: '3',
        customer_name: 'Omar H.',
        customer_city: 'Riyadh',
        quote: 'Truly premium experience from browsing to delivery. Highly recommended for anyone seeking authentic luxury timepieces in the region.',
        rating: 5,
        approved: true
    }
];

// Initialize localStorage with sample data if empty
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
}
if (!localStorage.getItem('testimonials')) {
    localStorage.setItem('testimonials', JSON.stringify(sampleTestimonials));
}

// Helper functions
function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function getTestimonials() {
    return JSON.parse(localStorage.getItem('testimonials') || '[]');
}

function getStockStatus(stock) {
    if (stock <= 0) return { text: 'Sold Out', class: 'stock-out' };
    if (stock <= 2) return { text: `Only ${stock} Left`, class: 'stock-low' };
    return { text: 'In Stock', class: 'stock-in' };
      }
