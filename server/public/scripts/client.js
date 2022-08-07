console.log('JS Working');

$(document).ready(handleReady);
// here are all of the click listener for the page
function handleReady() {
    console.log('JQ Working');
    $('#add-item-button').on('click', addItem);
    $('.display').on('click', '#delete-button', deleteItem)
    $('.display').on('click', '#complete-button', completeItem)
    getList();
}
// the getList function send a get request to the server and then calls the displayItems function and uses the response as an argument.
function getList(){
    // console.log('in getList');
    $.ajax({
        method: 'GET',
        url: '/items'
    }).then( function(response) {
        // console.log(response);
        displayItems(response);
    }).catch( function(err) {
        console.log(err);
    })
}
// the displayItems function will check if each task was completed and append it to the completed section or to-do section.
// This also puts the id and stat in the data of the parent div.
function displayItems(itemList) {
    $('.item-list').empty();
    $('.completed-items-list').empty();
    // console.log('in display');
    for ( let item of itemList ){
        // console.log(item.status);
        if (item.status === false){
            $('.item-list').append(`
            <div class="to-do-tasks parent-div" data-id=${item.id} data-status=${item.status}>
                <p class="task">${item.item}</p>
                <div class="button-space">
                    <span class="button"><button class="complete-button purple-button" id="complete-button">Complete</button></span>
                    <span class="button"><button class="delete-button" id="delete-button"><i class="gg-trash"></i></button></span>
                </div>
            </div>`)
        } else {
            $('.completed-items-list').append(`
            <div class="completed-task parent-div" data-id=${item.id} data-status=${item.status}>
                <p class="task"><i class="gg-check-r"></i> ${item.item}</p>
                <div class="button-space">
                    <span class="button"><button class="delete-button" id="delete-button"><i class="gg-trash"></i></button></span>
                </div>
            </div>`)
        }
    }
}
// the addItem function will run when a user submits a new entry. It sends the new item to the server to be stored in the database.
//It also calls the getITems function to refresh the page.
function addItem() {
    let newItem = $('#new-item').val();

    $.ajax({
        method: 'POST',
        url: '/items',
        data: {
            item: newItem
            }
    }).then( function(response){
        // console.log(response);
        getList();
        $('#new-item').val('');
    }).catch( function(err){
        console.log(err);
    })
}
// the deleteItem function sends a warning to users and does not delete items until the user clicks ok on the alert. Once they click ok, it sends a delete request
// to the server with their id. It also calls the getITems function to refresh the page.
function deleteItem() {
    // this has to be outside the .then because it will be lost inside of it.
    let id = $(this).closest('div.parent-div').data('id');
    swal({
        title: "You clicked delete!",
        text: "are you sure you want to delete your task?",
        icon: "warning",
        buttons: true
      })
      .then( function(willDelete){
        if (willDelete) {
            console.log(id);
            $.ajax({
                method: 'DELETE',
                url: `/items/${id}`
            }).then( function(response) {
                console.log(response);
                getList();
            }).catch( function(err){
                console.log(err);
            })
        } else {

        }
      });
}

// the completedItem function sends an alert to the user that says congrats. It also sends a put request to change the status of that item to false.
// It also calls the getITems function to refresh the page.
function completeItem(){
    swal({
        title: "Good job!",
        text: "You completed your task!",
        icon: "success",
        button: "Continue!",
      });

    let id = $(this).closest('div.parent-div').data('id');
    console.log(id);

    $.ajax({
        method: 'PUT',
        url: `/items/${id}`
    }).then( function(response){
        console.log(response);
        getList();
    }).catch( function(err){
        console.log(err);
    })

}

