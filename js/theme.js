var enabled = false;

theme_button = document.getElementById("theme_button");
theme_button.onclick = function(){
  if (enabled) {
    let link = document.querySelector("link[href='css/dark.css']")
    link.remove();
    enabled = false;
  } else {
    let link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = "css/dark.css";

    document.head.appendChild(link);
    enabled = true;
  }
};
