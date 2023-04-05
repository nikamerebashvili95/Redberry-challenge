let schoolLabel = document.querySelectorAll(".school-label");
let schoolInput = document.querySelectorAll(".school");
let schoolValidIcon = document.querySelectorAll(".school-valid-icon");
let schoolInvalidIcon = document.querySelectorAll(".school-invalid-icon");
let displaySchool = document.querySelectorAll(".school-display");
let displayGreyLine = document.querySelectorAll(".education-grey-line");
let educationTitle = document.querySelectorAll(".education-title");
let labelDate = document.querySelectorAll(".date-label");
let inputEndDate = document.querySelectorAll(".end--date");
let displayendDate = document.querySelectorAll(".date-display");
let educationLabel = document.querySelectorAll(".education-description-label");
let educationInput = document.querySelectorAll(".education-description");
let educationDisplay = document.querySelectorAll(
  ".education-description-display"
);
// სასწავლებლის ვალიდაცია
function schoolValidation(school, index) {
  if (school && school.value && school.value.length >= 2) {
    school.classList.add("valid");
    if (school.classList.contains("invalid")) {
      school.classList.remove("invalid");
    }
    if (schoolLabel.length > index && schoolLabel[index]) {
      schoolLabel[index].style.color = "#000000";
    }
    if (schoolValidIcon.length > index && schoolValidIcon[index]) {
      schoolValidIcon[index].classList.add("show");
    }
    if (schoolInvalidIcon.length > index && schoolInvalidIcon[index]) {
      schoolInvalidIcon[index].classList.remove("show");
    }
    school.style.outline = "none";
    return true;
  } else {
    if (school && school.classList.contains("valid")) {
      school.classList.remove("valid");
    }
    if (school) {
      school.classList.add("invalid");
    }
    if (schoolLabel.length > index && schoolLabel[index]) {
      schoolLabel[index].style.color = "#e52f2f";
    }
    if (schoolValidIcon.length > index && schoolValidIcon[index]) {
      schoolValidIcon[index].classList.remove("show");
    }
    if (schoolInvalidIcon.length > index && schoolInvalidIcon[index]) {
      schoolInvalidIcon[index].classList.add("show");
    }
    if (school) {
      school.style.outline = "none";
    }
    return false;
  }
}
schoolInput.forEach((school, index) => {
  if (school && school.value && school.value.length >= 2) {
    school.addEventListener("input", () => {
      schoolValidation(school, index);
    });
  }
});
schoolLabel[0].addEventListener("change", () => {
  schoolValidation(schoolInput[0], 0);
});

// დამთავრების თარიღის
function addEventListenersToEndDates(endDateInput, endDateLabel) {
  endDateInput.max = new Date().toISOString().split("T")[0];
  endDateInput.addEventListener("input", function (event) {
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
  });
  endDateInput.addEventListener("change", set_End_Date);
  // Return true if both inputs are valid, false otherwise
  return endDateInput.value !== "";
}
for (let i = 0; i < inputEndDate.length; i++) {
  addEventListenersToEndDates(inputEndDate[i], labelDate[i]);
}
addEventListenersToEndDates(
  inputEndDate[inputEndDate.length - 1],
  labelDate[labelDate.length - 1]
);
// განათლების აღწერის
function educationDescriptionValidation(description, index) {
  if (description && description.value && description.value !== "") {
    description.classList.add("valid");
    if (description.classList.contains("invalid")) {
      description.classList.remove("invalid");
    }
    description.classList.remove("invalid");
    educationLabel[index] && (educationLabel[index].style.color = "#000000");
    description.style.outline = "none";
    return true;
  } else {
    if (description && description.classList.contains("valid")) {
      description.classList.remove("valid");
    }
    if (description) {
      description.classList.add("invalid");
    }
    educationLabel[index] && (educationLabel[index].style.color = "#e52f2f");
    if (description) {
      description.style.outline = "none";
    }
    return false;
  }
}
educationInput.forEach((description, index) => {
  description.addEventListener("input", () => {
    educationDescriptionValidation(description, index);
  });
});
educationInput.forEach((description, index) => {
  if (description && description.value && description.value.length >= 2) {
    description.addEventListener("input", () => {
      educationDescriptionValidation(description, index);
    });
  }
});
descriptionLabels[0].addEventListener("change", () => {
  educationDescriptionValidation(educationInput[0], 0);
});
// მარჯვენა მხარეს წერისას პარალელურად გამოჩნდეს კონტენტი
// სასწავლებლს
function setSchool(index, school) {
  if (schoolValidation(school, index)) {
    displaySchool[index].classList.add("show");
    displaySchool[index].innerHTML = school.value + ",";
    if (displayGreyLine.length > index && displayGreyLine[index]) {
      displayGreyLine[index].classList.add("show");
    }
    if (educationTitle.length > index && educationTitle[index]) {
      educationTitle[index].classList.add("show");
    }
  } else {
    displaySchool[index].classList.remove("show");
    displaySchool[index].innerHTML = "";
  }
}
schoolInput.forEach((school, index) => {
  school.addEventListener("keyup", () => {
    setSchool(index, school);
    // checkAllEmpty();
  });
});
// დასრულების თარიღის
function set_End_Date(e) {
  const index = Array.from(inputEndDate).indexOf(e.target);
  if (e.target.value.length > 1) {
    // displayendDate[index].classList.add("show");
    displayendDate[index].innerHTML = e.target.value;
    if (displayGreyLine.length > index && displayGreyLine[index]) {
      displayGreyLine[index].classList.add("show");
    }
    if (educationTitle.length > index && educationTitle[index]) {
      educationTitle[index].classList.add("show");
    }
  } else {
    // displayendDate[index].classList.remove("show");
    displayendDate[index].innerHTML = "";
  }
}
inputEndDate.forEach(function (endDateInput) {
  endDateInput.addEventListener("change", () => {
    // checkAllEmpty();
  });
});
inputEndDate.forEach(function (endDateInput) {
  endDateInput.addEventListener("change", set_End_Date);
});
// აღწერის
function set_Education_Description(index, description) {
  if (educationDescriptionValidation(description, 0)) {
    educationDisplay[index].classList.add("show");
    educationDisplay[index].innerHTML = description.value;
    if (displayGreyLine.length > index && displayGreyLine[index]) {
      displayGreyLine[index].classList.add("show");
    }
    if (educationTitle.length > index && educationTitle[index]) {
      educationTitle[index].classList.add("show");
    }
  } else {
    educationDisplay[index].classList.remove("show");
    educationDisplay[index].innerHTML = "";
  }
}
educationInput.forEach((description, index) => {
  description.addEventListener("keyup", () => {
    set_Education_Description(index, description);
    // checkAllEmpty();
  });
});
