var ready = function() {
  var owl = $("#item-carousel");
 
  owl.owlCarousel({
     
      itemsCustom : [
        [0, 1],
        [450, 2],
        [600, 3],
        [700, 4],
        [1000, 5],
        [1200, 9],
        [1400, 10],
        [1600, 12]
      ],
      navigation : true
 
  });
 
}


$(document).ready(ready)
$(document).on('page:load', ready)