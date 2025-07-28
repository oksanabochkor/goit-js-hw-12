import{S as w,a as v,i as n}from"./assets/vendor-DhpBV7YY.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".load-more"),S=new w(".gallery a");function p(o){const t=o.map(s=>`
        <li class="gallery-item">
          <a href="${s.largeImageURL}">
            <img src="${s.webformatURL}" alt="${s.tags}" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${s.likes}</p>
            <p><b>Views:</b> ${s.views}</p>
            <p><b>Comments:</b> ${s.comments}</p>
            <p><b>Downloads:</b> ${s.downloads}</p>
          </div>
        </li>
      `).join("");f.insertAdjacentHTML("beforeend",t),S.refresh()}function q(){f.innerHTML=""}function y(){m.classList.remove("is-hidden")}function g(){m.classList.add("is-hidden")}function L(){h.classList.remove("is-hidden")}function d(){h.classList.add("is-hidden")}const B="51392705-c835407a6ad34302eafe3f79f",M="https://pixabay.com/api/";async function b(o,t){return(await v.get(M,{params:{key:B,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const $=document.querySelector(".form"),E=document.querySelector(".load-more");d();let i="",a=1,l=0;$.addEventListener("submit",async o=>{if(o.preventDefault(),i=o.target.elements.searchQuery.value.trim(),!!i){a=1,q(),d(),y();try{const t=await b(i,a);if(t.hits.length===0){n.warning({message:"No images found."});return}p(t.hits),l=Math.ceil(t.totalHits/15),a<l?L():n.info({message:"You've reached the end of search results."})}catch{n.error({message:"Error loading images."})}finally{g()}}});E.addEventListener("click",async()=>{a+=1,y(),d();try{const o=await b(i,a);p(o.hits),a>=l?n.info({message:"You've reached the end of search results."}):L();const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch{n.error({message:"Error loading more images."})}finally{g()}});
//# sourceMappingURL=index.js.map
