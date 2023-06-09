const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function convert_to_base64(element) {
   const file = element;
   return res = (await toBase64(file));
}

const signup = {
   
    save_signup :async function () { 
        let user = $('.inp-user').val();
        let pass = $('.inp-pwd').val();
        let name = $('.inp-fname').val();
        let lname = $('.inp-lname').val();
        let email = $('.inp-email').val();
        let phone = $('.inp-phone').val();
        let birth = $('.inp-birth').val();
        
        
         data = {
            'user' :user,
            'pass' :pass,
            'name' :name,
            'lname' :lname,
            'email' :email,
            'phone' :phone,
            'birth' :birth,
        };
        let res = await signup.ajax_save_signup(data);
    },  
    ajax_save_signup : function (data = {}){
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "post",
                url: "php/signup/save_signup.php",
                data: data,
                dataType: "json",
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },  
}