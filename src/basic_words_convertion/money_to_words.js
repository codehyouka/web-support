(function(){
function main_utility(dom){
	this.variable=dom;
	
	this.separate_decimal=function(){
		var dec_m={
			"number":0,
			"decimal":0,				
			}
		 var split_s=this.variable.toString().split(".");
		
			if(_pf.count(split_s)===1){
				dec_m['number']=parseInt(split_s[0]);
				
			}
			if(_pf.count(split_s)===2){
			       dec_m['number']=parseInt(split_s[0]);
			       dec_m['decimal']=parseInt(split_s[1]);		
			}
		   return dec_m;	
		}
	}	


var pf_ini={
	round_by_thousands:function(nbm,lmt,dcml){
		var nmbr=nbm.toString();
		var nmbr_len=nmbr.split("").length;
		
		
		return parseInt(1+_pf.repeat(dcml,(Math.ceil(nmbr_len/lmt)-1)));
	},
	tenth_by:function(nbm,bool){
		var bools=_pf.has(bool)?bool:true;
		var var_jsn={
		//    0:'zero'     ,
           	    1:'one'      ,
		    2:'two'      ,
		    3:'three'    ,
		    4:'four'     ,
		    5:'five'     ,
		    6:'six'      ,
		    7:'seven'    ,
		    8:'eight'    ,
		    9:'nine'     ,
		    10:'ten'     ,
		    11:'eleven'  ,
		    12:'twelve'   ,
		    13:'thirteen'  ,
		    14:'fourteen'  ,
		    15:'fifteen'   ,
		    16:'sixteen'   ,
		    17:'seventeen' ,
		    18:'eighteen'  ,
		    19:'nineteen'  ,
		    20:'twenty'   ,
		    30:'thirty'   ,
		    40:'forty'    ,
		    50:'fifty'    ,
		    60:'sixty'    ,
		    70:'seventy'  ,
		    80:'eighty'   ,
		    90:'ninety'   ,
		    100:'hundred' ,
		    1000:'thousand',
		    1000000:'million',
		    1000000000:'billion' 										
			};
		if(_pf.has(var_jsn,nbm) & bools===true){
		return 	var_jsn[nbm];
		}else{
		return "";	
		}
	},
	in_number_hunders_specify:function(nmb){
		
		var nmb_str="";
		var hndr_flr=Math.floor(nmb/100);	
		var tnth_flr=nmb-(hndr_flr*100);
		if(hndr_flr>0){
		nmb_str+=pf_ini.tenth_by(hndr_flr)+" "+pf_ini.tenth_by(100);
		nmb_str+=" "+pf_ini.in_number_specify(tnth_flr)
		}else{
			if(tnth_flr>0){
				if(tnth_flr>10 && tnth_flr<20){
			
				nmb_str+=pf_ini.tenth_by(tnth_flr);
			}else{
				
				var tnth_v=pf_ini.tenth_by(Math.floor(tnth_flr/10)*10);
				var ones_v=pf_ini.tenth_by(tnth_flr-(Math.floor(tnth_flr/10)*10));
			
				
			nmb_str+=(tnth_v+" "+ones_v);
				
				
			}
				
			}
		}	
		



		return nmb_str;
	},
	in_number_specify:function(nmb){
		var nmbr_str="";
		var whl_nmbr=Math.floor(nmb/pf_ini.round_by_thousands(nmb,3,"000"));
		var rmdr_nmbr=Math.floor(nmb%pf_ini.round_by_thousands(nmb,3,"000"));
		var thnd_str=pf_ini.tenth_by(pf_ini.round_by_thousands(nmb,3,"000"),pf_ini.round_by_thousands(nmb,3,"000")!=1);
	
		nmbr_str+=pf_ini.in_number_hunders_specify(whl_nmbr)+" "+thnd_str;


		if(rmdr_nmbr>0){
			
			 nmbr_str+=" "+pf_ini.in_number_specify(rmdr_nmbr);
		}
		
		

	return nmbr_str;
	},
	in_decimal_specify:function(nmb,cnt){
		var nmbr_str="";
		var nbm_len=(parseInt(nmb.toString().split("").length));
		var hunrth_cnt=parseInt(1+_pf.repeat("0",(nbm_len==1?1:0)));
			nmbr_str+=pf_ini.in_number_hunders_specify(nmb*hunrth_cnt);
		
	return nmbr_str;
	}
};
var pf_extra={}
	pf_extra.money_in_words=function(nmb){
		if(!_pf.has(nmb) && _pf.getJSONtypeof(nmb)!=="number")
		  return "zero";
					
		var main =new main_utility(nmb);		
		var number_assign=main.separate_decimal()
		var number_s=number_assign.number;	
		var decimal_s=number_assign.decimal;	
	
		if (nmb===0)
		return "zero";

		if(decimal_s>0){
		return pf_ini.in_number_specify(number_s)+" and "+pf_ini.in_decimal_specify(decimal_s,0);
		}
		else{
		return pf_ini.in_number_specify(number_s);
		}
	
	}

window.__wbspprt=pf_extra;
})();
