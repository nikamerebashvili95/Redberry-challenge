// მთავარი გვერდიდან გადასვლა შესავსებ აპლიკაციაში
function goToGeneralInfo() {
  location.href = "./survey.html";
}
// მთავარ გვერდზე დასაბრუნებელი ღილაკის ფუნქცია
function goToLanding() {
  location.href = "./index.html";
  localStorage.clear();
}
// ფოტოს ატვირთვა და გამოჩენა მარჯვნივ
const fileInput = document.getElementById("image");
const imageColumn = document.querySelector(".resume--photo");
const imgValidIcon = document.querySelector(".img-valid-icon");
const imglInvalidIcond = document.querySelector(".img-invalid-icon");
fileInput.addEventListener("change", updateResumeImg);
fileInput.addEventListener("input", saveFile);
function saveFile(e) {
  const image = e.target.files[0];
  if (image && image["type"].split("/")[0] === "image") {
    imgValidIcon.classList.add("show");
    imglInvalidIcond.classList.remove("show");
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      localStorage.setItem("image", reader.result);
    });
  } else {
    imgValidIcon.classList.remove("show");
    imglInvalidIcond.classList.add("show");
  }
}
function updateResumeImg() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    const img = new Image();
    img.src = reader.result;

    imageColumn.innerHTML = `<img src=${reader.result} class='resume--image'>`;
  });

  reader.readAsDataURL(file);
}
