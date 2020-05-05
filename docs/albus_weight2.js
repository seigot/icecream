function drawBarChart(labels, data) {
    // 4)chart.jsで描画
    var ctx = document.getElementById("albus_weight2").getContext("2d");
    var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
		labels: labels,
		datasets: [ {
			label: "体重(kg)", 
			data: data, 
			backgroundColor: 'rgba(60, 160, 220, 0.3)',
			borderColor: 'rgba(60, 160, 220, 0.8)',
			fill: true
		    },
		],
	    },
	    options: {
		scales: {
		    yAxes: [{
			    type: 'linear',
			    ticks: {
				beginAtZero: true,
				max: 6.0
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
function insertionSort(l_lab, l_wei, in_lab, in_weight){
	var result = new Object();
	result.lab = new Array(0);
	result.wei = new Array(0);
	var idx;

	for (idx = 0; idx < l_lab.length; idx++) {
		if(in_lab < l_lab[idx]) {
			break;
		} else {
			result.lab.push(l_lab[idx]);
			result.wei.push(l_wei[idx]);
		}
	}

	result.lab.push(in_lab);
	result.wei.push(in_weight);

	for (let idx2 = idx; idx2 < l_lab.length; idx2++) {
		result.lab.push(l_lab[idx2]);
		result.wei.push(l_wei[idx2]);
	}

	return result;
}

// SpreadSheetからデータを受信
function getJsonp_GAS() {
	$.ajax({
		type: 'GET',
		url: 'https://script.google.com/macros/s/AKfycbznBMEo2nHkAuxk4g4A2-s4gjephq6x7QmFNI0_qA/exec',
		dataType: 'jsonp',
		jsonpCallback: 'jsondata',
		    success: function(json){
			var label = new Array(0);
			var weight = new Array(0);

			// jsonデータを読み込む
			for(let i=0; i < json.length; i++){
				result = insertionSort(label, weight, new Date(json[i].date), json[i].weight);
				label = result.lab;	weight = result.wei;
			}

			// 日付を基準にソート
			for(let i=0; i < label.length; i++) {
				label[i] = format_label(label[i]);
			}
			drawBarChart(label, weight);
		}
	});
}

// SpreadSheetへデータを送信
function sendData_GAS(date, weight) {
	var sendData = "date=" + date + "&weight="+weight;
        
    $.ajax({
        type: "POST",
        crossDomain: true,
	url: 'https://script.google.com/macros/s/AKfycbznBMEo2nHkAuxk4g4A2-s4gjephq6x7QmFNI0_qA/exec',
        data: sendData
    });
}
