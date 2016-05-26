        /* Function to draw the signature*/   
        $(function() {
                //To Hide the header of the page
                $('.siteHeaderWrapper').css({"display": "none"});
                $('.mag-site-main-menu').css({"display": "none"});
                $('.siteFooter').css({"display": "none"});
                $('.siteBody').css({"background": "#FFFFFF"});
                
                
                //Display the Text Box for Individual Signature
                $('#individualSign').signature();
                
                //Display the Text Box for Parent Guardian Signature
                $('#parentGuardianSign').signature();
                
                //Display the Text Box for Witness Signature
                $('#witnessSign').signature();
                
                
                
                 //Function to clear the Individual Signature
                $('#clearIndividual').click(function(event) {
                    event.preventDefault();
                    $('#individualSign').signature('clear');
                });
                
                //Function to clear the Family Signature
                $('#clearParentGuardian').click(function(event) {
                    event.preventDefault();
                    $('#parentGuardianSign').signature('clear');
                });
                
                
                //Function to clear the Family Signature
                $('#clearWitnessGuardian').click(function(event) {
                    event.preventDefault();
                    $('#witnessSign').signature('clear');
                });
                
                showSignature();
        });
            
            
        //Method to set the new signature values to the hidden fields
        function setValueToSignTextField(){
           var newIndividualSign = $('#individualSign').signature('toJSON');
           $('#SaveIndividualSignId').val(newIndividualSign);
           
           var newParentGuardianSign = $('#parentGuardianSign').signature('toJSON');
           $('#SaveParentSignId').val(newParentGuardianSign);
           
           var newWitnessSign = $('#witnessSign').signature('toJSON');
           $('#SaveWitnessSignId').val(newWitnessSign);
        }
       
        //Method to show the signature on load of the page
        function showSignature(){
            
            var IndividualSign = $('#SaveIndividualSignId').val();
            var ParentGuardianSign = $('#SaveParentSignId').val();
            var WitnessSign = $('#SaveWitnessSignId').val();
            if (IndividualSign != '') {
                $('#individualSign').signature('draw', IndividualSign);
            }
            if (ParentGuardianSign != '') {
                $('#parentGuardianSign').signature('draw', ParentGuardianSign);
            }
            
            if (WitnessSign != '') {
                $('#witnessSign').signature('draw', WitnessSign);
            }
        }