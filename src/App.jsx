import axios from 'axios';
import imm from './back-cloud.jpg'
import { useState } from "react";

export default function App() {

  const [data,setData]= useState({"coord":{"lon":88.3697,"lat":22.5697},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50d"},{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"base":"stations","main":{"temp":31.97,"feels_like":38.97,"temp_min":31.97,"temp_max":31.97,"pressure":998,"humidity":74,"sea_level":998,"grnd_level":997},"visibility":3500,"wind":{"speed":3.6,"deg":240},"rain":{"1h":0.6},"clouds":{"all":100},"dt":1719818001,"sys":{"type":1,"id":9114,"country":"IN","sunrise":1719789926,"sunset":1719838504},"timezone":19800,"id":1275004,"name":"Kolkata","cod":200});
  const [input,setInput]= useState('');
  const [ph,setPh]=useState(true);

  const handleFocus=()=>{
    setPh(false);
  }
  const handleBlur=()=>{
    setPh(true);
  }



  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=09dd97d467b99bf7bd59e76a10599a07`

  const searchLocation=(e)=>{

    if(e.key === 'Enter'){

    axios.get(url).then((res)=>{
      setData(res.data);
    })
  }
}
  
return (
  <>
    <div className="h-screen w-screen relative">
    <img src={imm} className="h-full w-full"></img>

    <div className="absolute top-0 min-w-full flex justify-center p-3">     
      <input type='text' onKeyDown={searchLocation} onChange={(e)=>{setInput(e.target.value)}} onFocus={handleFocus} onBlur={handleBlur} className="bg-gray-50 opacity-75 w-2/3 md:w-1/4 outline-none h-9 text-center rounded-full font-semibold" placeholder={ph ? "Enter Location" : ""}></input>
    </div>

    <div className='flex justify-center absolute top-32 right- h-2/3 w-full' id='second'>
    
    <div className='text-white pl-14 md:pl-0 text-shadow-lg w-full md:w-1/3 grid grid-cols-2 grid-rows-3'>
    <h1 className='col-span-2 text-6xl md:text-6xl'>{data.name}</h1>
    <h1 className='col-span-2 md:col-span-1'><span className=' text-4xl md:text-4xl'>{data.main?.temp}°C</span><br></br>
    <span className='text-sm md:text-xs'>feels like {data.main?.feels_like}°C</span>
    </h1>
    <h1 className=''>
    <span className='text-xl md:text-2xl'>Wind Speed: {data.wind?.speed}m/s</span><br></br>
    <span className='text-xl md:text-2xl'>Wind Direction: {data.wind?.deg}°</span>
    </h1>
    <h1 className='text-2xl md:text-3xl col-span-2 md:col-span-1'>Humidity: {data.main?.humidity}%</h1>
    <h1 className='text-2xl md:text-3xl'>Pressure: {data.main?.pressure}mb</h1>
    </div>
    </div>

    </div>

    
    </>
  
)
}