$(function () {
    var sizeChooser = $('.SizeChooser');
    sizeChooser.each(function () {
        var trs = $(this).find('table tr'),
            tds = $(this).find('table td'),
            buttons = $(this).find('table td button');

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

            var colXrow = $(this).closest('.SizeChooser').find('.colXrow');
            colXrow.eq(0).html(trIndex);
            colXrow.eq(1).html(tdIndex);

            buttons.removeClass('btn-info');
            buttons.each(function () {
                var $button = $(this);
                if ($button.closest('tr').data('index') < trIndex + 1 && $button.parent().data('index') < tdIndex + 1) {
                    $button.addClass('btn-info');
                }
            });
        });
    });

    //table  generator
    $('body').on('click', 'td[data-index] button', function () {
        var trIndex = $(this).closest('tr').data('index'), tdIndex = $(this).parent().data('index'),
            tableId = '#' + $(this).closest('.tools').data('id'),
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
    $('table.table-layout, table.table-panel').selectable({
        filter: "td.empty",
        selecting: function (event, ui) {
            //var td = $(ui.selecting);

            //if (td.closest('table').hasClass('table-layout')) {
            //    console.log('table-layout');
            //} else {
            //    console.log('table-panel');
            //}

            //console.log(td);
        }
    });

    // seçili hüçrelerin merge edilmesi
    $('body').on('click', '.tools .merge', function () {
        var selector = '#' + $(this).closest('.tools').data('id') + ' .ui-selected',
            selectedCells = $(selector),
            cs = 0;

        selectedCells.each(function () { cs += parseInt($(this).attr('colspan')); });

        selectedCells.last().after(($('<td/>', { colspan: cs, rowspan: 1, 'class': 'empty ui-selected' })));
        selectedCells.remove();

        $(selector).each(function (i) {
            var $elem = $(this);

            if (i == 0) {
                $elem.attr('rowspan', $(selector).length);
            } else {
                $elem.remove();
            }

            //    tr = $elem.parent(),
            //    tds = tr.find('.ui-selected');

            //tds.last().after(($('<td/>', { colspan: tds.length, rowspan: 1, 'class': 'empty' })));
        });
    });
});