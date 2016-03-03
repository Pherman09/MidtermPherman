/* ================================
Week 7
================================ */
//chartjs.org

//Map Setup from Week4 Lab 2
var map = L.map('map', {
  center: [40.010454, -75.108772],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//Reset map function
var resetMap = function() {
  _.each(myMarkers,function(mark){
    map.removeLayer(mark);
  });
  myMarkers = [];
};

//Calling JSON data
var data = schools;

//Slide Object Array
var slideArray = [
  slideNum0 = {
    filterCon: function(ob){return ob.properties.ACTIVE === "Open";},
    slideText: "Slide 0 Text",
    slideTitle:"Slide 0 Title",
    pNum: 0,
    graphData: dataZero,
    graphfunc: function(canvasOb){new Chart(canvasOb).Doughnut(this.graphData);}, //w3schools "javascript function invocation"
    tablefunc: function(){$("#Wed").hide(); $("#Thu").hide();}
  },
  slideNum1 ={
    filterCon:  function(ob){return ob.properties.ACTIVE != "Open";},
    slideText: "Slide 1 Text",
    slideTitle:"Slide 1 Title",
    pNum: 1,
    graphData: dataOne,
    graphfunc:  function(canvasOb){new Chart(canvasOb).Doughnut(this.graphData);},
    tablefunc: function(){$("#Wed").show(); $("#Thu").show();}
  },
  slideNum2 ={
    filterCon:  function(ob){return ob.properties.Zip === "19148";},
    slideText: "Slide 2 Text",
    slideTitle:"Slide 2 Title",
    pNum: 2,
    graphData: dataTwo,
    graphfunc: function(canvasOb){new Chart(canvasOb).Bar(this.graphData);},
    tablefunc: function(){$("#Wed").show(); $("#Thu").hide();}
  }
];

//Generic function for changing the slide of a map
var changeSlide = function(number) {
  //get current slide from array of slides
  var slide = slideArray[number];

  //change value of slide to that of the current position in the slide array, helps with next and previous slide functions
  var slideNo = (slide.pNum).toString();
  $("#slide").val(slideNo);

  //change slide main text
  var newText = slide.slideText;
  $(".main").text(newText);

  //change slide title
  var newTitle = slide.slideTitle;
  $("#titleOfSlide").text(newTitle);

  //change what schools appear on map
  var theFilter = slide.filterCon;
  var dataArray = data.features;
  var filteredData = _.filter(dataArray, theFilter);
  _.each (filteredData, function(ob){
    var lat = ob.geometry.coordinates[1];
    var long = ob.geometry.coordinates[0];
    myMarkers.push(L.marker([lat,long]));
  });
  _.each(myMarkers, function(mark){
    mark.addTo(map);
  });

  //
  var ctx = $("#myChart").get(0).getContext("2d");
  var slideGraphData = slide.graphData;
  var slideChart = slide.graphfunc(ctx); //chart making method from chartjs documentation

  var changeLegend = slide.tablefunc();

  if (slideNo === "0"){
    $('#prevslide').hide();
  } else { //LAST SLLIDE IF ELSE
    $('#prevslide').show();
  }

};

var myMarkers = [];

//This function adds the initial slide to map, and is called automatically
$(document).ready(function(){
  resetMap();
  changeSlide(0);
});

//This function moves to the next slide
$('#nextslide').click(function(){
  var currentSlide = Number($("#slide").val());
  resetMap();
  changeSlide(currentSlide + 1);
});

//This function moves to the previous slide
$('#prevslide').click(function(){
  var currentSlide = Number($("#slide").val());
  resetMap();
  changeSlide(currentSlide - 1);
});
