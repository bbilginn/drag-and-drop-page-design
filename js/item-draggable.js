function draggableInit() {
    $('.panel-body td, .panel-body.source').sortable({
        handle: '.draggable',
        connectWith: '.panel-body td, .panel-body.source',
        receive: function (event, ui) {
            var dragItemId = ui.item.attr('id'),
                sourceZone = ui.sender, draggedItem = ui.item,
                sourceId = sourceZone.closest('.panel').attr('id'),
                targetId = draggedItem.closest('.panel').attr('id');

            draggedItem.removeClass().addClass('col-lg-12');

            sourceZone.removeClass('ui-selected').addClass('empty');
            if (targetId == 'cf_source') {
                draggedItem.removeClass().addClass('col-lg-3');
            } else {
                draggedItem.parent().removeClass();
                if (draggedItem.parent().children('div').length > 1) {
                    if (sourceId != 'cf_source') sourceZone.removeClass();
                    else draggedItem.removeClass().addClass('col-lg-3');
                    sourceZone.append(draggedItem)
                }
            }

            selectableInit();
            eventChangeData();
        },
        update: function (event, ui) {
            eventChangeData();
        }
    }).disableSelection();
}

//only empty cell selectable
function selectableInit() {
    $('table.table-layout, table.table-panel').selectable({
        filter: "td.empty",
        autoRefresh: true,
        selecting: function (event, ui) {
            var td = $(ui.selecting);
            //if (td.closest('table').hasClass('table-layout')) {
            //    console.log('table-layout');
            //} else {
            //    console.log('table-panel');
            //}
        },
        stop: function (event, ui) {
            $(event.target).find(':not(.empty)').removeClass('ui-selected');
            enableAddPanelButton($(event.target));
        }
    });
}

function enableAddPanelButton(table) {
    if (table.find('.ui-selected').length == 1) {
        $('.btn-add-panel').show();
    } else {
        $('.btn-add-panel').hide();
    }
}