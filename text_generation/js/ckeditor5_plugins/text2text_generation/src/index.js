import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import axios from 'axios';

export default class TextToTextGeneration extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('textToTextGeneration', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Generate Text',
                icon: null, // You can add an icon here
                tooltip: true
            });

            view.on('execute', () => {
                const selectedText = editor.model.document.selection.getSelectedText().toString();

                axios.post('/generate-text', { text: selectedText })
                .then(response => {
                    const generatedText = response.data.generated_text;

                    editor.model.change(writer => {
                        const range = editor.model.document.selection.getFirstRange();
                        writer.insertText(generatedText, range.start);
                        writer.remove(range);
                    });
                })
                .catch(error => {
                    console.error('Error generating text:', error);
                });
            });

            return view;
        });
    }
}
