let toolsCont = document.querySelector(".tools-container");
let optionsCont = document.querySelector(".option-cont");
let pencilCont = document.querySelector(".pencil-container");
let eraserCont = document.querySelector(".eraser-container");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
let pencilFlag = false;
let eraserFlag = false;

let optionsFlag = true;

optionsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;

  if (optionsFlag) {
    openTools();
  } else {
    closeTools();
  }
});

function openTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";
}

function closeTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.add("fa-times");
  iconElem.classList.remove("fa-bars");
  toolsCont.style.display = "none";

  pencilCont.style.display = "none";
  eraserCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;

  if (pencilFlag) {
    pencilCont.style.display = "block";
  } else {
    pencilCont.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;

  if (eraserFlag) {
    eraserCont.style.display = "flex";
  } else {
    eraserCont.style.display = "none";
  }
});

upload.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-container");
    stickyCont.innerHTML = `
    <div class="header-container">
        <div class="mini"></div>
        <div class="remove"></div>
    </div>
    <div class="note-container">
        <img src="${url}">
    </div>
    `;

    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".mini");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
      dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
      return false;
    };
  });
});

sticky.addEventListener("click", (e) => {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-container");
  stickyCont.innerHTML = `
    <div class="header-container">
        <div class="mini"></div>
        <div class="remove"></div>
    </div>
    <div class="note-container">
        <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
    `;

  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(".mini");
  let remove = stickyCont.querySelector(".remove");
  noteActions(minimize, remove, stickyCont);

  stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
});

function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  });

  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note-container");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block";
    else noteCont.style.display = "none";
  });
}

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
