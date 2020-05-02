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
    for (var row in data) {
	tmpLabels.push(data[row][0])
	tmpData1.push(data[row][1])
	tmpData2.push(data[row][2])
	tmpData3.push(data[row][3])
    };

    // 4)chart.jsで描画
    var ctx = document.getElementById("shiga-jinko").getContext("2d");
    var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
		labels: tmpLabels,
		datasets: [
                    { label: "外国人", data: tmpData1, backgroundColor: "red" },
                    { label: "日本人", data: tmpData2, backgroundColor: "blue" },
                    { label: "全体", data: tmpData3, backgroundColor: "green" }
	        ]
	    }
    });
}

function main() {
    // 1) ajaxでCSVファイルをロード
    var req = new XMLHttpRequest();
    var filePath = './data.csv';
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
