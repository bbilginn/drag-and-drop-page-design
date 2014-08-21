// Panel color setting
$('body').on('click', '[data-color]', function () {
    var panel = $(this).closest('.panel');
    var color = $(this).data('color');
    panel.removeClass().addClass('panel').addClass('panel-' + color).attr('data-panelcolor', color);
    eventChangeData();
});

// Panel slide toggle effect
$('body').on('click', '.panel-toggle', function () {
    var panelBlock = $(this).closest('.panel').children('.panel-body');
    panelBlock.slideToggle();
});

//contenteditable
$('body').on('click', '.contenteditable', function () {
    var span = $(this).closest('span');
    var contentEditable = span.children('[contenteditable]');
    contentEditable.attr('contenteditable', true).focus();
    contentEditable.blur(function () {
        $(this).attr('contenteditable', false);
    });
});
$('body').on('keydown', '[contenteditable="true"]', function (e) {
    var item = $(this);

    if (e.keyCode === 27) {
        item.html(item.data('name'));
        item.blur();
        return false;
    } else {
        eventChangeData();
    }
    if (e.keyCode === 13) {
        item.blur();
        return false;
    }
});

function eventChangeData() {
    // data deðiþikliði oldu
}