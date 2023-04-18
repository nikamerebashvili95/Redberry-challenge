const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".back-btn");
const fileInput = document.getElementById("image");
const imagePreview = document.querySelector(".resume--photo");
const imgValidIcon = document.querySelector(".img-valid-icon");
const imglInvalidIcond = document.querySelector(".img-invalid-icon");
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
var phonePattern = /^(\+995)\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
// const phoneNumberInp = document.getElementById("phone-number");
const displayName = document.getElementById("name_display");
const displayLastName = document.getElementById("lastname_display");
const emailIcon = document.querySelector(".email-icon");
const displayEmail = document.querySelector(".email-text");
const aboutMeTitle = document.querySelector(".about_me-title");
const displayAboutMe = document.querySelector(".about_me-text");

// მთავარი გვერდიდან გადასვლა შესავსებ აპლიკაციაში
function goToGeneralInfo() {
  location.href = "./survey.html";
}
// მთავარ გვერდზე დასაბრუნებელი ღილაკის ფუნქცია
function goToLanding() {
  location.href = "./index.html";
}
// დაკლიკებით შემდეგ პირველი გვერდიდან მეორეზე გადასვლა თუ ვალიდურია
nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let isNameValid = nameValidation(),
    islastNameValid = lastNameValidation(),
    isEmailValid = emailValidation(),
    isPhoneValid = phoneValidation(),
    isImgValid = imgValid;
  let isFormValid =
    isNameValid &&
    islastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isImgValid;
  if (isFormValid) {
    secondPage.classList.add("show");
    firstPage.classList.add("hidden");
  } else {
    imgValidIcon.classList.remove("show");
    imglInvalidIcond.classList.add("show");
    imgLabel.style.color = "#e52f2f";
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
  let valid = true;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith("image/")) {
      imgValidIcon.classList.add("show");
      imglInvalidIcond.classList.remove("show");
      imgLabel.style.color = "#000000";
      const img = document.createElement("img");
      img.classList.add("resume--photo");
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
        localStorage.setItem("imagePreview", img.src);
      };
      reader.readAsDataURL(file);
      imagePreview.appendChild(img);
    } else {
      imgValidIcon.classList.remove("show");
      imglInvalidIcond.classList.add("show");
      imgLabel.style.color = "#e52f2f";
      valid = false;
      continue;
    }
  }
  if (files.length === 0) {
    imgValidIcon.classList.remove("show");
    imglInvalidIcond.classList.add("show");
    imgLabel.style.color = "#e52f2f";
    valid = false;
  }
  localStorage.setItem("imgValid", valid);
  return valid;
}

fileInput.addEventListener("change", saveFile);
const previousImage = localStorage.getItem("imagePreview");
const imgValid = localStorage.getItem("imgValid");
if (previousImage) {
  const img = document.createElement("img");
  img.classList.add("resume--photo");
  img.src = previousImage;
  imagePreview.appendChild(img);
}
if (imgValid === "true") {
  saveFile();
}
// სახელის ვალიდაცია
function nameValidation() {
  const nameInput = document.getElementById("name");
  const text = nameInput.value.replace(/\s/g);
  const langdic = {
    Georgian: /^[\u10A0-\u10FF]{2,}$/,
  };
  let isValid = false;
  Object.entries(langdic).forEach(([key, value]) => {
    if (value.test(text)) {
      isValid = true;
    }
  });
  if (isValid) {
    nameInput.classList.add("valid");
    nameInput.classList.remove("invalid");
    nameLabel.style.color = "#000000";
    nameValidIcon.classList.add("show");
    nameInvalidIcond.classList.remove("show");
    nameInput.style.outline = "none";
  } else {
    nameInput.classList.remove("valid");
    nameInput.classList.add("invalid");
    nameLabel.style.color = "#e52f2f";
    nameValidIcon.classList.remove("show");
    nameInvalidIcond.classList.add("show");
    nameInput.style.outline = "none";
  }
  // Store name and validation result in localStorage
  localStorage.setItem("nameInputValue", nameInput.value);
  localStorage.setItem("nameValidationResult", isValid.toString());

  return isValid;
}
nameInput.addEventListener("input", nameValidation);
const previousName = localStorage.getItem("nameInputValue");
if (previousName) {
  nameInput.value = previousName;
}
const previousResult = localStorage.getItem("nameValidationResult");
if (previousResult === "true") {
  nameValidation();
}
//გვარის ვალიდაცია
function lastNameValidation() {
  const lastNameInput = document.getElementById("lastName");
  const text = lastNameInput.value.replace(/\s/g);
  const langdic = {
    Georgian: /^[\u10A0-\u10FF]{2,}$/,
  };
  let isValid = false;
  Object.entries(langdic).forEach(([key, value]) => {
    if (value.test(text)) {
      isValid = true;
    }
  });
  if (isValid) {
    lastNameInput.classList.add("valid");
    lastNameInput.classList.remove("invalid");
    lastNameLabel.style.color = "#000000";
    lasNameValidIcon.classList.add("show");
    lastNameInvalidIcond.classList.remove("show");
    lastNameInput.style.outline = "none";
  } else {
    lastNameInput.classList.remove("valid");
    lastNameInput.classList.add("invalid");
    lastNameLabel.style.color = "#e52f2f";
    lasNameValidIcon.classList.remove("show");
    lastNameInvalidIcond.classList.add("show");
    lastNameInput.style.outline = "none";
  }

  // Store name and validation result in localStorage only when isValid is true
  if (isValid) {
    localStorage.setItem("lastNameInputValue", lastNameInput.value);
    localStorage.setItem("lastNameValidationResult", isValid.toString());
  } else {
    localStorage.removeItem("lastNameInputValue");
    localStorage.removeItem("lastNameValidationResult");
  }

  return isValid;
}

lastNameInput.addEventListener("input", lastNameValidation);

const previousLastName = localStorage.getItem("lastNameInputValue");
if (previousLastName) {
  lastNameInput.value = previousLastName;
}

const previousResult_2 = localStorage.getItem("lastNameValidationResult");
if (previousResult_2 === "true") {
  lastNameValidation();
}
// ჩემ შესახებ ველისთვის ვალიდაცია border valid-ის გაკეთება
function aboutmeValid() {
  if (aboutMe.value.length >= 1) {
    aboutMe.classList.add("valid");
    aboutMe.style.outline = "none";
    localStorage.setItem("aboutMeData", aboutMe.value);
    localStorage.setItem("aboutMeValid", true);
    // add any other code to execute if the input is valid
  } else {
    aboutMe.classList.remove("valid");
    aboutMe.style.outline = "none";
    localStorage.removeItem("aboutMeData");
    localStorage.removeItem("aboutMeValid");
  }
}
aboutMe.addEventListener("keyup", aboutmeValid);
// ემაილის ვალიდაცია
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
    // save email and validation status in localStorage only if the email is valid
    localStorage.setItem("emailInputValue", email.value);
    localStorage.setItem("valid", valid);
  } else {
    email.classList.remove("valid");
    email.classList.add("invalid");
    emailLabel.style.color = "#e52f2f";
    emailValidIcon.classList.remove("show");
    emailInvalidIcond.classList.add("show");
    email.style.outline = "none";
    // remove email and validation status from localStorage if the email is invalid
    localStorage.removeItem("emailInputValue");
    localStorage.removeItem("valid");
  }
  return valid;
}
email.addEventListener("input", emailValidation);
const previousEmail = localStorage.getItem("emailInputValue");
const emailValid = localStorage.getItem("valid");
if (previousEmail) {
  email.value = previousEmail;
}
if (emailValid === "true") {
  emailValidation();
}
//მობილური ნომრის ვალიდაცია
function phoneValidation() {
  let valid = false;
  if (phoneNumber.value.match(phonePattern)) {
    phoneNumber.classList.add("valid");
    phoneNumber.classList.remove("invalid");
    numberLabel.style.color = "#000000";
    numberValidIcon.classList.add("show");
    numberInvalidIcond.classList.remove("show");
    phoneNumber.style.outline = "none";
    valid = true;
    localStorage.setItem("phoneInputValue", phoneNumber.value);
    localStorage.setItem("phoneValid", valid);
  } else {
    phoneNumber.classList.remove("valid");
    phoneNumber.classList.add("invalid");
    numberLabel.style.color = "#e52f2f";
    numberValidIcon.classList.remove("show");
    numberInvalidIcond.classList.add("show");
    phoneNumber.style.outline = "none";
    localStorage.removeItem("phoneInputValue");
    localStorage.removeItem("phoneValid");
  }
  return valid;
}
phoneNumber.addEventListener("input", function (e) {
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
phoneNumber.addEventListener("input", phoneValidation);
const previousPhone = localStorage.getItem("phoneInputValue");
const phoneValid = localStorage.getItem("phoneValid");
if (previousPhone) {
  phoneNumber.value = previousPhone;
}
if (phoneValid === "true") {
  phoneValidation();
}
// მარჯვენა მხარეს წერისას პარალელურად გამოჩნდეს კონტენტი
// სახელის
function setName() {
  const previousName = localStorage.getItem("nameInputValue");
  if (previousName) {
    nameInput.value = previousName;
    displayName.innerText = previousName;
  } else {
    displayName.innerText = "";
  }
}
nameInput.addEventListener("keyup", setName);
// გვარის
function setLastName(e) {
  const previousName = localStorage.getItem("lastNameInputValue");
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
  const previousName = localStorage.getItem("emailInputValue");
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
  const previousName = localStorage.getItem("phoneInputValue");
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
  const previousName = localStorage.getItem("aboutMeData");
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
  var aboutMeData = localStorage.getItem("aboutMeData");
  var aboutMeValid = localStorage.getItem("aboutMeValid");
  if (aboutMeData && aboutMeValid === "true") {
    aboutMe.value = aboutMeData;
    aboutMe.classList.add("valid");
    aboutMe.style.outline = "none";
    // add any other code to execute if the input is valid
  }
});
