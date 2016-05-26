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
        var strBillingSummaryId= getQueryVariable('id');
        window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/BillingSummaryInterface?typeView=edit&id="+strBillingSummaryId;
    }
    
    //Method to redirect to the main page
    function doRedirect(){
      $('input').removeAttr('value'); 
        var strBillingSummaryId= getQueryVariable('id');
        //var scroll = $(window).scrollTop();
        window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/BillingSummaryInterface?typeView=detail&id="+strBillingSummaryId;
                              
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

/****************************************Start of CheckBox Functionality*******************************************************/ 
    /* javascript  function to change all checkbox on check/uncheck of single checkbox for Unbilled progress Notes*/
    function ListSelectUnSelectAction(tempValue){
        $( ".ProgressNoteCheckClass" ).each(function(index) {
           $(this).attr("checked",tempValue.checked);
        });
    }
    
    function ListSelectUnSelectActionForPendingProgressNote(tempValue){
        $( ".PendingProgressNoteCheckClass" ).each(function(index) {
           $(this).attr("checked",tempValue.checked);
        });
    }
    
    // To show the error message when records are not checked for Progress Note Records else Aprrove the records selected
    function CheckSelectedCheckboxesForProgressNoteRecordsToAddToBilling(){
        
        var selectedCheckboxForProgressNote = checkValidationForProgressNoteCheckbox(".ProgressNoteCheckClass",ErrorMessageForProgressNoteToAddToBilling);
    
        // If the checkbox is checked then call the method to Add To Billing for  the selected records
        if(selectedCheckboxForProgressNote === true) {
            __doPostBack('AddToBillingProgressNoteRecordSelected');
        }
    }
    
    // To show the error message when records are not checked for pending Progress Note Records else remove the records selected
    function CheckSelectedCheckboxesForProgressNoteRecordsToRemove(){
        
        var selectedCheckboxForPendingProgressNote = checkValidationForProgressNoteCheckbox(".PendingProgressNoteCheckClass",ErrorMessageForProgressNoteToRemove);
    
        // If the checkbox is checked then call the method to Remove for the selected records
        if(selectedCheckboxForPendingProgressNote === true) {
            $('#MessgeForRemoveProgressNoteCheckbox').modal('show');  
        }
    }
    
    // To show the error message when records are not checked for pending Progress Note Records else remove the records selected
    function CheckSelectedCheckboxesForMassEditUnbilledProgressNoteRecords(){
        
        var selectedCheckboxForMassEditProgressNote = checkValidationForProgressNoteCheckbox(".ProgressNoteCheckClass",ErrorMessageForMassEditProgressNotes);
    
        // If the checkbox is checked then call the method to mass edit selected records
        if(selectedCheckboxForMassEditProgressNote === true) {
            __doPostBack('EditUnbilledProgressNotes');
        }
    }
    
    //Method to show confirmation popup
    function SaveUnbilledProgressNoteRecords(){
        
        var selectedCheckboxForMassSaveProgressNote = checkValidationForProgressNoteCheckbox(".ProgressNoteCheckClass",ErrorMessageForMassSaveProgressNotes);
        
        //If the checkbox is checked then call the method to mass save selected records
        if(selectedCheckboxForMassSaveProgressNote === true) {
            $('#MessgeForEditProgressNote').modal('show'); 
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
/****************************************End of CheckBox Functionality*******************************************************/ 

/****************************************Start of Preview Billing summary Functionality**************************************/ 

    // Method To check if records are present for Preview or not
    function ShowPreviewBillingSummary() {
        
        var isRecordSelectedasChecked;
        
        var pendingProgressNoteId = $("#PendingProgressNoteId").val();
        
        //Store the value of the DataBag true if the Status is Pending and Records are locked
        var  boolStatusPendingBilling = $("#BooleanStatusPendingBilling").val();
        
        $(".ProgressNoteCheckClass" ).each(function(index) {
            if($(".ProgressNoteCheckClass").is(":checked")) {
                isRecordSelectedasChecked = true;    
            }
        });
        
        if(pendingProgressNoteId == "true" || isRecordSelectedasChecked == true ) {
            __doPostBack('getProgressNoteRecordsToPreviewBillingSummary');
        }
        else{
            $('#SelectItemFromListErrorId').html("");
            if(boolStatusPendingBilling == "True"){
                //This error message is accessed from the Template that assigns the Custom Label which contains the error message
                $('#SelectItemFromListErrorId').html(ErrorMessageForProgressNoteToPreviewBillingSummaryIfRecordLocked); 
            }else{
                //This error message is accessed from the Template that assigns the Custom Label which contains the error message
                $('#SelectItemFromListErrorId').html(ErrorMessageForProgressNoteToPreviewBillingSummary);
            }
            $('#ErrorMessgeForCheckbox').modal('show');
        }
    }
/****************************************End of Preview Billing summary Functionality**************************************/ 
/****************************************Start of Submit To Billing Functionality******************************************/

    //Method to display the Comfirmation Popup on click of "Submit To Billing"
    function setTheStatusOnSubmitBilling(){
         $('#ConfirmationPopupForSubmitBilling').modal('show'); 
    }
        
/****************************************End of Submit To Billing Functionality******************************************/

/****************************************Start of custom lookup Functionality******************************************/
    //Method to change the name and id of the lookup inputs
    function changeBillingCodeLookupIDAndName(){
        var count = 0; 
	    $("#UnbilledProgressNoteTableId td div.lookup").each(function(){
		
    		if(count>0){
    		    //div id changed
    		    this.id="m$"+count+"$.Billing_Code__c_link";
    		    //first input id and name changed
    		    $(this).children('#m_0__Billing_Code__c_tb').attr("id", "m_"+count+"__Billing_Code__c_tb");
    		  
    		    $("#m_"+count+"__Billing_Code__c_tb").attr("name","m$"+count+"$.Billing_Code__c_tb");
    		  
    		    //anchor id changed
    		    $(this).children('#m_0__Billing_Code__c_btn').attr("id", "m_"+count+"__Billing_Code__c_btn");
    		  
    		    //second inpur id and name changed 
    		    $(this).children('#m_0__Billing_Code__c').attr("id", "m_"+count+"__Billing_Code__c");
    		
    		    $("#m_"+count+"__Billing_Code__c").attr("name", "m$"+count+"$.Billing_Code__c");
    		  
    		    createLookupFunctionforEachLookup(count);
    		  
    		    createSetFunctionforEachLookup(count);
    		  
    		}
		    count=count+1;
	    });
    } 
    
    // Set the value of the selected billing code to the lookup field 
    function createSetFunctionforEachLookup(index){
    
    	name = 'Setm_'+index+'__Billing_Code__c_tb';//dynamically generate name 
    	window[name] = function (name, Id) {   
    	    $('#m_'+index+'__Billing_Code__c_tb').val($('<textarea/>').html(name).val());
			$('#m_'+index+'__Billing_Code__c').val(Id).trigger('change');
			if ($('#m_'+index+'__Billing_Code__c').val() && false) void(0);
			else $('#m_'+index+'__Billing_Code__c_tb').focus();
		}
    }	
    
    // create the function to generate the lookup for billing code
    function createLookupFunctionforEachLookup(index) {
        
        var FunderOfBillingSummary = $("#FunderOfBillingSummaryId").val();
        var ProgressNoteObjectId = $("#progressNoteObjectId").val();
        var BillingCodeFieldId = $("#billingCodeFieldId").val();
        
		$(function() {
			$('#m_'+index+'__Billing_Code__c_tb').lookup({
		    	lookupUrl: '/Force/Force__Funder_Code__c/Lookup?rfid='+BillingCodeFieldId+'&epfx='+ProgressNoteObjectId+'',
                serviceUrl: '/Force/Force__Funder_Code__c/JsonLookup?count=5&rfid='+BillingCodeFieldId+'&epfx='+ProgressNoteObjectId+'',
				filters: [{
				    name: '7OO00000000001D00lH',
					id: 'm_'+index+'__Progress_Funder__c',
					def: FunderOfBillingSummary
				}]
			});
		});
		
    }
/****************************************End of custom lookup Functionality******************************************/
    //Method to redirect to the main page
    function doRedirect(){
        var strBillingSummaryId= getQueryVariable('id');
        window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/BillingSummaryInterface?typeView=detail&id="+strBillingSummaryId;
    }