import axios from 'axios';

export function generateText(inputText, editor) {
    axios.post('/generate-text', { text: inputText })
        .then(response => {
            const generatedText = response.data.generated_text;
            // Find and update the textarea
            const textarea = document.getElementById('inputText');
            if (textarea) {
                textarea.value = generatedText; // Display generated text in the textarea
            }
        })
        .catch(error => {
            console.error('Error generating text:', error);
            // Optionally, show error in the dialog's textarea
            const textarea = document.getElementById('inputText');
            if (textarea) {
                textarea.value = 'Error generating text, please try again.';
            }
        });
}
