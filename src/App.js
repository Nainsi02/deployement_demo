import React,{useState} from 'react';
import axios from 'axios'
function App(){


    const [data,setData]=useState({})
    const[location,setLocation]=useState('');
    const[errorMsg,setErrorMsg]=useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=1afd7c273c14ef6e3ab220e60fd46db6`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
          axios.get(url).then((response) => {
            setData(response.data)
            // console.log(response.data)
          }).catch(function (error){
              setErrorMsg(error.toJSON().message)
          })
          setLocation('')
        }
      }
    return(
        <div className="app">
            <div className="search">
             <input
             value={location}
             onChange={event => setLocation(event.target.value)}
             placeholder="Enter Location"
             onKeyPress={searchLocation}
             type="text"
             />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">


                         {data.name ? <p>{data.name}</p> : <p className="error">{errorMsg}</p>}

                    </div>
                    <div className="temp">
                          {data.main ? <h1>{((data.main.temp-32) / 1.8).toFixed()}°c</h1> : null}
                    </div>
                    <div className="discription">
                          {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>

                </div>
                {data.name !== undefined &&


               <div className="bottom">
                     <div className="feels">
                        {data.main ? <p className='bold'>{((data.main.feels_like - 32) / 1.8).toFixed()}°c</p> : null}
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                         <p>Wind Speed</p>
                    </div>

                </div>}

               

            </div>
        </div>
    );
}

export default App;