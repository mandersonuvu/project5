var form = document.getElementById("visit_form");
var inputs = ["first_name", "last_name", "address", "city"];
var zipRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;
var emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
var phoneRegex = /^([1-9]-)?\d{3}-?\d{3}-?\w{4}$/;

function initValidation() {
  for (const id of inputs) {
    document.getElementById(id).addEventListener("change", function(){checkEmpty(id)});
  }
  document.getElementById("state").addEventListener("change", validateState);
  document.getElementById("zip").addEventListener("change", function(){validateRegex("zip", zipRegex)});
  document.getElementById("email").addEventListener("change", function(){validateRegex("email", emailRegex)});
  document.getElementById("phone").addEventListener("change", function(){validateRegex("phone", phoneRegex)});
  document.getElementById("how_find_page").addEventListener("change", checkRadios);

  form.addEventListener("submit", submitForm);
}

function submitForm(event) {
  event.preventDefault();
  event.stopPropagation();

  validateForm();

  if (form.checkValidity()) {
    form.style.display = "none";
    document.getElementById("thank_you").style.display = "block";
  }

  console.log("submitted");
}

function validateForm() {
  for (const id of inputs) {
    checkEmpty(id);
  }

  validateState();
  validateRegex("zip", zipRegex);
  validateRegex("email", emailRegex);
  validateRegex("phone", phoneRegex);

  checkRadios();
}

function checkEmpty(id) {
  let el = document.getElementById(id);
  if (el.value.length == 0) {
    el.style.border = "2px solid red";
    el.setCustomValidity("Field is required.");
  } else {
    el.style.border = "2px solid black";
    el.setCustomValidity("");
  }
}

var states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL",
  "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
  "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];
function validateState() {
  let el = document.getElementById("state");
  let error = document.getElementById("stateError");
  if (states.includes(el.value)) {
    el.style.border = "2px solid black";
    error.style.display = "none";
    el.setCustomValidity("");
  } else {
    el.style.border = "2px solid red";
    error.style.display = "block";
    el.setCustomValidity("Invalid state.");
  }
}

function validateRegex(id, regex) {
  let el = document.getElementById(id);
  let error = document.getElementById(`${id}Error`);
  if (regex.test(el.value)) {
    el.style.border = "2px solid black";
    error.style.display = "none";
    el.setCustomValidity("");
  } else {
    el.style.border = "2px solid red";
    error.style.display = "block";
    el.setCustomValidity("Invalid phone.");
  }
}

function checkRadios() {
  let el = document.getElementById("how_find_page");
  let google = document.getElementById("google");
  let checked = document.querySelector('input[name = "find_page"]:checked');
  if (checked != null) {
    el.style.border = "2px solid transparent";
    google.setCustomValidity("");
  } else {
    el.style.border = "2px solid red";
    google.setCustomValidity("Select at least one.");
  }
}
