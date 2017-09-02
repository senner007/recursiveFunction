$(document).ready(function () {
    $('.wrapper').on('click', 'div',function () {
        //console.log(Object.getOwnPropertyNames(this.classList))
        this.classList.toggle('set')

    })
});
