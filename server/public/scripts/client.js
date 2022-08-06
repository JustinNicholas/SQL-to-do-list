console.log('JS Working');

$(document).ready(handleReady);

function handleReady() {
    console.log('JQ Working');
    $('#add-item-button').on('click', addItem);
    $('.display').on('click', '#delete-button', deleteItem)
    $('.display').on('click', '#complete-button', completeItem)
    getList();
}

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

function displayItems(itemList) {
    $('.item-list').empty();
    $('.completed-items-list').empty();
    // console.log('in display');
    for ( let item of itemList ){
        console.log(item.status);
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

function deleteItem() {
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

