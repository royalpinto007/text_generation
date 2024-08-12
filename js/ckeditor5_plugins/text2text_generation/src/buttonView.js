import { ButtonView } from 'ckeditor5/src/ui';
import { generateText } from './api';
import icon from '../../../../icons/text_generation.svg';

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
            position: fixed;
            background-color: white;
            border: 1px solid #ccc;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }

        .ck-dialog-body {
            padding: 20px;
        }

        .ck-input-text {
            width: 95%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .ck-submit-button {
            background-color: #0074bd;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    view.set({
        label: 'Generate Text',
        icon,
        tooltip: true,
        class: 'ck-button ck-button-generate-text'
    });

    view.on('execute', () => {
        const dialogElement = document.createElement('div');
        dialogElement.className = 'ck-text-generator-dialog';
        dialogElement.innerHTML = `
            <div class="ck-dialog-body">
                <textarea id="inputText" class="ck-input-text" rows="4" cols="35"></textarea>
                <button id="submitText" class="ck-submit-button">Generate</button>
            </div>
        `;

        document.body.appendChild(dialogElement);
        positionDialog(dialogElement, view.element);

        window.addEventListener('resize', () => positionDialog(dialogElement, view.element));
        window.addEventListener('scroll', () => positionDialog(dialogElement, view.element));

        document.getElementById('inputText').focus();

        document.getElementById('submitText').addEventListener('click', () => {
            const inputText = document.getElementById('inputText').value;
            generateText(inputText, editor).then(generatedText => {
                document.getElementById('inputText').value = generatedText;
            });
        });
    });

    return view;
}

function positionDialog(dialogElement, buttonElement) {
    const buttonRect = buttonElement.getBoundingClientRect();
    dialogElement.style.top = `${buttonRect.bottom + 5}px`;
    dialogElement.style.left = `${buttonRect.left}px`;
}
