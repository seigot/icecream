function drawBarChart(labels, data, data2) {
    // 4)chart.jsで描画
    var ctx = document.getElementById("keisuke").getContext("2d");
    var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
		labels: labels,
		datasets: [ {
			label: "朝の体重(kg)", 
			data: data, 
			backgroundColor: 'rgba(0, 0, 0, 0)',
			borderColor: 'rgba(255, 0, 0, 0.8)',
			fill: false
		    },
                    {
			label: "夜の体重(kg)", 
			data: data2, 
			backgroundColor: 'rgba(0, 0, 0, 0)',
			borderColor: 'rgba(0, 0, 255, 0.8)',
			fill: false
		    },		
		],
	    },
	    options: {
		scales: {
		    yAxes: [{
			    type: 'linear',
			    ticks: {
				beginAtZero: false,
				max: 75.0
			    }
			}]
		},
	    }
    });
}

// 出力用にlabelを整形
function format_label(date) {
	format_str = "YY/MM/DD";
	format_str = format_str.replace(/YY/g, -100 + date.getYear());
	format_str = format_str.replace(/MM/g, 1 + date.getMonth());
	format_str = format_str.replace(/DD/g, date.getDate());
	return format_str;
}

// なんちゃって挿入ソート
function insertionSort(l_lab, l_wei, l_wei2, in_lab, in_weight, in_weight2){
	var result = new Object();
	result.lab = new Array(0);
	result.wei = new Array(0);
	result.wei2 = new Array(0);
	var idx;

	for (idx = 0; idx < l_lab.length; idx++) {
		if(in_lab < l_lab[idx]) {
			break;
		} else {
			result.lab.push(l_lab[idx]);
			result.wei.push(l_wei[idx]);
			result.wei2.push(l_wei2[idx]);
		}
	}

	result.lab.push(in_lab);
	result.wei.push(in_weight);
	result.wei2.push(in_weight2);

	for (let idx2 = idx; idx2 < l_lab.length; idx2++) {
		result.lab.push(l_lab[idx2]);
		result.wei.push(l_wei[idx2]);
		result.wei2.push(l_wei[idx2]);
	}

	return result;
}

// SpreadSheetからデータを受信
function getJsonp_GAS() {
	$.ajax({
		type: 'GET',
		url: 'https://script.google.com/macros/s/AKfycbyGSsGIbVKmfze2VCiZt-VCAwpmlWrHsf-X616N-DZBeBImLPY/exec',
		dataType: 'jsonp',
		jsonpCallback: 'jsondata',
		    success: function(json){
			var label = new Array(0);
			var weight = new Array(0);  // 朝のweight
			var weight2 = new Array(0); // 夜のweight

			// jsonデータを読み込む
			for(let i=0; i < json.length; i++){
			    result = insertionSort(label, weight, weight2, new Date(json[i].date), json[i].weight, json[i].weight2);
			    label = result.lab;	
			    weight = result.wei;
			    weight2 = result.wei2;
			}

			// 日付を基準にソート
			for(let i=0; i < label.length; i++) {
				label[i] = format_label(label[i]);
			}
			drawBarChart(label, weight, weight2);
		}
	});
}

// SpreadSheetへデータを送信
function sendData_GAS(date, weight, weight2) {
	var sendData = "date=" + date + "&weight="+weight+ "&weight2="+weight2;
        
    $.ajax({
        type: "POST",
        crossDomain: true,
	url: 'https://script.google.com/macros/s/AKfycbyGSsGIbVKmfze2VCiZt-VCAwpmlWrHsf-X616N-DZBeBImLPY/exec',
        data: sendData
    });
}
