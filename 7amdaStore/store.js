function cardHTML(p){return `<article class="pcard">
  <a href="product.html?id=${p.id}"><div class="pimg"><img src="${p.img}" alt="${p.name} ${p.color}"></div>
  <h4>${p.name}</h4><p class="color">${p.color}</p></a>
  <div class="prow"><span>From $${p.price}</span><button data-add="${p.id}">Add to cart</button></div></article>`}
function show(f){$("grid").innerHTML=products.filter(p=>f==="All"||p.line===f).map(cardHTML).join("")}
show("All");
$("chips").onclick=e=>{const f=e.target.dataset.f;if(!f)return;
  document.querySelectorAll("#chips button").forEach(b=>b.classList.toggle("on",b===e.target));show(f)};
$("grid").onclick=e=>{const id=e.target.dataset.add;if(id)addToCart(+id)};
