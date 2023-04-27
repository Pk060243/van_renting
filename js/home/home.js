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
    if(data['st'] == '1'){
      $.each(data['data'], function (i, v) {
        let test = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII`;
        let pic = v['pic'];
        console.log(pic);
        html += `
        <div class="col">
            <div class="card">
            <img style="height:250px;"src="data:image/png;base64,${pic}" />
                <div class="card-body">
                    <h5 class="card-title">รถตู้ 1</h5>
                    <div class="row">
                        <div class="col col-md-4 text-end"> ยี่ห้อ : </div>
                        <div class="col col-md-8"> ${v['brand']}</div>

                        <div class="col col-md-4 text-end"> รุ่น : </div>
                        <div class="col col-md-8"> ${v['model']}</div>

                        <div class="col col-md-4 text-end"> ที่นั่ง : </div>
                        <div class="col col-md-8"> ${v['seat']}</div>
                    </div>
                        <button data-id="${v['ID']}" class="btn btn-primary float-end">เช่าคันนี้</button>
                </div>
            </div>
        </div>
            `;
      });
      
    }else{
      html += `
           No data...
            `;
    }
    $(".van-detail").html(html);
    
  }

  