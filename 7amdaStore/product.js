const SPECS={
 Pro:[["Display","6.3-inch edge-to-edge OLED"],["Chip","A20 Pro"],["Camera","Triple 48 MP system"],["Battery","Up to 29 hours video"]],
 Standard:[["Display","6.1-inch OLED"],["Chip","A20"],["Camera","Dual 48 MP system"],["Battery","Up to 24 hours video"]]};
const id=+new URLSearchParams(location.search).get("id")||1;
const p=products.find(x=>x.id===id)||products[0];
document.title=`${p.name} ${p.color} – 7amdaStore`;
let gb=256,qty=1;
$("pdp").innerHTML=`
  <nav class="crumbs"><a href="store.html">Store</a> / ${p.name} / ${p.color}</nav>
  <div class="pdp-grid">
    <div class="pdp-img"><img src="${p.img}" alt="${p.name} ${p.color}"></div>
    <div class="pdp-info">
      <h1>${p.name}</h1>
      <p class="color">${p.color}</p>
      <p class="pprice" id="pprice"></p>
      <p class="blurb">Brand new, sealed and original, with a 1-year warranty and 14-day returns.</p>
      <h5>Storage</h5>
      <div class="opts" id="opts">${STORAGE.map(s=>`<button data-gb="${s.gb}" class="${s.gb===256?"on":""}">${label(s.gb)}</button>`).join("")}</div>
      <h5>Colour</h5>
      <div class="opts">${products.filter(x=>x.name===p.name).map(x=>`<a href="product.html?id=${x.id}" class="${x.id===p.id?"on":""}">${x.color}</a>`).join("")}</div>
      <div class="buy">
        <div class="qty big"><button id="minus">−</button><span id="q">1</span><button id="plus">+</button></div>
        <button class="btn dark" id="add">Add to cart</button>
      </div>
      <h5>Specs</h5>
      <dl class="specs">${SPECS[p.line].map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
    </div>
  </div>`;
const upd=()=>{$("pprice").textContent="$"+unit(p,gb).toLocaleString();$("q").textContent=qty};
upd();
$("opts").onclick=e=>{const g=e.target.dataset.gb;if(!g)return;gb=+g;
  document.querySelectorAll("#opts button").forEach(b=>b.classList.toggle("on",b===e.target));upd()};
$("minus").onclick=()=>{qty=Math.max(1,qty-1);upd()};
$("plus").onclick=()=>{qty++;upd()};
$("add").onclick=()=>addToCart(p.id,gb,qty);
$("more").innerHTML=products.filter(x=>x.id!==p.id).slice(0,3).map(x=>`<article class="pcard"><a href="product.html?id=${x.id}"><div class="pimg"><img src="${x.img}" alt=""></div><h4>${x.name}</h4><p class="color">${x.color}</p></a><div class="prow"><span>From $${x.price}</span></div></article>`).join("");
