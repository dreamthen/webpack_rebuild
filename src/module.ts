let count = 4;
function add() {
    count++;
}

module.exports = {
    count,
    add,
    writeWebpack: function (txt: string) {
        const root = document.getElementById('root');
        root.innerText = txt;
    }
};