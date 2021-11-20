const getMarcaById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/marca/' + id
    }).done(res => res);
};
const getDetails = async id => {
    let marca = await getMarcaById(id);


    document.getElementById('name').value = marca.marca[0].name;
    

};
const getId = async id => {
    document.getElementById("id_delete").value = id;



};


const getInfoUpdate = async id => {
    let marca = await getMarcaById(id);

    document.getElementById('id_update').value = id;
    document.getElementById('name_update').value = marca.marca[0].name;


};
const fill = listMarca => {
    let table = "";

    if (listMarca.length > 0) {
        for (let i = 0; i < listMarca.length; i++) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${listMarca[i].name}</td>
                <td style="text-align: center;">
                    <button type="button" onclick= getDetails(${listMarca[i].id}) class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#details"><i class="far fa-file-alt"></i></button>
                </td>
                <td style="text-align: center;">
                <button type="button" onclick= getInfoUpdate(${listMarca[i].id}) class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit"></i></button>
                </td>
                <td style="text-align: center;">
                <button type="button" onclick= getId(${listMarca[i].id}) class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete"><i class="fas fa-trash-alt"></i></button>                
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
const getMarcas = () => {
    $.ajax({
        type: 'GET',

        url: 'http://localhost:5000/marca'
    }).done(res => {

        fill(res.listMarca);
    });
};
const registerMarca = async () => {
    let name = document.getElementById('name_register').value;


    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/marca/create',
        data: { name }
    }).done(function (res) {
        getMarcas();

    });
};
const updateMarca = async () => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;


    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/marca/update/' + id,
        data: { name }
    }).done(function (res) {
        getMarcas();
    });
};
const deleteMarca = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/marca/delete/' + id
    }).done(res => {
        getMarcas();
        
    });
};
getMarcas();