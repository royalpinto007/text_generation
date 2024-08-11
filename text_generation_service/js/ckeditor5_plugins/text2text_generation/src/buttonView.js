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
        // Create a dialog element
        const dialogElement = document.createElement('div');
        dialogElement.style.position = 'absolute';
        dialogElement.innerHTML = `
            <div style="padding: 20px; background-color: white; border: 1px solid black; position: relative;">
                <textarea id="inputText" rows="4" cols="50" style="margin-bottom: 10px;"></textarea>
                <button id="submitText">Generate</button>
            </div>
        `;

        // Append dialog to body and position it
        document.body.appendChild(dialogElement);
        const buttonRect = view.element.getBoundingClientRect();
        dialogElement.style.top = `${buttonRect.bottom + window.scrollY}px`;
        dialogElement.style.left = `${buttonRect.left + window.scrollX}px`;

        // Focus the textarea
        document.getElementById('inputText').focus();

        // Handle the Generate button click
        document.getElementById('submitText').addEventListener('click', () => {
            const inputText = document.getElementById('inputText').value;
            generateText(inputText, editor);
            dialogElement.remove(); // Remove the dialog after submission
        });
    });

    return view;
}
