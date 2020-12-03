const request=require('request')

const forecast=(lat,lon,callback)=>{
    lat=lat.toString()
    lon=lon.toString()
    const url='http://api.weatherstack.com/current?access_key=d0bd3e4820a1123345e1bc6c287699cc&query='+lon+','+lat+'&units=s'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }else if(response.body.error){
            callback('unale to find location',undefined)
        }else{
            const data=response.body;
            const forecast={
                weather:'it is currently '+data.current.weather_descriptions[0]+' the current temperature is '+data.current.temperature+' in kelvin scale'
            }
            callback(undefined,forecast)
        }
    })

}

module.exports=forecast