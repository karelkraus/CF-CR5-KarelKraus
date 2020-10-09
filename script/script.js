var data = JSON.parse(movies)

for (i=0; i <data.length; i++) {
	$(".movies").append(`
		<div class="col-6 someMovie">
			<div class="card text-white bg-dark mb-3" style="max-width: 540px;">
	  			<div class="row no-gutters">
	    			<div class="col-md-4 p-2">
	      				<img src=${data[i].img} title="More info" class="card-img" class="btn btn-primary" data-toggle="modal" data-target="#information${i}">
	    			</div>
	    			<div class="col-md-8">
	     				<div class="card-body">
	        				<h5 class="card-title">${data[i].title}</h5>
	        				<p class="card-text"><small class="text-muted">${data[i].year}, ${data[i].genre}</small></p>
	        				<p class="card-text">${data[i].description}</p>
	        				<p id="${i}">
	        					<span>Likes</span>
	        					<span class="thumbsUp" title="Add like" class="btn btn-primary" data-toggle="modal" data-target="#information${i}">&#x1F44D</span>
	        					<span class="addOne" data-likes="${data[i].likes}">${data[i].likes}</span>
	        				</p>
	        				
							<div class="modal fade" id="information${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
							  <div class="modal-dialog modal-dialog-centered">
							    <div class="modal-content bg-dark">
							      <div class="modal-header">
							        <h5 class="modal-title" id="exampleModalLabel">${data[i].title} (${data[i].year})</h5>
							        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							          <span aria-hidden="true">&times;</span>
							        </button>
							      </div>
							      <div class="modal-body">
							      	<small class="text-muted">Starring: ${data[i].starring}</small>
							      	<br>
							       	${data[i].fullDescription}
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-secondary" data-dismiss="modal">Watch trailer</button>
							        <button type="button" class="btn btn-primary">Download movie</button>
							      </div>
							    </div>
							  </div>
							</div>

	        			</div>
	    			</div>
	  			</div>
			</div>
		</div>
		`);
};

$(document).ready(function(){
	$(".card-img").css("cursor", "pointer")
	$(".thumbsUp").css("cursor", "pointer")
	$(".thumbsUp").on("click", function(){
		var index = $(this).parent().attr("id");
		data[index].likes +=1;
		$(this).parent().find(".addOne").html(data[index].likes);
		$(this).hide();
	})
})

$(document).on("change", ".sorting", function() {
  var sortingMethod = $(this).val();
  
  if(sortingMethod == 'fewer') {
    sortMoviesFewerLikes();
  } else if (sortingMethod == 'most') {
    sortMoviesMostLikes();
  }
});

function sortMoviesMostLikes() {
  var sortMovies = $('.someMovie');

  sortMovies.sort(function(a, b) {
    return $('.addOne', b).data("likes") - $('.addOne', a).data("likes");
  });

  $(".movies").append(sortMovies);
}

function sortMoviesFewerLikes() {
  var sortMovies = $('.someMovie');

  sortMovies.sort(function(a, b) {
    return $('.addOne', a).data("likes") - $('.addOne', b).data("likes");
  });

  $(".movies").append(sortMovies);
}