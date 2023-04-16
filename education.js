let schoolLabel = document.querySelectorAll(".school-label");
let schoolInput = document.querySelectorAll(".school");
let schoolValidIcon = document.querySelectorAll(".school-valid-icon");
let schoolInvalidIcon = document.querySelectorAll(".school-invalid-icon");
let displaySchool = document.querySelectorAll(".school-display");
let displayGreyLine = document.querySelectorAll(".education-grey-line");
let educationTitle = document.querySelectorAll(".education-title");
let labelDate = document.querySelectorAll(".date-label");
let inputEndDate = document.querySelectorAll(".end--date");
let qualityLabel = document.querySelectorAll(".quality-label");
let qualityInp = document.querySelectorAll(".select");
let displayendDate = document.querySelectorAll(".date-display");
let educationLabel = document.querySelectorAll(".education-description-label");
let educationInput = document.querySelectorAll(".education-description");
let educationDisplay = document.querySelectorAll(
  ".education-description-display"
);
let qualityDisplay = document.querySelectorAll(".quality-display");
const previousSecondBtn = document.querySelector(".back-second-btn");
const addBtn = document.querySelector(".another-school-btn");
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addMoreField();
});
//მესამე გვერდიდან მეორეზე დაბრუნება
function backSecondPage(e) {
  e.preventDefault();
  if (previousSecondBtn) {
    thirdPage.classList.remove("show");
    secondPage.classList.add("show");
  }
}
previousSecondBtn.addEventListener("click", backSecondPage);
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
// ხარისხის ვალიდაცია
function qualityValidation() {
  let valid = false;
  form.querySelectorAll(".select").forEach((quality, index) => {
    if (quality.value.length > 1) {
      quality.classList.add("valid");
      quality.classList.remove("invalid");
      quality
        .closest(".select-container")
        .querySelector(".quality-label").style.color = "#000000";
      quality.style.outline = "none";
      valid = true;
    } /*else {
      quality.classList.remove("valid");
      quality.classList.add("invalid");
      quality
        .closest(".select-container")
        .querySelector(".quality-label").style.color = "#e52f2f";
      quality.style.outline = "none";
      valid = false;
      
    }*/
  });
  return valid;
}

form.addEventListener("change", qualityValidation);
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
    checkEmpty();
  });
  endDateInput.addEventListener("change", set_End_Date);
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
  if (description && description.value && description.value.length >= 1) {
    description.addEventListener("input", () => {
      educationDescriptionValidation(description, index);
    });
  }
});
descriptionLabels[0].addEventListener("change", () => {
  educationDescriptionValidation(educationInput[0], 0);
});
const FIELDS_MAX = 5;
function addMoreField() {
  const form = document.querySelector(".more-exp");
  if (form.children.length >= FIELDS_MAX) {
    const addButton = document.querySelector(".another-school-btn");
    addButton.disabled = true; // disable the "Add More" button
    return; // exit the function
  }
  const html = `<div class="form-container">
  <div class="input-field school-field">
    <span class="school-valid-icon">
      <img
        src="assets/images/icons/valid-icon.svg"
        alt="valid icon"
      />
    </span>
    <span class="school-invalid-icon">
      <img
        src="assets/images/icons/invalid-icon.svg"
        alt="invalid icon"
      />
    </span>
    <label class="label-top school-label" for="education"
      >სასწავლებელი</label
    >
    <input
      class="input school"
      type="text"
      placeholder="სასწავლებელი"
    />
    <label class="label-bottom">მინიმუმ 2 სიმბოლო</label>
  </div>
  <div class="select-container">
    <div class="input-field">
      <label for="select" class="label-top quality-label"
        >ხარისხი</label
      >
      <select class="select" name="selected">
        <option value="" disabled selected>აირჩიე ხარისხი</option>
        <option value="სტუდენტი">სტუდენტი</option>
        <option value="ბაკალავრი">ბაკალავრი</option>
        <option value="მაგისტრი">მაგისტრი</option>
        <option value="დოქტორი">დოქტორი</option>
      </select>
    </div>
    <div class="input-field right-date">
      <label class="label-top date-label" for="date"
        >დამთავრების რიცხვი</label
      >
      <input type="date" class="date end--date" />
    </div>
  </div>
  <div class="input-field about-field">
    <label
      class="label-top education-description-label"
      for="description"
      >აღწერა</label
    >
    <textarea
      class="input education-description"
      name="about"
      placeholder="განათლების აღწერა"
    ></textarea>
  </div>
  <div class="border-grey-line"></div>
</div>`;
  form.insertAdjacentHTML("beforeend", html);
  addMoreDisplay();
  displayGreyLine = document.querySelectorAll(".education-grey-line");
  schoolLabel = document.querySelectorAll(".school-label");
  schoolInput = document.querySelectorAll(".school");
  schoolValidIcon = document.querySelectorAll(".school-valid-icon");
  schoolInvalidIcon = document.querySelectorAll(".school-invalid-icon");
  displaySchool = document.querySelectorAll(".school-display");
  labelDate = document.querySelectorAll(".date-label");
  inputEndDate = document.querySelectorAll(".end--date");
  qualityLabel = document.querySelectorAll(".quality-label");
  qualityInp = document.querySelectorAll(".select");
  displayendDate = document.querySelectorAll(".date-display");
  educationLabel = document.querySelectorAll(".education-description-label");
  educationInput = document.querySelectorAll(".education-description");
  educationDisplay = document.querySelectorAll(
    ".education-description-display"
  );
  // educationTitle = document.querySelectorAll(".education-title");
  qualityDisplay = document.querySelectorAll(".quality-display");
  qualityInp.forEach((inp) => {
    inp.addEventListener("change", setQuality);
  });
  const addButton = document.querySelector(".another-school-btn");
  addButton.disabled = form.children.length >= FIELDS_MAX;
  const lastIndex = educationInput.length - 1;
  const lastIndex_2 = schoolInput.length - 1;

  educationInput[lastIndex].addEventListener("input", () => {
    educationDescriptionValidation(
      educationInput[lastIndex],
      lastIndex,
      educationInput
    );
  });

  schoolInput[lastIndex_2].addEventListener("input", () => {
    schoolValidation(schoolInput[lastIndex_2], lastIndex_2, schoolInput);
  });

  addEventListenersToEndDates(
    inputEndDate[inputEndDate.length - 1],
    labelDate[labelDate.length - 1]
  );

  // სასწავლებლის
  const schoolInputs = document.querySelectorAll(".school");
  schoolInputs.forEach((school, index) => {
    school.addEventListener("input", () => {
      schoolValidation(school, index);
    });
    school.addEventListener("keyup", () => {
      setSchool(index, schoolInputs[index], displayGreyLine[index]);
      checkEmpty();
    });
    school.addEventListener("blur", () => {
      school.classList.add("blur");
      setSchool(index, school);
    });
    schoolValidation(school, index);
    setSchool(index, schoolInputs[index], displayGreyLine[index]);
    school.classList.remove("invalid");
    if (schoolInvalidIcon.length > index && schoolInvalidIcon[index]) {
      schoolInvalidIcon[index].classList.remove("show");
      schoolLabel[index].style.color = "#000000";
    }
  });

  // აღწერის
  educationInput[lastIndex].addEventListener("keyup", () => {
    set_Education_Description(
      lastIndex,
      educationInput[lastIndex],
      displayGreyLine[lastIndex]
    );
    checkEmpty();
  });
  educationDescriptionValidation(educationInput[lastIndex], lastIndex);
  educationInput[lastIndex].classList.remove("invalid");
  educationLabel[lastIndex].style.color = "#000000";
}
/*
function formValidate() {
  let valid = true;
  educationInput.forEach((description, index) => {
    if (!educationDescriptionValidation(description, index)) {
      valid = false;
    }
  });
  return valid;
}
var formwhole = document.querySelector("#form");
formwhole.onsubmit = function (e) {
  e.preventDefault();
  if (formValidate()) {
    formwhole.submit();
  }
};
*/
function addMoreDisplay() {
  const html = `
  <div class="education">
          <div class="education-grey-line"></div>
          <h4 class="education-title">განათლება</h4>
          <div class="education-content">
            <p class="school-display"></p>
            <p class="quality-display"></p>
          </div>
          <div class="date-display-container">
            <p class="date-display"></p>
          </div>
          <div class="education-description-content">
            <p class="education-description-display"></p>
          </div>
        </div>
`;
  const form = document.querySelector(".moreExpDisplay");
  form.insertAdjacentHTML("beforeend", html);
}
// მარჯვენა მხარეს წერისას პარალელურად გამოჩნდეს კონტენტი
// სასწავლებლს
function setSchool(index, school) {
  if (schoolValidation(school, index)) {
    displaySchool[index].classList.add("show");
    displaySchool[index].innerHTML =
      school.value + (school.classList.contains("blur") ? "," : "");
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
    checkEmpty();
  });

  school.addEventListener("blur", () => {
    school.classList.add("blur");
    setSchool(index, school);
  });
});
// ხარისხის
function setQuality() {
  const currentQualityInp = this;
  const index = Array.from(qualityInp).indexOf(currentQualityInp);
  const displayValue =
    currentQualityInp.options[currentQualityInp.selectedIndex].value;
  if (qualityValidation()) {
    qualityDisplay[index].classList.add("show");
    if (educationTitle[index]) {
      educationTitle[index].classList.add("show");
    }
    displayGreyLine[index].classList.add("show");
    qualityDisplay[index].innerHTML = displayValue;
    // displaySchool[index].innerHTML += ",";
  } else {
    qualityDisplay[index].classList.remove("show");
    qualityDisplay[index].innerHTML = "";
  }
}
qualityInp.forEach((qualityInp) => {
  qualityInp.addEventListener("change", setQuality);
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
    checkEmpty();
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
    checkEmpty();
  });
});
function checkEmpty() {
  const allInputs = [
    ...schoolInput,
    ...inputEndDate,
    ...educationInput,
    ...qualityInp,
  ];
  const allEmpty = allInputs.every((input) => input.value.length < 2);
  if (allEmpty) {
    displayGreyLine.forEach((line) => line.classList.remove("show"));
    educationTitle.forEach((title) => title.classList.remove("show"));
  }
}
