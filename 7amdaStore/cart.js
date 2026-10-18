const products=[
 {id:1,name:"iPhone 18 Pro",color:"Sierra Blue",line:"Pro",price:1099,img:"images/phone1.png"},
 {id:2,name:"iPhone 18 Pro",color:"Graphite",line:"Pro",price:1099,img:"images/phone2.png"},
 {id:3,name:"iPhone 18 Pro",color:"Crimson",line:"Pro",price:1199,img:"images/phone3.png"},
 {id:4,name:"iPhone 18 Pro",color:"Midnight",line:"Pro",price:1199,img:"images/phone4.png"},
 {id:5,name:"iPhone 18",color:"Sky",line:"Standard",price:899,img:"images/phone5.png"},
 {id:6,name:"iPhone 18",color:"Ultramarine",line:"Standard",price:799,img:"images/phone6.png"}
];
const STORAGE=[{gb:256,extra:0},{gb:512,extra:200},{gb:1024,extra:400}];
const $=id=>document.getElementById(id);
const unit=(p,gb)=>p.price+(STORAGE.find(s=>s.gb===gb)||STORAGE[0]).extra;
const label=gb=>gb>=1024?"1 TB":gb+" GB";

document.body.insertAdjacentHTML("beforeend",`
<div class="overlay" id="overlay"></div>
<aside class="cart" id="cart" aria-hidden="true">
  <div class="cart-head"><h4>Your cart</h4><button id="closeCart" aria-label="Close cart">&times;</button></div>
  <div class="cart-items" id="cartItems"></div>
  <div class="cart-foot">
    <div class="total"><span>Total</span><strong id="cartTotal">$0</strong></div>
    <button class="btn dark" id="checkout">Checkout</button>
  </div>
</aside>`);

let cart=[];
try{cart=JSON.parse(localStorage.getItem("cart7amda2"))||[]}catch(e){}
const openCart=()=>{document.body.classList.add("cart-open");$("cart").setAttribute("aria-hidden","false")};
const closeCart=()=>{document.body.classList.remove("cart-open");$("cart").setAttribute("aria-hidden","true")};
$("cartBtn").onclick=openCart;$("closeCart").onclick=closeCart;$("overlay").onclick=closeCart;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});

function save(){try{localStorage.setItem("cart7amda2",JSON.stringify(cart))}catch(e){}render()}
function addToCart(id,gb=256,qty=1){
  const i=cart.find(x=>x.id===id&&x.gb===gb);
  i?i.qty+=qty:cart.push({id,gb,qty});
  save();openCart();
}
function change(id,gb,d){
  const i=cart.find(x=>x.id===id&&x.gb===gb);if(!i)return;
  i.qty+=d;if(i.qty<=0)cart=cart.filter(x=>x!==i);
  save();
}
function render(){
  const count=cart.reduce((s,i)=>s+i.qty,0);
  const total=cart.reduce((s,i)=>s+i.qty*unit(products.find(p=>p.id===i.id),i.gb),0);
  $("cartCount").textContent=count;$("cartCount").classList.toggle("show",count>0);
  $("cartTotal").textContent="$"+total.toLocaleString();
  $("cartItems").innerHTML=cart.length?cart.map(i=>{
    const p=products.find(x=>x.id===i.id);
    return `<div class="row"><img src="${p.img}" alt="">
      <div>${p.name} – ${p.color}<small>${label(i.gb)} · $${unit(p,i.gb)}</small>
      <div class="qty"><button onclick="change(${p.id},${i.gb},-1)">−</button>${i.qty}<button onclick="change(${p.id},${i.gb},1)">+</button></div></div>
      <button class="rm" onclick="change(${p.id},${i.gb},-99)">Remove</button></div>`}).join(""):
    '<p class="empty">Your cart is empty.<br>Add a phone from the store.</p>';
}
$("checkout").onclick=()=>{if(!cart.length)return alert("Your cart is empty.");alert("Checkout isn’t connected yet — connect it to your payment provider.")};
render();
