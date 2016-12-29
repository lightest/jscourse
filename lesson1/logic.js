/*
 * @desc: sliding function. All it actually does is switching classes.
 *        We have past present and future states for our slides.
 *        past means slide is shifted to the left for full width.
 *        present means it's in the middle (not shifted at all).
 *        future means it is shifted to the right.
 *        So when we slide to the next slide we remove future class
 *        from the future slide and assign present to it. And
 *        we remove present class from the present slide and
 *        assign past.
 *        Note that .present class is only needed to reference the current slide
 *        in the function below. There is no description for the .present class
 *        in css file.
 */

function slide (forward) {
     var present = document.querySelector('.slide.present');
     var past = present.previousElementSibling;
     var future = present.nextElementSibling;
 
     if(forward) {
         if(future) {
             present.classList.remove('present');
             present.classList.add('past');
             future.classList.remove('future');
             future.classList.add('present');
         }
     } else {
         if(past) {
             present.classList.remove('present');
             present.classList.add('future');
             past.classList.remove('past');
             past.classList.add('present');
        }
    }
}

function slide_homework (n) {
    var slides = document.querySelectorAll('.slide');
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('past', 'present', 'future');
        if(i < n) {
            slides[i].classList.add('past');
        } else if (i > n) {
            slides[i].classList.add('future');
        } else {
            slides[i].classList.add('present');
        }
    }
}

/**
 * Shows slide with given number
 * @param n
 */
function gotoSlide(n) {
    var slide = document.querySelector('.slide:first-child');
    var qty = document.querySelector('.slider').childElementCount;
    n = Math.max(1, Math.min(n, qty));
    for(var i = 1; i <= qty; i++, slide = slide.nextElementSibling) {
        if (i < n) {
            slide.classList.remove('present', 'future');
            slide.classList.add('past');
        } else if (i == n) {
            slide.classList.remove('past', 'future');
            slide.classList.add('present');
        } else {
            slide.classList.remove('past', 'present');
            slide.classList.add('future');
        }
    }
}

/*
 * @desc: slide generating function.
 *        It creates large html string that describes the structure of the slides.
 *        Then it just inserts it inside the .slider element.
 */
function generateSlides () {
    var html = '';
    var time = '';
    var slider = document.querySelector('.slider');
    
    // check out how for loop is constructed.
    // this is the fastest known to me way to iterate
    // through anything - backwards. Also the form is very short.
    for(var i = 0; i <= 20; i++) {
        if(i === 0) {
            time = 'present';
        } else {
            time = 'future';
        }
        html += '<div class="slide '+ time +'">'+ (20-i) +'</div>';
    }

    slider.innerHTML = '';

    // NOTE here - we construct the HTML string first and only then add it to the
    // container once. It is the most optimised way to construct large chunks of html.
    // If we would instead construct one slide string, add it and then go to next it
    // will cause serious performance drops on large amounts of slides.
    // It is because each time we insert HTML browser constructs the DOM for it and
    // triggers page re-rendering. Re-rendering is the slowest part. The fewer times
    // we have to do it the faster our app gets.
    slider.insertAdjacentHTML('afterbegin', html);
}

/*
 * @desc: binds event listeners to particular elements.
 *        document.querySelector is the native browser functionality.
 *        It allows to search elements on the page using CSS query selectors,
 *        just like in .css files.
 */
function bindUIActions () {
    // addEventListener binds the function handler (second parameter) to
    // the event being specified in the first parameter.
    // Event itself happens when users clicks the mouse and browser detects it.
    // Event then goes all the way down the DOM tree till it reaches the element
    // that caused it. Then it starts to go backward - from the element where it
    // appeared to the top of the tree (to window object or to body tag).
    // Such behavior is called bubbling, event it sort of bubbles up to the surface.
    // So basically we're saying here "catch the event click when it reaches the
    // .btn.prev element".
    document.querySelector('.btn.prev').addEventListener('click', function () {
        slide(false);
    });

    document.querySelector('.btn.next').addEventListener('click', function () {
        slide(true);
    });

    // browser automatically passes event object to the handler function,
    // hence the "e" parameter. Event object is a description of the event
    // catched on the particular DOM object (window in this case).
    // We using it's field "which" to see which key was pressed.
    window.addEventListener('keydown', function (e) {
        console.log(e.which);
        if(e.which === 39) { // right arrow key
            slide(true);
        } else if (e.which === 37) { // left arrow key
            slide(false);
        } else if (e.which === 13) { // enter key
            gotoSlide(document.getElementById('nr').value);
        }
    });
}


/*
 * @desc: onload function is loaded when the DOM, all images, all scripts
 *        all stylesheets are loaded and ready to be used.
 *        When we type window.onload = function () {} we effectively
 *        settings the field of the window object to be a function.
 *        This means browser will call window.onload() automatically if
 *        it is defined. That's exactly what we're doing here.
 */
window.onload = function () {
    //always start with console output to see if it's working
    //unless you've done it 100 times and 100% sure it is.
    console.log('hello');
    generateSlides();
    bindUIActions();
}