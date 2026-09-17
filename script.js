// --- 1. قائمة المنتجات (اضيفي منتجاتك هنا بسهولة) ---
const products = [
    {
        img: "https://picsum.photos/seed/hairpin/300/300",
        nameAr: "دبابيس شعر زهرية",
        nameEn: "Floral Hair Pins",
        price: "$5.00"
    },
    {
        img: "https://picsum.photos/seed/bag/300/300",
        nameAr: "حقبة كيوت صغيرة",
        nameEn: "Cute Mini Bag",
        price: "$12.50"
    },
    {
        img: "https://picsum.photos/seed/stationery/300/300",
        nameAr: "مجموعة دفاتر ميمو",
        nameEn: "Memo Notebooks Set",
        price: "$8.00"
    },
    {
        img: "https://picsum.photos/seed/phonecase/300/300",
        nameAr: "كفر جوال ناعم",
        nameEn: "Soft Phone Case",
        price: "$6.00"
    }
    // عند إضافة منتج جديد، انسخ أحد الأقواس {} بالأعلى وأضفه هنا
];

// --- 2. دالة عرض المنتجات في الصفحة ---
// --- 2. دالة عرض المنتجات في الصفحة ---
function displayProducts() {
    const container = document.getElementById('products-container');
    
    let productsHTML = '';
    
    products.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <img src="${product.img}" alt="Product" class="product-img">
                <div class="product-info">
                    <div class="product-title">
                        <span data-lang-ar">${product.nameAr}</span>
                        <span data-lang-en">${product.nameEn}</span>
                    </div>
                    <div class="product-price">${product.price}</div>
                </div>
                <button class="btn add-btn" onclick="addToCart()">
                    <span data-lang-ar">أضيفي للسلة</span>
                    <span data-lang-en">Add to Cart</span>
                </button>
            </div>
        `;
    });

    container.innerHTML = productsHTML;
}
// --- 3. تشغيل الدالة عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', displayProducts);


// --- باقي الأكواد القديمة (اللغة، القائمة، العربة) ---

let cartCount = 0;

function toggleLanguage() {
    const body = document.body;
    const html = document.documentElement;
    
    body.classList.toggle('english-mode');
    
    if (body.classList.contains('english-mode')) {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
    } else {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    }
}

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

function addToCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    const msgAr = "تمت الإضافة للسلة بنجاح! 🌸";
    const msgEn = "Added to cart successfully! 🌸";
    const isEnglish = document.body.classList.contains('english-mode');
    alert(isEnglish ? msgEn : msgAr);
}