$(document).ready(function () {
    get_table_order();
    
});

async function get_table_order(){
    let res = await ajax_get_table_order();
    console.log(res);
    html_table_order(res);
    card_order_list(res);
}
function ajax_get_table_order(data = {}) {  
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/order/get_table_order.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}

function html_table_order(data = {}) {
    let html = "";
    $.each(data, function (i, v) {
        html_btn = `
                <div class="">
                
                <button type="button" class="btn btn-primary" data-id="${v['order_id']}" title="อัพโหลดหลักฐานชำระเงิน" onclick="modal_upload_pic(this);"><i class="fa fa-arrow-up-from-bracket"></i></button> 
                <button type="button" class="btn btn-danger"> <i class="fa fa-trash"></i></button> 

                </div>
            `;
        html += `
            <tr>
                <td align="center">${i + 1}</td>
                <td align="center">${v["order_number"]}</td>
                <td align="center">${v["brand"]}</td>
                <td align="center">${v["type"]}</td>
                <td align="center">${v["seat"]}</td>
                <td align="center">${v["price"]}</td>
                <td align="center">${v["date_start"]}</td>
                <td align="center">${v["st"]}</td>
                <td align="center">${html_btn}</td>
            </tr>
            `;
    });
    $("#table_main tbody").html(html);
    $("#table_main").DataTable();
}

function modal_upload_pic(e = null) {
    let ID = $(e).attr('data-id');
    $('#modal_upload_payment').remove();

    html = `
    <!-- Modal -->
    <div class="modal fade " id="modal_upload_payment" data-id="${ID}" tabindex="-1" aria-labelledby="modal_upload_paymentLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_upload_paymentLabel">View Order</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="col">
                      <label for="basic-url" class="form-label">รูป</label>
                      <div class="input-group mb-3">
                          <input type="file" class="form-control inp_file" id="" aria-describedby="basic-addon3">
                      </div>
                      <div class="test" style="width:100%">
                        <img id="blah" src="" style="width: 100%;" />
                      </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onclick="cancel_order(this);">Cancel Order</button>
                <button type="button" class="btn btn-primary" onclick="save_upload_order(this);">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    `;
    $("body").append(html);
    $("#modal_upload_payment").modal("show");
    $(".inp_file").resizeImg({
        mode: 1,
        val: 800, // 800px
    })
    $(".inp_file").change(function(){
        readURL(this);
    });
}

async function save_upload_order(e = null) {
    let ID = $(e).closest("#modal_upload_payment").attr("data-id");
    let file = $("#blah").attr('src');
    data = {
        ID : ID,
        file : file,
    }
    let res = await ajax_upload_payment_slip(data);
    if(res['st'] == '1'){
        get_table_order();
        $('#modal_upload_payment').modal('hide');
    }
}
function ajax_upload_payment_slip(data = {}){
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/order/save_payment_slip.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);

            }
        });
    });
}

function card_order_list(data = {}) {
    html = '';
    $.each(data, function (i, v) { 
        let brand = v['brand'];
        let model = v['model'];
        let date_end = v['date_end'];
        let date_start = v['date_start'];
        let order_id = v['order_id'];
        let order_number = v['order_number'];
        let order_st = v['order_st'];
        let pic = v['pic'];
        let price = v['price'];
        let seat = v['seat'];
        let payment_type = v['payment_type'];
        let button_html = '';
        if(order_st == '2'){
            if(payment_type == '1'){
                button_html = `<button data-id="${v['order_id']}" class="btn btn-primary float-end" onclick="modal_upload_pic(this);">ชำระเงิน</button>`;      
            }else{
                button_html = `<button data-id="${v['order_id']}" class="btn btn-primary float-end" onclick="modal_upload_pic(this);">ชำระค่ามัดจำ</button>`;      
            }
        }else{
            button_html = `<button data-id="${v['order_id']}" class="btn btn-info float-end" onclick="modal_upload_pic(this);">ตรวจสอบ</button>`;
        }
        html += `
            <div class="col">
                <div class="card">
                    <img style="" src="${pic}" />
                    <div class="card-body">
                        <h5 class="card-title">หมายเลขการจอง : ${order_number}</h5>
                        <div class="row">
                            <div class="col col-md-4 text-end"> ยี่ห้อ :</div>
                            <div class="col col-md-8">${brand}</div>

                            <div class="col col-md-4 text-end"> รุ่น :</div>
                            <div class="col col-md-8">${model}</div>

                            <div class="col col-md-4 text-end"> ที่นั่ง :</div>
                            <div class="col col-md-8">${seat}</div>

                            <div class="col col-md-4 text-end"> วันที่รับรถ :</div>
                            <div class="col col-md-8">${date_start}</div>

                            <div class="col col-md-4 text-end"> ถึงวันที่ : </div>
                            <div class="col col-md-8">${date_end}</div>
                        </div>
                        ${button_html}
                    </div>
                </div>
            </div>
        `;
    });

    $('.order-list').html(html);
}

async function cancel_order(e = null) {
    let ID = $(e).closest("#modal_upload_payment").attr("data-id");
    data = {
        ID : ID,
    }
    Swal.fire({
        title: 'ยกเลิกการจอง',
        text: "คุณต้องการยกเลิกการจองนี้หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText :'ยกเลิก',
      }).then(async (result) => {
        if (result.isConfirmed) {
            let res = await ajax_cancel_order(data);
            if(res['st'] == '1'){
                Swal.fire(
                    'ยกเลิก!',
                    'การยกเลิก สำเร็จ',
                    'success'
                );
                $('#modal_upload_payment').modal('hide');
                get_table_order();
            }
        }
      })

}

function ajax_cancel_order(data = {}) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/order/cancel_order.php",
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