;(function($) {
    NEWVC = {};
    NEWVC.HOME = {
    	INIT:function(){
    		$(document).off("click", "#clickMe").on("click", "#clickMe",function(){
//				NEWVC.HOME.readTextFile("EnglandRainfall.csv");
				
    			NEWVC.HOME.readTextFile("file:///D:/WorkSpace/hub/EnglandRainfall.csv");
    			
			});
    		
    	    
    	},
    	readTextFile:function(file){
    		
    		var rawFile = new XMLHttpRequest();
    	    rawFile.open("GET", file, true);
    	    rawFile.onreadystatechange = function () {
    	        if(rawFile.readyState === 4) {
    	            if(rawFile.status === 200 || rawFile.status == 0) {
    	                var allText = rawFile.responseText;
    	                alert(allText);
    	            }
    	        }
    	    }
    	    rawFile.send(null);
    	},
    }
    
})(jQuery);
