/******************************Start Of Section for Service Agreement Print *******************************************/
    //Function to set the Service Plan Section Collapsible when checked and visa versa
    function setServiceAgreementHideShowCollapsible(currentElem)
    {
        var idOfCheckBox = currentElem.id;
        var CollapseDatatargetID = $('#'+idOfCheckBox).attr('data-target');
        
        if($('#'+idOfCheckBox).attr('checked'))   {
            
            $(CollapseDatatargetID).collapse('hide');
        }else{
             $(CollapseDatatargetID).collapse('show');
        }
           
    }

    //Function to Set the  parameters for the print URL to hide/show the section of  Service Agreement Plan on Print Page which is called on 'Print Service Plan'
    //Parameter Passed Ex: &ServiceArgeementData0=false,panelParentServiceAgreementSectionId0,collapseSA0&ServiceArgeementData1=false,panelParentServiceAgreementSectionId1,collapseSA1&ServiceArgeementData2=false,panelParentServiceAgreementSectionId2,collapseSA2
    function setTheJsonParameter(){
        
            //String to append in the URL         
            var appendURLForServiceAgreementNA = '';
            
            //Counter to get the count of the List of Service Agreement Section
            var counterForServiceAgreementSection = $("#counterServiceAgreementId").val();
            
            if(counterForServiceAgreementSection > 0){
                
                for(i=0;i<counterForServiceAgreementSection;i++){
                    
                    //Boolean that store the value of the section N/A field
                    var objBoolCheckBox = false;
                    
                    if($('#serviceAgreementSectionId'+i).prop("checked") === true){
                        objBoolCheckBox = true;
                    }
                    //Form the URL according the Sections Count and pass in the print functionality
                    //objBoolCheckBox: set true if the N/A checkbox is true
                    //$('#panelParentServiceAgreementSectionId'+i).attr('id') is the Parent Div Section in which the title is present
                    //$('#collapseSA'+i).attr('id') is the body which contains the content of the Service Plan Agreement
                    appendURLForServiceAgreementNA += '&ServiceArgeementData'+i+'='+ objBoolCheckBox+','+$('#panelParentServiceAgreementSectionId'+i).attr('id')+','+$('#collapseSA'+i).attr('id');
                }
                
            }
            //Print Functionality
            var strServicePlanId = getQueryVariable('id');
            var strFilterdBy = getServiceFilteredVariable();
            
            //Redirect to Print ISP page on click of 'Print Service Plan'
            window.open("/aspx/ServicePlanInterfacePrintFormat?id="+strServicePlanId+"&filteredByFunder="+strFilterdBy+appendURLForServiceAgreementNA);
            
    }
    
    //Function to get the parameter in print and hide the div of Service Agreement if N/A checked and called on load of Service Plan Print Page
    function setTheServiceAgreementOnPrint(){
            //Counter stores the number of parameters passed in the URL 
            var counter=0;
            
            //Append the Counter in the Param
            var param = "ServiceArgeementData"+counter;
            
            //Boolean to hide the full Service Agreement Section if all the N/A checkbox is checked
            var isHideAllServiceAgreementSection = true;
            
            
            //If the get param is not undefined then hide and show the Sections
            while(getQueryVariable(param) !== undefined){
            
               //Get  the 'ServiceArgeementData' value as the count increment
               var strParamVal = getQueryVariable(param);
               
               //Split the values passed in the URL 
               var partsOfStr  = strParamVal.split(',');
               
               //Check of 3 is added as three parameter are passed in the URL
               // Will execute only if all the 3 parameters are present
               if(partsOfStr.length === 3){
                   if(partsOfStr[0] === "true"){
                       $('#'+partsOfStr[1]).css("display","none");
                       $('#'+partsOfStr[2]).css("display","none");
                      
                   }
                   else{
                        isHideAllServiceAgreementSection = false;
                   }
               }
               
               counter=counter+1;
               //Append the updated counter value to get the next parameter
               param = "ServiceArgeementData"+counter;
               
            }
            
            //If all the checkbox are checked then hide the entire Service Agreement Section
            if(isHideAllServiceAgreementSection === true){
                $('#ServiceAgreementSectionId').css("display","none");
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

    
  
/******************************End Of Section for Service Agreement Print *******************************************/