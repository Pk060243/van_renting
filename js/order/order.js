$(document).ready(function () {
    get_table_order();
    
});

async function get_table_order(){
    let res = await ajax_get_table_order();
    console.log(res);
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

async function modal_upload_pic(e = null) {
    let ID = $(e).attr('data-id');
    let data = {'ID' : ID}
    let res = await ajax_get_view_order(data);
    console.log(res)
   
    let pic = res['payment_pic'];
    let order_no = res['order_number'];
    let date_start = res['date_start'];
    let date_end = res['date_end'];
    let plate = res['plate'];
    let model = res['model'];
    let brand = res['brand'];
    let price = res['price'];
    let html_deposit
    if( res['payment_type'] == '1'){
        html_deposit = '';
    }else if( res['payment_type'] == '2'){
        html_deposit = `<div style="margin-left:10px;"><label for="basic-url" class="form-label" >ค่ามัดจำ : ${price * 0.2}</label></div>`;
    }

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
            <div class ="row">
                    <div class ="col-md-6">
                        <label for="basic-url" class="form-label">รายละเอียดการเช่า</label>
                            <div style="margin-left:10px;"><label for="basic-url" class="form-label" >หมายเลขเช่า : ${order_no}</label></div>
                            <div style="margin-left:10px;"><label for="basic-url" class="form-label" >เช่าวันที่  : ${date_start} ถึง ${date_end}</label></div>
                            <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ยี่ห้อ : ${brand}</label></div>
                            <div style="margin-left:10px;"><label for="basic-url" class="form-label" >รุ่น : ${model}</label></div>
                            <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ราคา : ${price}</label></div>
                            ${html_deposit}
                    </div>
                    <div class ="col-md-6">
                        <img src="assets/images/paymentpic.png" width="350" height="350">
                    </div>
                
                </div>    
                <div class="col">
                      <label for="basic-url" class="form-label">อัพโหลดหลักฐานการชำระเงิน</label>
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

        let text_status_order = "";
        let button_html = '';
        if(order_st == '2'){
            text_status_order = 'ยังไม่ชำระเงิน';
            if(payment_type == '1'){
                button_html = `<button data-id="${v['order_id']}" class="btn btn-primary float-end" onclick="modal_upload_pic(this);">ชำระเงิน</button>`;       
            }else{
                button_html = `<button data-id="${v['order_id']}" class="btn btn-primary float-end" onclick="modal_upload_pic(this);">ชำระค่ามัดจำ</button>`;      
            }
        }else if(order_st == '1'){
            text_status_order = 'ยืนยันแล้ว';
            button_html = `<button data-id="${v['order_id']}" class="btn btn-info float-end" onclick="modal_view_order(this);">ตรวจสอบ</button>`;
        }else if(order_st == '3'){
            text_status_order ='รอการยืนยัน';
            button_html = `<button data-id="${v['order_id']}" class="btn btn-info float-end" onclick="modal_view_order(this);">ตรวจสอบ</button>`;
        }else if(order_st == '0'){
            text_status_order ='ถูกปฎิเสธ ';
            button_html = `<button data-id="${v['order_id']}" class="btn btn-info float-end" onclick="modal_view_order(this);">ตรวจสอบ</button>`;

        }
        html += `
            <div class="col">
                <div class="card">
                    <img style="" src="${pic}" />
                    <div class="card-body">
                        <h5 class="card-title">หมายเลขการเช่า : ${order_number} (${text_status_order})</h5>
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
        title: 'ยกเลิกการเช่า',
        text: "คุณต้องการยกเลิกการเช่านี้หรือไม่",
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

async function modal_view_order(e = null) {
    let ID = $(e).attr('data-id');
    let data = {'ID' : ID}
    let res = await ajax_get_view_order(data);
    modal_view_success_order(res);

    html_prepare_print_order(res);// สร้างข้อมูลสำหรับปริ้น
}

function ajax_get_view_order(data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/order/get_view_order.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}
function modal_view_success_order(data = {}) {
    console.log(data);
    $('#modal_view_success_order').remove();
    let pic = data['payment_pic'];
    let order_no = data['order_number'];
    let date_start = data['date_start'];
    let date_end = data['date_end'];
    let plate = data['plate'];
    let model = data['model'];
    let brand = data['brand'];
    let price = data['price'];
    let order_st = data['order_st'];

    let d_name = data['driver_name'];
    let d_lname = data['driver_lname'];
    let d_phone = data['driver_phone'];

    $html_button = '';
    if(order_st == '0'){
        $html_button = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        `;
    }else if(order_st == '1'){
        $html_button = `
            <button type="button" class="btn btn-secondary" onclick="printDiv('print-order-detail')" data-bs-dismiss="modal">Print</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" onclick="cancel_order(this);">Cancel Order</button>
        `;
    }else if(order_st == '2'){
        $html_button = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" onclick="cancel_order(this);">Cancel Order</button>
            <button type="button" class="btn btn-primary" onclick="save_upload_order(this);">Save changes</button>
        `;
    }else if(order_st == '3'){
        $html_button = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" onclick="cancel_order(this);">Cancel Order</button>
        `;
    }
    html = `
    <!-- Modal -->
    <div class="modal fade " id="modal_view_success_order" tabindex="-1" aria-labelledby="modal_view_success_orderLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_view_success_orderLabel">View Order</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="container">
            
                <div>
                    <label for="basic-url" class="form-label">รายละเอียดการเช่า</label>
                        <div style="margin-left:10px;"><label for="basic-url" class="form-label" >หมายเลขเช่า : ${order_no}</label></div>
                        <div style="margin-left:10px;"><label for="basic-url" class="form-label" >เช่าวันที่  : ${date_start} ถึง ${date_end}</label></div>
                        <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ยี่ห้อ : ${brand}</label></div>
                        <div style="margin-left:10px;"><label for="basic-url" class="form-label" >รุ่น : ${model}</label></div>
                        <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ราคา : ${price}</label></div>
                        <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ชื่อคนขับ : ${d_name} ${d_lname}</label></div>
                        <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ติดต่อคนขับ : ${d_phone}</label></div>
                </div>
                
                
                <label for="basic-url" class="form-label">หลักฐานการชำระเงิน</label>
                <div style="width:100%">
                    <img id="blah" src="${pic}" style="width: 100%;" />
                </div>
                
            </div>
        </div>
            <div class="modal-footer">                
                ${$html_button}
            </div>
            
        </div>
    </div>
    `;
    $("body").append(html);
    $("#modal_view_success_order").modal("show");
    $(".inp_file").resizeImg({
        mode: 1,
        val: 800, // 800px
    })
    $(".inp_file").change(function(){
        readURL(this);
    });
}

function html_prepare_print_order(data ={}) {
    let order_no = data['order_number'];
    let date_start = data['date_start'];
    let date_end = data['date_end'];
    let plate = data['plate'];
    let model = data['model'];
    let brand = data['brand'];
    let price = data['price'];
    let d_name = data['driver_name'];
    let d_lname = data['driver_lname'];
    let d_phone = data['driver_phone'];
    let seat = data['seat'];
console.log(data);
    let html = `

        <br> <div class="text-center"><h1>ขอบคุณลูกค้า ที่เช่ารถกับเรา</h1></div>
        <br> <div>หมายเลขการเช่า ${order_no}</div>
        <br><div>เช่ารถตั้งแต่วันที่ ${date_start}</div>
        <br><div>สิ้นสุดวันที่ ${date_end}</div>
        <br><div>รถยี่ห้อ ${brand}</div>
        <br><div>รุ่น ${model}</div>
        <br><div>จำนวนที่นั่ง  ${seat}</div>
        <br><div>จำนวนเงิน  ${price}</div>
        <br><div>พนักงานขับรถของคุณ ชื่อ  ${d_name} ${d_lname}</div>
        <br><div>โทร.  ${d_phone}</div>

    `;
    $('#print-order-detail').html(html);
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


async function printDiv(divName){
    await new Promise(resolve => {
        $('#modal_view_success_order').modal('hide');
        setTimeout(resolve, 500);
      });
    
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;

}


