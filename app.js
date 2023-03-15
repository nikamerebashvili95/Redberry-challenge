// მთავარი გვერდიდან გადასვლა შესავსებ აპლიკაციაში
function goToGeneralInfo() {
  location.href = "./survey.html";
}
// მთავარ გვერდზე დასაბრუნებელი ღილაკის ფუნქცია
function goToLanding() {
  location.href = "./index.html";
  localStorage.clear();
}
// დაკლიკებით შემდეგ პირველი გვერდიდან მეორეზე გადასვლა თუ ვალიდურია
const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let isNameValid = nameValid(),
    islastNameValid = lastNameValid(),
    isEmailValid = emailValidation(),
    isPhoneValid = phoneValidation(),
    isImgValid = saveFile();
  let isFormValid =
    isNameValid &&
    islastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isImgValid;
  if (isFormValid) {
    firstPage.classList.add("hidden");
    secondPage.classList.add("show");
  }
});
// მეორე გვერდიდან პირველზე დაბრუნება
const previousBtn = document.querySelector(".back-btn");
function backPage(e) {
  e.preventDefault();
  if (previousBtn) {
    secondPage.classList.remove("show");
    firstPage.classList.remove("hidden");
  } else {
    secondPage.classList.add("show");
    firstPage.classList.add("hidden");
  }
}
previousBtn.addEventListener("click", backPage);
/***************************************************/
/*
// ფოტოს ატვირთვა და გამოჩენა მარჯვნივ
const fileInput = document.getElementById("image");
const imageColumn = document.querySelector(".resume--photo");
const imgValidIcon = document.querySelector(".img-valid-icon");
const imglInvalidIcond = document.querySelector(".img-invalid-icon");
fileInput.addEventListener("change", updateResumeImg);
fileInput.addEventListener("input", saveFile);
function saveFile(e) {
  let valid = false;
  if (e && e.target) {
    const image = e.target.files[0];
    if (image && image["type"].split("/")[0] === "image") {
      valid = true;
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
      valid = false;
    }
  }
  return valid;
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
*/
const fileInput = document.getElementById("image");
const imagePreview = document.querySelector(".resume--photo");
const imgValidIcon = document.querySelector(".img-valid-icon");
const imglInvalidIcond = document.querySelector(".img-invalid-icon");
fileInput.addEventListener("change", saveFile);
function saveFile() {
  while (imagePreview.firstChild) {
    imagePreview.removeChild(imagePreview.firstChild);
  }

  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let valid = false;
    if (file.type.startsWith("image/")) {
      imgValidIcon.classList.add("show");
      imglInvalidIcond.classList.remove("show");
      valid = true;
    } else {
      valid = false;
      imgValidIcon.classList.remove("show");
      imglInvalidIcond.classList.add("show");
      continue;
    }
    const img = document.createElement("img");
    img.classList.add("resume--photo");
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    imagePreview.appendChild(img);
    return valid;
  }
  if (files.length === 0) {
    imgValidIcon.classList.remove("show");
    imglInvalidIcond.classList.add("show");
    return false;
  }
}
// სახელის ვალიდაცია
const nameInput = document.getElementById("name");
const nameLabel = document.querySelector(".name-label");
const nameValidIcon = document.querySelector(".name-valid-icon");
const nameInvalidIcond = document.querySelector(".name-invalid-icon");
function nameValid(text) {
  let valid = false;
  var text = document.getElementById("name").value.replace(/\s/g); //read input
  var langdic = {
    Georgian: /^[\u10A0-\u10FF]{2,}$/,
  };
  const keys = Object.entries(langdic);
  Object.entries(langdic).forEach(([key, value]) => {
    if (value.test(text) === true) {
      nameInput.classList.add("valid");
      nameInput.classList.remove("invalid");
      nameLabel.style.color = "#000000";
      nameValidIcon.classList.add("show");
      nameInvalidIcond.classList.remove("show");
      nameInput.style.outline = "none";
      valid = true;
    } else {
      nameInput.classList.remove("valid");
      nameInput.classList.add("invalid");
      nameLabel.style.color = "#e52f2f";
      nameValidIcon.classList.remove("show");
      nameInvalidIcond.classList.add("show");
      nameInput.style.outline = "none";
    }
  });
  return valid;
}
nameInput.addEventListener("input", nameValid);
//გვარის ვალიდაცია
const lastNameInput = document.getElementById("lastName");
const lastNameLabel = document.querySelector(".lastname-label");
const lasNameValidIcon = document.querySelector(".lastname-valid-icon");
const lastNameInvalidIcond = document.querySelector(".lastname-invalid-icon");
function lastNameValid(text) {
  let valid = false;
  var text = document.getElementById("lastName").value.replace(/\s/g); //read
  var langdic = {
    Georgian: /^[\u10A0-\u10FF]{2,}$/,
  };
  const keys = Object.entries(langdic);
  Object.entries(langdic).forEach(([key, value]) => {
    if (value.test(text) === true) {
      lastNameInput.classList.add("valid");
      lastNameInput.classList.remove("invalid");
      lastNameLabel.style.color = "#000000";
      lasNameValidIcon.classList.add("show");
      lastNameInvalidIcond.classList.remove("show");
      lastNameInput.style.outline = "none";
      valid = true;
    } else {
      lastNameInput.classList.remove("valid");
      lastNameInput.classList.add("invalid");
      lastNameLabel.style.color = "#e52f2f";
      lasNameValidIcon.classList.remove("show");
      lastNameInvalidIcond.classList.add("show");
      lastNameInput.style.outline = "none";
    }
  });
  return valid;
}
lastNameInput.addEventListener("input", lastNameValid);
// ჩემ შესახებ ველისთვის ვალიდაცია border valid-ის გაკეთება
const aboutMe = document.getElementById("about-me");
function aboutmeValid() {
  if (aboutMe.value.length >= 1) {
    aboutMe.classList.add("valid");
    aboutMe.style.outline = "none";
  } else {
    aboutMe.classList.remove("valid");
    aboutMe.style.outline = "none";
  }
}
aboutMe.addEventListener("keyup", aboutmeValid);
// ემაილის ვალიდაცია
const validIcon = document.querySelector(".valid-icon");
const emailLabel = document.getElementById("email-label");
const emailValidIcon = document.querySelector(".email-valid-icon");
const emailInvalidIcond = document.querySelector(".email-invalid-icon");
var pattern = /^[a-zA-Z0-9.]+@redberry.ge$/;
const email = document.querySelector(".input-email");
function emailValidation() {
  let valid = false;
  if (email.value.match(pattern)) {
    email.classList.add("valid");
    email.classList.remove("invalid");
    emailLabel.style.color = "#000000";
    emailValidIcon.classList.add("show");
    emailInvalidIcond.classList.remove("show");
    email.style.outline = "none";
    valid = true;
  } else {
    email.classList.remove("valid");
    email.classList.add("invalid");
    emailLabel.style.color = "#e52f2f";
    emailValidIcon.classList.remove("show");
    emailInvalidIcond.classList.add("show");
    email.style.outline = "none";
  }
  return valid;
}
email.addEventListener("input", emailValidation);
//მობილური ნომრის ვალიდაცია
const phoneNumber = document.querySelector(".input-phone-number");
const numberLabel = document.querySelector(".number-label");
const numberValidIcon = document.querySelector(".number-valid-icon");
const numberInvalidIcond = document.querySelector(".number-invalid-icon");

var phonePattern = /^(\+995)\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
function phoneValidation(e) {
  let valid = false;
  if (phoneNumber.value.match(phonePattern)) {
    phoneNumber.classList.add("valid");
    phoneNumber.classList.remove("invalid");
    numberLabel.style.color = "#000000";
    numberValidIcon.classList.add("show");
    numberInvalidIcond.classList.remove("show");
    phoneNumber.style.outline = "none";
    valid = true;
  } else {
    phoneNumber.classList.remove("valid");
    phoneNumber.classList.add("invalid");
    numberLabel.style.color = "#e52f2f";
    numberValidIcon.classList.remove("show");
    numberInvalidIcond.classList.add("show");
    phoneNumber.style.outline = "none";
  }
  return valid;
}
phoneNumber.addEventListener("input", phoneValidation);
const phoneNumberInp = document.getElementById("phone-number");
phoneNumberInp.addEventListener("keydown", function (e) {
  const txt = this.value;
  if (
    (txt.length == 4 ||
      txt.length == 8 ||
      txt.length == 11 ||
      txt.length == 14) &&
    e.which !== 8
  )
    this.value = this.value + " ";
});
// მარჯვენა მხარეს წერისას პარალელურად გამოჩნდეს კონტენტი
// სახელის
const displayName = document.getElementById("name_display");
const displayLastName = document.getElementById("lastname_display");
function setName(e) {
  if (nameValid()) {
    displayName.innerText = e.target.value;
  } else {
    displayName.innerText = "";
  }
}
nameInput.addEventListener("keyup", setName);
// გვარის
function setLastName(e) {
  if (lastNameValid()) {
    displayLastName.innerText = e.target.value;
  } else {
    displayLastName.innerText = "";
  }
}
lastNameInput.addEventListener("keyup", setLastName);
// ემაილის
const emailIcon = document.querySelector(".email-icon");
const displayEmail = document.querySelector(".email-text");
function setEmail(e) {
  if (emailValidation()) {
    emailIcon.classList.add("show");
    displayEmail.innerText = e.target.value;
  } else {
    emailIcon.classList.remove("show");
    displayEmail.innerText = " ";
  }
}
email.addEventListener("keyup", setEmail);
// ტელეფონის ნომრის
const phoneIcon = document.querySelector(".phone-icon");
const displayPhone = document.querySelector(".phone-text");
function setPhone(e) {
  if (phoneValidation()) {
    phoneIcon.classList.add("show");
    displayPhone.innerText = e.target.value;
  } else {
    phoneIcon.classList.remove("show");
    displayPhone.innerText = " ";
  }
}
phoneNumber.addEventListener("keyup", setPhone);
// ჩემ შესახებ
const aboutMeTitle = document.querySelector(".about_me-title");
const displayAboutMe = document.querySelector(".about_me-text");
function setAboutMe(e) {
  if (aboutMe.value.length >= 1) {
    aboutMeTitle.classList.add("show");
    displayAboutMe.innerHTML = e.target.value;
  } else {
    displayAboutMe.innerHTML = "";
  }
}
aboutMe.addEventListener("keyup", setAboutMe);
