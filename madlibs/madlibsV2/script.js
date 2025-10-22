(function(){
    'use strict';
    console.log('Reading JS');

    const myForm = document.querySelector('#myform');
    const madlibContainer = document.querySelector('#madlib-container');
    const madlibQuestions = document.querySelector('#madlib-questions');

    // grab all text inputs
    const formData = document.querySelectorAll('#myform input[type=text]');

    // map each input to its corresponding span id
    const spanIds = [
        'adjective1-span',
        'adjective2-span',
        'noun1-span',
        'verb1-span',
        'drink-span',
        'flavor-span',
        'adjective4-span',
        'verb2-span',
        'adjective6-span',
        'noun2-span',
        'noun3-span',
        'verb3-span'
    ];

    myForm.addEventListener('submit', function(event){
        event.preventDefault();

        let words = [];
        let allFilled = true;

        // collect all input values and check for empty
        formData.forEach(input => {
            if (input.value.trim() === '') {
                allFilled = false;
            }
            words.push(input.value.trim());
        });

        if (!allFilled) {
            alert("Please complete all fields so we can make your Mad Lib!");
            return;
        }

        // fill each span with corresponding input
       spanIds.forEach((id, index) => {
    document.querySelector(`#${id}`).innerHTML = words[index];
});

        // hide the form, show the receipt
        madlibQuestions.style.display = 'none';
        madlibContainer.style.display = 'block';
    });
})();
