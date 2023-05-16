const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".back-btn");
const fileInput = document.getElementById("image");
const imagePreview = document.querySelector(".resume--photo");
const imgValidIcon = document.querySelector(".img-valid-icon");
const imgInvalidIcon = document.querySelector(".img-invalid-icon");
const imgLabel = document.querySelector(".input-group__label");
const nameInput = document.getElementById("name");
const nameLabel = document.querySelector(".name-label");
const nameValidIcon = document.querySelector(".name-valid-icon");
const nameInvalidIcond = document.querySelector(".name-invalid-icon");
const lastNameInput = document.getElementById("lastName");
const lastNameLabel = document.querySelector(".lastname-label");
const lasNameValidIcon = document.querySelector(".lastname-valid-icon");
const lastNameInvalidIcond = document.querySelector(".lastname-invalid-icon");
const aboutMe = document.getElementById("about-me");
const validIcon = document.querySelector(".valid-icon");
const emailLabel = document.getElementById("email-label");
const emailValidIcon = document.querySelector(".email-valid-icon");
const emailInvalidIcond = document.querySelector(".email-invalid-icon");
var pattern = /^[a-zA-Z0-9.]+@redberry.ge$/;
const email = document.querySelector(".input-email");
const phoneNumber = document.querySelector(".input-phone-number");
const numberLabel = document.querySelector(".number-label");
const numberValidIcon = document.querySelector(".number-valid-icon");
const numberInvalidIcond = document.querySelector(".number-invalid-icon");
const phoneIcon = document.querySelector(".phone-icon");
const displayPhone = document.querySelector(".phone-text");
const phonePattern = /^\+995\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
let formattedPhone = phoneNumber.value.replace(/\D/g, "");
const displayName = document.getElementById("name_display");
const displayLastName = document.getElementById("lastname_display");
const emailIcon = document.querySelector(".email-icon");
const displayEmail = document.querySelector(".email-text");
const aboutMeTitle = document.querySelector(".about_me-title");
const displayAboutMe = document.querySelector(".about_me-text");
let data = JSON.parse(localStorage.getItem("data")) || {};
const leftPage = document.querySelector(".left");
const rightPage = document.querySelector(".right");
const modal = document.querySelector(".modal");
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
nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let isNameValid = nameValidation(),
    islastNameValid = lastNameValidation(),
    isEmailValid = emailValidation(),
    isPhoneValid = phoneValidation(),
    isImgValid = checkImg();
  let isFormValid =
    isNameValid &&
    islastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isImgValid;
  if (isFormValid) {
    secondPage.classList.add("show");
    firstPage.classList.add("hidden");
  }
});
// მეორე გვერდიდან პირველზე დაბრუნება
function backPage(e) {
  e.preventDefault();
  if (previousBtn) {
    secondPage.classList.remove("show");
    firstPage.classList.remove("hidden");
  }
}
previousBtn.addEventListener("click", backPage);
// ფოტოს ატვირთვა და გამოჩენა მარჯვნივ
function saveFile() {
  while (imagePreview.firstChild) {
    imagePreview.removeChild(imagePreview.firstChild);
  }
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let data = JSON.parse(localStorage.getItem("data")) || {};
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.classList.add("resume--photo");
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
        data.personalImage = {
          name: file.name,
          type: img.src,
        };
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("imagePreview", img.src);
      };
      reader.readAsDataURL(file);
      imagePreview.appendChild(img);
    }
  }
  if (!imagePreview.firstChild) {
    imgValidIcon.classList.remove("show");
    imgInvalidIcon.classList.add("show");
    imgLabel.style.color = "#e52f2f";
    return false;
  } else {
    imgValidIcon.classList.add("show");
    imgInvalidIcon.classList.remove("show");
    imgLabel.style.color = "#000000";
    return true;
  }
}

function checkImg() {
  if (!!imagePreview.firstChild) {
    imgValidIcon.classList.add("show");
    imgInvalidIcon.classList.remove("show");
    imgLabel.style.color = "#000000";
    return true;
  } else {
    imgValidIcon.classList.remove("show");
    imgInvalidIcon.classList.add("show");
    imgLabel.style.color = "#e52f2f";
    return false;
  }
}
fileInput.addEventListener("change", saveFile);

// სახელის ვალიდაცია
function nameValidation(value) {
  const georgianAlphabetRegex = /^[\u10A0-\u10FF]+$/;
  if (
    georgianAlphabetRegex.test(nameInput.value) &&
    nameInput.value.length >= 2
  ) {
    nameInput.classList.add("valid");
    nameInput.classList.remove("invalid");
    nameLabel.style.color = "#000000";
    nameValidIcon.classList.add("show");
    nameInvalidIcond.classList.remove("show");
    nameInput.style.outline = "none";
    let data = JSON.parse(localStorage.getItem("data")) || {};
    data.name = nameInput.value;
    localStorage.setItem("data", JSON.stringify(data));
    return true;
  } else {
    nameInput.classList.remove("valid");
    nameInput.classList.add("invalid");
    nameLabel.style.color = "#e52f2f";
    nameValidIcon.classList.remove("show");
    nameInvalidIcond.classList.add("show");
    nameInput.style.outline = "none";
    let data = JSON.parse(localStorage.getItem("data")) || {};
    delete data.name;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
nameInput.addEventListener("input", nameValidation);
//გვარის ვალიდაცია
function lastNameValidation() {
  const georgianAlphabetRegex = /^[\u10A0-\u10FF]+$/;
  if (
    georgianAlphabetRegex.test(lastNameInput.value) &&
    lastNameInput.value.length >= 2
  ) {
    lastNameInput.classList.add("valid");
    lastNameInput.classList.remove("invalid");
    lastNameLabel.style.color = "#000000";
    lasNameValidIcon.classList.add("show");
    lastNameInvalidIcond.classList.remove("show");
    lastNameInput.style.outline = "none";
    let data = JSON.parse(localStorage.getItem("data")) || {};
    (data.surname = lastNameInput.value),
      localStorage.setItem("data", JSON.stringify(data));
    return true;
  } else {
    lastNameInput.classList.remove("valid");
    lastNameInput.classList.add("invalid");
    lastNameLabel.style.color = "#e52f2f";
    lasNameValidIcon.classList.remove("show");
    lastNameInvalidIcond.classList.add("show");
    lastNameInput.style.outline = "none";
    let data = JSON.parse(localStorage.getItem("data")) || {};
    delete data.surname;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
lastNameInput.addEventListener("input", lastNameValidation);
// ჩემ შესახებ ველისთვის ვალიდაცია border valid-ის გაკეთება
function aboutmeValid() {
  if (aboutMe.value.length >= 1) {
    aboutMe.classList.add("valid");
    aboutMe.style.outline = "none";
    let data = JSON.parse(localStorage.getItem("data")) || {};
    (data.about_me = aboutMe.value),
      localStorage.setItem("data", JSON.stringify(data));
  } else {
    aboutMe.classList.remove("valid");
    aboutMe.style.outline = "none";
    // localStorage.removeItem("about_me");
    let data = JSON.parse(localStorage.getItem("data")) || {};
    delete data.about_me;
    localStorage.setItem("data", JSON.stringify(data));
  }
}
aboutMe.addEventListener("keyup", aboutmeValid);
// ემაილის ვალიდაცია
function emailValidation() {
  if (email.value.match(pattern)) {
    email.classList.add("valid");
    email.classList.remove("invalid");
    emailLabel.style.color = "#000000";
    emailValidIcon.classList.add("show");
    emailInvalidIcond.classList.remove("show");
    email.style.outline = "none";
    // localStorage.setItem("email", email.value);
    let data = JSON.parse(localStorage.getItem("data")) || {};
    data.email = email.value;
    localStorage.setItem("data", JSON.stringify(data));
    return true;
  } else {
    email.classList.remove("valid");
    email.classList.add("invalid");
    emailLabel.style.color = "#e52f2f";
    emailValidIcon.classList.remove("show");
    emailInvalidIcond.classList.add("show");
    email.style.outline = "none";
    let data = JSON.parse(localStorage.getItem("data")) || {};
    delete data.email;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
email.addEventListener("input", emailValidation);
//მობილური ნომრის ვალიდაცია
function phoneValidation() {
  const phonePattern = /^\+995\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
  let formattedPhone = phoneNumber.value.replace(/\D/g, "");
  if (formattedPhone.length > 9) {
    formattedPhone =
      "+995 " +
      formattedPhone.substring(3, 6) +
      " " +
      formattedPhone.substring(6, 8) +
      " " +
      formattedPhone.substring(8, 10) +
      " " +
      formattedPhone.substring(10);
  }
  if (formattedPhone.match(phonePattern)) {
    let phoneWithoutSpaces = formattedPhone.replace(/\s/g, "");
    phoneNumber.value = formattedPhone;
    phoneNumber.classList.add("valid");
    phoneNumber.classList.remove("invalid");
    numberLabel.style.color = "#000000";
    numberValidIcon.classList.add("show");
    numberInvalidIcond.classList.remove("show");
    phoneNumber.style.outline = "none";
    localStorage.setItem("phone_number", formattedPhone);
    let data = JSON.parse(localStorage.getItem("data")) || {};
    (data.phone_number = phoneWithoutSpaces),
      localStorage.setItem("data", JSON.stringify(data));
    return true;
  } else {
    phoneNumber.classList.remove("valid");
    phoneNumber.classList.add("invalid");
    numberLabel.style.color = "#e52f2f";
    numberValidIcon.classList.remove("show");
    numberInvalidIcond.classList.add("show");
    phoneNumber.style.outline = "none";
    localStorage.removeItem("phone_number");
    let data = JSON.parse(localStorage.getItem("data")) || {};
    delete data.phone_number;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
phoneNumber.addEventListener("input", phoneValidation);

function onLoad() {
  let data = JSON.parse(localStorage.getItem("data")) || {};
  const nameValue = data.name || "";
  const lastNameValue = data.surname || "";
  const aboutValue = data.about_me || "";
  const emailValue = data.email || "";
  if (nameValue) {
    nameInput.value = nameValue;
    nameValidation();
  }
  if (lastNameValue) {
    lastNameInput.value = lastNameValue;
    lastNameValidation();
  }
  if (aboutValue) {
    aboutMe.value = aboutValue;
    aboutmeValid();
  }
  if (emailValue) {
    email.value = emailValue;
    emailValidation();
  }
  const previousPhone = localStorage.getItem("phone_number");
  if (previousPhone) {
    phoneNumber.value = previousPhone;
    phoneValidation();
  }
  const previousImage = localStorage.getItem("imagePreview");
  if (previousImage) {
    const img = document.createElement("img");
    img.classList.add("resume--photo");
    img.src = previousImage;
    imagePreview.appendChild(img);
    imgValidIcon.classList.add("show");
    imgInvalidIcon.classList.remove("show");
    imgLabel.style.color = "#000000";
  }
}
window.addEventListener("load", onLoad);
// მარჯვენა მხარეს წერისას პარალელურად გამოჩნდეს კონტენტი
// სახელის
function setName() {
  let data = JSON.parse(localStorage.getItem("data")) || {};
  let previousName = data.name || "";
  if (previousName) {
    nameInput.value = previousName;
    displayName.innerText = previousName;
  } else {
    displayName.innerText = "";
  }
}
nameInput.addEventListener("keyup", setName);
// გვარის
function setLastName() {
  let data = JSON.parse(localStorage.getItem("data")) || {};
  let previousName = data.surname || "";
  if (previousName) {
    lastNameInput.value = previousName;
    displayLastName.innerText = previousName;
  } else {
    displayLastName.innerText = "";
  }
}
lastNameInput.addEventListener("keyup", setLastName);
// ემაილის
function setEmail(e) {
  let data = JSON.parse(localStorage.getItem("data")) || {};
  let previousName = data.email || "";
  if (previousName) {
    email.value = previousName;
    emailIcon.classList.add("show");
    displayEmail.innerText = previousName;
  } else {
    emailIcon.classList.remove("show");
    displayEmail.innerText = " ";
  }
}
email.addEventListener("keyup", setEmail);
// ტელეფონის ნომრის
function setPhone(e) {
  const previousName = localStorage.getItem("phone_number");
  if (previousName) {
    phoneNumber.value = previousName;
    phoneIcon.classList.add("show");
    displayPhone.innerText = previousName;
  } else {
    phoneIcon.classList.remove("show");
    displayPhone.innerText = " ";
  }
}
phoneNumber.addEventListener("keyup", setPhone);
// ჩემ შესახებ
function setAboutMe(e) {
  let data = JSON.parse(localStorage.getItem("data")) || {};
  let previousName = data.about_me || "";
  if (previousName) {
    aboutMe.value = previousName;
    aboutMeTitle.classList.add("show");
    displayAboutMe.innerHTML = previousName;
  } else {
    displayAboutMe.innerHTML = "";
  }
}
aboutMe.addEventListener("keyup", setAboutMe);
//////////////////////////////
window.addEventListener("load", function () {
  setName();
  setLastName();
  setAboutMe();
  setEmail();
  setPhone();
  var aboutMeData = localStorage.getItem("about_me");
  var aboutMeValid = localStorage.getItem("aboutMeValid");
  if (aboutMeData && aboutMeValid === "true") {
    aboutMe.value = aboutMeData;
    aboutMe.classList.add("valid");
    aboutMe.style.outline = "none";
  }
});
