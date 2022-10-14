$(window).on('load', function () {
    $('#loader').fadeOut(1000);
});
// Start Hide Other Sections When Webpage Load
$(document).ready(function () {
    $('#customerSection').show();
    $('#itemSection').hide();
    $('#orderSection').hide();
    $('#orderDetailsSection').hide();
    $('#dashboard').hide();

});

//Start When home click other section hide
$('#hmebttn').click(function () {
    $('#home').css('display', 'block');
    $('#header').css('display', 'block');
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'none');
    $('#orderSection').css('display', 'none');
    $('#orderDetailsSection').css('display', 'none');
    $('#dashboard').css('display', 'none')
});
// End When home click other section hide


// Start When customer click other section hide
$('#custbttn,#linkCustomer2').click(function () {
    $('#home').css('display', 'none');
    $('#header').css('display', 'block');
    $('#dashboard').css('display', 'none')
    $('#customerSection').css('display', 'block');
    $('#itemSection').css('display', 'none');
    $('#orderSection').css('display', 'none');
    $('#orderDetailsSection').css('display', 'none');
});
// End When customer click other section hide

// Start When item click other section hide
$('#itmbttn,#linkItem2').click(function () {
    $('#home').css('display', 'none');
    $('#header').css('display', 'block');
    $('#dashboard').css('display', 'none')
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'block');
    $('#orderSection').css('display', 'none');
    $('#orderDetailsSection').css('display', 'none');
});
// End When item click other section hide

// Start When order click other section hide
$('#ordrbttn,#linkOrder2').click(function () {
    $('#home').css('display', 'none');
    $('#header').css('display', 'block');
    $('#dashboard').css('display', 'none')
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'none');
    $('#orderSection').show();
    $('#orderDetailsSection').hide();

    generateOrderID();
});
// End When order click other section hide

// Start When order-details click other section hide
$('#ordrDetlbttn,#linkOrderDetails2').click(function () {
    $('#home').css('display', 'none');
    $('#header').css('display', 'block');
    $('#dashboard').css('display', 'none')
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'none');
    $('#orderSection').hide();
    $('#orderDetailsSection').css('display', 'block');
});

// Start When other click other section hide
$('#othrbtttn,#linkOrderDetails2').click(function () {
    $('#home').css('display', 'none');
    $('#header').css('display', 'block');
    $('#dashboard').css('display', 'block')
    $('#customerSection').css('display', 'none');
    $('#itemSection').css('display', 'none');
    $('#orderSection').hide();
    $('#orderDetailsSection').css('display', 'none');
});
// End When order click other section hide