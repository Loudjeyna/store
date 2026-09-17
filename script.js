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

let cartCount = 0; // متغير لحفظ عدد المنتجات

function addToCart() {
    // زيادة العداد
    cartCount++;
    
    // تحديث الرقم في الصفحة
    document.getElementById('cart-count').innerText = cartCount;
    
    // الرسالة القديمة
    const msgAr = "تمت الإضافة للسلة بنجاح! 🌸";
    const msgEn = "Added to cart successfully! 🌸";
    
    const isEnglish = document.body.classList.contains('english-mode');
    alert(isEnglish ? msgEn : msgAr);
}