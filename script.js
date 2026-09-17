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

// --- 2. المتغيرات العامة ---
let cartCount = 0;
let cartItems = [];

// --- 3. دالة عرض المنتجات في الصفحة ---
function displayProducts() {
    const container = document.getElementById('products-container');
    
    // التحقق من وجود الحاوية (لأن هذا الكود يعمل أيضاً في cart.html)
    if (!container) return;

    let productsHTML = '';
    
    products.forEach((product, index) => {
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
                <!-- استدعاء الدالة مع تمرير رقم المنتج -->
                <button class="btn add-btn" onclick="addToCartSpecific(${index})">
                    <span data-lang-ar">أضيفي للسلة</span>
                    <span data-lang-en">Add to Cart</span>
                </button>
            </div>
        `;
    });

    container.innerHTML = productsHTML;
}

// --- 4. دالة إضافة منتج محدد للسلة ---
function addToCartSpecific(productIndex) {
    // قراءة السلة الحالية من الذاكرة
    const storedCart = localStorage.getItem('bloomCart');
    cartItems = storedCart ? JSON.parse(storedCart) : [];
    
    // إضافة المنتج بناءً على فهرسه في مصفوفة products
    cartItems.push(products[productIndex]);
    
    // حفظ في الذاكرة
    localStorage.setItem('bloomCart', JSON.stringify(cartItems));
    
    // تحديث العداد
    updateCartCount();
    
    const msgAr = "تمت الإضافة للسلة بنجاح! 🌸";
    const msgEn = "Added to cart successfully! 🌸";
    const isEnglish = document.body.classList.contains('english-mode');
    alert(isEnglish ? msgEn : msgAr);
}

// --- 5. دالة تحديث العداد في الهيدر ---
function updateCartCount() {
    const storedCart = localStorage.getItem('bloomCart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    document.getElementById('cart-count').innerText = cart.length;
}

// --- 6. دالة عرض محتويات السلة (تعمل في صفحة cart.html) ---
function displayCart() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');
    
    if (!container) return; // إذا لم نكن في صفحة السلة، لا تفعل شيئاً

    const storedCart = localStorage.getItem('bloomCart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">سلتك فارغة حالياً 🛒</p>';
        totalElement.innerText = '$0.00';
        return;
    }

    let cartHTML = '<ul class="cart-list">';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += parseFloat(item.price.replace('$', ''));
        cartHTML += `
            <li class="cart-item">
                <img src="${item.img}" alt="Product">
                <div class="cart-item-details">
                    <h4 data-lang-ar="${item.nameAr}" data-lang-en="${item.nameEn}">
                        ${item.nameAr}
                    </h4>
                    <span class="cart-price">${item.price}</span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
            </li>
        `;
    });

    cartHTML += '</ul>';
    container.innerHTML = cartHTML;
    totalElement.innerText = '$' + totalPrice.toFixed(2);
}

// --- 7. دالة حذف منتج ---
function removeFromCart(index) {
    const storedCart = localStorage.getItem('bloomCart');
    let cart = storedCart ? JSON.parse(storedCart) : [];
    
    cart.splice(index, 1); // حذف العنصر
    localStorage.setItem('bloomCart', JSON.stringify(cart));
    
    displayCart(); // إعادة عرض السلة
    updateCartCount(); // تحديث العداد
}

// --- 8. دوال الواجهة (اللغة والقائمة) ---
// --- 8. دوال الواجهة (اللغة والقائمة) ---
function toggleLanguage() {
    const body = document.body;
    const html = document.documentElement;
    
    body.classList.toggle('english-mode');
    
    const isEnglish = body.classList.contains('english-mode');
    
    if (isEnglish) {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        // حفظ اختيار اللغة في الذاكرة
        localStorage.setItem('bloomLang', 'en');
    } else {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        // حفظ اختيار اللغة في الذاكرة
        localStorage.setItem('bloomLang', 'ar');
    }
}

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// --- 9. التشغيل الرئيسي عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    // التحقق من اللغة المحفوظة (للانتقال بين الصفحات)
    const savedLang = localStorage.getItem('bloomLang');
    if (savedLang === 'en') {
        document.body.classList.add('english-mode');
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
    }

    // تحديث العداد دائماً في كل الصفحات
    updateCartCount();
    
    // عرض المنتجات إذا كنا في الصفحة الرئيسية (index.html)
    if (document.getElementById('products-container')) {
        displayProducts();
    }
    
    // عرض السلة إذا كنا في صفحة السلة (cart.html)
    if (document.getElementById('cart-items-container')) {
        displayCart();
    }
});

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// --- 9. التشغيل الرئيسي عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    // تحديث العداد دائماً في كل الصفحات
    updateCartCount();
    
    // عرض المنتجات إذا كنا في الصفحة الرئيسية (index.html)
    if (document.getElementById('products-container')) {
        displayProducts();
    }
    
    // عرض السلة إذا كنا في صفحة السلة (cart.html)
    if (document.getElementById('cart-items-container')) {
        displayCart();
    }
});