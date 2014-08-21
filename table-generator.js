$(function () {

    var sizeChooser = $('.SizeChooser');
    sizeChooser.each(function () {
        var trs = $(this).find('table tr'),
            tds = $(this).find('table td');

        trs.each(function (i) {
            var $tr = $(this);
            $tr.attr('data-index', i + 1);
            $tr.find('td').each(function (j) {
                $(this).attr('data-index', j + 1);
            });
        });

        tds.mouseover(function () {
            var trIndex = $(this).closest('tr').data('index'),
                tdIndex = $(this).data('index');

            var inputs = $(this).closest('.SizeChooser').find('.input-sm');
            inputs.eq(0).val(trIndex);
            inputs.eq(1).val(tdIndex);

            tds.removeClass('bg-info');
            tds.each(function () {
                var $td = $(this);
                if ($td.closest('tr').data('index') < trIndex + 1 && $td.data('index') < tdIndex + 1) {
                    $td.addClass('bg-info');
                }
            });
        });
    });
});

$('body').on('click', 'td.bg-info[data-index]', function () {
    var trIndex = $(this).closest('tr').data('index'), tdIndex = $(this).data('index'),
        tableId = '#' + $(this).closest('.SizeChooser').data('id'),
        table = $(tableId + ' > table'), trs = $(tableId + ' > table > tbody > tr'),
        trOrder, tdMaxCount = 0, newTrCount = (trIndex - trs.length), newTdCount;

    trs.each(function () {
        var $tr = $(this), $tdLen = $tr.children('td').length;
        if ($tdLen > tdMaxCount) tdMaxCount = $tdLen;
    });

    newTdCount = (tdIndex - tdMaxCount);
    trs.each(function () {
        var $tr = $(this);
        for (var j = 0; j < newTdCount; j++) $tr.append($('<td/>', { colspan: 1, rowspan: 1, 'class': 'empty' }));
        if (newTdCount < 0) for (i = 0; i < Math.abs(newTdCount) ; i++) $tr.find('td').last().remove();
    });
    tdMaxCount += newTdCount;

    // yeni tr ler ekler
    for (trOrder = 0; trOrder < newTrCount ; trOrder++) {
        var tr = $('<tr/>');
        for (var i = 0; i < tdMaxCount; i++) tr.append($('<td/>', { colspan: 1, rowspan: 1, 'class': 'empty' }));
        table.append(tr);
    }
    //seçim dýþý kalan tr siler
    if (newTrCount < 0) for (trOrder = 0; trOrder < Math.abs(newTrCount) ; trOrder++) $(tableId + ' > table > tbody > tr').last().remove();

    eventChangeData();
});


//only empty cell selectable
$(function () {
    $('table.table-layout, table.table-panel').selectable({
        filter: "td.empty",
        selecting: function (event, ui) {
            var td = $(ui.selecting);

            if (td.closest('table').hasClass('table-layout')) {
                console.log('table-layout');
            } else {
                console.log('table-panel');
            }

            console.log(td);
        }
    });
});
