$(document).ready(function () {
  get_price_talbe();
});
async function get_price_talbe() {
  let res = await ajax_get_price_table();
  html_admin_main_price(res);
  
}
function ajax_get_price_table(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_price/get_price_table.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
function html_admin_main_price(data) {
  let html = "";
  if(data['st'] == '1'){
    $.each(data['data'], function (i, v) {
      html_btn = `
              <div class="">
              
                  <button type="button" class="btn btn-primary" data-id="${v["ID"]}" onclick="price_edit(this);"> <i class="bi bi-pencil"></i> </button>
                  <button type="button" class="btn btn-danger" data-id="${v["ID"]}" onclick="price_delete(this);"> <i class="bi bi-trash"></i> </button>
  
              </div>
          `;
      html += `
          <tr>
              <td align="center">${i + 1}</td>
              <td align="center">${v["price_name"]}</td>
              <td align="center">${v["price"]}</td>
              <td align="center">${v["type_van"]}</td>
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

// delete price
async function price_delete(e) {
  let ID = $(e).attr("data-id");
  if (confirm("ลบข้อมูลรถ ?") == true) {
    let res = await ajax_price_delete({ ID: ID });
    get_price_talbe();
    alert('ลบข้อมูล สำเร็จ');
  } else {
  }
  
}
function ajax_price_delete(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_price/delete_price.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}


// save add price
function modal_add_price() {
  $('#modal_add_price').remove();
  let html = "";
  html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_add_price" tabindex="-1" aria-labelledby="modal_add_priceLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_add_priceLabel">Add price</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                      <label for="basic-url" class="form-label">ชื่อ</label>
                      <div class="input-group mb-3">
                          <input type="text" class="form-control inp_name" id="" aria-describedby="basic-addon3">
                      </div>
                      <label for="basic-url" class="form-label">ราคา</label>
                      <div class="input-group mb-3">
                          <input type="text" class="form-control inp_price" id="" aria-describedby="basic-addon3">
                      </div>
                      <label for="basic-url" class="form-label">ประเภทรถตู้</label>
                      <div class="input-group mb-3">
                          <input type="text" class="form-control inp_type" id="" aria-describedby="basic-addon3">
                      </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="save_price();">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(html);
    $('#modal_add_price').modal('show');
}
async function save_price(){
  let name = $('.inp_name').val();
  let price = $('.inp_price').val();

  let type = $('.inp_type').val();

  let data = {
    'name' : name,
    'price' : price,
    'type' : type,
  };
  let res = await ajax_save_price(data);
  if (res['st'] == '1') {
    alert('บันทึกข้อมูล เรียบร้อย');
    $('#modal_add_price').modal('hide');
    get_price_talbe();
  }else{
    alert('ไม่สามารถเซฟข้อมูล');
  }
}
function ajax_save_price(data = {}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_price/save_price.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}

// edit
async function price_edit(e = null){
  let ID = $(e).attr('data-id');
  let res = await ajax_get_edit_price({'ID' : ID});
  modal_edit_price(res);
}
function ajax_get_edit_price(data={}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_price/get_edit_price.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}
function modal_edit_price(data = {}) {
  $('#modal_edit_price').remove();
  let ID = (!!data['ID'])? data['ID'] : '' ;
  let name = (!!data['price_name'])? data['price_name'] : '' ;
  let price = (!!data['price'])? data['price'] : '' ;
  let type = (!!data['type_van'])? data['type_van'] : '' ;
let html = "";
html = `
      <!-- Modal -->
      <div class="modal fade " id="modal_edit_price" data-id="${ID}" tabindex="-1" aria-labelledby="modal_edit_priceLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modal_edit_priceLabel">Edit price</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="container">
                    <label for="basic-url" class="form-label">ชื่อ</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_name" id="" aria-describedby="basic-addon3" value="${name}">
                    </div>

                    <label for="basic-url" class="form-label">ราคา</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_price" id="" aria-describedby="basic-addon3" value="${price}">
                    </div>
                    <label for="basic-url" class="form-label">ประเภทรถตู้</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_type" id="" aria-describedby="basic-addon3" value="${type}">
                    </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onclick="save_edit_price(this);">Save changes</button>
              </div>
              </div>
          </div>
      </div>
  `;
  $('body').append(html);
  $('#modal_edit_price').modal('show');
}
async function save_edit_price(e=null) {
  let ID = $(e).closest('#modal_edit_price').attr('data-id');

  let name = $('.inp_edit_name').val();
  let price = $('.inp_edit_price').val();
  let type = $('.inp_edit_type').val();

  let data = {
    "ID" : ID,
    'name' : name,
    'price' : price,
    'type' : type,
  };
  let res = await ajax_save_edit_price(data);
  if (res['st'] == '1') {
    alert('บันทึกข้อมูล เรียบร้อย');
    $('#modal_edit_price').modal('hide');
    get_price_talbe();
  }else{
    alert('ไม่สามารถเซฟข้อมูล');
  }
}
function ajax_save_edit_price(data = {}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_price/save_edit_price.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}
