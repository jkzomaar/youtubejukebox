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

});

function showQ(){
 $('#search-result').html('<pre class="block-center">todo: implement queue viewer</pre>');
}
