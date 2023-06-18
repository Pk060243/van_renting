$(document).ready(function () {
  get_profile();
});

async function get_profile() {
  let res = await ajax_get_profile();
  html_card_profile(res);
}

function ajax_get_profile(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/get_profile.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}

function html_card_profile(data = {}) {
  let html = "";
  let v = data["data"];
  let pic = v["id_card_pic"];
  html = `
    <div class="col">
        <div class="card" style="width: 550px; margin:0 auto; box-shadow: 5px 5px 6px #888888;">
        <img width="550"src="${pic}" />
            <div class="card-body">
                <h5 class="card-title">${""}</h5>
                <div class="row">
                    <div class="col col-md-4 text-end"> ชื่อจริง : </div>
                    <div class="col col-md-8"> ${v["Fname"]}</div>

                    <div class="col col-md-4 text-end"> นามสกุล : </div>
                    <div class="col col-md-8"> ${v["Lname"]}</div>

                    <div class="col col-md-4 text-end"> อีเมล : </div>
                    <div class="col col-md-8"> ${v["email"]}</div>

                    <div class="col col-md-4 text-end"> เบอร์โทร : </div>
                    <div class="col col-md-8"> ${v["phone"]}</div>
                </div>
                    <button data-id="${
                      v["ID"]
                    }" class="btn btn-warning float-end" onclick="prifile_edit(this);">แก้ไขข้อมูล</button>
            </div>
        </div>
    </div>
    `;

  $(".profile_detail").html(html);
}

async function prifile_edit(e = null) {
    let res = await ajax_get_profile();
    let data = res['data'];
    let Fname = data['Fname'];
    let Lname = data['Lname'];
    let phone = data['phone'];
    let email = data['email'];
    let pic = data['id_card_pic'];

    $("#modal_edit_profile").remove();
   
    html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_edit_profile" data-id="${data['ID']}" tabindex="-1" aria-labelledby="modal_edit_profileLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_edit_profileLabel">Edit van</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                      <div class="row  row-cols-1 row-cols-md-2">
                        <div class="col">
                          <label for="basic-url" class="form-label">ชื่อจริง</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_edit_Fname" id="" aria-describedby="basic-addon3" value="${Fname}">
                          </div>
      
                          <label for="basic-url" class="form-label">นามสกุล</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_edit_Lname" id="" aria-describedby="basic-addon3" value="${Lname}">
                          </div>
      
                          <label for="basic-url" class="form-label">เบอร์โทร</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_edit_phone" id="" aria-describedby="basic-addon3" value="${phone}">
                          </div>

                          <label for="basic-url" class="form-label">อีเมล</label>
                          <div class="input-group mb-3">
                              <input type="text" class="form-control inp_edit_email" id="" aria-describedby="basic-addon3" value="${email}">
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
                    <button type="button" class="btn btn-primary" onclick="save_edit_profile(this);">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    `;
    $("body").append(html);
    $("#modal_edit_profile").modal("show");
    $(".inp_file").resizeImg({
      mode: 1,
      val: 800, // 800px
    })
    $(".inp_file").change(function(){
      readURL(this);
    });
}

async function save_edit_profile(e=null){
    let ID = $(e).closest('#modal_edit_profile').attr('data-id');
    let Fname = $('.inp_edit_Fname').val();
    let Lname = $('.inp_edit_Lname').val();
    let phone = $('.inp_edit_phone').val();
    let email = $('.inp_edit_email').val();
    let pic = $('#blah').attr('src');

    let data = {
        'ID' : ID,
        'Fname' : Fname,
        'Lname' : Lname,
        'phone' : phone,
        'email' : email,
        'pic'  : pic ,
    }
    let res = await ajax_save_edit_profile(data);
    console.log(res);
    if(res['st'] == '1'){
      alert("แก้ไขข้อมูล สำเร็จ");
      get_profile();
    }
}

function ajax_save_edit_profile(data = {}){
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/save_edit_profile.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
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
