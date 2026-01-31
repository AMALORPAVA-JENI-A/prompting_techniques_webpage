const pages = [
  "intro.html",
  "role.html",
  "task.html",
  "context.html",
  "reasoning.html",
  "rules.html",
  "stop-conditions.html",
  "output-format.html",
  "techniques.html",
  "examples.html",
  "common-mistakes.html",
  "prompt-generators.html"
];

let currentIndex = -1;

/* ================= LOAD PAGE ================= */
function loadPage(page) {
  const index = pages.indexOf(page);
  if (index !== -1) currentIndex = index;

  fetch(`./pages/${page}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
      renderPagination();
      closeDropdown();
    });
}

/* ================= PAGINATION ================= */
function nextPage() {
  if (currentIndex < pages.length - 1) {
    loadPage(pages[++currentIndex]);
  }
}

function prevPage() {
  if (currentIndex > 0) {
    loadPage(pages[--currentIndex]);
  }
}

function goToPage(index) {
  currentIndex = index;
  loadPage(pages[index]);
}

function renderPagination() {
  const prev = document.getElementById("prevBtn");
  const center = document.getElementById("pageNumbers");
  const next = document.getElementById("nextBtn");

  prev.innerHTML = center.innerHTML = next.innerHTML = "";

  if (currentIndex === -1) return;

  const p = document.createElement("button");
  p.textContent = "Prev";
  p.onclick = prevPage;
  p.disabled = currentIndex === 0;
  prev.appendChild(p);

  pages.forEach((_, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (i === currentIndex) b.classList.add("active");
    b.onclick = () => goToPage(i);
    center.appendChild(b);
  });

  const n = document.createElement("button");
  n.textContent = "Next";
  n.onclick = nextPage;
  n.disabled = currentIndex === pages.length - 1;
  next.appendChild(n);
}

/* ================= HOME ================= */
function showHome() {
  currentIndex = -1;
  document.getElementById("content").innerHTML = `
    <section class="hero home-hero">
      <h2 class="hero-title">Welcome to Prompt Engineering Course</h2>
      <p class="hero-subtitle">Learn how to communicate with AI effectively.</p>
      <button class="start-btn" onclick="loadPage('intro.html')">Start Learning →</button>
    </section>
  `;
  renderPagination();
  closeDropdown();
}

/* ================= DROPDOWN FIX ================= */
function toggleDropdown() {
  const dropdown = document.querySelector(".dropdown-content");
  const isOpen = dropdown.style.display === "block";

  dropdown.style.display = isOpen ? "none" : "block";

  // 👇 THIS is the real fix
  document.documentElement.style.setProperty(
    "--dropdown-height",
    isOpen ? "0px" : "90px"
  );
}

function closeDropdown() {
  const dropdown = document.querySelector(".dropdown-content");
  if (dropdown) dropdown.style.display = "none";

  document.documentElement.style.setProperty("--dropdown-height", "0px");
}

/* ================= SIDE MENU ================= */
function toggleMenu() {
  const menu = document.getElementById("topicMenu");
  const open = menu.style.display === "block";
  menu.style.display = open ? "none" : "block";
  document.body.classList.toggle("menu-open", !open);
}
function openTryPrompting() {
  currentIndex = -1;

  document.getElementById("content").innerHTML = `
    <section class="page">
      <h2>Try Prompting</h2>
      <iframe 
        src="https://amalorpava-chatgpt-clone.hf.space/"
        style="width:100%; height:80vh; border:none; border-radius:12px;">
      </iframe>
    </section>
  `;

  renderPagination();
  closeDropdown();
}

/* ================= INIT ================= */
showHome();
