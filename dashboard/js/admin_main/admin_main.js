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
async function modal_approve_order(data = {}){
    //ดึงข้อมูลคนขับ มาเป้น select
    let driver_data = await ajax_get_driver();
    console.log(driver_data);
    let html_select_driver = '';
    let html_select_driver_option = '';
    if (driver_data['st'] != '0') {
        $.each(driver_data['data'], function (i, v) { 
            html_select_driver_option += `<option value="${v['ID']}">${v['fname'] +" "+ v['lname']}</option>`;
        });
    }
    html_select_driver += '<select class="form-select sel_driver ">';
    html_select_driver += html_select_driver_option;
    html_select_driver += '</select>';




    let ID = data['order_id'];
    let pic = data['payment_pic'];
    let html = '';
    $('#modal_approve_order').remove();
    html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_approve_order" data-id="${ID}" tabindex="-1" aria-labelledby="modal_approve_orderLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_approve_orderLabel">ยืนยันการจอง</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                    
                        <div>
                            <label for="basic-url" class="form-label">รายละเอียดการจอง</label>
                                <div><label for="basic-url" class="form-label"></label></div>
                                
                        </div>
                        <div class="col-md-6">
                            <label for="basic-url" class="form-label">เลือกคนขับ</label>
                            <div>${html_select_driver}</div>
                                
                        </div>
                        <label for="basic-url" class="form-label">หลักฐานการชำระเงิน</label>
                        <div style="width:100%">
                            <img id="blah" src="${pic}" style="width: 100%;" />
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-id="${data['order_id']}" onclick="confirm_order(this);">ยืนยัน</button>
                    <button type="button" class="btn btn-danger" data-id="${data['order_id']}" onclick="denied_order(this);">ปฎิเสธ</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>

                </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(html);
    $('#modal_approve_order').modal('show');
}
function ajax_get_driver(){
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/admin_main/get_driver.php",
            data: data,
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
        text: "คุณต้องการยืนยันการจองนี้หรือไม่",
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

function denied_order(e = null) {
    Swal.fire({
        title: 'ปฎิเสธการจอง',
        text: 'คุณต้องการ "ปฎิเสธ" รายการจองนี้หรือไม่',
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
            'การปฎิเสธรายการจอง สำเร็จ',
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

}
function modal_view_approve_order(data = {}){
     
    let ID = data['order_id'];
    let pic = data['payment_pic'];
    let html = '';
    $('#modal_view_approve_order').remove();
    html = `
        <!-- Modal -->
        <div class="modal fade " id="modal_view_approve_order" data-id="${ID}" tabindex="-1" aria-labelledby="modal_view_approve_orderLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_view_approve_orderLabel">ยืนยันการจอง</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                    
                        <div>
                            <label for="basic-url" class="form-label">รายละเอียดการจอง</label>
                                <div><label for="basic-url" class="form-label"></label></div>
                                
                        </div>
                        <label for="basic-url" class="form-label">หลักฐานการชำระเงิน</label>
                        <div style="width:100%">
                            <img id="blah" src="${pic}" style="width: 100%;" />
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>

                </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(html);
    $('#modal_view_approve_order').modal('show');
}