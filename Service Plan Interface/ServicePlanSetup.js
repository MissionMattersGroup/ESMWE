       //Declaration of Array
        var servicePlanFields;
        var serviceFields;
        var goalsFields;
        var objectiveFields;
       
       //If the record is present it will display the records selected on load.
       $(document).ready(function(){
            //make the ajax call to get the field details
            getTheRecordsFromObjConfig();
        });
        /*
        * Description : Method to show the selected value on load if the record exists
        */
        function getTheRecordsFromObjConfig(){
            $.ajax({
            type: "GET",
            url: "/aspx/ServicePlanSetupPage/showTheFieldsOnLoad",
            success: function(comment) {
                if(comment !== false){
                    var selServicePlan    = $("#multiselect_rightList");
                    var selService        = $("#multiselectForService_rightList");
                    var selGoals          = $("#multiselectForGoals_rightList");
                    var selObject         = $("#multiselectForObjectives_rightList");
                    //alert(comment.Service_Plan_Fields__c.split(',').length );
                    //servicePlanFields = comment.Service_Plan_Fields__c.split(',');
                    serviceFields     = comment.Service_Fields__c.split(',');
                    goalsFields       = comment.Goals_Fields__c.split(',');
                    objectiveFields   = comment.Objective_Fields__c.split(',');
                    /*$.each(servicePlanFields,function(i){
                        selServicePlan.append('<option value="' + servicePlanFields[i] + '">' + servicePlanFields[i] + '</option>');
                    });*/
                    $.each(serviceFields,function(i){
                        selService.append('<option value="' + serviceFields[i] + '">' + serviceFields[i] + '</option>');
                    });
                    $.each(goalsFields,function(i){
                        selGoals.append('<option value="' + goalsFields[i] + '">' + goalsFields[i] + '</option>');
                    });
                    $.each(objectiveFields,function(i){
                        selObject.append('<option value="' + objectiveFields[i] + '">' + objectiveFields[i] + '</option>');
                    });
                    
                }
                getFieldDetails(); 
            }
            });
        }
        /*
        * Description : Method to show the object and dynamic list of the fields of the respective object
        */
        function getFieldDetails()
        {
                //var sel = $("#multiselect_leftList");
                //getTheEntityId("Force__Service_Plan__c",sel,servicePlanFields);
                var selForService = $("#multiselectForService_leftList");
                getTheEntityId("Force__Service__c",selForService,serviceFields);
                var selForGoals = $("#multiselectForGoals_leftList");
                getTheEntityId("Force__Goals__c",selForGoals,goalsFields);
                var selForObjectives = $("#multiselectForObjectives_leftList");
                getTheEntityId("Force__Objectives__c",selForObjectives,objectiveFields);
        }
        /*
        * Description : Method to save the fields selected for the respective objects
        */
        function SaveTheQuery(btnName){
            showDialog();
            var selectedVal              = [];
            var selectedValForService    = [];
            var selectedValForGoals      = [];
            var selectedValForObjectives = [];
            /*$('#multiselect_rightList option').each(function(i, selected){
              selectedVal[i]=$(selected).text();
            });*/
            $('#multiselectForService_rightList option').each(function(i, selected){
              selectedValForService[i]=$(selected).text();
            });
            $('#multiselectForGoals_rightList option').each(function(i, selected){
              selectedValForGoals[i]=$(selected).text();
            }); 
            $('#multiselectForObjectives_rightList option').each(function(i, selected){
              selectedValForObjectives[i]=$(selected).text();
            });
            REST2.exec({ 
            url:"/aspx/ServicePlanSetupPage/saveTheFields", 
            data:{strOfFieldsSelected:selectedVal, 
                  strOfFieldsSelectedForService:selectedValForService,
                  strOfFieldsSelectedForGoals:selectedValForGoals,
                  strOfFieldsSelectedForObjectives:selectedValForObjectives},
                callback:function(context) 
                { 
                    if (REST2.isSuccess(context)) {
                        console.log('into if');
                        if(btnName === 'Save') {
                            alert('Your record has been saved sucessfully!!!');
                            hideDialog();
                        }
                         if(btnName === 'SaveNext') {
                            window.location.href= "https://eastersealsmidwest.magentrixcloud.com/aspx/ServicePlanSetupRichTextAreaPage";
                            hideDialog();
                        }
                       
                    }
                }   
            });
        }
        /*
        * Description : Method to fetch the entity id for the respective string passed.
        */
        function getTheEntityId(strEntityName,sel,fieldsOfTheEntity){
            var storeEntityId='';
            $.ajax({
                url:'/rest/2.0/query?q=FROM Setup.Entity WHERE Name =="'+strEntityName+'"'+' SELECT Id',
                success: function(comment) 
                {
                     storeEntityId= comment.Records[0].Id;
                     $.ajax({
                        url:'/rest/2.0/query?q=FROM Setup.EntityField WHERE EntityId =="' + storeEntityId + '"' ,
                        success: function(comment) 
                        {
                            sel.empty();
                            for (var i=0; i<comment.Count; i++) 
                            {
                                if(jQuery.inArray( comment.Records[i].Name, fieldsOfTheEntity )<0)
                                sel.append('<option value="' + comment.Records[i].Id + '">' + comment.Records[i].Name + '</option>');
                            }
                        }
                    });
                }
            });
        }
        /*
        * Description : Redirect to the Home Screen on click of Cancel
        */
        function Cancel(){
            window.location = "https://eastersealsmidwest.magentrixcloud.com";
        }
        function redirectToPrevious(){
            showDialog();
            window.location =  "https://eastersealsmidwest.magentrixcloud.com/aspx/RiskAssessmentSetupForSections";
            hideDialog();
        }
        /*
        * Description : Redirect to Rich Text Area Configuration on click of Next
        */
        function redirectToNext(){
            showDialog();
            window.location =  "https://eastersealsmidwest.magentrixcloud.com/aspx/ServicePlanSetupRichTextAreaPage";
            hideDialog();
        }
        
        