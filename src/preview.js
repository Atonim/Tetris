let username_element = document.getElementById("username")
let start_button_element = document.getElementById("start_button")
let form_element = document.getElementById("form")

username_element.addEventListener("input", checkUsernameInput)
form_element.addEventListener("submit", saveUsername)

function checkUsernameInput(event) {
  console.log('fdfdfd');
  if (username_element.value.length === 0) {
    start_button_element.setAttribute("disabled", "disable")
  } else {
    start_button_element.removeAttribute("disabled")
  }
}

function saveUsername(event) {
  localStorage["tetris.username"] = username_element.value
  if (localStorage["tetris.score_table"] === undefined) {
    localStorage["tetris.score_table"] = JSON.stringify([])
  }
}