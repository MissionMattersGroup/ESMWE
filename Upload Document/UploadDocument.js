//Call the function on Load
$(document).ready(function() {
    //To Hide the header of the page
    $('.siteHeaderWrapper').css({"display": "none"});
    $('.mag-site-main-menu').css({"display": "none"});
    $('.siteFooter').css({"display": "none"});
    $('.siteBody').css({"background": "#DAD9D9"});
    
    //If the isSuccess = true then related parent page will reload
    showSuccessfulPopup();
    
    // To hide the file name div on load of the page
    $( "#FileNameId" ).hide();
    
    // To show and hide the file name div on change of the document type value
    $( "#Document_Type__c" ).change(function() {
        
        var valueOfDocumentType = this.value;
        if(valueOfDocumentType == "Other") {
            $( "#FileNameId" ).show();
            $('#File_Name__c').val("");
        }
        else {
            $( "#FileNameId" ).hide();
            $('#File_Name__c').val(valueOfDocumentType);
        }
    });
    
});

//Method to call the popup and check null validation
function validateNullFields() {
    
    var fileName = $('#File_Name__c').val();
    
    var contactId = getQueryVariable("id");
    
    if ($("#Document_Type__c").val() == "" || $("#File_Name__c").val() == "" 
        || $("#Expiration_Date__c").val()== "" || $("#attchId").val() == "") {
          $(".checkErrorPreventClass").css("display","block");     
    }
    else {
        $.ajax({
    		type: "GET",
    		url: "/aspx/UploadDocument/uploadNewFile",
    		data:{
    		    "strFileName":fileName,
    		    "strContactId":contactId
    		    },
    		success: function(comment) {
                if(comment !=null){
                    $('#uploadModal').modal('show');
                    $(".checkErrorPreventClass").css("display","none");
                }
                else {
                    $(".checkErrorPreventClass").css("display","none");
                    __doPostBack('uploadDocument');
                }
    		}
        });
    }
}

//Method to show the popup after successful upload of the document
function showSuccessfulPopup () {
    //Check the DataBag Store Val
    var isUploadSuccessful =$("#uploadSucesssId").val();
    if(isUploadSuccessful == "true"){
        $('#successUploadModal').modal('show');
    }
}

//Method to redirect to the Contact record
function doRedirectToConatct(){
    var strContactId= getQueryVariable("id");
    
    //Check the DataBag Store Val
    var isSuccess =$("#sucesssId").val();
    
    //If the isSuccess = true then related parent page will reload
    if(isSuccess=="true"){
        parent.location.reload();
    }
    else {
         window.location.href="https://eastersealsmidwest.magentrixcloud.com/"+strContactId ;
    }
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