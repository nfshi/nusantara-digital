(function(){
var menu=document.getElementById('menu');
document.getElementById('menuBtn').onclick=function(){menu.classList.toggle('open')};
menu.addEventListener('click',function(e){if(e.target.tagName==='A')menu.classList.remove('open')});
document.getElementById('yr').textContent=new Date().getFullYear();
var root=document.documentElement;
document.getElementById('themeBtn').onclick=function(){
var dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme=dark?'light':'dark';
};
document.getElementById('form').addEventListener('submit',function(e){
e.preventDefault();this.reset();document.getElementById('ok').style.display='block';
});

// ===== LOGIN =====
var USERS={admin:'nusantara123'};
var lf=document.getElementById('loginForm'),errBox=document.getElementById('lgErr');
lf.addEventListener('submit',function(e){
e.preventDefault();
var u=document.getElementById('lgUser').value.trim(),p=document.getElementById('lgPass').value;
if(Object.prototype.hasOwnProperty.call(USERS,u)&&USERS[u]===p){
try{sessionStorage.setItem('nd_auth','1')}catch(x){}
errBox.textContent='';lf.reset();root.classList.remove('locked');scrollTo(0,0);
}else{errBox.textContent='Username atau password salah.'}
});
document.getElementById('pwToggle').onclick=function(){
var i=document.getElementById('lgPass');i.type=i.type==='password'?'text':'password';
};
document.getElementById('logoutBtn').onclick=function(){
try{sessionStorage.removeItem('nd_auth')}catch(x){}
root.classList.add('locked');
};

var els=document.querySelectorAll('[data-n]');
function run(el){var t=+el.dataset.n,c=0,s=Math.max(1,Math.ceil(t/50));
var i=setInterval(function(){c+=s;if(c>=t){c=t;clearInterval(i)}el.textContent=c+'+'},30)}
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){run(x.target);io.unobserve(x.target)}})});
els.forEach(function(el){io.observe(el)});
}else{els.forEach(function(el){el.textContent=el.dataset.n+'+'})}
})();