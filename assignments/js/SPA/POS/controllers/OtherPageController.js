
//set Save Customers Count in dashboard
function setCusCount(){
    let cusCount=0;
    for (let customer of customers) {
        cusCount=cusCount+1;
    }
    $('#customersCount').text(cusCount);
}

//set Save Items Count in dashboard
function setItemsCount(){
    let itemsCount=0;
    for (let item of items) {
        itemsCount=itemsCount+1;
    }
    $('#itemsCount').text(itemsCount);
}

//set Place Orders Count in dashboard
function setOrdersCount(){
    let ordersCount=0;
    for (let orde of orderDetails) {
        ordersCount=ordersCount+1;
    }
    $('#ordersCount').text(ordersCount);
}
