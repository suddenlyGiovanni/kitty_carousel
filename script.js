// WAIT FOR ALL THE DOM TO BE PARSED BEFORE START TO EVALATE THE SCRIPTS.
document.addEventListener( 'DOMContentLoaded', function () {

    // DOM selectors:
    var carousel = document.getElementById( 'carousel' );
    var imagesList = document.getElementsByClassName( 'off-start' );
    // Buttons
    var buttonsContainer = document.getElementById( 'buttonsContainer' );
    var buttonsList = document.getElementsByClassName( 'button' );

    // save a REFERENCE of:
    var current = 0; // 1. current element on screen.
    var next = 1; // 2. next element to be visualized.
    var timeoutID; // 3. id of the timeout function currently running
    var transitioning = false; // 4. save the state of the transitions.
    /*________________________________________________________________________*/
    /*________________________________________________________________________*/

    // EVENT LISTENER SECTION:

    // 1.   EventListener on the CAROUSEL
    //      listen for ANY 'transitionend' event.
    carousel.addEventListener( 'transitionend', function ( event ) {
        //  stop the event bubbling up the chain.
        event.stopPropagation();
        //  EVENT HANDLER:
        //  every time this event is fired, the EH removes the class 'off-end'
        //  JUST form an element that has one attached to it.
        if ( event.target.classList.contains( 'off-end' ) ) {
            event.target.classList.remove( 'off-end' );
            transitioning = false;
            // set a 5s delay before triggering the next function.
            timeoutID = setTimeout( slideImages, 3500 );
        }

    } );


    // 2.   EventListener on the buttonsCONTAINER
    //      listen for ANY 'click' event on the buttonsContainer.
    buttonsContainer.addEventListener( 'click', function ( event ) {
        //  stop the event bubbling up the chain.
        event.stopPropagation();
        //  EVENT HANDLER:
        //  it's imperative to verify the TARGET of the event itself.
        if ( event.target.classList.contains( 'button' ) ) {
            // if a user click on a button:
            // we need to grab the index of the image that the user want to view
            var clickedButton = parseInt( event.target.id ) - 1;
            if ( !transitioning && clickedButton !== current ) {
                //  1. the previous delay must be canceled.
                clearTimeout( timeoutID );
                // 2. set next to be value of index to navigate to.
                next = clickedButton;
                // 3. call a new animation
                slideImages();
            }
        }
    } );





    /*________________________________________________________________________*/
    /*________________________________________________________________________*/

    // FUNCTION DECLARATION SECTION:

    /**
     * Slide images from right to left toggling different css classes:
     *   1. STARTING position is off screen to the right = 'off-start'.
     *   2. ON SCREEN position = 'on-screen'.
     *   3. END position = 'off-end'.
     * Change the classes and keep them in sync with the QUEUE saved in the
     * current & next value.
     * Also save the transitioning state.
     * @callback syncButtons
     */
    function slideImages() {
        // moves the CURRENT image displayed off screen
        imagesList[ current ].classList.add( 'off-end' );
        imagesList[ current ].classList.remove( 'on-screen' );
        buttonsList[ current ].classList.remove( 'button-active' );
        // move the NEXT image on-screen.
        imagesList[ next ].classList.add( 'on-screen' );
        buttonsList[ next ].classList.add( 'button-active' );
        // when arrived at the end of list, set the next position back to index 0
        transitioning = true;
        current = next;
        next = current + 1;
        if ( next === imagesList.length ) {
            next = 0;
        }

    }


    /*________________________________________________________________________*/
    /*________________________________________________________________________*/
    // FUNCTION CALL SECTION:

    timeoutID = setTimeout( slideImages, 4000 );
} );
