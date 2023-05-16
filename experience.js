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
const addButton = document.querySelector(".more-experience-btn");
let descriptions = document.querySelectorAll(".description");
let descriptionLabels = document.querySelectorAll(".label-description");
let experinceTitles = document.querySelectorAll(".experince-title");
let displayLines = document.querySelectorAll(".grey-line");
let descriptionDisplays = document.querySelectorAll(".description-display");
let experienceContainer = document.querySelector(".experience_display");
const nextSecondBtn = document.querySelector(".next-second-btn");
const thirdPage = document.querySelector(".third-page");
let experienceData =
  (localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).experiences) ||
  {};
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
// თანამდებობის ვალიდაცია
function positionValidation(position, index) {
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.experiences = data.experiences || [];
    data.experiences[index] = data.experiences[index] || {};
    data.experiences[index].position = position.value;
    localStorage.setItem("data", JSON.stringify(data));
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.experiences = data.experiences || [];
    data.experiences[index] = data.experiences[index] || {};
    delete data.experiences[index].position;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
for (let i = 0; i < positionInput.length; i++) {
  let positionValues = Object.values(experienceData).map(
    (item) => item.position
  );
  if (positionValues[i]) {
    positionInput[i].value = positionValues[i];
    positionValidation(positionInput[i], i);
  }
}
positionInput.forEach((position, index) => {
  position.addEventListener("input", () => {
    positionValidation(position, index);
  });
  position.addEventListener("change", () => {
    if (position.value === "") {
      const data = JSON.parse(localStorage.getItem("data"));
      delete data.experiences[index].position;
      localStorage.setItem("data", JSON.stringify(data));
    }
  });
});
positionLabel[0].addEventListener("change", () => {
  positionValidation(positionInput[0], 0);
});

//დამსაქმებლის ვალიდაცია
function employerValidation(employer, index) {
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.experiences = data.experiences || [];
    data.experiences[index] = data.experiences[index] || {};
    data.experiences[index].employer = employer.value;
    localStorage.setItem("data", JSON.stringify(data));
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.experiences = data.experiences || [];
    data.experiences[index] = data.experiences[index] || {};
    delete data.experiences[index].employer;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
for (let i = 0; i < employerInput.length; i++) {
  let employerValues = Object.values(experienceData).map(
    (item) => item.employer
  );
  if (employerValues[i]) {
    employerInput[i].value = employerValues[i];
    employerValidation(employerInput[i], i);
  }
}
employerInput.forEach((employer, index) => {
  if (employer && employer.value && employer.value.length >= 2) {
    employer.addEventListener("input", () => {
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
  endDateLabel,
  index
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.experiences = data.experiences || [];
    data.experiences[index] = data.experiences[index] || {};
    data.experiences[index].start_date = startDateInput.value;
    localStorage.setItem("data", JSON.stringify(data));
  });
  startDateInput.addEventListener("change", setStartDate);
  endDateInput.max = new Date().toISOString().split("T")[0];
  endDateInput.addEventListener("input", function endDateValidation(event) {
    const startDateValue = new Date(startDateInput.value);
    const endDateValue = new Date(event.target.value);
    if (endDateValue < startDateValue) {
      event.target.value = startDateInput.value;
    }
    if (endDateInput.value.length != "") {
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.experiences = data.experiences || [];
    data.experiences[index] = data.experiences[index] || {};
    data.experiences[index].due_date = endDateInput.value;
    localStorage.setItem("data", JSON.stringify(data));
  });
  endDateInput.addEventListener("change", setEndDate);
  // Retrieve stored values
  const storedData = JSON.parse(localStorage.getItem("data")) || {};
  const storedExperiences = storedData.experiences || [];
  const storedExperience = storedExperiences[index] || {};
  const storedStartDate = storedExperience.start_date || "";
  const storedEndDate = storedExperience.due_date || "";

  if (storedStartDate) {
    startDateInput.value = storedStartDate;
  }
  if (storedEndDate) {
    endDateInput.value = storedEndDate;
  }
  window.addEventListener("load", function () {
    if (startDateInput.value !== "") {
      startDateInput.classList.add("valid");
      startDateLabel.style.color = "#000000";
    }
    if (endDateInput.value !== "") {
      endDateInput.classList.add("valid");
      endDateLabel.style.color = "#000000";
    }
  });
  // Return true if both inputs are valid, false otherwise
  return startDateInput.value !== "" && endDateInput.value !== "";
}

for (let i = 0; i < startDateInputs.length; i++) {
  addEventListenersToDates(
    startDateInputs[i],
    endDateInputs[i],
    startDateLabels[i],
    endDateLabels[i],
    i
  );
}
addEventListenersToDates(
  startDateInputs[startDateInputs.length - 1],
  endDateInputs[endDateInputs.length - 1],
  startDateLabels[startDateLabels.length - 1],
  endDateLabels[endDateLabels.length - 1],
  startDateInputs.length - 1
);
// აღწერის TextArea-ს ვალიდაცია
function descriptionValidation(description, index) {
  if (description && description.value && description.value.length > 0) {
    description.classList.add("valid");
    if (description.classList.contains("invalid")) {
      description.classList.remove("invalid");
    }
    description.classList.remove("invalid");
    if (descriptionLabels.length > index && descriptionLabels[index]) {
      descriptionLabels[index].style.color = "#000000";
    }
    description.style.outline = "none";
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.experiences = data.experiences || [];
    data.experiences[index] = data.experiences[index] || {};
    data.experiences[index].description = description.value;
    localStorage.setItem("data", JSON.stringify(data));
    return true;
  } else {
    if (description && description.classList.contains("valid")) {
      description.classList.remove("valid");
    }
    if (description) {
      description.classList.add("invalid");
    }
    if (descriptionLabels.length > index && descriptionLabels[index]) {
      descriptionLabels[index].style.color = "#e52f2f";
    }
    if (description) {
      description.style.outline = "none";
    }
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.experiences = data.experiences || [];
    data.experiences[index] = data.experiences[index] || {};
    delete data.experiences[index].description;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
for (let i = 0; i < descriptions.length; i++) {
  let descriptionValues = Object.values(experienceData).map(
    (item) => item.description
  );
  if (descriptionValues[i]) {
    descriptions[i].value = descriptionValues[i];
    descriptionValidation(descriptions[i], i);
  }
}
descriptions.forEach((description, index) => {
  let descriptionValues = Object.values(experienceData).map(
    (item) => item.description
  );
  if (descriptionValues[index]) {
    descriptions[index].value = descriptionValues[index];
    descriptionValidation(descriptions[index], index);
  }
  description.addEventListener("input", () => {
    descriptionValidation(description, index);
  });
});
descriptionLabels[0].addEventListener("change", () => {
  descriptionValidation(descriptions[0], 0);
});
// მეტი გამოცდილების დამატება
const MAX_FIELDS = 5;
let buttonClicked = false;
function add_more_field() {
  const form = document.querySelector(".moreExp");
  if (form.children.length >= MAX_FIELDS) {
    const addButton = document.querySelector(".more-experience-btn");
    addButton.disabled = true;
    return;
  }
  const html = `<div class="form-container">
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
   <label class="label-top label-position"
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
   <label class="label-top label-employer" 
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
     <label class="label-top label-start-date" 
       >დაწყების რიცხვი</label
     >
     <input
       type="date"      
       class="date start_date"
     />
   </div>
   <div class="input-field right-date">
     <label class="label-top label-end-date" 
       >დამთავრების რიცხვი</label
     >
     <input
       type="date"
       class="date end_date"
     />
   </div>
 </div>
 <div class="input-field about-field">
   <label class="label-top label-description" 
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
  endDateLabels = document.querySelectorAll(".label-end-date");
  startDateDisplay = document.querySelectorAll(".date-start-display");
  endDateDisplay = document.querySelectorAll(".date-end-display");
  experienceData =
    (localStorage.getItem("data") &&
      JSON.parse(localStorage.getItem("data")).experiences) ||
    {};
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
  //თარიღის
  addEventListenersToDates(
    startDateInputs[startDateInputs.length - 1],
    endDateInputs[endDateInputs.length - 1],
    startDateLabels[startDateLabels.length - 1],
    endDateLabels[endDateLabels.length - 1],
    startDateInputs.length - 1 // pass the current index
  );
  for (let i = 0; i < startDateInputs.length; i++) {
    let startDateValues = Object.values(experienceData).map(
      (item) => item.start_date
    );
    if (startDateValues[i]) {
      startDateDisplay[i].innerHTML = startDateValues[i];
      startDateLabels[i].classList.add("show");
      startDateInputs[i].value = startDateValues[i];
      displayLines[i].classList.add("show");
    }
    setStartDate({ target: startDateInputs[i] });
  }
  for (let i = 0; i < endDateInputs.length; i++) {
    let endDateValues = Object.values(experienceData).map(
      (item) => item.due_date
    );
    if (endDateValues[i]) {
      endDateDisplay[i].innerHTML = "- " + " " + endDateValues[i];
      endDateLabels[i].classList.add("show");
      endDateInputs[i].value = endDateValues[i];
    }
    setEndDate({ target: endDateInputs[i] });
  }
  // თანამდებობის
  positionInput.forEach((position, index) => {
    let positionValues = Object.values(experienceData).map(
      (item) => item.position
    );
    if (positionValues[index]) {
      positionInput[index].value = positionValues[index];
      positionValidation(positionInput[index], index);
    }
    position.addEventListener("input", () => {
      positionValidation(position, index);
    });
    position.addEventListener("keyup", () => {
      setPosition(index, positionInput[index], displayLines[index]);
      checkAllEmpty();
      position.addEventListener("blur", () => {
        position.classList.add("blur");
        setPosition(index, position);
      });
    });
    positionValidation(position, index);
    setPosition(index, positionInput[index], displayLines[index]);
    position.classList.remove("invalid");
    if (positionInvalidIcon.length > index && positionInvalidIcon[index]) {
      positionInvalidIcon[index].classList.remove("show");
      positionLabel[index].style.color = "#000000";
    }
  });
  for (let i = 0; i < positionInput.length; i++) {
    positionValues = Object.values(experienceData).map((item) => item.position);
    if (positionValues[i]) {
      positionInput[i].value = positionValues[i];
      if (positionInput[i].value) {
        positionInput[i].classList.add("blur");
      }
      setPosition(i, positionInput[i]);
    }
  }
  //დამსაქმებლის
  employerInput.forEach((employer, index) => {
    let employerValues = Object.values(experienceData).map(
      (item) => item.employer
    );
    if (employerValues[index]) {
      employerInput[index].value = employerValues[index];
      employerValidation(employerInput[index], index);
    }
    employer.addEventListener("input", () => {
      employerValidation(employer, index);
    });
    employer.addEventListener("keyup", () => {
      setEmployer(index, employerInput[index], displayLines[index]);
      checkAllEmpty();
    });
    employerValidation(employer, index);
    setEmployer(index, employerInput[index], displayLines[index]);
    employer.classList.remove("invalid");
    if (employerInvalidIcon.length > index && employerInvalidIcon[index]) {
      employerInvalidIcon[index].classList.remove("show");
      employerLabel[index].style.color = "#000000";
    }
  });
  // აღწერის
  descriptions.forEach((description, index) => {
    let descriptionValues = Object.values(experienceData).map(
      (item) => item.description
    );
    if (descriptionValues[index]) {
      descriptions[index].value = descriptionValues[index];
      descriptionValidation(descriptions[index], index);
    }
    description.addEventListener("input", () => {
      descriptionValidation(description, index);
    });
    description.addEventListener("keyup", () => {
      setDescription(index, descriptions[index], displayLines[index]);
      checkAllEmpty();
    });
    descriptionValidation(description, index);
    setDescription(index, descriptions[index], displayLines[index]);
    description.classList.remove("invalid");
    if (descriptionLabels.length > index && descriptionLabels[index]) {
      descriptionLabels[index].style.color = "#000000";
    }
  });
  const functionCall = "add_more_field()";
  const previousCalls = JSON.parse(localStorage.getItem("functionCalls")) || [];
  if (buttonClicked) {
    previousCalls.push(functionCall);
    localStorage.setItem("functionCalls", JSON.stringify(previousCalls));
  }
}
addButton.addEventListener("click", () => {
  buttonClicked = true;
  add_more_field();
});
// Retrieve the stored function calls on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function (event) {
  const previousCalls = JSON.parse(localStorage.getItem("functionCalls"));
  if (previousCalls) {
    for (const call of previousCalls) {
      eval(call);
    }
  }
});
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
// თანამდებობის
function setPosition(index, position) {
  const positionValue = position.value;
  if (positionValidation(position, index)) {
    displayPosition[index].classList.add("show");
    displayPosition[index].innerHTML =
      positionValue + (position.classList.contains("blur") ? "," : "");
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
for (let i = 0; i < positionInput.length; i++) {
  let positionValues = Object.values(experienceData).map(
    (item) => item.position
  );
  if (positionValues[i]) {
    positionInput[i].value = positionValues[i];
    if (positionInput[i].value) {
      positionInput[i].classList.add("blur");
    }
    setPosition(i, positionInput[i]);
  }
}
positionInput.forEach((position, index) => {
  position.addEventListener("input", () => {
    setPosition(index, position);
    checkAllEmpty();
  });
  position.addEventListener("blur", () => {
    position.classList.add("blur");
    setPosition(index, position);
  });
});
// დამსაქმებლის
function setEmployer(index, employer) {
  const employerValue = employer.value;
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
for (let i = 0; i < employerInput.length; i++) {
  let employerValues = Object.values(experienceData).map(
    (item) => item.employer
  );
  if (employerValues[i]) {
    employerInput[i].value = employerValues[i];
    setEmployer(i, employerInput[i]);
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
for (let i = 0; i < startDateInputs.length; i++) {
  let startDateValues = Object.values(experienceData).map(
    (item) => item.start_date
  );
  if (startDateValues[i]) {
    startDateDisplay[i].innerHTML = startDateValues[i];
    startDateLabels[i].classList.add("show");
    startDateInputs[i].value = startDateValues[i];
    displayLines[i].classList.add("show");
  }
  setStartDate({ target: startDateInputs[i] });
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
    endDateLabels[index].classList.add("show");
    if (displayLines.length > index && displayLines[index]) {
      displayLines[index].classList.add("show");
    }
    if (experinceTitles.length > index && experinceTitles[index]) {
      experinceTitles[index].classList.add("show");
    }
  } else {
    endDateDisplay[index].innerHTML = "";
    endDateLabels[index].classList.remove("show");
  }
}
for (let i = 0; i < endDateInputs.length; i++) {
  let endDateValues = Object.values(experienceData).map(
    (item) => item.due_date
  );
  if (endDateValues[i]) {
    endDateDisplay[i].innerHTML = "- " + " " + endDateValues[i];
    endDateLabels[i].classList.add("show");
    endDateInputs[i].value = endDateValues[i];
  }
  setEndDate({ target: endDateInputs[i] });
}
endDateInputs.forEach(function (endDateInput) {
  endDateInput.addEventListener("change", () => {
    checkAllEmpty();
  });
});
endDateInputs.forEach(function (endDateInput) {
  endDateInput.addEventListener("change", setEndDate);
});
// აღწერის
function setDescription(index, description) {
  const descriptionValue = description.value;
  if (descriptionValidation(description, index)) {
    descriptionDisplays[index].classList.add("show");
    descriptionDisplays[index].innerHTML = descriptionValue;
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
for (let i = 0; i < descriptions.length; i++) {
  let descriptionValues = Object.values(experienceData).map(
    (item) => item.description
  );
  if (descriptionValues[i]) {
    descriptions[i].value = descriptionValues[i];
    setDescription(i, descriptions[i]);
  }
}
descriptions.forEach((description, index) => {
  description.addEventListener("input", () => {
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
