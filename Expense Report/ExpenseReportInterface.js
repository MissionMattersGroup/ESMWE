var textError;

/* To show the popup on click of Ok*/
$(document).ready(function() {
    // To draw the signatures
	$('#staffSig').signature();
	$('#SupervisorSig').signature();
	$('#DirectorSig').signature();
	$('#clearDirector').click(function(event) {
	    event.preventDefault();
		$('#DirectorSig').signature('clear');
	});
	$('#clearStaff').click(function(event) {
	    event.preventDefault();
		$('#staffSig').signature('clear');
	});
    $('#clearSupervisor').click(function(event) {
	    event.preventDefault();
		$('#SupervisorSig').signature('clear');
	});
	
	//Method to show the signature on load of the page
	showSignature();
	
	//Method to show the help text
    showHelpText();
    
    var successMRUId = $("#successMRUId").val();
	
	if(successMRUId == "true") {
	    $('#successMessgeForMultipleReceiptUpload').modal('show');
	}
	
	// Show custom error pop-up if there is any error message present after any DML operation
	showCustomValidationErrorPopup();
});

//Method to show the signature on load of the page
function showSignature(){
    
    var DirectorSignature = $('#SaveDirectorSignId').val();
    var StaffSignature = $('#SaveStaffSignId').val();
    var SupervisorSignature = $('#SaveSupervisorSignId').val();
    
    if (DirectorSignature != '') {
        $('#DirectorSig').signature('draw', DirectorSignature);
    }
    if (StaffSignature != '') {
        $('#staffSig').signature('draw', StaffSignature);
    }
    if (SupervisorSignature != '') {
        $('#SupervisorSig').signature('draw', SupervisorSignature);
    }
}

//Method to set the new signature values to the hidden fields
function setValueToSignTextField(tempValue){
   var newStaffSign = $('#staffSig').signature('toJSON');
   $('#SaveStaffSignId').val(newStaffSign);
   var newSupervisorSign = $('#SupervisorSig').signature('toJSON');
   $('#SaveSupervisorSignId').val(newSupervisorSign);
   var newDirectorSign = $('#DirectorSig').signature('toJSON');
   $('#SaveDirectorSignId').val(newDirectorSign);
}

//Function to get the value from the parameter
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
}

//Method to redirect to the main page in edit mode
function doRedirectEditMode(){
  $('input').removeAttr('value');
    var strExpenseReportId= getQueryVariable('id');
    window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/ExpenseReportsInterface?typeView=edit&id="+strExpenseReportId;
}

//Method to redirect to the main page
function doRedirect(){
  $('input').removeAttr('value'); 
    var strExpenseReportId= getQueryVariable('id');
    var scroll = $(window).scrollTop();
    window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/ExpenseReportsInterface?typeView=detail&id="+strExpenseReportId
                            +"&scrollToOnLoad="+scroll;
}

function setRowNumberValueForEdit(targetbutton){
    $('#numberOfRow').val(targetbutton.name);
}

function setRowNumberValueForEditMileage(targetbutton){
    $('#numberOfRowMileage').val(targetbutton.name);
}

//This method is used to show the help text for multiple upload section
function showHelpText(){
    $(".red-tooltip").tooltip();
}

//Method to call the popup and check null validation
function validateNullFields() {
    if ($("#attchId").val() == "") {
        $(".checkErrorPreventClass").css("display","block");     
    }
    else {
        $(".checkErrorPreventClass").css("display","none");
         __doPostBack('SaveUploadedReceipt');
    }
}

// Method to display standard error pop-up
function showValidationErrorPopup(){
   
    if($("#errorModal .validation-summary-errors ul li").size()>0 )
    {
      $('#errorModal').modal('show');
    }
}

// Method to display custom error pop-up
/*function showCustomValidationErrorPopup(){
    if($("#errorCustomModal .ServerExceptionCustomClass").size()>0 )
    {
      $('#errorCustomModal').modal('show');
    }
}*/

//To validate supervisor signature to approve expense report
function ValidateNullCheckSupervisorSignature(tempValue) {
    textError="";
    var supervisorSignValue = $("#SupervisorSig").signature('toJSON');
    var objSupervisorSig = JSON.parse(supervisorSignValue);
    
    if(objSupervisorSig.lines.length === 0){
        textError+=ErrorMessageForRequiredSupervisorSignature ;
    }
    
    if(textError != ""){
        hideDialog();
        //show error popup
        errorPopup(tempValue,textError);
        $("#myModal").fadeIn(200);
    	textError="";
        return false;
    }
    else {
        __doPostBack('SaveAndApproveAlongWithSupervisorSignature');
    }
}

/****************** Start of methods for check box to select, unselect, validate, accept/reject Expenses/Mileages *********************/

/* javascript  function to change all checkbox on check/uncheck of single checkbox.*/
function ListSelectUnSelectAction(tempValue){

    $( ".ExpenseCheckClass" ).each(function(index) {
       $(this).attr("checked",tempValue.checked);
    });
    
}

/* javascript  function to change all checkbox on check/uncheck of single checkbox for mileage.*/
function ListSelectUnSelectActionForMileage(tempValue){

    $( ".MileageCheckClass" ).each(function(index) {
       $(this).attr("checked",tempValue.checked);
    });
    
}

var selectedCheckboxForMileage;
var selectedCheckboxForExpense;

//function to check the validation for Mileage checkbox
function checkValidationForMileageCheckbox() {
    $( ".MileageCheckClass" ).each(function(index) {
        if($('.MileageCheckClass').is(":checked")) {
           selectedCheckboxForMileage = true;
        }
        else{
           selectedCheckboxForMileage = false;
        }
    });  
}

//function to check the validation for Expense checkbox
function checkValidationForExpenseCheckbox() {
    $( ".ExpenseCheckClass" ).each(function(index) {
        if($('.ExpenseCheckClass').is(":checked")) {
           selectedCheckboxForExpense = true;
        }
        else{
           selectedCheckboxForExpense = false;
        }
    });  
}

// To show the error message when records are not checked for mileage
function CheckSelectedCheckboxes(tempValue){
    checkValidationForMileageCheckbox();
    if(tempValue == 'Approved') {
        if(selectedCheckboxForMileage == true) {
            __doPostBack('ApproveMileage');
        }
        else {
            $('#SelectItemFromListErrorId').html("");
            $('#SelectItemFromListErrorId').html(ErrorMessageForMileageToApprove);
            $('#ErrorMessgeForCheckbox').modal('show');
        }
    }
    if(tempValue == 'Rejected') {
        if(selectedCheckboxForMileage == true) {
            __doPostBack('RejectMileage');
        }
        else {
            $('#SelectItemFromListErrorId').html("");
            $('#SelectItemFromListErrorId').html(ErrorMessageForMileageToReject);
            $('#ErrorMessgeForCheckbox').modal('show');
        }
    }
}

// To show the error message when records are not checked for expense
function CheckSelectedCheckboxesForExpense(tempValue){
    checkValidationForExpenseCheckbox();
    if(tempValue == 'Approved') {
        if(selectedCheckboxForExpense == true) {
            __doPostBack('ApproveExpenses');
        }
        else {
            $('#SelectItemFromListErrorId').html("");
            $('#SelectItemFromListErrorId').html(ErrorMessageForExpenseToApprove);
            $('#ErrorMessgeForCheckbox').modal('show');
        }
    }
    if(tempValue == 'Rejected') {
        if(selectedCheckboxForExpense == true) {
            __doPostBack('RejectExpenses');
        }
        else {
            $('#SelectItemFromListErrorId').html("");
            $('#SelectItemFromListErrorId').html(ErrorMessageForExpenseToReject);
            $('#ErrorMessgeForCheckbox').modal('show');
        }
    }
}

/******************** End of methods for check box to select, unselect, validate, accept/reject Expenses/Mileages ***********************/

// Append object's API name to input fields name attribute for respective objects
function AddObjApiToInputAttrName(){
          
    var NameOfInputField = $(":input[name^='m$']");
   
    var NameOfInputFieldExpense__c = $("#Expense__c *");
   
    var NameOfInputFieldMileage__c = $("#Mileage__c *");
   
    for(i=0;i<NameOfInputField.length;i++){
       
        for(j=0; j<NameOfInputFieldExpense__c.length; j++){
          
            if( $(NameOfInputField[i]).attr('name')==$(NameOfInputFieldExpense__c[j]).attr('name')){
                
                $(NameOfInputField[i]).attr('name');    
                $(NameOfInputField[i]).attr('name','Expense__c$'+NameOfInputField[i].name);   
            }
        }
       
        for(j=0; j<NameOfInputFieldMileage__c.length; j++){
        
            if( $(NameOfInputField[i]).attr('name')==$(NameOfInputFieldMileage__c[j]).attr('name')){
                
                $(NameOfInputField[i]).attr('name');    
                $(NameOfInputField[i]).attr('name','Mileage__c$'+NameOfInputField[i].name);    
            }
        }     
        
    }
}

//Function to set scroll bar position on load
function scrollBarLocation (){
    var scrollVal= $('#scrollBarId').val();
    window.scrollTo(0,scrollVal);
}

//Function to get the location of the scroll bar on click of the button
function getTheLocationOftheButton(currentElem){
    scroll = $(window).scrollTop();
    $('#scrollBarId').val(scroll);
}

/* Function to set the id of Attachment in hidden text field to Remove Attachment */
function setAttachmentIDValueForRemove(targetbutton){
    $('#AttachmentIdForRemove').val(targetbutton.name);
}