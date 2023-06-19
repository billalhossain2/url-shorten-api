var myModal = new bootstrap.Modal(document.getElementById("shortenUrlModal"));
const shortenUrlBtn = document.getElementById("modal-btn");
const ul = document.getElementById("url-list");
const shortenUrlField = document.getElementById("shroted-url-field");
const errorMsgElement = document.getElementById("url-error-message-container");
const eyeBtn = document.getElementById("eye-btn");
const spinner = document.getElementById("spinner");
const div = document.getElementById("empty-div");

const copyLink = (currentLink) => {
  const shortenLinkText =
    currentLink.parentElement.previousElementSibling.innerText;

  //Select the text
  const range = document.createRange();
  range.selectNodeContents(currentLink.parentElement.previousElementSibling);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  //Copy the text inside the text element
  navigator.clipboard.writeText(shortenLinkText);

  //Show alert after copied
  currentLink.previousElementSibling.innerText = "Copied Link";
};

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", (ev) => {
  ul.innerHTML = "";
  ul.innerHTML = `<div id="empty-div" class="empty-text">No links are available</div>`;
});

const displayShortenList = (shortenUrlText) => {
    if(ul.children[0].className === "empty-text"){
        ul.removeChild(div);
    }
  ul.innerHTML += `
        <div class="link-body">
        <li class="link">${shortenUrlText}</li>
        <li class="link-button-container">
        <span class = "copy-alert">Copy to Clipboard</span>
        <button onclick="copyLink(this)">Copy Link</button>
        </li>
        </div>
        `;
};

const loadUrlResponse = async (shortenUrlFieldValue) => {
  const URL = `https://api.shrtco.de/v2/shorten?url=${shortenUrlFieldValue}`;
  try {
    errorMsgElement.innerText = "Link is generating";
    errorMsgElement.style.color = "green";
    spinner.style.display = "block";
    const response = await fetch(URL);
    const data = await response.json();
    spinner.style.display = "none";
    errorMsgElement.innerText = "";
    const shortenUrlText = data.result.full_short_link2;
    displayShortenList(shortenUrlText);
  } catch (error) {
    spinner.style.display = "none";
    errorMsgElement.style.color = "maroon"
    errorMsgElement.innerText = "URL is not valid !";
  }
};

//Event listeners
shortenUrlBtn.addEventListener("click", () => {
  const shortenUrlField = document.getElementById("shroted-url-field");
  const shortenUrlFieldValue = shortenUrlField.value;
  if (shortenUrlFieldValue) {
    loadUrlResponse(shortenUrlFieldValue);
    shortenUrlField.value = "";
  } else {
    errorMsgElement.style.color = "maroon"
    errorMsgElement.innerText = "Please enter a valid URL";
  }
});

shortenUrlField.addEventListener("keyup", () => {});

eyeBtn.addEventListener('click', ()=>{
    errorMsgElement.innerText = "";
    myModal.show();
})