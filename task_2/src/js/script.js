window.addEventListener("DOMContentLoaded", () => {
  function imagesRender(arr) {
    document.querySelector(".container")?.remove();
    const container = document.createElement("div");
    container.classList.add("container");
    arr.forEach((item) => {
      container.innerHTML += `<div class="image-item"><img src=${item} alt="Image"><button class="removeImage">Close</button></div>`;
    });
    document.body.appendChild(container);
    buttonsAction();
    addModal();
  }

  function buttonsAction() {
    const buttons = document.querySelectorAll(".removeImage");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const imageSrc = e.target.previousSibling.getAttribute("src");
        filteredImages = filteredImages.filter((src) => src !== imageSrc);
        localStorage.setItem("filteredImages", filteredImages);
        imagesRender(filteredImages);
      });
    });
  }

  function addModal() {
    const images = document.querySelectorAll("img");
    changeCounter(images);

    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        e.preventDefault();

        const src = image.getAttribute("src");
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.style.top = `${window.pageYOffset}px`;
        modal.innerHTML = `
					<img src="${src}" alt="Image">
					<button class="modal-close">Close</button>
			`;
        document.body.appendChild(modal);
        document.body.style.overflow = "hidden";

        document.querySelector(".modal-close").addEventListener("click", () => {
          modal.remove();
          document.body.style.overflow = "visible";
        });
      });
    });
  }

  function changeCounter(images) {
    document.querySelector(".counter").innerHTML = images.length;
  }

  function addZero(n) {
    return n < 10 ? `0${n}` : n;
  }

  const date = new Date();
  const img = [
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "./img/11.jpg",
    "./img/12.jpg",
  ];
  let filteredImages = localStorage.getItem("filteredImages")
    ? localStorage.getItem("filteredImages").split(",")
    : JSON.parse(JSON.stringify(img));

  imagesRender(filteredImages);

  document.querySelector(".time").innerHTML = `${addZero(
    date.getDate()
  )}.${addZero(date.getMonth() + 1)}.${date.getFullYear()} ${addZero(
    date.getHours()
  )}:${addZero(date.getMinutes())}`;

  document.querySelector(".imagesBackup").addEventListener("click", () => {
    localStorage.removeItem("filteredImages");
    filteredImages = JSON.parse(JSON.stringify(img));
    console.log(filteredImages);
    imagesRender(filteredImages);
  });
});
