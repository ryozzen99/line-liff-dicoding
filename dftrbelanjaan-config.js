function loadCatatan() {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if (list_data.length > 0) {
            data_app = '<table class="table table-striped table-dark">';
            data_app += '<thead>' +
                '<th>Nama Barang</th>' +
                '<th>Jumlah Beli</th>' +
                '<th>Hapus</th>' +
                '</thead> <tbody>';

            for (i in list_data) {
                data_app += '<tr>';
                data_app +=
                    '<td>' + list_data[i].nama + ' </td>' +
                    '<td>' + list_data[i].jumbel + ' </td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id_data + '\')">Hapus</a></td>';
                data_app += '</tr>';
            }

            data_app += '</tbody></table>';

        } else {
            data_app = "Barang masih kosong nih";
        }


        $('#list-catatan').html(data_app);
        $('#list-catatan').hide();
        $('#list-catatan').fadeIn(100);
    }
}

function editData(id) {

    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#eid_data").val(list_data[i].id_data);
                $("#enama").val(list_data[i].nama);
                $("#ejumbel").val(list_data[i].jumbel);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('edit-data');

    }

}

function lihatData(id) {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#lid_data").val(list_data[i].id_data);
                $("#lnama").val(list_data[i].nama);
                $("#ljumbel").val(list_data[i].jumbel);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('lihat-data');

    }
}


function simpanData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Data berhasil disimpan"
        }]).then(function () {
            alert('Barang Tersimpan');
        }).catch(function (error) {
            alert('Data Error');
        });
    }

    nama = $('#nama').val();
    jumbel = $('#jumbel').val();

    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    } else {
        list_data = [];
        id_data = 0;
    }

    id_data++;
    list_data.push({
        'id_data': id_data,
        'nama': nama,
        'jumbel': jumbel
    });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    gantiMenu('list-catatan');

    return false;
}

function simpanEditData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Barang Di Ubah"
        }]).then(function () {
            alert('Barang tersimpan');
        }).catch(function (error) {
            alert('Data Error');
        });
    }

    id_data = $('#eid_data').val();
    nama = $('#enama').val();
    jumbel = $('#ejumbel').val();

    list_data.push({
        'id_data': id_data,
        'nama': nama,
        'jumbel': jumbel
    });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    gantiMenu('list-catatan');

    return false;
}

function hapusData(id) {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Barang Dihapus"
        }]).then(function () {
            alert('Barang sudah dihapus');
        }).catch(function (error) {
            alert('Data Error');
        });
    }

    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));

        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }

        localStorage.setItem('list_data', JSON.stringify(list_data));
        loadCatatan();
    }
}


function gantiMenu(menu) {
    if (menu == "list-catatan") {
        loadCatatan();
        $('#tambah-catatan').hide();
        $('#list-catatan').fadeIn();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "tambah-catatan") {
        $('#tambah-catatan').fadeIn();
        $('#list-catatan').hide();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "edit-data") {
        $('#edit-data').fadeIn();
        $('#tambah-catatan').hide();
        $('#list-catatan').hide();
        $('#lihat-data').hide();
    } else if (menu == "lihat-data") {
        $('#lihat-data').fadeIn();
        $('#edit-data').hide();
        $('#tambah-catatan').hide();
        $('#list-catatan').hide();
    }
}