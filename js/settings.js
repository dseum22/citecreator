const DateTime = luxon.DateTime;
const now = DateTime.local();
$(function () {
    $('#year').text(now.toFormat('yyyy'));
    if (localStorage.getItem('link') != null) {
        $('div[name="header"]').append('<button type="button" class="btn btn-success btn-square shadow-sm float-end" data-toggle="tooltip" data-placement="bottom" title="Config status"><i data-feather="check"></i></button>');
        $('input[name="link"]').val(localStorage.getItem('link'));
        $('input[name="name"]').val(localStorage.getItem('name'));
        $('input[name="initials"]').val(localStorage.getItem('initials'));
    } else {
        $('div[name="header"]').append('<button type="button" class="btn btn-danger btn-square shadow-sm float-end" data-toggle="tooltip" data-placement="bottom" title="Config status"><i data-feather="x"></i></button>');
    }
    feather.replace();
    $('[data-toggle="tooltip"]').tooltip();
    $('button[name="home"]').click(function () {
        location.href = location.origin + '/index.html';
    });
    $('button[name="save"]').click(function () {
        $('form').submit();
    });
    $('button[name="clear"]').click(function () {
        localStorage.removeItem('link');
        localStorage.removeItem('name');
        localStorage.removeItem('initials');
        location.reload();
    });
    $('form').submit(function (event) {
        event.preventDefault();
        if (!this.checkValidity()) {
            event.stopPropagation();
        } else {
            localStorage.setItem('link', $('input[name="link"]').val());
            localStorage.setItem('name', $('input[name="name"]').val());
            localStorage.setItem('initials', $('input[name="initials"]').val());
            location.href = location.origin + '/index.html';
        }
        this.classList.add('was-validated');
    });
});
