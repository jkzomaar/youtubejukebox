$( document ).ready(function() {
  $('#query').keypress(function(e){
      if(e.which == 13) {
        $('#search-button').click();
      }
  });

  $('#query').change(function(){
      $('#search-button').prop('disabled', false);
  });

  $('#jukeBox').click(function(){
      $('#search-result').html('');
  });

  $('.grid').masonry({
    // options...
    itemSelector: '.grid-item',
    columnWidth: 200
  });


});



function showQ(){
 $('#search-result').html('<pre class="block-center">todo: implement queue viewer</pre>');
}
