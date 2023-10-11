function redirect() {
    var selector = document.getElementById("selector");
    var selectedValue = selector.options[selector.selectedIndex].value;
    window.location.href = selectedValue;
}
