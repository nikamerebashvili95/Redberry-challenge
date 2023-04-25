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
    localStorage.setItem("school" + index, school.value);
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
for (let i = 0; i < schoolInput.length; i++) {
  const schoolValue = localStorage.getItem("school" + i);
  if (schoolValue) {
    schoolInput[i].value = schoolValue;
    schoolValidation(schoolInput[i], i);
  }
}
schoolInput.forEach((school, index) => {
  const schoolValue = localStorage.getItem("school" + index);
  if (schoolValue) {
    schoolInput[index].value = schoolValue;
    schoolValidation(schoolInput[index], index);
  }

  school.addEventListener("input", () => {
    schoolValidation(school, index);
    localStorage.setItem("school" + index, school.value);
  });

  school.addEventListener("change", () => {
    if (school.value === "") {
      localStorage.removeItem("school" + index);
    }
  });
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
      localStorage.setItem("select" + index, quality.value);
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
for (let i = 0; i < qualityInp.length; i++) {
  const qualityValue = localStorage.getItem("select" + i);
  if (qualityValue) {
    qualityInp[i].value = qualityValue;
    qualityValidation(qualityInp[i], i);
    setQuality.call(qualityInp[i], qualityValue);
  }
}
qualityInp.forEach((quality, index) => {
  const qualityValue = localStorage.getItem("select" + index);
  if (qualityValue) {
    qualityInp[index].value = qualityValue;
    qualityValidation(qualityInp[index], index);
  }

  quality.addEventListener("input", () => {
    qualityValidation(quality, index);
    localStorage.setItem("select" + index, quality.value);
  });
});
// form.addEventListener("change", qualityValidation);
// დამთავრების თარიღის
function addEventListenersToEndDates(endDateInput, endDateLabel, index) {
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
    localStorage.setItem("endDateInput-" + index, endDateInput.value);
  });
  endDateInput.addEventListener("change", set_End_Date);
  const stored_EndDate = localStorage.getItem("endDateInput-" + index);
  if (stored_EndDate) {
    endDateInput.value = stored_EndDate;
  }
  window.addEventListener("load", function () {
    if (endDateInput.value !== "") {
      endDateInput.classList.add("valid");
      endDateLabel.style.color = "#000000";
    }
  });
  return endDateInput.value !== "";
}
for (let i = 0; i < inputEndDate.length; i++) {
  addEventListenersToEndDates(inputEndDate[i], labelDate[i], i);
}
addEventListenersToEndDates(
  inputEndDate[inputEndDate.length - 1],
  labelDate[labelDate.length - 1],
  inputEndDate.length - 1
);
// განათლების აღწერის
function educationDescriptionValidation(education, index) {
  if (education && education.value && education.value !== "") {
    education.classList.add("valid");
    if (education.classList.contains("invalid")) {
      education.classList.remove("invalid");
    }
    education.classList.remove("invalid");
    educationLabel[index] && (educationLabel[index].style.color = "#000000");
    education.style.outline = "none";
    localStorage.setItem("education" + index, education.value);
    return true;
  } else {
    if (education && education.classList.contains("valid")) {
      education.classList.remove("valid");
    }
    if (education) {
      education.classList.add("invalid");
    }
    educationLabel[index] && (educationLabel[index].style.color = "#e52f2f");
    if (education) {
      education.style.outline = "none";
    }
    return false;
  }
}
for (let i = 0; i < educationInput.length; i++) {
  const educationValue = localStorage.getItem("education" + i);
  if (educationValue) {
    educationInput[i].value = educationValue;
    educationDescriptionValidation(educationInput[i], i);
  }
}
educationInput.forEach((description, index) => {
  const educationValue = localStorage.getItem("education" + index);
  if (educationValue) {
    educationInput[index].value = educationValue;
    educationDescriptionValidation(educationInput[index], index);
  }

  description.addEventListener("input", () => {
    educationDescriptionValidation(description, index);
    localStorage.setItem("education" + index, description.value);
  });

  description.addEventListener("change", () => {
    if (description.value === "") {
      localStorage.removeItem("education" + index);
    }
  });
});
descriptionLabels[0].addEventListener("change", () => {
  educationDescriptionValidation(educationInput[0], 0);
});
let clickedButton = false;
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
    labelDate[labelDate.length - 1],
    inputEndDate.length - 1
  );

  // სასწავლებლის
  schoolInput.forEach((school, index) => {
    const schoolValue = localStorage.getItem("school" + index);
    if (schoolValue) {
      schoolInput[index].value = schoolValue;
      schoolValidation(schoolInput[index], index);
    }

    school.addEventListener("input", () => {
      schoolValidation(school, index);
      localStorage.setItem("school" + index, school.value);
    });

    school.addEventListener("change", () => {
      if (school.value === "") {
        localStorage.removeItem("school" + index);
      }
    });
    school.addEventListener("keyup", () => {
      setSchool(index, schoolInput[index], displayGreyLine[index]);
      checkEmpty();
      school.addEventListener("blur", () => {
        school.classList.add("blur");
        setSchool(index, school);
      });
    });
    schoolValidation(school, index);
    setSchool(index, schoolInput[index], displayGreyLine[index]);
    school.classList.remove("invalid");
    if (schoolInvalidIcon.length > index && schoolInvalidIcon[index]) {
      schoolInvalidIcon[index].classList.remove("show");
      schoolLabel[index].style.color = "#000000";
    }
  });
  for (let i = 0; i < schoolInput.length; i++) {
    const schoolValue = localStorage.getItem("school" + i);
    if (schoolValue) {
      schoolInput[i].value = schoolValue;
      if (schoolInput[i].value) {
        schoolInput[i].classList.add("blur");
      }
      setSchool(i, schoolInput[i]);
    }
  }
  // აღწერის
  educationInput.forEach((education, index) => {
    const educationValue = localStorage.getItem("education" + index);
    if (educationValue) {
      educationInput[index].value = educationValue;
      educationDescriptionValidation(educationInput[index], index);
    }

    education.addEventListener("input", () => {
      educationDescriptionValidation(education, index);
      localStorage.setItem("education" + index, education.value);
    });

    education.addEventListener("change", () => {
      if (education.value === "") {
        localStorage.removeItem("education" + index);
      }
    });
    education.addEventListener("keyup", () => {
      set_Education_Description(
        index,
        educationInput[index],
        displayGreyLine[index]
      );
      checkEmpty();
    });
    educationDescriptionValidation(education, index);
    set_Education_Description(
      index,
      educationInput[index],
      displayGreyLine[index]
    );
    education.classList.remove("invalid");
    if (educationLabel.length > index && educationLabel[index]) {
      educationLabel[index].style.color = "#000000";
    }
  });
  // ხარისხის
  for (let i = 0; i < qualityInp.length; i++) {
    const qualityValue = localStorage.getItem("select" + i);
    if (qualityValue) {
      qualityInp[i].value = qualityValue;
      qualityValidation(qualityInp[i], i);
      setQuality.call(qualityInp[i], qualityValue);
    }
  }
  //////////////////////////////////////////////////////////
  const callFunction = "addMoreField()";
  const callsPrevious = JSON.parse(localStorage.getItem("callFunction")) || [];
  if (clickedButton) {
    callsPrevious.push(callFunction);
    localStorage.setItem("callFunction", JSON.stringify(callsPrevious));
  }
}
addBtn.addEventListener("click", () => {
  clickedButton = true;
  addMoreField();
});
document.addEventListener("DOMContentLoaded", function (event) {
  const callsPrevious = JSON.parse(localStorage.getItem("callFunction"));
  if (callsPrevious) {
    for (const call of callsPrevious) {
      eval(call);
    }
  }
});
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
  const schoolValue = school.value;
  if (schoolValidation(school, index)) {
    displaySchool[index].classList.add("show");
    displaySchool[index].innerHTML =
      schoolValue + (school.classList.contains("blur") ? "," : "");
    if (displayGreyLine.length > index && displayGreyLine[index]) {
      displayGreyLine[index].classList.add("show");
    }
    if (educationTitle.length > index && educationTitle[index]) {
      educationTitle[index].classList.add("show");
    }
    localStorage.setItem("school" + index, schoolValue);
  } else {
    displaySchool[index].classList.remove("show");
    displaySchool[index].innerHTML = "";
    localStorage.removeItem("school" + index);
  }
}
for (let i = 0; i < schoolInput.length; i++) {
  const schoolValue = localStorage.getItem("school" + i);
  if (schoolValue) {
    schoolInput[i].value = schoolValue;
    if (schoolInput[i].value) {
      schoolInput[i].classList.add("blur");
    }
    setSchool(i, schoolInput[i]);
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
function setQuality(quality) {
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
    localStorage.setItem("select" + index, displayValue);
  } else {
    qualityDisplay[index].classList.remove("show");
    qualityDisplay[index].innerHTML = "";
    localStorage.removeItem("select" + index);
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
    labelDate[index].classList.add("show");
    displayendDate[index].innerHTML = e.target.value;
    if (displayGreyLine.length > index && displayGreyLine[index]) {
      displayGreyLine[index].classList.add("show");
    }
    if (educationTitle.length > index && educationTitle[index]) {
      educationTitle[index].classList.add("show");
    }
    localStorage.setItem("endDateInput-" + index, e.target.value);
  } else {
    // displayendDate[index].classList.remove("show");
    displayendDate[index].innerHTML = "";
    localStorage.removeItem("endDateInput-" + index);
    labelDate[index].classList.remove("show");
  }
}
window.addEventListener("load", function () {
  for (let i = 0; i < inputEndDate.length; i++) {
    const stored_Value = localStorage.getItem("endDateInput-" + i);
    if (stored_Value) {
      inputEndDate[i].value = stored_Value;
      labelDate[i].classList.add("show");
      displayendDate[i].innerHTML = stored_Value;
    }
  }
});
inputEndDate.forEach(function (endDateInput) {
  endDateInput.addEventListener("change", () => {
    checkEmpty();
  });
});
inputEndDate.forEach(function (endDateInput) {
  endDateInput.addEventListener("change", set_End_Date);
});
// აღწერის
function set_Education_Description(index, education) {
  const educationValue = education.value;
  if (educationDescriptionValidation(education, index)) {
    educationDisplay[index].classList.add("show");
    educationDisplay[index].innerHTML = educationValue;
    if (displayGreyLine.length > index && displayGreyLine[index]) {
      displayGreyLine[index].classList.add("show");
    }
    if (educationTitle.length > index && educationTitle[index]) {
      educationTitle[index].classList.add("show");
    }
    localStorage.setItem("education" + index, educationValue);
  } else {
    educationDisplay[index].classList.remove("show");
    educationDisplay[index].innerHTML = "";
    localStorage.removeItem("education" + index);
  }
}
for (let i = 0; i < educationInput.length; i++) {
  const educationValue = localStorage.getItem("education" + i);
  if (educationValue) {
    educationInput[i].value = educationValue;
    set_Education_Description(i, educationInput[i]);
  }
}
educationInput.forEach((education, index) => {
  education.addEventListener("keyup", () => {
    set_Education_Description(index, education);
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
