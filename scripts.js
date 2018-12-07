var API_ENDPOINT ="https://srqe6ugx0i.execute-api.us-east-1.amazonaws.com/dev"

document.getElementById("sayButton").onclick = function(){
	
	var langCode = $('#langCodes option:selected').val();
	var voice = langCode.split("-")[1];
	var lang = langCode.split("-")[0];
	//alert(lang);
	//alert(voice);
	
    document.getElementById("posts").style.display="none";
	document.getElementById("posts").style.display
	$("#posts tr").remove();
	
	var inputData = {
		"voice": voice,
		"text" : $('#postText').val(),
		"langc": lang
	};

	$('#loader').show();
	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent=response;
					//getPost();
					setTimeout(getPost, 5000);
					
					//getPost();
				
	      },
	      error: function () {
	          alert("error");
	      }
	  });
}


//document.getElementById("searchButton").onclick = function(){
	
function getPost() {

	var postId = document.getElementById("postIDreturned").innerText;
	//alert(postId);
    //url= API_ENDPOINT + '?postId='+postId;
    //alert(url);
	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
								<tr>\
								<th>Post</th>\
								<th>Player</th>\
								</tr>\
								<td>" + data['text'] + "</td> \
								<td>" + player + "</td> \
								</tr>");
	        });
				},
				complete: function(){
				   $('#loader').hide();
		        },
				error: function () {
						alert("error");
				}
		});
		
		document.getElementById("posts").style.display="table";
}

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
