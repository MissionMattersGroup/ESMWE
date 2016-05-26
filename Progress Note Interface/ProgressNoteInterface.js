/* Function to draw the signature*/       
$(function() {
	$('#familySig').signature();
	$('#staffSig').signature();
	$('#SupervisorSig').signature();
	$('#ExternalSig').signature();
	
	$('#clearFamily').click(function(event) {
	    event.preventDefault();
		$('#familySig').signature('clear');
	});
	$('#clearStaff').click(function(event) {
	    event.preventDefault();
		$('#staffSig').signature('clear');
	});
    $('#clearSupervisor').click(function(event) {
	    event.preventDefault();
		$('#SupervisorSig').signature('clear');
	});
	$('#clearExternal').click(function(event) {
	    event.preventDefault();
		$('#ExternalSig').signature('clear');
	});
	
	var successPNId = $("#successPNId").val();
	
	if(successPNId == "true") {
	    $('#successMessgeForProgressNote').modal('show');
	}
	showSignature();
});

//Method to show the signature on load of the page
function showSignature(){
    
    var FamilySignature = $('#SaveFamilySignId').val();
    var StaffSignature = $('#SaveStaffSignId').val();
    var SupervisorSignature = $('#SaveSupervisorSignId').val();
    var ExternalSignature = $('#SaveExternalSignId').val();
    
    if (FamilySignature != '') {
        $('#familySig').signature('draw', FamilySignature);
    }
    if (StaffSignature != '') {
        $('#staffSig').signature('draw', StaffSignature);
    }
    if (SupervisorSignature != '') {
        $('#SupervisorSig').signature('draw', SupervisorSignature);
    }
    if (ExternalSignature != '') {
        $('#ExternalSig').signature('draw', ExternalSignature);
    }
}

//Method to set the Family signature and other signature values to the hidden fields for save and complete button
function setValueForSignAndSave(tempValue) {
    setValueToFamilySignTextField(tempValue);
    setValueToSignTextField(tempValue);
    showDialog();
    __doPostBack('SaveCompleteProgressNote',{validate:false});
    hideDialog();
}

//Method to set the Family signature and other signature values to the hidden fields for save button
function setValueForSignAndSaveCompletePNI(tempValue) {
    setValueToFamilySignTextField(tempValue);
    setValueToSignTextField(tempValue);
    $('#saveAndCompleteModal').modal('show');
}

//Method to set the Family signature values to the hidden fields
function setValueToFamilySignTextField(tempValue,buttonArg){
    
    var newFamilySign = $('#familySig').signature('toJSON');
    $('#SaveFamilySignId').val(newFamilySign);
    
    if(buttonArg == 'FamilySign') {
        __doPostBack('SaveFamilySignature'); 
    }
}

//Method to set the new signature values to the hidden fields
function setValueToSignTextField(tempValue){
   var newStaffSign = $('#staffSig').signature('toJSON');
   $('#SaveStaffSignId').val(newStaffSign);
   var newSupervisorSign = $('#SupervisorSig').signature('toJSON');
   $('#SaveSupervisorSignId').val(newSupervisorSign);
   var newExternalSign = $('#ExternalSig').signature('toJSON');
   $('#SaveExternalSignId').val(newExternalSign);
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

//Method to redirect to the main page
function doRedirect(){
  $('input').removeAttr('value');
    var strProgressNoteId= getQueryVariable('id');
    var scroll = $(window).scrollTop();
    window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/ProgressNoteInterface?typeView=detail&id="+strProgressNoteId
                            +"&scrollToOnLoad="+scroll;
     
}

//Method to redirect to the Service record
function doRedirectToService(){
    var strServiceId= getQueryVariable('ServiceId');
    window.location.href="https://eastersealsmidwest.magentrixcloud.com/"+strServiceId ;
}

//Method to redirect to the main page in edit mode
function doRedirectEditMode(){
  $('input').removeAttr('value');
    var strProgressNoteId= getQueryVariable('id');
    window.location.href="https://eastersealsmidwest.magentrixcloud.com/aspx/ProgressNoteInterface?typeView=edit&id="+strProgressNoteId;
}

/* Function to set the id of Goal in hidden text field underwhich new objective would be add as row fo insert*/
function setGoalIDValue(targetbutton){
   $('#GoalIdForSave').val(targetbutton.name);
}

/* Function to print entire page in printable format*/
function doPrint(event){
    event.preventDefault();
    var strProgressNoteId= getQueryVariable('id');
    window.open("/aspx/ProgressNoteInterfacePrintFormat?typeView=detail&id="+strProgressNoteId,"","width=1000px, height=650px");
}

/*********************************start Dropdown********************************************************************/
//method to do ajax call for change the picklist values of billing code with respect to funder for progress note
function changeBillingCode(ControllingDropDownFieldID,DependentDropDownFieldID,DependentLookupHiddenFieldID,CallingFrom) {
    
	// Controlling Drop Down Field ID
    var FunderId = $(ControllingDropDownFieldID).val(); 
    var ServiceId = $('#ServiceId').val();
    $.ajax({
		type: "GET",
		url: "/aspx/ProgressNoteInterface/ChangedBillingCodeListOnChangeOfFunder",
		stateful: true, 
		data:{
		     "strFunderId":FunderId,
		     "strServiceId":ServiceId
		     },
		success: function(resJsonData) {
		    
		    $(DependentDropDownFieldID+' option').remove(); 
    
            if(resJsonData.length>0 ){
                
                for(var i=0;i<resJsonData.length;i++){
        		     var strOption = "<option value="+resJsonData[i].key+">" + resJsonData[i].value +"</option>";
        		     $(DependentDropDownFieldID).append(strOption);
                }
                //To set the first value to the lookup
                if(CallingFrom == "Onchange") {
        	        $(DependentLookupHiddenFieldID).attr("value", resJsonData[0].key);      
                }
                if(CallingFrom == "Onload") {
                    //set the selected billing code id from lookup to dropdown on progress note
                    SetSelectedLookupValueToDropDown('#Div_Id_SelectedBillingCodeToHide','#m_0__Billing_Code__c','#BillingCodeOptionId');
                }
            }
		}
    });
}

//method to do ajax call for change the picklist values of billing code with respect to funder for TimeEntries
function changeBillingCodeForTimeEntries(ControllingDropDownFieldID,DependentDropDownFieldID,DependentLookupHiddenFieldID,
                                         ParentDivOfLookup,CallingFrom) {
    
	// Controlling Drop Down Field ID
    var FunderId = $(ControllingDropDownFieldID).val(); 
    var ServiceId = $('#ServiceId').val();
    $.ajax({
		type: "GET",
		url: "/aspx/ProgressNoteInterface/ChangedBillingCodeListOnChangeOfFunder",
		stateful: true, 
		data:{
		     "strFunderId":FunderId,
		     "strServiceId":ServiceId
		     },
		success: function(resJsonData) {
		    
		    $(DependentDropDownFieldID+' option').remove(); 
    
            if(resJsonData.length>0 ){
                
                for(var i=0;i<resJsonData.length;i++){
        		     var strOption = "<option value="+resJsonData[i].key+">" + resJsonData[i].value +"</option>";
        		     $(DependentDropDownFieldID).append(strOption);
                }
                //To set the first value to the lookup
                if(CallingFrom == "Onchange") {
        	        $(DependentLookupHiddenFieldID).attr("value", resJsonData[0].key);      
                }
                if(CallingFrom == "OnloadForNewRecord") {
                  
                    //set the Billing code dropdown value to billing code lookup of time entries
                    ChangeLookupValueFromDropdown(DependentDropDownFieldID,
                                                   ParentDivOfLookup,
                                                   DependentLookupHiddenFieldID);
                }
                if(CallingFrom == "OnloadForOldRecord") {
                    
                   //set the Billing code lookup value to billing code Drop Down of time entries
                   SetSelectedLookupValueToDropDown(ParentDivOfLookup,DependentLookupHiddenFieldID,DependentDropDownFieldID);
                    
                   
                }
            }
		}
    });
}

//Method to set the default Funder lookup value to dropdown
function SetSelectedLookupValueToDropDown(ParentDivOfLookup,LookupID,DropDownID) {
    var selectedFunderIdFromLookup = $(ParentDivOfLookup+' '+LookupID).val();
    if(selectedFunderIdFromLookup != null && selectedFunderIdFromLookup != 'undefined') {
        $(DropDownID).val(selectedFunderIdFromLookup);
    }
}

// method to set lookup value from dropdown
function ChangeLookupValueFromDropdown(DropDownID,ParentDivOfLookup,LookupID) {
    var selectedFunderIdFromDropdown = $(DropDownID).val();
    //Null values can de set
    if(selectedFunderIdFromDropdown != null && selectedFunderIdFromDropdown != 'undefined') {
        $(ParentDivOfLookup+' '+LookupID).attr("value", selectedFunderIdFromDropdown);
    }
}

$(document).ready(function() {
    showCustomValidationErrorPopup();
    
    //set the selected funder id from lookup to dropdown on progress note
    SetSelectedLookupValueToDropDown('#Div_Id_SelectedFunderOptionToHide','#m_0__Progress_Funder__c','#FunderOptionId');
    
    //change the dependent lookup of billing code on the basis of funder on progress note
    changeBillingCode('#FunderOptionId','#BillingCodeOptionId','#m_0__Billing_Code__c','Onload');
    
    var RowCountOfTimeEntries = $("#RowCountId").val();
    
    //Time Entries Conatin more tahn one record hence its old values of Look Set to Drop Down
    if(RowCountOfTimeEntries>1){
        
        for(var i = 0; i < RowCountOfTimeEntries-1; i++) { 
            
            //set the funder lookup value to dropdown
            SetSelectedLookupValueToDropDown('#Div_Id_SelectedFunderOptionForTimeEntriesToHide'+i,
                                              '#m_'+i+'__Payer_Code__c',
                                              '#FunderOptionIdForTimeEntries'+i);
                                              
            changeBillingCodeForTimeEntries('#FunderOptionIdForTimeEntries'+i,
                                            '#BillingCodeOptionIdForTimeEntries'+i,
                                            '#m_'+i+'__Time_Entries_Billing_Code__c',
                                             '#Div_Id_SelectedBillingCodeForTimeEntriesToHide'+i,
                                             'OnloadForOldRecord');                   
        }    
    }
    
    // set Time Entry Funder Drop Down Value to Funder look up , It always set for every last record of Time Entries check befor Time Entry have record
    if(RowCountOfTimeEntries>0){
        
        var lstTimeEntyIndex;
        
        lstTimeEntyIndex = RowCountOfTimeEntries-1;//it initialize with last time entry index 
        
        //set the funder dropdown value to funder lookup
        ChangeLookupValueFromDropdown('#FunderOptionIdForTimeEntries'+lstTimeEntyIndex,
                                       '#Div_Id_SelectedFunderOptionForTimeEntriesToHide'+lstTimeEntyIndex,
                                       '#m_'+lstTimeEntyIndex+'__Payer_Code__c');
        
        //Billing Code 
        changeBillingCodeForTimeEntries('#FunderOptionIdForTimeEntries'+lstTimeEntyIndex,
                                        '#BillingCodeOptionIdForTimeEntries'+lstTimeEntyIndex,
                                        '#m_'+lstTimeEntyIndex+'__Time_Entries_Billing_Code__c',
                                         '#Div_Id_SelectedBillingCodeForTimeEntriesToHide'+lstTimeEntyIndex,
                                         'OnloadForNewRecord');
            
    }
});
/*********************************End Dropdown***************************************************************************************/