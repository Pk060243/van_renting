const login = {
    login: function() {
        let user = $('#email').val();
        let pass = $('#password').val();
        let data = {user,pass};
        $.ajax({
            type: "post",
            url: "../function/auth/check_login.php",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log(response);
                window.location.href = '../main_texplate_reserve.php';
                login.check_user_type(response);
            }
        });
    },
    check_user_type : function (obj = {}) {  
        
    },
  };