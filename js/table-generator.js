function tableSizer() {
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
}

$(function () {
    //table  generator
    $('body').on('click', 'td[data-index] button', function () {
        var trIndex = $(this).closest('tr').data('index'), tdIndex = $(this).parent().data('index'),
            tableId = '#' + $(this).closest('.tools').data('id'),
            table = $(tableId + ' > table'), trs = $(tableId + ' > table > tbody > tr'),
            trOrder, tdMaxCount = 0, newTrCount = (trIndex - trs.length), newTdCount, isDeletable = null;

        trs.each(function () {
            var $tr = $(this), $tdLen = $tr.children('td').length;
            if ($tdLen > tdMaxCount) tdMaxCount = $tdLen;
        });

        newTdCount = (tdIndex - tdMaxCount);
        trs.each(function () {
            var $tr = $(this);
            for (var j = 0; j < newTdCount; j++) $tr.append($('<td/>', { colspan: 1, rowspan: 1, 'class': 'empty' }));
            //seçim dýþý kalan td siler
            if (newTdCount < 0) {
                if (isDeletable == null && $tr.find('td:not(.empty)').length > 0) {
                    if (window.confirm('Dizaynda alanlar var, devam edilsin mi?')) {
                        isDeletable = true;
                        for (i = 0; i < Math.abs(newTdCount) ; i++) $tr.find('td').last().remove();
                    } else {
                        isDeletable = false;
                    }
                } else if (isDeletable) {
                    for (i = 0; i < Math.abs(newTdCount) ; i++) $tr.find('td').last().remove();
                }
            }
        });
        tdMaxCount += newTdCount;

        // yeni tr ler ekler
        for (trOrder = 0; trOrder < newTrCount ; trOrder++) {
            var tr = $('<tr/>');
            for (var i = 0; i < tdMaxCount; i++) tr.append($('<td/>', { colspan: 1, rowspan: 1, 'class': 'empty' }));
            table.append(tr);
        }

        //seçim dýþý kalan tr siler
        if (newTrCount < 0) {
            var rows = $(tableId + ' > table > tbody > tr');
            if (isDeletable == null && rows.find('td:not(.empty)').length > 0) {
                if (window.confirm('Dizaynda alanlar var, devam edilsin mi?')) {
                    for (trOrder = 0; trOrder < Math.abs(newTrCount) ; trOrder++) rows.last().remove();
                }
            } else if (isDeletable) {
                for (trOrder = 0; trOrder < Math.abs(newTrCount) ; trOrder++) rows.last().remove();
            }
        }

        draggableInit();
        eventChangeData();
    });

    // seçili hüçrelerin merge edilmesi
    $('body').on('click', '.tools .merge', function () {
        var containerId = '#' + $(this).closest('.tools').data('id'),
            table = $(containerId + ' > table > tbody'),
            selectedSelector = containerId + ' > table > tbody > tr .ui-selected',
            cs = 0, rs = 1;

        table.find('tr').each(function () {
            var $tr = $(this),
                selecteds = $tr.find('.ui-selected');

            cs = 0;
            selecteds.each(function () {
                cs += parseInt($(this).attr('colspan'));
                var newRs = parseInt($(this).attr('rowspan'));
                if (newRs > rs) rs = newRs;
            });
            selecteds.last().after(($('<td/>', { colspan: cs, rowspan: rs, 'class': 'empty ui-selected' })));
            selecteds.remove();
        });

        rs = 0, cs = 1;
        $(selectedSelector).each(function () {
            rs += parseInt($(this).attr('rowspan'));
            var newCs = parseInt($(this).attr('colspan'));
            if (newCs > cs) cs = newCs;
        });
        $(selectedSelector).each(function (i) {

            var $elem = $(this);
            if (i == 0) {
                $elem.attr('rowspan', rs).attr('colspan', cs);
            } else {
                $elem.remove();
            }
        });


        draggableInit();
        eventChangeData();
        enableAddPanelButton(table);
    });
});