$(document).ready(function () {
  get_user_talbe();
  get_customer_talbe();

});
async function get_user_talbe() {
  let res = await ajax_get_user_table();
  html_admin_main_user(res);
  
}
function ajax_get_user_table(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_user/get_user_table.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
function html_admin_main_user(data) {
  let html = "";
  if(data['st'] == '1'){
    $.each(data['data'], function (i, v) {
      html_btn = `
              <div class="">
              
                  <button type="button" class="btn btn-primary" data-id="${v["ID"]}" onclick="user_edit(this);"> <i class="bi bi-pencil"></i> </button>
                  <button type="button" class="btn btn-danger" data-id="${v["ID"]}" onclick="user_delete(this);"> <i class="bi bi-trash"></i> </button>
  
              </div>
          `;
      html += `
          <tr>
              <td align="center">${i + 1}</td>
              <td align="center">${v["username"]}</td>
              <td align="center">${v["password"]}</td>
              <td align="center">${v["name"] + " " + v["lastname"]}</td>
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
async function get_customer_talbe(){
    let res = await ajax_get_customer_table();
    let html = html_customer_table(res);
}
function ajax_get_customer_table(data = {}){
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_user/get_cutomer_table.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
async function html_customer_table(data={}){
  console.log(data);
  html = '';
  $.each(data['data'], function (i, v) {
    let html_btn = `
      <div class="">
                  
        <button type="button" class="btn btn-primary" data-id="${v["ID"]}" onclick="showpic(this);"> <i class="bi bi-file-image"></i> </button>

      </div>
    `
    html += `
        <tr>
            <td align="center">${i + 1}</td>
            <td align="center">${v["Fname"]+' '+v['Lname']}</td>
            <td align="center">${v["phone"]}</td>
            <td align="center">${v["email"]}</td>
            <td align="center">${html_btn}</td>
        </tr>
        `;
  });

  await $('#table_customer tbody').html(html);
  $("#table_customer").DataTable();

}

async function showpic(e=null) {
  let ID = $(e).attr('data-id');
  let data = {'ID' : ID}
  let res = await ajax_get_pic_from_id(data);
  console.log(res);
  html_show_pic(res);
}
function ajax_get_pic_from_id(data = {}) {  
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_user/get_pic_from_id.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
function html_show_pic(data = {}) {
  html = '';
  $('#show_pic').remove();

  console.log(data);
  html = `
    <!-- Modal -->
    <div class="modal fade" id="show_pic" tabindex="-1" role="dialog" aria-labelledby="show_picLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="show_picLabel"> รูปบัตรประชาชนลูกค้า </h5>
          </div>
          <div class="modal-body">
            <img width="470"src = ${data['id_card_pic']}>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick ="$('#show_pic').modal('hide');">Close</button>
          </div>
        </div>
      </div>
  
  `;
  $('body').append(html);
  $('#show_pic').modal('show');
}




// delete user
async function user_delete(e) {
  let ID = $(e).attr("data-id");
  if (confirm("ลบข้อมูลผู้ใช้งานนี้หรือไม่ ?") == true) {
    let res = await ajax_user_delete({ ID: ID });
    get_user_talbe();
    alert('ลบข้อมูล สำเร็จ');
  } else {
  }
  
}
function ajax_user_delete(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_user/delete_user.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}


// save add user
function modal_add_user() {
  $('#modal_add_user').remove();
  let html = "";
  html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_add_user" tabindex="-1" aria-labelledby="modal_add_userLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_add_userLabel">เพิ่มผู้ดูแลระบบ</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                     
                      <label for="basic-url" class="form-label">Username</label>
                      <div class="input-group mb-3">
                          <input type="text" class="form-control inp_user" id="" aria-describedby="basic-addon3">
                      </div>
                      <label for="basic-url" class="form-label">Password</label>
                      <div class="input-group mb-3">
                          <input type="text" class="form-control inp_password" id="" aria-describedby="basic-addon3">
                      </div>

                      <label for="basic-url" class="form-label">ชื่อผู้ใช้</label>
                      <div class="input-group mb-3">
                          <input type="text" class="form-control inp_name" id="" aria-describedby="basic-addon3">
                      </div>

                      <label for="basic-url" class="form-label">นามสกุล</label>
                      <div class="input-group mb-3">
                          <input type="text" class="form-control inp_lastname" id="" aria-describedby="basic-addon3">
                      </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="save_user();">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(html);
    $('#modal_add_user').modal('show');
}
async function save_user(){
  let user = $('.inp_user').val();
  let password = $('.inp_password').val();
  let name = $('.inp_name').val();
  let lastname = $('.inp_lastname').val();

  let data = {
    'user' : user,
    'password' : password,
    'name' : name,
    'lastname' : lastname,
  };
  let res = await ajax_save_user(data);
  if (res['st'] == '1') {
    alert('บันทึกข้อมูล เรียบร้อย');
    $('#modal_add_user').modal('hide');
    get_user_talbe();
  }else{
    alert('ไม่สามารถเซฟข้อมูล');
  }
}
function ajax_save_user(data = {}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_user/save_user.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}

// edit
async function user_edit(e = null){
  let ID = $(e).attr('data-id');
  let res = await ajax_get_edit_user({'ID' : ID});
  modal_edit_user(res);
}
function ajax_get_edit_user(data={}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_user/get_edit_user.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}
function modal_edit_user(data = {}) {
  $('#modal_edit_user').remove();
  let ID = (!!data['ID'])? data['ID'] : '' ;
  let user = (!!data['username'])? data['username'] : '' ;
  let password = (!!data['password'])? data['password'] : '' ;
  let name = (!!data['name'])? data['name'] : '' ;
  let lastname = (!!data['lastname'])? data['lastname'] : '' ;



let html = "";
html = `
      <!-- Modal -->
      <div class="modal fade " id="modal_edit_user" data-id="${ID}" tabindex="-1" aria-labelledby="modal_edit_userLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modal_edit_userLabel">Edit user</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="container">
                    <label for="basic-url" class="form-label">Username</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_user" id="" aria-describedby="basic-addon3" value="${user}">
                    </div>

                    <label for="basic-url" class="form-label">Password</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_password" id="" aria-describedby="basic-addon3" value="${password}">
                    </div>

                    <label for="basic-url" class="form-label">ชื่อผู้ใช้งาน</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_name" id="" aria-describedby="basic-addon3" value="${name}">
                    </div>

                    <label for="basic-url" class="form-label">นามสกุล</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control inp_edit_lastname" id="" aria-describedby="basic-addon3" value="${lastname}">
                    </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onclick="save_edit_user(this);">Save changes</button>
              </div>
              </div>
          </div>
      </div>
  `;
  $('body').append(html);
  $('#modal_edit_user').modal('show');
}
async function save_edit_user(e=null) {
  let ID = $(e).closest('#modal_edit_user').attr('data-id');

  let user = $('.inp_edit_user').val();
  let password = $('.inp_edit_password').val();
  let name = $('.inp_edit_name').val();
  let lastname = $('.inp_edit_lastname').val();

  let data = {
    "ID" : ID,
    'user' : user,
    'password' : password,
    'name' : name,
    'lastname' : lastname,

  };
  let res = await ajax_save_edit_user(data);
  if (res['st'] == '1') {
    alert('บันทึกข้อมูล เรียบร้อย');
    $('#modal_edit_user').modal('hide');
    get_user_talbe();
  }else{
    alert('ไม่สามารถเซฟข้อมูล');
  }
}
function ajax_save_edit_user(data = {}){
  return new Promise(function (resolve, reject) {
      $.ajax({
        type: "post",
        url: "php/admin_user/save_edit_user.php",
        data: data,
        dataType: "json",
        success: function (response) {
          resolve(response);
        }
      });
  });
}
