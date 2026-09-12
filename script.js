const menu = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-links");
const top = document.querySelector("#toTop");
const year = document.querySelector("#year");

if(year) year.textContent = new Date().getFullYear();

menu?.addEventListener("click",()=>{
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",String(open));
});

document.querySelectorAll(".nav-links a").forEach(a=>{
  a.addEventListener("click",()=>nav.classList.remove("open"));
});

window.addEventListener("scroll",()=>{
  top?.classList.toggle("show",window.scrollY>700);
});

top?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const id=a.getAttribute("href");
    if(!id || id==="#") return;
    const el=document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

const form=document.querySelector("#contactForm");
const success=document.querySelector("#success");
form?.addEventListener("submit",e=>{
  e.preventDefault();
  const fd=new FormData(form);
  const name=fd.get("name")||"";
  const email=fd.get("email")||"";
  const message=fd.get("message")||"";
  const subject=encodeURIComponent(`Demande d'étude — ${name}`);
  const body=encodeURIComponent(
`Bonjour Cosmetest,

Je souhaite échanger au sujet d'un projet d'étude.

Nom / société : ${name}
Email : ${email}

Projet :
${message}

Bien cordialement`
  );
  window.location.href=`mailto:contact.clients@cosmetest.com?subject=${subject}&body=${body}`;
  if(success) success.hidden=false;
});
