// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var cartFilter = false;
var outOfStockFilter = false;
var dateFilter = null;

$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

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
  if($(e.target).hasClass("kariton-btn") || $(e.target).hasClass("item-quantity"))
    return;
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
    if(dateFilter && dateFilter != $(this).data("date"))
      return false;
    return pattern.test(name);
  } });
}

var onViewCartClick = function(e) {
  cartFilter = true;
  $.cookie("cartFilter", true);

  $("#show-all-tool").removeClass("active");
  $("#view-cart-tool").addClass("active");
  $("#item-view").addClass("cart-item-view");
  $("#cart-view").slideDown();
  $(".add-item").slideUp(400);
  $(".remove-item").slideDown(400, function() {
    $('#item-view').isotope( 'layout', function(){} );
  });

  filter();
}

var onViewItemsClick = function(e) {
  cartFilter = false;
  $.cookie("cartFilter", false);

  $("#view-cart-tool").removeClass("active");
  $("#show-all-tool").addClass("active");
  $("#item-view").removeClass("cart-item-view");
  $("#cart-view").slideUp();
  $(".add-item").slideDown(400, function() {
    $('#item-view').isotope( 'layout', function(){} );
  });
  $(".remove-item").slideUp(400);
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

  $("#date-filter").change(function(e) {
    console.log(cart_history);
    index = $(this).val();
    if(index === "-1") {
      dateFilter = undefined;

      $("#cart-total").text("Overall Total: " + overall);
      $("#cart-total").digits();
      filter();

      return;
    }

    dateFilter = dates[index];
    $("#cart-total").text("Total: " + cart_history[index].total);
    $("#cart-total").digits();
    filter();
  });
}

$(document).ready(ready)
$(window).load(function() {
  $('#item-view').isotope( 'layout', function(){});
});
$(document).on('page:load', ready)

