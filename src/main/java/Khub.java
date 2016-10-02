import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

public class Khub {
	String region [];
	String program [];
    public static void main(String[] args) throws Exception {
        Khub hub = new Khub();
        String url= "http://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/";
        hub.region=  new String[] {"UK","England", "Wales","Scotland"};
        hub.program= new String[]{"Tmax","Tmin","Tmean","Sunshine","Rainfall"};
        for(String reg : hub.region){
			for(String prm: hub.program){
				hub.URLConnectionReader(url+prm+"/date/"+reg+".txt", reg+prm+".txt");
			}
		}
        hub.csvWriter();
        hub.csvForAll();
    }
    
    
    public void csvWriter() throws Exception{
    	BufferedReader br=null;
    	String str = null;
    	String arr[]=null;
    	int count =0,length=0;
    	FileWriter wr = new FileWriter("weather.csv");
    	wr.append("region_code");
    	wr.append(',');
    	wr.append("weather_param");
    	wr.append(',');
    	wr.append("year");
    	wr.append(',');
    	wr.append("key");
    	wr.append(',');
    	wr.append("value");
    	wr.append('\n');
    	for(String reg : region){
			for(String prm: program){
				br= new BufferedReader(new FileReader(new File (reg+prm+".txt")));
				count=0;
				while((str= br.readLine())!=null){
					count++;
					if(count>8){
						arr= str.split("\\s+");
						length =13;
						if(arr.length<13)
						 length = arr.length;
						for(int i=1;i<length;i++){
							wr.append(reg);
					    	wr.append(',');
					    	wr.append(prm);
					    	wr.append(',');
					    	wr.append(arr[0]);
					    	wr.append(',');
					    	wr.append(getKey(i));
					    	wr.append(',');
					    	wr.append(arr[i]);
					    	wr.append('\n');
						}
					}
				}
				br.close();
			}
		}
    	wr.flush();
    	wr.close();
    }
    
    public String getKey(int i){
    	switch (i) {
		case 1:
			return "JAN";
		case 2:
			return "FEB";
		case 3:
			return "MAR";
		case 4:
			return "APR";
		case 5:
			return "MAY";
		case 6:
			return "JUN";
		case 7:
			return "JUL";
		case 8:
			return "AUG";
		case 9:
			return "SEP";
		case 10:
			return "OCT";
		case 11:
			return "NOV";
		case 12:
			return "DEC";
		default:
			return "N/A";
		}
    }
   public void csvForAll()throws Exception{
	   BufferedReader br=null;
   	String str = null;
   	String arr[]=null;
   	int count =0,length=0;
   	FileWriter wr = null;
   	for(String reg : region){
			for(String prm: program){
				br= new BufferedReader(new FileReader(new File (reg+prm+".txt")));
				count=0;
				wr = new FileWriter(reg+prm+".csv");
			   	wr.append("Year");
			   	wr.append(',');
			   	wr.append("JAN");
			   	wr.append(',');
			   	wr.append("FEB");
			   	wr.append(',');
			   	wr.append("MAR");
			   	wr.append(',');
			   	wr.append("APR");
			   	wr.append(',');
			   	wr.append("MAY");
			   	wr.append(',');
			   	wr.append("JUN");
			   	wr.append(',');
			   	wr.append("JUL");
			   	wr.append(',');
			   	wr.append("AUG");
			   	wr.append(',');
			   	wr.append("SEP");
			   	wr.append(',');
			   	wr.append("OCT");
			   	wr.append(',');
			   	wr.append("NOV");
			   	wr.append(',');
			   	wr.append("DEC");
			   	wr.append(',');
			   	wr.append("WIN");
			   	wr.append(',');
			   	wr.append("SPR");
			   	wr.append(',');
			   	wr.append("SUM");
			   	wr.append(',');
			   	wr.append("AUT");
			   	wr.append(',');
			   	wr.append("ANN");
			   	wr.append('\n');
				while((str= br.readLine())!=null){
					count++;
					if(count>8){
						arr= str.split("\\s+");
						length =13;
						if(arr.length<13)
						 length = arr.length;
						for(int i=0;i<length;i++){
						   	wr.append(arr[i]);
						   	if(i!=length-1)
						   		wr.append(',');
						}
						wr.append('\n');
					}
				}
			   	wr.flush();
			   	wr.close();
				br.close();
			}
		}
   }
    public void URLConnectionReader(String url, String fName)  throws Exception{
    	URL metUrl = new URL(url);
        URLConnection yc = metUrl.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
        BufferedWriter wr = new BufferedWriter(new FileWriter(new File(fName)));
        int ch;
        while ((ch=in.read()) >-1){
        	wr.write(ch);
        } 
        in.close();
        wr.close();
    }
}