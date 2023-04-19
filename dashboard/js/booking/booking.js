const booking = {

    select_port: function () {
        $.ajax({
            type: "post",
            url: "../ajax_request/booking.php",
            data: "data",
            dataType: "text",
            success: function (response) {
                alert(response);
            }
        });
    },
    addconthtml : function () {
        let html_select = $('.td-sel-conttype').html();
        html = `
        <tr class="booking_container">
            <td>${html_select}</td>
            <td><input type="input" class="form-control form-control-sm inp-contqty" id="pwd2" placeholder=""></td>
            <td><input type="input" class="form-control form-control-sm inp-single-wieght" id="pwd2" placeholder=""></td>
            <td><input class="form-check-input inp-soc" type="checkbox" value="" id="flexCheckDefault"></td>
            <td><input class="form-check-input inp-ow" type="checkbox" value="" id="flexCheckDefault"></td>
            <td  onclick="booking.del_container_row(this);"><svg class="del-tr" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                    <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                </svg>
            </td>
        </tr>
        `;
        $('[name="container-tbl"]>tbody').append(html);
    },
    del_container_row : function (e = null) { 
        $(e).closest('tr').remove();
    },   
    validate_input : function(elements_class = []){
        valid_st = true;
       $.each(elements_class, function (k, v) { 
        if ($(v).val() == '' || $(v).val() == null || $(v).val() == undefined) {
            $(v).addClass('is-invalid');
            valid_st = false;
        }else{
            $(v).removeClass( 'is-invalid');
        }
       });
        
        
        return valid_st;
    },
    save_booking : async function () { 

        let valid = true;
        let bk_no = $('.inp-bkno').val();
        let shipper = $('.inp-shper').find(":selected").val();
        let shipterm = $('.inp-shptrm').find(":selected").val(); 
        let remark = $('.inp-rmk').val();
        let carrier = $('.inp-carrier').find(":selected").val(); 
        let port_recieve = $('.inp-prtrecieve').find(":selected").val();
        let port_load = $('.inp-prtload').find(":selected").val();
        let ts_port = $('.inp-ts_port').find(":selected").val();
        let port_delivery = $('.inp-delivery').find(":selected").val();
        let mother_vessel = $('.inp-M_vessel').val();
        let mother_voy_no = $('.inp-mother-voy-no').val();
        let feeder_vessel = $('.feeder_vessel').val();
        let feeder_voy_no = $('.inp-feeder_voy_no').val();
        let etd = $('.inp-etd').val();
        let eta = $('.inp-eta').val();

        let cy = $('.inp-cy' ).val();
        let rtn = $('.inp-rtn' ).val();

        let cargo_desc = $('.inp-cargodes').val();
        let hs_code = $('.inp-hscode').find(":selected").val();
        let cargo_type = $('.inp-cargo_type').find(":selected").val();
        let cargo_qty = $('.inp-cargo_qty').val();
        let cargo_gw = $('.inp-cargo_gw').val();
        let cargo_vol = $('.inp-cargo_vol').val();
        let cargo_marks = $('.inp-cargo_marks').val();
        datavalid = [
            '.inp-bkno',
            '.inp-shptrm',
            '.inp-carrier',
            '.inp-prtload',
            '.inp-ts_port',
            '.inp-etd',
            '.inp-cy',
            '.inp-rtn'
        ];
        valid = await booking.validate_input(datavalid);
        if (valid === false) {
            Swal.fire({
                'icon' : 'warning',
                'title' : 'Warning!',
                'text' : 'some of the inputs are blank please fill'
            });
        }

        return;
        
        
            //container section
        let container = [];
        $( ".booking_container").each(function( e ) {
            let cont_tmp = {};

            let type = $('.inp-container_type').find(":selected").val();
            let qty = $('.inp-contqty' , this).val();
            let weight = $('.inp-single-wieght' , this).val();
            let soc = $('.inp-soc:checked' , this).length > 0 ? '1' : '0' ;
            let ow = $('.inp-ow:checked' , this).length > 0 ? '1' : '0' ;
            

            cont_tmp = {
                'type' : type,
                'qty': qty,
                'weight' : weight,
                'soc' : soc,
                'ow' : ow,
                'cy' : cy,
                'rtn' : rtn
            }
            container.push(cont_tmp);
        });
        
        //end container section
        let data = {
            'bk_no' : bk_no,
            'shipper' : shipper,
            'shipterm' : shipterm,
            'remark' : remark,
            'carrier' : carrier,
            'port_recieve' :  port_recieve,
            'port_load' : port_load,
            'ts_port' : ts_port,
            'port_delivery' :port_delivery,
            'mother_vessel' : mother_vessel,
            'mother_voy_no' : mother_voy_no,
            'feeder_vessel' : feeder_vessel,
            'feeder_voy_no' : feeder_voy_no,
            'etd' : etd,
            'eta' : eta,
            'container' : container,

            'cargo_desc' : cargo_desc,
            'hs_code':hs_code,
            'cargo_type' :cargo_type,
            'cargo_qty' :cargo_qty,
            'cargo_gw' :cargo_gw,
            'cargo_vol' :cargo_vol,
            'cargo_marks':cargo_marks,
        }
       
        let res = await booking.ajax_save_booking(data);
        
    },
    ajax_save_booking : function (data = null) { 
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "post",
                url: "php//booking/saving_booking.php",
                data: data,
                dataType: "text",
                success: function (res) {
                    console.log(res);
                    resolve(res);
                    Swal.fire({
                        icon: 'success',
                        title: 'Complete',
                        text: res['res'],
                        })
                },
                error: function (error) {
                    reject(error)
                  },
            });
        })
    },
};
