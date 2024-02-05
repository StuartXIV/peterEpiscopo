const OVERRIDE_LOGIN = false
const VALID_PASSWORDS = ['luke','sam','peter']

  // Run the code after the page has loaded
//   window.addEventListener('load', function() {
//     // Get all elements with class .make-available
//     var elements = document.querySelectorAll('.bg-red');

//     var arrUnavailable = []

//     // Loop through each element and change its class to .make-unavailable
//     elements.forEach(function(element) {
//       element.classList.remove('bg-red');
//       element.classList.remove('make-unavailable');
//       element.classList.add('make-unavailable');
//       arrUnavailable.push(element.id)
//     });

//     console.log(arrUnavailable)
//   });

// Wrap the code within window.onload event listener
window.onload = function() {

  // Remove .html from URL
  if (window.location.href.endsWith('.html')) {
    window.location.href = window.location.href.slice(0, -5); // Remove the last 5 characters (".html")
  }  

  //Get Calendar data
  getData();


  };

// ---------------------------------------------------* GET ALL DATA *--------------------------------------------------- //
function getData(){

  // resetTables();
  // resetArrays();
  // getAllDepartments();
  // getLocations();
  $.ajax(
      {
      url: "php/getAll.php",
      type: 'POST',
      dataType: 'json',
      
      success: function(result) {
          //console.log(JSON.stringify(result));

          if (result.status.name == "ok") {                
              let arr = result['data'];

              arr.forEach(calendarDate => {
                var element = document.getElementById(calendarDate.fieldId);
                
                // If date is RED
                if (calendarDate.status === 'make-available'){

                  element.classList.remove('bg-orange');
                  element.classList.remove('make-unavailable');

                  element.classList.add('make-available');
                  element.classList.add('bg-red');

                // If date is BLANK
                }  else if (calendarDate.status === 'make-2hourmax'){

                  element.classList.remove('bg-red');
                  element.classList.remove('make-available');
                  element.classList.add('make-2hourmax');

                // If date is ORANGE
                } else if (calendarDate.status === 'make-unavailable'){

                  element.classList.remove('make-2hourmax');
                  element.classList.add('make-unavailable');
                  element.classList.add('bg-orange');

                } else if (calendarDate.status === 'past'){     

                  element.classList.remove('bg-red');
                  element.classList.remove('make-unavailable');
                  element.classList.remove('bg-orange');
                  element.classList.remove('make-available');
                  element.classList.remove('make-2hourmax');
                  element.classList.add('disable');
                  element.classList.add('bg-grey');

                }
              })

            
              // setTimeout(() =>{     
              //     updateDatalist();
              //     addLocationOptionsToSelect();
              // }, 2000)   
          }
      //checkOpenTab();        
      },

      error: function(jqXHR, textStatus, errorThrown) {
          console.log('Error');
      }
  });     
}

  
 // Get all elements with the class "make-unavailable"
var available_elements = document.querySelectorAll('.click');

// Loop through each element and add a click event listener
available_elements.forEach(function(element) {
  element.addEventListener('click', function() {

        // Manage class
    const elementCurrentClass = element.classList[1]

    console.log(elementCurrentClass)

    if (elementCurrentClass === 'disable') return;

    switch (elementCurrentClass){
      case 'make-available':
        elementNewClass = 'make-2hourmax';
        break;
      case 'make-2hourmax':
        elementNewClass = 'make-unavailable';
        break;
        case 'make-unavailable':
        elementNewClass = 'make-available';
        break;
      default:
          return;

    }

    // Name of admin who made the edit
    var updatedBy = document.getElementById('passwordInput').value.toLowerCase()

    // Log the ID of the clicked element
    sendData(element.id, elementNewClass, formatDateToYYYYMMDD(new Date()), updatedBy)

    console.log('Element details', {
      fieldId: element.id,
      class: element.classList[0]
    });
  });
});


// Add Employee to Database
function sendData(fieldId, status, lastUpdated, updatedBy){

  //console.log('Password is your first name')

  // PASSWORD CHECK
  var password = document.getElementById('passwordInput').value

  if (!VALID_PASSWORDS.includes(password.toLowerCase()) && !OVERRIDE_LOGIN){
    alert('Login is required in order to make changes.\nADMIN: use Setlist Helper password.')
    return false;
  } else {
    console.log('oy')
  }

  console.log('sendData()', lastUpdated);
  return $.ajax({  
      type: 'POST',
      url: 'php/updateCalendar.php', 
      data: { 
          fieldId: fieldId,
          status: status,
          lastUpdated: lastUpdated,
          updatedBy: updatedBy
       },
      success: function(result){
        console.log('Success!', result)
        getData()

    

          // $('#alert-success-employee').html(`<b>${capitalize(last_name.toLowerCase())} ${capitalize(first_name.toLowerCase())}</b> succesfully added to Personnel!`);
          // getData();
          // $('#addEmployeeModal').modal('hide');
          // setTimeout(()=> {      
          //     $('#alert-success-employee').css('opacity', "1");
          //     setTimeout(() => {            
          //         $('#alert-success-employee').css('opacity', "0");
          //     }, 2000);
          // }, 500)
          //window.location.reload()
      }
  });
}

// Format text
function capitalize(str){

  const arr = str.split(" ");


  for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }

  const str2 = arr.join(" ");

  return str2;
}

// Format Date object ot YYYY-MM-DD
function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function validatePassword() {
  var passwordInput = document.getElementById('passwordInput');

  if (VALID_PASSWORDS.includes(passwordInput.value.toLowerCase())) {    
    passwordInput.style.display = 'none';
    var newDiv = document.createElement('div')
    newDiv.textContent = 'Logged in'
    newDiv.className = 'loggedin'
    newDiv.className = 'form-control'

    var passwordContainer = document.getElementById('password-container')
    newDiv.style.color = 'green';
    passwordContainer.appendChild(newDiv)
  }
}
