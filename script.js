// --- 1. قائمة المنتجات ---
// --- 1. قائمة المنتجات ---
// --- 1. قائمة المنتجات ---
// --- 1. قائمة المنتجات ---
const products = [
    {
        img: "https://images.unsplash.com/photo-1596666833190-5f1db60d076c?w=300&h=300&fit=crop",
        nameAr: "دبابيس شعر زهرية",
        nameEn: "Floral Hair Pins",
        price: "500 DA"
    },
    {
        img: "https://images.unsplash.com/photo-1590878206465-3c21b7e2216a?w=300&h=300&fit=crop",
        nameAr: "حقبة كيوت صغيرة",
        nameEn: "Cute Mini Bag",
        price: "1200 DA"
    },
    {
        img: "https://images.unsplash.com/photo-1531317299424-03db9b68c705?w=300&h=300&fit=crop",
        nameAr: "مجموعة دفاتر ميمو",
        nameEn: "Memo Notebooks Set",
        price: "800 DA"
    },
    {
        img: "https://images.unsplash.com/photo-1601784553764-3b9b4cd0b591?w=300&h=300&fit=crop",
        nameAr: "كفر جوال ناعم",
        nameEn: "Soft Phone Case",
        price: "600 DA"
    },
    {
        img: "https://images.unsplash.com/photo-1515562142218-4d89b35c9ee1?w=300&h=300&fit=crop",
        nameAr: "طقم اكسسوارات لؤلؤي",
        nameEn: "Pearl Accessories Set",
        price: "1500 DA"
    },
    {
        img: "https://images.unsplash.com/photo-1606338361531-e67e56f2b32f?w=300&h=300&fit=crop",
        nameAr: "حافظة كيوت للماكياج",
        nameEn: "Cute Makeup Pouch",
        price: "900 DA"
    },
    {
        img: "https://images.unsplash.com/photo-1585852429375-32a67e7e0f74?w=300&h=300&fit=crop",
        nameAr: "وسادة ديكور شكل أرنب",
        nameEn: "Bunny Decor Pillow",
        price: "1800 DA"
    }
];

// --- 2. المتغيرات العامة ---
let cartCount = 0;
let cartItems = [];

// --- 3. دالة عرض المنتجات في الصفحة ---
function displayProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    let productsHTML = '';
    
    products.forEach((product, index) => {
        productsHTML += `
            <div class="product-card">
                <img src="${product.img}" alt="Product" class="product-img">
                <div class="product-info">
                    <div class="product-title">
                        <span data-lang-ar>${product.nameAr}</span>
                        <span data-lang-en>${product.nameEn}</span>
                    </div>
                    <div class="product-price">${product.price}</div>
                </div>
                <button class="btn add-btn" onclick="addToCartSpecific(${index})">
                    <span data-lang-ar>أضيفي للسلة</span>
                    <span data-lang-en>Add to Cart</span>
                </button>
            </div>
        `;
    });

    container.innerHTML = productsHTML;
}

// --- 4. دالة إضافة منتج محدد للسلة ---
function addToCartSpecific(productIndex) {
    const storedCart = localStorage.getItem('bloomCart');
    let cartItems = storedCart ? JSON.parse(storedCart) : [];
    
    const productToAdd = products[productIndex];
    const existingItemIndex = cartItems.findIndex(item => item.nameAr === productToAdd.nameAr);
    
    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].qty = (cartItems[existingItemIndex].qty || 1) + 1;
    } else {
        cartItems.push({ ...productToAdd, qty: 1 });
    }
    
    localStorage.setItem('bloomCart', JSON.stringify(cartItems));
    updateCartCount();
    
    const msgAr = "تمت الإضافة للسلة بنجاح! 🌸";
    const msgEn = "Added to cart successfully! 🌸";
    const isEnglish = document.body.classList.contains('english-mode');
    showToast(isEnglish ? msgEn : msgAr);
}

// --- دالة الإشعار المنبثق ---
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// --- 5. دالة تحديث العداد ---
function updateCartCount() {
    const storedCart = localStorage.getItem('bloomCart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    document.getElementById('cart-count').innerText = totalQty;
}

// --- 6. دالة عرض محتويات السلة ---
function displayCart() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');
    const summaryElement = document.querySelector('.cart-summary');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (!container) return; 

    const storedCart = localStorage.getItem('bloomCart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">سلتك فارغة حالياً 🛒</p>';
        totalElement.innerText = '0 DA';
        if (summaryElement) summaryElement.style.display = 'none'; 
        return;
    }

    let cartHTML = '<ul class="cart-list">';
    let totalPrice = 0;
    let whatsappMessage = "مرحباً! أود طلب المنتجات التالية من Bloom Store 🌸:\n\n";

    // حلقة التكرار التي كانت مفقودة
    cart.forEach((item, index) => {
        const itemQty = item.qty || 1;
        const itemPriceNum = parseFloat(item.price.replace(' DA', ''));
        const itemTotalPrice = itemPriceNum * itemQty;
        
        totalPrice += itemTotalPrice;
        
        cartHTML += `
            <li class="cart-item">
                <img src="${item.img}" alt="Product">
                <div class="cart-item-details">
                    <h4 data-lang-ar="${item.nameAr}" data-lang-en="${item.nameEn}">
                        ${item.nameAr}
                    </h4>
                    <span class="cart-price">${itemTotalPrice} DA</span>
                </div>
                <!-- أزرار التحكم في الكمية -->
                <div class="qty-controls">
                    <button class="qty-btn minus" onclick="updateQty(${index}, -1)">-</button>
                    <span class="qty-num">${itemQty}</span>
                    <button class="qty-btn plus" onclick="updateQty(${index}, 1)">+</button>
                </div>
            </li>
        `;
        
        whatsappMessage += `- ${item.nameAr} (${item.price}) x${itemQty} = ${itemTotalPrice} DA\n`;
    });

    cartHTML += '</ul>';
    container.innerHTML = cartHTML;
    
    totalElement.innerText = totalPrice + ' DA';
    whatsappMessage += `\nالمجموع الكلي: ${totalPrice} DA\nشكراً!`;
    
    if (summaryElement) summaryElement.style.display = 'block'; 

    if (checkoutBtn) {
        const phoneNum = "213778663946"; 
        checkoutBtn.href = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(whatsappMessage)}`;
        checkoutBtn.innerHTML = `
            <span>📱</span>
            <span data-lang-ar>إتمام الطلب عبر واتساب</span>
            <span data-lang-en>Checkout via WhatsApp</span>
        `;
    }
}

// --- 7. دالة تحديث كمية المنتج (الخاصة بأزرار + و -) ---
function updateQty(index, change) {
    const storedCart = localStorage.getItem('bloomCart');
    let cart = storedCart ? JSON.parse(storedCart) : [];
    
    cart[index].qty = (cart[index].qty || 1) + change;
    
    if (cart[index].qty < 1) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('bloomCart', JSON.stringify(cart));
    displayCart(); 
    updateCartCount(); 
}

// --- 8. دوال الواجهة ---
function toggleLanguage() {
    const body = document.body;
    const html = document.documentElement;
    
    body.classList.toggle('english-mode');
    const isEnglish = body.classList.contains('english-mode');
    
    if (isEnglish) {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        localStorage.setItem('bloomLang', 'en');
    } else {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        localStorage.setItem('bloomLang', 'ar');
    }
}

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// --- 9. التشغيل الرئيسي ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('bloomLang');
    if (savedLang === 'en') {
        document.body.classList.add('english-mode');
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
    }

    updateCartCount();
    
    if (document.getElementById('products-container')) {
        displayProducts();
    }
    
    if (document.getElementById('cart-items-container')) {
        displayCart();
    }
});