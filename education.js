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
let educationsData =
  (localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).educations) ||
  {};
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.educations = data.educations || [];
    data.educations[index] = data.educations[index] || {};
    data.educations[index].institute = school.value;
    localStorage.setItem("data", JSON.stringify(data));
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.educations = data.educations || [];
    data.educations[index] = data.educations[index] || {};
    delete data.educations[index].institute;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
for (let i = 0; i < schoolInput.length; i++) {
  let schoolValues = Object.values(educationsData).map(
    (item) => item.institute
  );
  if (schoolValues[i]) {
    schoolInput[i].value = schoolValues[i];
    schoolValidation(schoolInput[i], i);
  }
}
schoolInput.forEach((school, index) => {
  school.addEventListener("input", () => {
    schoolValidation(school, index);
  });
  school.addEventListener("change", () => {
    if (school.value === "") {
      const data = JSON.parse(localStorage.getItem("data"));
      delete data.educations[index].institute;
      localStorage.setItem("data", JSON.stringify(data));
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
      const data = JSON.parse(localStorage.getItem("data")) || {};
      data.educations = data.educations || [];
      data.educations[index] = data.educations[index] || {};
      data.educations[index].degree_order = quality.value;
      data.educations[index].degree_id = quality.selectedIndex;
      localStorage.setItem("data", JSON.stringify(data));
      valid = true;
    }
  });
  return valid;
}
qualityInp.forEach((quality, index) => {
  quality.addEventListener("input", () => {
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.educations = data.educations || [];
    data.educations[index] = data.educations[index] || {};
    data.educations[index].degree_order = quality.value;
    data.educations[index].degree_id = quality.selectedIndex;
    localStorage.setItem("data", JSON.stringify(data));

    qualityValidation(quality, index);
  });
});
// Update the values when populating the form
for (let i = 0; i < qualityInp.length; i++) {
  const educationData = educationsData[i];
  if (educationData) {
    qualityInp[i].value = educationData.degree_order;
    qualityInp[i].selectedIndex = educationData.degree_id;
    qualityValidation(qualityInp[i], i);
    setQuality.call(qualityInp[i], educationData.degree_order);
  }
}
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.educations = data.educations || [];
    data.educations[index] = data.educations[index] || {};
    data.educations[index].due_date = endDateInput.value;
    localStorage.setItem("data", JSON.stringify(data));
  });
  endDateInput.addEventListener("change", set_End_Date);
  const storedData = JSON.parse(localStorage.getItem("data")) || {};
  const storedEducations = storedData.educations || [];
  const storedEducation = storedEducations[index] || {};
  const storedEndDate = storedEducation.due_date || "";
  if (storedEndDate) {
    endDateInput.value = storedEndDate;
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
//თარიღის
for (let i = 0; i < inputEndDate.length; i++) {
  let endDateValues = Object.values(educationsData).map(
    (item) => item.due_date
  );
  if (endDateValues[i]) {
    displayendDate[i].innerHTML = "- " + " " + endDateValues[i];
    labelDate[i].classList.add("show");
    inputEndDate[i].value = endDateValues[i];
  }
  set_End_Date({ target: inputEndDate[i] });
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.educations = data.educations || [];
    data.educations[index] = data.educations[index] || {};
    data.educations[index].description = education.value;
    localStorage.setItem("data", JSON.stringify(data));
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
    const data = JSON.parse(localStorage.getItem("data")) || {};
    data.educations = data.educations || [];
    data.educations[index] = data.educations[index] || {};
    delete data.educations[index].description;
    localStorage.setItem("data", JSON.stringify(data));
    return false;
  }
}
for (let i = 0; i < educationInput.length; i++) {
  let descriptionValues = Object.values(educationsData).map(
    (item) => item.description
  );
  if (descriptionValues[i]) {
    educationInput[i].value = descriptionValues[i];
    educationDescriptionValidation(educationInput[i], i);
  }
}
educationInput.forEach((description, index) => {
  let descriptionValues = Object.values(educationsData).map(
    (item) => item.description
  );
  if (descriptionValues[index]) {
    educationInput[index].value = descriptionValues[index];
    educationDescriptionValidation(educationInput[index], index);
  }
  description.addEventListener("input", () => {
    educationDescriptionValidation(description, index);
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
    addButton.disabled = true;
    return;
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
    <label class="label-top school-label" 
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
      <label  class="label-top quality-label"
        >ხარისხი</label
      >
      <select class="select" name="selected">
      <option value="" disabled selected>აირჩიე ხარისხი</option>
      <option value="საშუალო სკოლის დიპლომი">
        საშუალო სკოლის დიპლომი
      </option>
      <option value="ზოგადსაგანმანათლებლო დიპლომი">
        ზოგადსაგანმანათლებლო დიპლომი
      </option>
      <option value="კოლეჯი(ხარისიხს გარეშე)">
        კოლეჯი(ხარისიხს გარეშე)
      </option>
      <option value="სტუდენტი">სტუდენტი</option>
      <option value="ბაკალავრი">ბაკალავრი</option>
      <option value="მაგისტრი">მაგისტრი</option>
      <option value="დოქტორი">დოქტორი</option>
      <option value="ასოცირებული ხარისხი">
        ასოცირებული ხარისხი
      </option>
      <option value="სხვა">სხვა</option>
      </select>
    </div>
    <div class="input-field right-date">
      <label class="label-top date-label" 
        >დამთავრების რიცხვი</label
      >
      <input type="date" class="date end--date" />
    </div>
  </div>
  <div class="input-field about-field">
    <label
      class="label-top education-description-label"
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
  educationsData =
    (localStorage.getItem("data") &&
      JSON.parse(localStorage.getItem("data")).educations) ||
    {};
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
  //თარიღის
  for (let i = 0; i < inputEndDate.length; i++) {
    let endDateValues = Object.values(educationsData).map(
      (item) => item.due_date
    );
    if (endDateValues[i]) {
      displayendDate[i].innerHTML = "- " + " " + endDateValues[i];
      labelDate[i].classList.add("show");
      inputEndDate[i].value = endDateValues[i];
    }
    set_End_Date({ target: inputEndDate[i] });
  }
  addEventListenersToEndDates(
    inputEndDate[inputEndDate.length - 1],
    labelDate[labelDate.length - 1],
    inputEndDate.length - 1
  );
  // სასწავლებლის
  schoolInput.forEach((school, index) => {
    let schoolValues = Object.values(educationsData).map(
      (item) => item.institute
    );
    if (schoolValues[index]) {
      schoolInput[index].value = schoolValues[index];
      schoolValidation(schoolInput[index], index);
    }
    school.addEventListener("input", () => {
      schoolValidation(school, index);
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
    let schoolValues = Object.values(educationsData).map(
      (item) => item.institute
    );
    if (schoolValues[i]) {
      schoolInput[i].value = schoolValues[i];
      if (schoolInput[i].value) {
        schoolInput[i].classList.add("blur");
      }
      setSchool(i, schoolInput[i]);
    }
  }
  // აღწერის
  educationInput.forEach((education, index) => {
    let descriptionValues = Object.values(educationsData).map(
      (item) => item.description
    );
    if (descriptionValues[index]) {
      educationInput[index].value = descriptionValues[index];
      educationDescriptionValidation(educationInput[index], index);
    }
    education.addEventListener("input", () => {
      educationDescriptionValidation(education, index);
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
  qualityInp.forEach((quality, index) => {
    quality.addEventListener("input", () => {
      const data = JSON.parse(localStorage.getItem("data")) || {};
      data.educations = data.educations || [];
      data.educations[index] = data.educations[index] || {};
      data.educations[index].degree_order = quality.value;
      data.educations[index].degree_id = quality.selectedIndex;
      localStorage.setItem("data", JSON.stringify(data));

      qualityValidation(quality, index);
    });
  });

  // Update the values when populating the form
  for (let i = 0; i < qualityInp.length; i++) {
    const educationData = educationsData[i];
    if (educationData) {
      qualityInp[i].value = educationData.degree_order;
      qualityInp[i].selectedIndex = educationData.degree_id;
      qualityValidation(qualityInp[i], i);
      setQuality.call(qualityInp[i], educationData.degree_order);
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
  } else {
    displaySchool[index].classList.remove("show");
    displaySchool[index].innerHTML = "";
  }
}
for (let i = 0; i < schoolInput.length; i++) {
  let schoolValues = Object.values(educationsData).map(
    (item) => item.institute
  );
  if (schoolValues[i]) {
    schoolInput[i].value = schoolValues[i];
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
    displayendDate[index].classList.add("show");
    labelDate[index].classList.add("show");
    displayendDate[index].innerHTML = e.target.value;
    if (displayGreyLine.length > index && displayGreyLine[index]) {
      displayGreyLine[index].classList.add("show");
    }
    if (educationTitle.length > index && educationTitle[index]) {
      educationTitle[index].classList.add("show");
    }
  } else {
    displayendDate[index].innerHTML = "";
    labelDate[index].classList.remove("show");
  }
}
for (let i = 0; i < inputEndDate.length; i++) {
  let endDateValues = Object.values(educationsData).map(
    (item) => item.due_date
  );
  if (endDateValues[i]) {
    displayendDate[i].innerHTML = "- " + " " + endDateValues[i];
    labelDate[i].classList.add("show");
    inputEndDate[i].value = endDateValues[i];
  }
  set_End_Date({ target: inputEndDate[i] });
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
  } else {
    educationDisplay[index].classList.remove("show");
    educationDisplay[index].innerHTML = "";
  }
}
for (let i = 0; i < educationInput.length; i++) {
  let descriptionValues = Object.values(educationsData).map(
    (item) => item.description
  );
  if (descriptionValues[i]) {
    educationInput[i].value = descriptionValues[i];
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
function initializeData() {
  const form = document.getElementById("form");
  const data = new FormData(form);
  localStorage.setItem("data", JSON.stringify(data));
}
if (!localStorage.getItem("data")) {
  initializeData();
}
const base64ImageToBlob = async () => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!data || !data["personalImage"] || !data["personalImage"]["type"]) {
    throw new Error("Missing or invalid data");
  }
  const base64Image = data["personalImage"]["type"];
  const resp = await fetch(base64Image);
  return await resp.blob();
};
const convertLocalDataToFormData = async () => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!data || !data["personalImage"] || !data["personalImage"]["type"]) {
    throw new Error("Missing or invalid data");
  }
  const resp = await fetch(data["personalImage"]["type"]);
  const blob = await resp.blob();
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  formData.append("image", blob, data["personalImage"]["name"]);
  formData.append("name", data.name);
  formData.append("surname", data.surname);
  formData.append("email", data.email);
  formData.append("phone_number", data.phone_number);
  formData.append("about_me", data.about_me);
  data.educations.forEach((education, index) => {
    formData.append(`educations[${index}][degree_id]`, education.degree_id);
    formData.append(
      `educations[${index}][degree_order]`,
      education.degree_order
    );
    if (education.description !== undefined) {
      formData.append(
        `educations[${index}][description]`,
        education.description
      );
    }
    if (education.due_date !== undefined) {
      formData.append(`educations[${index}][due_date]`, education.due_date);
    }
    if (education.institute !== undefined) {
      formData.append(`educations[${index}][institute]`, education.institute);
    }
  });
  data.experiences.forEach((experience, index) => {
    formData.append(`experiences[${index}][position]`, experience.position);
    formData.append(`experiences[${index}][start_date]`, experience.start_date);
    formData.append(`experiences[${index}][due_date]`, experience.due_date);
    formData.append(
      `experiences[${index}][description]`,
      experience.description
    );
    formData.append(`experiences[${index}][employer]`, experience.employer);
  });
  return formData;
};
const formEl = document.querySelector(".form");
formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  let isFormValid = true;
  schoolInput.forEach((school, index) => {
    let isValid = schoolValidation(school, index, schoolInput);
    if (!isValid) {
      isFormValid = false;
    }
  });
  educationInput.forEach((description, index) => {
    let isValid = educationDescriptionValidation(
      description,
      index,
      educationInput
    );
    if (!isValid) {
      isFormValid = false;
    }
  });
  inputEndDate.forEach((endDateInput, index) => {
    if (endDateInput.value.length === 0) {
      endDateInput.classList.remove("valid");
      endDateInput.classList.add("invalid");
      labelDate[index].style.color = "#e52f2f";
      endDateInput.style.outline = "none";
      isFormValid = false;
    } else {
      endDateInput.classList.add("valid");
      endDateInput.classList.remove("invalid");
      labelDate[index].style.color = "#000000";
      endDateInput.style.outline = "none";
      isFormValid = true;
    }
  });
  form.querySelectorAll(".select").forEach((quality, index) => {
    if (quality.value.length == 0) {
      quality.classList.remove("valid");
      quality.classList.add("invalid");
      quality
        .closest(".select-container")
        .querySelector(".quality-label").style.color = "#e52f2f";
      quality.style.outline = "none";
      isFormValid = false;
    } else {
      isFormValid = true;
    }
  });
  if (isFormValid) {
    try {
      const requestBody = await convertLocalDataToFormData();
      const response = await fetch(
        "https://resume.redberryinternship.ge/api/cvs",
        {
          headers: {
            Accept: "application/json",
          },
          method: "POST",
          body: requestBody,
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (response.status === 201) {
          rightPage.style.border = "0.8px solid #000000";
          rightPage.classList.add("centered");
          leftPage.style.display = "none";
          modal.style.display = "block";
          localStorage.clear();
        }
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
});
