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
    var date_from = '';
    var date_to = '';
    
    //ดึงค่า ช่วงวันที่เลือก
    var dateRange = date_range;
    var dates = dateRange.split(" to ");
    date_from = dates[0];
    date_to = !!dates[1] ? dates[1] : '';
    let st_approve = '';
    let st_rej = '';

    if($('#chk_success').is(':checked')){
        st_approve = '1';
    }

    if($('#chk_reject').is(':checked')){
        st_rej = '1';
    }

    let data = {
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
    if(data != 'no data' ){
        $.each(data, function (i, v) { 
            if(v['order_st'] == '2'){
                order_status = 'ยังไม่ชำระ';
            }else if(v['order_st'] == '3'){
                order_status = 'รอตรวจสอบ';
            }else if(v['order_st'] == '1'){
                order_status = 'จองสำเร็จ';
            }
            else if(v['order_st'] == 'จ'){
                order_status = 'ยกเลิก / ปฏิเสธ';
            }
    
            html += `
                <tr>
                    <td>${i+1}</td>
                    <td>${v['order_number']}</td>
                    <td>${v['plate']}</td>
                    <td>${v['Fname'] + " " +v['Lname']}</td>
                    <td>${order_status}</td>
                </tr>
            `;
        });
    }else{
        html = `
            <tr>
                <td>No data...</td>
               
            </tr>
        `;
    }
    
    $('#table_main tbody').html(html);
    $('#table_main_print tbody').html(html);
}