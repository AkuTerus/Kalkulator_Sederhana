function get(v) {
    return document.querySelector(v);
}
function getAll(v) {
    return document.querySelectorAll(v);
}
function buatListOpt() {
    let list = [];
    for (const opt of getAll(".opt")) {
        let optInner = (opt.innerText == "x")
            ? "*"
            : (opt.innerText == "MOD")
                ? "%"
                : opt.innerText;

        list.push(optInner);
    }
    return list;
}
