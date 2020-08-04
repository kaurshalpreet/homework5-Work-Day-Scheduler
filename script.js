

$(document).ready(function() {

    // Declaring variables for the current day displayed on top of the calender using "https://momentjs.com/"
    var currentDay = $("#currentDay");
    var dayDisplay = moment().format('dddd, MMMM Do YYYY');

     // creating a blank array to store the plans
     var textInputArray = [];

    currentDay.text(dayDisplay);

    var currentHour = moment().format('H');

    // Array for the working time slots
    var rowArr =["9 AM", "10 AM", "11 AM", "12 AM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

    // This function retrieves the stored data from the local storage and saves it in textInputArray. If we do not put this function, the array would become blank each time we load the page.
    init();

    function init() {
        // Parsing the JSON string to an object
        var storedData = JSON.parse(localStorage.getItem("StoredPlans"));
      
            // If stored data were retrieved from localStorage, update the textInputArray.
            if (storedData !== null) {
            textInputArray = storedData;
            console.log(textInputArray)
            }
        }

    /********************************************************************************************/

        // This function when called will store the text in an array in the input box in local storage.
    function storeTextEntered() {
            localStorage.setItem("StoredPlans", JSON.stringify(textInputArray));
    }

    /********************************************************************************************/

    // forEach  loop for creating rows for every working hour
        rowArr.forEach( function(element, index) {
       
        var tRow = $("<tr>");   
        var timeData = $("<td>").text(element);
        var textData = $("<input>");
        var saveData = $("<button>");

        // added classes to each element of the row 
        tRow.addClass("row");
        timeData.addClass("hour");
        textData.addClass("textarea");
        saveData.addClass("saveBtn fas fa-save");
        
        // This code converts hours in the array into a 24-hour system
        var currentHourT = parseInt(currentHour);
        if (element.includes("PM")) {
            var elementT = parseInt(element)+12;
        } else{
                elementT = parseInt(element);
        }
        
            console.log(currentHourT);
            console.log(elementT)
        
        // Asigning colors to the text area according to time of the day
        if (currentHourT > elementT) {
            textData.addClass("past");
        }
        else if (currentHourT < elementT) {
            textData.addClass("future");
        }
        else  if (currentHourT === elementT) {
            textData.addClass("present");
        }


        // to render the saved plans on screen refresh
        textData.val( textInputArray[index] );


        tRow.append(timeData, textData, saveData);
        $(".container").append(tRow);

        // On clicking the save button saves the input value to the array and then to the local storage 
        saveData.on("click", function(event){
            event.preventDefault();
        
            var textEntered = textData.val();
            
        
            textInputArray[index] = textEntered;
            console.log(textInputArray);

         storeTextEntered();
        })
    });
       
    /**************************************************************************************/
    
});


