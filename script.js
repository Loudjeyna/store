// --- 1. قائمة المنتجات (اضيفي منتجاتك هنا بسهولة) ---
const products = [
    {
        img: "https://picsum.photos/seed/hairpin/300/300",
        nameAr: "دبابيس شعر زهرية",
        nameEn: "Floral Hair Pins",
        price: "500 DA" // تم التغيير
    },
    {
        img: "https://picsum.photos/seed/bag/300/300",
        nameAr: "حقبة كيوت صغيرة",
        nameEn: "Cute Mini Bag",
        price: "1200 DA" // تم التغيير
    },
    {
        img: "https://picsum.photos/seed/stationery/300/300",
        nameAr: "مجموعة دفاتر ميمو",
        nameEn: "Memo Notebooks Set",
        price: "800 DA" // تم التغيير
    },
    {
        img: "https://picsum.photos/seed/phonecase/300/300",
        nameAr: "كفر جوال ناعم",
        nameEn: "Soft Phone Case",
        price: "600 DA" // تم التغيير
    }


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
// --- 6. دالة عرض محتويات السلة (تعمل في صفحة cart.html) ---
// --- 6. دالة عرض محتويات السلة (تعمل في صفحة cart.html) ---
function displayCart() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');
    const summaryElement = document.querySelector('.cart-summary');
    const checkoutBtn = document.querySelector('.checkout-btn'); // الإمساك بزر الواتساب
    
    if (!container) return; 

    const storedCart = localStorage.getItem('bloomCart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">سلتك فارغة حالياً 🛒</p>';
       totalElement.innerText = totalPrice + ' DA';
        if (summaryElement) summaryElement.style.display = 'none'; 
        return;
    }

    let cartHTML = '<ul class="cart-list">';
    let totalPrice = 0;
    
    // بناء نص رسالة الواتساب
    let whatsappMessage = "مرحباً! أود طلب المنتجات التالية من Bloom Store 🌸:\n\n";

    cart.forEach((item, index) => {
       totalPrice += parseFloat(item.price.replace(' DA', ''));
        
        // إضافة المنتج للصفحة
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
        
        // إضافة المنتج لنص رسالة الواتساب
        whatsappMessage += `- ${item.nameAr} (${item.price})\n`;
    });

    cartHTML += '</ul>';
    container.innerHTML = cartHTML;
    totalElement.innerText = 'DA' + totalPrice.toFixed(2);
    
    // إضافة المجموع لنص الرسالة
   whatsappMessage += `\nالمجموع الكلي: ${totalPrice} DA\nشكراً!`;
    // تحديث رابط زر الواتساب ليتضمن الرسالة
    // ملاحظة: استبدلي 967123456789 برقمك الحقيقي بالصيغة الدولية (بدون + أو أصفار)
       // تحديث رابط زر الواتساب ليتضمن الرسالة
    if (checkoutBtn) {
        // 1. ضعي رقمك هنا (الرمز الدولي بدون + ثم الرقم)
        // مثال للسعودية: 966501234567
        // مثال لمصر: 201012345678
        const phoneNum = "213778663946"; // <-- يجب تغييره لرقمك الحقيقي
        
        // 2. استخدام الرابط الرسمي api.whatsapp.com بدلاً من wa.me
        checkoutBtn.href = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(whatsappMessage)}`;
    }
    
    if (summaryElement) summaryElement.style.display = 'block'; 
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