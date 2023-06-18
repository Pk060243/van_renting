$(document).ready(async function () {
    $(".date_flatpicker").flatpickr(
        {    
            dateFormat: "d/m/Y",
            mode : "range"
        }
    );
});

async function get_sales_report_table() {
    let date_range =  $('.date_flatpicker').val();
    var date_from = ''; //เริ่ม วันที่
    var date_to = ''; // ถึงวันที่
    
    //ดึงค่า ช่วงวันที่เลือก
    var dateRange = date_range;
    var dates = dateRange.split(" to "); //แยกวันที่ เป็น array ตำแหน่งที่ 0 กับ 1 
    date_from = dates[0]; //ตำแหน่งที่ 0 คือ วันที่เริ่ม
    date_to = !!dates[1] ? dates[1] : ''; //ตำแหน่งที่ 1 คือ ถึงวันที่ เขียนเป็น If สั้น (!!dates[1] หมายถึง arrayชื่อว่า dates ตำแหน่งที่ 1 มีค่าหรือไม่ )
    
    // ย่อมาจากแบบนี้
    // if (dates[1] != '') {
    //     date_to = dates[1];
    // }else{
    //     date_to = '';
    // }

    let st_approve = '';
    let st_rej = '';
    if($('#chk_success').is(':checked')){ //ช่องเช็คบ็อก ไอดีchk_success ถูกเช็คหรือไม่
        st_approve = '1';
    }

    if($('#chk_reject').is(':checked')){//ช่องเช็คบ็อก chk_reject ถูกเช็คหรือไม่
        st_rej = '1';
    }

    let data = { //ทำข้อมูลให้อยู่ในรูปแบบของ json หรือ array
        'date_from' : date_from,
        'date_to' : date_to,
        'st_approve' : st_approve,
        'st_rej': st_rej,
    }

    let res = await ajax_get_sale_report_table(data);
    html_table_sale_report(res['data']);
}

function ajax_get_sale_report_table (data = {}) {
   
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/admin_report/get_sale_report.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
            }
        });
    });
}
function  html_table_sale_report(data = {}) {
    html = '';

    let total = 0;
    if(data != 'no data' ){
        $.each(data, function (i, v) { 
            if(v['order_st'] == '2'){
                order_status = 'ยังไม่ชำระ';
            }else if(v['order_st'] == '3'){
                order_status = 'รอตรวจสอบ';
            }else if(v['order_st'] == '1'){
                order_status = 'เช่าสำเร็จ';
            }
            else if(v['order_st'] == '0'){
                order_status = 'ยกเลิก / ปฏิเสธ';
            }

            if(!!v['plate']){
                v['plate'] = v['plate'];
            }else{
                v['plate'] = 'ไม่มีข้อมูลรถ';
            }
            
            //สร้าง html เพื่อจะเอาไปใส่ในตาราง
            html += `
                <tr>
                    <td>${i+1}</td>
                    <td>${v['order_number']}</td>
                    <td>${v['plate']}</td>
                    <td>${v['Fname'] + " " +v['Lname']}</td>
                    <td>${v['order_date']}</td>
                    <td>${v['price']}</td>
                    <td>${order_status}</td>
                </tr>
            `;
            total += parseFloat(v['price']);
        });

        html += `<tr><td align="right" colspan="6">รวม : ${total}</td></tr>`;
    }else{
        html = `
            <tr>
                <td>No data...</td>
               
            </tr>
        `;
    }
    
    $('#table_main tbody').html(html); //$().html คือสั่งให้เปลี่ยนโค้ด HTML ที่อยู่ถายในตารางไอดี table_main > tbody เปลี่ยนเป้นค่าของ html ด้านบน
    $('#table_main_print tbody').html(html); //สำหรับช่องปริ้น

}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}