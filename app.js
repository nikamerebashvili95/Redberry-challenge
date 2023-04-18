/*
const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
const thirdPage = document.querySelector(".third-page");
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".back-btn");
const previousSecondBtn = document.querySelector(".back-second-btn");
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
let endDateInputs = document.querySelectorAll(".end_date");
let startDateLabels = document.querySelectorAll(".label-start-date");
let endDateLabels = document.querySelectorAll(".label-end-date");
let displayPosition = document.querySelectorAll(".position-display");
let displayEmployer = document.querySelectorAll(".employer-display");
let startDateDisplay = document.querySelectorAll(".date-start-display");
let endDateDisplay = document.querySelectorAll(".date-end-display");
const moreExperienceBtn = document.querySelector(".more-experience-btn");
let descriptions = document.querySelectorAll(".description");
let descriptionLabels = document.querySelectorAll(".label-description");
let experinceTitles = document.querySelectorAll(".experince-title");
let displayLines = document.querySelectorAll(".grey-line");
let descriptionDisplays = document.querySelectorAll(".description-display");
let experienceContainer = document.querySelector(".experience_display");
const nextSecondBtn = document.querySelector(".next-second-btn");
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
    secondPage.classList.add("show");
    firstPage.classList.add("hidden");
  }
});

// დაკლიკებით შემდეგ მეორე გვერდიდან მესამეზე გადასვლა თუ ვალიდურია
nextSecondBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let isFormValid = true;
  positionInput.forEach((position, index) => {
    let isValid = positionValidation(position, index, positionInput);
    if (!isValid) {
      isFormValid = false;
    }
  });
  employerInput.forEach((employer, index) => {
    let isValid = employerValidation(employer, index, employerInput);
    if (!isValid) {
      isFormValid = false;
    }
  });
  descriptions.forEach((description, index) => {
    let isValid = descriptionValidation(description, index, descriptions);
    if (!isValid) {
      isFormValid = false;
    }
  });
  // Select all start and end date inputs, including newly added fields
  let startDateInputs = document.querySelectorAll(".start_date");
  let endDateInputs = document.querySelectorAll(".end_date");

  // Loop through all start and end date inputs, checking their validity
  let isFormValidDate = true;
  startDateInputs.forEach(function (startDateInput, index) {
    let endDateInput = endDateInputs[index];
    let startDateLabel = startDateInput
      .closest(".form-container")
      .querySelector(".label-start-date");
    let endDateLabel = endDateInput
      .closest(".form-container")
      .querySelector(".label-end-date");

    let isDateValid = addEventListenersToDates(
      startDateInput,
      endDateInput,
      startDateLabel,
      endDateLabel
    );

    if (startDateInput.value === "") {
      isFormValidDate = false;
      startDateInput.classList.add("invalid");
      startDateLabel.style.color = "#e52f2f";
    } else {
      startDateInput.classList.remove("invalid");
      startDateLabel.style.color = "#000000";
    }

    if (endDateInput.value === "") {
      isFormValidDate = false;
      endDateInput.classList.add("invalid");
      endDateLabel.style.color = "#e52f2f";
    } else {
      endDateInput.classList.remove("invalid");
      endDateLabel.style.color = "#000000";
    }
  });

  if (isFormValid && isFormValidDate) {
    secondPage.classList.remove("show");
    thirdPage.classList.add("show");
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
//მესამე გვერდიდან მეორეზე დაბრუნება
function backSecondPage(e) {
  e.preventDefault();
  if (previousSecondBtn) {
    thirdPage.classList.remove("show");
    secondPage.classList.add("show");
  }
}
previousSecondBtn.addEventListener("click", backSecondPage);
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
function positionValidation(position, index, allPositions) {
  if (position && position.value && position.value.length >= 2) {
    position.classList.add("valid");
    if (position.classList.contains("invalid")) {
      position.classList.remove("invalid");
    }
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
    if (position && position.classList.contains("valid")) {
      position.classList.remove("valid");
    }
    if (position) {
      position.classList.add("invalid");
    }
    if (positionLabel.length > index && positionLabel[index]) {
      positionLabel[index].style.color = "#e52f2f";
    }
    if (positionValidIcon.length > index && positionValidIcon[index]) {
      positionValidIcon[index].classList.remove("show");
    }
    if (positionInvalidIcon.length > index && positionInvalidIcon[index]) {
      positionInvalidIcon[index].classList.add("show");
    }
    if (position) {
      position.style.outline = "none";
    }
    return false;
  }
}
positionInput.forEach((position, index) => {
  if (position && position.value && position.value.length >= 2) {
    position.addEventListener("input", () => {
      positionValidation(position, index);
    });
  }
});
positionLabel[0].addEventListener("change", () => {
  positionValidation(positionInput[0], 0);
});
//დამსაქმებლის ვალიდაცია
function employerValidation(employer, index, allEmployer) {
  if (employer && employer.value && employer.value.length >= 2) {
    employer.classList.add("valid");
    if (employer.classList.contains("invalid")) {
      employer.classList.remove("invalid");
    }
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
    if (employer && employer.classList.contains("valid")) {
      employer.classList.remove("valid");
    }
    if (employer) {
      employer.classList.add("invalid");
    }
    if (employerLabel.length > index && employerLabel[index]) {
      employerLabel[index].style.color = "#e52f2f";
    }
    if (employerValidIcon.length > index && employerValidIcon[index]) {
      employerValidIcon[index].classList.remove("show");
    }
    if (employerInvalidIcon.length > index && employerInvalidIcon[index]) {
      employerInvalidIcon[index].classList.add("show");
    }
    if (employer) {
      employer.style.outline = "none";
    }
    return false;
  }
}

employerInput.forEach((employer, index) => {
  if (employer && employer.value && employer.value.length >= 2) {
    position.addEventListener("input", () => {
      employerValidation(employer, index);
    });
  }
});

employerLabel[0].addEventListener("change", () => {
  employerValidation(employerInput[0], 0);
});
// თარიღის ვალიდაცია
function addEventListenersToDates(
  startDateInput,
  endDateInput,
  startDateLabel,
  endDateLabel
) {
  startDateInput.max = new Date().toISOString().split("T")[0];
  startDateInput.addEventListener("input", function (event) {
    endDateInput.min = event.target.value;
    if (startDateInput.value.length != "") {
      startDateInput.classList.add("valid");
      startDateInput.classList.remove("invalid");
      startDateLabel.style.color = "#000000";
      startDateInput.style.outline = "none";
    } else {
      startDateInput.classList.remove("valid");
      startDateInput.classList.add("invalid");
      startDateLabel.style.color = "#e52f2f";
      startDateInput.style.outline = "none";
    }
  });
  startDateInput.addEventListener("change", () => {
    checkAllEmpty();
  });
  startDateInput.addEventListener("change", setStartDate);
  endDateInput.max = new Date().toISOString().split("T")[0];
  endDateInput.addEventListener("input", function endDateValidation(event) {
    const startDateValue = new Date(startDateInput.value);
    const endDateValue = new Date(event.target.value);
    if (endDateValue < startDateValue) {
      event.target.value = startDateInput.value;
    }
    if (endDateInput.value != "") {
      endDateInput.classList.add("valid");
      endDateInput.classList.remove("invalid");
      endDateLabel.style.color = "#000000";
      endDateInput.style.outline = "none";
    } else {
      endDateInput.classList.remove("valid");
      endDateInput.classList.add("invalid");
      endDateLabel.style.color = "#e52f2f";
      endDateInput.style.outline = "none";
    }
  });
  endDateInput.addEventListener("change", () => {
    checkAllEmpty();
  });
  endDateInput.addEventListener("change", setEndDate);

  // Return true if both inputs are valid, false otherwise
  return startDateInput.value !== "" && endDateInput.value !== "";
}
for (let i = 0; i < startDateInputs.length; i++) {
  addEventListenersToDates(
    startDateInputs[i],
    endDateInputs[i],
    startDateLabels[i],
    endDateLabels[i]
  );
}
addEventListenersToDates(
  startDateInputs[startDateInputs.length - 1],
  endDateInputs[endDateInputs.length - 1],
  startDateLabels[startDateLabels.length - 1],
  endDateLabels[endDateLabels.length - 1]
);
// აღწერის TextArea-ს ვალიდაცია
function descriptionValidation(description, index, allDescription) {
  if (description && description.value && description.value !== "") {
    description.classList.add("valid");
    if (description.classList.contains("invalid")) {
      description.classList.remove("invalid");
    }
    description.classList.remove("invalid");
    descriptionLabels[index] &&
      (descriptionLabels[index].style.color = "#000000");
    description.style.outline = "none";
    return true;
  } else {
    if (description && description.classList.contains("valid")) {
      description.classList.remove("valid");
    }
    if (description) {
      description.classList.add("invalid");
    }
    descriptionLabels[index] &&
      (descriptionLabels[index].style.color = "#e52f2f");
    if (description) {
      description.style.outline = "none";
    }
    return false;
  }
}
descriptions.forEach((description, index) => {
  description.addEventListener("input", () => {
    descriptionValidation(description, index);
  });
});
descriptions.forEach((description, index) => {
  if (description && description.value && description.value.length >= 2) {
    description.addEventListener("input", () => {
      descriptionValidation(description, index);
    });
  }
});
descriptionLabels[0].addEventListener("change", () => {
  descriptionValidation(descriptions[0], 0);
});
// მეტი გამოცდილების დამატება
const MAX_FIELDS = 5;
function add_more_field() {
  const form = document.querySelector(".moreExp");
  if (form.children.length >= MAX_FIELDS) {
    const addButton = document.querySelector(".more-experience-btn");
    addButton.disabled = true; // disable the "Add More" button
    return; // exit the function
  }
  const html = ` <div class="form-container">
 <div class="input-field">
   <span class="position-valid-icon">
     <img
       src="assets/images/icons/valid-icon.svg"
       alt="valid-icon"
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
       alt="valid-icon"
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
 </div>
 <div class="border-grey-line"></div>`;

  form.insertAdjacentHTML("beforeend", html);
  addMoreExpDisplay();
  descriptions = document.querySelectorAll(".description");
  descriptionLabels = document.querySelectorAll(".label-description");
  positionInput = document.querySelectorAll(".position-input");
  positionLabel = document.querySelectorAll(".label-position");
  positionValidIcon = document.querySelectorAll(".position-valid-icon");
  positionInvalidIcon = document.querySelectorAll(".position-invalid-icon");
  displayPosition = document.querySelectorAll(".position-display");
  employerInput = document.querySelectorAll(".employer-input");
  employerLabel = document.querySelectorAll(".label-employer");
  employerValidIcon = document.querySelectorAll(".employer-valid-icon");
  employerInvalidIcon = document.querySelectorAll(".employer-invalid-icon");
  displayLines = document.querySelectorAll(".grey-line");
  displayEmployer = document.querySelectorAll(".employer-display");
  descriptionDisplays = document.querySelectorAll(".description-display");
  startDateInputs = document.querySelectorAll(".start_date");
  endDateInputs = document.querySelectorAll(".end_date");
  startDateLabels = document.querySelectorAll(".label-start-date");
  endDateLabels = document.querySelector(".label-end-date");
  startDateDisplay = document.querySelectorAll(".date-start-display");
  endDateDisplay = document.querySelectorAll(".date-end-display");
  const addButton = document.querySelector(".more-experience-btn");
  addButton.disabled = form.children.length >= MAX_FIELDS;
  const lastIndex = descriptions.length - 1;
  const lastIndex_2 = positionInput.length - 1;
  const lastIndex_3 = employerInput.length - 1;
  // add event listeners to new elements
  descriptions[lastIndex].addEventListener("input", () => {
    descriptionValidation(descriptions[lastIndex], lastIndex, descriptions);
  });

  positionInput[lastIndex_2].addEventListener("input", () => {
    positionValidation(positionInput[lastIndex_2], lastIndex_2, positionInput);
  });

  employerInput[lastIndex_3].addEventListener("input", () => {
    employerValidation(employerInput[lastIndex_3], lastIndex_3, employerInput);
  });

  addEventListenersToDates(
    startDateInputs[startDateInputs.length - 1],
    endDateInputs[endDateInputs.length - 1],
    startDateLabels[startDateLabels.length - 1],
    endDateLabels[endDateLabels.length - 1]
  );
  // თანამდებობის
  const positionInputs = document.querySelectorAll(".position-input");
  positionInputs.forEach((position, index) => {
    position.addEventListener("input", () => {
      positionValidation(position, index);
    });
    position.addEventListener("keyup", () => {
      setPosition(index, positionInputs[index], displayLines[index]);
      checkAllEmpty();
    });
    positionValidation(position, index);
    setPosition(index, positionInputs[index], displayLines[index]);
    position.classList.remove("invalid");
    if (positionInvalidIcon.length > index && positionInvalidIcon[index]) {
      positionInvalidIcon[index].classList.remove("show");
      positionLabel[index].style.color = "#000000";
    }
  });
  //დამსაქმებლის
  employerInput[lastIndex_3].addEventListener("keyup", () => {
    setEmployer(
      lastIndex_3,
      employerInput[lastIndex_3],
      displayLines[lastIndex_3]
    );
    checkAllEmpty();
  });
  employerValidation(employerInput[lastIndex_3], lastIndex_3);
  setEmployer(
    lastIndex_3,
    employerInput[lastIndex_3],
    displayLines[lastIndex_3]
  );
  employerInput[lastIndex_3].classList.remove("invalid");
  if (
    employerInvalidIcon.length > lastIndex_3 &&
    employerInvalidIcon[lastIndex_3]
  ) {
    employerInvalidIcon[lastIndex_3].classList.remove("show");
    employerLabel[lastIndex_3].style.color = "#000000";
  }
  // აღწერის
  descriptions[lastIndex].addEventListener("keyup", () => {
    setDescription(lastIndex, descriptions[lastIndex], displayLines[lastIndex]);
    checkAllEmpty();
  });
  descriptionValidation(descriptions[lastIndex], lastIndex);
  descriptions[lastIndex].classList.remove("invalid");
  descriptionLabels[lastIndex_2].style.color = "#000000";
}
// function validateForm() {
//   let valid = true;
//   descriptions.forEach((description, index) => {
//     if (!descriptionValidation(description, index)) {
//       valid = false;
//     }
//   });
//   return valid;
// }
var wholeForm = document.querySelector("#form");
wholeForm.onsubmit = function (e) {
  e.preventDefault();
  if (validateForm()) {
    wholeForm.submit();
  }
};
function addMoreExpDisplay() {
  const html = `
  <div class="experience_display">
            <div class="grey-line"></div>
            <h4 class="experince-title">გამოცდილება</h4>
            <div class="experience-content">
              <p class="position-display"></p>
              <p class="employer-display"></p>
            </div>
            <div class="date-content">
              <span class="date-start-display"></span>
              <span class="date-end-display"></span>
            </div>
            <div class="description-content">
              <p class="description-display"></p>
            </div>
          </div>
`;
  const form = document.querySelector(".moreExp-display");
  form.insertAdjacentHTML("beforeend", html);
}
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
function setPosition(index, position) {
  if (positionValidation(position, index)) {
    displayPosition[index].classList.add("show");
    displayPosition[index].innerHTML = position.value + ",";
    if (displayLines.length > index && displayLines[index]) {
      displayLines[index].classList.add("show");
    }
    if (experinceTitles.length > index && experinceTitles[index]) {
      experinceTitles[index].classList.add("show");
    }
  } else {
    displayPosition[index].classList.remove("show");
    displayPosition[index].innerHTML = "";
  }
}
positionInput.forEach((position, index) => {
  position.addEventListener("keyup", () => {
    setPosition(index, position);
    checkAllEmpty();
  });
});
// positionInput.addEventListener("keyup", setPosition);
// დამსაქმებლის
function setEmployer(index, employer) {
  if (employerValidation(employer, index)) {
    displayEmployer[index].classList.add("show");
    displayEmployer[index].innerHTML = employer.value;
    if (displayLines.length > index && displayLines[index]) {
      displayLines[index].classList.add("show");
    }
    if (experinceTitles.length > index && experinceTitles[index]) {
      experinceTitles[index].classList.add("show");
    }
  } else {
    displayEmployer[index].classList.remove("show");
    displayEmployer[index].innerHTML = "";
  }
}
employerInput.forEach((employer, index) => {
  employer.addEventListener("keyup", () => {
    setEmployer(index, employer);
    checkAllEmpty();
  });
});
// დაწყების თარიღის
function setStartDate(e) {
  const index = Array.from(startDateInputs).indexOf(e.target);
  if (e.target.value.length > 1) {
    startDateLabels[index].classList.add("show");
    startDateDisplay[index].innerHTML = e.target.value;
    if (displayLines.length > index && displayLines[index]) {
      displayLines[index].classList.add("show");
    }
    if (experinceTitles.length > index && experinceTitles[index]) {
      experinceTitles[index].classList.add("show");
    }
  } else {
    startDateLabels[index].classList.remove("show");
    startDateDisplay[index].innerHTML = "";
  }
}
startDateInputs.forEach(function (startDateInput) {
  startDateInput.addEventListener("change", () => {
    checkAllEmpty();
  });
});
startDateInputs.forEach(function (startDateInput) {
  startDateInput.addEventListener("change", setStartDate);
});
// დასრულების თარიღი
function setEndDate(e) {
  const index = Array.from(endDateInputs).indexOf(e.target);
  if (e.target.value.length > 1) {
    endDateDisplay[index].innerHTML = "- " + " " + e.target.value;
  } else {
    endDateDisplay[index].innerHTML = "";
  }
}
endDateInputs.forEach(function (endDateInput) {
  endDateInput.addEventListener("change", () => {
    checkAllEmpty();
  });
});
endDateInputs.forEach(function (endDateInput) {
  endDateInput.addEventListener("change", setEndDate);
});
// endtDateInput.addEventListener("change", setEndDate);
// აღწერის
function setDescription(index, description) {
  if (descriptionValidation(description, 0)) {
    descriptionDisplays[index].classList.add("show");
    descriptionDisplays[index].innerHTML = description.value;
    if (displayLines.length > index && displayLines[index]) {
      displayLines[index].classList.add("show");
    }
    if (experinceTitles.length > index && experinceTitles[index]) {
      experinceTitles[index].classList.add("show");
    }
  } else {
    descriptionDisplays[index].classList.remove("show");
    descriptionDisplays[index].innerHTML = "";
  }
}
descriptions.forEach((description, index) => {
  description.addEventListener("keyup", () => {
    setDescription(index, description);
    checkAllEmpty();
  });
});
function checkAllEmpty() {
  const allInputs = [
    ...positionInput,
    ...employerInput,
    ...startDateInputs,
    ...endDateInputs,
    ...descriptions,
  ];

  const allEmpty = allInputs.every((input) => input.value.length < 2);

  if (allEmpty) {
    displayLines.forEach((line) => line.classList.remove("show"));
    experinceTitles.forEach((title) => title.classList.remove("show"));
  }
}
*/
