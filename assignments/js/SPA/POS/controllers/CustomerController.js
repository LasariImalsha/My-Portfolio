$('#customer').click(function (){
    focusCustomerID()
});


function focusCustomerID(){
    $('#txtCustomerID').focus();
}

//Save Customer
$('#btnSaveCustomer').click(function () {
    saveCustomer();

});

function saveCustomer() {
    let customerID = $('#txtCustomerID').val();
    let customerName = $('#txtCustomerName').val();
    let customerAddress = $('#txtCustomerAddress').val();
    let customerSalary = $('#txtCustomerSalary').val();


    var customerObject = customerModel(customerID, customerName, customerAddress, customerSalary);

    //add the customer object to the array
    customers.push(customerObject);

    loadAllCustomers();

    clearCustomerTextField();

    bindRowClickEvents();

    loadAllCustomersForOption();

    focusCustomerID();
}

//function for add data to table
function loadAllCustomers() {
    $('#tblCustomer').empty();

    for (var customer of customers) {

        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;

        //then add it to the table body of customer table
        $('#tblCustomer').append(row);
    }

    saveCustomerAlert();
}

//Btn Delete Customer
$("#btnDeleteCustomer").click(function () {
    let deleteCustomerID = $('#txtCustomerID').val();
    if (deleteCustomer(deleteCustomerID)) {
        deleteCustomerAlert();
        clearCustomerTextField();
        $('#txtCustomerID').focus();
    } else {
        deleteErrorCustomerAlert();
        $('#txtCustomerID').focus();
    }


});

//Btn Update Customer
$("#btnUpdateCustomer").click(function () {
    let customerID = $("#txtCustomerID").val();
    let response = updateCustomer(customerID);
    if (response) {
        updateCustomerAlert();
        clearCustomerTextField();
        $('#txtCustomerID').focus();
    } else {
        updateErrorCustomerAlert();
        $('#txtCustomerID').focus();
    }
});


//Customer Search Bar
$('#customermyInput').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#tblCustomer>tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


//btn Clear Text Field Data
$('#btnClearCustomer').click(function () {
    clearCustomerTextField();
    $('#txtCustomerID').focus();
});

//Save Alert
function saveCustomerAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer saved',
        showConfirmButton: false,
        timer: 1500
    })
}

//update Alert
function updateCustomerAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer Updated',
        showConfirmButton: false,
        timer: 1500
    })
}

//update error Alert
function updateErrorCustomerAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    })
}

//delete alert
function deleteCustomerAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer Deleted',
        showConfirmButton: false,
        timer: 1500
    })
}

//delete error Alert
function deleteErrorCustomerAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    })
}


//when click table row data auto fill into text fields
function bindRowClickEvents() {
    $('#tblCustomer>tr').click(function () {
        let id = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let address = $(this).children(':eq(2)').text();
        let salary = $(this).children(':eq(3)').text();

        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerSalary').val(salary);
    });
}


$('#txtCustomerID').on('keydown', function (event) {
    if (event.which == 13) {
        let cusId = $('#txtCustomerID').val();
        let customer = searchCustomer(cusId);
        if (customer != null) {
            setCustomerTextFieldValue(customer.id, customer.name, customer.address, customer.salary);
        } else {
            alert("There is no customer available For That " + cusId);
            $('#txtCustomerName').val('');
            $('#txtCustomerAddress').val('');
            $('#txtCustomerSalary').val('');
        }

    }
});


//Search customer function
function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}


function setCustomerTextFieldValue(id, name, address, salary) {
    $('#txtCustomerID').val(id);
    $('#txtCustomerName').val(name);
    $('#txtCustomerAddress').val(address);
    $('#txtCustomerSalary').val(salary);
}

//Clear text field Function
function clearCustomerTextField() {
    $('#txtCustomerID').val('');
    $('#txtCustomerName').val('');
    $('#txtCustomerAddress').val('');
    $('#txtCustomerSalary').val('');
}


//Delete customer function
function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let customerIndexNumber = customers.indexOf(customer);
        customers.splice(customerIndexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

//update Customer function
function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $('#txtCustomerID').val();
        customer.name = $('#txtCustomerName').val();
        customer.address = $('#txtCustomerAddress').val();
        customer.salary = $('#txtCustomerSalary').val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}


//Validation
// customer regular expressions
const cusIDRegEx = /^(C)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{3,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let customerValidations = [];

customerValidations.push({
    reg: cusIDRegEx,
    field: $('#txtCustomerID'),
    error: 'Customer ID Pattern is Wrong : C001'
});

customerValidations.push({
    reg: cusNameRegEx,
    field: $('#txtCustomerName'),
    error: 'Customer Name Pattern is Wrong : A-z 5-20'
});

customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#txtCustomerAddress'),
    error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
});

customerValidations.push({
    reg: cusSalaryRegEx,
    field: $('#txtCustomerSalary'),
    error: 'Customer Salary Pattern is Wrong : 100 or 100.00'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keyup', function (event) {
    checkCustomerValidity();
});

$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('blur', function (event) {
    checkCustomerValidity();
});

$("#txtCustomerID").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(cusIDRegEx, $("#txtCustomerID"))) {
        $("#txtCustomerName").focus();
    } else {
        focusCustomerText($("#txtCustomerID"));
    }
});


$("#txtCustomerName").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(cusNameRegEx, $("#txtCustomerName"))) {
        $("#txtCustomerAddress").focus();
    }
});


$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(cusAddressRegEx, $("#txtCustomerAddress"))) {
        $("#txtCustomerSalary").focus();
    }
});


$("#txtCustomerSalary").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(cusSalaryRegEx, $("#txtCustomerSalary"))) {
        let res = confirm("Do you want to add this customer.?");
        if (res) {
            saveCustomer();
        }

    }

});

function checkCustomerValidity() {
    let errorCount = 0;
    for (let validation of customerValidations) {
        if (validation.reg.test(validation.field.val())) {
            textCustomerSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setCustomerTextError(validation.field, validation.error);
        }
    }
    setCustomerButtonState(errorCount);
}

function checkCustomer(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setCustomerTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCustomerText(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
        txtField.parent().children('span').css('color','red');
    }

}

function textCustomerSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCustomerText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultCustomerText(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusCustomerText(txtField) {
    txtField.focus();
}

function setCustomerButtonState(value) {
    if (value > 0) {
        $("#btnSaveCustomer").attr('disabled', true);
    } else {
        $("#btnSaveCustomer").attr('disabled', false);
    }
}