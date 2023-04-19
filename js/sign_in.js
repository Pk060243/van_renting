async function signin (){   
   
    let user=$("#inp-user").val()
    let pass=$("#password").val()
    let res = await ajax_signin(user,pass);
    console.log(res);
    if(res['st'] == '1'){
        if(res['role'] == 'customer'){
            window.location.href = '/van_renting'; //relative to domain
        }else if(res['role'] == 'admin'){
            window.location.href = '/van_renting/dashboard/admin_main.php'; //relative to domain
        }
        

    }
    else{
        alert('username หรือ password ไม่ถูกต้อง อิอิ');
    }
}

function ajax_signin(user,pass){
    let data = {
        'User' : user,
        'Pass' : pass,
    }
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "php/signin.php",
            data: data,
            dataType: "json",
            success: function (response) {
                resolve(response);
                console.log(response);
            }
        });
    });

    


}