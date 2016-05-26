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
        var strAccountBillingSummaryId= getQueryVariable('id');
        window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/AccountBillingSummaryInterface?typeView=edit&id="+strAccountBillingSummaryId;
    }
    //Method to redirect to the main page
    function doRedirect(){
      $('input').removeAttr('value'); 
        var strAccountBillingSummaryId= getQueryVariable('id');
        //var scroll = $(window).scrollTop();
        window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/AccountBillingSummaryInterface?typeView=detail&id="+strAccountBillingSummaryId;
                              
    }
    
/********************************************************Start of Error Validation **********************************************/
    // Method to display custom error pop-up
    function showCustomValidationErrorPopup(){
        if($("#errorCustomModal .ServerExceptionCustomClass").size()>0 )
        {
          $('#errorCustomModal').modal('show');
        }
    }
    // Method to display standard error pop-up
    function showValidationErrorPopup(){
       
        if($("#errorModal .validation-summary-errors ul li").size()>0 )
        {
          $('#errorModal').modal('show');
        }
    }

    $(document).ready(function() {
        //Method to get the error like DML Exception from the Controller Level and Display on Load
        showCustomValidationErrorPopup();
    });
/********************************************************End Of Error Validation **********************************************/
     
/********************************************************Start of the CheckBox Functionality**********************************************/
    
     /* javascript  function to change all checkbox on check/uncheck of single checkbox.*/
    function ListSelectUnSelectAction(tempValue){
        $( ".ProgressNoteCheckClass" ).each(function(index) {
           $(this).attr("checked",tempValue.checked);
        });
    }
    
    // To show the error message when records are not checked for Progress Note Records else Aprrove the records selected
    function CheckSelectedCheckboxesForProgressNoteRecordsToApprove(){
        var selectedCheckboxForProgressNote = checkValidationForProgressNoteCheckbox(".ProgressNoteCheckClass",ErrorMessageForProgressNoteToApprove);
    
        // If the checkbox is checked then call the method to approve the selected records
        if(selectedCheckboxForProgressNote === true) {
            __doPostBack('ApproveProgressNoteRecordSelected');
        }
            
        
    }
    // To show the error message when records are not checked for Progress Note Records else add records selected to "Pending Billing"
    function CheckSelectedCheckboxesForProgressNoteRecordsToAddToPending(){
        var selectedCheckboxForProgressNote = checkValidationForProgressNoteCheckbox(".ProgressNoteCheckClass",ErrorMessageForProgressNoteToAddToPending);
    
        // If the checkbox is checked then call the method to approve the selected records
        if(selectedCheckboxForProgressNote === true) {
            __doPostBack('PendingProgressNoteRecordSelected');
        }
            
        
    }
    
    //function to check the validation for Progress Note Records Checkbox else throw an validation error.
    function checkValidationForProgressNoteCheckbox(className, errorMsgVal) 
    {
        //Store the Boolean as true if one of the checkbox is selected else false
        var isRecordSelectedasChecked = false; 
        
        $( className ).each(function(index) {
            if($(className).is(":checked")) {
                isRecordSelectedasChecked = true;    
            }
            
        });
        //If none of the records are selected add the error message in the popup and display.
        if(isRecordSelectedasChecked === false){
            $('#SelectItemFromListErrorId').html("");
            //This error message is accessed from the Template that assigns the Custom Label which contains the error message
            $('#SelectItemFromListErrorId').html(errorMsgVal);
            $('#ErrorMessgeForCheckbox').modal('show');    
        }
        return isRecordSelectedasChecked;
       
    }
/********************************************************End of the CheckBox Functionality**********************************************/

/********************************************************Start of Preview Account Billing Summary**********************************************/
    
    // Method To check if Aproved Progress note records are present for Preview or not
    function ShowPreviewAccountBillingSummary() {
        
        var approvedProgressNoteId = $("#ApprovedProgressNoteId").val();
	
        if(approvedProgressNoteId == "true") {
            __doPostBack('getProgressNoteRecordsToPreviewAccountBillingSummary');
        }
        else{
            $('#SelectItemFromListErrorId').html("");
            //This error message is accessed from the Template that assigns the Custom Label which contains the error message
            $('#SelectItemFromListErrorId').html(ErrorMessageForPreviewAccountBillingSummary);
            $('#ErrorMessgeForCheckbox').modal('show');
        }
    }
/********************************************************End of Preview Account Billing Summary**********************************************/
