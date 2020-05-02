function csv2Array(str) {
    var csvData = [];
    var lines = str.split("\n");
    for (var i = 0; i < lines.length; ++i) {
	var cells = lines[i].split(",");
	csvData.push(cells);
    }
    return csvData;
}

function drawBarChart(data) {
    // 3)chart.jsのdataset用の配列を用意
    var tmpLabels = [], tmpData1 = [], tmpData2 = [], tmpData3 = [];
    var total = 0
    for (var row in data) {
	tmpLabels.push(data[row][0])
	tmpData1.push(data[row][1])
	//total = parseInt(total) + parseInt(data[row][1]);
	//tmpData2.push(total)
	//tmpData2.push(data[row][2])
	//tmpData3.push(data[row][3])
    };

    // 4)chart.jsで描画
    var ctx = document.getElementById("albus_weight").getContext("2d");
    var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
		labels: tmpLabels,
		datasets: [ {
			label: "体重(kg)", 
			data: tmpData1, 
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

function main() {
    // 1) ajaxでCSVファイルをロード
    var req = new XMLHttpRequest();
    var filePath = './data-albus_weight.csv';
    req.open("GET", filePath, true);
    req.onload = function() {
	// 2) CSVデータ変換の呼び出し
	data = csv2Array(req.responseText);
	// 3) chart.jsデータ準備、4) chart.js描画の呼び出し
	drawBarChart(data);
    }
    req.send(null);
}

main();
