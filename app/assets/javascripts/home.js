// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var cartFilter = false;

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

var filter = function() {
  text = $("#item-filter").val();
  pattern = new RegExp("^"+text, "i");

  $('#item-view').isotope({ filter: function() {
    name = $(this).find(".item-name").text();
    if(cartFilter && !$(this).hasClass('in-cart'))
      return false;
    return pattern.test(name);
  } });
}

var onViewCartClick = function(e) {
  cartFilter = true;
  filter();
}

var onViewItemsClick = function(e) {
  cartFilter = false;
  filter();
}

var onType = function(e) {
  filter();
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
  $("#item-filter").keyup(onType);
}

$(document).ready(ready)
$(document).on('page:load', ready)

