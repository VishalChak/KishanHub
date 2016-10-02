;(function($) {
	
	LIBRARY = {};
	LIBRARY.PAGINATION = {
	    dataXML:"PAGINATION",
	    fromRecord:"PAGINATION",
	    toRecord:"PAGINATION",
	    pageNumber:"PAGINATION",
	    totalPages:"PAGINATION",
	    pageSize:"PAGINATION",
	    totalCount:"PAGINATION",
	    
	    INIT:function(filepath,xpath,xmlorder,pagesize,firstbuttonid,previousbuttonid,nextbuttonid,lastbuttonid){
            dataXML = RABIT.UTILS.getXMLObj(filepath);
            
            pageSize = pagesize;
            
            totalPages = Math.ceil($(dataXML).find(xpath).length / pagesize);
            
            totalCount = $(dataXML).find(xpath).length;
            
            if (totalCount != 0){
                pageNumber = 1;
            } else {
                pageNumber = 0;
            }
            $(firstbuttonid).die("click").live('click',function(){
                LIBRARY.PAGINATION.GETFIRSTPAGE(xpath,xmlorder);    
            });
            $(previousbuttonid).die("click").live('click',function(){
                LIBRARY.PAGINATION.GETPREVIOUSPAGE(xpath,xmlorder);    
            });
            $(nextbuttonid).die("click").live('click',function(){
                LIBRARY.PAGINATION.GETNEXTPAGE(xpath,xmlorder);    
            });
            $(lastbuttonid).die("click").live('click',function(){
                LIBRARY.PAGINATION.GETLASTPAGE(xpath,xmlorder);    
            });
            
            LIBRARY.PAGINATION.GETFIRSTPAGE(xpath,xmlorder);
	    },
	    
	    GETFIRSTPAGE:function(xpath,xmlorder){
	        fromRecord = 0;
	        toRecord = pageSize;
	        pageNumber = 1;
	        LIBRARY.PAGINATION.XMLCALL(xpath,fromRecord,toRecord,xmlorder);
	    },
	    GETLASTPAGE:function(xpath,xmlorder){
	        fromRecord = parseInt(totalCount / pageSize) * pageSize;
	        if (fromRecord == totalCount){
	            fromRecord = (parseInt(totalCount / pageSize) - 1) * pageSize;
	        }
	        toRecord = totalCount;
	        pageNumber = totalPages;
	        LIBRARY.PAGINATION.XMLCALL(xpath,fromRecord,toRecord,xmlorder);
	    },
	    GETPREVIOUSPAGE:function(xpath,xmlorder){
	        if (pageNumber > 0){
	            pageNumber--;
	        }
	        fromRecord = ((pageNumber - 1) * pageSize);
	        toRecord = (pageNumber * pageSize);
	        
	        if (toRecord > totalCount){
	            toRecord = totalCount;
	        }
	        LIBRARY.PAGINATION.XMLCALL(xpath,fromRecord,toRecord,xmlorder);
	    },
	    GETNEXTPAGE:function(xpath,xmlorder){
	        fromRecord = (pageNumber * pageSize);
	        if (pageNumber < totalPages){
	            pageNumber++;
	        }
	        toRecord = (pageNumber * pageSize);
	        if (toRecord > totalCount){
	            toRecord = totalCount;
	        }
	        LIBRARY.PAGINATION.XMLCALL(xpath,fromRecord,toRecord,xmlorder);
	    },
	    XMLCALL:function(xpath,fromRecord,toRecord,xmlorder){
	        if (xmlorder == "reverse"){
	            LIBRARY.PAGINATION.REVERSEXML(xpath,fromRecord,toRecord);
	        } else {
	            LIBRARY.PAGINATION.ACTUALXML(xpath,fromRecord,toRecord);    
	        }    
	    },
	    REVERSEXML:function(xpath,fromIndex,toIndex){
	        var responseXML = RABIT.UTILS.createXMLNode("response","","","","");
	        var returnXML = $(dataXML);
	        $($(returnXML).find(xpath).get().reverse()).each(function(indx){
	            if (fromIndex <= indx && toIndex > indx){
                } else {
                    $(this).remove();
                }
            });
            alert($(returnXML)[0].xml);
	    },
	    ACTUALXML:function(xpath,fromIndex,toIndex){
	        $(dataXML).find(xpath).each(function(){
            });
	    }
	};
	
})(jQuery);