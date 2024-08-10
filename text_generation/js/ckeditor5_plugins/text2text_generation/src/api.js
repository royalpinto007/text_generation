import axios from 'axios';

export function generateText(selectedText, editor) {
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
}
