
var ready = function() {
  var owl = $("#item-carousel");
 
  owl.owlCarousel({
     
      itemsCustom : [
        [0, 2],
        [450, 4],
        [600, 5],
        [700, 6],
        [1000, 7],
        [1200, 9],
        [1400, 10],
        [1600, 12]
      ],
      navigation : true
 
  });
 
}


$(document).ready(ready)
$(document).on('page:load', ready)