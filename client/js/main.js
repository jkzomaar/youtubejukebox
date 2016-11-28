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
    columnWidth: 300,
    fitWidth: true
  });


});



function showQ(){
 
 $('#search-result').html('');
    $.get("../../server/queue.csv", function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        var linescsv = data.split("\n");
        generatePlayList(linescsv);
    });

  function generatePlayList(apps)
  {
        var table_playlist = "<div class='panel panel-default'><div class='panel-heading'>Playlist</div><div class='panel-body'><table class='table table-striped table-hover'><thead><tr><th>Position</th><th>Song Title</th><th>Duration</th></tr></thead><tbody>"; 
        
        for(i = 0;i < apps.length - 1; i++){
                var temp = apps[i].split(",");
                console.info(temp);
                table_playlist += "<tr>";
                table_playlist += "<td>" + (i + 1) + "</td>";
                table_playlist += "<td>" + temp[1] + "</td>";
                table_playlist += "<td>" + temp[2] + "</td>";
                table_playlist += "</tr>";

        }      
                table_playlist += "</tbody>";
                table_playlist += "</table></div></div>";
 	$('#search-result').html(table_playlist);
  }
 
}

//http://stackoverflow.com/a/24290476/2820952
function convertDuration(t){ 
		//dividing period from time
		var	x = t.split('T'),
			duration = '',
			time = {},
			period = {},
			//just shortcuts
			s = 'string',
			v = 'variables',
			l = 'letters',
			// store the information about ISO8601 duration format and the divided strings
			d = {
				period: {
					string: x[0].substring(1,x[0].length),
					len: 4,
					// years, months, weeks, days
					letters: ['Y', 'M', 'W', 'D'],
					variables: {}
				},
				time: {
					string: x[1],
					len: 3,
					// hours, minutes, seconds
					letters: ['H', 'M', 'S'],
					variables: {}
				}
			};
		//in case the duration is a multiple of one day
		if (!d.time.string) {
			d.time.string = '';
		}

		for (var i in d) {
			var len = d[i].len;
			for (var j = 0; j < len; j++) {
				d[i][s] = d[i][s].split(d[i][l][j]);
				if (d[i][s].length>1) {
					d[i][v][d[i][l][j]] = parseInt(d[i][s][0], 10);
					d[i][s] = d[i][s][1];
				} else {
					d[i][v][d[i][l][j]] = 0;
					d[i][s] = d[i][s][0];
				}
			}
		} 
		period = d.period.variables;
		time = d.time.variables;
		time.H += 	24 * period.D + 
								24 * 7 * period.W +
								24 * 7 * 4 * period.M + 
								24 * 7 * 4 * 12 * period.Y;
		
		if (time.H) {
			duration = time.H + ':';
			if (time.M < 10) {
				time.M = '0' + time.M;
			}
		}

		if (time.S < 10) {
			time.S = '0' + time.S;
		}

		duration += time.M + ':' + time.S;
	return duration;
}
