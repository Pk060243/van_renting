$(document).ready(function () {
    refresh_tables();
});
async function refresh_tables() {
    get_table_pending_order();
    get_table_approved_order();
    
}

async function get_table_pending_order(){
    let res = await ajax_get_table_pending_order();
    html_table_pending_order(res['data']);
}
function ajax_get_table_pending_order(){
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/admin_main/get_pending_order.php",
            data: {}    ,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}
async function html_table_pending_order(data = {}) {  
    html = "";
    let order_status = '';
    let html_approve_button = '';
    console.log(data);
    if(data == 'no data'){
        html = '<tr><td colspan="8" align="center">No data</td></tr>'
    }else{

    
        $.each(data, function (i, v) { 
            if(v['order_st'] == '2'){
                order_status = 'ยังไม่ชำระ';
            }else if(v['order_st'] == '3'){
                order_status = 'รอตรวจสอบ';
            }

            html_approve_button = `<button class="btn btn-primary" data-id="${v['order_id']}" onclick="approve_order(this)">ตรวจสอบ</button>`;
            html += `
                <tr>
                    <td>${i+1}</td>
                    <td>${v['order_number']}</td>
                    <td>${v['customer_full_name']}</td>
                    <td>${v['phone']}</td>
                    <td>${v['price']}</td>
                    <td>${v['order_date']}</td>
                    <td>${order_status}</td>
                    <td>${html_approve_button}</td>
                </tr>
            `;
        });
    }
    await $('#table_pending tbody').html(html);
    $("#table_pending").DataTable();

}
async function approve_order(e = null) {  
    let ID = $(e).attr('data-id');
    data = {'ID' : ID}
    let res = await ajax_get_approve_order_by_ID(data);
    modal_approve_order(res['data']);
}
function ajax_get_approve_order_by_ID(data = {}){
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/admin_main/get_order_by_id.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}

function ajax_get_driver(date_order){
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/admin_main/get_driver.php",
            data: date_order,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}
function confirm_order(e = null) {
    Swal.fire({
        title: 'ยืนยัน',
        text: "คุณต้องการยืนยันการเช่านี้หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText :'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
            confirm_approve_order(e);
        }
      })
}
async function confirm_approve_order(e= null){
    let ID = $(e).attr('data-id');
    let driver_id = $('.sel_driver option:selected').val();

    let data =
    {
        'ID':ID,
        'driver_id' : driver_id
    }

    let res = await ajax_approve_order(data);
    if(res['st'] == '1'){
        Swal.fire(
            'ยืนยันแล้ว!',
            'การยืนยันสำเร็จ',
            'success'
        );
        $('#modal_approve_order').modal('hide');
        refresh_tables();
    }
}
function ajax_approve_order(data ={}){
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/admin_main/approve_order.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}

//ปฎิเสธออเดอร์
function denied_order(e = null) {
    Swal.fire({
        title: 'ปฎิเสธการเช่า',
        text: 'คุณต้องการ "ปฎิเสธ" รายการเช่านี้หรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText :'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
            denied_approve_order(e);
          
        }
      })
}
async function denied_approve_order(e= null){
    let ID = $(e).attr('data-id');
    let data ={'ID':ID}
    let res = await ajax_denied_order(data);
    if(res['st'] == '1'){
        Swal.fire(
            'ปฎิเสธเรียบร้อย!',
            'การปฎิเสธรายการเช่า สำเร็จ',
            'success'
        );
        $('#modal_approve_order').modal('hide');
        get_table_pending_order();
    }
}
function ajax_denied_order(data ={}){
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/admin_main/denied_order.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}

async function get_table_approved_order(){
    let res = await ajax_get_table_approved_order();
    html_table_approved_order(res['data']);
}
function ajax_get_table_approved_order() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/admin_main/get_approved_order.php",
            data: {},
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}

async function html_table_approved_order(data = {}) {  
    html = "";
    let order_status = '';
    let html_approve_button = '';
    console.log(data);
    if(data == 'no data'){
        html = '<tr><td colspan="8" align="center">No data</td></tr>'
    }else{

    
        $.each(data, function (i, v) { 
            if(v['order_st'] == '1'){
                order_status = 'สำเร็จ';
            }

            html_approve_button = `<button class="btn btn-primary" data-id="${v['order_id']}" onclick="view_approved_order(this)">ตรวจสอบ</button>`;
            html += `
                <tr>
                    <td>${i+1}</td>
                    <td>${v['order_number']}</td>
                    <td>${v['customer_full_name']}</td>
                    <td>${v['phone']}</td>
                    <td>${v['price']}</td>
                    <td>${v['order_date']}</td>
                    <td>${order_status}</td>
                    <td>${html_approve_button}</td>
                </tr>
            `;
        });
    }
    await $('#table_approved tbody').html(html);
    $("#table_approved").DataTable();
}

async function view_approved_order(e = null) {
    let ID = $(e).attr('data-id');
    data = {'ID' : ID}
    let res = await ajax_get_approve_order_by_ID(data);
    modal_view_approve_order(res['data']);

    let res2 = await ajax_get_view_order(data);
    html_prepare_print_order(res2);

}
function modal_view_approve_order(data = {}){
     
    let ID = data['order_id'];
    let pic = data['payment_pic'];
    let order_no = data['order_number'];
    let van_plate = data['van_plate'];
    let date_start = data['date_start'];
    let date_end = data['date_end'];
    let customer_full_name = data['customer_full_name'];
    let phone = data['phone'];
    let price = data['price'];
    let payment_type = data['payment_type'];
    if(payment_type == '1'){
        text_payment = 'จ่ายเต็มจำนวน';
    }else{
        text_payment = 'จ่ายมัดจำ';
    }
    let html = '';
    $('#modal_view_approve_order').remove();
    html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_view_approve_order" data-id="${ID}" tabindex="-1" aria-labelledby="modal_view_approve_orderLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_view_approve_orderLabel">ยืนยันการเช่า</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                    
                        <div>
                            <label for="basic-url" class="form-label">รายละเอียดการเช่า</label>
                                <div style="margin-left:10px;"><label for="basic-url" class="form-label" >หมายเลขเช่า : ${order_no}</label></div>
                                <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ทะเบียนรถ : ${van_plate}</label></div>
                                <div style="margin-left:10px;"><label for="basic-url" class="form-label" >เช่าวันที่ : ${date_start} ถึง ${date_end}</label></div>
                                <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ชื่อลูกค้า : ${customer_full_name}</label></div>
                                <div style="margin-left:10px;"><label for="basic-url" class="form-label" >เบอร์โทร : ${phone}</label></div>
                                <div style="margin-left:10px;"><label for="basic-url" class="form-label" >ราคา : ${price}</label></div>
                                <div style="margin-left:10px;"><label for="basic-url" class="form-label" >การจ่ายเงิน : ${text_payment}</label></div>

                        </div>
                        <label for="basic-url" class="form-label">หลักฐานการชำระเงิน</label>
                        <div style="width:100%">
                            <img id="blah" src="${pic}" style="width: 100%;" />
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="printDiv('print-order-detail')" data-bs-dismiss="modal">Print</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>

                </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(html);
    $('#modal_view_approve_order').modal('show');
}
function ajax_get_view_order(data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "../php/order/get_view_order.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}
function html_prepare_print_order(data ={}) {
    console.log(data);
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
    let html = `
        <br> <div class="text-center"><h4>ใบเสร็จชำระเงิน</h4></div>
        <div class="text-center"><h4>บริษัท Van_renting</h4></div>
        <div class="text-center"><h4>1234/43 ถนนบางนา-ตราด</h4></div>
        <div class="text-center"><h4>แขวงบางนา เขตบางนา กรุงเทพฯ</h4></div>
        <br> <div>หมายเลขการเช่า ${order_no}</div>
        <div>เช่ารถตั้งแต่วันที่ ${date_start}</div>
        <div>สิ้นสุดวันที่ ${date_end}</div>



        <div style="margin:35px auto;width:90%;height:350px; border:2px solid;">
            <div style="display:inline-flex; width:100%;" >
                <div style="border:2px solid;width:25%; text-align:center;">ยี่ห้อ</div>
                <div style="border:2px solid;width:25%; text-align:center;">รุ่น</div>
                <div style="border:2px solid;width:25%; text-align:center;">จำนวนที่นั่ง</div>
                <div style="border:2px solid;width:25%; text-align:center;">จำนวนเงิน</div>
                
            </div>

            <div style="margin-top:20px; display:inline-flex; width:100%;" >
                <div style="width:25%; text-align:center;">${brand}</div>
                <div style="width:25%; text-align:center;">${model}</div>
                <div style="width:25%; text-align:center;">${seat}</div>
                <div style="width:25%; text-align:center;">${price}</div>
                
            </div>
        </div>

        <br> <div class="text-end"><h4>จำนวณเงิน : ${price} บาท</h4></div>
        <br> <div class="text-end"><h4>ขอบพระคุณ ที่ไว้ใจ และใช้บริการ</h4></div>

        



       

    `;
    $('#print-order-detail').html(html);
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