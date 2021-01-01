const fileInput = document.getElementById('dataFileUpload');
fileInput.addEventListener('change', readJson);
var jsonData;

function readJson() {
  updateInputPara(fileInput.files[0].name);
  var reader = new FileReader();
  var file = fileInput.files[0];

  reader.onload = function() {
    readerCallback(reader.result);
  }

  reader.readAsText(file);
}

function updateInputPara(fileName) {
  var str = "File Selected: <br>" + fileName;
  document.getElementById('dataFileName').innerHTML = str;
}

function readerCallback(data) {
  jsonData = JSON.parse(data);
  /* var string = "";

  for (var i = 0; i < jsonData.mock_data.length; i++) {
    string += "<b> Time Stamp (UTC): </b>" + jsonData.mock_data[i].TimeStampDate + "<b> Altitude (m): </b>" + jsonData.mock_data[i].AltitudeQnh_meters +
              "<b> AirSpeed (knots): </b>" + jsonData.mock_data[i].AirSpeed_knots + "<b> Vertical Speed (m/s): </b>" + jsonData.mock_data[i].VerticalSpeed_ms +
              "<b> Normal Acceleration (g): </b>" + jsonData.mock_data[i].NormalAcceleration_g + "<b> Motor Power (v): </b>" + jsonData.mock_data[i].MotorPower_volts + "<br>";
  }
  document.getElementById('data').innerHTML = string; */
  createGraphs(jsonData);
}

function createGraphs(jsonData) {

  let timeSorted = [];
    for(var i = 0; i < jsonData.mock_data.length; i++) {
      timeSorted.push(moment.utc(jsonData.mock_data[i].TimeStampDate));
    }
    timeSorted.sort();



    // ******** Altitude Chart ******** //
  var altData = [];
  for(var j = 0; j < jsonData.mock_data.length; j++) {
    altData.push({t: timeSorted[j], y: jsonData.mock_data[j].AltitudeQnh_meters});
  }

let altitudeChart = document.getElementById("altitudeChart").getContext('2d');

var chartLabel = 'Altitude Qnh (meters)';

let altChart = new Chart(altitudeChart, {
  type: 'line',
  data: chartData(chartLabel, timeSorted, altData),
  options: chartOptions('Altitude Qnh (meters)')
});


    // ******** Air Speed Chart ******** //
var aSpdData = [];
for(var j = 0; j < jsonData.mock_data.length; j++) {
  aSpdData.push({t: timeSorted[j], y: jsonData.mock_data[j].AirSpeed_knots});
}

let airSpeedChart = document.getElementById("airSpeedChart").getContext('2d');

chartLabel = "Air Speed (knots)";

let aSpdChart = new Chart(airSpeedChart, {
  type: 'line',
  data: chartData(chartLabel, timeSorted, aSpdData),
  options: chartOptions('AirSpeed (knots)')
});


    // ******** Vertical AirSpeed Chart ******** //
var vSpdData = [];
for(var j = 0; j < jsonData.mock_data.length; j++) {
  vSpdData.push({t: timeSorted[j], y: jsonData.mock_data[j].VerticalSpeed_ms});
}

let vertSpeedChart = document.getElementById("vertSpeedChart").getContext('2d');
chartLabel = 'VerticalSpeed (ms)'

let vSpdChart = new Chart(vertSpeedChart, {
  type: 'line',
  data: chartData(chartLabel, timeSorted, vSpdData),
  options: chartOptions('Vertical Speed (ms)')
});


    // ******** Normal Acceleration Chart ******** //
var nAccelData = [];
for(var j = 0; j < jsonData.mock_data.length; j++) {
  nAccelData.push({t: timeSorted[j], y: jsonData.mock_data[j].NormalAcceleration_g});
}

let nAccelChart = document.getElementById("nAccelChart").getContext('2d');
chartLabel = 'Normal Acceleration (g)';

let nAccChart = new Chart(nAccelChart, {
  type: 'line',
  data: chartData(chartLabel, timeSorted, nAccelData),
  options: chartOptions(chartLabel)
});


    // ******** Motor Power Chart ******** //
var mPowerData = [];
for(var j = 0; j < jsonData.mock_data.length; j++) {
  mPowerData.push({t: timeSorted[j], y: jsonData.mock_data[j].MotorPower_volts});
}

let mPowerChart = document.getElementById("mPowerChart").getContext('2d');
chartLabel = 'Motor Power (volts)';

let mPwrChart = new Chart(mPowerChart, {
  type: 'line',
  data: chartData(chartLabel, timeSorted, mPowerData),
  options: chartOptions(chartLabel)
});

}

/*var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }); */

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function chartOptions(label) {

  var chOptions = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: label
        }
      }],
      xAxes: [{
        display: true,
        type: 'time',
      }]
    },
    legend: {
      postition: 'bottom',
      display: false
    }
  }

  return chOptions;
}

function chartData(label, x, y) {
  var chData = {
    labels: x,
    datasets: [{
      label: label,
      data: y,
      fill: false,
      borderColor: 'red',
      borderWidth: '0.5'
    }]
  }
  return chData;
}
