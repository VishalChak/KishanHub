;(function($) {

	WEBSITE = {};

    WEBSITE.INDEX = {

		uEmail: "INDEX",
		uPasswd: "INDEX",
		allFields: "INDEX",

        MAIN:function(){
            $.ajax({
		        type: "GET",
		        url: "scripts/rabitutils.js",
		        dataType: "script",
		        async: false
	        });
            RABIT.UTILS.openFile("scripts/jquery.crypt.js");
		    $(document).on('keypress', 'input', function(e) {
			    if(e.keyCode == 13 && e.target.type !== 'submit') {
				    WEBSITE.INDEX.init();
			    }
		    });
		    $("#secCode").live('keyup', function(){
		        if ($(this).val() != ""){
		            $("#logincheck").removeAttr("disabled");
		            $("#logincheck").removeClass("opacity-0-3");
		        } else {
		            $("#logincheck").attr("disabled","disabled");
		            $("#logincheck").addClass("opacity-0-3");
		        }
		    });
		    $('#logincheck').live('click', function(){
			    if ($("#UserEmail").val() == "Email"){
			        $("#UserEmail").val("Enter your email").addClass('ui-state-error ui-corner-all');
			        return false;
			    }
			    if ($("#UserPassword").val() == "Password"){
			        $("#UserPassword").addClass('ui-state-error ui-corner-all');
			        return false;
			    }
			    if ($('#secCode').is(':visible')){
			        if ($("#secCode").val() == "Security Code" || $("#secCode").val() == ""){
			            RABIT.UTILS.showMessage("Your account is locked due to maximum number of wrong attempts. Please enter the security code sent to your registered Email.","Notification");
			            $("#secCode").val("").addClass('ui-state-error ui-corner-all');
			            $("#secCode").addClass('ui-state-error ui-corner-all');
			            $("#secCode").focus();
			            return false;
			        }
			    }
			    WEBSITE.INDEX.init();
		    });
		    $("#UserEmail").mousedown(function(){
		        if ($("#UserEmail").val() == "Enter your email"){
		            $("#UserEmail").val("").removeClass('ui-state-error ui-corner-all');
		        }

		    });
		    $("#secCode").mousedown(function(){
                if ($("#secCode").val() != "Security Code" && $("#secCode").val() != ""){
                    /*$("#secCode").removeClass('ui-state-error ui-corner-all');*/
                } else {
                    /*$("#secCode").val("").removeClass('ui-state-error ui-corner-all');
                    $("#secCode").val("");*/
                }
		    });
			$("#UserPassword").live("keypress", function(e){
				var keycode = (e.keyCode ? e.keyCode : e.which);
				if(keycode == '13') {
					$('.ui-dialog-buttonpane button:first').click();
				}
				$("#logincheck").removeAttr("disabled");
		        $("#logincheck").removeClass("opacity-0-3");
			});

			$('#refreshcursor').live('click', function(){
			    $("#captcha").html("");
                $("form").clientSideCaptcha({
			        input: "#captchaText",
			        display: "#captcha",
			        pass : function() { return false; },
			        fail : function() { return false; }
		        });
			});
			
			var paramArray = window.location.search.substr(1).split('&');
			if (paramArray[0] == "registration=true"){
			    WEBSITE.INDEX.openRegistration();
			}
			
		    $('#register').live('click', function(){
                WEBSITE.INDEX.openRegistration();
		    });

		    $("#forgotPwd").live('click', function(){
			    var lValid = true;
			    $("#UserEmail").removeClass( "ui-state-error" );
			    lValid = lValid && RABIT.FORMVALIDATION.checkRegexp($("#UserEmail"), /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid email ID.");
			    if(lValid){
			        $("#secCode,.validateTips").hide();
			        $("#fgtpwdinprocess").show();
			        var resetToken = RABIT.UTILS.password(20,false);
				    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:sendPasswordReset><usermail>" + RABIT.UTILS.getSaltPWD($("#UserEmail").val()) + "</usermail></web:sendPasswordReset></soapenv:Body></soapenv:Envelope>";
				    var myConn = RABIT.UTILS.getXmlhttpObject();
				    myConn.onreadystatechange=function() {
					    if (myConn.readyState == 4 && myConn.status == 200){
							RABIT.UTILS.showMessage($(myConn.responseXML).text(),"Notification");
							$(".ui-dialog-titlebar-close").text("");
			                $(".ui-dialog-titlebar-close").append("<img src='images/close1.png'>");
						    $("#fgtpwdinprocess").hide();
						    $("#forgotPwd").removeAttr("style");
					    } else if (myConn.readyState == 4 && myConn.status == 500){
                            RABIT.UTILS.showMessage("Server has returned an error code "+$(myConn.responseXML).find("faultString").text() +". Please contact AutoRABIT support team for details.","Notification");
                            $(".ui-dialog-titlebar-close").text("");
                            $(".ui-dialog-titlebar-close").append("<img src='images/close1.png'>");
                            $("#fgtpwdinprocess").hide();
                        }

				    };
				    var soapaction = "http://ws.service.rabit.com/sendPasswordReset";
				    myConn.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
				    myConn.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
				    myConn.setRequestHeader("SOAPAction", soapaction);
				    myConn.send(req);
			    } else{
				    $("#UserEmail").val("Enter your email").addClass('ui-state-error ui-corner-all');
			    }
		    });
        },
        REGISTER_ORGANIZATION:function(fName,lName,usrEmail,phoneNo,orgnName,userCount,infra,jobTitle,country,state,timezone,zipCode){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:registerOrgAdmin>";
		            req += "<firstname>"+fName+"</firstname>";
		            req += "<lastname>"+lName+"</lastname>";
		            req += "<email>"+RABIT.UTILS.getSaltPWD(usrEmail)+"</email>";
		            req += "<phone>"+RABIT.UTILS.getSaltPWD(phoneNo)+"</phone>";
		            req += "<organization>"+orgnName+"</organization>";
		            req += "<noofusers>"+userCount+"</noofusers>";
                    req += "<infrastructure>"+infra+"</infrastructure>";
		            req += "<jobtitle>"+jobTitle+"</jobtitle>";
		            req += "<country>"+country+"</country>";
		            req += "<state>"+state+"</state>";
		            req += "<timezone>"+timezone+"</timezone>";
		            req += "<zipcode>"+zipCode+"</zipcode>";
		        req += "</web:registerOrgAdmin>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();

            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerOrgAdmin");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        openRegistration:function(){
            $("#captcha").html("");
            $(".register-form-style").val("");
            $('#infrastructure').val("shared");
			$(".validateTips").removeClass('ui-state-highlight').text("").hide();
			$("#users").val("5");
			$("#inprocess").hide();
			
            $("form").clientSideCaptcha({
		        input: "#captchaText",
		        display: "#captcha",
		        pass : function() { return false; },
		        fail : function() { return false; }
	        });
	        $("#country").empty();
	        $("#states").empty();
	        $("#timezones option:not(:first)").remove();
	        $.getJSON( "templates/countries.json", function( data ) {
	            jsonData = data;
	            var selIndex = 0;
	            $.each( data.countries, function( i, country ) {
	                $("#country").append($("<option >", {value:country.code,text:country.name}));
                    if (country.code == "US"){
                        selIndex = i;
                        selctedCountry = country.states;
                        $.each( selctedCountry, function( i, state ) {
                            $("#states").append($("<option>", {value:state.code,text:state.name}));
                        });
                        selctedCountryTimeZones = country.timezones;
                        $.each( selctedCountryTimeZones, function( i, timezone ) {
                            $("#timezones").append($("<option>", {value:timezone.code,text:timezone.text}));
                        });
                    }
                });
                $("#country").find("option").eq(selIndex).attr("selected","selected");
                $("#country").die("keyup change").live('keyup change',function(){
                    var selectedCountry = jsonData.countries[$(this).find("option:selected").index()].states;
                    $("#states").empty();
                    $.each( selectedCountry, function( i, state ) {
                        $("#states").append($("<option>", {value:state.code,text:state.name}));
                    });
                    var selectedCountryTZones = jsonData.countries[$(this).find("option:selected").index()].timezones;
                    $("#timezones option:not(:first)").remove();
                    $.each( selectedCountryTZones, function( i, timezone ) {
                        $("#timezones").append($("<option>", {value:timezone.code,text:timezone.text}));
                    });
                    if (navigator.appName == 'Microsoft Internet Explorer'){
                        $("#states").focus();
                        $("#timezones").focus();
                        $("#country").focus();
                    }
                });
                /*$("#states").die("keyup").live('keyup',function(){
                    selectedState = jsonData.countries[$("#country").find("option:selected").index()].states;
                    $("#timezones").empty();
                    var selIndex = [$(this).find("option:selected").index()];
                    $.each( selectedState, function( i, state ) {
                        if (selIndex == i){
                            $("#timezones").append($("<option>", {value:state.timezone,text:state.timezone}));
                        }
                    });
                });*/
            });
            
			var firstName = $("#firstname");
            var lastName = $("#lastname");
            var email = $("#email");
            var phonenumber = $("#phonenumber");
            var noOfUsers = $("#users");
            var orgn = $("#orgn");
            var jobtitle = $("#jobtitle");
            var country = $("#country");
            var zipcode = $("#zipcode");
            var timeZones = $("#timezones");
            
            allFields = $( [] ).add( firstName ).add( lastName ).add( email ).add( phonenumber ).add( orgn ).add( noOfUsers ).add( jobtitle ).add( country ).add( zipcode ).add(timeZones);
            allFields.removeClass( "ui-state-error" );
			
            registerButtons ={
                "Register": function(){
                    allFields.removeClass( "ui-state-error" );
                    var sValid = true;
					sValid = sValid && RABIT.FORMVALIDATION.checkIsEmpty( firstName, " Please enter 'First Name'.");
					sValid = sValid && RABIT.FORMVALIDATION.checkIsEmpty( lastName, " Please enter 'Last Name'.");
					sValid = sValid && RABIT.FORMVALIDATION.checkForAlphabetsAndSpaces( firstName, " First Name accepts only alphabets and spaces");
					sValid = sValid && RABIT.FORMVALIDATION.checkForAlphabetsAndSpaces( lastName, " Last Name accepts only alphabets and spaces");
					
					sValid = sValid && RABIT.FORMVALIDATION.checkIsEmpty( email, " Please enter Email.");
					sValid = sValid && RABIT.FORMVALIDATION.checkRegexp( email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, " Enter valid company Email id." );
					if (($("#email").val().indexOf("gmail") != -1) || ($("#email").val().indexOf("hotmail") != -1) || ($("#email").val().indexOf("yahoo") != -1)){
					    sValid = sValid && RABIT.FORMVALIDATION.updateTips( " Please enter your valid company Email id.");
					}
					sValid = sValid && RABIT.FORMVALIDATION.checkIsEmpty( phonenumber, " Please enter Phone Number." );
					sValid = sValid && RABIT.FORMVALIDATION.checkIsEmpty( noOfUsers, " Please enter number of user licenses required.");
					
					sValid = sValid && RABIT.FORMVALIDATION.checkPhoneNumber( phonenumber, " Please enter valid phone number."); 
					sValid = sValid && RABIT.FORMVALIDATION.checkForNumber( zipcode, " Please enter valid zip code."); 

					if (sValid){						
					    if (isNaN($("#users").val())){
					        RABIT.FORMVALIDATION.updateTips( " Number of licenses should be a valid number.");
					        sValid = false;
					    } else if ($("#users").val() < 1){
					        RABIT.FORMVALIDATION.updateTips( " Number of licenses should be greater than or equal to 1.");
					        sValid = false;
					    } else if ($("#timezones option:selected").val() == 0){
					        RABIT.FORMVALIDATION.updateTips( " Please select the time zone.");
					        $("#timezones").addClass("ui-state-error").focus();
					        sValid = false;
					    }
					}
					var inputCheck = RABIT.FORMVALIDATION.formInputCharCheck(allFields);

                    if (sValid && typeof(inputCheck) == "object"){
                        RABIT.FORMVALIDATION.updateTips("Characters & < > ' \" are not allowed in the input field.");
                        $(inputCheck).addClass( "ui-state-error" ).focus();
                        sValid = false;
                    }
                    
					if (!sValid){
					    return;
					}

					sValid = sValid && $("form").checkCaptcha({
			            input: "#captchaText",
			            display: "#captcha",
			            pass : function() { return true; },
			            fail : function() { return false; }
		            });

					if ( sValid ) {
                        $(".validateTips").removeClass('ui-state-highlight');
			            $(".validateTips").html("").hide();
                        $("#inprocess").show();
                        var org_name = email.val().split("@")[1];
					    org_name = org_name.substring(0,org_name.indexOf("."));
                        var regAccount = WEBSITE.INDEX.REGISTER_ORGANIZATION($("#firstname").val(),$("#lastname").val(),email.val(),$("#phonenumber").val(),$("#orgn").val(),$("#users").val(),$("#infrastructure option:selected").val(),$("#jobtitle").val(),$("#country option:selected").val(),$("#states option:selected").val(),$("#timezones option:selected").val(),$("#zipcode").val());

                        regAccount.onreadystatechange=function(){
	                        if (regAccount.readyState==4 && regAccount.status==200){
		                        $("#inprocess").hide();
                                RABIT.UTILS.showMessage($(regAccount.responseXML).text(),"Notification");
                                $(".ui-dialog-titlebar-close").text("");
		                        $(".ui-dialog-titlebar-close").append("<img src='images/close1.png'>");
								$("#registerdiv").dialog("close");
                            } else if (regAccount.readyState == 4  && regAccount.status==500){
                                $("#inprocess").hide();
                                RABIT.UTILS.showMessage("The server has returned an error with error code "+$(regAccount.responseXML).find("faultString").text() +". Please contact AutoRABIT team for more details or try after sometime.","Error");
								$(".ui-dialog-titlebar-close").text("");
		                        $(".ui-dialog-titlebar-close").append("<img src='images/close1.png'>");
								$("#registerdiv").dialog("close");
	                        } else if (regAccount.readyState == 4){
		                        $("#inprocess").show();
		                        RABIT.UTILS.showMessage($(regAccount.responseXML).text(),"Error");
		                        $(".ui-dialog-titlebar-close").text("");
		                        $(".ui-dialog-titlebar-close").append("<img src='images/close1.png'>");
								$("#registerdiv").dialog("close");
	                        }
	                        
                        };
					} else {
					    if ($("#captchaText").val() == ""){

					    }
					    $("#captchaText").val() == "" ? msg = "Please enter the Captcha code" : msg = "Please enter correct Captcha code";
					    RABIT.FORMVALIDATION.updateTips(msg);
					    $("#captchaText").focus();
					}
                },
                "Cancel": function(){
                    $(this).dialog("close");
                }
            };
            $(".ui-dialog-content").dialog( "destroy" );
		    RABIT.UTILS.getPopUp("registerdiv","AutoRABIT - New Registration",450,800,registerButtons,true);
        },
		init: function(){
			uEmail = $("#UserEmail");
			uPasswd = $("#UserPassword");
			allFields = $( [] ).add(uEmail).add(uPasswd);
			var lValid = true;
			$("#loadingDiv").show();
			allFields.removeClass( "ui-state-error" );
			lValid = lValid && RABIT.FORMVALIDATION.checkRegexp(uEmail, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid Email ID.");
			lValid = lValid && RABIT.FORMVALIDATION.checkLength( uPasswd, "Password", 6, 20 );
			if(lValid){
			    $("#secCode").val() == "Security Code" ? sectyCode = "" : sectyCode = $("#secCode").val();
			    var uLogin = WEBSITE.INDEX.AUTHENTICATE_LOGIN($.trim(uEmail.val()),RABIT.UTILS.getSaltPWD($.trim($(uPasswd).val())),$.trim(sectyCode));
				
				uLogin.onreadystatechange=function(){
                    if (uLogin.readyState == 4 && uLogin.status == 200){
                        $("#loadingDiv").hide();
                        var resXMLText = "";
				        if (jQuery.browser.version > 8.0) {
				            resXMLText = uLogin.responseText.split("\t").join("").split("\n").join("").trim();
			            } else {
				            resXMLText = uLogin.responseText;
			            }
				        var resXML = RABIT.UTILS.getXMLFromString(resXMLText);
				        if(uLogin.readyState == 4 && uLogin.status == 200){
					        if($(resXML).find("user").length != 0){
						        sessionStorage.setItem('userEmail', $(resXML).find("user").attr("email"));
						        sessionStorage.setItem('orgName', $(resXML).find("user").attr("rootextension"));
                                sessionStorage.setItem("orgId",$(resXML).find("user").attr("orgid"));
                                sessionStorage.setItem("language","english");
						        if ($(resXML).find("user").attr("type") != "undefined"){
						            sessionStorage.setItem('usertype', $(resXML).find("user").attr("type"));
						        }
						        if ($(resXML).find("user").attr("role") != "undefined"){
						            sessionStorage.setItem('userrole', $(resXML).find("user").attr("role"));
					                sessionStorage.setItem('timezone', $(resXML).find("user timezone").text());
					                sessionStorage.setItem('country', $(resXML).find("user country").text());
					                sessionStorage.setItem('state', $(resXML).find("user state").text());
						            $.getJSON( "templates/countries.json", function( data ) {
	                                    $.each( data.countries, function( i, country ) {
                                            if (country.code == $(resXML).find("user country").text()){
                                                selctedCountryTimeZones = country.timezones;
                                                $.each( selctedCountryTimeZones, function( indx, timezone ) {
                                                    if (timezone.code == $(resXML).find("user timezone").text()){
                                                        sessionStorage.setItem('offset', timezone.offset);
                                                    }
                                                });
                                            }
                                        });
	                                });
        						    
						        }
						        sessionStorage.setItem('infrastructure', $(resXML).find("user").find("infrastructure").text());
						        window.location.href = "index.html";
					        } else {
						        var responseMsg = $(resXML).find("return").text();
						        if (responseMsg == "Account is locked" || responseMsg == "Empty Security Code" || responseMsg == "Invalid Security Code"){
						            $(".loginValidateTips").text("Your account is locked due to maximum number of wrong attempts. Security code is sent to your registered Email. Please enter it.").show().addClass( "ui-state-highlight" );
						            $("#secCode").show();
						            /*$("#logincheck").attr("disabled","disabled");
						            $("#logincheck").addClass("opacity-0-3");*/
						        } else {
						            $(".loginValidateTips").text($(resXML).find("return").text()).show().addClass( "ui-state-highlight" );
						        }
					        }
				        } else if(uLogin.status == 12029){
					        RABIT.UTILS.showMessage("Dear User, <br> There is an error while retrieving your credentials. Please try after some time.","Notification");
				        } else {
				            var responseMsg = $(resXML).find("return").text();
					        RABIT.UTILS.showMessage(responseMsg,"Notification");
				        }
                    }
                };
				
				
				
			} else {
			    $("#errordiv").show();
			}
		},
		AUTHENTICATE_LOGIN: function(userMail, uPwd,secCode){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:userLogin><usermail>"+userMail+"</usermail><password>"+uPwd+"</password><seccode>"+secCode+"</seccode></web:userLogin></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/userLogin";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
		}
    };
})(jQuery);