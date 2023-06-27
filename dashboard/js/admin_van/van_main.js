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
            
                <button type="button" class="btn btn-primary" data-id="${v["ID"]}" onclick="van_edit(this);"> <i class="bi bi-pencil"></i> </button>
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

// delete van
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

function ajax_get_van_type(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_van/get_select_van_type.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
// save add van
async function modal_add_van() {
  let type_select_data = await ajax_get_van_type(); // ดึงข้อมูลสำหรับช่อง select type van

  //สร้าง html สำรหับ <select>
  let html_selct_type_option = '';
  $.each(type_select_data, function (i, v) { 
    html_selct_type_option += `
      <option value="${v['ID']}">${v['type_name']}</option>
    `;
  });
  //สร้าง html สำรหับ <select>


  $("#modal_add_van").remove(); //ลบ Modal ที่ถูกสร้างขึ้นมาก่อนหน้า เพื่อป้องกันการเรียกซ้ำ Modal เดิม
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
                    <div class="container">
                      <div class="row  row-cols-1 row-cols-md-2">
                        <div class="col">
                          <label for="basic-url" class="form-label">ป้ายทะเบียน</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_plate" id="" aria-describedby="basic-addon3">
                          </div>
    
                          <label for="basic-url" class="form-label">ยี่ห้อ</label>
                          <div class="input-group mb-3">
                              <select class="form-control inp_brand">
                                <option value="Hyundai">Hyundai</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Lexus">Lexus</option>
                                <option value="Benz">Benz</option>
                                <option value="Volkswagen">Volkswagen</option>

                              </select>
                          </div>
    
                          <label for="basic-url" class="form-label">รุ่น</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_model" id="" aria-describedby="basic-addon3">
                          </div>
                          
                          <label for="basic-url" class="form-label">สี</label>
                          <div class="input-group mb-3">
                              <select class="form-control inp_color">
                                <option value="ขาว">ขาว</option>
                                <option value="ดำ">ดำ</option>
                                <option value="เทา">เทา</option>
                                <option value="น้ำตาล">น้ำตาล</option>
                              </select>
                          </div>
                          
                          <label for="basic-url" class="form-label">จำนวนที่นั่ง</label>
                          <div class="input-group mb-3">
                              <input type="number" class="form-control inp_seat" id="" aria-describedby="basic-addon3">
                          </div>
    
                          <label for="basic-url" class="form-label">ประเภท</label>
                          <div class="input-group mb-3">
                              <select class="form-select inp_type">
                                ${html_selct_type_option}
                              </select>
                          </div>

                          <label for="basic-url" class="form-label">คุณสมบัติพิเศษ</label>
                          <div class="input-group mb-3">
                            <textarea id="" name="" rows="4" cols="50" class="form-control inp_remark" aria-describedby="basic-addon3"></textarea>
                          </div>
                        </div>
                        <div class="col">
                          <label for="basic-url" class="form-label">รูปหลัก</label>
                          <div class="input-group mb-3">
                              <input type="file" class="form-control inp_file" id="" aria-describedby="basic-addon3">
                          </div>
                          <div style="width:100%">
                            <img id="blah" src="#" style="width: 100%;" />
                          </div>
                          <label for="basic-url" class="form-label">รูปด้านหน้า</label>
                          <div class="input-group mb-3">
                              <input type="file" class="form-control inp_filef" id="" aria-describedby="basic-addon3">
                          </div>
                          <div class="test" style="width:100%">
                            <img id="blahf" src="" style="width: 100%;" />
                          </div>
                          <label for="basic-url" class="form-label">รูปด้านซ้าย</label>
                          <div class="input-group mb-3">
                              <input type="file" class="form-control inp_filel" id="" aria-describedby="basic-addon3">
                          </div>
                          <div class="test" style="width:100%">
                            <img id="blahl" src="" style="width: 100%;" />
                          </div>
                          <label for="basic-url" class="form-label">รูปด้านขวา</label>
                          <div class="input-group mb-3">
                              <input type="file" class="form-control inp_filer" id="" aria-describedby="basic-addon3">
                          </div>
                          <div class="test" style="width:100%">
                            <img id="blahr" src="" style="width: 100%;" />
                          </div>
                          <label for="basic-url" class="form-label">รูปด้านหลัง</label>
                          <div class="input-group mb-3">
                              <input type="file" class="form-control inp_fileb" id="" aria-describedby="basic-addon3">
                          </div>
                          <div class="test" style="width:100%">
                            <img id="blahb" src="" style="width: 100%;" />
                          </div>
                        </div>


                        
                       
                      </div>




                      
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="save_van();">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    `;

    

  $("body").append(html);
  $("#modal_add_van").modal("show"); // สั่งเปิด Modal

  //เกี่ยวกับรูป
  $(".inp_file").resizeImg({
    mode: 1,
    val: 100, // 800px
  })
  $(".inp_file").change(function(){
    readURL(this);
  });
  $(".inp_filef").change(function(){
    readURLf(this);
  });
  $(".inp_filel").change(function(){
    readURLl(this);
  });
  $(".inp_filer").change(function(){
    readURLr(this);
  });
  $(".inp_fileb").change(function(){
    readURLb(this);
  });


}
async function save_van() {
  let plate = $(".inp_plate").val();
  let brand = $(".inp_brand").val();
  let model = $(".inp_model").val();
  let color = $(".inp_color").val();
  let seat = $(".inp_seat").val();
  let type = $(".inp_type").val();
  let file = $("#blah").attr('src');
  let picf = $("#blahf").attr('src');
  let picl = $("#blahl").attr('src');
  let picr = $("#blahr").attr('src');
  let picb = $("#blahb").attr('src');
  let inp_remark = $(".inp_remark").val();

  let data = {
    plate: plate,
    brand: brand,
    model: model,
    color: color,
    seat: seat,
    type: type,
    file: file,
    picf : picf,
    picl : picl,
    picr : picr,
    picb : picb,
    inp_remark:inp_remark,
  };
  let res = await ajax_save_van(data);
  if (res["st"] == "1") {
    alert("บันทึกข้อมูล เรียบร้อย");
    $("#modal_add_van").modal("hide");
    get_van_talbe();
  } else {
    alert("ไม่สามารถเซฟข้อมูล");
  }
}
function ajax_save_van(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_van/save_van.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}

// edit
async function van_edit(e = null) {
  let ID = $(e).attr("data-id");
  let res = await ajax_get_edit_van({ ID: ID });
  modal_edit_van(res);
}
function ajax_get_edit_van(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_van/get_edit_van.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
async function modal_edit_van(data = {}) {
  $("#modal_edit_van").remove();
  let type_select_data = await ajax_get_van_type();
  let html_selct_type_option = '';
  $.each(type_select_data, function (i, v) { 
    html_selct_type_option += `
    <option value="${v['ID']}">${v['type_name']}</option>
    `;
  });
  let ID = !!data["ID"] ? data["ID"] : "";
  let plate = !!data["plate"] ? data["plate"] : "";
  let brand = !!data["brand"] ? data["brand"] : "";
  let model = !!data["model"] ? data["model"] : "";
  let color = !!data["color"] ? data["color"] : "";
  let seat = !!data["seat"] ? data["seat"] : "";
  let type = !!data["type"] ? data["type"] : "";
  let pic = !!data["pic"] ? data["pic"] : "";
  let picf = !!data["picf"] ? data["picf"] : "";
  let picl = !!data["picl"] ? data["picl"] : "";
  let picr = !!data["picr"] ? data["picr"] : "";
  let picb = !!data["picb"] ? data["picb"] : "";
  let remark = !!data["remark"] ? data["remark"] : "";
  let html = "";
  html = `
      <!-- Modal -->
      <div class="modal fade " id="modal_edit_van" data-id="${ID}" tabindex="-1" aria-labelledby="modal_edit_vanLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modal_edit_vanLabel">Edit van</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="container">
                    <div class="row  row-cols-1 row-cols-md-2">
                      <div class="col">
                        <label for="basic-url" class="form-label">ป้ายทะเบียน</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control inp_edit_plate" id="" aria-describedby="basic-addon3" value="${plate}">
                        </div>
    
                        <label for="basic-url" class="form-label">ยี่ห้อ</label>
                        <div class="input-group mb-3">
                            <select class="form-control inp_edit_brand">
                                <option value="Hyundai">Hyundai</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Lexus">Lexus</option>
                                <option value="Benz">Benz</option>
                                <option value="Volkswagen">Volkswagen</option>

                              </select>
                        </div>
    
                        <label for="basic-url" class="form-label">รุ่น</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control inp_edit_model" id="" aria-describedby="basic-addon3" value="${model}">
                        </div>
                        
                        <label for="basic-url" class="form-label">สี</label>
                        <div class="input-group mb-3">
                          <select class="form-control inp_edit_color">
                            <option value="ขาว">ขาว</option>
                            <option value="ดำ">ดำ</option>
                            <option value="เทา">เทา</option>
                            <option value="น้ำตาล">น้ำตาล</option>
                          </select>
                        </div>
                        
                        <label for="basic-url" class="form-label">จำนวนที่นั่ง</label>
                        <div class="input-group mb-3">
                            <input type="number" class="form-control inp_edit_seat" id="" aria-describedby="basic-addon3" value="${seat}">
                        </div>
    
                        <label for="basic-url" class="form-label">ประเภท</label>
                        <div class="input-group mb-3">
                          <select class="form-select inp_edit_type">
                            ${html_selct_type_option}
                          </select>                        
                        </div>
                        <label for="basic-url" class="form-label">คุณสมบัติพิเศษ</label>
                          <div class="input-group mb-3">
                            <textarea id="" name="" rows="4" cols="50" class="form-control inp_remark"  aria-describedby="basic-addon3">${remark}</textarea>
                          </div>
                      </div>
                      <div class="col">
                        <label for="basic-url" class="form-label">รูปหลัก</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control inp_file" id="" aria-describedby="basic-addon3">
                        </div>
                        <div class="test" style="width:100%">
                          <img id="blah" src="${pic}" style="width: 100%;" />
                        </div>

                        <label for="basic-url" class="form-label">รูปด้านหน้า</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control inp_filef" id="" aria-describedby="basic-addon3">
                        </div>
                        <div class="test" style="width:100%">
                          <img id="blahf" src="${picf}" style="width: 100%;" />
                        </div>
                        <label for="basic-url" class="form-label">รูปด้านซ้าย</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control inp_filel" id="" aria-describedby="basic-addon3">
                        </div>
                        <div class="test" style="width:100%">
                          <img id="blahl" src="${picl}" style="width: 100%;" />
                        </div>
                        <label for="basic-url" class="form-label">รูปด้านขวา</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control inp_filer" id="" aria-describedby="basic-addon3">
                        </div>
                        <div class="test" style="width:100%">
                          <img id="blahr" src="${picr}" style="width: 100%;" />
                        </div>
                        <label for="basic-url" class="form-label">รูปด้านหลัง</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control inp_fileb" id="" aria-describedby="basic-addon3">
                        </div>
                        <div class="test" style="width:100%">
                          <img id="blahb" src="${picb}" style="width: 100%;" />
                        </div>
                      </div>
                    </div>
                    
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onclick="save_edit_van(this);">Save changes</button>
              </div>
              </div>
          </div>
      </div>
  `;
  $("body").append(html);
  $("#modal_edit_van").modal("show");
  $('.inp_edit_color').val(color);
  $('.inp_edit_brand').val(brand);
$(".inp_file").resizeImg({
    mode: 1,
    val: 800, // 800px
  })
  $(".inp_file").change(function(){
    readURL(this);
  });
  $(".inp_filef").change(function(){
    readURLf(this);
  });
  $(".inp_filel").change(function(){
    readURLl(this);
  });
  $(".inp_filer").change(function(){
    readURLr(this);
  });
  $(".inp_fileb").change(function(){
    readURLb(this);
  });

  $('.inp_edit_type').val(type)
}
async function save_edit_van(e = null) {
  let ID = $(e).closest("#modal_edit_van").attr("data-id");

  let plate = $(".inp_edit_plate").val();
  let brand = $(".inp_edit_brand").val();
  let model = $(".inp_edit_model").val();
  let color = $(".inp_edit_color").val();
  let seat = $(".inp_edit_seat").val();
  let type = $(".inp_edit_type").val();
  let pic = $("#blah").attr('src');
  let picf = $("#blahf").attr('src');
  let picl = $("#blahl").attr('src');
  let picr = $("#blahr").attr('src');
  let picb = $("#blahb").attr('src');
  let inp_remark = $(".inp_remark").val();
  let data = {
    ID: ID,
    plate: plate,
    brand: brand,
    model: model,
    color: color,
    seat: seat,
    type: type,
    pic : pic,
    picf : picf,
    picl : picl,
    picr : picr,
    picb : picb,
    inp_remark:inp_remark,

  };
  let res = await ajax_save_edit_van(data);
  if (res["st"] == "1") {
    alert("บันทึกข้อมูล เรียบร้อย");
    $("#modal_edit_van").modal("hide");
    get_van_talbe();
  } else {
    alert("ไม่สามารถเซฟข้อมูล");
  }
}
function ajax_save_edit_van(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/admin_van/save_edit_van.php",
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

function readURLf(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#blahf').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
function readURLl(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#blahl').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
function readURLr(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#blahr').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
function readURLb(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#blahb').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}



