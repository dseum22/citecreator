$(function () {
    const now = new Date();
    $('#year').text(now.getFullYear());
    $('button[name="reset"]').click(function () {
        $('form').trigger('reset');
        $('textarea[data-copy]').val('');
    });
    $('input').keyup(function () {
        let author = $('input[name="author"]').val();
        let quals = $('input[name="quals"]').val();
        let date = new Date($('input[name="date"]').val());
        let title = $('input[name="title"]').val();
        let link = $('input[name="link"]').val();
        if ($('input[type="checkbox"]').is(':checked')) {
            $('textarea[data-copy]').val(`${author.split(' ').pop()} et al. ${date.getFullYear().toString().slice(-2)} (${author}: ${quals}. "${title}," ${convertDate(date)}, ${link}. DOA: ${convertDate(now)}) DSE`);
        } else {
            $('textarea[data-copy]').val(`${author.split(' ').pop()} ${date.getFullYear().toString().slice(-2)} (${author}: ${quals}. "${title}," ${convertDate(date)}, ${link}. DOA: ${convertDate(now)}) DSE`);
        }
    });
    $('input[type="checkbox"]').change(function () {
        let author = $('input[name="author"]').val();
        let quals = $('input[name="quals"]').val();
        let date = new Date($('input[name="date"]').val());
        let title = $('input[name="title"]').val();
        let link = $('input[name="link"]').val();
        if ($('input[type="checkbox"]').is(':checked')) {
            $('textarea[data-copy]').val(`${author.split(' ').pop()} et al. ${date.getFullYear().toString().slice(-2)} (${author}: ${quals}. "${title}," ${convertDate(date)}, ${link}. DOA: ${convertDate(now)}) DSE`);
        } else {
            $('textarea[data-copy]').val(`${author.split(' ').pop()} ${date.getFullYear().toString().slice(-2)} (${author}: ${quals}. "${title}," ${convertDate(date)}, ${link}. DOA: ${convertDate(now)}) DSE`);
        }
    });
    $('button[data-copy]').click(function () {
        navigator.clipboard.writeText($('textarea[data-copy]').val()).then(function () {
            $('button[data-copy]').text('copied');
            setTimeout(function () {
                $('button[data-copy]').text('copy');
            }, 1500);
        });
    });
    $('button[type="submit"]').click(function () {
        $('form').submit();
    });
    $('form').submit(function (event) {
        event.preventDefault();
        if (!this.checkValidity()) {
            event.stopPropagation();
        } else {
            let author = $('input[name="author"]').val();
            let quals = $('input[name="quals"]').val();
            let date = new Date($('input[name="date"]').val());
            let title = $('input[name="title"]').val();
            let link = $('input[name="link"]').val();
            $('button[type="submit"]').html('Submitting...&nbsp;&nbsp;&nbsp;<div class="spinner-border align-middle" role="status"> <span class="visually-hidden">Loading...</span> </div>');
            fetch('https://script.google.com/macros/s/AKfycbxukXWWDhbh2X6KLZMyzBFkwgpRdJCUWKSqNAqPVnQfzbItk8MEzsez8g/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    author: author,
                    date: convertDate(date),
                    title: title,
                    link: link,
                    name: 'Dennis',
                    today: convertDate(now),
                    checked: $('input[type="checkbox"]').is(':checked')
                })
            }).then(response => {
                $('button[type="submit"]').html('Submit entry');
            }).catch(error => console.log(error));
        }
        this.classList.add('was-validated');
    });
});
function convertDate(input) {
    return `${input.getMonth() + 1}/${input.getDate() + 1}/${input.getFullYear()}`
}