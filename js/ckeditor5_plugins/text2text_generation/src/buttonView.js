import { ButtonView } from 'ckeditor5/src/ui';
import { generateText } from './api';
import icon from '../../../../icons/text_generation.svg';

export default function createButtonView(locale, editor) {
    const view = new ButtonView(locale);

    view.set({
        label: 'Generate Text',
        icon,
        tooltip: true
    });

    view.on('execute', () => {
        const dialogElement = document.createElement('div');
        dialogElement.style.position = 'fixed'; 
        dialogElement.innerHTML = `
            <div style="padding: 20px; background-color: white; border: 1px solid black; position: relative; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);">
                <textarea id="inputText" rows="4" cols="20" style="margin-bottom: 10px;"></textarea><br>
                <button id="submitText">Generate</button>
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
    dialogElement.style.top = `${buttonRect.bottom}px`;
    dialogElement.style.left = `${buttonRect.left}px`;
}
