/*
	SCRIPT to filter string barcode

	- if key_filter = "" -> output = barcode reader
	- if key_filter = "abc" -> output = barcode_reader contain "*abc*"

	- output format = bacode1<\r><\n>barcode2
*/
var key_filter = "";

function onResult (decodeResults, readerProperties, output)
{
	test_string_filter(decodeResults, output);
        
}

function test_string_filter(decodeResults, output)
{
	var str_decode_result = "";
	var lenght_decode_result = decodeResults.length; 
	for(var index = 0; index < lenght_decode_result; index++)
	{
		var result_decode = decodeResults[index].decoded;
		if(result_decode)
		{
			var content_decodeing = decodeResults[index].content;
			var pos = 0;
			if(key_filter != "")
			{
				pos = decodeResults[index].content.indexOf(key_filter, 0);
			}
			
			if(pos != -1)
			{
				if(index != lenght_decode_result - 1)
					str_decode_result += content_decodeing + "\r\n";
				else
					str_decode_result += content_decodeing;
			}
		}
	}    
	output.content = str_decode_result;
}

function show_decode_result(decodeResults)
{
	var decode_infor;
	var lenght_decode_result = decodeResults.length;
	
	decode_infor =
		"-length = " + lenght_decode_result;
	
	for(var index = 0; index < lenght_decode_result; index++)
	{
		var result_decode = decodeResults[index].decoded;
		var timeprocess_decoding = decodeResults[index].decodeTime;
		var content_decodeing = decodeResults[index].content;
		var label_decodeing = decodeResults[index].label;
		
		decode_infor +=
			"-result = " + result_decode +
			"-time(ms) = " + timeprocess_decoding +
			"-result = " + content_decodeing +
			"-label = " + label_decodeing + "***";
	}
        
	return decode_infor;
}
function show_output_infor(output)
{
	//output properties
	var output_infor;
	var        out_content = output.content;
	var out_serial = output.Serial;
	var out_telnet = output.Telnet;
	var out_network = output.NetworkClient;
        
	output_infor = 
		"-content = " + out_content +
		"- serial = " + out_serial +
		"- telnet = " + out_telnet +
		"- network = " + out_network;
        
	return output_infor;
}
function show_reader_infor(readerProperties)
{
	//reader properties
	var reader_infor;
	var        device_name = readerProperties.name;
	var type_of_trigger = readerProperties.trigger.type;
	var input_string = readerProperties.inputstr;
	var pass_validate = readerProperties.stats.passedValidations;        
	var fail_validate = readerProperties.stats.failedValidations;
        
	reader_infor = 
		"-devices_name = " + device_name +
		"- type_trigger = " + type_of_trigger +
		"- input_string = " + input_string +
		"- pass_validate = " + pass_validate +
		"- fail_validate = " + fail_validate;
        
	return reader_infor;
}

