var isMobile = false;
var flowerRadius = 60;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}
if(isMobile) {
    $("#splash_image").width($(window).width());
    $("#splash_image").height($(window).height());
    $("#splash_image").attr("src", "img/logos/mobile_splash.png");
    flowerRadius = 40;
    $("h1 a").css("font-size", "18px");
    $("#nav1").css("top", "12%");
    $("#nav1").css("left", "5%");
    $("#nav3").css("top", "31%");
    $("#nav3").css("right", "2%");
    $("#nav2").css("top", "72%");
    $("#nav2").css("left", "8%");
    $("#nav4").css("right", "7%");
    $("#nav4").css("top", "77%");
    $("#soundcloud_player").addClass("hidden");
    $("#social").addClass("hidden");
} else {
    //$("#text").width($("#splash_image").width());
    //$("#text").height($("#splash_image").height());
    $("#splash_image").height($(window).height());
    $("#splash_image").width($(window).width());
}
var about = $("#about");
var aboutColor = "#EEBBBB"; //BAA4A4
var aboutHtml = "#EEBBBB";
var locations = $("#locations");
var locColor = "#ecc3c9"; //new Color(0.9, 0.67, 0.7);
var locHtml = "#ecc3c9";
var directions = $("#directions");
var dirColor = "#F4DCDC";
var dirHtml = "#F4DCDC";
var schedule = $("#schedule");
var schedColor = "#efcfd3";
var schedHtml = "#efcfd3";
if(isMobile) {
    var size = "24px";
    about.css("font-size", size);
    schedule.css("font-size", size);
    directions.css("font-size", size);
    locations.css("font-size", size);
}
// var splash = new Raster("splash_image");
// splash.position = view.center;
var arrays = new Array(4);
arrays[0] = fullCircle(about, flowerRadius);
arrays[0][5].fillColor = aboutColor;
arrays[1] = fullCircle(locations, flowerRadius);
arrays[1][5].fillColor = locColor;
arrays[2] = fullCircle(schedule, flowerRadius);
arrays[2][5].fillColor = schedColor;
arrays[3] = fullCircle(directions, flowerRadius);
arrays[3][5].fillColor = dirColor;
$(window).resize(function() {
    $("#splash_image").height($(window).height());
    $("#splash_image").width($(window).width());
    redraw();
});
about.on("click", function() {
    arrays[0][6] = true;
    $("#text").fadeOut();
    $("#splash_image").fadeOut();
    $("#back").fadeIn(1500);
    $("#about_section").fadeIn(1000);
    setTimeout(function(){
        $("body").css("background-color", aboutHtml);}, 1000);
});
locations.on("click", function() {
    arrays[1][6] = true;
    $("#text").fadeOut();
    $("#splash_image").fadeOut();
    $("#back").fadeIn(2000);
    $("#locations_section").fadeIn(1500);
    setTimeout(function(){
        $("body").css("background-color", locHtml);}, 1000);
});
schedule.on("click", function() {
    
    arrays[2][6] = true;
    $("#text").fadeOut();
    $("#splash_image").fadeOut();
    $("#back").fadeIn(2500);
    $("#schedule_section").fadeIn(2000);
    setTimeout(function(){
        $("body").css("background-color", schedHtml);}, 1000);
});
directions.on("click", function() {
    arrays[3][6] = true;
    $("#text").fadeOut();
    $("#splash_image").fadeOut();
    $("#back").fadeIn(2500);
    $("#directions_section").fadeIn(2000);
    setTimeout(function(){
        $("body").css("background-color", dirHtml);}, 1000);
});

$("#back").on("click", function() {
    for(var i = 0; i < 4; i++) {
        arrays[i][6] = false;
    }
    $("#text").fadeIn();
    $("#splash_image").fadeIn();
    $("#directions_section").fadeOut();
    $("#about_section").fadeOut();
    $("#locations_section").fadeOut();
    $("#schedule_section").fadeOut();
    $("#back").fadeOut();
    
    $("body").css("background-color", "white");
    redraw();
});
var pages = pageCircles();
for(var i = 0; i < 4; i++) {
    arrays[i][7] = pages[i];
}
$(document).ready(function() {
    if(isMobile) {
        $("#back").css("top", "5px");
        $("#mobile_media").css("display", "initial");
    }
    $("#about_section").load("about.html");
    $("#locations_section").load("locations.html");
    if(isMobile) {
        $("#schedule_section").load("lineup_mobile.html");
    } else {
        $("#schedule_section").load("lineup.html");
    }
    $("#directions_section").load("directions.html", function() {
        $("#cover").fadeOut(1000);
        if(isMobile) {
            $("#directions_title").css("font-size", "48px");
            $(".padder").css("visibility", "visible");
            $("#past_vids").css("height", "300px");
        } else {
            $(".padder").css("visibility", "visible");
            $(".padder").css("text-align", "center");
            $(".top-pad").css("display", "none");
        }
    });
});
function makeCircle(start, radius, offset, strokes) {
   var vector = new Point(0, radius);
   var path = new Path();
    for(var i = 0;i<strokes;i++) {
        path.strokeColor = "white";
        path.lineTo(start);
        path.strokeColor = new Color(0.52,0.52,0.52);
        vector.angle = 360 * (i/strokes) + offset;
        vector.length = radius - (Math.random() * 2 - 1);
        if(Math.random()>0.1) {
           path.lineTo(start + vector); 
        }
        
    }
    var middle = new Shape.Circle(start, radius-8);
    middle.fillColor = new Color(1,1,1);
    return path;
}
function fullCircle(item, radius) {
    var arr = new Array(8);
    var start = new Point(item.offset().left + Math.floor(item.width()/2) - 5, item.offset().top + item.height()/2);
    if(!isMobile) {
        arr[0] = makeCircle(start, radius, 0, 140);
        arr[1] = makeCircle(start, radius - 10, 2, 90);
        arr[2] = makeCircle(start, radius - 20, 4, 60);
        arr[3] = makeCircle(start, Math.max(1, radius - 30), 6, 45);
        arr[4] = makeCircle(start, Math.max(1, radius - 40), 8, 30);
    } else {
        arr[0] = makeCircle(start, radius, 0, 90);
        arr[1] = makeCircle(start, radius - 10, 2, 60);
        arr[2] = makeCircle(start, radius - 20, 4, 45);
        arr[3] = new Shape.Circle(start, 0); 
        arr[4] = new Shape.Circle(start, 0);
    }
    
    arr[5] = new Shape.Circle(start, 0);
    arr[6] = false;
    return arr;
}
function pageCircles() {
    var arr = new Array(4);
    arr[0] = new Shape.Circle(getPoint(about), 0);
    arr[0].fillColor = aboutColor;
    arr[1] = new Shape.Circle(getPoint(locations), 0);
    arr[1].fillColor = locColor;
    arr[2] = new Shape.Circle(getPoint(schedule), 0);
    arr[2].fillColor = schedColor;
    arr[3] = new Shape.Circle(getPoint(directions), 0);
    arr[3].fillColor = dirColor;
    return arr;
}
function getPoint(item) {
    var start = new Point(item.offset().left + item.width()/2, item.offset().top + item.height()/2);
    return start;
}
function onFrame(event) {
    anim(about, arrays[0]);
    anim(locations, arrays[1]);
    anim(schedule, arrays[2]);
    anim(directions, arrays[3]);
}
function anim(element, arr) {
    var maxRadius = Math.max(70, element.width()/2 + 10);
    if(!arr[6]) {
        if(element.is(":hover")) {
            for(var i = 0; i<5;i++) {
                arr[i].rotate(Math.random() *10);
            }
            if(arr[5].radius < maxRadius) {
                arr[5].radius += 2;
            } 
        } else {
            var radius = arr[5].radius;
            radius = Math.max(0, radius-5);
            arr[5].radius = radius;
        }
        if(arr[7]) {
            arr[7].radius = Math.max(0, arr[7].radius-60);
        }
    } else {
        if(arr[7].radius < Math.max(view.size.width, view.size.height)) {
            arr[7].radius = Math.max(maxRadius, arr[7].radius+30);
        }
    }
}

function redraw() {
    if($("#back").css("display") === "none") {
        project.activeLayer.removeChildren();
        arrays[0] = fullCircle(about, flowerRadius);
        arrays[0][5].fillColor = aboutColor;
        arrays[1] = fullCircle(locations, flowerRadius);
        arrays[1][5].fillColor = locColor;
        arrays[2] = fullCircle(schedule, flowerRadius);
        arrays[2][5].fillColor = schedColor;
        arrays[3] = fullCircle(directions, flowerRadius);
        arrays[3][5].fillColor = dirColor;
        var pages = pageCircles();
        for(var i = 0; i < 4; i++) {
            arrays[i][7] = pages[i];
        }   
    } 
}
