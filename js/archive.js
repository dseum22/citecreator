const DateTime = luxon.DateTime;
const now = DateTime.local();
$(function () {
    $('#year').text(now.toFormat('yyyy'));
    $('button[name="home"]').click(function () {
        location.href = domain + '/index.html';
    });
    $('button[name="clear"]').click(function () {
        $('#clearModal').modal();
    });
    $('button[name="clearconfirm"]').click(function () {
        localStorage.removeItem('archive');
        location.reload();
    });
    feather.replace();
    $('[data-toggle="tooltip"]').tooltip();
    if (localStorage.getItem('archive') == null) {
        $('.container-md .mt-5').append('No cites archived right now');
    } else {
        let temp = JSON.parse(localStorage.getItem('archive'));
        for (item of temp) {
            $('.container-md .mt-5').append(`<div class="row">${JSON.stringify(item)}</div>`);
        }
    }
});