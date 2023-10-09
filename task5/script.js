function func() {
    var sel = document.getElementById('product').selectedIndex;
    var result;
    var count = Number(document.getElementById('count').value);
    switch(sel) {
        case 0:
            result = 15292 * count;
            break;
        case 1:
            result = 24990 * count;
            break;
        case 2:
            result = 11999 * count;
            break;
        case 3:
            result = 18990 * count;
            break;
    }
    document.getElementById("result").innerHTML = result;
}