;(function($) {

	INDEX = {};

	INDEX.MAIN = {
		fadeOutFlag:"MAIN",
		showHideFlag:"MAIN",
		globalTempXML:"MAIN", /* This variable is being used in promotion */
	    
	    INIT:function(){
	        globalTempXML = RABIT.UTILS.openFile("templates/promotiondata.xml");
	        if (localStorage.getItem("oauth") != "true" && (sessionStorage.getItem('userEmail') == "" || sessionStorage.getItem('userEmail') == null)){
	            window.location.replace(RABIT.COMMONFUNCTIONS.getBrowserURL()+"/");
	        }
	        var oAuthIs = true;
	        if (localStorage.getItem("oauth") == "true" && localStorage.getItem("orgname") != null){
	            var paramArray = window.location.search.substr(1).split('&');
	            sessionStorage.setItem("orgName",localStorage.getItem("orgname"));
                sessionStorage.setItem("userEmail",localStorage.getItem("useremail"));
                sessionStorage.setItem("usertype",localStorage.getItem("usertype"));
                sessionStorage.setItem("userrole",localStorage.getItem("userrole"));
                sessionStorage.setItem("language",localStorage.getItem("language"));
                localStorage.removeItem("orgname");
                localStorage.removeItem("useremail");
                localStorage.removeItem("usertype");
                localStorage.removeItem("userrole");
                localStorage.removeItem("language");
	            if (paramArray[0] == "status=success"){
	                sessionStorage.setItem("OAuthcodeIs",paramArray[1].substring(5));
	                window.location.href = "index.html";
                } else {
                    RABIT.UTILS.showMessage("OAuth authentication has failed. Please try again.","Error");
                    oAuthIs = false;
                }
            }
	        INDEX.MAIN.setWindowSize();
	        window.onresize = function(event) {
		        INDEX.MAIN.setWindowSize();
	        };
	        if(sessionStorage.getItem("orgName") == "techsophy.com" || sessionStorage.getItem("orgName") == "autorabit.com"){
	        	$("#logsMenuBtn").show();
	        }
	        else{
	        	$("#logsMenuBtn").hide();
	        }
	        $("#loginname").text(sessionStorage.getItem('userEmail').split("@")[0]);
            sessionStorage.setItem("hostingtype",RABIT.SERVICES.GET_INSTALLATION_TYPE());
            if (sessionStorage.getItem('usertype') == "rabitadmin"){
                $("#adminprivilages,#actadm,#serversReg,#sharedserverReg,#plugins,#orgn").show();
                $("#rabithome").hide();
                getAccountList = RABIT.SERVICES.getOrgUsers();
                $(getAccountList).find("user").each(function (){
                    $('#orglist').append($("<option >", {value:$(this).attr("orgname"),text:$(this).attr("orgname")}));
                });
                $("#contentLoader").load("accountmanagement/accountlist.html", function(responseText, statusText, xhr) {
                    if(statusText == "success"){
                        ACCOUNTS.LIST.INIT();
                    }
                    if(statusText == "error")
                        alert("An error occurred: " + xhr.status + " - " + xhr.statusText);
                });
            } else {
                /*var getModules = RABIT.UTILS.openFile("orgpermissions.xml");*/
                var pulginXml = RABIT.SERVICES.getPlugins(sessionStorage.getItem("orgName"));
                if (sessionStorage.getItem('userrole') == "orgadmin"){
                    /*if ($(getModules).find("modules").length > 0 && $(getModules).find("modules").attr("granttype") == "full"){
                        
                    } else {*/
                        $("li[name='previlageItem'],label[name='menuitem'],#adminprivilages,#adminguide").show();
                        $("#sharedserverReg").hide();
                        if (sessionStorage.getItem("hostingtype") == "hosted"){
                            $("#serversReg,#mailserver").hide();
                        }
                    /*} */
    			    
			        if ($(pulginXml).find("plugin[id=SC] item[key='svn']").attr('isenabled') != "true" && $(pulginXml).find("plugin[id=SC] item[key='git']").attr('isenabled') != "true" && $(pulginXml).find("plugin[id=SC] item[key='tfs']").attr('isenabled') != "true"){
			            $("#vcsettings").hide();
			        }   	
                    var dataloaderProAccess = true;
                    var dataloaderAccess = true;
                    var versionControlAccess = true;
                } else {
                    $("#adminguide").hide();
                    var userMappingXML = RABIT.SERVICES.getUserMapElement(sessionStorage.getItem('userEmail')).responseXML;
                    actionsArray = new Array();
                    var dataloaderProAccess = false;
                    var dataloaderAccess = false;
                    var versionControlAccess = false;
                    if ($(userMappingXML).find("user").length > 0){
                        
                        /*var actionsDoc = RABIT.UTILS.openFile("registrations/actions.xml");*/
                        var actionsDoc = RABIT.SERVICES.getRoleActions();
                        
                        var rolesXML = RABIT.SERVICES.getRoles();
                        $(userMappingXML).find("user roles role").each(function(){
                            var usrMapObject = $(this);
                            
                            $(rolesXML).find("role[id='"+$(this).attr("id")+"'] permissions module").each(function(){
                                if ($(actionsDoc).find("module[name='"+$(this).attr("name")+"']").attr("path") == "rabitmigration"){
                                    if ($(actionsDoc).find("module[name='"+$(this).attr("name")+"']").attr("item") == "dataloader"){
                                        dataloaderAccess = true;
                                    }
                                    if ($(actionsDoc).find("module[name='"+$(this).attr("name")+"']").attr("item") == "dataloaderPro"){
                                        dataloaderProAccess = true;
                                    }
                                } else if ($(actionsDoc).find("module[name='"+$(this).attr("name")+"']").attr("path") == "rabitvesioncontrol"){
                                    versionControlAccess = true;
                                }
                                $("#"+$(actionsDoc).find("module[name='"+$(this).attr("name")+"']").attr("path")).show();
                                $(this).find("action").each(function(){
                                    $("#"+$(actionsDoc).find("action[id='"+$(this).attr("id")+"']").attr("path")).show();
                                    
                                    if ($.inArray($(this).attr("id"), actionsArray) < 0) {
                                        actionsArray.push($(this).attr("id"));
                                    }
                                })
                            });
                        });
                        /*for (indx=0;indx<actionsArray.length;indx++){
                            alert(actionsArray[indx]);
                        }*/
                    }
                }
                if (versionControlAccess && ($(pulginXml).find("plugin[id=SC] item[key='git']").attr('isenabled') == "true" || $(pulginXml).find("plugin[id=SC] item[key='svn']").attr('isenabled') == "true" || $(pulginXml).find("plugin[id=SC] item[key='tfs']").attr('isenabled') == "true")){
					$('#rabitvesioncontrol').show();
				} else {
					$('#rabitvesioncontrol').hide();
				}
                $("#actadm").hide();
                if (localStorage.getItem("oauth") == "true"){
                    if (!oAuthIs){
                        localStorage.removeItem("oauth");
                        localStorage.removeItem("sandboxname");
                        localStorage.removeItem("orgtype");
                        localStorage.removeItem("environment");
                        localStorage.removeItem("orgurl");
                        localStorage.removeItem("inputId");
                    }
                    $("#contentLoader").load("registrations/sforceconfiguration.html", function(responseText, statusText, xhr) {
                        if(statusText == "success"){
                            /*REGISTRATIONS.SFORCE.loadSandboxes();
                            REGISTRATIONS.SFORCE.init();*/
                        }
                        if(statusText == "error")
                            alert("An error occurred: " + xhr.status + " - " + xhr.statusText);
                    });
                } else {
                    $("#contentLoader").load("homepage/homepage.html", function(responseText, statusText, xhr) {
                        if(statusText == "success"){
                            HOMEPAGE.DEFAULTBUILDS.INIT();
                        }
                        if(statusText == "error")
                            alert("An error occurred: " + xhr.status + " - " + xhr.statusText);
                    });
                }
                
                
            }
            $('body').click(function(event){
	        	$("#dropDownMenuItems").hide();
	        });
            $("#rabithome").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"homepage/homepage.html","HOMEPAGE.DEFAULTBUILDS.INIT()","AutoRABIT-Home",$("#contentLoader"));
	        });
	        $("#rabitproject").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"projectwizardnew/projectlistview.html","","AutoRABIT-Projects",$("#contentLoader"));
	        });
	        $("#syncorgstab").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"promotion/orgsynchronization.html","","AutoRABIT-Sync Orgs",$("#contentLoader"));
	        });
	        $("#rabitpromote").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"promotion/promotionhome.html","","AutoRABIT-Deployments",$("#contentLoader"));
	        });
	        $("#metadatasearch").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"search/search.html","","AutoRABIT-Metadata Search",$("#contentLoader"));
	        });
	        $("#rabitvesioncontrol").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"git/git.html","","AutoRABIT-Version Control",$("#contentLoader"));
	        });
	        $("#rabitmigration").die("click").live("click",function(){
	            INDEX.MAIN.closeDialog();
                document.title = "AutoRABIT-Dataloader";
                $("label[name=toolbaritem]").removeAttr("class");
                $("label[name=toolbaritem][for='dtloader']").attr("class","active");

                if (dataloaderProAccess && dataloaderAccess){

                    $("#dropDownMenuItems").load("dropDownForDataloader.html", function(responseText, statusText, xhr) {
	                    if(statusText == "error"){
		                    alert("An error occurred: " + xhr.status + " - " + xhr.statusText);
		                } else {
		                    $("#dropDownMenuItems").show();
		                    $("#dataloaderPro").show();
		                    $("#dataloader").show();
		                }
                    });
                } else if (dataloaderProAccess){
                    INDEX.MAIN.openURL($(this),"dataloader/dataloader-pro.html","","AutoRABIT-Dataloader Pro",$("#contentLoader"));
                } else if (dataloaderAccess){
                    INDEX.MAIN.openURL($(this),"dataloader/single-dataloader.html","","AutoRABIT-Dataloader",$("#contentLoader"));
                }
	        });
	        $("#testGen").die("click").live("click",function(){
	            /*INDEX.MAIN.openURL($(this),"testgenerator/testgenerator.html","TESTGENERATOR.LOADTESTS.init()","AutoRABIT-Version Control",$("#contentLoader"));*/
	            INDEX.MAIN.openURL($(this),"testgenerator/tafmain.html","","AutoRABIT-Test Automation",$("#contentLoader"));
	        });
	        $("#dataloader").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"dataloader/single-dataloader.html","","AutoRABIT-Dataloader",$("#contentLoader"));
	            $("label[name=toolbaritem][for='dtloader']").attr("class","active");
	        });
	        $("#dataloaderPro").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"dataloader/dataloader-pro.html","","AutoRABIT-Dataloader Pro",$("#contentLoader"));
	            $("label[name=toolbaritem][for='dtloader']").attr("class","active");
	        });
	        $("#logsMenuBtn").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"processlogs/processlogs.html","","AutoRABIT-Logs",$("#contentLoader"));
	            $("label[name=toolbaritem][for='logs']").attr("class","active");
	        });
	        $("#vcTab").die("click").live("click",function(){
	            //INDEX.MAIN.openURL($(this),"promotion/deployment.html","","AutoRABIT-Version Control",$("#contentLoader"));
	            INDEX.MAIN.openURL($(this),"versioncontrol/versioncontrollist.html","","AutoRABIT-Version Control",$("#contentLoader"));
	            //INDEX.MAIN.openURL($(this),"promotion/promotionhistory.html","","AutoRABIT-Version Control",$("#contentLoader"));
	        });
	        $("#vcTab1").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"promotion/deployment.html","","AutoRABIT-Version Control",$("#contentLoader"));
	        });
	        $("#actadm").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"accountmanagement/accountlist.html","ACCOUNTS.LIST.INIT()","AutoRABIT-Account Administration",$("#contentLoader"));
	        });
	        $("#plugins").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"registrations/pluginregistration.html","REGISTRATIONS.PLUGIN.loadPlugins()","AutoRABIT-Plug-in Registration",$("#contentLoader"),"REGISTRATIONS.PLUGIN.init()");
	        });
	        $("#mapping").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"registrations/userprojectrolemapping.html","ADMINISTARTION.ROLEASSIGNMENT.INIT()","AutoRABIT-Project Assignment",$("#contentLoader"));
	        });
	        $("#roles").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"registrations/roleadministration.html","ADMINISTARTION.ROLEADMINISTRATION.INIT()","AutoRABIT-Role Administration",$("#contentLoader"));
	        });
	        $("#users").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"registrations/userscreation.html","REGISTRATIONS.USERCREATE.init()","AutoRABIT-User Administration",$("#contentLoader"),"REGISTRATIONS.USERCREATE.loadUsers()");
	        });
	        $("#serversReg").die("click").live("click",function(){
	            if (sessionStorage.getItem('usertype') == "rabitadmin" && $("#orglist option:selected").val() == 0){
	                alert("Please select the organization.");
	                $("#orglist").focus();
	            } else {
	                INDEX.MAIN.openURL($(this),"registrations/serverregistration.html","REGISTRATIONS.SERVER.init()","AutoRABIT-Server Registration",$("#contentLoader"),"REGISTRATIONS.SERVER.showRegisteredServers()");
	            }
	        });
	        $("#sharedserverReg").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"registrations/sharedserverregistration.html","REGISTRATIONS.SHAREDSERVER.SHARED_SERVER_LIST()","AutoRABIT-Server Registration",$("#contentLoader"));
	        });
	        $("#sandboxReg").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"registrations/sforceconfiguration.html","REGISTRATIONS.SFORCE.loadSandboxes()","AutoRABIT-Salesforce Org Registration",$("#contentLoader"),"REGISTRATIONS.SFORCE.init()");
	        });
	        $("#pdetails").die("click").live("click",function(){
	            //INDEX.MAIN.openURL($(this),"registrations/userdetails.html","REGISTRATIONS.PERSONAL.init()","",$("#chgpwdcontainer"));
	            INDEX.MAIN.openURL($(this),"registrations/userprofile.html","REGISTRATIONS.PERSONAL.init()","AutoRABIT-Version Control",$("#contentLoader"));
	        });
	        $("#cpwd").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"registrations/changepassword.html","REGISTRATIONS.CHANGEPASSWORD.init()","",$("#chgpwdcontainer"));
	        });
	        $("#mailserver").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"registrations/mailserverdetails.html","REGISTRATIONS.MAILSERVER.INIT()","AutoRABIT-Mail Settings",$("#contentLoader"));
	        });
	        $("#vcsettings").die("click").live("click",function(){
	            INDEX.MAIN.openURL($(this),"versioncontrol/settings.html","","AutoRABIT-Version Control Settings",$("#contentLoader"));
	        });
	        $("#logout").die("click").live("click",function(){
	            sessionStorage.setItem("userEmail","")
	            sessionStorage.setItem("orgName","");
	            sessionStorage.setItem("projecttype","");
	            sessionStorage.setItem("projectName","");
	            sessionStorage.setItem("projectKey","");
	            sessionStorage.setItem("selectedbuild","");
				var browserURL = RABIT.COMMONFUNCTIONS.getBrowserURL();
				if (browserURL.indexOf("/index.html") != -1){
				    browserURL = browserURL.substring(0,browserURL.indexOf("/index.html"));
				}
				window.location.replace(browserURL);
	        });
	        $("#adminguide").die("click").live("click",function(){
		        window.open("http://www.autorabit.com/wp-content/uploads/AutoRABIT-admin-guide.pdf");
	        });
	        $("#userguide").die("click").live("click",function(){
		        window.open("http://www.autorabit.com/wp-content/uploads/AutoRABIT-user-guide.pdf");
	        });
        },
        openURL:function(objectId,filePath,functionName,docTitle,containerObject,function2){
            INDEX.MAIN.closeDialog();
            if (docTitle != ""){
                document.title = docTitle;
            }
            $("label[name=toolbaritem]").removeAttr("class");
            $(objectId).find("label[name='toolbaritem']").attr("class","active");
            $(containerObject).load(filePath, function(responseText, statusText, xhr) {
	            if(statusText == "error"){
		            alert("An error occurred: " + xhr.status + " - " + xhr.statusText);
		        } else {
		            eval(functionName);
		            if (typeof(function2) != "undefined"){
		                eval(function2);
		            }
		        }
            });
        },
        showPrivilage:function(node,actionid,parentObj,childObj){
            if ($(node).find("permissions action[id='"+actionid+"']").length > 0){
                parentObj.show();
                childObj.show();
            }
        },
        closeDialog:function(currentview){
		    $(".ui-dialog-content").dialog("close");
		    $(".ui-dialog-content").dialog( "destroy" );
		    $("li[name='previlageItem']").find("a").removeAttr("class");
		    if (typeof(synchStatusFunction) != "undefined"){
		        clearInterval(synchStatusFunction);
		    }
		    if (currentview != "dataloader" && typeof(processesReloader) != "undefined"){
		        clearInterval(processesReloader);
		    }
		    if (currentview != "dataloaderPro" && typeof(dlpProcessesReloader) != "undefined"){
		        clearInterval(dlpProcessesReloader);
		    }
		    globalTempXML = "";
        },
        setWindowSize:function(){
	        var windowHeight = document.documentElement.clientHeight - parseInt(100+30);
            $("#contentLoader").css({"height":windowHeight-parseInt(30), "width":document.documentElement.clientWidth});
        }
	};
})(jQuery);
