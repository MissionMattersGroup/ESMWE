var loaderId = Math.ceil(Math.random() * 4456);
/*
* Description: Show the loader while displaying the records
*/
function showDialog() {            
    var prg = "";
    prg += '<div id="loading_' + loaderId + '" class="modal fade in loading-popup" style="width: 30%;margin-left: auto;margin-right: auto;margin-top: 20%;overflow: hidden;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block;backdrop:static;>';
    prg += '<div class="modal-dialog" style="width:20%;">';
    prg += '<div class="modal-content">';

    prg += '<div class="modal-header">';
    prg += '<h4 class="modal-title loading-modeltitle" id="myModalLabel"><img style="width:10%;" src="../Contents/Assets/Images/loading_.gif">   Loading...</img></h4>';
    prg += '</div>';
    prg += '</div>';
    prg += '</div>';
    prg += '</div>';
    $('body').append(prg);
    $('#loading_' + loaderId).modal({
        "backdrop": "static"
    });
    $('.modal-backdrop').css("opacity", "0.2");
    $('#loading_' + loaderId).modal('show');

}

//Method to show the scroll bar
function showScrollBar(){
    document.getElementById('html_body').style.cssText = 'overflow-y: auto !important';
}

/*
* Description: Hide the loader while saving the record
*/
function hideDialog() {
    setTimeout(function () {
        $('#loading_' + loaderId).remove();
        $('.modal-backdrop').remove();
    }, 2000);
    $('#loading_' + loaderId).on('hidden.bs.modal',
       function () {
           $('#loading_' + loaderId).remove();
       });
    showScrollBar();
}

//Method to close the popup
function clearValue(){
    $('#errorMsgVal').empty();
    $('#myModal').hide();
}

//This method is used to show the popup for error message
function errorPopup(event,textToDisplay){
    if(event.preventDefault)
    event.preventDefault();
    $('#errorMsgVal').html('');
    var frm = "";
    frm += '<!-- Modal -->';
    frm += '<div class="modal fade" id="myModal" role="dialog" data-backdrop="static">';
    frm += '<div class="modal-dialog">';
    frm += '<!-- Modal content-->';
    frm += '<div class="modal-content">';
    frm += '<div class="modal-header">';
    frm += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
    frm += '<h4 class="modal-title">Error<h4>';
    frm += '<div>';
    frm += '<div class="modal-body showonPop" >';
    frm += '<p style="font-size: 14px;" id="errorMsgVal" class="paragraphClass">';
    frm +='</p>';
    frm += '</div>';
    frm += '<div>';
    frm += '<div class="modal-footer" style="margin-right: 39%;">';
    frm += '<center><button type="button" class="btn btn-default" onclick="clearValue();" >Close</button></center>';
    frm += '<div>';
    frm += '<div>';
    frm += '<div>';
    frm += '<div>';
    $('body').append(frm);
    $('#errorMsgVal').append(textToDisplay);
    $('#myModal').modal('show');
}

// Method to display error pop-up
function showValidationErrorPopup(){
   
    if($("#errorModal .validation-summary-errors ul li").size()>0 )
    {
        $('.modal').modal('hide');
        $('#errorModal').modal('show');
    }
    $('#ui-datepicker-div').hide();
}
