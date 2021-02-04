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
    $('div[name="archive"]').on('click', 'button[data-external]', function () {
        let link = $(this).data('external');
        if (!link.includes('https://') && !link.includes('http://')) {
            link = 'http://' + link;
        }
        window.open(link, '_blank');
    }).on('click', 'button[data-cloud]', function () {
        localStorage.setItem('cloud', $(this).data('cloud'));
        location.href = domain + '/index.html';
    });
    if (localStorage.getItem('archive') == null) {
        $('div[name="archive"]').append('No cites archived right now');
    } else {
        let temp = JSON.parse(localStorage.getItem('archive'));
        let i = 0;
        for (item of temp) {
            let cite = item.cite;
            $('div[name="archive"]').append(`<div class="row"> <div class="col col-md-2"> <div class="form-floating shadow-sm mb-3"> <input type="date" class="form-control" name="date" value="${DateTime.fromISO(item.datetime).toISODate()}" disabled> <label>Access date</label> </div> </div> <div class="col col-md-3"> <div class="form-floating shadow-sm mb-3"> <input type="text" class="form-control" name="cite" placeholder="cite" value="${cite.simplecite}" disabled> <label>Cite</label> </div> </div> <div class="col-md"> <div class="form-floating shadow-sm mb-3"> <input type="text" class="form-control" name="title" placeholder="title" value="${cite.title}" disabled> <label>Title</label> </div> </div> <div class="col col-md-auto"> <button type="button" data-external="${cite.link}" class="btn btn-secondary btn-square shadow-sm"><i data-feather="external-link"></i></button> <button type="button" data-cloud="${i}" class="btn btn-secondary btn-square shadow-sm ms-3"><i data-feather="download-cloud"></i></button> </div> </div>`);
            i++;
        }
        feather.replace();
    }
});