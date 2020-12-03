const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3RyaXZlciIsImEiOiJja2k1dmFneGIzcGJ5MnpwNW42MzBpbTNvIn0.MILa3Gg9uLFpiBZhxmDFVw&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location servise',undefined)
        }else if(response.body.features.length === 0){
            callback('unable to find location',undefined)
        }else{
            const loc=response.body.features[0].geometry.coordinates
            data={
                latitude:loc[0],
                longitude:loc[1],
                location:response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports=geocode