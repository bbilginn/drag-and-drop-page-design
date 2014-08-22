$(function() {
    $('.panel-body td, .customfieldsource').sortable({
        handle: '.draggable',
        connectWith: '.panel-body td, .customfieldsource',
        receive: function (event, ui) {
            var dragItemId = ui.item.attr('id');
            var sourceId = ui.sender.closest('.panel').attr('id');
            var targetId = ui.item.closest('.panel').attr('id');

            eventChangeData();
        },
        update: function (event, ui) {
            eventChangeData();
        }
    }).disableSelection();

});