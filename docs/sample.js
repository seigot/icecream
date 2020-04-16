var data = ['りんご',
            'みかん',
            'いちご',
            'パイナップル',
            'ドラゴンフルーツ'];

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
    var getData = choose_at_random(data);
    var getData2 = choose_at_random(data);
    var str = getData + "、と、見せかけて、" + getData2;

    console.log(str);

    document.getElementById("area1").innerText = str;
}
