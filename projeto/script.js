const baseUrl = "https://didactic-invention-xgg44r5755xc6vg6-8080.app.github.dev/api/pessoas";
const form = document.getElementById("formPessoa");
const lista = document.getElementById("pessoas");

// fetch p carregar
async function carregarPessoas() {
  const res = await fetch(baseUrl);
  const pessoas = await res.json();

  lista.innerHTML = "";
  pessoas.forEach(p => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span><strong>#${p.id}</strong> — ${p.nome} (${p.idade} anos)</span>
      <div class="item-actions">
        <button class="delete" onclick="deletarPessoa(${p.id})">🗑️</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

// new person
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = parseInt(document.getElementById("idade").value);

  await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, idade })
  });

  form.reset();
  carregarPessoas();
});

// del
async function deletarPessoa(id) {
  if (!confirm("Tem certeza que deseja excluir esta pessoa?")) return;

  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
  carregarPessoas();
}

// start
carregarPessoas();
