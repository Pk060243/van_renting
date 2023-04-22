$(document).ready(function () {
  get_van_talbe();
});

async function get_van_talbe() {
  let res = await ajax_get_van_table();
  html_admin_main_van(res);
}
function ajax_get_van_table(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_van/get_van_table.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
function html_admin_main_van(data) {
  let html = "";
  $.each(data, function (i, v) {
    html_btn = `
            <div class="">
            
                <button type="button" class="btn btn-primary" data-id="${v["ID"]}"> <i class="bi bi-pencil"></i> </button>
                <button type="button" class="btn btn-danger" data-id="${v["ID"]}" onclick="van_delete(this);"> <i class="bi bi-trash"></i> </button>

            </div>
        `;
    html += `
        <tr>
            <td align="center">${i + 1}</td>
            <td align="center">${v["plate"]}</td>
            <td align="center">${v["brand"]}</td>
            <td align="center">${v["type"]}</td>
            <td align="center">${v["seat"]}</td>
            <td align="center">${html_btn}</td>
        </tr>
        `;
  });
  $("#table_main tbody").html(html);
  $("#table_main").DataTable();
}
async function van_delete(e) {
  let ID = $(e).attr("data-id");
  if (confirm("ลบข้อมูลรถ ?") == true) {
    let res = await ajax_van_delete({ ID: ID });
    get_van_talbe();
  } else {
  }
  alert(text);
}

function ajax_van_delete(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_van/delete_van.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
function modal_add_van() {
    if ($('#modal_add_van').lenght >= 1) {
        $('#modal_add_van').remove();
    }
  let html = "";
  html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_add_van" tabindex="-1" aria-labelledby="modal_add_vanLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_add_vanLabel">Add van</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(html);
    $('#modal_add_van').modal('show');
}
