/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ''; // Personal API key for OpenWeatherMap API 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)  + "/" + d.getDate() + "/" + d.getFullYear();


// Event Listener to add function to HTML element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
// api call
getWeather(baseURL, newZip, apiKey) 
// chain promises
.then(function(weatherData) {
    // Add data to POST request  
    postWeather('/addWeatherData', {date:newDate, temp:weatherData.main.temp, feeling:feeling});
})
// call update UI
.then(()=>
    updateUI()
 );
}
// Function to get Web API data
const getWeather = async(baseURL, newZip, apiKey)=>{
    
    const response = await fetch(`${baseURL}${newZip}${apiKey}`)
    try {
        const receivedData = await response.json();
        return receivedData;
      //  console.log(temp); //test
            
    } catch(error) {
        console.log("error", error);
        // appropriately handle error        
    }
}

/* Function to POST data */
const postWeather = async(url='', data ={})=>{
    
    const response = await fetch (url, {
        method: 'POST', // GET, POST, PUT, DELETE, tec.
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },  
        // create JSON string from a JavaScript object
        body:JSON.stringify(data)
        });  
    try {   
        const returnedData = await response.json();
        return returnedData;
    }catch(error) {
    console.log("error", error);
    }
};

// Function to Update UI
const updateUI = async()=>{    
    try {
        const request = await fetch('/all'); 
        
        // Transform into JSON
        const updatedData = await request.json();
        
//update elements with the received data
document.getElementById('date').innerHTML = updatedData.date;
document.getElementById('temp').innerHTML = Math.round(updatedData.temp)+ 'degrees';
document.getElementById('content').innerHTML = updatedData.content;

    }catch (error) {
        console.log("error", error);
       
      };
    };
