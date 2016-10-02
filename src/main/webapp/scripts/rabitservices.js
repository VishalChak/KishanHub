;(function($) {

	RABIT.SERVICES = {

		getSoapRequest:function(webmethod){
			return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.service.rabit.com/"><soapenv:Header/><soapenv:Body>' + webmethod + '</soapenv:Body></soapenv:Envelope>';
	    },

		setSoapHeaders: function(webmethod){
			var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/"+webmethod);
			return xmlhttp;
		},

		getOrgUsers:function(orgName){
			if(orgName == undefined){
				orgName = sessionStorage.getItem("orgName");
			}
			var paramString = "<ws:getUsers><orgname>"+orgName+"</orgname></ws:getUsers>";
			var req = RABIT.SERVICES.getSoapRequest(paramString);
		    var xmlhttp = RABIT.SERVICES.setSoapHeaders("getUsers");
            xmlhttp.send(req);
		    return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
        },

		getProjects: function(){
			var paramString = "<ws:getProjects><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getProjects>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getProjects");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},
		getApexTestClasses:function(sfOrgId){
			/*var paramString = "<ws:getApexTestClasses><orgname>"+sessionStorage.getItem("orgName")+"</orgname><sforgid>"+sfOrgId+"</sforgid></ws:getApexTestClasses>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getApexTestClasses");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);*/
            
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getApexTestClasses>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<sforgid>"+sfOrgId+"</sforgid>";
		        req += "</web:getApexTestClasses>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getApexTestClasses");
            xmlhttp.send(req);
		    return xmlhttp;
            
            
		},
		saveTafProcess:function(projectStr,runProcess){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:saveTafProcess>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<username>"+sessionStorage.getItem('userEmail')+"</username>";
		            req += "<projectnode>"+RABIT.UTILS.getSaltPWD(projectStr)+"</projectnode>";
		            req += "<runprocess>"+runProcess+"</runprocess>";
		        req += "</web:saveTafProcess>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/saveTafProcess");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		deleteTafProcess:function(projectName,processName){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:deleteTafProcess>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projectName+"</projectname>";
		            req += "<processname>"+processName+"</processname>";
		        req += "</web:deleteTafProcess>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/deleteTafProcess");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		getProjectConfiguration: function(projectName){
			var paramString = "<ws:getProjectConfiguration><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+projectName+"</projectname></ws:getProjectConfiguration>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getProjectConfiguration");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getBuildSummary: function(projectName){
		    if (typeof(projectName) == "undefined" || projectName == "undefined"){
		        return false;
		    }
			var paramString = "<ws:getBuildSummary><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+projectName+"</projectname></ws:getBuildSummary>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getBuildSummary");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getPromotionSummary: function(projectName){
			var paramString = "<ws:getPromotionSummary><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+projectName+"</projectname></ws:getPromotionSummary>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getPromotionSummary");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getChangeSets: function(projectName, buildNumber){
			var paramString = "<ws:getChangeSets><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+projectName+"</projectname><buildnumber>"+buildNumber+"</buildnumber></ws:getChangeSets>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getChangeSets");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getCheckinsInfo: function(projectName, buildNumber){
			var paramString = "<ws:getCheckinsInfo><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+projectName+"</projectname><buildnumber>"+buildNumber+"</buildnumber></ws:getCheckinsInfo>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getCheckinsInfo");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getFunctionalReport: function(){
			var paramString = "<ws:getFunctionalReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem("projectName")+"</projectname><buildnumber>"+sessionStorage.getItem('selectedbuild')+"</buildnumber></ws:getFunctionalReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getFunctionalReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getRequirementsReport: function(projectName, buildNumber){
			var paramString = "<ws:getRequirementsReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+projectName+"</projectname><buildnumber>"+buildNumber+"</buildnumber></ws:getRequirementsReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getRequirementsReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getDefectsReport: function(){
			var paramString = "<ws:getDefectsReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem("projectName")+"</projectname><buildnumber>"+sessionStorage.getItem('selectedbuild')+"</buildnumber></ws:getDefectsReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getDefectsReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getTicketsReport: function(projectName){
			var paramString = "<ws:getTickets><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+projectName+"</projectname></ws:getTickets>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getTickets");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getPMDReport: function(startnum,pagesize,summaryFlag){
			var paramString = "<ws:getPMDReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem("projectName")+"</projectname><buildnumber>"+sessionStorage.getItem('selectedbuild')+"</buildnumber><startnumber>"+startnum+"</startnumber><pagesize>"+pagesize+"</pagesize><summary>"+summaryFlag+"</summary></ws:getPMDReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getPMDReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getMBReport: function(){
			var paramString = "<ws:getMBReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem("projectName")+"</projectname><buildnumber>"+sessionStorage.getItem('selectedbuild')+"</buildnumber></ws:getMBReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getMBReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getFxCopReport: function(){
			var paramString = "<ws:getFXCOPReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem("projectName")+"</projectname><buildnumber>"+sessionStorage.getItem('selectedbuild')+"</buildnumber></ws:getFXCOPReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getFXCOPReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getSalesForceCodeCoverageReport: function(){
			var paramString = "<ws:getSalesForceCodeCoverageReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem("projectName")+"</projectname><buildnumber>"+sessionStorage.getItem('selectedbuild')+"</buildnumber></ws:getSalesForceCodeCoverageReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getSalesForceCodeCoverageReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getTrendsReport: function(moduleName){
			var paramString = "<ws:getTrendReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem('projectName')+"</projectname><modulename>"+moduleName+"</modulename></ws:getTrendReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getTrendReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getPerformanceTrendReport: function(planName){
			var paramString = "<ws:getPerformanceTrendReport><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem('projectName')+"</projectname><planname>"+planName+"</planname></ws:getPerformanceTrendReport>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getPerformanceTrendReport");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getTestResultSummary: function(os){
			var paramString = "<ws:getTestResultSummary><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem("projectName")+"</projectname><buildnumber>"+sessionStorage.getItem('selectedbuild')+"</buildnumber><os>"+os+"</os></ws:getTestResultSummary>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getTestResultSummary");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getUsersMapping: function(){
			var paramString = "<ws:getUsersMapping><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getUsersMapping>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getUsersMapping");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getALMUsersMapping: function(){
			var paramString = "<ws:getUsersALMMapping><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem("editProject")+"</projectname></ws:getUsersALMMapping>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getUsersALMMapping");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getProjectTypes: function(){
			var paramString = "<ws:getProjectTypes><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getProjectTypes>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getProjectTypes");
            xmlhttp.send(req);
            return xmlhttp.responseXML;
		},

		getBuildRules: function(){
			var paramString = "<ws:getBuildRules><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getBuildRules>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getBuildRules");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		},

		getTestCategories: function(){
			var paramString = "<ws:getTestCategories><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getTestCategories>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getTestCategories");
            xmlhttp.send(req);
            return xmlhttp.responseXML;
		},

		getTestGroups: function(){
			var paramString = "<ws:getTestGroups><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getTestGroups>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getTestGroups");
            xmlhttp.send(req);
            return xmlhttp.responseXML;
		},

		getTestTypes: function(){
			var paramString = "<ws:getTestTypes><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getTestTypes>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getTestTypes");
            xmlhttp.send(req);
            return xmlhttp.responseXML;
		},

		deleteUsers: function(emailIds){
			var paramString = "<ws:deleteUsers><orgname>"+sessionStorage.getItem("orgName")+"</orgname><emails>"+RABIT.UTILS.getSaltPWD(emailIds)+"</emails></ws:deleteUsers>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("deleteUsers");
            xmlhttp.send(req);
            return xmlhttp.responseXML;
		},

		deleteSFOrgs: function(sfOrgIds){
			var paramString = "<ws:deleteSFOrgs><orgname>"+sessionStorage.getItem("orgName")+"</orgname><sforgids>"+sfOrgIds+"</sforgids></ws:deleteSFOrgs>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("deleteSFOrgs");
            xmlhttp.send(req);
            return xmlhttp.responseXML;
		},

		deleteAgents: function(orgName, agentIds){
			var paramString = "<ws:deleteAgents><orgname>"+orgName+"</orgname><agentids>"+agentIds+"</agentids></ws:deleteAgents>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("deleteAgents");
            xmlhttp.send(req);
            return xmlhttp.responseXML;
		},

		almUsersMapping: function(xmlObj){
			var paramString = "<ws:almUsersMapping><orgname>"+sessionStorage.getItem("orgName")+"</orgname><xmlnode>"+RABIT.UTILS.getSaltPWD(xmlObj)+"</xmlnode></ws:almUsersMapping>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("almUsersMapping");
            xmlhttp.send(req);
            return xmlhttp;
		},

		assignProjectsToUser: function(xmlObj){
			var paramString = "<ws:assignProjectsToUser><orgname>"+sessionStorage.getItem("orgName")+"</orgname><xmlnode>"+RABIT.UTILS.getSaltPWD(xmlObj)+"</xmlnode></ws:assignProjectsToUser>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("assignProjectsToUser");
            xmlhttp.send(req);
            return xmlhttp;
		},

		saveALMUsers: function(xmlObj){
			var paramString = "<ws:saveALMUsers><orgname>"+sessionStorage.getItem("orgName")+"</orgname><xmlnode>"+RABIT.UTILS.getSaltPWD(xmlObj)+"</xmlnode></ws:saveALMUsers>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("saveALMUsers");
            xmlhttp.send(req);
            return xmlhttp;
		},
		
		getUserMapElement: function(userEmail){
			var paramString = "<ws:getUserMapElement><email>"+userEmail+"</email><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getUserMapElement>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getUserMapElement");
            xmlhttp.send(req);
            return xmlhttp;
		},

	    GET_SERVER_PROPERTIES:function(){

	    },

        GET_TESTLINK_TESTCASES:function(inputid){
            var paramString = "<orgname>"+sessionStorage.getItem("orgName")+"</orgname><testplanid>"+inputid+"</testplanid>";
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:getTestSuitesByTestPlan>" + paramString + "</web:getTestSuitesByTestPlan></soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTestSuitesByTestPlan");
            xmlhttp.send(req);
            return xmlhttp;

        },
        GET_TESTCASES_FROM_ALM:function(oName,testPlanId,almSystem){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTestCasesForTestPlanFromALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<testplanid>"+testPlanId+"</testplanid>";
		            req += "<almname>"+almSystem+"</almname>";
		        req += "</web:getTestCasesForTestPlanFromALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTestCasesForTestPlanFromALM");
            xmlhttp.send(req);
		    return xmlhttp;

        },
        GET_TESTSUITES_FROM_ALM:function(oName,projectId,almSystem){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTestSuitesByProjectFromALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<projectid>"+projectId+"</projectid>";
		            req += "<almname>"+almSystem+"</almname>";
		        req += "</web:getTestSuitesByProjectFromALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTestSuitesByProjectFromALM");
            xmlhttp.send(req);
		    return xmlhttp;

        },
        GET_DEPLOYMENT_LOG:function(project_Name,build_number,agent_id){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ws=\"http://ws.service.rabit.com/\"><soapenv:Header/><soapenv:Body>";
            req += "<ws:getPromotionLog>";
                req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "<projectname>"+project_Name+"</projectname>";
                req += "<buildnumber>"+build_number+"</buildnumber>";
                req += "<agentid>"+agent_id+"</agentid>";
            req += "</ws:getPromotionLog>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getPromotionLog");
            xmlhttp.send(req);
            return xmlhttp;
        },
        getMetadataTypes:function(orgName,sfOrgId){
        	 var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ws=\"http://ws.service.rabit.com/\"><soapenv:Header/><soapenv:Body>";
             req += "<ws:getMetadataTypes>";
                 req += "<orgName>"+orgName+"</orgName>";
                 req += "<sforgid>"+sfOrgId+"</sforgid>";
             req += "</ws:getMetadataTypes>";
             req += "</soapenv:Body></soapenv:Envelope>";
             var xmlhttp = RABIT.UTILS.getXmlhttpObject();
             xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
             xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
             xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getMetadataTypes");
             xmlhttp.send(req);
             return xmlhttp;
        },
        getSourcePackageManifest:function(project_Name,build_number,sourceOrgId,labelName,depSource,filterNode,scmNodeIs){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ws=\"http://ws.service.rabit.com/\"><soapenv:Header/><soapenv:Body>";
            req += "<ws:getSourcePackageManifest>";
                req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "<projectname>"+project_Name+"</projectname>";
                req += "<buildnumber>"+build_number+"</buildnumber>";
                req += "<sourceorgid>"+sourceOrgId+"</sourceorgid>";
                req += "<labelname>"+labelName+"</labelname>";
                req += "<deploymentsource>"+depSource+"</deploymentsource>";
                req += filterNode;
                if (scmNodeIs != ""){
		             req += scmNodeIs;
		        }
                req += "<username>"+sessionStorage.getItem('userEmail')+"</username>";
            req += "</ws:getSourcePackageManifest>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSourcePackageManifest");
            xmlhttp.send(req);
            return xmlhttp;
        },
        getSourcePackageTypeMembers:function(project_Name,build_number,srcOrgId,labelName,depSource,type,filterNode){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ws=\"http://ws.service.rabit.com/\"><soapenv:Header/><soapenv:Body>";
            req += "<ws:getMembersForMetadataType>";
                req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "<projectname>"+project_Name+"</projectname>";
                req += "<buildnumber>"+build_number+"</buildnumber>";
                req += "<sourceorgid>"+srcOrgId+"</sourceorgid>";
                req += "<labelname>"+labelName+"</labelname>";
                req += "<deploymentsource>"+depSource+"</deploymentsource>";
                req += "<metadatatype>"+type+"</metadatatype>";
                req += filterNode;
                req += "<username>"+sessionStorage.getItem('userEmail')+"</username>";
            req += "</ws:getMembersForMetadataType>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getMembersForMetadataType");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_DEPLOYED_COMPONENTS_LOG:function(org_Name,project_Name,build_number,appserver_id,dep_type){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ws=\"http://ws.service.rabit.com/\"><soapenv:Header/><soapenv:Body>";
            req += "<ws:getDeployedComponentsLog>";
                req += "<orgname>"+org_Name+"</orgname>";
                req += "<projectname>"+project_Name+"</projectname>";
                req += "<buildnumber>"+build_number+"</buildnumber>";
                req += "<appserverid>"+appserver_id+"</appserverid>";
                req += "<deploymenttype>"+dep_type+"</deploymenttype>";
            req += "</ws:getDeployedComponentsLog>";
            req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getDeployedComponentsLog");
            xmlhttp.send(req);

            return xmlhttp;
        },
        SAVE_SCHEDULED_BUILD_PREFERENCES:function(preferencesnode,orgname,projectname){
            var strObj = "<preferencenode>"+ preferencesnode +"</preferencenode><orgname>"+orgname+"</orgname><projectname>" + projectname + "</projectname>";
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"  xmlns:web=\"http://ws.build.rabit.com/\"><soapenv:Body><web:saveScheduleBuildPreferences>" + strObj + "</web:saveScheduleBuildPreferences></soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            var soapaction = "http://ws.build.rabit.com/saveScheduleBuildPreferences";
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/buildservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", soapaction);
            xmlhttp.send(req);
	        return xmlhttp;
        },
        ADD_PROJECT_INTO_CRUISE:function(cruiseprojectxml,projecttype,rba_host,rba_port,rType){

            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.build.rabit.com/\"><soapenv:Body>";
                req += "<web:addCruiseProject>";
                    req += "<projectxml>" + cruiseprojectxml + "</projectxml>";
                    req += "<projecttype>"+projecttype+"</projecttype>";
                    req += "<isnew>"+rType+"</isnew>";
                req += "</web:addCruiseProject>";
            req += "</soapenv:Body></soapenv:Envelope>";
	        var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/buildservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.build.rabit.com/addCruiseProject");
	        xmlhttp.send(req);
			return xmlhttp;
        },
        RESET_TEST_SEQUENCING:function(oName,pName){

            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:updateGroupingAndSequencing><arg0>" + oName + "</arg0>";
                req += "<arg1>" + pName + "</arg1>";
            req += "</web:updateGroupingAndSequencing></soapenv:Body></soapenv:Envelope>";

	        var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.onreadystatechange=function(){
		        if (xmlhttp.readyState==4 && xmlhttp.status==200){
			        return true;
		        } else if (xmlhttp.readyState == 4){
			        return xmlhttp.responseXML.xml;
		        }
	        };
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/updateGroupingAndSequencing");
	        xmlhttp.send(req);
        },

        /* GET_TESTPLANS_FROM_TESTLINK is deprecated */
        GET_TESTPLANS_FROM_TESTLINK:function(testlinkProjId){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getProjectTestPlans>";
                    req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
                    req += "<projectid>"+testlinkProjId+"</projectid>";
                req += "</web:getProjectTestPlans>";
            req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getProjectTestPlans");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_TESTPLANS_FROM_TESTALM:function(testlinkProjId,connType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getProjectTestPlansFromALM>";
                    req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
                    req += "<projectid>"+testlinkProjId+"</projectid>";
                    req += "<almname>"+connType+"</almname>";
                req += "</web:getProjectTestPlansFromALM>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getProjectTestPlansFromALM");
            xmlhttp.send(req);
            return xmlhttp;
        },
        DELETE_PROJECT:function(projectname){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:deleteProject>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
                    req += "<projectname>"+projectname+"</projectname>";
		        req += "</web:deleteProject>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/deleteProject");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_PROJECTS_FROM_TESTLINK:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getProjectsFromTCM>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		        req += "</web:getProjectsFromTCM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getProjectsFromTCM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_PROJECTS_FROM_JIRA:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getProjectsFromRM>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		        req += "</web:getProjectsFromRM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getProjectsFromRM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_REQUIREMENTS_FROM_JIRA_BY_PROJECT:function(mappedkey){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getRequirementsByProjectFromRM>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		            req += "<projectkey>" + mappedkey + "</projectkey>";
		        req += "</web:getRequirementsByProjectFromRM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getRequirementsByProjectFromRM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_SUMMARY_FROM_JIRA:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTaskManagementSummary>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		        req += "</web:getTaskManagementSummary>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            var soapaction = "http://ws.service.rabit.com/getTaskManagementSummary";
            xmlhttp.open("POST", RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", soapaction);
            xmlhttp.send(req);
            return xmlhttp;
        },
        CREATE_TICKET_INTO_JIRA:function(projectKey,issueType,ticketsummary,priority){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:createIssueInRM>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		            req += "<projectkey>" + projectKey+ "</projectkey>";
		            req += "<rmtype>Jira</rmtype>";
		            req += "<issuetype>" + issueType + "</issuetype>";
		            req += "<summary>" + ticketsummary+ "</summary>";
		            req += "<priority>" + priority+ "</priority>" ;
		        req += "</web:createIssueInRM>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
		    var soapaction = "http://ws.service.rabit.com/createIssueInRM";
		    xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
		    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		    xmlhttp.setRequestHeader("SOAPAction", soapaction);
		    xmlhttp.send(req);
		    return xmlhttp;
        },

        ACTIVATE_USER:function(uEmail,actType){

            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:activateUsers>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		            req += "<email>" + RABIT.UTILS.getSaltPWD(uEmail) + "</email>";
		            req += "<activate>" + actType + "</activate>";
		        req += "</web:activateUsers>";
		    req += "</soapenv:Body></soapenv:Envelope>";


            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/activateUsers");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_USER_DETAILS:function(orgname,email){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getUserDetails>";
		            req += "<orgname>" + orgname + "</orgname>";
		            req += "<email>" + email + "</email>";
		        req += "</web:getUserDetails>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/getUserDetails";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
        },
        CHANGE_PASSWORD:function(userEmail, oldpassword, newpassword, token){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:changePassword>";
		            req += "<usermail>" + RABIT.UTILS.getSaltPWD(userEmail) + "</usermail>";
		            req += "<oldpassword>" + oldpassword + "</oldpassword>";
		            req += "<newpassword>" + newpassword + "</newpassword>";
					req += "<token>" + token + "</token>";
		        req += "</web:changePassword>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/changePassword";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
        },
        FORGOT_CHANGE_PASSWORD:function(orgId,userId, oldpassword, newpassword, token){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:forgotChangePassword>";
		            req += "<orgid>" + orgId + "</orgid>";
		            req += "<userid>" + userId + "</userid>";
		            req += "<oldpassword>" + oldpassword + "</oldpassword>";
		            req += "<newpassword>" + newpassword + "</newpassword>";
					req += "<token>" + token + "</token>";
		        req += "</web:forgotChangePassword>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
			var soapaction = "http://ws.service.rabit.com/changePassword";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
			return xmlhttp;
        },
        TRIGGER_NEW_BUILD:function(projectname,masterIP,runTests,buildIs){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"  xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:startBuild>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		            req += "<projectname>" + projectname + "</projectname>";
		            req += "<runtests>" + runTests + "</runtests>";
		        req += "</web:startBuild>";
		    req += "</soapenv:Body></soapenv:Envelope>";
			var xmlhttp = RABIT.UTILS.getXmlhttpObject();
			xmlhttp.onreadystatechange=function()
			{
				if (buildIs != "firstbuild"){
				    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					    alert($(xmlhttp.responseXML).find("return").text());
				    } else if(xmlhttp.readyState == 4 && xmlhttp.status == 500){
					    alert($(xmlhttp.responseXML).find("faultCode").text());
				    }
				}
			};
			var soapaction = "http://ws.service.rabit.com/startBuild";
			xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
			xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			xmlhttp.setRequestHeader("SOAPAction", soapaction);
			xmlhttp.send(req);
        },
        SAVE_BUILD_PREFERENCES:function(projectname,buildPrefNode,masterIP){
	        var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"  xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:saveBuildPreferences>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		            req += "<projectname>" + projectname + "</projectname>";
		            req += "<preferencenode>"+ buildPrefNode +"</preferencenode>";
		        req += "</web:saveBuildPreferences>";
		    req += "</soapenv:Body></soapenv:Envelope>";

	        var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        var soapaction = "http://ws.service.rabit.com/saveBuildPreferences";
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", soapaction);
	        xmlhttp.send(req);
			return xmlhttp;
        },
        ARCHIVE_OR_DELETE_BUILD_RESULTS:function(projectname,buildnos,archievaltype,location,uName,pWord){

            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:manageOldData>";
		            req += "<orgname>" + sessionStorage.getItem("orgName") + "</orgname>";
		            req += "<projectname>" + projectname + "</projectname>";
		            req += "<buildnumbers>"+buildnos+"</buildnumbers>";
		            req += "<type>"+archievaltype+"</type>";
		            req += "<location>"+location+"</location>";
		            req += "<username>"+uName+"</username>";
		            req += "<password>"+pWord+"</password>";
		        req += "</web:manageOldData>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.onreadystatechange=function(){
	            if (xmlhttp.readyState==4 && xmlhttp.status==200){
	              var response = xmlhttp.responseXML;
	              alert("Operation is done successfully.");
	            } else if ( xmlhttp.readyState==4 ) {
	                alert(xmlhttp.responseText);
	            }
            };
            var soapaction = "http://ws.service.rabit.com/manageOldData";
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", soapaction);
            xmlhttp.send(req);
            return xmlhttp;
        },
        MILESTONE_BUILDS:function(surl,suname,spwd,orgname,prjname,buildnos,stype,tlocation,tuname,tpword,ttype,label){

            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:milestoneBuilds>";
		            req += "<sourceurl>"+surl+"</sourceurl>";
		            req += "<sourceusername>"+suname+"</sourceusername>";
		            req += "<sourcepassword>"+spwd+"</sourcepassword>";
		            req += "<orgname>"+orgname+"</orgname>";
		            req += "<projectname>" + prjname+ "</projectname>";
		            req += "<builnumbers>"+buildnos+"</builnumbers>";
		            req += "<sourcetype>"+stype+"</sourcetype>";
		            req += "<targeturl>"+tlocation+"</targeturl>";
		            req += "<targetusername>"+tuname+"</targetusername>";
		            req += "<targetpassword>"+tpword+"</targetpassword>";
		            req += "<targettype>"+ttype+"</targettype>";
		            req += "<milestonelabel>"+label+"</milestonelabel>";
		        req += "</web:milestoneBuilds>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();

            var soapaction = "http://ws.service.rabit.com/milestoneBuilds";
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", soapaction);
            xmlhttp.send(req);

            return xmlhttp;
        },
        PREPARE_CUSTOM_DEPLOYMENT_ZIP:function(compxml){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:prepareCustomDeployZip>";
		        	req += "<username>"+sessionStorage.getItem("userEmail")+"</username>";
		            req += "<xmlnode>" + compxml + "</xmlnode>";
		        req += "</web:prepareCustomDeployZip>";
		    req += "</soapenv:Body></soapenv:Envelope>";

	        var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        var soapaction = "http://ws.service.rabit.com/prepareCustomDeployZip";
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", soapaction);
	        xmlhttp.send(req);
			return xmlhttp;
        },
        getSalesforceMetdataDiff:function(compxml){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getOrgCompareDiff>";
		        	req += "<username>"+sessionStorage.getItem("userEmail")+"</username>";
		            req += "<metadatanode>" + compxml + "</metadatanode>";
		        req += "</web:getOrgCompareDiff>";
		    req += "</soapenv:Body></soapenv:Envelope>";

	        var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                	PROMOTION.BUILD.renderOrgDiffData( xmlhttp.responseXML);
                }
                else if (xmlhttp.readyState == 4 && xmlhttp.status!=200)
                {
                	RABIT.UTILS.showMessage($(xmlhttp.responseXML).find("faultCode").text(),"Error");
                	$("#sourceSforgMetadata").show( "fast", function() {});
   				 	$("#sourcedivid").hide( "fast", function() {});
                }
            };
	        var soapaction = "http://ws.service.rabit.com/getOrgCompareDiff";
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", soapaction);
	        xmlhttp.send(req);
        },
         
        REGRESSION_AFTER_PROMOTION_CORDYS:function(){
            /*var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:startRegression>";
		            req += "<xmlnode>" + compxml + "</xmlnode>";
		        req += "</web:startRegression>";
		    req += "</soapenv:Body></soapenv:Envelope>";

		    Need to change this service for promotipon.js for cordys upgrade *********************************************/

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                   alert(getXMLNodeValue(".//return",xmlhttp.responseXML,""));
                }
                else if (xmlhttp.readyState == 4 && xmlhttp.status!=200)
                {
                    alert(getXMLNodeValue(".//faultstring",xmlhttp.responseXML,""));
                }
            };
            var soapaction = "http://webservices.deployment.rabit.com/startRegression";
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/triggerservice?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", soapaction);
            xmlhttp.send(req);
        },


        GET_METADATA_DIFFERENCE_SALESFORCE:function(sforgid,package_type,sf_package,fs_type){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getMetaDataDiff>";
		            req += "<orgName>"+sessionStorage.getItem("orgName")+"</orgName>";
		            req += "<projName>"+sessionStorage.getItem("projectName")+"</projName>";
		            req += "<userName>"+sessionStorage.getItem("userEmail")+"</userName>";
		            req += "<bno>"+sessionStorage.getItem('selectedbuild')+"</bno>";
		            req += "<sforgid>"+sforgid+"</sforgid>";
		            req += "<packageType>"+package_type+"</packageType>";
		            req += "<sfpckgName>"+ sf_package +"</sfpckgName>";
		            req += "<fstype>"+fs_type+"</fstype>";
		        req += "</web:getMetaDataDiff>";
		    req += "</soapenv:Body></soapenv:Envelope>";

		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
		    var soapaction = "http://ws.service.rabit.com/getMetaDataDiff";
		    xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
		    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		    xmlhttp.setRequestHeader("SOAPAction", soapaction);
		    xmlhttp.send(req);
		    return xmlhttp;
        },
        FULL_PROMOTION_SALESFORCE:function(projname,buildno,agentid,sandboxid,promotetype,runtests){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:triggerPromotion>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projname+"</projectname>";
		            req += "<buildnumber>"+buildno+"</buildnumber>";
					req += "<agentid>"+agentid+"</agentid>";
		            req += "<appserverid>"+sandboxid+"</appserverid>";
					req += "<promotetype>"+promotetype+"</promotetype>";
		            req += "<runtests>"+runtests+"</runtests>";
		        req += "</web:triggerPromotion>";
		    req += "</soapenv:Body></soapenv:Envelope>";

		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
		    var soapaction = "http://ws.service.rabit.com/triggerPromotion";
		    xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
		    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		    xmlhttp.setRequestHeader("SOAPAction", soapaction);
		    xmlhttp.send(req);
			return xmlhttp;
        },
        GET_FILE_DIFFFERENCES:function(label,pkgname,type,src,dest,sourcetype,srcid,destid){

            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
            req += "<web:getFileDiff>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<username>"+sessionStorage.getItem("userEmail")+"</username>";
            req += "<labelname>"+label+"</labelname>";
            req += "<packgname>"+pkgname+"</packgname>";
            req += "<metadatatype>"+type+"</metadatatype>";
            req += "<srcmembername>"+src+"</srcmembername>";
            req += "<destmembername>"+dest+"</destmembername>";
            req += "<sourcetype>"+sourcetype+"</sourcetype>";
            req += "<sourceorgid>"+srcid+"</sourceorgid>";
            req += "<destorgid>"+destid+"</destorgid>";
            req += "</web:getFileDiff>";
            req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            var soapaction = "http://ws.service.rabit.com/getFileDiff";
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", soapaction);
            xmlhttp.send(req);
            return xmlhttp;
        },
        CHECK_SNAPSHOT_LABEL_EXISTS:function(snaplbl){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:checkSnapShotLabelExist>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+sessionStorage.getItem("projectName")+"</projectname>";
		            req += "<buildnumber>"+sessionStorage.getItem('selectedbuild')+"</buildnumber>";
		            req += "<snapshotlabel>"+snaplbl+"</snapshotlabel>";
		        req += "</web:checkSnapShotLabelExist>";
		    req += "</soapenv:Body></soapenv:Envelope>";

		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
		    var soapaction = "http://ws.service.rabit.com/checkSnapShotLabelExist";
		    xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
		    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		    xmlhttp.setRequestHeader("SOAPAction", soapaction);
		    xmlhttp.send(req);
		    return xmlhttp;
        },
        
        GET_SAVED_SNAPSHOT_LABELS:function(pname,bno){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getSnapShotLabels>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+pname+"</projectname>";
		            req += "<buildnumber>"+bno+"</buildnumber>";
		        req += "</web:getSnapShotLabels>";
		    req += "</soapenv:Body></soapenv:Envelope>";

		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
		    var soapaction = "http://ws.service.rabit.com/getSnapShotLabels";
		    xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
		    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		    xmlhttp.setRequestHeader("SOAPAction", soapaction);
		    xmlhttp.send(req);
		    return xmlhttp.responseXML;
        },
        GET_SAVED_SNAPSHOT:function(pname,bno,snaplbl){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getSavedSnapShot>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+pname+"</projectname>";
		            req += "<buildnumber>"+bno+"</buildnumber>";
		            req += "<snapshotlabel>"+snaplbl+"</snapshotlabel>";
		        req += "</web:getSavedSnapShot>";
		    req += "</soapenv:Body></soapenv:Envelope>";

		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
		    var soapaction = "http://ws.service.rabit.com/getSavedSnapShot";
		    xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
		    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		    xmlhttp.setRequestHeader("SOAPAction", soapaction);
		    xmlhttp.send(req);
		    return xmlhttp;
        },
        
        GET_SOURCECONTROL_REQUEST_SVN:function(srcUrl,srcUserName,srcPassword,fromRevisionNumber,toRevisionNumber,authorName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getSourceControlLog>";
		            req += "<url>"+srcUrl+"</url>";
		            req += "<name>"+srcUserName+"</name>";
		            req += "<password>"+srcPassword+"</password>";
		            req += "<startRevision>"+fromRevisionNumber+"</startRevision>";
		            req += "<endRevision>"+toRevisionNumber+"</endRevision>";
		            req += "<fdate></fdate>";
		            req += "<tdate></tdate>";
		            req += "<username>"+authorName+"</username>";
		            req += "<isUniqueFiles>false</isUniqueFiles>";
		        req += "</web:getSourceControlLog>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSourceControlLog");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_TICKETS_FROM_JIRA:function(project_key,tickets_str){

            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTicketsFromRM>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectkey>" + project_key+ "</projectkey>";
		            req += "<rmtype>Jira</rmtype>";
		            req += "<ticketkeys>"+tickets_str+"</ticketkeys>";
		        req += "</web:getTicketsFromRM>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTicketsFromRM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_PROJECTS_FROM_DT:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getProjectsFromDT>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		        req += "</web:getProjectsFromDT>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getProjectsFromDT");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ISSUES_FROM_DT:function(projectid){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getIssuesFromDT>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectid>"+projectid+"</projectid>";
		        req += "</web:getIssuesFromDT>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getIssuesFromDT");
            xmlhttp.send(req);
		    return xmlhttp;
        },

        GET_BUILD_NUMBEER:function(projectname){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getNextBuildNumber>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projectname+"</projectname>";
		        req += "</web:getNextBuildNumber>";
		    req += "</soapenv:Body></soapenv:Envelope>";

            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getNextBuildNumber");
            xmlhttp.send(req);
		    return xmlhttp.responseXML;
        },
        saveMailProperties:function(smtpname,port,isauth,uname,pwd, bccList, ccList, ssl, replyto,charset){
			var paramString = "<ws:saveMailProperties><orgname>"+sessionStorage.getItem("orgName")+"</orgname><mailserver>"+smtpname+"</mailserver><port>"+port+"</port><isauthentication>"+isauth+"</isauthentication><username>"+uname+"</username><password>"+pwd+"</password><bcclist>"+bccList+"</bcclist><cclist>"+ccList+"</cclist><isssl>"+ssl+"</isssl><replyto>"+replyto+"</replyto><charset>"+charset+"</charset></ws:saveMailProperties>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("saveMailProperties");
            xmlhttp.send(req);
		    return xmlhttp;
        },

        testMailServerConnection:function(smtpname,port,isauth,uname,pwd,tomail){
			var paramString = "<ws:testMailService><mailserver>"+smtpname+"</mailserver><port>"+port+"</port><isauthentication>"+isauth+"</isauthentication><username>"+uname+"</username><password>"+pwd+"</password><tomail>"+tomail+"</tomail></ws:testMailService>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("testMailService");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        getMailProperties:function(){
			var paramString = "<ws:getMailProperties><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getMailProperties>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getMailProperties");
            xmlhttp.send(req);
		    return xmlhttp.responseXML;
        },
        TEST_SERVER_CONNECTION:function(hostname,agentstring){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:testConnection>";
		            req += "<hostname>"+hostname+"</hostname>";
		            req += "<agents>"+agentstring+"</agents>";
		        req += "</web:testConnection>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/testConnection");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        REGISTER_ACCOUNT:function(accountNode){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:RegisterNewAccount>";
		            req += accountNode;
		        req += "</web:RegisterNewAccount>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/RegisterNewAccount");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_REGISTERED_ACCOUNTS:function(input){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:GetRegisteredAccounts>";
		            req += "<input>"+input+"</input>";
		        req += "</web:GetRegisteredAccounts>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/GetRegisteredAccounts");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        ACTIVATE_ACCOUNT:function(email,activation,ltype,ldays){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:activateRegisteredUser>";
		            req += "<usermailid>"+email+"</usermailid>";
		            req += "<activate>"+activation+"</activate>";
		            req += "<licensetype>"+ltype+"</licensetype>";
		            req += "<noofdays>"+ldays+"</noofdays>";
		        req += "</web:activateRegisteredUser>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/activateRegisteredUser");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        EXTEND_ACCOUNT:function(oName,email,ltype,ldays){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:extendLicense>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<email>"+email+"</email>";
		            req += "<licensetype>"+ltype+"</licensetype>";
		            req += "<noofdays>"+ldays+"</noofdays>";
		        req += "</web:extendLicense>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/extendLicense");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_INSTALLATION_TYPE:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getInstallationType>";
		        req += "</web:getInstallationType>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getInstallationType");
            xmlhttp.send(req);
		    return $(xmlhttp.responseXML).text();
        },
        GET_PROJECTS_ALM:function(oName,connType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getProjectsFromConnectors>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<connectortype>"+connType+"</connectortype>";
		        req += "</web:getProjectsFromConnectors>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getProjectsFromConnectors");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_REQUIRMENTS_ALM:function(oName,projectid,connType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getRequirementsByProject>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<projectid>"+projectid+"</projectid>";
		            req += "<connectortype>"+connType+"</connectortype>";
		        req += "</web:getRequirementsByProject>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getRequirementsByProject");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ISSUES_ALM:function(oName,projectid,connType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getIssuesByProject>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<projectkey>"+projectid+"</projectkey>";
		            req += "<connectortype>"+connType+"</connectortype>";
		        req += "</web:getIssuesByProject>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getIssuesByProject");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_PRIORITIES_ALM:function(oName,connType,projectid){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getPrioritiesFromALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<connectortype>"+connType+"</connectortype>";
					req += "<projectkey>"+projectid+"</projectkey>";
		        req += "</web:getPrioritiesFromALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getPrioritiesFromALM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ISSUTYPES_ALM:function(oName,projectid,connType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getWorkItemTypesFromALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<connectortype>"+connType+"</connectortype>";
		            req += "<projectkey>"+projectid+"</projectkey>";
		        req += "</web:getWorkItemTypesFromALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getWorkItemTypesFromALM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_STATUSES_ALM:function(oName, connType, projectid){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getStatusesFromALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<connectortype>"+connType+"</connectortype>";
					req += "<projectkey>"+projectid+"</projectkey>";
		        req += "</web:getStatusesFromALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getStatusesFromALM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        INSERT_TICKET_ALM:function(oName,connType,projectkey,issuetype,subject,description,status,priority,rabitProject,bldNo,pkgName,clsName,testName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:createTicketInConnector>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<connectortype>"+connType+"</connectortype>";
		            req += "<projectkey>"+projectkey+"</projectkey>";
		            req += "<issuetype>"+issuetype+"</issuetype>";
		            req += "<subject>"+subject+"</subject>";
		            req += "<description><![CDATA['"+description+"]]></description>";
		            req += "<status>"+status+"</status>";
		            req += "<priority>"+priority+"</priority>";

		            req += "<projectname>"+rabitProject+"</projectname>";
		            req += "<buildnumber>"+bldNo+"</buildnumber>";
		            req += "<package>"+pkgName+"</package>";
		            req += "<classname>"+clsName+"</classname>";
		            req += "<testname>"+testName+"</testname>";

		        req += "</web:createTicketInConnector>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/createTicketInConnector");
            xmlhttp.send(req);
		    return xmlhttp;
        },
		updateUserProfile:function(parmStr,orgExtn){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body><web:updateUserDetails><xmlnode>"+RABIT.UTILS.getSaltPWD(parmStr)+"</xmlnode><orgextn>"+orgExtn+"</orgextn></web:updateUserDetails></soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/updateUserDetails");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        UPDATE_MULTIPLE_NODES:function(xmlnode,orgname,filepath,eleattr,tagname){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:saveXMLNodes>";
		            req += "<xmlnode>"+xmlnode+"</xmlnode>";
		            req += "<orgname>"+orgname+"</orgname>";
		            req += "<filepath>"+filepath+"</filepath>";
		            req += "<eleattr>"+eleattr+"</eleattr>";
		            req += "<tagname>"+tagname+"</tagname>";
		        req += "</web:saveXMLNodes>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/saveXMLNodes");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        CREATE_PROJECT_ALM:function(oName,connType,pName,desc){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:createProjectsInALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<projectname>"+pName+"</projectname>";
		            req += "<description>"+desc+"</description>";
		            req += "<connectortype>"+connType+"</connectortype>";
		        req += "</web:createProjectsInALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/createProjectsInALM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        CREATE_USERS_ALM:function(oName,lastupdatedby,pName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:createUsersInALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<useremail>"+lastupdatedby+"</useremail>";
		            req += "<projectname>"+pName+"</projectname>";
		        req += "</web:createUsersInALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/createUsersInALM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ROLES_ALM:function(oName,connType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getRolesFromALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<connectortype>"+connType+"</connectortype>";
		        req += "</web:getRolesFromALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getRolesFromALM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ORG_USERS_PROJECT:function(oName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getOrgUsers>";
		            req += "<orgname>"+oName+"</orgname>";
		        req += "</web:getOrgUsers>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgUsers");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        SAVE_PLUGIN:function(oName,category,key,url,userName,password,apikey,version,desc,hostType,dtFlag,enableFlag){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:registerPlugins>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<id>"+category+"</id>";
		            req += "<key>"+key+"</key>";
		            req += "<url>"+url+"</url>";
		            req += "<username>"+userName+"</username>";
		            req += "<password>"+password+"</password>";
		            req += "<apikey>"+apikey+"</apikey>";
		            req += "<version>"+version+"</version>";
		            req += "<desc>"+desc+"</desc>";
		            req += "<hostmodel>"+hostType+"</hostmodel>";
		            req += "<isdt>"+dtFlag+"</isdt>";
		            req += "<isenable>"+enableFlag+"</isenable>";
		        req += "</web:registerPlugins>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerPlugins");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        SAVE_SALESFORCE_ORG:function(oName,uid,sfOrgName,sfOrgType,env,sfOrgURL,uName,password,sfToken){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:registerSFOrgs>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<uid>"+uid+"</uid>";
		            req += "<sforgname>"+sfOrgName+"</sforgname>";
		            req += "<sforgtype>"+sfOrgType+"</sforgtype>";
		            req += "<environment>"+env+"</environment>";
		            req += "<sforgurl>"+sfOrgURL+"</sforgurl>";
		            req += "<username>"+uName+"</username>";
		            req += "<password>"+password+"</password>";
		            req += "<stoken>"+sfToken+"</stoken>";
		        req += "</web:registerSFOrgs>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerSFOrgs");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        SAVE_SALESFORCE_ORG_OAUTH:function(oName,uid,sfOrgName,sfOrgType,env,sfOrgURL,code){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:registerSFOrgsWithOAuth>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<uid>"+uid+"</uid>";
		            req += "<sforgname>"+sfOrgName+"</sforgname>";
		            req += "<sforgtype>"+sfOrgType+"</sforgtype>";
		            req += "<environment>"+env+"</environment>";
		            req += "<sforgurl>"+sfOrgURL+"</sforgurl>";
		            req += "<code>"+code+"</code>";
		        req += "</web:registerSFOrgsWithOAuth>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerSFOrgsWithOAuth");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        REGISTER_ORG_USER:function(fName,lName,usrEmail,phoneNo,orgnName,jobTitle,country,state,timezone,zipCode,role,isNew,orgExtn){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:registerUser>";
		            req += "<firstname>"+fName+"</firstname>";
		            req += "<lastname>"+lName+"</lastname>";
		            req += "<email>"+RABIT.UTILS.getSaltPWD(usrEmail)+"</email>";
		            req += "<phone>"+RABIT.UTILS.getSaltPWD(phoneNo)+"</phone>";
		            req += "<organization>"+orgnName+"</organization>";
		            req += "<jobtitle>"+jobTitle+"</jobtitle>";
		            req += "<country>"+country+"</country>";
		            req += "<state>"+state+"</state>";
		            req += "<timezone>"+timezone+"</timezone>";
		            req += "<zipcode>"+zipCode+"</zipcode>";
		            req += "<role>"+role+"</role>";
		            req += "<isnew>"+isNew+"</isnew>";
		            req += "<orgextn>"+orgExtn+"</orgextn>";
		        req += "</web:registerUser>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerUser");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ORG_SANDBOXES:function(moduleName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getSFOrgs>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<module>"+moduleName+"</module>";
		            req += "<useremail>"+RABIT.UTILS.getSaltPWD(sessionStorage.getItem('userEmail'))+"</useremail>";
		        req += "</web:getSFOrgs>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSFOrgs");
            xmlhttp.send(req);
		    return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
        },
        SAVE_SERVER_DETAILS:function(id,orgnName,name,ip,os,username,password,agentsWithPorts,orgNames,remarks,isnew){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:registerAgents>";
		            req += "<uid>"+id+"</uid>";
		            req += "<orgname>"+orgnName+"</orgname>";
		            req += "<hostname>"+name+"</hostname>";
		            req += "<serverip>"+ip+"</serverip>";
		            req += "<os>"+os+"</os>";
		            req += "<username>"+username+"</username>";
		            req += "<password>"+password+"</password>";
		            req += "<agentstypewithports>"+agentsWithPorts+"</agentstypewithports>";
		            req += "<serverfororgs>"+orgNames+"</serverfororgs>";
		            req += "<comments>"+remarks+"</comments>";
		            req += "<isnew>"+isnew+"</isnew>";
		        req += "</web:registerAgents>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerAgents");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        getAgents:function(orgName){
            var paramString = "<ws:getAgents><orgname>"+orgName+"</orgname></ws:getAgents>";
			var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getAgents");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
        },
        GET_DEPLOYMENT_AGENTS:function(orgnName,agentModel){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getDeploymentAgents>";
		            req += "<orgname>"+orgnName+"</orgname>";
		            req += "<agentmodel>"+agentModel+"</agentmodel>";
		        req += "</web:getDeploymentAgents>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getDeploymentAgents");
            xmlhttp.send(req);
		    return xmlhttp.responseXML;
        },
        getPlugins:function(fromOrg){
			var paramString = "<ws:getPlugins><orgname>"+fromOrg+"</orgname></ws:getPlugins>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getPlugins");
            xmlhttp.send(req);
		    return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
        },
		getDashboardData:function(orgName, projectName, buildNumber){
			var paramString = "<ws:getDashboardData><orgname>"+sessionStorage.getItem("orgName")+"</orgname><projectname>"+sessionStorage.getItem('projectName')+"</projectname><buildnumber>"+sessionStorage.getItem("selectedbuild")+"</buildnumber></ws:getDashboardData>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getDashboardData");
            xmlhttp.send(req);
		    return xmlhttp.responseXML;
		},
		TEST_SC_CONNECTION:function(scmURL, userName, password, scmType,branchName){
		    var pwd = $.trim(password);
		    if (pwd == ""){
		        pwd = "default";
		    }
			var paramString = "<ws:validateSCMCredentials><orgname>"+sessionStorage.getItem("orgName")+"</orgname><scmurl>"+scmURL+"</scmurl><username>"+userName+"</username><password>"+RABIT.UTILS.getSaltPWD(pwd)+"</password><scmtype>"+scmType+"</scmtype><branchname>"+branchName+"</branchname></ws:validateSCMCredentials>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("validateSCMCredentials");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		getSCMRevisions:function(repoId, scmType, branchName){
			/*var paramString = "<ws:getSCMRevisions><orgname>"+sessionStorage.getItem("orgName")+"</orgname><repoid>"+repoId+"</repoid><scmtype>"+scmType+"</scmtype><branchname>"+branchName+"</branchname></ws:getSCMRevisions>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getSCMRevisions");
            xmlhttp.send(req);
		    return xmlhttp;*/
		    
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getSCMRevisions>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<repoid>"+repoId+"</repoid>";
            req += "<scmtype>"+scmType+"</scmtype>";
            req += "<branchname>"+branchName+"</branchname>";
            req += "</web:getSCMRevisions>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSCMRevisions");
	        xmlhttp.send(req);
		    return xmlhttp;
		    
		    
		},
		getRoles:function(){
			var paramString = "<ws:getRoles><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getRoles>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getRoles");
            xmlhttp.send(req);
		    return xmlhttp.responseXML;
		},
		getRoleActions:function(){
			var paramString = "<ws:getActions><orgname>"+sessionStorage.getItem("orgName")+"</orgname></ws:getActions>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getActions");
            xmlhttp.send(req);
		    return xmlhttp.responseXML;
		},
		
		CREATE_ROLE:function(roleName,roleDesc,actionStr,isNew){
			var paramString = "<ws:registerRole><orgname>"+sessionStorage.getItem("orgName")+"</orgname><rolename>"+roleName+"</rolename><description>"+roleDesc+"</description><actions>"+actionStr+"</actions><isnew>"+isNew+"</isnew></ws:registerRole>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("registerRole");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		DELETE_ROLE:function(oName,roleStr){
			var paramString = "<ws:deleteRoles><orgname>"+sessionStorage.getItem("orgName")+"</orgname><roleIds>"+roleStr+"</roleIds></ws:deleteRoles>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("deleteRoles");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		SAVE_PROJECT:function(userEmail,projectStr){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:saveProject>";
		            req += "<useremail>"+RABIT.UTILS.getSaltPWD(userEmail)+"</useremail>";
		            req += "<xmlnode>"+RABIT.UTILS.getSaltPWD(projectStr)+"</xmlnode>";
		        req += "</web:saveProject>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/saveProject");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		GET_EXTENSIONS:function(orgId){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getRegisteredExtensions>";
		            req += "<orgid>"+orgId+"</orgid>";
		        req += "</web:getRegisteredExtensions>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getRegisteredExtensions");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		SAVE_MAIL_EXTENSION:function(rootExtension,orgId,extn,desc){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:registerMailExtensions>";
		            req += "<rootextension>"+rootExtension+"</rootextension>";
		            req += "<orgid>"+orgId+"</orgid>";
		            req += "<extension>"+extn+"</extension>";
		            req += "<description>"+desc+"</description>";
		        req += "</web:registerMailExtensions>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerMailExtensions");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		DELETE_EXTENSION:function(orgId,extn){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:deleteRegisteredExtensions>";
		            req += "<orgid>"+orgId+"</orgid>";
		            req += "<extension>"+extn+"</extension>";
		        req += "</web:deleteRegisteredExtensions>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/deleteRegisteredExtensions");
            xmlhttp.send(req);
		    return xmlhttp;
		},
		registerEnterpriseUser: function(firstName, lastName, userEmail, password, phone){
			var req = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.service.rabit.com/"><soapenv:Header/><soapenv:Body><ws:registerEnterpriseUser><email>'+userEmail+'</email><firstname>'+firstName+'</firstname><lastname>'+lastName+'</lastname><password>'+password+'</password><phone>'+phone+'</phone></ws:registerEnterpriseUser></soapenv:Body></soapenv:Envelope>';
			var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerEnterpriseUser");
            xmlhttp.send(req);
		    return xmlhttp.responseXML;
		},
		GET_ORG_REPOSITORIES:function(){
		    var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getOrgRepositories>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "</web:getOrgRepositories>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgRepositories");
            xmlhttp.send(req);
            return xmlhttp;
        },
        FETCH_REPOSITORY_BRANCHES:function(repositoryId, scmUrl, userName, password){
			if(password != "") {
				password = RABIT.UTILS.getSaltPWD(password);
			}
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getRemoteBranches>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<repoid>"+repositoryId+"</repoid>";
					req += "<scmurl>"+scmUrl+"</scmurl>";
					req += "<username>"+userName+"</username>";
					req += "<password>"+password+"</password>";
                req += "</web:getRemoteBranches>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getRemoteBranches");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_METADATA_SANDBOX:function(sfOrgId){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getMetadataTypes>";
                    req += "<orgName>"+sessionStorage.getItem("orgName")+"</orgName>";
                    req += "<sforgid>"+sfOrgId+"</sforgid>";
                req += "</web:getMetadataTypes>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getMetadataTypes");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_METADATA_MEMBERS:function(sfOrgId,objectId){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getMetadataMembers>";
                    req += "<orgName>"+sessionStorage.getItem("orgName")+"</orgName>";
                    req += "<sforgid>"+sfOrgId+"</sforgid>";
                    req += "<type>"+objectId+"</type>";
                req += "</web:getMetadataMembers>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getMetadataMembers");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_METADATA_BLD_REPORT:function(projectName,buildNumber){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getMetadataHistroy>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<projectname>"+projectName+"</projectname>";
                    req += "<buildnumber>"+buildNumber+"</buildnumber>";
                req += "</web:getMetadataHistroy>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getMetadataHistroy");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_ORG_DIFFERENCES:function(projectName,buildNumber,sfSourceOrgId,sfDestOrgId,labelName,deploymentSource,deploymentType,userName,xmlNode,filterNode,skipPermissions){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getOrgDifference>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
			        req += "<projectname>"+projectName+"</projectname>";
			        req += "<buildnumber>"+buildNumber+"</buildnumber>";
			        req += "<sourceorgid>"+sfSourceOrgId+"</sourceorgid>";
			        req += "<destinationorgid>"+sfDestOrgId+"</destinationorgid>";
			        req += "<labelname>"+labelName+"</labelname>";
			        req += "<deploymentsource>"+deploymentSource+"</deploymentsource>";
			        req += "<deploymenttype>"+deploymentType+"</deploymenttype>";
			        req += "<username>"+userName+"</username>";
			        req += "<metadatanode>";
			        req += xmlNode;
			        req += "</metadatanode>";
			        req += filterNode;
			        req += "<skipnonexistpermisions>"+skipPermissions+"</skipnonexistpermisions>";
                req += "</web:getOrgDifference>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgDifference");
            xmlhttp.send(req);
            return xmlhttp;
        },
        DEPLOY_METADATA:function(projectName,buildNumber,sfSourceOrgId,sfDestOrgId,labelName,deploymentSource,deploymentType,userName,xmlNode,desc,agentid,orgCompare,srcUserName,skipWarnings,skipDestChanges,filterNode,scmNodeIs,skipPermissions,testdeployment,orgBackUp,runTestsIs,testList){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:deployMetadata>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
			        req += "<projectname>"+projectName+"</projectname>";
			        req += "<buildnumber>"+buildNumber+"</buildnumber>";
			        req += "<sourceorgid>"+sfSourceOrgId+"</sourceorgid>";
			        req += "<destinationorgid>"+sfDestOrgId+"</destinationorgid>";
			        req += "<labelname>"+labelName+"</labelname>";
			        req += "<deploymentsource>"+deploymentSource+"</deploymentsource>";
			        req += "<deploymenttype>"+deploymentType+"</deploymenttype>";
			        req += "<username>"+userName+"</username>";
			        req += "<description>"+desc+"</description>";
			        req += "<agentid>"+agentid+"</agentid>";
			        req += "<orgcompare>"+orgCompare+"</orgcompare>";
			        req += "<skipwarnings>"+skipWarnings+"</skipwarnings>";
			        req += "<skipdestructivechanges>"+skipDestChanges+"</skipdestructivechanges>";
			        req += "<metadatanode>";
			        req += "<srcusername>"+srcUserName+"</srcusername>";
			        req += xmlNode;
			        req += "</metadatanode>";
			        req += filterNode;
			        if (scmNodeIs != ""){
			       	 req += scmNodeIs;
			        }
			        req += "<skipnonexistpermisions>"+skipPermissions+"</skipnonexistpermisions>";
			        req += "<validatedeploy>"+testdeployment+"</validatedeploy>";
			        req += "<orgbackup>"+orgBackUp+"</orgbackup>";
			        req += "<testlevel>"+runTestsIs+"</testlevel>";
			        req += "<selectedtests>"+testList+"</selectedtests>";
                req += "</web:deployMetadata>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/deployMetadata");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_DEPLOYMENT_HISTORY:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getDeploymentSummary>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "</web:getDeploymentSummary>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getDeploymentSummary");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
        },
        GET_DEPLOYMENT_REPORT:function(labelName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getDeployedComponents>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<labelname>"+labelName+"</labelname>";
                req += "</web:getDeployedComponents>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getDeployedComponents");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_ORGS_METADATA:function(srcOrgId,destOrgId,labelName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getOrgsMetadataDiff>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<username>"+sessionStorage.getItem("userEmail")+"</username>";
                    req += "<labelname>"+labelName+"</labelname>";
                    req += "<sourceorgid>"+srcOrgId+"</sourceorgid>";
                    req += "<destorgid>"+destOrgId+"</destorgid>";
                req += "</web:getOrgsMetadataDiff>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgsMetadataDiff");
            xmlhttp.send(req);
            return xmlhttp;
        },
        SYNC_ORGS:function(srcOrgId,destOrgId,labelName,userName,agentID,xmlNode,testdeployment,runTestsIs,testList){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:destructAndDeploy>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<sourceorgid>"+srcOrgId+"</sourceorgid>";
                    req += "<destorgid>"+destOrgId+"</destorgid>";
                    req += "<labelname>"+labelName+"</labelname>";
                    req += "<username>"+userName+"</username>";
			        req += "<agentid>"+agentID+"</agentid>";
                    req += "<metadatanode>";
                        req += xmlNode;
                    req += "</metadatanode>";
                    req += "<validatedeploy>"+testdeployment+"</validatedeploy>";
                    req += "<testlevel>"+runTestsIs+"</testlevel>";
			        req += "<selectedtests>"+testList+"</selectedtests>";            
                req += "</web:destructAndDeploy>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/destructAndDeploy");
            xmlhttp.send(req);
            return xmlhttp;
        },
        SYNC_ORGS_SUMMARY:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getOrgsSyncsSummary>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "</web:getOrgsSyncsSummary>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgsSyncsSummary");
            xmlhttp.send(req);
            return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
        },
        GET_ORG_DEPLOYMENT_REPORT:function(labelName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getOrgSyncAddedComponents>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<labelname>"+labelName+"</labelname>";
                req += "</web:getOrgSyncAddedComponents>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgSyncAddedComponents");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_ORG_DESTRUCTIVE_REPORT:function(labelName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getOrgSyncDeletedComponents>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<labelname>"+labelName+"</labelname>";
                req += "</web:getOrgSyncDeletedComponents>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgSyncDeletedComponents");
            xmlhttp.send(req);
            return xmlhttp;
        },
        STATUS_SYNC_ORGS:function(labelName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getOrgsMetadataStatus>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<username>"+sessionStorage.getItem("userEmail")+"</username>";
                    req += "<labelname>"+labelName+"</labelname>";
                req += "</web:getOrgsMetadataStatus>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgsMetadataStatus");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_DEPLOYMENT_STATUS:function(labelName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getOrgsMetadataStatus>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<username>"+sessionStorage.getItem("userEmail")+"</username>";
                    req += "<labelname>"+labelName+"</labelname>";
                req += "</web:getOrgsMetadataStatus>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgsMetadataStatus");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_MEMBERS_FOR_METADATATYPES:function(project_Name,build_number,srcOrgId,labelName,depSource,xmlNode,filterNode){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getMembersForMetadataTypes>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<projectname>"+project_Name+"</projectname>";
                    req += "<buildnumber>"+build_number+"</buildnumber>";
                    req += "<sourceorgid>"+srcOrgId+"</sourceorgid>";
                    req += "<labelname>"+labelName+"</labelname>";
                    req += "<deploymentsource>"+depSource+"</deploymentsource>";
                    req += "<metadatatypenode>";
			        req += xmlNode;
			        req += "</metadatatypenode>";
			        req += filterNode;
			        req += "<username>"+sessionStorage.getItem('userEmail')+"</username>";
                req += "</web:getMembersForMetadataTypes>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getMembersForMetadataTypes");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_DEPLOYMENT_WARNINGS:function(labelName,bNumber,bType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getMetadataRetriveWarnings>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<labelname>"+labelName+"</labelname>";
                    req += "<buildnumber>"+bNumber+"</buildnumber>";
                    req += "<buildtype>"+bType+"</buildtype>";
                req += "</web:getMetadataRetriveWarnings>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getMetadataRetriveWarnings");
            xmlhttp.send(req);
            return xmlhttp;
        },
        SAVE_EXISTING_REPOSITORY_MAPPING:function(userEmail,repoName,scmURL,userName,password,branchList,userBranchList){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getExistingRepositorymapping>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<email>"+userEmail+"</email>";
                    req += "<reponame>"+repoName+"</reponame>";
                    req += "<scmurl>"+scmURL+"</scmurl>";
                    req += "<username>"+userName+"</username>";
                    req += "<password>"+password+"</password>";
                    req += "<branchlist>"+branchList+"</branchlist>";
                    req += "<userbranchlist>"+userBranchList+"</userbranchlist>";
                req += "</web:getExistingRepositorymapping>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getExistingRepositorymapping");
            xmlhttp.send(req);
            return xmlhttp;
        },
        SETUP_REPOSITORY:function(sandboxID,packageType,packageName,repoName,scmURL,userName,pword){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:setUpRepository>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
					req+="<email>"+sessionStorage.getItem("userEmail")+"</email>";
					req+="<sforgid>"+sandboxID+"</sforgid>";
					req+="<packagetype>"+packageType+"</packagetype>";
					req+="<packagename>"+packageName+"</packagename>";
					req+="<reponame>"+repoName+"</reponame>";
					req+="<scmurl>"+scmURL+"</scmurl>";
					req+="<username>"+userName+"</username>";
					req+="<password>"+pword+"</password>";
                req += "</web:setUpRepository>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/setUpRepository");
            xmlhttp.send(req);
            return xmlhttp;
        },
        CANCEL_DEPLOYMENT:function(labelName,iterationNo,agentName,agentPort){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:cancelSfDeploy>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
					req+="<labelname>"+labelName+"</labelname>";
					req+="<iteration>"+iterationNo+"</iteration>";
					req+="<agentname>"+agentName+"</agentname>";
					req+="<agentport>"+agentPort+"</agentport>";
                req += "</web:cancelSfDeploy>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/cancelSfDeploy");
            xmlhttp.send(req);
            return xmlhttp;
        },
        
        GET_METADATAMEMBER_DEPENDENCIES:function(sfOrgId,metadataType,metadataMember,resType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getMetaDataMemberDependencies>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
					req+="<sforgid>"+sfOrgId+"</sforgid>";
					req+="<metadatatype>"+metadataType+"</metadatatype>";
					req+="<membername>"+metadataMember+"</membername>";
					req+="<responsetype>"+resType+"</responsetype>";
                req += "</web:getMetaDataMemberDependencies>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getMetaDataMemberDependencies");
            xmlhttp.send(req);
            return xmlhttp;
        },
        SAVE_SANDBOX_OAUTH:function(uid,sfOrgName,sfOrgType,env,sfOrgURL,code){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:registerSFOrgWithOauth>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<uid>"+uid+"</uid>";
		            req += "<sforgname>"+sfOrgName+"</sforgname>";
		            req += "<sforgtype>"+sfOrgType+"</sforgtype>";
		            req += "<environment>"+env+"</environment>";
		            req += "<sforgurl>"+sfOrgURL+"</sforgurl>";
		            req += "<code>"+code+"</code>";
		        req += "</web:registerSFOrgWithOauth>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/registerSFOrgWithOauth");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_SALESFORCE_USERS:function(sfOrgId){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getSfUsers>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<orgid>"+sfOrgId+"</orgid>";
		        req += "</web:getSfUsers>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSfUsers");
            xmlhttp.send(req);
		    //return RABIT.UTILS.getActResponse(xmlhttp.responseXML);
		    return xmlhttp;
        },
        GET_SCM_USER_MAPPING:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getSalesForceUsersSCMMapping>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		        req += "</web:getSalesForceUsersSCMMapping>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSalesForceUsersSCMMapping");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        SAVE_SCM_USER_MAPPING:function(xmlDocument){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:saveSalesForceUsersToSCMUsersMapping>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<xmlobject>"+RABIT.UTILS.getSaltPWD(xmlDocument)+"</xmlobject>";
		        req += "</web:saveSalesForceUsersToSCMUsersMapping>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/saveSalesForceUsersToSCMUsersMapping");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        SCM_COMMIT_CHANGES:function(sforgId,userList,committedBy){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:commitChangesToSCM>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<sforgid>"+sforgId+"</sforgid>";
		            req += "<committedby>"+committedBy+"</committedby>";
		            req += userList;
		        req += "</web:commitChangesToSCM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/commitChangesToSCM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        isCommitInProgress:  function(sforgId) {
			var paramString = "<ws:isCommitInProgress><orgname>"+sessionStorage.getItem("orgName")+"</orgname><sforgid>"+sforgId+"</sforgid></ws:isCommitInProgress>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("isCommitInProgress");
            xmlhttp.send(req);
            return xmlhttp.responseText;
		},
        /*GET_USER_BASED_CHNAGES:function(sforgId,userList,filterNode){*/
        GET_USER_BASED_CHNAGES:function(sforgId,userList){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:fetchUserChangesFromSfOrg>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<sforgid>"+sforgId+"</sforgid>";
		            req += "<userslist>"+userList+"</userslist>";
		            /*if (filterNode != ""){
		                req += filterNode;
		            }*/
		        req += "</web:fetchUserChangesFromSfOrg>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/fetchUserChangesFromSfOrg");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_DATALOADER_PROCESSES:function(orgName){
        	if(orgName == undefined){
        		orgName = sessionStorage.getItem("orgName");
        	}
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getAllDataloaderProcesses>";
		            req += "<orgName>"+orgName+"</orgName>";
		        req += "</web:getAllDataloaderProcesses>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getAllDataloaderProcesses");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_PROJECT_TEST_LABELS:function(projectName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTestGenerationProjectData>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projectName+"</projectname>";
		        req += "</web:getTestGenerationProjectData>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getAllDataloaderProcesses");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        START_TEST_CYCLE:function(xmlNode){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:startTafTestCycle>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += xmlNode;
		        req += "</web:startTafTestCycle>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/startTafTestCycle");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_TAF_TESTPROCESSES:function(projectName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTafProcessNames>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projectName+"</projectname>";
		        req += "</web:getTafProcessNames>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTafProcessNames");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_TAF_PROCESS_DETAILS:function(projectName,processName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTafProcessNode>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projectName+"</projectname>";
		            req += "<processname>"+processName+"</processname>";
		        req += "</web:getTafProcessNode>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTafProcessNode");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_TAF_TEST_RESULTS:function(projectName,processName,buildNo){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTafTestResults>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projectName+"</projectname>";
		            req += "<processname>"+processName+"</processname>";
		            req += "<buildnum>"+buildNo+"</buildnum>";
		        req += "</web:getTafTestResults>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTafTestResults");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_PROJECT_TAF_TESTCACSES:function(projectName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getAllTafProjectTestCases>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projectName+"</projectname>";
		        req += "</web:getAllTafProjectTestCases>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getAllTafProjectTestCases");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_TAF_TREND:function(projectName,processName,moduleName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getTafTrendReport>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += "<projectname>"+projectName+"</projectname>";
		            req += "<processname>"+processName+"</processname>";
		            req += "<modulename>"+moduleName+"</modulename>";
		        req += "</web:getTafTrendReport>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTafTrendReport");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        getTestGenerationProjectData:function(projectName){
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
        		req += "<web:getTestGenerationProjectData>";
	            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
	            req += "<projectname>"+projectName+"</projectname>";
	            req += "</web:getTestGenerationProjectData>";
	            req += "</soapenv:Body></soapenv:Envelope>";
	        var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTestGenerationProjectData");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        getTafLabelCredentials:function(projectName,labelName,testType){
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getTafLabelCredentials>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<projectname>"+projectName+"</projectname>";
            req += "<labelname>"+labelName+"</labelname>";
            req += "<testtype>"+testType+"</testtype>";
            req += "</web:getTafLabelCredentials>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTafLabelCredentials");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        importTafLabels:function(srcProjName,destProjName,labelsXML){
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:importTafLabels>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<srcprojname>"+srcProjName+"</srcprojname>";
            req += "<destprojname>"+destProjName+"</destprojname>";
            req += "<labelsxml>"+RABIT.UTILS.getSaltPWD(labelsXML)+"</labelsxml>";
            req += "</web:importTafLabels>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/importTafLabels");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_COMMIT_HISTORY:function(){
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getSCMCommitHistory>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "</web:getSCMCommitHistory>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSCMCommitHistory");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_COMMIT_LABEL_HISTORY:function(labelName){
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getSCMCommittedFilesLabel>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<labelname>"+labelName+"</labelname>";
            req += "</web:getSCMCommittedFilesLabel>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSCMCommittedFilesLabel");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        getTestCaseRelatedLog:function(projectName,processName,buildNum,testCaseName,browser){
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getTestCaseRelatedLog>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<projectname>"+projectName+"</projectname>";
            req += "<processname>"+processName+"</processname>";
            req += "<buildnum>"+buildNum+"</buildnum>";
            req += "<testcasename>"+testCaseName+"</testcasename>";
            req += "<browser>"+browser+"</browser>";
            req += "</web:getTestCaseRelatedLog>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTestCaseRelatedLog");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        getLogFile:function(orgname,module,type,username,processname,date){
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getLogFile>";
            req += "<orgname>"+orgname+"</orgname>";
            req += "<module>"+module+"</module>";
            req += "<type>"+type+"</type>";
            req += "<username>"+username+"</username>";
            req += "<processname>"+processname+"</processname>";
            req += "<date>"+date+"</date>";
            req += "</web:getLogFile>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getLogFile");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        getAllAutorabitOrgs:function(){
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getAllAutorabitOrgs>";
            req += "</web:getAllAutorabitOrgs>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getAllAutorabitOrgs");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_WORKITEMS_BY_PROJECT:function(oName,projectid,allItemsFlag,modifiedDate,workItemId,connType,sprintId){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getWorkItemsByProject>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<projectkey>"+projectid+"</projectkey>";
		            
		            req += "<querystring>";
		                req += "<params all='"+allItemsFlag+"'>";
                            /*req += "<createdby>Sree</createdby";
                            req += "<createddate>2015-09-15</createddate>";
                            req += "<modifiedby>Sree</modifiedby>";*/
                            req += "<modifieddate></modifieddate>";
                            req += "<project>"+projectid+"</project>";
                            req += "<status></status>";
                            req += "<workitemtypeid></workitemtypeid>";
                            req += "<sprintname>"+workItemId+"</sprintname>";
                            req += "<sprintid>"+sprintId+"</sprintid>";
                        req += "</params>";
                    req += "</querystring>";
		            req += "<connectortype>"+connType+"</connectortype>";
		        req += "</web:getWorkItemsByProject>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    
	    
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getWorkItemsByProject");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_WORKITEM_QUERIES:function(oName,projectid,connType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getAllQueries>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<projectkey>"+projectid+"</projectkey>";
		            req += "<connectortype>"+connType+"</connectortype>";
		        req += "</web:getAllQueries>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getAllQueries");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ALM_PLANS_SPRINTS:function(oName,projectid,connType){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getPlannedForListFromALM>";
		            req += "<orgname>"+oName+"</orgname>";
		            req += "<connectortype>"+connType+"</connectortype>";
		            req += "<projectkey>"+projectid+"</projectkey>";
		            req += "<querystring>";
		                req += "<params >";
                         req += "</params>";
                    req += "</querystring>";
                    
		        req += "</web:getPlannedForListFromALM>";
		    req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getPlannedForListFromALM");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        VALIDATE_SFORG_USER_DETAILS:function(inputXML){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:validateSFOrgUserDetails>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		            req += inputXML;
		        req += "</web:validateSFOrgUserDetails>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    
		    alert(req);
		    return false;
		    
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/validateSFOrgUserDetails");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ORGSYNC_LABELS:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
		        req += "<web:getSynchOrgLabels>";
		            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
		        req += "</web:getSynchOrgLabels>";
		    req += "</soapenv:Body></soapenv:Envelope>";
		    var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getSynchOrgLabels");
            xmlhttp.send(req);
		    return xmlhttp;
        },
        
        deleteBranchType:function(strRemove){                                                                                                   
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:deleteBranchType>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<strRemove>"+strRemove+"</strRemove>";
            req += "</web:deleteBranchType>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/deleteBranchType");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        
        getBranchType:function(){                                                                                                   
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getBranchType>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "</web:getBranchType>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getBranchType");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        
        createBranchType:function(branchTypeName){                                                                                                   
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:createBranchType>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<branchtypename>"+branchTypeName+"</branchtypename>";
            req += "</web:createBranchType>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/createBranchType");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        
        validateCredentialsNew: function(scmurl,scmtype,username,password){
			var paramString = "<ws:validateCredentialsNew><orgname>"+sessionStorage.getItem("orgName")+"</orgname><scmurl>"+scmurl+"</scmurl><scmtype>"+scmtype+"</scmtype><username>"+username+"</username><password>"+password+"</password></ws:validateCredentialsNew>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("validateCredentialsNew");
            xmlhttp.send(req);
            return xmlhttp;
		},
       // (orgName,email,repoName,branchType,fromBranch,tobranch,scmtype)
        createBranch: function(email,repoName,branchType,fromBranch,tobranch,branchName,scmtype){
			var paramString = "<ws:createBranch><orgname>"+sessionStorage.getItem("orgName")+"</orgname><email>"+email+"</email><reponame>"+repoName+"</reponame><branchtype>"+branchType+"</branchtype><frombranch>"+fromBranch+"</frombranch><tobranch>"+tobranch+"</tobranch><branchname>"+branchName+"</branchname><scmtype>"+scmtype+"</scmtype></ws:createBranch>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("createBranch");
            xmlhttp.send(req);
            return xmlhttp;
		},
        deleteRepoBranch:function(disName,branchNames){
			var paramString = "<ws:deleteRepoBranch><orgname>"+sessionStorage.getItem("orgName")+"</orgname><disname>"+disName+"</disname><branchnames>"+branchNames+"</branchnames></ws:deleteRepoBranch>";
			var req = RABIT.SERVICES.getSoapRequest(paramString);
			var xmlhttp =RABIT.SERVICES.setSoapHeaders("deleteRepoBranch");
			xmlhttp.send(req);
			return xmlhttp;
        },
        
        registerSCMRepository: function(repositoryobj){
			var paramString = "<ws:registerSCMRepository><orgname>"+sessionStorage.getItem("orgName")+"</orgname><repositoryobj>"+repositoryobj+"</repositoryobj></ws:registerSCMRepository>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("registerSCMRepository");
            xmlhttp.send(req);
            return xmlhttp;
		},
        
		unRegisterSCMRepository: function(repoids){
			var paramString = "<ws:unRegisterSCMRepository><orgname>"+sessionStorage.getItem("orgName")+"</orgname><repoids>"+repoids+"</repoids></ws:unRegisterSCMRepository>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("unRegisterSCMRepository");
            xmlhttp.send(req);
            return xmlhttp;
		},
		
		getSCMLatestRevision: function(scmurl, username, password, branchname, scmtype){
			var paramString = "<ws:getSCMLatestRevision><orgname>"+sessionStorage.getItem("orgName")+"</orgname><scmurl>"+scmurl+"</scmurl><username>"+username+"</username><password>"+RABIT.UTILS.getSaltPWD(password)+"</password><branchname>"+branchname+"</branchname><scmtype>"+scmtype+"</scmtype></ws:getSCMLatestRevision>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getSCMLatestRevision");
            xmlhttp.send(req);
            return xmlhttp;
		},
		
		getSCMLatestRevisionNew: function(reponame,branchname){
			var paramString = "<ws:getSCMLatestRevisionNew><orgname>"+sessionStorage.getItem("orgName")+"</orgname><reponame>"+reponame+"</reponame><branchname>"+branchname+"</branchname></ws:getSCMLatestRevisionNew>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getSCMLatestRevisionNew");
            xmlhttp.send(req);
            return xmlhttp;
		},
		
		featchBranchHistory:function(historyFromDate,historyToDate,historyAuthor,fromRevision,toRevision){                                                                                                   
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:featchBranchHistory>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<historyFromDate>"+historyFromDate+"</historyFromDate>";
            req += "<historyToDate>"+historyToDate+"</historyToDate>";
            req += "<historyAuthor>"+historyAuthor+"</historyAuthor>";
            req += "<fromRevision>"+fromRevision+"</fromRevision>";
            req += "<toRevision>"+toRevision+"</toRevision>";
            req += "</web:featchBranchHistory>";
            req += "</soapenv:Body></soapenv:Envelope>";
            alert(req);
            /*var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/featchBranchHistory");
	        xmlhttp.send(req);
		    return xmlhttp;*/
        },
  
        getRemoteBranchesNew: function(reponame){                                                                                               
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getRemoteBranchesNew>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<reponame>"+reponame+"</reponame>";
            req += "</web:getRemoteBranchesNew>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getRemoteBranchesNew");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
       
        createBranchNew: function(reponame,branchname,scmtype,frombranch,scmurl ,branchtype,email){
        	var paramString = "<ws:createBranchNew><orgname>"+sessionStorage.getItem("orgName")+"</orgname><reponame>"+reponame+"</reponame><branchname>"+branchname+"</branchname><scmtype>"+scmtype+"</scmtype><frombranch>"+frombranch+"</frombranch><scmurl>"+scmurl+"</scmurl><branchtype>"+branchtype+"</branchtype><email>"+email+"</email></ws:createBranchNew>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("createBranchNew");
            xmlhttp.send(req);
            return xmlhttp;
		},
		
		getExistingRepositorymappingNew: function(reponame,branchlist,email){
        	var paramString = "<ws:getExistingRepositorymappingNew><orgname>"+sessionStorage.getItem("orgName")+"</orgname><reponame>"+reponame+"</reponame><branchlist>"+branchlist+"</branchlist><email>"+email+"</email></ws:getExistingRepositorymappingNew>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getExistingRepositorymappingNew");
            xmlhttp.send(req);
            return xmlhttp;
		},
			
		saveModifyBranchXml: function(reponame,node){
        	var paramString = "<ws:saveModifyBranchXml><orgname>"+sessionStorage.getItem("orgName")+"</orgname><reponame>"+reponame+"</reponame><node>"+node+"</node></ws:saveModifyBranchXml>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("saveModifyBranchXml");
            xmlhttp.send(req);
            return xmlhttp;
		},

		getGitCommitRetriveLog: function(sforgName,repoid){
        	var paramString = "<ws:getGitCommitRetriveLog><orgname>"+sessionStorage.getItem("orgName")+"</orgname><sforgname>"+sforgName+"</sforgname><repoid>"+repoid+"</repoid></ws:getGitCommitRetriveLog>";

            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("getGitCommitRetriveLog");
            xmlhttp.send(req);
            return xmlhttp;
		},
		
		branchValidation: function(id,url,branchname,email){
        	var paramString = "<ws:branchValidation><orgname>"+sessionStorage.getItem("orgName")+"</orgname><id>"+id+"</id><url>"+url+"</url><branchname>"+branchname+"</branchname><email>"+email+"</email></ws:branchValidation>";
            var req = RABIT.SERVICES.getSoapRequest(paramString);
            var xmlhttp = RABIT.SERVICES.setSoapHeaders("branchValidation");
            xmlhttp.send(req);
            return xmlhttp;
		},
		
		retrieveAndCommit: function(repoid,sforgid,branchName){                                                                                               
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:retrieveAndCommit>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<repoid>"+repoid+"</repoid>";
            req += "<sforgid>"+sforgid+"</sforgid>";
            req += "<branchname>"+branchName+"</branchname>";
            req += "<committedby>"+sessionStorage.getItem("userEmail")+"</committedby>";
            req += "</web:retrieveAndCommit>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/retrieveAndCommit");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        killDataloaderProcess: function(processId,dataloaderType){                                                                                               
        	var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:killDataloaderProcess>";
            req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
            req += "<processid>"+processId+"</processid>";
            req += "<dataloadertype>"+dataloaderType+"</dataloadertype>";
            req += "</web:killDataloaderProcess>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/killDataloaderProcess");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ORGSYNCH_METADATATYPES:function(labelName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getOrgSyncMetadataTypes>";
                req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "<labelname>"+labelName+"</labelname>";
            req += "</web:getOrgSyncMetadataTypes>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgSyncMetadataTypes");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_ORGSYNCH_METADATAMEMBERS:function(labelName,selectedTypes){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:getOrgSyncMetadataMembers>";
                req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "<labelname>"+labelName+"</labelname>";
                req += "<types>"+selectedTypes+"</types>";
            req += "</web:getOrgSyncMetadataMembers>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getOrgSyncMetadataMembers");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        REVERT_DEPLOYMENT:function(labelName,iterationNo){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
    		req += "<web:revertDeployment>";
                req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "<labelname>"+labelName+"</labelname>";
                req += "<iteration>"+iterationNo+"</iteration>";
            req += "</web:revertDeployment>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
	        xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);
	        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	        xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/revertDeployment");
	        xmlhttp.send(req);
		    return xmlhttp;
        },
        GET_REVERT_LOG:function(project_Name,build_number){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ws=\"http://ws.service.rabit.com/\"><soapenv:Header/><soapenv:Body>";
            req += "<ws:getDeploymentRevertLog>";
                req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "<projectname>"+project_Name+"</projectname>";
                req += "<buildnumber>"+build_number+"</buildnumber>";
            req += "</ws:getDeploymentRevertLog>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getDeploymentRevertLog");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_REVERT_DEPLOYMENT_REPORT:function(labelName,iterationNumber,depDate){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getRevertDeploymentComponents>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<labelname>"+labelName+"</labelname>";
                    req += "<iteration>"+iterationNumber+"</iteration>";
                    req += "<promotiondate>"+depDate+"</promotiondate>";
                req += "</web:getRevertDeploymentComponents>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);	
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getRevertDeploymentComponents");
            xmlhttp.send(req);
            return xmlhttp;
        },
		SAVE_USER_PROFILE:function(userNode){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:saveUserProfileMappings>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<usernode>"+userNode+"</usernode>";
                req += "</web:saveUserProfileMappings>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);    
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/saveUserProfileMappings");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_SCM_USERS:function(url){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getUserNamesFromBranchurl>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<branchurl>"+url+"</branchurl>";
                req += "</web:getUserNamesFromBranchurl>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);    
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getUserNamesFromBranchurl");
            xmlhttp.send(req);
            return xmlhttp;
        },
        TEST_SCM_CONNECTION:function(url){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:testSCMConnection>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<scmurl>"+url+"</scmurl>";
                    req += "<username>"+url+"</username>";
                req += "</web:testSCMConnection>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);    
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/testSCMConnection");
            xmlhttp.send(req);
            return xmlhttp;
        },
        GET_TAF_TRANSFORMATION_LOG:function(projectName,labelName,testType,browserIs,testCaseName){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:getTransformationLog>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                    req += "<projectname>"+projectName+"</projectname>";
                    req += "<labelname>"+labelName+"</labelname>";
                    req += "<testtype>"+testType+"</testtype>";
                    req += "<browser>"+browserIs+"</browser>";
                    req += "<testcasename>"+testCaseName+"</testcasename>";
                req += "</web:getTransformationLog>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",false);    
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/getTransformationLog");
            xmlhttp.send(req);
            return xmlhttp;
        },
        generateJSONForVersionControl:function(){
            var req = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://ws.service.rabit.com/\"><soapenv:Body>";
                req += "<web:generateJSONForVersionControl>";
                    req += "<orgname>"+sessionStorage.getItem("orgName")+"</orgname>";
                req += "</web:generateJSONForVersionControl>";
            req += "</soapenv:Body></soapenv:Envelope>";
            var xmlhttp = RABIT.UTILS.getXmlhttpObject();
            xmlhttp.open("POST",RABIT.COMMONFUNCTIONS.getBrowserURL()+"/rabitservices?wsdl",true);    
            xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader("SOAPAction", "http://ws.service.rabit.com/generateJSONForVersionControl");
            xmlhttp.send(req);
            return xmlhttp;
        }
	};
})(jQuery);