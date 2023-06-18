$(document).ready(function () {
  get_vantype_talbe();
});
async function get_vantype_talbe() {
  let res = await ajax_get_vantype_table();
  html_admin_main_vantype(res);
  console.log(res);
}
function ajax_get_vantype_table(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_vantype/get_vantype_table.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
function html_admin_main_vantype(data) {
  let html = "";
  if(data['st'] == '1'){
    $.each(data['data'], function (i, v) {
      html_btn = `
              <div class="">
              
                  <button type="button" class="btn btn-primary" data-id="${v["ID"]}" onclick="vantype_edit(this);"> <i class="bi bi-pencil"></i> </button>
                  <button type="button" class="btn btn-danger" data-id="${v["ID"]}" onclick="vantype_delete(this);"> <i class="bi bi-trash"></i> </button>
  
              </div>
          `;
      html += `
          <tr>
              <td align="center">${i + 1}</td>
              <td align="center">${v["ID"]}</td>
              <td align="center">${v["type_name"]}</td>
              <td align="center">${html_btn}</td>
          </tr>
          `;
    });
    
  }else{
    html += `
          <tr>
              <td colspan="5" align="center">No data ... </td>
          </tr>
          `;
  }
  $("#table_main tbody").html(html);
  $("#table_main").DataTable();
  
}

// delete vantype
async function vantype_delete(e) {
  let ID = $(e).attr("data-id");
  if (confirm("ลบข้อมูลรถ ?") == true) {
    let res = await ajax_vantype_delete({ ID: ID });
    get_vantype_talbe();
    alert('ลบข้อมูล สำเร็จ');
  } else {
  }
  
}
function ajax_vantype_delete(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_vantype/delete_vantype.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}


// save add vantype
function modal_add_vantype() {
  $('#modal_add_vantype').remove();
  let html = "";
  html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_add_vantype" tabindex="-1" aria-labelledby="modal_add_vantypeLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_add_vantypeLabel">Add vantype</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                     
                      
                      <label for="basic-url" class="form-label">ชื่อประเภท</label>
                      <div class="input-group mb-3">
                          <input type="text" class="form-control inp_type" id="" aria-describedby="basic-addon3">
                      </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="save_vantype();">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(html);
    $('#modal_add_vantype').modal('show');
}
async function save_vantype(){
  let type = $('.inp_type').val();
  let data = {
    'type' : type,
  };
  let res = await ajax_save_vantype(data);
  if (res['st'] == '1') {
    alert('บันทึกข้อมูล เรียบร้อย');
    $('#modal_add_vantype').modal('hide');
    get_vantype_talbe();
  }else{
    alert('ไม่สามารถเซฟข้อมูล');
  }
}
function ajax_save_vantype(data = {}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_vantype/save_vantype.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}

// edit
async function vantype_edit(e = null){
  let ID = $(e).attr('data-id');
  let res = await ajax_get_edit_vantype({'ID' : ID});
  modal_edit_vantype(res);
  console.log(res);
}
function ajax_get_edit_vantype(data={}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_vantype/get_edit_vantype.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}
function modal_edit_vantype(data = {}) {
  $('#modal_edit_vantype').remove();
  let ID = (!!data['ID'])? data['ID'] : '' ;
  let type_name = (!!data['type_name'])? data['type_name'] : '' ;
  

let html = "";
html = `
      <!-- Modal -->
      <div class="modal fade " id="modal_edit_vantype" data-id="${ID}" tabindex="-1" aria-labelledby="modal_edit_vantypeLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modal_edit_vantypeLabel">Edit vantype</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="container">
                    <label for="basic-url" class="form-label">รหัสประเภท</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_vantype" id="" aria-describedby="basic-addon3" value="${ID}" readonly>
                    </div>
                    <label for="basic-url" class="form-label">ชื่อประเภท</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_typename" id="" aria-describedby="basic-addon3" value="${type_name}">
                    </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onclick="save_edit_vantype(this);">Save changes</button>
              </div>
              </div>
          </div>
      </div>
  `;
  $('body').append(html);
  $('#modal_edit_vantype').modal('show');
}
async function save_edit_vantype(e=null) {
  let ID = $(e).closest('#modal_edit_vantype').attr('data-id');
  let type_name = $('.inp_edit_typename').val();

  let data = {
    "ID" : ID,
    'typename' : type_name,
  
  };
  let res = await ajax_save_edit_vantype(data);
  if (res['st'] == '1') {
    console.log(res);
    alert('บันทึกข้อมูล เรียบร้อย');
    $('#modal_edit_vantype').modal('hide');
    get_vantype_talbe();
  }else{
    alert('ไม่สามารถเซฟข้อมูล');
  }
}
function ajax_save_edit_vantype(data = {}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_vantype/save_edit_vantype.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}
