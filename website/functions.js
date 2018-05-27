var results;

$.ajax({url: "/api/", success: function(result){
    if (result != "[]") {
        var links = JSON.parse(result);
        console.log(links);
        results = links;
        results = bubbleSort(results);
        console.log(results);
        for (var i = 1; i <= 10; i++) {
            addModule(results[i - 1].url, i, results[i - 1].ratio);
        }
    } else {
        $("#sites").append("<h1>No links found :(</h1>");
    }
}});

function addModule(link, i, ratio) {
    $("#sites").append("<div class='site'><h4>"+ i +"</h4><div class='textArea'><a href="+ link +" target='_blank'>"+ link.replace(/(^\w+:|^)\/\//, '') +"</a><h3>"+ Math.round(ratio) / 1000 +" seconds / tweet</h3></div></div>");
    $(".site:last-of-type").find("h4").css("background-color", "rgba(89,173,235,"+ Math.pow(.8, i - 1) +")");
}

function bubbleSort(objects) {
    for (var i = 0; i < objects.length; i++) {
        for (var j = 1; j < objects.length; j++) {
            if(objects[j - 1].ratio > objects[j].ratio) {
                swap(objects, j - 1, j);
            }
        }
    }
    return objects;
}

function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}