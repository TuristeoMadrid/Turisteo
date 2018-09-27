document.addEventListener('DOMContentLoaded', () => {
  $(function() {
    $(".btn").tooltip({
        show: {
        effect: "slideDown",
        delay: 300
        }
    });
    $( function() {
      // run the currently selected effect
      function runEffect(id) {
        const options = {};
        // Run the effect
        $( `#${id}1` ).show( 'fade', options, 200, callback );
      };
   
      //callback function to bring a hidden box back
      function callback() {
        setTimeout(function() {
          $( ".effect:visible" ).removeAttr( "style" ).fadeOut();
        }, 1000 );
      };
   
      // Set effect from select menu value
      $( ".btn" ).on( "mouseover", function(e) {
        runEffect(e.target.id);
      });
   
      $( ".effect" ).hide();
    } );
  
});
}, false);