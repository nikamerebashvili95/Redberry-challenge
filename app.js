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
let positionInput = document.querySelectorAll(".position-input");
let positionLabel = document.querySelectorAll(".label-position");
let positionValidIcon = document.querySelectorAll(".position-valid-icon");
let positionInvalidIcon = document.querySelectorAll(".position-invalid-icon");
let employerInput = document.querySelectorAll(".employer-input");
let employerLabel = document.querySelectorAll(".label-employer");
let employerValidIcon = document.querySelectorAll(".employer-valid-icon");
let employerInvalidIcon = document.querySelectorAll(".employer-invalid-icon");
let startDateInputs = document.querySelectorAll(".start_date");
let endtDateInputs = document.querySelectorAll(".end_date");
let startDateLabels = document.querySelectorAll(".label-start-date");
let endtDateLabel = document.querySelector(".label-end-date");
const displayPosition = document.querySelectorAll(".position-display");
const displayEmployer = document.querySelector(".employer-display");
const startDate = document.querySelector(".date-start-display");
const endtDate = document.querySelector(".date-end-display");
const moreExperienceBtn = document.querySelector(".more-experience-btn");
let descriptions = document.querySelectorAll(".description");
let descriptionLabels = document.querySelectorAll(".label-description");
let experinceTitle = document.querySelector(".experince-title");
let displayLine = document.querySelector(".grey-line");
let descriptionDisplay = document.querySelector(".description-display");
let experienceContainer = document.querySelector(".experience_display");
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
function nameValidation(text) {
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
nameInput.addEventListener("input", nameValidation);
//გვარის ვალიდაცია
function lastNameValidation(text) {
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
lastNameInput.addEventListener("input", lastNameValidation);
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
function positionValidation(position, index) {
  if (position.value.length >= 2) {
    position.classList.add("valid");
    position.classList.remove("invalid");
    if (positionLabel.length > index && positionLabel[index]) {
      positionLabel[index].style.color = "#000000";
    }
    if (positionValidIcon.length > index && positionValidIcon[index]) {
      positionValidIcon[index].classList.add("show");
    }
    if (positionInvalidIcon.length > index && positionInvalidIcon[index]) {
      positionInvalidIcon[index].classList.remove("show");
    }
    position.style.outline = "none";
    return true;
  } else {
    position.classList.remove("valid");
    position.classList.add("invalid");
    if (positionLabel.length > index && positionLabel[index]) {
      positionLabel[index].style.color = "#e52f2f";
    }
    if (positionValidIcon.length > index && positionValidIcon[index]) {
      positionValidIcon[index].classList.remove("show");
    }
    if (positionInvalidIcon.length > index && positionInvalidIcon[index]) {
      positionInvalidIcon[index].classList.add("show");
    }
    position.style.outline = "none";
    return false;
  }
}
positionInput.forEach((position, index) => {
  position.addEventListener("input", () => {
    positionValidation(position, index);
  });
});
positionLabel[0].addEventListener("change", () => {
  positionValidation(positionInput[0], 0);
});
//დამსაქმებლის ვალიდაცია
function employerValidation(employer, index) {
  if (employer.value.length >= 2) {
    employer.classList.add("valid");
    employer.classList.remove("invalid");
    if (employerLabel.length > index && employerLabel[index]) {
      employerLabel[index].style.color = "#000000";
    }
    if (employerValidIcon.length > index && employerValidIcon[index]) {
      employerValidIcon[index].classList.add("show");
    }
    if (employerInvalidIcon.length > index && employerInvalidIcon[index]) {
      employerInvalidIcon[index].classList.remove("show");
    }
    employer.style.outline = "none";
    return true;
  } else {
    employer.classList.remove("valid");
    employer.classList.add("invalid");
    if (employerLabel.length > index && employerLabel[index]) {
      employerLabel[index].style.color = "#e52f2f";
    }
    if (employerValidIcon.length > index && employerValidIcon[index]) {
      employerValidIcon[index].classList.remove("show");
    }
    if (employerInvalidIcon.length > index && employerInvalidIcon[index]) {
      employerInvalidIcon[index].classList.add("show");
    }
    employer.style.outline = "none";
    return false;
  }
}
employerInput.forEach((employer, index) => {
  employer.addEventListener("input", () => {
    employerValidation(employer, index);
  });
});
employerLabel[0].addEventListener("change", () => {
  employerValidation(employerInput[0], 0);
});
// თარიღის ვალიდაცია
function addEventListenersToDates(
  startDateInput,
  endtDateInput,
  startDateLabel,
  endtDateLabel
) {
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
}
for (let i = 0; i < startDateInputs.length; i++) {
  addEventListenersToDates(
    startDateInputs[i],
    endtDateInputs[i],
    startDateLabels[i],
    endtDateLabel
  );
}
// აღწერის TextArea-ს ვალიდაცია
function descriptionValidation(description, index) {
  if (description.value !== "") {
    description.classList.add("valid");
    description.classList.remove("invalid");
    descriptionLabels[index].style.color = "#000000";
    description.style.outline = "none";
    return true;
  } else {
    description.classList.remove("valid");
    description.classList.add("invalid");
    descriptionLabels[index].style.color = "#e52f2f";
    description.style.outline = "none";
    return false;
  }
}

descriptions.forEach((description, index) => {
  description.addEventListener("input", () => {
    descriptionValidation(description, index);
  });
});
descriptionLabels[0].addEventListener("change", () => {
  descriptionValidation(descriptions[0], 0);
});
// მეტი გამოცდილების დამატება

function add_more_field() {
  const html = ` <div class="form-container">
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
     class="input position-input"
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
     class="input employer-input"
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
       type="date"
       class="date start_date"
     />
   </div>
   <div class="input-field right-date">
     <label class="label-top label-end-date" for="end_date"
       >დამთავრების რიცხვი</label
     >
     <input
       type="date"
       class="date end_date"
     />
   </div>
 </div>
 <div class="input-field about-field">
   <label class="label-top label-description" for="description"
     >აღწერა</label
   >
   <textarea
     class="input about-input description"
     name="about"
     placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
   ></textarea>
 </div>
 <div class="border-grey-line"></div>`;
  const form = document.querySelector(".moreExp");
  form.insertAdjacentHTML("beforeend", html);
  descriptions = document.querySelectorAll(".description");
  descriptionLabels = document.querySelectorAll(".label-description");
  positionInput = document.querySelectorAll(".position-input");
  positionLabel = document.querySelectorAll(".label-position");
  positionValidIcon = document.querySelectorAll(".position-valid-icon");
  positionInvalidIcon = document.querySelectorAll(".position-invalid-icon");
  employerInput = document.querySelectorAll(".employer-input");
  employerLabel = document.querySelectorAll(".label-employer");
  employerValidIcon = document.querySelectorAll(".employer-valid-icon");
  employerInvalidIcon = document.querySelectorAll(".employer-invalid-icon");
  // add event listeners to new elements
  const lastIndex = descriptions.length - 1;
  descriptions[lastIndex].addEventListener("input", () => {
    descriptionValidation(descriptions[lastIndex], lastIndex);
  });
  const lastIndex_2 = positionInput.length - 1;
  positionInput[lastIndex_2].addEventListener("input", () => {
    positionValidation(positionInput[lastIndex_2], lastIndex_2);
  });
  const lastIndex_3 = employerInput.length - 1;
  employerInput[lastIndex_3].addEventListener("input", () => {
    employerValidation(employerInput[lastIndex_3], lastIndex_3);
  });
}
function validateForm() {
  let valid = true;
  descriptions.forEach((description, index) => {
    if (!descriptionValidation(description, index)) {
      valid = false;
    }
  });
  return valid;
}
var wholeForm = document.querySelector("#form");
wholeForm.onsubmit = function (e) {
  e.preventDefault();
  if (validateForm()) {
    wholeForm.submit();
  }
};
// მარჯვენა მხარეს წერისას პარალელურად გამოჩნდეს კონტენტი
// სახელის
function setName(e) {
  if (nameValidation()) {
    displayName.innerText = e.target.value;
  } else {
    displayName.innerText = "";
  }
}
nameInput.addEventListener("keyup", setName);
// გვარის
function setLastName(e) {
  if (lastNameValidation()) {
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
function setPosition(position) {
  if (positionValidation(position, 0)) {
    displayPosition.classList.add("show");
    displayPosition.innerHTML = position.value + ",";
    displayLine.classList.add("show");
    experinceTitle.classList.add("show");
  } else {
    displayPosition.classList.remove("show");
    displayPosition.innerHTML = "";
  }
}
positionInput.forEach((position) => {
  position.addEventListener("keyup", () => {
    setPosition(position);
  });
});
// positionInput.addEventListener("keyup", setPosition);
positionInput.forEach((position) => {
  position.addEventListener("keyup", () => {
    positionValidation(position);
  });
});
// დამსაქმებლის
function setEmployer(employer) {
  if (employerValidation(employer, 0)) {
    displayEmployer.classList.add("show");
    displayEmployer.innerHTML = employer.value;
    displayLine.classList.add("show");
    experinceTitle.classList.add("show");
  } else {
    displayEmployer.classList.remove("show");
    displayEmployer.innerHTML = "";
  }
}
employerInput.forEach((employer) => {
  employer.addEventListener("keyup", () => {
    setPosition(employer);
  });
});
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
// startDateInput.addEventListener("change", setStartDate);
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
// endtDateInput.addEventListener("change", setEndDate);
// აღწერის
function setDescription(description) {
  if (descriptionValidation(description, 0)) {
    experinceTitle.classList.add("show");
    descriptionDisplay.classList.add("show");
    displayLine.classList.add("show");
    descriptionDisplay.innerHTML = description.value;
  } else {
    descriptionDisplay.classList.remove("show");
    descriptionDisplay.innerHTML = "";
  }
}

//description.addEventListener("keyup", setDescription);
descriptions.forEach((description) => {
  description.addEventListener("keyup", () => {
    setDescription(description);
  });
});
