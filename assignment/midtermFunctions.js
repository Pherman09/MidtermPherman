/* ================================
Week 7
================================ */
//chartjs.org

//Map Setup from Week4 Lab 2``
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//Reset map
var resetMap = function() {
  _.each(myMarkers,function(mark){
    map.removeLayer(mark);
  });
  myMarkers = [];
};

//Calling JSON data
var data = schools;

//Filter for slide 1, all open schools
var slide1Filter = function(ob){
  return ob.properties.ACTIVE === "Open";
};

//Filter for slide 2, all schools in 19141 zip code
var slide2Filter = function(ob){
  return ob.properties.ACTIVE != "Open";
};

//Filter for slide 3, all schools in 19141 zip code
var slide3Filter = function(ob){
  return ob.properties.Zip === "19148";
};

//Generic function for changing the slide of a map
var changeSlideMap = function(filtergeneric) {
  var dataArray = data.features;
  var filteredData = _.filter(dataArray, filtergeneric);
  _.each (filteredData, function(ob){
    var lat = ob.geometry.coordinates[1];
    var long = ob.geometry.coordinates[0];
    myMarkers.push(L.marker([lat,long]));
  });
  _.each(myMarkers, function(mark){
    mark.addTo(map);
  });
};

var myMarkers = [];

//Transitions to slide  by hiding all slides, then showing slide of number "number"
var callSlide = function(number) {
  var slideNo = number.toString(); //From w3Schools
  var slideID = "#slide" + slideNo; //this is the slide ID in HTML
  $('.slide').hide();
  $(slideID).show();
  //Include code here to hide back button if "number" = 1, and hide next button if "number" = that of the last slide
};

//This function adds the initial slide to map, and is called automatically
$(document).ready(function(){
  resetMap();
  changeSlideMap(slide1Filter);
  callSlide(1);
});


//On Click of Button "next slide", this function pulls up the next slide
var nextSlide = function(){
  if ($('#slide1').is(":visible") === true) {
    //First the function calls up which slide is visible, if it's slide 1, go to slide 2
    //This line of code taken from stack overflow thread "Checking if an element is hidden"
    callSlide(2); //changes the slide text to Slide 2's text
    resetMap();
    changeSlideMap(slide2Filter); //changes the slide's map to reflect slide 2
  }
  else if ($('#slide2').is(":visible") === true) {
    callSlide(3);
    resetMap();
    changeSlideMap(slide3Filter);
  } else {
    console.log("no more slides");
  } //final slide
};

//On click of button "previous", this function pulls up the previous slide
//THe same as the nextSlide Function, but in reverse!
var prevSlide = function(){
  if ($('#slide2').is(":visible") === true) { //if current slide is Slide2
    callSlide(1); //changes the slide text to Slide 1's text
    resetMap();
    changeSlideMap(slide1Filter); //changes the slide's map to reflect slide 1
  }
  else if ($('#slide3').is(":visible") === true) {
    callSlide(2);
    resetMap();
    changeSlideMap(slide2Filter);
  } else {
    console.log("no more dang slides");
  } //final slide
};

/*
//Each Slide will have a filter, displaying only the relevant schools for that slide:
//In this slide, all of the schools with more than 100 violent incidents in a year are shown
var S1Filter = function(feature: object) { return: bool};
var S2Filter = function(feature: object) { return: bool};
var S3Filter = function(feature: object) { return: bool};
//one for each slide

//Every silde will have a style,
var S1Style = function(feature : object) { return: {CSSStyleObject: 'string'}};
var S2Style = function(feature : object) { return: {CSSStyleObject: 'string'}};
var S3Style = function(feature : object) { return: {CSSStyleObject: 'string'}};
//One for each slide

//This function adds the initial slide to map, and is called automatically
$(document).ready(function(Data: JSON, Filter: bool, Style: Object){});

//This function is just like the function above, but adds the slide called to the map
var changeSlideMap = function(Data: JSON, Filter: bool, Style: Object){});

//Transitions to slide  by hiding all slides, then showing slide of number "number"
var callSlide = function(number) {
  var slideID = "#slide" + string(number); //this is the slide ID in HTML
  $('.slide').hide();
  $(slideID).show();
  //Include code here to hide back button if "number" = 1, and hide next button if "number" = that of the last slide
};

//On Click of Button "next slide", this function pulls up the next slide
var nextSlide = function(){
  if ($('#slide1').is(":visible") === true) {
    //First the function calls up which slide is visible, if it's slide 1, go to slide 2
    //This line of code taken from stack overflow thread "Checking if an element is hidden"
    callSlide(2); //changes the slide text to Slide 2's text
    changeSlideMap(data, S2Filter, S2Style); //changes the slide's map to reflect slide 2
  }
  else if ($('#slide2').is(":visible") === true) {
    callSlide(3);
    changeSlideMap(data, S3Filter, S3Style);
  } else {
  console.log("no more slides")
} //final slide
}

//On click of button "previous", this function pulls up the previous slide
//THe same as the nextSlide Function, but in reverse!
var prevSlide = function(){
  if ($('#slide2').is(":visible") === true) { //if current slide is Slide2
    callSlide(1); //changes the slide text to Slide 1's text
    changeSlideMap(data, S1Filter, S1Style); //changes the slide's map to reflect slide 1
  }
  else if ($('#slide3').is(":visible") === true) {
    callSlide(2);
    changeSlideMap(data, S2Filter, S2Style);
  } else {} //final slide
}
*/
