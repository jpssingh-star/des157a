(function() {
    'use strict';
    console.log('reading js');

   
    var madlib = document.querySelector('#madlibs-output'); 
    var form = document.querySelector('#myform');
    var madlibOverlay = document.querySelector('#madlib-container'); 
    var madlibQuestions = document.querySelector('#madlib-questions'); 
    var errorMessage = document.querySelector('#error'); 
    form.addEventListener('submit', function(event) {
        event.preventDefault();

     
        const adjective1 = document.querySelector('#adjective1').value;
        const adjective2 = document.querySelector('#adjective2').value;
        const noun1 = document.querySelector('#noun1').value;
        const verb1 = document.querySelector('#verb1').value;
        const drink = document.querySelector('#drink').value;
        const flavor = document.querySelector('#flavor').value;
        const adjective4 = document.querySelector('#adjective4').value;
        const verb2 = document.querySelector('#verb2').value;
        const adjective6 = document.querySelector('#adjective6').value;
        const noun2 = document.querySelector('#noun2').value;
        const noun3 = document.querySelector('#noun3').value;
        const verb3 = document.querySelector('#verb3').value;

        let myText;
// using 3 is better to focus 
        if (adjective1 === '') {
            myText = 'Please provide the first adjective!';
            document.querySelector('#adjective1').focus();
        } else if (adjective2 === '') {
            myText = 'Please provide the second adjective!';
            document.querySelector('#adjective2').focus();
        } else if (noun1 === '') {
            myText = 'Please provide a noun!';
            document.querySelector('#noun1').focus();
        } else if (verb1 === '') {
            myText = 'Please provide a verb!';
            document.querySelector('#verb1').focus();
        } else if (drink === '') {
            myText = 'Please provide a drink!';
            document.querySelector('#drink').focus();
        } else if (flavor === '') {
            myText = 'Please provide a flavor!';
            document.querySelector('#flavor').focus();
        } else if (adjective4 === '') {
            myText = 'Please provide another adjective!';
            document.querySelector('#adjective4').focus();
        } else if (verb2 === '') {
            myText = 'Please provide another verb!';
            document.querySelector('#verb2').focus();
        } else if (adjective6 === '') {
            myText = 'Please provide another adjective!';
            document.querySelector('#adjective6').focus();
        } else if (noun2 === '') {
            myText = 'Please provide another noun!';
            document.querySelector('#noun2').focus();
        } else if (noun3 === '') {
            myText = 'Please provide another noun!';
            document.querySelector('#noun3').focus();
        } else if (verb3 === '') {
            myText = 'Please provide another verb!';
            document.querySelector('#verb3').focus();
        } else {
            
            myText = `<h2>Receipt!</h2>
             <p>This morning I went to Moo Moo's Cafe, the most <span>${adjective1}</span> place in town. 
            A <span>${adjective2}</span> cow wearing a <span>${noun1}</span> was by the counter and <span>${verb1}</span>-ed me. 
            “What can I make for you today?” she asked. 
            I decided to order a <span>${drink}</span> with <span>${flavor}</span>. 
            “Make it extra <span>${adjective4}</span> please!” The moo-rista began to <span>${verb2}</span> behind the counter. 
            She made my drink very <span>${adjective6}</span> and put it in a <span>${noun2}</span>. 
            I got my drink and it was full of <span>${noun3}</span>. 
            I <span>${verb3}</span>-ed and left.</p>`;

            
            form.reset();

            // user texts shown
            madlib.innerHTML = myText;

            // hide form, show result and the overlay
            madlibQuestions.style.display = 'none';
            madlibOverlay.style.display = 'block';

            // clear error messages that i added 
            if (errorMessage) {
                errorMessage.innerHTML = '';
            }

            return; 
        }

       
        if (errorMessage) {
            errorMessage.innerHTML = myText;
        } else {
            alert(myText);
        }
    });



})();
