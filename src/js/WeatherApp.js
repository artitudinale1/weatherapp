import '../css/master.scss';

var React = require('react');
var ReactDOM = require('react-dom');
import axios from 'axios';

var key = "1fe60543a42c59f47f736867e7b8b885";

var config = {
  initialLat: 0,
  initialLon: 0,
}

//GET DAY COMPONENT

var Day = React.createClass({
  render: function() {
    var d = new Date();
    var weekday= ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return (
      <div>
        <h3>{weekday[d.getDay()-1]}, {d.getDay()-1} {monthName[d.getMonth()]} {d.getFullYear()}</h3>
      </div>
    )
  }
});

//CLOCK COMPONENT
var Clock = React.createClass({
  setTime: function() {
    var d =new Date;
    var diem = "AM"
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
           if (h ==0){
            h = 12
           }   else if (h>12) {
            h = h - 12;
            diem = "PM";

           }

           if (h<10){
            h = "0" + h;

           }

           if (m<10){
            m = "0" + m;

           }

           if (s<10){
            s = "0" + s;

          }
          this.setState({
            h: h,
            m: m,
            s: s,
            diem: diem
          });
        },
          componentWillMount: function(){
  this.setTime();
},
componentDidMount: function(){
   window.setInterval(function () {
    this.setTime();
  }.bind(this), 1000);
},
    render: function(){
      return (
        <div>
            <h3>{this.state.h} : {this.state.m} :  {this.state.s} {this.state.diem}</h3>
        </div>
      )
  }
});

//TEMP UNIT COMPONENT
var GradeTemp = React.createClass({
  getInitialState: function() {
      return {
          isFarh: false
      };
  },
  changeGrade: function() {
      this.setState({
          isFarh: !this.state.isFarh
      })
  },

  render: function() {
        var isFarh = this.state.isFarh;
        var NewTemp = Math.round( (this.props.temp * 9)/5 + 32 );
        var sign = <span>&#8457;</span>
        if (!isFarh) {
          NewTemp = Math.round(this.props.temp);
          sign = <span>&#8451;</span>
        }
        return (
            <a href= "#"><h1 onClick={this.changeGrade}><strong >{NewTemp} {sign}</strong></h1></a>
        );

    }
});


//MAIN COMPONENT
var WeatherApp = React.createClass({
  getInitialState: function () {
    this.geolocationSearch
    return {
      lat: this.props.initialLat,
      lon: this.props.initialLon,
      location: '',
      temp: ' ',
      weather:  '',
      icon:     '',
    };
  },

  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  getData: function (location, lat, lon) {
    var data;
    if (location !== null)
    {
      data = axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&' + '&APPID=' + key)
    }
    else
    {
      data = axios.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&' + '&APPID=' + key)
    }

    return data = data;
  },

  updateState: function (locationName, lat, lon) {
    var bgDay = ['http://www.girolle.org/images/mountain8.jpg', // Clear Sky
              'https://phinphanatic.com/files/2015/09/cloudy_d-e618500.jpg', //Few Clouds
              'https://socalskywatch.files.wordpress.com/2012/07/20120712thp0329santee.jpg', //Scattered Cloouds
              'https://upload.wikimedia.org/wikipedia/commons/5/5b/Clouds_over_Africa.jpg',//Broken Clouds
              'https://tau0.files.wordpress.com/2014/09/montana_shower1.jpg',//Shower Rain
              'http://www.hercampus.com/sites/default/files/2016/02/12/635680854265070871-654912290_rainy-feature.jpg', //Rain
              'http://3.bp.blogspot.com/-pHv5T4iewKA/UaMN86nf4lI/AAAAAAAAAhg/G2JSWQNEfrU/s1600/1.png',//Thunderstorm
              'http://mysalesbriefcase.com/wp-content/uploads/2015/01/snow-day-5.jpg',//Snow
              'http://1.bp.blogspot.com/-8TCa3VaF2jk/TkH6nLwfmyI/AAAAAAAAClU/OsryTSA6rR4/s1600/mist.jpg',//Mist
              ]
  var bgNight = ['http://www.walldevil.com/wallpapers/a57/sky-moon-night-star.jpg', // Clear Sky
           'http://1.bp.blogspot.com/-rlzutq8g4M0/Ty3MtJdgLRI/AAAAAAAAA38/IlN1ZcLGxqU/s1600/DSC_0294.jpg',//Few Clouds
            'http://wnnewdesign.jaybirdgroup.net/static/img/backgrounds/cloudy-mc-night.jpg',  //Scattered Cloouds
            'https://s-media-cache-ak0.pinimg.com/originals/65/0c/50/650c50771c7c41e38240fcd75824f11b.jpg',//Broken Clouds
            'https://i.ytimg.com/vi/I-reEErtJKo/maxresdefault.jpg',// Shower Rain
            'https://i.ytimg.com/vi/q76bMs-NwRk/maxresdefault.jpg',//Rain
            'https://i.ytimg.com/vi/lxSzLIbhB_A/maxresdefault.jpg',//Thunderstorm
            'https://wallpaperscraft.com/image/field_trees_snow_winter_night_6368_3840x2160.jpg',//Snow
            'https://upload.wikimedia.org/wikipedia/commons/8/8d/Foggy_night_at_Pikisaari,_Tornio,_Finland,_2015_May_-_3.jpg'//Mist
          ]
    this.getData(locationName, lat, lon)
      .then(function(data) {
        this.setState({
          lat:      data.data.coord.lat,
          lon:      data.data.coord.lon,
          weather:  this.capitalizeFirstLetter( data.data.weather[0].description ),
          location: data.data.name,
          country: data.data.sys.country,
          icon:     'http://openweathermap.org/img/w/' + data.data.weather[0].icon + '.png',
          temp: Math.round(data.data.main.temp)
        } , function(){
          var numImg = data.data.weather[0].icon.substring(0,data.data.weather[0].icon.length -1);
          var bgContainer = document.body
          numImg = '50'
         if(data.data.weather[0].icon.substring(2,data.data.weather[0].icon.length) == 'd'){
              document.getElementById('container').style.backgroundColor = 'rgba(255,255,0,0.3)';
              document.getElementById('container').style.color = '#000000';

              switch (numImg){
                case '01':
                  bgContainer.style.backgroundImage = "url('" + bgDay[0] + "')";
                break;
                case '02':
                  bgContainer.style.backgroundImage = "url('" + bgDay[1] + "')";
                break;
                case '03':
                  bgContainer.style.backgroundImage = "url('" + bgDay[2] + "')";
                break;
                case '04':
                  bgContainer.style.backgroundImage = "url('" + bgDay[3] + "')";
                break;
                case '09':
                  bgContainer.style.backgroundImage = "url('" + bgDay[4] + "')";
                break;
                case '10':
                  bgContainer.style.backgroundImage = "url('" + bgDay[5] + "')";
                break;
                case '11':
                  bgContainer.style.backgroundImage = "url('" + bgDay[6] + "')";
                break;
                case '13':
                  bgContainer.style.backgroundImage = "url('" + bgDay[7] + "')";
                break;
                case '50':
                  bgContainer.style.backgroundImage = "url('" + bgDay[8] + "')";
                break;

                default:
                  bgContainer.style.background = "yellow"
              }

          }else{
            document.getElementById('container').style.backgroundColor = 'rgba(0,0,255,0.3)';
            document.getElementById('container').style.color = '#ffffff';
            switch (numImg){
              case '01':
                bgContainer.style.backgroundImage = "url('" + bgNight[0] + "')";
              break;
              case '02':
                bgContainer.style.backgroundImage = "url('" + bgNight[1] + "')";
              break;
              case '03':
                bgContainer.style.backgroundImage = "url('" + bgNight[2] + "')";
              break;
              case '04':
                bgContainer.style.backgroundImage = "url('" + bgNight[3] + "')";
              break;
              case '09':
                bgContainer.style.backgroundImage = "url('" + bgNight[4] + "')";
              break;
              case '10':
                bgContainer.style.backgroundImage = "url('" + bgNight[5] + "')";
              break;
              case '11':
                bgContainer.style.backgroundImage = "url('" + bgNight[6] + "')";
              break;
              case '13':
                bgContainer.style.backgroundImage = "url('" + bgNight[7] + "')";
              break;
              case '50':
                bgContainer.style.backgroundImage = "url('" + bgNight[8] + "')";
              break;

              default:
                bgContainer.style.background = "blue"
            }

                }
          });

      }.bind(this));
  },

  geolocationSearch: function () {
    var success = function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      this.updateState(null, lat, lon);

    }.bind(this);

    var error = function (error) {
      if (error.message == 'User denied Geolocation')
      {
        alert('Please enable location services' + error.message );
      }else {
        alert(error.message)
      }
    };

    navigator.geolocation.getCurrentPosition(success, error);
  },

  componentDidMount: function () {
    this.updateState(null, this.state.lat, this.state.lon);
  },
  render: function() {
    return (
      <div id="app">
        <div id="app__interface">
            <WeatherDetails location={this.state.location} weather={this.state.weather} temp={this.state.temp} icon={this.state.icon} country={this.state.country} />
          </div>
        </div>
    );
  }
});


var WeatherDetails = React.createClass({
  render: function() {
    return (
      <div className="panel-heading weather" id="container">
        <Day/>
        <Clock />
        <h2 className="text-muted"><strong>{this.props.location}</strong>, <strong>{this.props.country} </strong></h2>
        <GradeTemp temp={this.props.temp}/>
        <h2 className="text-muted">{this.props.weather}</h2>
        <div className="weather__icon">
        <img src={this.props.icon} />
        </div>
      </div>
    )
  }

});

ReactDOM.render(
  <WeatherApp initialLat={config.initialLat} initialLon={config.initialLon}/>, document.getElementById('app')
);
