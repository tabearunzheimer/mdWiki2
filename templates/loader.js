let pageVal = localStorage.getItem("page")

if (!pageVal) {
  localStorage.setItem("page", "home");
} else {
  loadPageContent(pageVal, document.getElementById(`nav-doc-${pageVal}`))
}


let dropdown = document.getElementsByClassName("subfolder");
let i;

for (i = 0; i < dropdown.length; i++) {
  const element = dropdown[i];
  element.addEventListener("click", function () {
    this.classList.toggle("active");
    const left = element.getElementsByClassName("fa")[0];
    const down = element.getElementsByClassName("fa")[1];

    if (left.classList.contains("hide")) {
      left.classList.remove("hide");
      down.classList.add("hide");

    } else {
      down.classList.remove("hide");
      left.classList.add("hide");
    }
    let dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";

    } else {
      dropdownContent.style.display = "block";
    }
  });
}


function loadPageContent(page, node) {
  fetch(`/${page}`, {
    method: "GET",
  }).then(res => {
    const value = res.headers.get("page-value");
    localStorage.setItem("page", value)
    return res.text();
  })
    .then((text) => {
      const main = document.getElementById("main");
      main.innerHTML = text;
      const active = document.getElementsByClassName("active-doc")
      if (active.length != 0) active[0].classList.remove("active-doc");
      if (node) node.classList.add("active-doc");
      createCodeMarks();
    })
}


function loadContent(node) {
  let resource = node.getAttribute('value');
  loadPageContent(resource, node);
}

function createContentFolder(name, value) {
  const down = document.createElement("i");
  down.classList.add("fa");
  down.classList.add("fa-caret-down");
  down.classList.add("hide");
  const left = document.createElement("i");
  left.classList.add("fa");
  left.classList.add("fa-caret-left");
  const btn = document.createElement("button");
  btn.innerHTML = name;
  btn.classList.add("subfolder");
  btn.appendChild(left);
  btn.appendChild(down);
  btn.setAttribute("value", value);
  btn.click = refreshSideBar;
  return btn;
}

function createDropdownContainer() {
  const div = document.createElement("div");
  div.classList.add("dropdown-container")
  return div;
}

function createDocEntry(name, index) {
  const div = document.createElement("div");
  div.innerHTML = name;
  div.onclick = loadContent;
  div.setAttribute("value", index);
  return div;
}

function refreshSideBar(node) {
  let resource = node.getAttribute('value');
  fetch(`/${resource}`, {
    method: "GET",
  }).then(res => res.text())
    .then((text) => {
      const main = document.getElementById("main");
      main.innerHTML = text;
    })
}