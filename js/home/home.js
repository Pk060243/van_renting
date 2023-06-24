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
      url: "php/van/get_van_table.php",
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
  if (data["st"] == "1") {
    console.log(sessionStorage);
    $.each(data["data"], function (i, v) {
      let test = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII`;
      let pic = v["pic"];
      html += `
      <div class="col">
        <div class="card">
        <img style="height:250px;"src="${pic}" />
            <div class="card-body">
                <h5 class="card-title">${v["brand"]}</h5>
                <div class="row">
                    <div class="col col-md-4 text-end"> ยี่ห้อ : </div>
                    <div class="col col-md-8"> ${v["brand"]}</div>

                    <div class="col col-md-4 text-end"> รุ่น : </div>
                    <div class="col col-md-8"> ${v["model"]}</div>

                    <div class="col col-md-4 text-end"> ที่นั่ง : </div>
                    <div class="col col-md-8"> ${v["seat"]}</div>
                </div>
                    <button data-id="${v["ID"]}" class="btn btn-primary float-end" onclick="order_detail(this);">เช่าคันนี้</button>
            </div>
        </div>
      </div>
        `;
    });
  } else {
    html += `
        No data...
        `;
  }
  $(".van-detail").html(html);
}

async function order_detail(e = null) {
  let ID = $(e).attr("data-id");
  let data = { ID: ID };
  let res = await ajax_get_van_order(data);
  let html = await modal_order_detail(res);
}
function ajax_get_van_order(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/order/get_van_detail.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}

function modal_order_detail(data = {}) {
  console.log(data);
  html_price = "";
  $.each(data, function (i, v) {
    van_id = v["van_id"];
    brand = v["brand"];
    model = v["model"];
    color = v["color"];
    seat = v["seat"];
    plate = v["plate"];
    type = v["type"];
    pic = v["pic"];
    picf = v["picf"];
    picl = v["picl"];
    picr = v["picr"];
    picb = v["picb"];
    price_id = v["price_id"];
    price_name = v["price_name"];
    price = v["price"];
    type_name = v["type_name"];
});
  $("#modal_order_detail").remove();
  html = "";
  html = `
      <!-- Modal -->
        <div class="modal fade " id="modal_order_detail" data-id="${van_id}" tabindex="-1" aria-labelledby="modal_order_detailLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal_order_detailLabel">เช่ารถ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row row-cols-1 row-cols-md-2">
                                <div class="col">
                                    <label for="basic-url" class="form-label">ป้ายทะเบียน</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control inp_plate" id="" aria-describedby="basic-addon3" value="${plate}">
                                    </div>
                
                                    <label for="basic-url" class="form-label">ยี่ห้อ</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control inp_brand" id="" aria-describedby="basic-addon3" value="${brand}">
                                    </div>
                
                                    <label for="basic-url" class="form-label">รุ่น</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control inp_model" id="" aria-describedby="basic-addon3" value="${model}">
                                    </div>
                                    
                                    <label for="basic-url" class="form-label">สี</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control inp_color" id="" aria-describedby="basic-addon3"value="${color}">
                                    </div>
                                    
                                    <label for="basic-url" class="form-label">จำนวนที่นั่ง</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control inp_seat" id="" aria-describedby="basic-addon3" value="${seat}">
                                    </div>
                
                                    <label for="basic-url" class="form-label">ประเภท</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control inp_type" id="" aria-describedby="basic-addon3" value="${type_name}">
                                    </div>
                                </div>
                                <div class="col">
                                    
                                    <div class="test" style="width:100%">
                                        <img id="blah" src="${pic}" style="width: 100%;" />
                                    </div>
                                    <div class="test" style="width:100%">
                                        <img id="blah" src="${picf}" style="width: 100%;" />
                                    </div>
                                    <div class="test" style="width:100%">
                                        <img id="blah" src="${picl}" style="width: 100%;" />
                                    </div>
                                    <div class="test" style="width:100%">
                                        <img id="blah" src="${picr}" style="width: 100%;" />
                                    </div>
                                    <div class="test" style="width:100%">
                                        <img id="blah" src="${picb}" style="width: 100%;" />
                                    </div>

                                    <label for="basic-url" class="form-label">วันที่เช่ารถ</label>
                                    <div class="form-group">
                                        <input type="text" class="form-control date_flatpicker" placeholder="Date Picker">
                                    </div>

                                    <h3>ราคาวันละ : ${price}</h3>
                                    <h4 style="color:red;">ค่าประกัน : ${'1,000'}</h4>
                                    <div>
                                        <label for="basic-url" class="form-label">ประเภทการชำระเงิน</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" class="form-check-input" name="pay_type" pay_type="1" id="radio1"
                                            checked="">
                                        <label for="radio1" class="form-check-label pl-2">ชำระเงินทั้งหมด</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" class="form-check-input" name="pay_type" pay_type="2" id="radio2">
                                        <label for="radio2" class="form-check-label pl-2">ชำระเงินวันที่รับรถ (มีค่ามัดจำ)</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="save_order_van(this);">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  $("body").append(html);
  $("#modal_order_detail").modal("show");
  $(".date_flatpicker").flatpickr({
    dateFormat: "d/m/Y",
    mode: "range",
  });

}

async function save_order_van(e = null) {
  let van_id = $(e).closest("#modal_order_detail").attr("data-id");
  let date = $(".date_flatpicker").val();

  let pay_type = $('input[name="pay_type"]:checked').attr("pay_type");
  var dateRange = date;
  var dates = dateRange.split(" to ");

  var date_from = dates[0];
  var date_to = dates[1];

  let data = {
    van_id: van_id,
    date_from: date_from,
    date_to: date_to,
    pay_type: pay_type,
  };
  Swal.fire({
    title: 'ยืนยัน?',
    text: "คุณยืนยันที่จะเช่ารถคันนี้หรือไม่",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'เช่าเลย!',
    cancelButtonText: 'ยกเลิก'

  }).then(async (result) => {
    if (result.isConfirmed) {
      let res = await ajax_save_order(data);

    if (res["st"] == "1") {
      alert(
        "คุณได้ทำการเช่ารถเรียบร้อยแล้ว กรุณาชำระเงินและอัพโหลดหลักฐานภายใน 30 นาที"
      );
      $("#modal_order_detail").modal("hide");
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      window.location.href = "order.php";
    }else if(res["st"] == "0"){
      alert(res['text']);
    }else if(res["st"] == "-1"){
      alert('กรุณาลงชื่อเข้าสู่ระบบ');
      // window.location.href = "sign-in.php";

    }
      
    }
  })
  
}

function ajax_save_order(data = {}) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "post",
      url: "php/order/save_orderhdr.php",
      data: data,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
    });
  });
}
