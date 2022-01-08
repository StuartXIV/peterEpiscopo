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
                console.log(employee);
                const row = document.createElement('tr');
                row.setAttribute('id', 'dropdown');               
                let dept_txt = document.createTextNode(`Department: ${employee.department}`);
                let location_txt = document.createTextNode(`Location: ${employee.location}`);
                let job_title = employee.jobTitle;
                if (job_title === ""){
                    job_title = 'unspecified'
                }
                let job_title_txt = document.createTextNode(`Job Title: ${job_title}`);
                const email_txt = document.createTextNode(`${employee.email}`);
                const dept_cell = document.createElement('p');
                const job_title_cell = document.createElement('p');
                const email_cell = document.createElement('p');
                const location_cell = document.createElement('p');
                location_cell.setAttribute('id', `location-dropdown${id}`);
                const link_email = document.createElement('a');
                link_email.setAttribute('id', `email-dropwdown${id}`);  
            
                link_email.setAttribute('href', `mailto:${email_txt}}`);
                link_email.setAttribute('target', `_blank`);
            
                email_cell.appendChild(link_email);
                link_email.appendChild(email_txt);
                
            
                dept_cell.classList.add('col-xs-6');
                location_cell.classList.add('col-xs-6');
                console.log(job_title_txt);
                dept_cell.appendChild(dept_txt);
                job_title_cell.appendChild(job_title_txt);
                location_cell.appendChild(location_txt);
            
                row.appendChild(dept_cell);
                row.appendChild(job_title_cell);
                row.appendChild(location_cell);
                row.appendChild(email_cell);
            
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
                    let location = element['location'];
                    let object = {
                        id: id,
                        name, name,
                        location: location
                    }              
                    // Check object exists in array
                    if (!select_options.some(e => e.id === id)) {
                        select_options.push(object);
                      } 
                      
                    addDepartmentRow(object);
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

function addDepartmentRow(dept){    
    const row = document.createElement('tr');
    const dept_cell = document.createElement('td');
    const location_cell = document.createElement('td');
    location_cell.classList.add('col-xs-6'); 

    const dept_txt = document.createTextNode(`${dept.name}`);
    const location_txt = document.createTextNode(`${dept.location}`);
    
    dept_cell.appendChild(dept_txt);
    location_cell.appendChild(location_txt);
    row.appendChild(dept_cell);
    row.appendChild(location_cell);
    $('#table-departments').append(row);
    addEditDeleteBtn(row, dept.id, "Dept");

}



// DELETE DEPARTMENT

let selected_dept;

function selectDept(id){
    selected_dept  = id;
    select_options.forEach(dept => {
        if (dept.id == id){
            $('#dept-delete-question').html(dept.name);
            $('#department-edit-dept').val(dept.name);
            $('#location-edit-dept').val(dept.location);
        }
    })
}

$('#delete-dept').click(removeDeptFromDB);

function removeDeptFromDB(){    

    $.ajax(
        {
            url: "php/deleteDepartmentByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id : selected_dept
            },
            
            success: function(result) {      
                //console.log(JSON.stringify(result)); 
                    getData();
                },
    
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error');
            }        
        });
}


// EDIT DEPARTMENT
$('#edit-form-dept').submit(() => updateDeptInDB());

function updateDeptInDB(){  
    
    $name = $('#department-edit-dept').val();
    $location = $('#location-edit-dept').val();
    if (locations.some(e => e.name === $location)) {
        $location = "b";
        console.log("location exists!");
      }

    console.log(typeof selected_dept + " " + $name);
    $.ajax(
        {
            url: "php/updateDepartmentByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id : selected_dept,
                name: $name,
                location: $location
            },
            
            success: function(result) {      
                //console.log(JSON.stringify(result)); 
                    getData();
                    $('#alert-success-edit-dept').css('opacity', "1");
                    setTimeout(() => {            
                        $('#alert-success-edit-dept').css('opacity', "0");
                    }, 2000);
                },
    
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error');
            }        
        });
}



// GET LOCATIONS

let number_locations = 0;

function getLocations(){
    $.ajax(
        {
        url: "php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {                
                let arr = result['data'];
                arr.forEach(location => {
                    locations.push(location);
                    addLocationRow(location);
                })        
            }        
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });     
}

function addLocationRow(location_object){
    const row = document.createElement('tr');
    const location_cell = document.createElement('td');
    location_cell.classList.add('col-xs-6');  
    location_cell.classList.add('loc-table');  

    const location_text = document.createTextNode(`${location_object.name}`);
    location_cell.appendChild(location_text);
    row.appendChild(location_cell);
    $('#table-locations').append(row);
    addEditDeleteBtn(row, location_object.id, "Location");
}

let selected_location;

function selectLocation(id){
    selected_location  = id;
    locations.forEach(location => {
        if (location.id == id){
            $('#location-delete-question').html(location.name);
            $('#location-edit-loc').val(location.name);
        }
    })
}

$('#delete-location').click(removeLocationFromDB);

function removeLocationFromDB(){    

    $.ajax(
        {
            url: "php/deleteLocationByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id : selected_location
            },
            
            success: function(result) {      
                //console.log(JSON.stringify(result)); 
                    getData();
                },
    
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error');
            }        
        });
}

$('#add-location-form').submit(checkLocationExists);
 

function checkLocationExists(){

    const location = $('#location-name-add').val();

    if (locations.some(e => e.name === capitalize(location))) {

        $('#location-error').css('opacity', "1");
        setTimeout(() => {            
            $('#location-error').css('opacity', "0");
        }, 2000);          
                 
    } else {

        addLocationToDB(capitalize(location));               
        $('#location-success').css('opacity', "1");
        setTimeout(() => {            
            $('#location-success').css('opacity', "0");
        }, 2000);
    }    
}

function addLocationToDB(location){

    location = capitalize(location.toLowerCase());

    $.ajax(
        {
        url: "php/addLocationDB.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: location
        },
        success: function(result) {
            //console.log(JSON.stringify(result));
            getData();
        },       

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error Location to DB');
        }
    })
}

function addEditDeleteBtn(row, id, string){
    
    const cell_action = document.createElement('td');
    const pencil = document.createElement('img');
    const bin = document.createElement('img');
    pencil.setAttribute('src', 'images/edit.svg');
    pencil.classList.add('btn-icon');    
    bin.setAttribute('src', './images/bin.svg');
    bin.classList.add('btn-icon');
    const edit_btn = document.createElement('button');
    const delete_btn = document.createElement('button');
    const link_edit = document.createElement('a');
    const link_delete = document.createElement('a');

    link_edit.classList.add('edit');
    link_edit.setAttribute('href', `#edit${string}Modal`);
    link_edit.setAttribute('data-toggle', 'modal');

    link_delete.classList.add('delete');
    link_delete.setAttribute('href', `#delete${string}Modal`);
    link_delete.setAttribute('data-toggle', 'modal');

    edit_btn.classList.add('btn');
    edit_btn.classList.add('btn-info');
    edit_btn.appendChild(pencil);    
    edit_btn.setAttribute('onclick', `select${string}(${id})`);
    
    delete_btn.classList.add('btn');
    delete_btn.classList.add('btn-danger');
    delete_btn.appendChild(bin);
    delete_btn.setAttribute('onclick', `select${string}(${id})`);

    cell_action.classList.add('col-xs-6');
        cell_action.classList.add('loc-table');
    cell_action.classList.add('buttons-container');
    cell_action.classList.add('text-center');

    cell_action.appendChild(link_edit);
    cell_action.appendChild(link_delete);    
    link_delete.appendChild(delete_btn);
    link_edit.appendChild(edit_btn);  
    row.appendChild(cell_action);  
}

// Retrieve Employees from Database
function getData(){
    console.log("getData()");
    resetTables();
    resetArrays();
    getAllDepartments();
    getLocations();
    $.ajax(
        {
        url: "php/getAll.php",
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
                    let job_title = element['jobTitle'];
                    let department = element['department'];   
                    let location = element['location'];
                    let email = element['email'];   
                    let employee = {    /////// MAYBE A SHORTCUT WOULD BE BETTER(push.(element))
                        id: id,
                        firstName: first_name,
                        lastName: last_name,
                        jobTitle: job_title,
                        department: department,
                        location: location,
                        email: email,
                        joined: first_name + last_name
                    }   
                    let joined = first_name.toLowerCase() + last_name.toLowerCase();                      
                    first_name = capitalize(first_name); // WATCH OUT!!!      
                    
    
                    object_array.push(employee);
                    addTableRow(employee, null, joined);    
                    if(!names.includes(first_name)){names.push(first_name)}; // MAYBE DELETE    

                    }
                )
                setTimeout(() =>{     
                    updateDatalist();
                    addLocationOptionsToSelect();
                }, 2000)   
            }
        checkOpenTab();        
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });     
}

function addTableRow(employee, value = null, joined){

 if (object_array.length > 0){
    let id = employee.id;
    
    if (joined){employees.push(joined)};
    const row = document.createElement('tr');   
    row.setAttribute("id", `tr${id}`);       
    const text1 = document.createTextNode(capitalize(employee.lastName) + " " + capitalize(employee.firstName));
    const text5 = document.createTextNode(employee.email);
    const dept_text = document.createTextNode(employee.department); 
    const job_title_txt = document.createTextNode(employee.jobTitle);

    const pencil = document.createElement('img');
    const bin = document.createElement('img');
    pencil.setAttribute('src', 'images/edit.svg');
    pencil.classList.add('btn-icon');    
    bin.setAttribute('src', './images/bin.svg');
    bin.classList.add('btn-icon');

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
    const job_title_cell = document.createElement('td');

                        
    
    cell3.classList.add('email');
    const cell_action = document.createElement('td');
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
    edit_btn.appendChild(pencil);    
    edit_btn.setAttribute('onclick', `getEditData(${id})`);
    
    delete_btn.classList.add('btn');
    delete_btn.classList.add('btn-danger');
    delete_btn.appendChild(bin);
    delete_btn.setAttribute('onclick', `selectedEmployee(${id})`);

    
    cell1.appendChild(arrow);
    cell1.appendChild(text1);    
    cell2.appendChild(dept_text);     
    cell3.appendChild(link_email);
    job_title_cell.appendChild(job_title_txt);
    link_email.appendChild(text5);

    cell1.classList.add('col-xs-3');
    cell3.classList.add('col-xs-3');
    cell3.classList.add('col-xs-3');
    job_title_cell.classList.add('col-xs-3');
    job_title_cell.classList.add('job-title-cell');
    cell_action.classList.add('col-xs-3');
    cell_action.classList.add('buttons-container');
    cell_action.classList.add('text-center');

    row.appendChild(cell1);
    row.appendChild(job_title_cell);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell_action);
    cell_action.appendChild(link_edit);
    cell_action.appendChild(link_delete);    
    link_delete.appendChild(delete_btn);
    link_edit.appendChild(edit_btn);
    $('#table-personnel').append(row);   

 }
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
            let job_title = employee.jobTitle;
            let departmentID = employee.departmentID;
            let email = employee.email;
            let joined = first_name + last_name;
            selected_employee_position_array = employees.indexOf(joined); 
            $('#name-edit').val(first_name);   
            $('#surname-edit').val(last_name);           
            $('#job-title-edit').val(job_title);
            $('#department-edit').val(departmentID);         
            $('#email-edit').val(email);
            console.log("departmentID " + departmentID);
            let location;
            select_options.forEach(department => {
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
    $job_title = $('#job-title-edit').val();  
    $department= $('#department-edit').val();            
    $email = $('#email-edit').val();

   return $.ajax(
        {
        url: "php/processEditData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id : id,
            firstName: capitalize($name.toLowerCase()),
            lastName: capitalize($last_name.toLowerCase()),
            jobTitle: capitalize($job_title.toLowerCase()),
            department: $department,
            email: $email.toLowerCase()
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

    $.ajax(
        {
            url: "php/getPersonnelByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id : id
            },
            
            success: function(result) {      
                //console.log(JSON.stringify(result)); 
                 
                    const employee = result['data']['personnel']['0'];   
                    let first_name = employee.firstName;
                    let last_name = employee.lastName;
                    $('#delete-question').html(`'${last_name} ${first_name}'`);
                },
    
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error');
            }        
        });
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
            //removeData(id);
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
                getData();
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
    console.log('addDeptDB()');
    name = capitalize(name.toLowerCase());
    return $.ajax({  
        type: 'POST',
        url: 'php/addDeptDB.php', 
        data: { 
            name: name,
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
    let job_title = $('#job-title-add').val();
    let department = $('#department-add').val(); 
    let email = $('#email').val(); 
    let joined = first_name.toLowerCase() + last_name.toLowerCase();
    if (employees.includes(joined)){
        $('#alert-error').css('opacity', "1");
        setTimeout(() => {            
            $('#alert-error').css('opacity', "0");
        }, 2000);
    } else {
        sendData(first_name, last_name, job_title, department, email);        
        $('#alert-success').css('opacity', "1");
        setTimeout(() => {            
            $('#alert-success').css('opacity', "0");
        }, 2000);
    }
}

// Add Employee to Database
function sendData(first_name, last_name, job_title, department, email){
    console.log('sendData()');
    return $.ajax({  
        type: 'POST',
        url: 'php/addData.php', 
        data: { 
            firstName: capitalize(first_name.toLowerCase()),
            lastName: capitalize(last_name.toLowerCase()),
            jobTitle: capitalize(job_title.toLowerCase()),
            department: department,
            email: email.toLowerCase()
         },
        success: function(result){
            getData();
        }
    });
}




//ADVANCED SEARCH

$('#search-button').click(() => {
    let name = $('#name-search').val();
    let department = $('#department-search').val();
    let data = [];    
    let value = `${name} ${getLocationForNoResult(department)}`;    
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
            function value(){
                if (department === 'any' && name){
                    value = capitalize(name);
                    return value;
                } else if (!name){
                    value = getLocationForNoResult(department);
                    return department;
                } else if (department && name){
                    value = name + " " + getLocationForNoResult(department);
                    return value;
                }
            }      
            
            const cell_no_results = document.createElement('td');
            const text_no_results = document.createTextNode(`No results found for '${value()}'`);
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

/*--------------------------------------------------------------- SEARCH BAR INPUT ----------------------------------------------------------- */

$('#search-input').on('keyup', function (){       
    entries = 0;
    let value = $(this).val();
    const id = $('.tab-content .active').attr('id');
    let data;
    switch(id) {
        case 'locations':         
            data = searchTableDept(value, locations);             
            $('#table-locations').html('');     
            if (data.length > 0){                    
                data.forEach(element =>{
                    addLocationRow(element);
                })
            } else {
                noResults($('#table-locations'), 'Locations');
            }    
        break;
        case 'departments':
            data = searchTableDept(value, select_options);                
            $('#table-departments').html('');
            if (data.length > 0){                    
                data.forEach(element =>{
                    addDepartmentRow(element);
                })
            } else {
                noResults($('#table-departments'), 'Departments');
            }   
        break;
        default:
            data = searchTable(value, object_array);    
            $('#table-personnel').html('');
            if (data.length > 0){                    
                data.forEach(element =>{
                    addTableRow(element);
                })
            } else {
                noResults($('#table-personnel'), 'Personnel');
            }   
    }       
    entries = data.length;
    $('#entries').html(entries + " Entries");       
})

function noResults(table, string){
    const row = document.createElement('tr');
    row.classList.add('no-results-row');
    const cell = document.createElement('td');
    const span = document.createElement('span');
    const button = document.createElement('button');
    button.setAttribute('id', 'no-results-btn');
    button.setAttribute('onclick', 'noResultsModal()');

    button.classList.add('btn');
    button.classList.add('btn-success');
    const value = $('#search-input').val();    
    const txt = document.createTextNode('No search results for \'');
    const txt_value = document.createTextNode(capitalize(value));    
    const txt_2 = document.createTextNode('\'');
    const txt_btn = document.createTextNode(`Add ${capitalize(value)} to ${string}`);

    span.appendChild(txt_value);
    button.appendChild(txt_btn);
    cell.appendChild(txt);
    cell.appendChild(span);
    cell.appendChild(txt_2);
    cell.appendChild(button);
    row.appendChild(cell);
    table.append(row);

}



function searchTable(value, data){
    let filterData = [];
    for (let i = 0; i < data.length; i++){
        value = value.toLowerCase();
        let name = data[i].joined.toLowerCase();
        if (name.includes(value)){
            filterData.push(data[i]);
        }
    }
    return filterData;
}

function searchTableDept(value, data){
    let filterData = [];
    for (let i = 0; i < data.length; i++){
        value = value.toLowerCase();
        let name = data[i].name.toLowerCase();
        if (name.includes(value)){
            filterData.push(data[i]);
        }
    }
    console.log(filterData);
    return filterData;
}

function noResultsModal(){    
    const id = $('.tab-content .active').attr('id');
    const value = capitalize($('#search-input').val().toLowerCase());
    switch(id) {
        case 'locations':
            $('#location-name-add').val(value);
        break;
        case 'departments':
            $('#dept-name').val(value);  
        break;
        default:
            $('#name').val(value);   
            $('#last-name').val(""); 
            $('#job-title-add').val(""); 
            $('#email').val("");
      } 
    openModal();
}

// OPEN MODAL
function openModal(){
    const id = $('.tab-content .active').attr('id');
    switch(id) {
        case 'locations':
            $('#addLocationModal').modal('toggle');
        break;
        case 'departments':
            $('#addDeptModal').modal('toggle');   
        break;
        default:
            $('#addEmployeeModal').modal('toggle');   
      } 
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


// Refresh

function resetTables(){
    $('#table-personnel').html("");
    $('#table-departments').html("");    
    $('#table-locations').html("");
}

function resetArrays(){
    names = [];
    select_options = [];
    employees = [];
    object_array = [];
    entries = 0;
    locations = [];

    $('datalist').html('');
    $('#department-add').html('');
    $('#department-edit').html('');
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

  

// Format text
function capitalize(str){

    const arr = str.split(" ");


    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    const str2 = arr.join(" ");

    return str2;
}

// ADD - TOGGLE MODALS
$('#add').click(()=>{
    openModal();
})

$('#modal-add-dept').click(()=>{
    $modal = $('#addDeptModal');
    $modal.modal('toggle');
})


// ON TAB SELECTION
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {checkOpenTab();})

// CHECK OPEN TAB and UPDATE ENTRIES
function checkOpenTab(){

    // Remove txt from Search Bar, restore tables
    if ($('#search-input').val().length > 0){
        $('#search-input').val("");
        getData();
    }
    const id = $('.tab-content .active').attr('id');
    switch(id) {
        case 'locations': 
            $('#add').attr('title', 'Add New Location');           
            $('#entries').html(locations.length + " Entries");
        break;
        case 'departments':
            $('#add').attr('title', 'Add New Department');     
            $('#entries').html(select_options.length + " Entries");
        break;
        default:
            $('#add').attr('title', 'Add New Personnel');     
            $('#entries').html(employees.length + " Entries");      
      }        
}


// UPDATE READONLY LOCATION INPUT
$('#department-add').change(()=>{
    const id = $('#department-add').val();
    select_options.forEach(dept => {
        if (dept.id == id){
            $('#location-add').val(dept.location);
        }
    })
})
$('#department-edit').change(()=>{
    const id = $('#department-edit').val();
    select_options.forEach(dept => {
        if (dept.id == id){
            $('#location-edit').val(dept.location);
        }
    })
})

// POPULATE LOCATION SELECT

function addLocationOptionsToSelect(){    
    $('#dept-location').html("");
    locations.forEach(location=>{
        const option = document.createElement('option');
        option.value = location.id;
        const txt = document.createTextNode(location.name);
        option.appendChild(txt);
        $('#dept-location').append(option);
    })
}
