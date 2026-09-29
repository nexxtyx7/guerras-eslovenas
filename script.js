const $=s=>document.querySelector(s);
const loginPage=$("#loginPage"),homePage=$("#homePage"),modal=$("#modal"),status=$("#status");
const password=$("#password");

function getUsers(){try{return JSON.parse(localStorage.getItem("ge_users")||"[]")}catch{return[]}}
function saveUsers(u){localStorage.setItem("ge_users",JSON.stringify(u))}
function showHome(user){
  loginPage.classList.add("hidden"); homePage.classList.remove("hidden");
  $("#userName").textContent=user.name||user.email;
  $("#userBadge").textContent=(user.name||user.email).charAt(0).toUpperCase();
  window.scrollTo(0,0);
}
function showLogin(){homePage.classList.add("hidden");loginPage.classList.remove("hidden")}

$("#togglePassword").onclick=()=>{password.type=password.type==="password"?"text":"password"};
$("#loginForm").onsubmit=e=>{
  e.preventDefault();
  const id=$("#email").value.trim().toLowerCase(), pass=password.value;
  const users=getUsers();
  const user=users.find(u=>(u.email===id||u.name.toLowerCase()===id)&&u.password===pass);
  if(!user){status.textContent="Credenciais não encontradas. Crie uma conta primeiro.";return}
  if($("#remember").checked)localStorage.setItem("ge_session",JSON.stringify(user));
  showHome(user);
};
$("#forgot").onclick=()=>status.textContent="Use o e-mail cadastrado para recuperar o acesso na versão com backend.";
$("#create").onclick=()=>{modal.classList.remove("hidden");$("#regName").focus()};
$("#closeModal").onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};

$("#register").onclick=()=>{
  const name=$("#regName").value.trim(),email=$("#regEmail").value.trim().toLowerCase(),pass=$("#regPassword").value;
  const rs=$("#regStatus");
  if(!name||!email||pass.length<6){rs.textContent="Preencha tudo e use uma senha de pelo menos 6 caracteres.";return}
  const users=getUsers();
  if(users.some(u=>u.email===email)){rs.textContent="Este e-mail já está cadastrado.";return}
  const user={name,email,password:pass,createdAt:new Date().toISOString()};
  users.push(user);saveUsers(users);localStorage.setItem("ge_session",JSON.stringify(user));
  modal.classList.add("hidden");showHome(user);
};

$("#logout").onclick=()=>{localStorage.removeItem("ge_session");showLogin()};
const session=localStorage.getItem("ge_session");
if(session){try{showHome(JSON.parse(session))}catch{localStorage.removeItem("ge_session")}}
