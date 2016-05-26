   //Declaration of Array
   var servicePlanFields;
   //Variable to store the counter of the form
   var counterValForForm=1;
   //Variable stores on load values
   var counterForOnLoadValuesForSection=0;
   
   //If the record is present it will display the records selected on load.
   $(document).ready(function(){
        $.ajax({
        type: "GET",
        url: "/aspx/ServicePlanSetupForSections/showTheFieldsOnLoad",
        success: function(comment) {
                if(comment !== false){
                    
                    for(z=0;z<comment.length;z++){
                       addRows(); 
                    }
                    getTheRecordsFromObjConfig();
                }
                else{
                    addRows();
                }
            }
        });
        
    });
    /*
    * Description : Method to show the selected value on load if the record exists
    */
    function getTheRecordsFromObjConfig(){
        $.ajax({
        type: "GET",
        url: "/aspx/ServicePlanSetupForSections/showTheFieldsOnLoad",
        success: function(comment) {
            if(comment !== false){
                var dynamicId =counterValForForm-1;
                var selServicePlan = $('#'+'multiselect_rightList'+dynamicId+'');
                counterForOnLoadValuesForSection = comment.length;
                for(k=1;k<=counterForOnLoadValuesForSection;k++){
                    if(comment[k-1]!== null && comment[k-1]!== ""
                    && comment[k-1]!== undefined ){
                        var selServicePlan = $('#'+'multiselect_rightList'+k+'');
                        $('#'+'recordId'+k+'').val(comment[k-1].Id);
                        if(comment[k-1].Sequence__c !== null){
                            $('#'+'sequenceId'+k+'').val(comment[k-1].Sequence__c);
                        }
                        if(comment[k-1].Title_Of_Section__c !== null){
                            $('#'+'titleName'+k+'').val(comment[k-1].Title_Of_Section__c);
                        }
                        if(comment[k-1].No_Of_Columns__c !== null){
                            $('#'+'NoColValId'+k+'').val(comment[k-1].No_Of_Columns__c);
                        }
                        if(comment[k-1].Collapse_Section__c !== null && comment[k-1].Collapse_Section__c === true ){
                            $('#'+'collapseId'+k).prop('checked', true);
                        }
                        if(comment[k-1].Fields_for_Section__c !== null){
                            servicePlanFields  = comment[k-1].Fields_for_Section__c.split(',');
                            $.each(servicePlanFields,function(i){
                                    if(servicePlanFields[i] !== "" && servicePlanFields[i] !== null){
                                        selServicePlan.append('<option class="optionsClass" value="' + servicePlanFields[i] + '">' + servicePlanFields[i] + '</option>');   
                                    }
                                    
                            });     
                        }
                        
                    }
                    
                    
                }
               
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
            for(f=0;f<=counterValForForm;f++){
                 var sel = $('#multiselect_leftList'+f+'');
                getTheEntityId("Force__Service_Plan__c",sel,servicePlanFields);
            }
    }
    /*
    * Description : Method to fetch the entity id for the respective string passed.
    */
    function getTheEntityId(strEntityName,sel,fieldsOfTheEntity){
        showDialog();
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
                        sel.append('<option class="optionsClass blankSpaceClass" value="BlankSpace" >BlankSpace</option>');
                        for (var i=0; i<comment.Count; i++) 
                        {
                            if(comment.Records[i].Name !== "Staff_Signature__c" && comment.Records[i].Name !==  "Family_Signature__c"){
                                if(jQuery.inArray( comment.Records[i].Name, fieldsOfTheEntity )<0)
                                sel.append('<option class="optionsClass" value="' + comment.Records[i].Id + '">' + comment.Records[i].Name + '</option>');
                            }
                            
                        }
                    }
                });
            }
        });
        hideDialog();
    }
     /*
    * Description : Method to remove the section on click of Remove Section the Page.
    */
    function removeRows(){
        showDialog();
        if(counterValForForm>2){
            counterValForForm                =counterValForForm-1;
            var removeTheForm                = $('#'+'divForSection'+counterValForForm);
            
            var idOfTheRecordsForDel         = $('#'+'recordId'+counterValForForm).val();
            if(idOfTheRecordsForDel!== null && idOfTheRecordsForDel!== "" && idOfTheRecordsForDel !== undefined){
                REST2.exec({ 
                    url:"/aspx/ServicePlanSetupForSections/deletePrevRecords" , 
                    data:{strSectionId :idOfTheRecordsForDel }, 
                        callback:function(context) 
                        { 
                             if (REST2.isSuccess(context)) {
                             }
                               
                        }   
                });
            }
            removeTheForm.empty();
        }
        else{
            alert('You can\'t remove the first section');
        }
        
        hideDialog();
    }
    /*
    * Description : Method to redirect on the next page on click of next.
    */
    function Next(){
        showDialog();
        window.location = "https://eastersealsmidwest.magentrixcloud.com/aspx/RiskAssessmentSetupForSections";
        hideDialog();
    }
    
    /*
    *Description: Method to display the Section on Click of Add Rows
    */
    function addRows(){
        showDialog();
            var frm = '';
            frm+= '<div id=divForSection'+counterValForForm+'>';
            frm+= '<br/>';
            frm+= '<div style="display:none;" id=recordId'+counterValForForm+'></div>';
            frm+= '<div class="col-md-12">';
            //frm+= '<div class="col-md-8 setPaddingFirstElement">';
            frm+= '<div class="panel panelClass">';                                                        
            frm+= '<div class="panel-heading" style="height: 35px;">';
            frm+= '<h4 class="panel-title" >';
            frm+= '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne<%=i%>" >';
            frm+= '<i class="indicator glyphicon  pull-left glyphicon-chevron-down"></i>';
            frm+= '</a>';
            frm+= '<p class="solid" style="font-size: 15px"><b>Section '+counterValForForm+'</b></p>';
            frm+=' </h4>';
            frm+= '</div>';
            frm+= '</div>';
            frm+= '</div>';
            frm+= '<div id=collapseOne'+counterValForForm+' class="section container-fluid panel-collapse collapse in">';
            frm+= '<div class="col-md-12">';
            frm+= '<div class="col-md-4 setPaddingFirstElement">';
            frm+= '<label id="sequenceNoId">Sequence Number</label><br/>';
            frm+= '<input type="text" class="form-control" id=sequenceId'+counterValForForm+' name="fieldVal" size="50" value="'+counterValForForm+'">';
            frm+= '</div>';
            frm+= '</div>';
            frm+= '<br/>';
            frm+= '<br/>';
            frm+= '<div class="col-md-12">';
            frm+= '<div class="col-md-4 setPaddingFirstElement">';
            frm+= '<label id="NoOfColId">No Of Columns</label><br/>';
            frm+= '<select id=NoColValId'+counterValForForm+'>';
            frm+= '<option value="1">1</option>';
            frm+= '<option value="2">2</option>';
            frm+= '</select>';
            frm+= '</div>';
            frm+= '</div>';
            frm+= '<br/>';
            frm+= '<br/>';
            frm+= '<div class="col-md-12">';
            frm+= '<div class="col-md-4 setPaddingFirstElement">';
            frm+= '<label id="titleNameId">Section Title</label><br/>';
            frm+= '<input type="text" class="form-control" id=titleName'+counterValForForm+' name="fieldVal" size="50" value="">';
            frm+= '</div>';
            frm+= '</div>';
            frm+= '<br/>';
            frm+= '<br/>';
            frm+= '<div class="col-md-12">';
            frm+= '<div class="col-md-4 setPaddingFirstElement">';
            frm+= '<div class="form-control-static">';
            frm+= '<label id="sequenceNoId">Fields For Service Plan</label><br/>';
            frm+= '<table id="multiselecttable" class="" cellpadding="0" cellspacing="0" border="0">';
            frm+= '<tbody>';
            frm+= '<tr class="">';
            frm+= '<td>';
            frm+= '<span><select id=multiselect_leftList'+counterValForForm+' title="" multiple="multiple" ondblclick="javascript:multiPicklist_moveItems(\'multiselect'+counterValForForm+'\');"  size="10" style="min-width:200px;min-height:60px;resize:both;"></select>';
            frm+= '</span>';
            frm+= '</td>';
            frm+= '<td class="multiSelectPicklistCell" style="vertical-align:middle;">';
            frm+= '<a title="Add"onClick="SelectMoveRows(multiselect_leftList'+counterValForForm+',multiselect_rightList'+counterValForForm+')">';
            frm+= '<img class="picklistArrowRight" title="Add" alt="Add" src="/_assets/images/s.gif">';
            frm+= '</a><br><br>';
            frm+= '<a title="Remove"  onClick="SelectMoveRows(multiselect_rightList'+counterValForForm+',multiselect_leftList'+counterValForForm+')">';
            frm+= '<img class="picklistArrowLeft" title="Remove" alt="Remove" src="/_assets/images/s.gif">';
            frm+= '</a>';
            frm+= '</td><td>';
            frm+= '<span>';
            frm+= '<select id=multiselect_rightList'+counterValForForm+' title="" multiple="multiple" ondblclick="javascript:multiPicklist_moveItemsBack(\'multiselect'+counterValForForm+'\'); " size="10" style="min-width:200px;min-height:60px;resize:both">';
            frm+= '</select>';
            frm+= '</span>';
            frm+= '</td>';
            frm+= '<td class="multiSelectPicklistCell" style="vertical-align:middle;">';
            frm+= '<a title="Up" onClick="UpDown(\'Up\','+counterValForForm+');">';
            frm+= '<img class="picklistArrowRight" title="Up" alt="Up" src="/_assets/images/s.gif" style="-ms-transform: rotate(-90deg);/* IE 9 */-webkit-transform: rotate(7deg);/* Chrome, Safari, Opera */transform: rotate(-90deg);">';
            frm+= '</a><br><br>';
            frm+= '<a title="Down"  onClick="UpDown(\'Down\','+counterValForForm+');">';
            frm+= '<img class="picklistArrowLeft" title="Down" alt="Down" src="/_assets/images/s.gif"style="-ms-transform: rotate(-90deg);/* IE 9 */-webkit-transform: rotate(7deg);/* Chrome, Safari, Opera */transform: rotate(-90deg);">';
            frm+= '</a>';
            frm+= '</td>';
            frm+= '</tr>';
            frm+= '</tbody>';
            frm+= '</table>';
            frm+= '<input id=multiselect'+counterValForForm+' name="multiselect" style="display:none;" type="text" value="">';
            frm+= '<span class="field-validation-valid errorMsg" data-valmsg-for="multiselect" data-valmsg-replace="true"></span>';
            frm+= '<hr>';
            frm+= '</div>';
            frm+= '</div>';
            frm+= '</div>';
            frm+= '<br/>';
            frm+= '</div>';
            frm+= '<div style="margin-left: 4%;">';
            frm+= '<b>Collapse Section</b> <input type="checkbox" id=collapseId'+counterValForForm+' name=collapse'+counterValForForm+' value="collapse"><br>';
            frm+= '</div>';
            $('#'+'sectionsId').append(frm);
            counterValForForm++;
        getFieldDetails();
        hideDialog();
    }
    /*
    *Description: Method to move the selected field upwards or downwards ie is index-1
    */
    function UpDown(btnName,i){
         var $op=$("#multiselect_rightList"+i+" option:selected");
         if(btnName === 'Up')
         {
            $op.first().prev().before($op) ;
         }
         if(btnName ==='Down'){
            $op.last().next().after($op);
         }
    }
    /*
    * @Description: Method to Save all the values entered in Multiple Section.
    * @param: btnName - name of the button on which the action is called.
    */
    function Save(btnName){
        var servicePlanModelArray=[];
        var counterVal=0;
        counterVal = counterValForForm;
        for(var j=1; j<counterVal; j++){
            servicePlanModelArray.push(saveValue(j));
        }
        updateTheServicePlanSection(btnName,servicePlanModelArray);
    }
    /*
    * @Description:Function assigns values of the input field to a model
    * @param: i - Counter Number of the form
    */
    function saveValue(i){
            var sequenceNumber         = $('#'+'sequenceId'+i).val();
            var sectionTitle           = $('#'+'titleName'+i).val();
            var multiPicklistValue     = [];
            var idOfTheRecords         = $('#'+'recordId'+i).val();
            var countOfTheSection      = $('#'+'NoColValId'+i).val();
            var valofCheckBox          = getTheValueCheck('collapseId'+i);
            var strForMultiPicklistVal = '';
            var counterForSelectedPicklist=0;
            $('#'+'multiselect_rightList'+i+' .optionsClass').each(function(){
                   multiPicklistValue.push($('#'+'multiselect_rightList'+i+' .optionsClass')[counterForSelectedPicklist].value);
                   strForMultiPicklistVal += multiPicklistValue[counterForSelectedPicklist];
                   strForMultiPicklistVal += ',';
                   counterForSelectedPicklist++;
            });
            $('#'+'multiselect_rightList'+i).val();
            var servicePlanSection = { Title_Of_Section__c:sectionTitle,Sequence__c :sequenceNumber, 
                                      Id:idOfTheRecords , Fields_for_Section__c:strForMultiPicklistVal,
                                      No_Of_Columns__c: countOfTheSection , Collapse_Section__c : valofCheckBox};
            return servicePlanSection;
         
    }
    /*
    * @Description: Function is used to send the array of model which has to inserted/updated
    * @param: canModel - array of json values, candId -id of the candidate fetched from the url,
    *         btnName- Name of the button through which the action is called
    */
    function updateTheServicePlanSection(btnName,servicePlanModelArray){
        showDialog();
        REST2.exec({ 
                    url:"/aspx/ServicePlanSetupForSections/updateServicePlanSectionInfo" , 
                    data:{servicePlanSectionModel :servicePlanModelArray }, 
                        callback:function(context) 
                        { 
                             showDialog();
                             if (REST2.isSuccess(context)) {
                                hideDialog();
                                if(btnName === 'Save'){
                                    window.location= "https://eastersealsmidwest.magentrixcloud.com/aspx/RiskAssessmentSetupForSections";
                                }
                                else{
                                    window.location.assign("https://eastersealsmidwest.magentrixcloud.com/aspx/ServicePlanSetupForSections")
                                }
                                
                             }
                               
                        }   
        });
        hideDialog();
        
    }
    /*
    * @Description: Function is used to move the selected fields from left side of the Multi-Selected to right side.
    * @param: SS1 - LeftSide selected fields in the multipicklist
    *         SS2 - RightSide selected fields in the multipicklist
    */
    function SelectMoveRows(SS1,SS2)
    {
        var SelID='';
        var SelText='';
        var strounrceID=SS1.id;
        // Move rows from SS1 to SS2 from bottom to top
        for (i=SS1.options.length - 1; i>=0; i--)
        {
            if (SS1.options[i].selected === true)
            {
                SelID=SS1.options[i].text;
                SelText=SS1.options[i].text;
                
                if(strounrceID.includes('multiselect_rightList') &&  SelText=='BlankSpace')
                {
                    SS1.options[i]=null;
                }
                else{
                    var newRow = new Option(SelText,SelID);
                    newRow.className=SS1.options[i].className;
                    SS2.options[SS2.length]=newRow;
                
                    if(SelText!='BlankSpace'){
                       SS1.options[i]=null;
                    }  
                }
                
              }
            }
    }
     /*
    * @Description: Function is used to sort the selected values in right side of the multipicklist alphabetically.
    * @param: SelList-  RightSide selected fields in the multipicklist
    */
    function SelectSort(SelList)
    {
        var ID='';
        var Text='';
        for (x=0; x < SelList.length - 1; x++)
        {
            for (y=x + 1; y < SelList.length; y++)
            {
                if (SelList[x].text > SelList[y].text)
                {
                    // Swap rows
                    ID=SelList[x].value;
                    Text=SelList[x].text;
                    SelList[x].value=SelList[y].value;
                    SelList[x].text=SelList[y].text;
                    SelList[y].value=ID;
                    SelList[y].text=Text;
                }
            }
        }
        $( "option" ).addClass( "optionsClass" );
    }
    
    /*
    *@Decription: Function to set the value of the checked box
    */
    function getTheValueCheck(valOfRadioBtn){
      /*var radioCategory = document.getElementsByName(valOfRadioBtn);
        for (var i = 0; i < radioCategory.length; i++) {
            if (radioCategory[i].type === 'radio' && radioCategory[i].checked) {
                // get value, set checked flag or do whatever you need to
                return radioCategory[i].value;       
            }
      } */ 
       if($('#'+valOfRadioBtn).prop('checked')) {
          return true;
       } else {
           return false;
        }

    }