const form=document.getElementById("loginForm");
const status=document.getElementById("status");
const password=document.getElementById("password");
const toggle=document.getElementById("togglePassword");

toggle.addEventListener("click",()=>{
  const visible=password.type==="text";
  password.type=visible?"password":"text";
  toggle.textContent=visible?"◉":"◌";
});

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const button=form.querySelector(".submit");
  button.disabled=true;
  button.style.opacity=".7";
  status.textContent="Validando credenciais…";
  setTimeout(()=>{
    status.textContent="Demonstração: autenticação ainda não conectada.";
    button.disabled=false;
    button.style.opacity="1";
  },900);
});

document.getElementById("forgot").addEventListener("click",()=>{
  status.textContent="Recuperação de acesso disponível na versão completa.";
});

document.getElementById("guest").addEventListener("click",()=>{
  status.textContent="Modo visitante selecionado.";
});
