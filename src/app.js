const path =require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//define paths for express config
const publicDirectory=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewpath);
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'CHIRANJIVEE',
        name:'weather app'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'chiranjivee'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Contact me at Facebook',
        name:'chiranjivee'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'cannot get weather without address'
        })
    }
    address=req.query.address
    geocode(address,(error,data={})=>{
        if(error){
            return res.send({
                error:'cannot find data of location'
            })
        }
        latitude=data.latitude
        longitude=data.longitude
        forecast(latitude,longitude,(error,forecast)=>{
            if(error){
                return res.send({error:'unable to find weather of location'});
            }
            res.send({
                forecast,
                data,
                address:address
            })
        })
        // res.send({
        //     data:data,
        //     address:address
        // })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'chiru',
        errorMessage:'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'chiru',
        errorMessage:'Page not found'
    });
});


app.listen(3000,()=>{
    console.log('server is out on port 3000')
})