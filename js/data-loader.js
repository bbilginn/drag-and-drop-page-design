var sections = [
    {
        Id: 1, Name: 'Section-1', RowOrder: 1, Colspan: 1, Rowspan: 1, Color: 'panel-success', RowCount: 2,
        Fields: [
        { FieldId: 1, Name: 'isim', RowOrder: 1, Colspan: 1, Rowspan: 1 },
        { FieldId: 2, Name: 'soyisim', RowOrder: 1, Colspan: 1, Rowspan: 1 },
        { FieldId: 3, Name: 'il', RowOrder: 2, Colspan: 2, Rowspan: 1 }]
    },
    {
        Id: 2, Name: 'Section-2', RowOrder: 1, Colspan: 1, Rowspan: 1, Color: 'panel-info', RowCount: 2,
        Fields: [
        { FieldId: 1, Name: 'isim', RowOrder: 1, Colspan: 1, Rowspan: 1 },
        { FieldId: 1, Name: 'soyisim', RowOrder: 2, Colspan: 1, Rowspan: 1 }]
    },
    {
        Id: 3, Name: 'Section-3', RowOrder: 2, Colspan: 2, Rowspan: 1, Color: 'panel-danger', RowCount: 2,
        Fields: [
        { FieldId: 1, Name: 'isim', RowOrder: 1, Colspan: 1, Rowspan: 1 },
        { FieldId: 2, Name: 'soyisim', RowOrder: 1, Colspan: 1, Rowspan: 1 },
        { FieldId: 3, Name: 'email', RowOrder: 1, Colspan: 1, Rowspan: 1 },
        { FieldId: 4, Name: 'il', RowOrder: 2, Colspan: 2, Rowspan: 1 },
        { FieldId: 5, Name: 'ilçe', RowOrder: 2, Colspan: 1, Rowspan: 1 }]
    }
];

var layout = { Id: 1, RowCount: 2, Sections: sections };


$(function () {
    var table = $('<table class="table table-bordered table-layout" />');

    for (var i = 0; i < layout.RowCount; i++) {
        var tr = $('<tr/>');
        $.each(layout.Sections, function () {
            if (this.RowOrder == i + 1) {
                var panel = $('.panel.hidden').clone()
                    .removeClass('hidden')
                    .addClass(this.Color);
                panel.find('.panel-heading span [contenteditable]').attr('data-name', this.Name).html(this.Name);

                if (this.Fields.length > 0) {
                    for (var j = 0; j < this.RowCount; j++) {
                        var pTr = $('<tr/>');
                        $.each(this.Fields, function () {
                            if (this.RowOrder == j + 1) {
                                var input = $('<input type="text" class="form-control">');
                                var td = $('<td/>', {
                                    colspan: this.Colspan,
                                    rowspan: this.Rowspan
                                }).append(this.Name);
                                pTr.append(td);
                            }
                        });
                        panel.find('.panel-body').attr('id', i); // benzersiz id
                        panel.find('.tools').attr('data-id', i); // benzersiz id
                        panel.find('.panel-body table').append(pTr);
                    }
                }

                tr.append($('<td/>', {
                    colspan: this.Colspan,
                    rowspan: this.Rowspan
                }).append(panel));

            }
        });
        table.append(tr);
    }

    $("#PageLayout").append(table);
});
