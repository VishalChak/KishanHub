;(function($) {
	$.ajax({
		type: "GET",
		url: "scripts/rabitutils.js",
		dataType: "script",
		async: false
	});
	RABIT.UTILS.openFile("scripts/index.js");
	RABIT.UTILS.openFile("homepage/js/homepage.js");
	RABIT.UTILS.openFile("scripts/jquery.crypt.js");
	RABIT.UTILS.openFile("accountmanagement/js/accounts.js");
	RABIT.UTILS.openFile("registrations/js/registrations.js");
	RABIT.UTILS.openFile("projectdashboard/js/projectdashboard.js");
	RABIT.UTILS.openFile("reports/js/dashboardmappings.js");
	RABIT.UTILS.openFile("reports/js/testreport.js");
	RABIT.UTILS.openFile("scripts/FusionCharts/FusionCharts.js");
	RABIT.UTILS.openFile("scripts/FusionCharts/FusionCharts.jqueryplugin.js");
	RABIT.UTILS.openFile("scripts/rabitservices.js");
	RABIT.UTILS.openFile("scripts/library.js");
	/*arMessages = RABIT.UTILS.openFile("templates/messages.xml");*/
})(jQuery);