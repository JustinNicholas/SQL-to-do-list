console.log('JS Working');

$(document).ready(handleReady);

function handleReady() {
    console.log('JQ Working');
    $('#add-item-button').on('click', addItem);
    getList();
}

function getList(){
    console.log('in getList');
    $.ajax({
        method: 'GET',
        url: '/items'
    }).then( function(response) {
        console.log(response);
        displayItems(response);
    }).catch( function(err) {
        console.log(err);
    })
}

function displayItems(itemList) {
    console.log('in display');
    for ( let item of itemList ){
        $('.item-list').append(`
        <tr data-id=${item.id}>
            <td>${item.item}</td>
            <td><button id="complete-button">Complete</button></td>
            <td><button id="delete-button">Delete</button></td>
        </tr>`)
    }
}

function addItem() {
    let newItem = $('#new-item').val();

}

