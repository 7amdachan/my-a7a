window.addEventListener("load",()=>{
  setTimeout(()=>{
    $("intro").classList.add("done");
    document.body.classList.remove("loading");
    document.body.classList.add("ready");
  },1300);
});

/* best seller marquee (list doubled for a seamless loop) */
$("track").innerHTML=[...products,...products].map(p=>`
  <div class="card">
    <a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name} ${p.color}">
    <div class="name">${p.name} – ${p.color}</div></a>
    <div class="price">$${p.price}</div>
    <button data-add="${p.id}">Add to cart</button>
  </div>`).join("");
$("track").addEventListener("click",e=>{const id=e.target.dataset.add;if(id)addToCart(+id)});

/* info cards drop in as they scroll into view */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll(".info-grid article").forEach((a,i)=>{a.style.transitionDelay=(i%3)*.12+"s";io.observe(a)});
