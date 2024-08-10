import { ButtonView } from 'ckeditor5/src/ui';
import { generateText } from './api';

export default function createButtonView(locale, editor) {
    const view = new ButtonView(locale);

    view.set({
        label: 'Generate Text',
        icon: null,
        tooltip: true
    });

    view.on('execute', () => {
        const selectedText = editor.model.document.selection.getSelectedText().toString();
        generateText(selectedText, editor);
    });

    return view;
}
