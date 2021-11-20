const getAutoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/autos/' + id
    }).done(res => res);
};

const getAutos = () => {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/autos'

    }).done(res => {
        fill(res.listAutos);
    });
};

const getId = async id => {
    document.getElementById("id_delete").value = id;



};

const fill = listAutos => {
    let table = "";

    if (listAutos.length > 0) {
        for (let i = 0; i < listAutos.length; i++) {
            var f = new Date(listAutos[i].registered).toLocaleString();
            if (listAutos[i].updated == null) {
                var h = "No ha habido actualización";
            } else {
                var h = new Date(listAutos[i].updated).toLocaleString();
            };



            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${listAutos[i].name}</td>
                <td>${listAutos[i].matricula}</td>
                <td>${listAutos[i].verificacion}</td>
                <td>${f}</td>
                <td>${h}</td>
                <td>${listAutos[i].status ? "Activo" : "Inactivo"}</td>
                <td>${listAutos[i].marca}</td>
                <td style="text-align: center;">
                    <button type="button" onclick= getDetails(${listAutos[i].id}) class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#details"><i class="far fa-file-alt"></i></button>
                </td>
                <td style="text-align: center;">
                <button type="button" onclick= getInfoUpdate(${listAutos[i].id}) class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit"></i></button>
                </td>
                <td style="text-align: center;">
                <button type="button" onclick= getId(${listAutos[i].id}) class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete"><i class="fas fa-trash-alt"></i></button>                
                </td>
            </tr>
            `;
        }
    } else {
        table = `
        <tr class="text-center">
            <td colspan="5">No hay registros para mostrar</td>
        </tr>
        `;
    }
    $(`#table > tbody`).html(table);
};

const registerAuto = async () => {
    let name = document.getElementById('name_register').value;
    let matricula = document.getElementById('matricula_register').value;
    let verificacion = document.getElementById('verificacion_register').value;
    let marca = document.getElementById('marca_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/autos/create/',
        data: { name, matricula, verificacion, marca }
    }).done(function (res) {
        getAutos();

    });
};

const getDetails = async id => {
    let auto = await getAutoById(id);
    var f = new Date(auto.auto[0].registered).toLocaleString();
    if (auto.auto[0].updated == null) {
        var h = "No ha habido actualización";
    } else {
        var h = new Date(auto.auto[0].updated).toLocaleString();
    };

    document.getElementById('name').value = auto.auto[0].name;
    document.getElementById('matricula').value = auto.auto[0].matricula;
    document.getElementById('verificacion').value = auto.auto[0].verificacion;
    document.getElementById('registered').value = f;
    document.getElementById('updated').value = h;
    document.getElementById('status').value = auto.auto.status ? "Activo" : "Inactivo";
    document.getElementById('marca').value = auto.auto[0].marca;
};

const updateAuto = async () => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let matricula = document.getElementById('matricula_update').value;
    let verificacion = document.getElementById('verificacion_update').value;
    let marca = document.getElementById('marca_update').value;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/autos/update/' + id,
        data: { name, matricula, verificacion, marca }
    }).done(function (res) {
        getAutos();
    });
};

const getInfoUpdate = async id => {
    let auto = await getAutoById(id);
    var f = new Date(auto.auto[0].registered).toLocaleString();
    if (auto.auto[0].updated == null) {
        var h = "No ha habido actualización";
    } else {
        var h = new Date(auto.auto[0].updated).toLocaleString();
    };

    document.getElementById('id_update').value = id;
    document.getElementById('name_update').value = auto.auto[0].name;
    document.getElementById('matricula_update').value = auto.auto[0].matricula;
    document.getElementById('verificacion_update').value = auto.auto[0].verificacion;
    document.getElementById('registered_update').value = f;
    document.getElementById('updated_update').value = h;
    document.getElementById('marca_update').value = auto.auto[0].marca;
};

const deleteAuto = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/autos/delete/' + id
    }).done(res => {
        getAutos();

    });
};

getAutos();