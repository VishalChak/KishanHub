
class Node{
	private String region_code,weather_param,year, key, value;
	
	Node(String region_code,String weather_param,String year, String key,String value){
		this.region_code= region_code;
		this.weather_param = weather_param;
		this.year = year;
		this.key =key;
		this.value = value;
	}
	
	public void setRegion_code(String region_code){
		this.region_code = region_code;
	}
	
	public String getRegion_code(){
		return this.region_code;
	}
	
	public void setWeather_param(String weather_param){
		this.weather_param = weather_param;
	}
	
	public String getWeather_param(){
		return this.weather_param;
	}
	
	public void setYear(String year){
		this.year = year;
	}
	
	public String getYear(){
		return this.year;
	}
	public void setKey(String key){
		this.key = key;
	}
	
	public String getKey(){
		return this.key;
	}
	public void setValue(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
	
	@Override
	public String toString(){
		return "Node[region_code = "+region_code+",weather_param = "+weather_param+",year = "+year+", key = "+key+",value = "+value+" ]";
	}
	}