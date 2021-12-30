window.onload = function(){
    getData();
    $('#search-input').val('');    
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
        $(this).remove();
        });
        }
}

$('#show-all').on('click', () =>{
    getData();
    $('#search-input').val('');
})

let names = [];
let select_options = [];
let locations = [];
let employees = [];
let object_array = [];
let entries = 0;
let dropdown_active = false;


//DROPDOWN

let new_row;

function dropdown(id){
    if (new_row != id){        
        removeDropdown();
    }
    new_row = id;
    if (!dropdown_active){

        dropdown_active = true;

        object_array.forEach(employee => {
            if (employee.id == id){
                console.log("bing!");
                const row = document.createElement('tr');
                row.setAttribute('id', 'dropdown');
                // const text2 = document.createTextNode(department); 
                let dept_txt;  
                let location_txt; 
                select_options.forEach(dept => {
                    if (dept.id == employee.department){                        
                        dept_txt = document.createTextNode(`Department: ${dept.name}`);
                        locations.forEach(loc => {
                            if (loc.id == dept.locationID){
                                location_txt = document.createTextNode(`Location: ${loc.name}`);
                            }
                        })
                    }
                })
                const email_txt = document.createTextNode(`Email: ${employee.email}`);
                const cell1 = document.createElement('p');
                const cell3 = document.createElement('p');
                const cell2 = document.createElement('p');
                cell2.setAttribute('id', `location-dropdown${id}`);
                const link_email = document.createElement('a');
                link_email.setAttribute('id', `email-dropwdown${id}`);  
            
                link_email.setAttribute('href', `mailto:}`);
                link_email.setAttribute('target', `_blank`);
            
                cell3.appendChild(link_email);
                link_email.appendChild(email_txt);
            
                cell1.classList.add('col-xs-6');
                cell2.classList.add('col-xs-6');
            
                cell1.appendChild(dept_txt);
                cell2.appendChild(location_txt);
            
                row.appendChild(cell1);
                row.appendChild(cell2);
                row.appendChild(cell3);
            
                $(`#tr${id}`).after(row);
                $(`#tr${id}`).css('border-bottom', '0px solid white');
                setTimeout(()=>{
                    $('#dropdown').css('opacity', '1');            
                    $('#dropdown').css('transform', 'translateY(0)');
                }, 100)
            }
    })
}    

else {        
    $('#dropdown').css('opacity', '0');            
    $('#dropdown').css('transform', 'translateY(-20px)');
    setTimeout(()=>{            
        $('#dropdown').remove();        
        $(`#tr${id}`).css('border-bottom', '2px solid rgba(153, 153, 153, 0.238)');
    }, 100)
    dropdown_active = false;
} 
}


// Retrieve All Departments
function getAllDepartments(){

    $.ajax(
        {
        url: "php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {                
                let arr = result['data'];
                arr.forEach(element => {      
                    let id = element['id'];
                    let name = element['name'];
                    let location = element['locationID'];
                    let object = {
                        id: id,
                        name, name,
                        locationID: location
                    }              
                    // Check object exists in array
                    if (!select_options.some(e => e.id === id)) {
                        select_options.push(object);
                      } 
                })
                setTimeout(() => {
                    $select1 = $('#department-search');
                    $select2 = $('#department-edit');
                    $select3 = $('#department-add');
                    updateSelect($select1, "any");
                    updateSelect($select2);
                    updateSelect($select3);
                }, 1000)
            }        
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });     
}


// GET LOCATIONS

function getLocations(){
    $.ajax(
        {
        url: "php/getLocationByID.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {                
                let arr = result['data'];
                arr.forEach(location => {
                    locations.push(location);
                })        
            }        
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });     
}


// Retrieve Employees from Database
function getData(){
    console.log("getData()");
    $('#tbody').html('');
    resetArrays();
    getAllDepartments();
    getLocations();
    $.ajax(
        {
        url: "php/getData.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            //console.log(JSON.stringify(result));

            if (result.status.name == "ok") {                
                let arr = result['data'];
                arr.forEach(element => {   
                    let id = element['id'];
                    let first_name = element['firstName'];
                    let last_name = element['lastName'];
                    let department = element['departmentID'];   
                    let email = element['email'];   
                    let employee = {    /////// MAYBE A SHORTCUT WOULD BE BETTER(push.(element))
                        id: id,
                        firstName: first_name,
                        lastName: last_name,
                        department: department,
                        email: email
                    }   
                    let joined = first_name.toLowerCase() + last_name.toLowerCase();                      
                    first_name = capitalize(first_name); // WATCH OUT!!!            
                    entries++;     
                    
    
                    object_array.push(employee);
                    addTableRow(employee, null, joined);    
                    if(!names.includes(first_name)){names.push(first_name)}; // MAYBE DELETE                           
                    }
                )
                setTimeout(() =>{     
                    updateDatalist();
                }, 2000)   
            }        
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });     
}

function addTableRow(employee, value = null, joined){

 if (object_array.length > 0){
    let id = employee.id;
    
    $('#entries').html(entries + " Entries");
    if (joined){employees.push(joined)};
    const row = document.createElement('tr');   
    row.setAttribute("id", `tr${id}`);       
    const text1 = document.createTextNode(capitalize(employee.firstName) + " " + capitalize(employee.lastName));
    // const text2 = document.createTextNode(department);    
    const text5 = document.createTextNode(employee.email);
    // const text3 = document.createTextNode("EDIT");                
    // const text4 = document.createTextNode("DELETE");

    const text3 = document.createElement('img');
    const text4 = document.createElement('img');
    text3.setAttribute('src', 'images/edit.svg');
    text3.classList.add('btn-icon');    
    text4.setAttribute('src', './images/bin.svg');
    text4.classList.add('btn-icon');

    const cell1 = document.createElement('td');    
    cell1.classList.add('cell-name');    
    cell1.setAttribute('id', `name${id}`);    
    cell1.setAttribute("onclick", `dropdown(${id})`);
    const arrow = document.createElement('img');    
    arrow.setAttribute('src', 'images/down-arrow.svg'); 
    arrow.classList.add('arrow'); 
    const cell2 = document.createElement('td');
    cell2.setAttribute('id', `department${id}`);
    cell2.classList.add('dept');    
    const cell3 = document.createElement('td');
    
    cell3.classList.add('email');
    const cell4 = document.createElement('td');
    const edit_btn = document.createElement('button');
    const delete_btn = document.createElement('button');
    const link_edit = document.createElement('a');
    const link_delete = document.createElement('a');
    const link_email = document.createElement('a');
    link_email.setAttribute('id', `email${id}`);  

    link_edit.classList.add('edit');
    link_edit.setAttribute('href', '#editEmployeeModal');
    link_edit.setAttribute('data-toggle', 'modal');

    link_delete.classList.add('delete');
    link_delete.setAttribute('href', '#deleteEmployeeModal');
    link_delete.setAttribute('data-toggle', 'modal');

    link_email.setAttribute('href', `mailto:${employee.email}`);
    link_email.setAttribute('target', `_blank`);

    edit_btn.classList.add('btn');
    edit_btn.classList.add('btn-info');
    edit_btn.appendChild(text3);    
    edit_btn.setAttribute('onclick', `getEditData(${id})`);
    
    delete_btn.classList.add('btn');
    delete_btn.classList.add('btn-danger');
    delete_btn.appendChild(text4);
    delete_btn.setAttribute('onclick', `selectedEmployee(${id})`);

    
    cell1.appendChild(arrow);
    cell1.appendChild(text1);
    cell3.appendChild(link_email);
    link_email.appendChild(text5);

    cell1.classList.add('col-xs-3');
    cell3.classList.add('col-xs-3');
    cell3.classList.add('col-xs-3');
    cell4.classList.add('col-xs-3');
    cell4.classList.add('buttons-container');
    cell4.classList.add('text-center');

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    cell4.appendChild(link_edit);
    cell4.appendChild(link_delete);    
    link_delete.appendChild(delete_btn);
    link_edit.appendChild(edit_btn);
    $('tbody').append(row);   
    getDepartmentByID(employee.department, cell2);

 }
}

// Retrieve Department by ID
function getDepartmentByID(id, cell = null){
    $.ajax(
        {
        url: "php/getDepartmentByID.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: id
        },
        
        success: function(result) {
            //console.log(JSON.stringify(result));

            if (result.status.name == "ok") {                
                let department = result['data']['0'];
                let name = department['name'];
                let location_id = department['locationID'];
                const text = document.createTextNode(name);                
                cell.appendChild(text);                
            }        
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });     
}

let selected_employee;
let selected_employee_position_array; // joined element in employees[] 

/* EDIT EMPLOYEE */

$('#edit-form').submit(sendEditData);

//
function getEditData(id){
    console.log('getEditData()');
    removeDropdown();
    selected_employee = id;
    
   return $.ajax(
        {
        url: "php/getPersonnelByID.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id : id
        },
        
        success: function(result) {      
            // console.log(JSON.stringify(result));   
            const employee = result['data']['personnel']['0'];   
            let first_name = employee.firstName;
            let last_name = employee.lastName;
            let departmentID = employee.departmentID;
            let email = employee.email;
            let joined = first_name + last_name;
            selected_employee_position_array = employees.indexOf(joined); 
            $('#name-edit').val(first_name);   
            $('#surname-edit').val(last_name);           
            $('#department-edit').val(departmentID);   
            // $('#location-edit').val(location);         
            $('#email-edit').val(email);
            console.log("departmentID " + departmentID);
            // console.log(select_options);
            let location;
            select_options.forEach(department => {
                //console.log(department);
                if (department.id == departmentID){
                    console.log(department.locationID);
                    location = department.locationID;
                    locations.forEach(l => {
                        if (l.id == location){                            
                            $('#location-edit').val(l.name);
                            console.log(locations);
                        }
                    })
                }
            });
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });  
}

function sendEditData(){
    console.log('sendEditData()');
    let id = selected_employee;
    $name = $('#name-edit').val();          
    $last_name = $('#surname-edit').val();  
    $department= $('#department-edit').val();            
    $email = $('#email-edit').val();

   return $.ajax(
        {
        url: "php/processEditData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id : id,
            firstName: capitalize($name),
            lastName: capitalize($last_name),
            department: $department,
            email: $email
        },
        
        success: function(result) {      
            //console.log(JSON.stringify(result)); 
            employees[selected_employee_position_array] = $name.toLowerCase() + $department.toLowerCase();
            getData();
            //Alert Success
            $('#alert-success-edit').css('opacity', "1");
            setTimeout(() => {            
                $('#alert-success-edit').css('opacity', "0");
            }, 2000);
            },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });  
}


/* REMOVE DATA */

$('#delete').click(getSingleData);

function selectedEmployee(id, edit_employee){
    selected_employee = id;
    removeDropdown();
    if (edit_employee){
        
    }
}


//Remove from Array (employees)
function getSingleData(){
    console.log('getSingledData()');
    const id = selected_employee;
    
   return $.ajax(
        {
        url: "php/getSingleData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id : id
        },
        
        success: function(result) {      
            //console.log(JSON.stringify(result));         
            let joined = result['data']['0']['firstName'].toLowerCase() + result['data']['0']['lastName'].toLowerCase();
            let index = employees.indexOf(joined);
            object_array.pop(object_array[index]);
            employees.pop(joined);  
            removeData(id);
            deleteRow(id);
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });  
}


//remove from MYSQL Database
function deleteRow(id){    
    $.ajax(
        {
        url: "php/removeData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id : id
        },
        
        success: function(result) {
            //console.log(JSON.stringify(result));

            if (result.status.name == "ok") {  
                console.log("deleteRow()");
                // console.log(employees);
            }        
        },

        error: function(jqXHR, textStatus, errorThrown) {
           
        }
    });  
}

//remove HTML
function removeData(id){               
    console.log('removeData()');
    entries--;
    $('#entries').html(entries + " Entries");
    let row = document.getElementById(`tr${id}`);
    row.remove();    
}

//---------------------------------------------------------------------


/* ADD DEPARTMENT */

$('#add-dept-form').submit(checkDeptExists);

function checkDeptExists(){
    console.log('checkDeptExists');
    let name = $('#dept-name').val();
    let location = $('#dept-location').val().toLowerCase();  
    if (select_options.some(e => e.name.toLowerCase() === name.toLowerCase())) {      
        $('#dept-error').css('opacity', "1");
        setTimeout(() => {            
            $('#dept-error').css('opacity', "0");
        }, 2000);
      } else {
            locations.forEach(loc => {
                if (loc.name.toLowerCase() === location){
                    location = parseInt(loc.id);
                }
            })
            updateDeptDB(name, location);
        }
    
}

function updateDeptDB (name, locationID){
    console.log('updateDeptDB()');
    return $.ajax({  
        type: 'POST',
        url: 'php/addDeptDB.php', 
        data: { 
            name: capitalize(name),
            location: capitalize(locationID)
         },
        success: function(result){                   
            $('#dept-success').css('opacity', "1");
            setTimeout(() => {            
                $('#dept-success').css('opacity', "0");
            }, 2000);
            getData();
        }
    });
}




/* ADD EMPLOYEE */

$('#form').submit(checkExist);


// Check if Employee is already in array (array_joined)
function checkExist(){

    console.log("checkExist()");
    
    let first_name = $('#name').val();
    let last_name = $('#last-name').val();
    let department = $('#department-add').val(); 
    let email = $('#email').val(); 
    let joined = first_name.toLowerCase() + last_name.toLowerCase();
    if (employees.includes(joined)){
        $('#alert-error').css('opacity', "1");
        setTimeout(() => {            
            $('#alert-error').css('opacity', "0");
        }, 2000);
    } else {
        sendData(first_name, last_name, department, email);        
        $('#alert-success').css('opacity', "1");
        setTimeout(() => {            
            $('#alert-success').css('opacity', "0");
        }, 2000);
    }
}

// Add Employee to Database
function sendData(first_name, last_name, department, email){
    console.log('sendData()');
    return $.ajax({  
        type: 'POST',
        url: 'php/addData.php', 
        data: { 
            firstName: capitalize(first_name),
            lastName: capitalize(last_name),
            department: department,
            email: email
         },
        success: function(result){
            getData();
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

//ADVANCED SEARCH

$('#search-button').click(() => {
    let name = $('#name-search').val();
    let last_name = $('#lastname-search').val();
    let department = $('#department-search').val();
    let data = [];    
    let value = `${name} ${last_name} ${getLocationForNoResult(department)}`;    
    $('#tbody').html('');
    if (name === "" && department === 'any'){
        getData();
    } else {        

        object_array.forEach(element => {
            if (element.department === department && name === ""){
                data.push(element);
                value=department;
                
            } else if (department === "any" && element.firstName === name){            
                data.push(element);
                value = name;

            } else if (element.department === department && element.firstName === name){                        
                data.push(element);
            };
        }) 

        if (data.length > 0){            
            data.forEach(employee => {
                addTableRow(employee, value, null);
                })
            entries = data.length;
            $('#entries').html(entries + " Entries")
        } else {
            const row = document.createElement('tr');   
            row.setAttribute("id", `no-results`);            
            
            const cell_no_results = document.createElement('td');
            const text_no_results = document.createTextNode(`No results found for '${value}'`);
            cell_no_results.appendChild(text_no_results);
            row.appendChild(cell_no_results);        
            $('tbody').append(row);        
            entries = 0;
            $('#entries').html(entries + " Entries")              
        }
    }
})


function getLocationForNoResult(id){
    let name;

    select_options.forEach(dept => {
        if (dept.id === id){
            console.log(dept.name);
            name = dept.name;
        }
    })
    return name;
}

/* SEARCH BAR INPUT */

$('#search-input').on('keyup', function (){
    entries = 0;
    let value = $(this).val();
    let data = searchTable(value, object_array);    
    $('#tbody').html('');
    data.forEach(element =>{        
        addTableRow(element, value, null);
    })
    entries = data.length;
    $('#entries').html(entries + " Entries");
})

function searchTable(value, data){
    let filterData = [];
    for (let i = 0; i < data.length; i++){
        value = value.toLowerCase();
        let name = data[i].firstName.toLowerCase();
        if (name.includes(value)){
            filterData.push(data[i]);
        }
    }

    return filterData;
}




function updateSelect(select, option = null){
    
    select_options.sort( compare ); 

    if (option === 'any'){
          
        const option = document.createElement('option');
        option.value = "any";    
        const text = document.createTextNode("Any");
        option.appendChild(text);    
        select.append(option);  

    }

    select_options.forEach(department =>{        
            const option = document.createElement('option');
            option.value = department.id;    
            const text = document.createTextNode(department.name);
            option.appendChild(text);

            select.append(option);   
    })
}

function updateDatalist(){
    names.sort();
    names.forEach(name =>{        
            $datalist = $('#datalist');
            const option = document.createElement('option');
            option.setAttribute('id', `option${name.replace('', '+')}`);
            option.value = name;    
            const text = document.createTextNode(name);
            option.appendChild(text);

            $datalist.append(option);   
    })
}


function resetArrays(){
    names = [];
    select_options = [];
    employees = [];
    object_array = [];
    entries = 0;
    $('datalist').html('');
    $('#department-search').html('');
}

// Sort Object Array Function
function compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }


  function removeDropdown(){
      if($('#dropdown').length){
          $('#dropdown').remove();
          dropdown_active = false;
      }
  }