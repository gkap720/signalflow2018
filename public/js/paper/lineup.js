

$("li.bio a").each(function(i, el) {
    $(this).on("click", function() {
        var first = $(this).text().substr(0, $(this).text().indexOf(" "));
        console.log(first + ".html");
        $("#html_here").load("bios/" + first + ".html", function(){
            $("#bio_content").modal();
            $(".modal-header .close").css({"font-size": "48px",
	            "position": "absolute",
	            "top": "5px",
	            "right": "5px"});
        });
    });
});


var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}
if(!isMobile) {
    $("#artist_name").css("font-size", "24px");
}
