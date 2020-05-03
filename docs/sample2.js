var tecnique_data = ['フレズノ',
		     '変化',
		     'TWIST O FLEX',
		     'サックウォーク'];

var body_parts_data = ['こし',
		       'かた'];

/**
 * 配列の値からランダムで1つ選択して返す
 * @param arr arrayData (required) 選択する配列の内容
 * @return str
 */
function choose_at_random(arrayData) {
    var arrayIndex = Math.floor(Math.random() * arrayData.length);
    return arrayData[arrayIndex];
}

function sample(){

    var getData;
    var getData2;
    var str;
    // 1
    getData = choose_at_random(tequnique_data);
    getData2 = choose_at_random(tequnique_data);
    str = getData + "、と、見せかけて、" + getData2;
    console.log(str);
    document.getElementById("area1").innerText = str;
}

function sample2(){
    
    var getData;
    var getData2;
    var getData3;
    var getData4;
    var str;
    // 2
    getData  = choose_at_random(body_parts_data);
    getData2 = choose_at_random(body_parts_data);
    getData3 = choose_at_random(body_parts_data);
    getData4 = choose_at_random(body_parts_data);

    str = getData + "! " + getData2 + "! " + getData3 + "! " + getData4 + "! ";
    console.log(str);
    document.getElementById("area2").innerText = str;
}
