module.exports = {
    writeWebpack: function (txt: string) {
        const root = document.getElementById('root');
        root.innerText = txt;
    }
};