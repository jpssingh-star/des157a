window.addEventListener('load', function () {
    'use strict';
    console.log('reading js');
    console.log(document.documentElement.scrollHeight);

    var pageTop;
    var bodyTag = document.querySelector('body');

    window.addEventListener('scroll', function() {
        pageTop = window.pageYOffset;

       switch(true){
            case pageTop < 500: bodyTag.className = "one"; break;
            case pageTop < 1500: bodyTag.className = "two"; break;
            case pageTop < 2600: bodyTag.className = "three"; break;
            case pageTop < 2800: bodyTag.className = "four"; break;
            case pageTop < 5000: bodyTag.className = "five"; break;
            default: bodyTag.className = "six";
        }
    });
}); 