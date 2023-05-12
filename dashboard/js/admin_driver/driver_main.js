$(document).ready(function () {
  get_driver_talbe();
});
async function get_driver_talbe() {
  let res = await ajax_get_driver_table();
  html_admin_main_driver(res);
}
function ajax_get_driver_table(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_driver/get_driver_table.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
function html_admin_main_driver(data) {
  let html = "";
  $.each(data, function (i, v) {
    html_btn = `
            <div class="">
                <button type="button" class="btn btn-primary" data-id="${v["ID"]}" onclick="driver_edit(this);"> <i class="bi bi-pencil"></i> </button>
                <button type="button" class="btn btn-danger" data-id="${v["ID"]}" onclick="driver_delete(this);"> <i class="bi bi-trash"></i> </button>
            </div>
        `;
    html += `
        <tr>
            <td align="center">${i + 1}</td>
            <td align="center">${v["fname"] + v['lname']}</td>
            <td align="center">${v["gender"]}</td>
            <td align="center">${v["phone"]}</td>
            <td align="center">${v["st"]}</td>
            <td align="center">${html_btn}</td>
        </tr>
        `;
  });
  $("#table_main tbody").html(html);
  $("#table_main").DataTable();
}

// delete driver
async function driver_delete(e) {
  let ID = $(e).attr("data-id");
  if (confirm("ลบข้อมูลรถ ?") == true) {
    let res = await ajax_driver_delete({ ID: ID });
    get_driver_talbe();
  } else {
  }
  alert(text);
}
function ajax_driver_delete(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_driver/delete_driver.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}

// save add driver
function modal_add_driver() {
  $("#modal_add_driver").remove();
  let html = "";
  html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_add_driver" tabindex="-1" aria-labelledby="modal_add_driverLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_add_driverLabel">Add driver</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                      <div class="row  row-cols-1 row-cols-md-2">
                        <div class="col">
                          <label for="basic-url" class="form-label">ชื่อ</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_fname" id="" aria-describedby="basic-addon3">
                          </div>
    
                          <label for="basic-url" class="form-label">นามสกุล</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_lname" id="" aria-describedby="basic-addon3">
                          </div>
    
                          <label for="basic-url" class="form-label">เบอร์โทร</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_phone" id="" aria-describedby="basic-addon3">
                          </div>
                          
                          <label for="basic-url" class="form-label">เพศ</label>
                          <div class="input-group mb-3">
                              <select class="form-select sel_gender">
                                <option value="M">ชาย</option>
                                <option value="F">หญิง</option>
                              </select>
                          </div>
                          
                          
                        </div>
                        <div class="col">
                          <label for="basic-url" class="form-label">รูปพนักงานขับรถ</label>
                          <div class="input-group mb-3">
                              <input type="file" class="form-control inp_file" id="" aria-describedby="basic-addon3">
                          </div>
                          <div style="width:100%">
                            <img id="blah" src="#" style="width: 100%;" />
                          </div>
                        </div>
                      </div>




                      
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="save_driver();">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    `;

    

  $("body").append(html);
  $("#modal_add_driver").modal("show");
  $(".inp_file").resizeImg({
    mode: 1,
    val: 100, // 800px
  })
  $(".inp_file").change(function(){
    readURL(this);
  });

}
async function save_driver() {
  let fname = $(".inp_fname").val();
  let lname = $(".inp_lname").val();
  let phone = $(".inp_phone").val();
  let gender = $(".sel_gender").val();
  let file = $("#blah").attr('src');

  let data = {
    fname:fname,
    lname:lname,
    phone:phone,
    gender:gender,
    file: file
  };
  let res = await ajax_save_driver(data);
  if (res["st"] == "1") {
    alert("บันทึกข้อมูล เรียบร้อย");
    $("#modal_add_driver").modal("hide");
    get_driver_talbe();
  } else {
    alert("ไม่สามารถเซฟข้อมูล");
  }
}
function ajax_save_driver(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_driver/save_driver.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}

// edit
async function driver_edit(e = null) {
  let ID = $(e).attr("data-id");
  let res = await ajax_get_edit_driver({ ID: ID });
  modal_edit_driver(res);
}
function ajax_get_edit_driver(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_driver/get_edit_driver.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
function modal_edit_driver(data = {}) {
  $("#modal_edit_driver").remove();

  
  let ID = !!data["ID"] ? data["ID"] : "";
  let fname = !!data["fname"] ? data["fname"] : "";
  let lname = !!data["lname"] ? data["lname"] : "";
  let gender = !!data["gender"] ? data["gender"] : "";
  let phone = !!data["phone"] ? data["phone"] : "";
  let pic = !!data["pic"] ? data["pic"] : "";
  console.log(pic);
  let html = "";
  html = `
      <!-- Modal -->
      <div class="modal fade " id="modal_edit_driver" data-id="${ID}" tabindex="-1" aria-labelledby="modal_edit_driverLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modal_edit_driverLabel">Edit driver</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="container">
                    <div class="row  row-cols-1 row-cols-md-2">
                      <div class="col">
                        <label for="basic-url" class="form-label">ชื่อ</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control inp_edit_fname" id="" aria-describedby="basic-addon3" value="${fname}">
                        </div>
    
                        <label for="basic-url" class="form-label">นามสกุล</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control inp_edit_lname" id="" aria-describedby="basic-addon3" value="${lname}">
                        </div>
    
                        <label for="basic-url" class="form-label">เพศ</label>
                        <div class="input-group mb-3">
                        <select class="form-select sel_gender">
                          <option value="M">ชาย</option>
                          <option value="F">หญิง</option>
                        </select>
                        </div>
                        
                        <label for="basic-url" class="form-label">เบอร์โทรศัพท์</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control inp_edit_phone" id="" aria-describedby="basic-addon3"value="${phone}">
                        </div>
                        
                       
                      </div>
                      <div class="col">
                        <label for="basic-url" class="form-label">รูป</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control inp_file" id="" aria-describedby="basic-addon3">
                        </div>
                        <div class="test" style="width:100%">
                          <img id="blah" src="${pic}" style="width: 100%;" />
                        </div>
                      </div>
                    </div>
                    
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onclick="save_edit_driver(this);">Save changes</button>
              </div>
              </div>
          </div>
      </div>
  `;
  $("body").append(html);
  $("#modal_edit_driver").modal("show");
  $('.sel_gender').val(gender);
  $(".inp_file").resizeImg({
    mode: 1,
    val: 800, // 800px
  })
  $(".inp_file").change(function(){
    readURL(this);
  });
}
async function save_edit_driver(e = null) {
  let ID = $(e).closest("#modal_edit_driver").attr("data-id");

  let fname = $(".inp_edit_fname").val();
  let lname = $(".inp_edit_lname").val();
  let gender = $(".inp_edit_gender").val();
  let phone = $(".inp_edit_phone").val();


  let data = {
    ID: ID,
    fname: fname,
    lname: lname,
    gender: gender,
    phone: phone,
    
  };
  let res = await ajax_save_edit_driver(data);
  if (res["st"] == "1") {
    alert("บันทึกข้อมูล เรียบร้อย");
    $("#modal_edit_driver").modal("hide");
    get_driver_talbe();
  } else {
    alert("ไม่สามารถเซฟข้อมูล");
  }
}
function ajax_save_edit_driver(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_driver/save_edit_driver.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}


function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
  }
}



