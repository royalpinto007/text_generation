import { ButtonView } from "ckeditor5/src/ui";
import { generateText } from "./api";
import icon from "../../../../icons/text_generation.svg";

export default function createButtonView(locale, editor) {
  const view = new ButtonView(locale);

  const css = `
        .ck-button-generate-text {
            background-color: #0074bd; 
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
        }

        .ck-text-generator-dialog {
            position: absolute;
            background-color: white;
            border: 1px solid #ccc;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }

        .ck-dialog-body {
            padding-top: 20px;
            padding-right: 20px;
            padding-left: 20px;
            padding-bottom: 10px;
        }

        .ck-input-text {
            width: 92%;
            padding: 10px;
            border: 1px solid #000;
            border-radius: 4px;
        }

        .ck-submit-button {
            background-color: #0074bd;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 2px;
        }

        .ck-close-button {
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 16px;
        }
    `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);

  view.set({
    label: "Generate Text",
    icon,
    tooltip: true,
    class: "ck-button ck-button-generate-text",
  });

  view.on("execute", () => {
    const dialogElement = document.createElement("div");
    dialogElement.className = "ck-text-generator-dialog";
    dialogElement.innerHTML = `
            <button class="ck-close-button">✖</button>
            <div class="ck-dialog-body">
                <textarea id="inputText" class="ck-input-text" rows="4" cols="40"></textarea>
                <button id="submitText" class="ck-submit-button">Generate</button>
            </div>
        `;

    document.body.appendChild(dialogElement);
    enableDrag(dialogElement);

    // Calculate and set initial position with slight space below the icon
    const buttonRect = view.element.getBoundingClientRect();
    dialogElement.style.position = "absolute";
    dialogElement.style.top = `${buttonRect.bottom + 5}px`; // position slightly below the button with 5px gap
    dialogElement.style.left = `${buttonRect.left}px`; // align with the button

    document.getElementById("inputText").focus();

    document.getElementById("submitText").addEventListener("click", () => {
      const inputText = document.getElementById("inputText").value;
      generateText(inputText, editor).then((generatedText) => {
        document.getElementById("inputText").value = generatedText;
      });
    });

    document.querySelector(".ck-close-button").addEventListener("click", () => {
      dialogElement.remove();
    });
  });

  return view;
}

function enableDrag(element) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.querySelector(element.className + " .ck-close-button")) {
    document.querySelector(
      element.className + " .ck-close-button",
    ).onmousedown = dragMouseDown;
  } else {
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
