const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".back-btn");
const fileInput = document.getElementById("image");
const imagePreview = document.querySelector(".resume--photo");
const imgValidIcon = document.querySelector(".img-valid-icon");
const imglInvalidIcond = document.querySelector(".img-invalid-icon");
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
var phonePattern = /^(\+995)\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
const phoneNumberInp = document.getElementById("phone-number");
const displayName = document.getElementById("name_display");
const displayLastName = document.getElementById("lastname_display");
const emailIcon = document.querySelector(".email-icon");
const displayEmail = document.querySelector(".email-text");
const aboutMeTitle = document.querySelector(".about_me-title");
const displayAboutMe = document.querySelector(".about_me-text");
const positionInput = document.querySelector(".position-input");
const positionLabel = document.querySelector(".label-position");
const positionValidIcon = document.querySelector(".position-valid-icon");
const positionInvalidIcon = document.querySelector(".position-invalid-icon");
const employerInput = document.querySelector(".employer-input");
const employerLabel = document.querySelector(".label-employer");
const employerValidIcon = document.querySelector(".employer-valid-icon");
const employerInvalidIcon = document.querySelector(".employer-invalid-icon");
const startDateInput = document.querySelector(".start_date");
const endtDateInput = document.querySelector(".end_date");
const startDateLabel = document.querySelector(".label-start-date");
const endtDateLabel = document.querySelector(".label-end-date");
const description = document.querySelector(".description");
const descriptionLabel = document.querySelector(".label-description");
const experinceTitle = document.querySelector(".experince-title");
const displayPosition = document.querySelector(".position-display");
const displayLine = document.querySelector(".grey-line");
const employerPosition = document.querySelector(".employer-display");
const startDate = document.querySelector(".date-start-display");
const endtDate = document.querySelector(".date-end-display");
const descriptionDisplay = document.querySelector(".description-display");
const moreExperienceBtn = document.querySelector(".more-experience-btn");
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

// ფოტოს ატვირთვა და გამოჩენა მარჯვნივ
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
fileInput.addEventListener("change", saveFile);
// სახელის ვალიდაცია
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
phoneNumber.addEventListener("input", phoneValidation);
// თანამდებობის ვალიდაცია
function positionValidation() {
  let valid = false;
  if (positionInput.value.length >= 2) {
    positionInput.classList.add("valid");
    positionInput.classList.remove("invalid");
    positionLabel.style.color = "#000000";
    positionValidIcon.classList.add("show");
    positionInvalidIcon.classList.remove("show");
    positionInput.style.outline = "none";
    valid = true;
  } else {
    positionInput.classList.remove("valid");
    positionInput.classList.add("invalid");
    positionLabel.style.color = "#e52f2f";
    positionValidIcon.classList.remove("show");
    positionInvalidIcon.classList.add("show");
    positionInput.style.outline = "none";
  }
  return valid;
}
positionInput.addEventListener("input", positionValidation);
//დამსაქმებლის ვალიდაცია
function employerValidation() {
  let valid = false;
  if (employerInput.value.length >= 2) {
    employerInput.classList.add("valid");
    employerInput.classList.remove("invalid");
    employerLabel.style.color = "#000000";
    employerValidIcon.classList.add("show");
    employerInvalidIcon.classList.remove("show");
    employerInput.style.outline = "none";
    valid = true;
  } else {
    employerInput.classList.remove("valid");
    employerInput.classList.add("invalid");
    employerLabel.style.color = "#e52f2f";
    employerValidIcon.classList.remove("show");
    employerInvalidIcon.classList.add("show");
    employerInput.style.outline = "none";
  }
  return valid;
}
employerInput.addEventListener("input", employerValidation);
// თარიღის ვალიდაცია
// დაწყების
startDateInput.max = new Date().toISOString().split("T")[0];
startDateInput.addEventListener("input", function (event) {
  endtDateInput.min = event.target.value;
  let valid = false;
  if (startDateInput.value != "") {
    startDateInput.classList.add("valid");
    startDateInput.classList.remove("invalid");
    startDateLabel.style.color = "#000000";
    startDateInput.style.outline = "none";
    valid = true;
  } else {
    startDateInput.classList.remove("valid");
    startDateInput.classList.add("invalid");
    startDateLabel.style.color = "#e52f2f";
    startDateInput.style.outline = "none";
  }
  return valid;
});
//დამთავრების
endtDateInput.max = new Date().toISOString().split("T")[0];
endtDateInput.addEventListener("input", function endDateValidation(event) {
  const startDateValue = new Date(startDateInput.value);
  const endDateValue = new Date(event.target.value);

  if (endDateValue < startDateValue) {
    event.target.value = startDateInput.value;
  }

  let valid = false;
  if (endtDateInput.value != "") {
    endtDateInput.classList.add("valid");
    endtDateInput.classList.remove("invalid");
    endtDateLabel.style.color = "#000000";
    endtDateInput.style.outline = "none";
    valid = true;
  } else {
    endtDateInput.classList.remove("valid");
    endtDateInput.classList.add("invalid");
    endtDateLabel.style.color = "#e52f2f";
    endtDateInput.style.outline = "none";
  }
  return valid;
});
// აღწერის TextArea-ს ვალიდაცია
function descriptioValidation() {
  let valid = false;
  if (description.value != "") {
    description.classList.add("valid");
    description.classList.remove("invalid");
    descriptionLabel.style.color = "#000000";
    description.style.outline = "none";
    valid = true;
  } else {
    description.classList.remove("valid");
    description.classList.add("invalid");
    descriptionLabel.style.color = "#e52f2f";
    description.style.outline = "none";
  }
  return valid;
}
description.addEventListener("input", descriptioValidation);
// მეტი გამოცდილების დამატება
var countre = 1;
html = ` <div class="form-container -${countre}">
<div class="input-field">
  <span class="position-valid-icon">
    <img
      src="assets/images/icons/valid-icon.svg"
      alt="valid-cion"
    />
  </span>
  <span class="position-invalid-icon">
    <img
      src="assets/images/icons/invalid-icon.svg"
      alt="invalid-icon"
    />
  </span>
  <label class="label-top label-position" for="position-input"
    >თანამდებობა</label
  >
  <input
    class="input position-input-${countre}"
    onkeyup="positionValidation()"
    type="text"
    placeholder="თანამდებობა"
  />
  <label class="label-bottom">მინიმუმ 2 სიმბოლო</label>
</div>
<div class="input-field employer">
  <span class="employer-valid-icon">
    <img
      src="assets/images/icons/valid-icon.svg"
      alt="valid-cion"
    />
  </span>
  <span class="employer-invalid-icon">
    <img
      src="assets/images/icons/invalid-icon.svg"
      alt="invalid-icon"
    />
  </span>
  <label class="label-top label-employer" for="employer-input"
    >დამსაქმებელი</label
  >
  <input
    class="input employer-input-${countre}"
    onkeyup="employerValidation()"
    type="text"
    placeholder="დამსაქმებელი"
  />
  <label class="label-bottom">მინიმუმ 2 სიმბოლო</label>
</div>
<div class="date-container">
  <div class="input-field left-date">
    <label class="label-top label-start-date" for="start_date"
      >დაწყების რიცხვი</label
    >
    <input
      onchange="startDateValidation()"
      type="date"
      class="date start_date-${countre}"
    />
  </div>
  <div class="input-field right-date">
    <label class="label-top label-end-date" for="end_date"
      >დამთავრების რიცხვი</label
    >
    <input
      type="date"
      class="date end_date-${countre}"
      onchange="endtDateValidation()"
    />
  </div>
</div>
<div class="input-field about-field">
  <label class="label-top label-description" for="description"
    >აღწერა</label
  >
  <textarea
    class="input about-input description-${countre}"
    name="about"
    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
    onkeyup="descriptioValidation()"
  ></textarea>
</div>
<div class="border-grey-line"></div>`;
function add_more_field() {
  countre += 1;
  var form = document.querySelector(".moreExp");
  form.innerHTML += html;
}

var wholeForm = document.querySelector("#form");
wholeForm.onsubmit = function (e) {
  e.preventDefault();
};
// მარჯვენა მხარეს წერისას პარალელურად გამოჩნდეს კონტენტი
// სახელის
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
function setAboutMe(e) {
  if (aboutMe.value.length >= 1) {
    aboutMeTitle.classList.add("show");
    displayAboutMe.innerHTML = e.target.value;
  } else {
    displayAboutMe.innerHTML = "";
  }
}
aboutMe.addEventListener("keyup", setAboutMe);
// თანამდებობის

function setPosition(e) {
  if (positionValidation()) {
    experinceTitle.classList.add("show");
    displayPosition.classList.add("show");
    displayPosition.innerHTML = e.target.value + ",";
    displayLine.classList.add("show");
  } else {
    displayPosition.classList.remove("show");

    displayPosition.innerHTML = "";
  }
}
positionInput.addEventListener("keyup", setPosition);
// დამსაქმებლის
function setEmployer(e) {
  if (employerValidation()) {
    experinceTitle.classList.add("show");
    employerPosition.classList.add("show");
    displayLine.classList.add("show");
    employerPosition.innerHTML = e.target.value;
  } else {
    employerPosition.classList.remove("show");

    employerPosition.innerHTML = "";
  }
}
employerInput.addEventListener("keyup", setEmployer);
// დაწყების თარიღის
function setStartDate(e) {
  if (startDateInput.value.length > 1) {
    experinceTitle.classList.add("show");
    startDate.classList.add("show");
    displayLine.classList.add("show");
    startDate.innerHTML = e.target.value;
  } else {
    startDate.classList.remove("show");

    startDate.innerHTML = "";
  }
}
startDateInput.addEventListener("change", setStartDate);
// დასრულების თარიღი
function setEndDate(e) {
  if (endtDateInput.value.length > 1) {
    experinceTitle.classList.add("show");
    endtDate.classList.add("show");
    displayLine.classList.add("show");
    endtDate.innerHTML = "- " + " " + e.target.value;
  } else {
    endtDate.classList.remove("show");
    endtDate.innerHTML = "";
  }
}
endtDateInput.addEventListener("change", setEndDate);
// აღწერის
function setDescription(e) {
  if (descriptioValidation()) {
    experinceTitle.classList.add("show");
    descriptionDisplay.classList.add("show");
    displayLine.classList.add("show");
    descriptionDisplay.innerHTML = e.target.value;
  } else {
    descriptionDisplay.classList.remove("show");
    descriptionDisplay.innerHTML = "";
  }
}
description.addEventListener("keyup", setDescription);
