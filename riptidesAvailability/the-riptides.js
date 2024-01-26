

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

    // Array of element IDs
    var unavailableDates = [
        "date2024-04-3",
        "date2024-04-20",
        "date2024-04-27",
      "date2024-05-25",
      "date2024-05-27",
      "date2024-05-31",
      "date2024-06-1",
      "date2024-06-15",
      "date2024-06-29",
      "date2024-07-6",
      "date2024-07-20",
      "date2024-07-27",
      "date2024-08-1",
      "date2024-08-3",
      "date2024-08-10",
      "date2024-08-17",
      "date2024-08-19",
      "date2024-08-22",
      "date2024-08-31",
      "date2024-09-4",
      "date2024-09-7",
      "date2024-09-21",
      "date2024-10-26",
      "date2024-11-1",
      "date2024-12-15",
      "date2024-12-24",
      "date2024-12-25",
      "date2024-12-26",
      "date2024-12-28",
      "date2024-12-31",
      "date2025-07-2",
      'date2024-12-24',
      'date2024-12-25',
      'date2024-12-26',
      'date2024-12-31'
    ];
  
    // Iterate over the array of element IDs
    unavailableDates.forEach(function(elementId) {
      // Get the element by its ID
      var element = document.getElementById(elementId);
      
      // Check if the element exists
      if (element) {
        // Remove class 'make-unavailable' if it exists
        element.classList.remove('make-unavailable');
        // Add class 'bg-red' and 'make-available'
        element.classList.add('bg-red', 'make-available');
      }
    });

    
    // Array of element IDs
    var twohourRadiusDates = [
        "date2024-06-22",
        "date2024-06-8",
        "date2024-06-1",
        "date2024-07-13",
        "date2024-08-24",
        "date2024-09-14",
        "date2024-09-28",
        "date2024-10-5",
        "date2024-12-21",
        'date2024-10-12',
        'date2024-05-11',
        'date2024-05-18',
        'date2024-04-5',
        'date2024-04-12',
        'date2024-04-19',
        'date2024-04-26',
        'date2024-05-3',
        'date2024-05-10',
        'date2024-05-17',
        'date2024-05-24',
        'date2024-05-31',
        'date2024-06-7',
        'date2024-06-14',
        'date2024-06-21',
        'date2024-06-28',
        'date2024-07-5',
        'date2024-07-12',
        'date2024-07-19',
        'date2024-07-26',
        'date2024-08-2',
        'date2024-08-9',
        'date2024-08-16',
        'date2024-08-23',
        'date2024-08-30',
        'date2024-09-6',
        'date2024-09-13',
        'date2024-09-20',
        'date2024-09-27'        
    ];
  
    // Iterate over the array of element IDs
    twohourRadiusDates.forEach(function(elementId) {
      // Get the element by its ID
      var element = document.getElementById(elementId);
      
      if (element) {
        element.classList.remove('make-unavailable');
        element.classList.add('bg-orange', 'make-available');
      }
    });
  };

  
 // Get all elements with the class "make-unavailable"
var available_elements = document.querySelectorAll('.make-unavailable');

// Loop through each element and add a click event listener
available_elements.forEach(function(element) {
  element.addEventListener('click', function() {
    // Log the ID of the clicked element
    console.log(element.id);
  });
});
