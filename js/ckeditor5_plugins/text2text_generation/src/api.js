import axios from 'axios';

export function generateText(inputText, editor) {
    axios.post('/generate-text', JSON.stringify({ text: inputText }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Received response:', response.data);
        const generatedText = response.data.generated_text;
        const textarea = document.getElementById('inputText');
        if (textarea) {
            textarea.value = generatedText;
        }
    })
    .catch(error => {
        console.error('Error generating text:', error.response.data); 
        const textarea = document.getElementById('inputText');
        if (textarea) {
            textarea.value = 'Error generating text, please try again.';
        }
    });
}
