function func() {
    var sel = document.getElementById('selector').selectedIndex;
    var result;
    var count = document.getElementById('count').value;
    if (!(/^[0-9]+$/.test(count))) {
        result = "ни сколько";
    }
    else {
        count = Number(count);
        switch (sel) {
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
    }
    document.getElementById("result").innerHTML = result;
}
