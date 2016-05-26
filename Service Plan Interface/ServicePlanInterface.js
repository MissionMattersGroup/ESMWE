/* To show the popup on click of Add row*/
$(document).ready(function() {
    showCustomValidationErrorPopup();
    showHelpText();
    
    var successISPId = $("#successISPId").val();
	
	if(successISPId == "true") {
	    $('#successMessgeForISP').modal('show');
	}
});

/* Function to draw the signature*/       
$(function() {
    
    // To show the family signature div
    showSignatureBox("#CountOfFamilySignId","#familySig");
    
    // To show the staff signature div
    showSignatureBox("#CountOfStaffSignId","#staffSig");
    
    //Method to add blank signature box for the Existing Family Records
    showSignatureBox("#DuplicateExistingCountOfFamilySignId","#DuplicateExistingFamilySig");
    
    //Method to add blank signature box for the Existing Staff Records
    showSignatureBox("#DuplicateExistingCountOfStaffSignId","#DuplicateExistingStaffSig");
    
    //Method to clear the signature when click on clear button for family
    ClearFunctionality(".SigClearButtonClass","AssosiatDivId");
    
    //Method to clear the signature when click on clear button for staff
    ClearFunctionality(".StaffSigClearButtonClass","AssosiatStaffDivId");
    
    //Method to clear the signature when click on clear button which is drawn on Re-Sign Button for family
    ClearFunctionality(".DuplicateSigClearButtonClass","DupAssosiatDivId");
    
    //Method to clear the signature when click on clear button which is drawn on Re-Sign Button for Staff
    ClearFunctionality(".DuplicateStaffSigClearButtonClass","DupAssosiatStaffDivId");
    
    $('#SupervisorSig').signature();
    
	$('#clearSupervisor').click(function(event) {
		$('#SupervisorSig').signature('clear');
	});
	
   showSignature();
});

/* Function to set the id of service in hidden text field*/
function setServiceIDValue(targetbutton){
    $('#ServiceIdForSave').val(targetbutton.name);
}

/* Function to set the id of service in hidden text field to Edit Service */
function setServiceIDValueForEdit(targetbutton){
    $('#ServiceIdForEdit').val(targetbutton.name);
}

/* Function to set the id of service in hidden text field to Edit Service */
function setGoalIDValueForEdit(targetbutton){
    $('#GoalIdForEdit').val(targetbutton.name);
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

// Method to get the value of funder selected from picklist
function getServiceFilteredVariable() {
    var selectedOption = 'None';
    if($("#serviceCount").val() > 0) {
        var selectedFunder = document.getElementById("FunderForFilter");
        selectedOption = selectedFunder.options[selectedFunder.selectedIndex].value;
    }
    return selectedOption;
}

//Method to show the signature on load of the page
function showSignature(){
    
    // To display family signatures (draw)for all the signatures which are existing in a system
    drawSignature("#ExistingCountOfFamilySignId","#SaveFamilySignId","#ExistingfamilySig");
    
    // To display family signatures (draw)for all the signatures when user clicks on Add button for family signature
    drawSignature("#CountOfFamilySignId","#getFamilySignId","#familySig");
    
    // To display staff signatures (draw)for all the signatures which are existing in a system
    drawSignature("#ExistingCountOfStaffSignId","#SaveStaffSignId","#ExistingStaffSig");
    
    // To display staff signatures (draw)for all the signatures when user clicks on Add button for Staff signature
    drawSignature("#CountOfStaffSignId","#getStaffSignId","#staffSig");
    
    var SupervisorSignature = $('#SaveSupervisorSignId').val();
    if (SupervisorSignature != ''){
       $('#SupervisorSig').signature('draw', SupervisorSignature); 
    }
}

//Method to set the new signature values to the hidden fields
function setValueToSignTextField(tempValue){
   
    // To set family signatures into the hidden field
    setSignature("#CountOfFamilySignId","#familySig","#getFamilySignId");
   
    // To set staff signatures into the hidden field
    setSignature("#CountOfStaffSignId","#staffSig","#getStaffSignId");
   
    var newSupervisorSign = $('#SupervisorSig').signature('toJSON');
    $('#SaveSupervisorSignId').val(newSupervisorSign);
   
    //method to check family signature is blank or not
    if (current_user_role.indexOf(Family_role) !=-1 && (tempValue.id == "saveCompleteId" || tempValue.id == "saveSignatureId" )) {
        
         ValidateNullCheckSignature("#CountOfFamilySignId","#familySig",ErrorMessageForRequiredFamilySignature);
    }
    
    if (tempValue.id == "saveCompleteId") {
        validateStaffAndFamilySignature("#countOfFamilySignature",ErrorMessageForFamilySignatureValidation);
        validateStaffAndFamilySignature("#countOfStaffSignature",ErrorMessageForStaffSignatureValidation);
    }
   
    if($('#ShowErrorMeassageId').html() != ""){
        hideDialog();
        //show error popup
        $('#errorCustomValidationModal').modal('show'); 
        return false;
    }
    else {
        
        if (tempValue.id == "saveCompleteId") {
            $('#saveAndCompleteISPModal').modal('show');
        }
        else
            if(tempValue.id == "saveAllISPInfoId") {
                showDialog();
                  __doPostBack('SaveAllInfoOnISP');
                hideDialog();
            }
        else 
            if(tempValue.id == "saveSignatureId") {
                showDialog();
                 __doPostBack('SaveSignature');
                hideDialog();
            }
    }
}

//Method to close the popup and redirect to the main page
function doRedirect(){
    $('input').removeAttr('value');
    var strServicePlanId= getQueryVariable('id');
    window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/ServicePlanInterface?id="+strServicePlanId;
}

//Method to Cancel and comes to the same position
function doRedirectOnCancel(){
    $('input').removeAttr('value');
    var strServicePlanId= getQueryVariable('id');
    var scroll = $(window).scrollTop();
    window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/ServicePlanInterface?id="+strServicePlanId+"&scrollToOnLoad="+scroll;
}

//Check if Family signature field is blank if true then set an error for the same (strSignatureRowCountId, strSignatureDivId)
function ValidateNullCheckSignature(strSignatureRowCountId, strSignatureDivId,errorMsgVal){
    
   // Total no of new Family signatures fetch from hidden field which stores count of it
   var RecordIndexCountForSign = $(strSignatureRowCountId).val();

   // To set family signatures into the hidden field
   for(var i = 0; i <= RecordIndexCountForSign; i++) { 
       
        value = $(strSignatureDivId+i).signature('toJSON');
        objFamilySig = JSON.parse(value);
        
        if(objFamilySig.lines.length === 0){
            $('#ShowErrorMeassageId').html("");
            //This error message is accessed from the Template that assigns the Custom Label which contains the error message
            $('#ShowErrorMeassageId').html(errorMsgVal);
            return (false);
        }
   }
}

//check if family and staff signature record exist when user click on "save and complete ISP"
function validateStaffAndFamilySignature(strSignatureCountId, errorMsgVal) {
    
    // count of family signature present in the system
    var countOfSignature = $(strSignatureCountId).val();
    if (countOfSignature == 0) {
        //This error message is accessed from the Template that assigns the Custom Label which contains the error message
        $('#ShowErrorMeassageId').append('<br/>'+errorMsgVal);
        return (false);
    }
}

/* Function to draw multiple signature where user can do multiple signatures for staff and family
* strSignatureRowCountId - Id of the signature Row count when user multiple times clicks on the Add button
* strSignatureHiddenFieldId - Id of the signature Hidden field when user multiple times clicks on the Add button
* strSignatureDivId - Id of the signature div when user multiple times clicks on the Add button
*/ 
function drawSignature(strSignatureRowCountId, strSignatureHiddenFieldId, strSignatureDivId) {
    
    //This Signature Section Display Existing and New Signature after  load of the page
    // Total no of signatures fetch from hidden field which stores count of it
    var RowCountOfSignature = $(strSignatureRowCountId).val();
    
    // To display (draw)for all the signatures which are existing in a system
    for(var i = 0; i <= RowCountOfSignature; i++) { 
         var SignatureToDisplay = $(strSignatureHiddenFieldId+i).val();
         if(SignatureToDisplay!=''){
             $(strSignatureDivId+i).signature();
             $(strSignatureDivId+i).signature('draw', SignatureToDisplay);
         }
    }
}

/* Function to set multiple signature values in hidden field for staff and family
* strSignatureRowCountId - Id of Total no of new signatures fetch from hidden field which stores count of it
* strSignatureHiddenFieldId - Id of the signature Hidden field 
* strSignatureDivId - Id of the signature div
*/
function setSignature(strSignatureRowCountId, strSignatureDivId, strSignatureHiddenFieldId) {
    // Total no of new signatures fetch from hidden field which stores count of it
   var RecordIndexCount = $(strSignatureRowCountId).val();
    
   // To set signatures into the hidden field
   for(var i = 0; i <= RecordIndexCount; i++) { 
        newSignature = $(strSignatureDivId+i).signature('toJSON');
        $(strSignatureHiddenFieldId+i).val(newSignature);
   }
}

/* Method to clear the signature when click on clear button
* strDivSignatureClass - Htmlclass for div to identify user click on clear button
* strAssosiatedDivId - Id of the Assosiated div to identify user click on clear button of which div
*/
function ClearFunctionality(strDivSignatureClass, strAssosiatedDivId){
    
    $(strDivSignatureClass).click(function() {
		var sigDivBoxIDToClear = $(this).attr( strAssosiatedDivId);
		$('#'+sigDivBoxIDToClear).signature('clear');
		sigDivBoxIDToClear='';
    });
}

/* Method to Show the signature box to div
* strSignatureRowCountId - Id of Total no of new signatures divs when click on add button
* strSignatureDivId - Id of the signature div
*/
function showSignatureBox(strSignatureRowCountId,strSignatureDivId) {
    var RowCountOfSignature = $(strSignatureRowCountId).val();
    if(RowCountOfSignature != undefined) {
        $(strSignatureDivId).signature();
        for(var i = 0; i <= RowCountOfSignature; i++) { 
            $(strSignatureDivId+i).signature();
        }
    }
}

//This method is used to show the help text for CLIENT INFORMED CONSENT section
function showHelpText(){
    $(".red-tooltip").tooltip();
}

/* Method to Re-Sign the Record Id of the Signature Clicked for resign 
* counterValue - Counter of the Div for which the Record Id needs to be retrieved
*/
function ReAssignSignature(tempValue,counterValue){
    
    if (tempValue == 'Family') {
        //Hide the read only section for family
    	$('#ExistingFamilySignature'+counterValue).hide();
    	
    	//Show the family Signature Box to be Signed 
    	$('#DuplicateExistingFamilySignature'+counterValue).show();
       
        // To get  signature's id to be updated into the hidden field for family
        var newSignatureRecordId = $("#DuplicateSaveFamilySignId"+counterValue).attr("RecordContextId");
       
         // To set signature's id to be updated into the hidden field for family
        $("#resignedRecordIdVal").val(newSignatureRecordId);
    }
    
    if (tempValue == 'Staff') {
        //Hide the read only section for staff
    	$('#ExistingStaffSignature'+counterValue).hide();
    	
    	//Show the staff Signature Box to be Signed 
    	$('#DuplicateExistingStaffSignature'+counterValue).show();
       
        // To get  signature's id to be updated into the hidden field for staff
        var newStaffSignatureRecordId = $("#DuplicateSaveStaffSignId"+counterValue).attr("RecordStaffContextId");
        
         // To set signature's id to be updated into the hidden field for staff
        $("#resignedStaffRecordIdVal").val(newStaffSignatureRecordId);
    }
}

/* Method to Cancel the changes made on click of Resign Button
*/
function CancelSignature(tempValue,counterValue){
    
    if (tempValue == 'Family') {
      	$('#ExistingFamilySignature'+counterValue).show();
    	$('#DuplicateExistingFamilySignature'+counterValue).hide();
    }
    if (tempValue == 'Staff') {
    	$('#ExistingStaffSignature'+counterValue).show();
    	$('#DuplicateExistingStaffSignature'+counterValue).hide();
    }
}

/* Method to Save the updated signature on click of Save link 
*/
function SaveSignature(tempValue,counterValue){
    
    if (tempValue == 'Family') {
        //Get the value of the Signature Section which needs to be saved
        ReAssignSignature(tempValue,counterValue);
        
        //Get the value of the Signature which needs to be updated
        var newSignatureVal =  $("#DuplicateExistingFamilySig"+counterValue).signature('toJSON'); 
        
        //Store the updated value of the Signature in the hidden field
        $("#updatedSignatureVal").val(newSignatureVal);
        
        objFamilySig = JSON.parse(newSignatureVal);
        
        //Check if the Signature is not blank
        if(objFamilySig.lines.length !== 0 ){
            showDialog();
                __doPostBack('SaveFamilySignatureOnResign');
            hideDialog();
        }
        else{
            $('#ShowErrorMeassageId').html("");
            //This error message is accessed from the Template that assigns the Custom Label which contains the error message
            $('#ShowErrorMeassageId').html(ErrorMessageForNullResignValue);
        }
    }
    if (tempValue == 'Staff') {
        //Get the value of the Signature Section which needs to be saved
        ReAssignSignature(tempValue,counterValue);
        
        //Get the value of the Signature which needs to be updated
        var newStaffSignatureVal =  $("#DuplicateExistingStaffSig"+counterValue).signature('toJSON'); 
        
        //Store the updated value of the Signature in the hidden field
        $("#updatedStaffSignatureVal").val(newStaffSignatureVal);
        
        objStaffSig = JSON.parse(newStaffSignatureVal);
        
        //Check if the Signature is not blank
        if(objStaffSig.lines.length !== 0 ){
            showDialog();
                __doPostBack('SaveStaffSignatureOnResign');
            hideDialog();
        }
        else{
            $('#ShowErrorMeassageId').html("");
            //This error message is accessed from the Template that assigns the Custom Label which contains the error message
            $('#ShowErrorMeassageId').html(ErrorMessageForNullResignValue);
        }
    }
    
    //Display error message if the Signature Value is Blank
    if($('#ShowErrorMeassageId').html() != ""){
        hideDialog();
        //show error popup
        $('#errorCustomValidationModal').modal('show'); 
        $("#errorCustomValidationModal").fadeIn(2000);
        return false;
    }
}

