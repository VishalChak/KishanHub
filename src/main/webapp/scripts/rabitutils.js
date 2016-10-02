;(function($) {

	RABIT = {};
	RABIT.UTILS = {
		xmlDoc: 'RABIT',

		openFile: function(url){
			var fileType = url.substr( (url.lastIndexOf('.') +1) );
			return (fileType == "js") ? RABIT.UTILS.openJSFile(url,"script") : RABIT.UTILS.openXMLFile(url, fileType);
		},

		openJSFile: function(url,type){
			$.ajax({
			  type: "POST",
			  url: url,
			  dataType: type,
			  async: false
			});
		},

		openXMLFile: function(url,type){
			xmlDoc = "";
			$.ajax({
			  type: "POST",
			  url: url,
			  dataType: type,
			  async: false,
			  success: function(xml){
				xmlDoc = xml;
			  }
			});
			return xmlDoc;
		},

		openCSSFile: function(url){
			var link = "<link rel='stylesheet' type='text/css' href='"+ url +"'/>";
			$('head').append(link);
		},

		deleteTableRows: function(tableid,headcheck) {
			for (var row=tableid.rows.length-1; row>=1; row--){
				if (tableid.rows[row].children[0].children[0].checked){
					tableid.deleteRow(row);
				}
			}
			headcheck.checked = false;
		},

		deleteAllTableRows: function(tabObj){
			$(tabObj).find("tbody tr").each(function(){
				$(this).remove();
			});
		},

		checkAll: function(tableObject,check) {
			$(tableObject).find("tbody tr td input[type='checkbox']").each(function(){
				$(this).attr("checked",check);
			});
		},

		showorhide: function(imgid,showhideObj,showimg,hideimg){
			if($(imgid).attr("src") == showimg){
				$(imgid).attr({src: hideimg, title: "hide"});
				$(showhideObj).show();
			} else {
				$(imgid).attr({src: showimg, title: "show"});
				$(showhideObj).hide();
			}
		},

		uncheckAll: function(tableObject) {
			var rowsLength = tableObject.rows.length;
			for (var i=0;i<rowsLength;i++){
				tableObject.rows[i].getElementsByTagName("input")[0].checked = false;
			}
		},

		clearFields: function(ele){
			 $(ele).find(':input').each(function() {
				$(this).val("");
			});
		},

		getXmlhttpObject: function(){
			return (window.XMLHttpRequest) ? xmlhttp = new XMLHttpRequest() : xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		},

		getXML: function(node){
		    if (node == ""){
		        return node;
		    } else {
			    return (navigator.appName == 'Microsoft Internet Explorer') ? node.xml : (new XMLSerializer()).serializeToString(node);
			}
		},
		saveXMLNode: function(node,filePath,xpathStr){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:saveXMLData><xmlnode>" + RABIT.UTILS.getXML(node) + "</xmlnode><filepath>" + filePath + "</filepath><xpathStr>" + xpathStr +" </xpathStr></web:saveXMLData></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/saveXMLData";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
		},
        saveXMLNodeWithCallBack: function(node,filePath,xpathStr){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:saveXMLData><xmlnode>" + RABIT.UTILS.getXML(node) + "</xmlnode><filepath>" + filePath + "</filepath><xpathStr>" + xpathStr +" </xpathStr></web:saveXMLData></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/saveXMLData";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
		},
		saveFeedBackNode: function(node){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:saveFeedBack><xmlnode>" + RABIT.UTILS.getXML(node) + "</xmlnode></web:saveFeedBack></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/saveFeedBack";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
		},

		saveSupportXMLNode: function(node,xpathStr){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:saveSupportData><xmlnode>" + RABIT.UTILS.getXML(node) + "</xmlnode><xpathStr>" + xpathStr +" </xpathStr></web:saveSupportData></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/saveSupportData";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
		},

		getChartsXMLObj: function(){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:getChartsXML></web:getChartsXML></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/getChartsXML";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp.responseXML;
		},

		getDataLoaderXMLObj: function(orgname,fileName,userToken){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:getDataLoaderXMLFileObject><orgname>" + orgname + "</orgname><filename>" + fileName + "</filename><uToken>"+userToken+"</uToken></web:getDataLoaderXMLFileObject></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/getDataLoaderXMLFileObject";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp.responseXML;
		},

		createXMLNode: function(node,nodeValue,xpath,nameArray,valueArray){
			if (window.ActiveXObject){
			  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			}
			/* code for Mozilla, Firefox, Opera, etc.*/
			else if (document.implementation && document.implementation.createDocument){
				xmlDoc=document.implementation.createDocument("","",null);
			}
			nodeTag = xmlDoc.createElement(node);
			if (nodeValue !=""){
				nodeTag.appendChild(xmlDoc.createTextNode(nodeValue));
			}
			if(nameArray){
				if (nameArray.length != 0){
					for (var x=0;x<nameArray.length;x++){
						nodeTag.setAttribute(nameArray[x],valueArray[x]);
					}
				}
			}
			if (xpath){
				xpath.appendChild(nodeTag);
			}
			return nodeTag;
		},

		insertBefore: function(rootDoc, newNode, oldNode){
			rootDoc.parentNode.insertBefore(newNode, oldNode);
			return rootDoc;
		},

		getXMLFromString: function(sXML) {
			if (window.ActiveXObject) {
				var oXML = new ActiveXObject("Microsoft.XMLDOM");
				oXML.loadXML(sXML);
				return oXML;
			} else {
				return (new DOMParser()).parseFromString(sXML, "text/xml");
			}
		},
        getStringFromXML:function(xmlData) { 

            var xmlString;
            //IE
            if (window.ActiveXObject){
                xmlString = xmlData.xml;
            }
            // code for Mozilla, Firefox, Opera, etc.
            else{
                xmlString = (new XMLSerializer()).serializeToString(xmlData);
            }
            return xmlString;
        },
		password: function (length, special) {
			var iteration = 0;
			var password = "";
			var randomNumber;
			if(special == undefined){
				var special = false;
			}
			while(iteration < length){
				randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
				if(!special){
					if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
					if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
					if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
					if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
				}
				iteration++;
				password += String.fromCharCode(randomNumber);
			}
			return password;
		},

		getOrgNameFromEmail: function(emailid){
			var emailArray = new Array();
			emailArray = emailid.split("@");
			var orgName = new Array();
			orgName = emailArray[1].split(".");
			return orgName[0];
		},

		getHelperMsg: function(fieldObj, helpmsg){
			fieldObj.blur(function(){
				if ($(this).val().length == 0)
					$(this).val(helpmsg).addClass('watermark');
			}).focus(function(){
				if ($(this).val() == helpmsg)
					$(this).val('').removeClass('watermark');
			}).val(helpmsg).addClass('watermark');
		},

		showMessage: function(msg, msgtitle){
			$("<p id='msgcontainer' style='text-align:center;margin-top:15px;' class='msgbox'>"+msg+"</p>").dialog({
				title: msgtitle,
				autoOpen: true,
				width: 280,
				draggable: true,
				modal: true,
				resizable: false,
				position:['center','center'],
				closeOnEscape: true,
								
				buttons: {
					OK: function(){
						$(this).dialog("close");
					}
				}
			});
			$(".msgbox").parent().css("z-index","999");
		},

		getArrayFromString: function(strObj , separator){
			return strArr =  strObj.split(separator);
		},

		getPopUp: function(pId,pTitle,pHeight,pWidth,pButtons,openByDefault){

		    $(".ui-dialog-content").each(function(){
	            $(this).dialog("close");
                $(this).dialog("destroy");
		    });

			$("#"+pId).dialog({
				title: pTitle,
				autoOpen: openByDefault,
				height:pHeight,
				width: pWidth,
				draggable: true,
				modal: true,
				resizable: false,
				position:['center','center'],
				closeOnEscape: true,
				buttons: pButtons,
				close: function(event, ui) {
				    $("#"+pId).dialog( "close" );
                    $("#"+pId).dialog( "destroy" ); /* Ensure the page is no longer loaded */
                }
                
			});
			$(".ui-dialog").css("z-index","103");
			$(".ui-dialog-titlebar-close").text("");
			$(".ui-dialog-titlebar-close").append("<img src='images/close1.png'>");
		},
		getPopUpOnPopUp: function(pId,pTitle,pHeight,pWidth,pButtons,openByDefault){

			$("#"+pId).dialog({
				title: pTitle,
				autoOpen: openByDefault,
				height:pHeight,
				width: pWidth,
				draggable: true,
				modal: true,
				resizable: false,
				position:['center','center'],
				closeOnEscape: true,
				buttons: pButtons,
				close: function(event, ui) {
				    $("#"+pId).dialog( "close" );
                    $("#"+pId).dialog( "destroy" ); /* Ensure the page is no longer loaded */
                }
                
			});
			$(".ui-dialog").css("z-index","103");
			$(".ui-dialog-titlebar-close").text("");
			$(".ui-dialog-titlebar-close").append("<img src='images/close1.png'>");
		},

		getGUID:function() {
			var result='';
			for(var i=0; i<32; i++)
			result += Math.floor(Math.random()*16).toString(16).toUpperCase();
			return result;
		},
        getCharGUID:function(charLength) {
			var result='';
			for(var i=0; i<charLength; i++)
			result += Math.floor(Math.random()*16).toString(16).toUpperCase();
			return result;
		},
		getSaltPWD:function(password) {
			return RABIT.UTILS.getCharGUID(5) + $().crypt( {source: password}) + RABIT.UTILS.getCharGUID(5);
		},
		getPWDWithOutSalt:function(password) {
		    if (typeof(password) != "undefined" && password != "" && password.length > 10){
			    var newpwd = password.substr(5);
			    newpwd = newpwd.substr(0, newpwd.length-5);
			    return $().crypt( {method:"b64dec", source: newpwd});
			} else {
			    return "";
			}
		},
		getActResponse:function(response) {
		    if (typeof(response) != "undefined"){
				var resStr = $(response).find("return").text();
				if(typeof(resStr) != "undefined" && resStr != "" && resStr.length > 10){
					var newRes = resStr.substr(5);
			    	newRes = newRes.substr(0, newRes.length-5);
					return RABIT.UTILS.getXMLFromString($().crypt( {method:"b64dec", source: newRes}));
				}
			}
		},
		setWindowHeight:function(divname,addl_property,height_subtract){
            var frameheight = parseInt(parseInt(document.documentElement.clientHeight) - height_subtract);
			$("#"+divname).attr("style","height:"+frameheight+"px;"+addl_property+";");
        },

		getEncryptedPassword: function(password){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:getEncryptPassword><password>" + password + "</password></web:getEncryptPassword></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/getEncryptPassword";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return $(xmlhttp.responseXML).text();
		},

		getDecryptedPassword: function(password){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:getDecryptPassword><password>" + password + "</password></web:getDecryptPassword></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/getDecryptPassword";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return $(xmlhttp.responseXML).text();
		},

		getProjectBuildLog: function(orgName, ProjectName, buildNumber, environment){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:getProjectBuildLog><orgname>" + orgName + "</orgname><projectname>" + ProjectName + "</projectname><buildnumber>" + buildNumber + "</buildnumber><environment>" + environment + "</environment></web:getProjectBuildLog></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/getProjectBuildLog";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return $(xmlhttp.responseXML).text();
		},

		getLoggedUserInformation: function(mailId){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:getUserMapElement><email>" + mailId + "</email><orgextn>"+sessionStorage.getItem("orgName")+"</orgextn></web:getUserMapElement></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/getUserMapElement";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp.responseXML;
		},

		triggerWebService: function(req,serviceName){
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/"+serviceName;
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
		},
		REPLACESPACES:function(str,character){
            str = str.replace(/\s{1,}/g, character);
            return str;
        },
        REPLACESPECIALCHARACTER:function(str,character){
            do {
                str = str.replace(character, " ");
            } while (str.indexOf(character) != -1);
            return str;
        },
        monthConversion:function(inputMonth){
            var monthArray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
            for (var i=0;i<monthArray.length;i++){
                if (monthArray[i] == inputMonth){
                    return i+1;
                }
            }
        },
        convertUTCtoLocalTime:function(time,destoffset){
            
            var dateArray = time.split(",");
            var dateInput = new Date(dateArray[0],dateArray[1],dateArray[2],dateArray[3],dateArray[4],dateArray[5]);
            utcDate = dateInput.getTime() + (dateInput.getTimezoneOffset() * 60000);
            var convertedDate = new Date(utcDate + (3600000 * parseFloat(destoffset)));
            var dateSplitArray = convertedDate.toLocaleString().split(",");
            if (dateSplitArray.length > 1){
                if (navigator.appName == 'Microsoft Internet Explorer'){
                    var dateAndMonth = dateSplitArray[1].split(" ");
                    var timeStr = dateSplitArray[2].split(" ")[2];
                    if (timeStr.length > 0){
                        var timeStrArray = timeStr.split(":");
                        timeString = timeStrArray[0] +":"+ timeStrArray[1] +" "+dateSplitArray[2].split(" ")[3];
                        return dateAndMonth[2] +"-"+ dateAndMonth[1] +"-"+ convertedDate.getFullYear() +" "+timeString;
                    } else {
                        return "Error";
                    }
                } else {
                    var timeStr = dateSplitArray[1].split(" ");
                    if (timeStr.length > 0){
                        var timeStrArray = timeStr[1].split(":");
                        timeString = timeStrArray[0] +":"+ timeStrArray[1] +" "+timeStr[2];
                        return dateSplitArray[0] +" "+timeString;
                    } else {
                        return "Error";
                    }
                }
            } else {
                return "Error";
            }
        },
        inputExistsinXML:function(xmlNode,xpath,inputText,checkType,name){
            var isExists = false;
            $(xmlNode).find(xpath).each(function(){
                if (checkType == "attribute"){
                    if ($(this).attr(name).toLowerCase() == inputText.toLowerCase()){
                        isExists = true;
                        return;
                    }
                } else if (checkType == "text"){
                    if ($(this).text().toLowerCase() == inputText.toLowerCase()){
                        isExists = true;
                        return;
                    }
                }
            });
            return isExists;
        }

	};
	RABIT.COMMONFUNCTIONS = {
	    priviligesXml:RABIT,

		GETPROJECTS_BY_LOGGEDINUSER:function(){
			userRole = sessionStorage.getItem('userrole');
	        userEmail= sessionStorage.getItem('userEmail');
			var projectsRootNode = RABIT.UTILS.createXMLNode("projects","","","","");
			var projectNode;

			var projectListXML = RABIT.SERVICES.getProjects();

			if (userRole == "orgAdmin"){
				$(projectListXML).find("project[isactive='true']").each(function(){
					projectNode = RABIT.UTILS.createXMLNode("project",$(this).attr("name"),projectsRootNode,"","");
				});
			} else {
				userMappingxml = RABIT.SERVICES.getUsersMapping();
		        $(userMappingxml).find("users user[id='"+sessionStorage.getItem('userEmail')+"'] project").each(function(){
					if ($(projectListXML).find("project[name='"+$(this).attr("name")+"'][isactive='true']").length > 0){
						projectNode = RABIT.UTILS.createXMLNode("project",$(this).attr("name"),projectsRootNode,"","");
					}
				});

				$(projectListXML).find("project[createdby='"+sessionStorage.getItem('userEmail')+"'][isactive='true']").each(function(){
					var createdbyObj = $(this);
					var notExist = true;
					$(projectsRootNode).find("project").each(function(){
						if ($(this).text() == $(createdbyObj).attr("name")){
							notExist = false;
						}
					});
					if (notExist){
						projectNode = RABIT.UTILS.createXMLNode("project",$(createdbyObj).attr("name"),projectsRootNode,"","");
					}

				});
			}
			return projectsRootNode;
		},
		GETPROJECT_PRIVILIGES_BY_USER:function(){
		    priviligesXml = RABIT.UTILS.openFile("templates/priviliges.xml");
		    var userMappingXML = RABIT.SERVICES.getUsersMapping();

            if ($(userMappingXML).find("users").length > 0){
                var userNode = $(userMappingXML).find("users user[id='"+sessionStorage.getItem('userEmail')+"']");

                if (sessionStorage.getItem('userrole') != "orgadmin"){
                     var rolesXML = RABIT.SERVICES.getRoles();

                    $(userNode).find("project roles role").each(function(){

                        var roleNode = $(rolesXML).find("role[id='"+$(this).attr("id")+"']");



                        RABIT.COMMONFUNCTIONS.GETPRIVILIGENODE(roleNode,1,"triggerbuild",$(this).parent().parent().attr("name"));

                        RABIT.COMMONFUNCTIONS.GETPRIVILIGENODE(roleNode,6,"promote",$(this).parent().parent().attr("name"));

                        RABIT.COMMONFUNCTIONS.GETPRIVILIGENODE(roleNode,15,"reruntests",$(this).parent().parent().attr("name"));
                    });

                }
		    }

		},
		GETPRIVILIGENODE:function(node,actionid,priviligeitem,projectname){
		    var firstNode = 0;
		    if ($(node).find("permissions action[id='"+actionid+"']").length > 0){
                if ($(priviligesXml).find("priviliges privilige[project='"+projectname+"']").length == 0){
                    if (firstNode == 0){
                        $(priviligesXml).find("priviliges privilige").eq(0).attr("project",projectname);
                        $(priviligesXml).find("priviliges privilige").eq(0).attr(priviligeitem,"true");
                        firstNode = 1;
                    } else {
                        newprivilige = $(priviligesXml).find("priviliges privilige").eq(0).clone();
                        newprivilige.attr("project",projectname);
                        newprivilige.attr(priviligeitem,"true");
                        $(priviligesXml).find("priviliges").append(newprivilige);
                    }
                } else {
                    $(priviligesXml).find("priviliges privilige[project='"+projectname+"']").attr(priviligeitem,"true");
                }

            }

		},
		GETBUILDS_BY_PROJECT:function(projectname){
		    var buildDetails = RABIT.SERVICES.getBuildSummary(projectname);
		    var buildsRootNode = RABIT.UTILS.createXMLNode("builds","","","","");
		    var buildNode;
			$(buildDetails).find("build").each(function(){
			    buildNode = RABIT.UTILS.createXMLNode("build",$(this).attr("buildnumber"),buildsRootNode,new Array("fromrevision","torevision"),new Array($(this).attr("fromrevision"),$(this).attr("torevision")));
			});
		    return buildsRootNode;
		},

		checkRegistration: function(){
			var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:isRabitRegistered></web:isRabitRegistered></soapenv:Body></soapenv:Envelope>";
			xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/isRabitRegistered";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
		},

		getBrowserURL: function(){
			var rabitURL = window.location.href;
			var urlParts = rabitURL.split("/");
            return (rabitURL.search("autorabit.com") != -1) ? urlParts[0] + "/" + urlParts[1] + "/" + urlParts[2] : urlParts[0] + "/" + urlParts[1] + "/" + urlParts[2] + "/" + urlParts[3];
		},
		SET_WINDOW_HEIGHT:function(div_id,minus_height,addl_styles){
		    var frameheight = parseInt(parseInt(document.documentElement.clientHeight) - minus_height);
			$("#"+div_id).attr("style","height:"+frameheight+"px;"+addl_styles+";");
		},
		SET_HEADER_PROPERTIES:function(){
		    var windowHeight = document.documentElement.clientHeight - parseInt(100+30);
            $("#contentLoader").css({"height":windowHeight-parseInt(30), "width":document.documentElement.clientWidth});
		}

	};
	RABIT.FORMVALIDATION = {

		tips: "FORMVALIDATION",

		updateTips: function( t ) {
			tips = $( ".validateTips" );
			tips.text( t ).addClass( "ui-state-highlight" );
			$( ".validateTips" ).show();
		},

		checkLength: function( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips( "Length of " + n + " must be between " +	min + " and " + max + "." );
				o.focus();
				return false;
			} else {
				return true;
			}
		},

		checkIsEmpty: function( o, msg) {
			if ( o.val() == "" ) {
				o.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips(msg);
				o.focus();
				return false;
			} else {
				return true;
			}
		},
        validateField: function( obj,objValue,msgHolder,msg) {
			if ( obj.val() == objValue) {
			    if (msgHolder!= ""){
				    RABIT.FORMVALIDATION.updateMsg(msgHolder,msg);
				}
				obj.focus();
				return false;
			} else {
				return true;
			}
		},
		updateMsg: function( msgHolder,message) {
			var msgObject = $(msgHolder);
			$(msgObject).text( message ).addClass( "ui-state-highlight" ).show();
		},
		checkBoxcheck: function( o, n, min ) {
			if(o.find("input[type='checkbox']").is(':checked')){
				var teststr = "";
				RABIT.FORMVALIDATION.updateTips(teststr);
				return true;
			} else {
				RABIT.FORMVALIDATION.updateTips( "Atleast select " + min + n);
				return false;
			}
		},

		checkSelectBox: function( o, n ) {
			if(o.val() == "" || o.val() == "select"){
				RABIT.FORMVALIDATION.updateTips( "Please select " + n);
				return false;
			} else {
				return true;
			}
		},

		checkRegexp: function( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips( n );
				o.focus();
				return false;
			} else {
				return true;
			}
		},

		comparePwds: function( pwd, cpwd ) {
			if( pwd.val() != cpwd.val() ){
				pwd.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips( "Passwords did not match" );
				return false;
			} else {
				return true;
			}
		},

		checkPasswordPolicy:function(str){
			/*(			# Start of group
			(?=.*\d)	#   must contain at least one digit
			(?=.*[A-Z])	#   must contain at least one uppercase character
			(?=.*\W)	#   must contain at least one special symbol
						#   match anything with previous condition checking
			{6,16}		#   length at least 6 characters and also maximum of 16
			)			# End of group*/
			var regex = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{6,16})/;

			if(regex.test($(str).val())) {
				return true;
			} else {
				str.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips("Password is not as per the policy specified.");
				return false;
			}
		},

		compareDate: function(startdate, endate){
			var startDate = new Date($(startdate).val());
			var endDate = new Date($(endate).val());
			if (startDate < endDate){

			}
		},

		checkIP: function(ipaddress){
		    var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
            if (re.test(ipaddress)) {
                var parts = ipaddress.split(".");
                if (parseInt(parseFloat(parts[0])) == 0) {
                    return false;
                }
                for (var i=0; i<parts.length; i++) {
                    if (parseInt(parseFloat(parts[i])) > 255) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        },

		checkIsOnlyNumbers: function(number){
		    var regexp = /^[0-9]*$/;
            if (regexp.test($(number).val())) {
                return true;
            } else {
				number.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips( "Phone Number field allow only digits." );
				number.focus();
                return false;
            }
        },
        invalidCharacterCheck:function(inputStr){
            var inValidCharacters = /^[^&<>'"]+$/g;

            if(inValidCharacters.test(inputStr) ){
                return true;
            }else{
                return false;
            }
        },
        formInputCharCheck:function(objArray){
            var isStepValid = true;
            for (var i=0;i<objArray.length;i++){
                if ($(objArray[i]).val() != ""){
                    isStepNotValid = RABIT.FORMVALIDATION.invalidCharacterCheck($(objArray[i]).val());
                    if (!isStepNotValid){
                        $(objArray[i]).addClass( "ui-state-error" ).focus();
                        return $(objArray[i]);
                    }
                }
            }
            return true;
        },
        isValidEmail:function(emailAddress){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            return pattern.test(emailAddress);
        },
		isValidURL:function(url){
            var pattern = new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
            return pattern.test(url);
        },
        checkPhoneNumber:function(phoneNumber){
            var pureNumber = $(phoneNumber).val().replace(/\D/g, "");
            var isValid = $(phoneNumber).val().length >= 10 && $(phoneNumber).val().match(/^[\(\)\s\-\+\d]{10,17}$/);
            if (isValid) {
                return true;
            } else {
                phoneNumber.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips( "Enter valid phone number" );
				phoneNumber.focus();
                return false;
            }
        },
        checkForNumber: function(numberObject,message){
		    var regexp = /^[0-9]*$/;
            if (regexp.test($(numberObject).val())) {
                return true;
            } else {
				numberObject.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips(message);
				numberObject.focus();
                return false;
            }
        },
        checkForAlphabetsAndSpaces: function(stringObject,message){
            var regexp = /^([a-zA-Z ])*$/;
            if (regexp.test($(stringObject).val())) {
                return true;
            } else {
				stringObject.addClass( "ui-state-error" );
				RABIT.FORMVALIDATION.updateTips(message);
				stringObject.focus();
                return false;
            }
        },
        getConvertedTime:function(time){
            var bldHour = time.split(" ")[1].split(":")[0];
            var bldMin = time.split(" ")[1].split(":")[1];
            
            var bldYear = time.split("-")[2];
            
            if (typeof(bldYear) != "undefined" && bldYear.indexOf(" ") > 0){
                bldYear = bldYear.split(" ")[0];
            }
            var bldMonth = RABIT.UTILS.monthConversion(time.split("-")[1]);
            var bldDay = time.split("-")[0];

            return RABIT.UTILS.convertUTCtoLocalTime(bldYear+","+bldMonth+","+bldDay+","+bldHour+","+bldMin+",0,0",sessionStorage.getItem('offset'));
        },
    };

})(jQuery);