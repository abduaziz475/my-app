import React, { useState } from "react";
import { 
  FaHome, FaThLarge, FaWallet, FaShoppingCart, FaUser, 
  FaCog, FaSignOutAlt, FaSearch, FaBell, FaCommentAlt, FaPlus, FaMinus, FaStar, FaTruck, FaStore 
} from "react-icons/fa";
import "./styles.css";

// Rasmga mos haqiqiy mahsulotlar
const productsData = [
  { id: 1, name: "Stylish Backpack", price: 20.00, img: "https://img.ltwebstatic.com/images3_pi/2022/11/17/16686689849202a01d5113ac547d2f93cb338b975d_thumbnail_600x.webp", rating: 5 },
  { id: 2, name: "Shirt", price: 19.00, img: "https://p.calameoassets.com/221111162456-eb5f8fb1730d66c3a1ed0a8a6be96e2f/p1.jpg", rating: 4 },
  { id: 3, name: "Stylish Shorts", price: 9.00, img: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/22379166/2023/3/17/2a13b0c8-47ac-442b-98f2-8eb479c0952a1679051410886PumaMenHigh-WaistedTailoredGolfShorts1.jpg", rating: 5 },
  { id: 4, name: "T-Shirt", price: 20.00, img: "https://m.media-amazon.com/images/I/719S8-VInAL._AC_UY1100_.jpg", rating: 5, sale: true },
  { id: 5, name: "Bag", price: 25.00, img: "https://m.media-amazon.com/images/I/61N4O6H+jGL._AC_UY1000_.jpg", rating: 4 },
  { id: 6, name: "Stylish Red-Dress", price: 60.00, img: "https://m.media-amazon.com/images/I/71O1O8H6uEL._AC_UY1000_.jpg", rating: 5 }
];

export default function App() {
  const [page, setPage] = useState("login");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState({});
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [formData, setFormData] = useState({ phone: "", address: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    if (e.target.username.value === "abduaziz1223" && e.target.password.value === "12232007") {
      setPage("dashboard");
    } else { alert("Ma'lumot xato!"); }
  };

  const updateCart = (productId, delta) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = currentQty + delta;
      
      // Agar bu birinchi marta qo'shilayotgan bo'lsa (0 dan 1 ga o'tsa)
      if (currentQty === 0 && delta > 0) {
        alert("Alek, xush kelibsiz xo'jayin, saytga kirishiz mumkin!");
      }

      return { ...prev, [productId]: Math.max(0, newQty) };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subTotal = productsData.reduce((acc, p) => acc + (cart[p.id] || 0) * p.price, 0);
  const deliveryFee = deliveryType === "delivery" ? 5.00 : 0;

  if (page === "login") {
    return (
      <div className="login-screen">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>USER LOGIN</h2>
          <div className="input-row"><FaUser /><input name="username" placeholder="Username" required /></div>
          <div className="input-row"><FaCog /><input name="password" type="password" placeholder="Password" required /></div>
          <button type="submit" className="login-btn">LOGIN</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar - Rasmga mos ravishda to'liq binafsha */}
      <aside className="sidebar">
        <div className="logo"><FaShoppingCart /> OnShop</div>
        <nav>
          <button className="active"><FaHome /> Home</button>
          <button><FaThLarge /> Categories</button>
          <button><FaWallet /> Wallet</button>
          <button className="cart-nav-btn" onClick={() => setShowCart(true)}>
            <FaShoppingCart /> Cart <span className="badge">{totalItems}</span>
          </button>
          <button><FaUser /> User Profile</button>
          <button><FaCog /> Settings</button>
        </nav>
        <button className="logout-btn" onClick={() => setPage("login")}><FaSignOutAlt /> Log Out</button>
      </aside>

      <main className="main-content">
        {/* Yuqori qism - Qidiruv va Profil rasmdegidek */}
        <header className="top-nav">
          <div className="search-wrap">
            <input placeholder="Search Product" /><FaSearch />
          </div>
          <div className="user-actions">
            <FaWallet /> <FaCommentAlt /> <FaBell />
            <div className="user-profile">
              <img src="https://i.pravatar.cc/150?u=abduaziz" alt="" />
              <span>Abduaziz <small>▼</small></span>
            </div>
          </div>
        </header>

        {/* Kategoriyalar - Rasmga mos ranglar */}
        <section className="categories-sec">
          <h3>Categories</h3>
          <div className="cat-grid">
            <div className="cat-item p1">All Product <div className="cat-icon">🎯</div></div>
            <div className="cat-item p2">Lifestyle <div className="cat-icon">🏋️</div></div>
            <div className="cat-item p3">Fashion <div className="cat-icon">👟</div></div>
          </div>
        </section>

        {/* Mahsulotlar - Yopishmasligi uchun yetarli gap */}
        <section className="product-section">
          <h3>All Product</h3>
          <div className="product-grid">
            {productsData.map(p => (
              <div key={p.id} className="p-card">
                {p.sale && <span className="sale-tag">SALE</span>}
                <div className="p-img"><img src={p.img} alt="" /></div>
                <div className="p-info">
                  <div className="p-top">
                    <p>{p.name}</p>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => <FaStar key={i} className={i < p.rating ? "gold" : ""} />)}
                    </div>
                  </div>
                  <strong className="p-price">${p.price.toFixed(2)}</strong>
                </div>
                {cart[p.id] > 0 ? (
                  <div className="qty-panel">
                    <button onClick={() => updateCart(p.id, -1)}><FaMinus /></button>
                    <span>{cart[p.id]}</span>
                    <button onClick={() => updateCart(p.id, 1)}><FaPlus /></button>
                  </div>
                ) : (
                  <button className="buy-btn" onClick={() => updateCart(p.id, 1)}>Buy Now</button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Savatcha Modali - Jonlantirilgan va yuqori qismga mos dizayn */}
      {showCart && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowCart(false)}>×</button>
            <h3>Alek, buyurtmani to'ldiring!</h3>
            
            <div className="delivery-toggle">
              <button className={deliveryType === 'delivery' ? 'active' : ''} onClick={() => setDeliveryType('delivery')}><FaTruck /> Delivery</button>
              <button className={deliveryType === 'pickup' ? 'active' : ''} onClick={() => setDeliveryType('pickup')}><FaStore /> Pick up</button>
            </div>

            <div className="checkout-inputs">
              <input type="text" placeholder="Telefon (Xo'jayin, nomerizni yozing)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              {deliveryType === "delivery" && (
                <input type="text" placeholder="Manzil (Qayerga oboraylik)" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              )}
            </div>

            <div className="total-box">
              <p>Jami: <span>${subTotal.toFixed(2)}</span></p>
              <p>Xizmat: <span>${deliveryFee.toFixed(2)}</span></p>
              <hr />
              <h4>Umumiy: ${(subTotal + deliveryFee).toFixed(2)}</h4>
            </div>
            
            <button className="confirm-btn" onClick={() => {
              if(!formData.phone || (deliveryType === 'delivery' && !formData.address)) alert("Ma'lumotlarni to'ldiring!");
              else alert("Buyurtma ketdi, Alek!");
            }}>Buyurtma berish</button>
          </div>
        </div>
      )}
    </div>
  );
}




