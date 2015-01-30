// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var onTileClick = function (e) {
  target = $(this);
  targetHeight = 368;
  if(target.data("toggled") == 1) {
    target.data("toggled", 0);
    targetHeight = 180;
  }
  else
    target.data("toggled", 1);

  target.animate({"height": targetHeight}, function() {
    $('#item-view').isotope( 'layout', function(){} )
  });
  target.find(".expanded-info").slideToggle();
}

var onViewCartClick = function(e) {
  $('#item-view').isotope({ filter: '.in-cart' })
}

var onViewItemsClick = function(e) {
  $('#item-view').isotope({ filter: '*' })
}

var ready = function() {
  var $container = $('#item-view');

  $container.isotope({
    itemSelector: '.item-tile',
    layoutMode: 'masonry'
  });

  $container.delegate(".item-tile", "click", onTileClick);
  $("#view-cart").click(onViewCartClick);
  $("#view-items").click(onViewItemsClick);
}

$(document).ready(ready)
$(document).on('page:load', ready)

