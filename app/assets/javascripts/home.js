// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var cartFilter = false;
var outOfStockFilter = false;

var collapseTile = function(tile) {
  targetHeight = 210;
  tile.data("toggled", 0);
  tile.removeClass("active");
  
  // tile.animate({"width": 308}, function() {
  //   $('#item-view').isotope( 'layout', function(){} )
  // });

  tile.find(".expanded-info").slideUp(400, function() {
    $('#item-view').isotope( 'layout', function(){} )
  });
}

var expandTile = function(tile) {
  targetHeight = 372;
  tile.data("toggled", 1);

  // tile.animate({"height": targetHeight}, function() {
  //   $('#item-view').isotope( 'layout', function(){} )
  // });
  tile.addClass("active");
  tile.find(".expanded-info").slideDown(400, function() {
    $('#item-view').isotope( 'layout', function(){} )
  });
}

var toggleTile = function(tile) {
  if(tile.data("toggled") == 1) {
    collapseTile(tile);
  }
  else
    expandTile(tile);
}

var onTileClick = function (e) {
  toggleTile($(this))
}

var filter = function() {
  text = $("#item-filter").val();
  pattern = new RegExp("^"+text, "i");

  $('#item-view').isotope({ filter: function() {
    name = $(this).find(".item-name").text();
    if(cartFilter && !$(this).hasClass('in-cart'))
      return false;
    if(!cartFilter && outOfStockFilter && $(this).hasClass('out-of-stock'))
      return false;
    return pattern.test(name);
  } });
}

var onViewCartClick = function(e) {
  cartFilter = true;
  $("#show-all-tool").removeClass("active");
  $("#view-cart-tool").addClass("active");
  filter();
}

var onViewItemsClick = function(e) {
  cartFilter = false;
  $("#view-cart-tool").removeClass("active");
  $("#show-all-tool").addClass("active");
  filter();
}

var onType = function(e) {
  filter();
}


var toggleOutOfStock = function(tile) {
  outOfStockFilter = !outOfStockFilter;
  console.log(outOfStockFilter);
  $("#hide-out-tool").toggleClass("active", outOfStockFilter);
  filter(); 
}

var ready = function() {
  var $container = $('#item-view');

  $container.isotope({
    itemSelector: '.item-tile',
    layoutMode: 'masonry',
    masonry: {
        columnWidth: 158
    }
  });

  $container.delegate(".item-tile", "click", onTileClick);
  $("#view-cart").click(onViewCartClick);
  $("#view-cart-tool").click(onViewCartClick);
  $("#view-items").click(onViewItemsClick);
  $("#show-all-tool").click(onViewItemsClick);
  $("#hide-out-tool").click(toggleOutOfStock);
  $("#item-filter").keyup(onType);
}

$(document).ready(ready)
$(window).load(function() {
  $('#item-view').isotope( 'layout', function(){});
});
$(document).on('page:load', ready)

