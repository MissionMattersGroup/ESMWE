//To Hide the header of the page
$(document).ready(function() {
    $('.siteHeaderWrapper').css({"display": "none"});
    $('.mag-site-main-menu').css({"display": "none"});
    $('.siteFooter').css({"display": "none"});
    var collapseOut = $('.Out');
    for(var i = 0; i < collapseOut.length; i++) { 
        $(collapseOut[i]).addClass('in');
    }
});

/* Function to draw the signature*/       
$(function() {
    
    // To show the family signature div
    showSignatureBox("#CountOfFamilySignId","#familySig");
    
    // To show the staff signature div
    showSignatureBox("#CountOfStaffSignId","#staffSig");
    
    $('#SupervisorSig').signature();
    
	$('#clearSupervisor').click(function(event) {
		$('#SupervisorSig').signature('clear');
	});
	
   showSignature();
});

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
   textError="";
   showDialog();
   
   // To set family signatures into the hidden field
   setSignature("#CountOfFamilySignId","#familySig","#getFamilySignId");
   
   // To set staff signatures into the hidden field
   setSignature("#CountOfStaffSignId","#staffSig","#getStaffSignId");
   
   var newSupervisorSign = $('#SupervisorSig').signature('toJSON');
   $('#SaveSupervisorSignId').val(newSupervisorSign);
   
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