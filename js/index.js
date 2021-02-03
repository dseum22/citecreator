const DateTime = luxon.DateTime;
const now = DateTime.local();
const lslink = localStorage.getItem('link');
const lsname = localStorage.getItem('name')
const lsinitials = localStorage.getItem('initials');
$(function () {
    $('#year').text(now.toFormat('yyyy'));
    if (localStorage.getItem('archive') == null) {
        $('button[name="archive"]').addClass('btn-light');
    } else {
        $('button[name="archive"]').addClass('btn-dark');
        const archive = JSON.parse(localStorage.getItem('archive'));
        $('input[name="date"]').val(archive.date);
        $('input[name="title"]').val(archive.title);
        $('input[name="link"]').val(archive.link);
        $('input[name="author"]').val(archive.authors[0].author);
        $('input[name="quals"]').val(archive.authors[0].quals);
        for (item of archive.authors) {
            if (item.author != archive.authors[0].author) {
                $('div[name="authors"]').append(`<div class="row"> <div class="col col-md-3"> <div class="form-floating mb-3"> <input type="text" class="form-control" name="author" placeholder="author" value="${item.author}" required> <label>Author</label> </div> <div class=" position-relative float-end bg-white ps-3" style="bottom: 3rem; right: 0.65rem;"> </div> </div> <div class="col-md"> <div class="form-floating mb-3"> <input type="text" class="form-control" name="quals" placeholder="quals" value="${item.quals}" required> <label>Qualifications</label> </div> </div> <div class="col-md-auto"> <button type="button" data-authors="add" class="btn btn-dark btn-square shadow-sm"><i data-feather="plus"></i></button> <button type="button" data-authors="delete" class="btn btn-dark btn-square shadow-sm ms-3"><i data-feather="trash"></i></button> </div> </div>`);
            }
        }
        feather.replace();
    }
    updateCite();
    $('button[name="reset"]').click(function () {
        $('form').trigger('reset');
        updateCite();
    });
    $('button[name="settings"]').click(function () {
        location.href = '/settings.html';
    });
    $('button[name="archive"]').click(function () {
        if (localStorage.getItem('archive') == null) {
            if ($('form')[0].checkValidity()) {
                let authors = [];
                let date = $('input[name="date"]').val();
                let title = $('input[name="title"]').val();
                let link = $('input[name="link"]').val();
                $('div[name="authors"] > div').each(function () {
                    let author = $(this).find('input[name="author"]').val();
                    let quals = $(this).find('input[name="quals"]').val();
                    if (quals.slice(-1) == '.') {
                        quals = quals.slice(0, -1);
                    }
                    authors.push({
                        author: author,
                        quals: quals
                    });
                });
                localStorage.setItem('archive', JSON.stringify({
                    authors: authors,
                    date: date,
                    title: title,
                    link: link
                }));
                location.reload();
            }
            $('form').addClass('was-validated');
        } else {
            localStorage.removeItem('archive');
            location.reload();
        }
    });
    $('div[name="authors"]').on('click', 'button', function () {
        if ($(this).data('authors') == 'add') {
            $(this).parent().parent().after('<div class="row"> <div class="col col-md-3"> <div class="form-floating mb-3"> <input type="text" class="form-control" name="author" placeholder="author" required> <label>Author</label> </div> <div class=" position-relative float-end bg-white ps-3" style="bottom: 3rem; right: 0.65rem;"> </div> </div> <div class="col-md"> <div class="form-floating mb-3"> <input type="text" class="form-control" name="quals" placeholder="quals" required> <label>Qualifications</label> </div> </div> <div class="col-md-auto"> <button type="button" data-authors="add" class="btn btn-dark btn-square shadow-sm"><i data-feather="plus"></i></button> <button type="button" data-authors="delete" class="btn btn-dark btn-square shadow-sm ms-3"><i data-feather="trash"></i></button> </div> </div>');
            feather.replace();
        } else if ($(this).data('authors') == 'delete') {
            $(this).parent().parent().remove();
        }
    });
    $('form').on('keyup', 'input', function () {
        updateCite();
    });
    $('button[data-copy]').click(function () {
        navigator.clipboard.writeText($('textarea[data-copy]').val()).then(function () {
            $('button[data-copy]').text('copied');
            setTimeout(function () {
                $('button[data-copy]').text('copy');
            }, 1500);
        });
    });
    $('button[name="submit"]').click(function () {
        $('form').submit();
    });
    $('form').submit(function (event) {
        event.preventDefault();
        if (!this.checkValidity()) {
            event.stopPropagation();
        } else {
            let authors = [];
            let date = DateTime.fromISO($('input[name="date"]').val());
            let title = $('input[name="title"]').val();
            let link = $('input[name="link"]').val();
            $('button[name="submit"]').html('<div class="spinner-border align-middle" role="status"> <span class="visually-hidden">Loading...</span> </div>');
            $('div[name="authors"] > div').each(function () {
                authors.push($(this).find('input[name="author"]').val());
            });
            fetch('https://script.google.com/macros/s/AKfycbxukXWWDhbh2X6KLZMyzBFkwgpRdJCUWKSqNAqPVnQfzbItk8MEzsez8g/exec', {
                method: 'POST',
                mode: 'no-cors',
                credentials: 'include',
                body: JSON.stringify({
                    lslink: lslink,
                    authors: authors,
                    date: date.toFormat('D'),
                    title: title,
                    link: link,
                    lsname: lsname,
                    today: now.toFormat('D')
                })
            }).then(response => {
                $('button[name="submit"]').html('<i data-feather="send"></i>');
                feather.replace();
            }).catch(error => console.log(error));
        }
        this.classList.add('was-validated');
    });
    feather.replace();
    $('[data-toggle="tooltip"]').tooltip();
});

function updateCite() {
    let authors = [];
    let date = DateTime.fromISO($('input[name="date"]').val());
    let title = $('input[name="title"]').val();
    let link = $('input[name="link"]').val();
    $('div[name="authors"] > div').each(function () {
        let author = $(this).find('input[name="author"]').val();
        let quals = $(this).find('input[name="quals"]').val();
        if (quals.slice(-1) == '.') {
            quals = quals.slice(0, -1);
        }
        authors.push({
            author: author,
            quals: quals
        });
    });
    if (authors.length == 1) {
        $('textarea[data-copy]').val(`${authors[0].author.split(' ').pop()} ${date.toFormat('yy')} (${authors[0].author}: ${authors[0].quals}. "${title}," ${date.toFormat('D')}, ${link}. DOA: ${now.toFormat('D')}) ${lsinitials}`);
    } else if (authors.length == 2) {
        $('textarea[data-copy]').val(`${authors[0].author.split(' ').pop()} and ${authors[1].author.split(' ').pop()} ${date.toFormat('yy')} (${authors[0].author}: ${authors[0].quals}. ${authors[1].author}: ${authors[1].quals}. "${title}," ${date.toFormat('D')}, ${link}. DOA: ${now.toFormat('D')}) ${lsinitials}`);
    } else {
        let temp = '';
        for (item of authors) {
            temp += `${item.author}: ${item.quals}. `;
        }
        $('textarea[data-copy]').val(`${authors[0].author.split(' ').pop()} et al. ${date.toFormat('yy')} (${temp}"${title}," ${date.toFormat('D')}, ${link}. DOA: ${now.toFormat('D')}) ${lsinitials}`);
    }
}