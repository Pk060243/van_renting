<!doctype html>
<html lang="en" dir="ltr">

<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <title>Hope UI | Responsive Bootstrap 5 Admin Dashboard Template</title>

   <!-- Favicon -->
   <link rel="shortcut icon" href="assets/images/favicon.ico" />

   <!-- Library / Plugin Css Build -->
   <link rel="stylesheet" href="assets/css/core/libs.min.css" />


   <!-- Hope Ui Design System Css -->
   <link rel="stylesheet" href="assets/css/hope-ui.min.css?v=1.2.0" />

   <!-- Custom Css -->
   <link rel="stylesheet" href="assets/css/custom.min.css?v=1.2.0" />

   <!-- Dark Css -->
   <link rel="stylesheet" href="assets/css/dark.min.css" />

   <!-- Customizer Css -->
   <link rel="stylesheet" href="assets/css/customizer.min.css" />

   <!-- RTL Css -->
   <link rel="stylesheet" href="assets/css/rtl.min.css" />

</head>

<body class=" " data-bs-spy="scroll" data-bs-target="#elements-section" data-bs-offset="0" tabindex="0">
   <!-- loader Start -->
   <div id="loading">
      <div class="loader simple-loader">
         <div class="loader-body"></div>
      </div>
   </div>
   <!-- loader END -->

   <div class="wrapper">
      <section class="login-content">
         <div class="row m-0 align-items-center bg-white vh-100">
            <div class="col-md-4 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
               <img src="assets/images/auth/05.png" class="img-fluid gradient-main animated-scaleX" alt="images">
            </div>
            <div class="col-md-8">
               <div class="row justify-content-center">
                  <div class="col-md-12">
                     <div class="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                        <div class="card-body">
                           <!-- <a href="dashboard/main.php" class="navbar-brand d-flex align-items-center mb-3">
                              <svg width="30" class="" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                 <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                 <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                 <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                              </svg>
                              <h4 class="logo-title ms-3">Hope UI</h4>
                           </a> -->
                           <h2 class="mb-2 text-center">สมัครสมาชิค !</h2>
                           <div class="row">
                              <div class="col-sm-12 col-lg-12">
                                 <div class="card">
                                    <div class="card-header d-flex justify-content-between">
                                       <div class="header-title">
                                          <h4 class="card-title">กรอกช้อมูล</h4>
                                       </div>
                                    </div>
                                    <div class="card-body">
                                       <form id="form-wizard1" class="mt-3 text-center">
                                          <ul id="top-tab-list" class="p-0 row list-inline">
                                             <li class="mb-2 col-lg-3 col-md-6 text-start active" id="account">
                                                <a href="javascript:void();">
                                                   <div class="iq-icon me-3">
                                                      <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                                      </svg>
                                                   </div>
                                                   <span class="dark-wizard">บัญชีผูใช้</span>
                                                </a>
                                             </li>
                                             <li id="personal" class="mb-2 col-lg-3 col-md-6 text-start">
                                                <a href="javascript:void();">
                                                   <div class="iq-icon me-3">
                                                      <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                      </svg>
                                                   </div>
                                                   <span class="dark-wizard">ข้อมูล</span>
                                                </a>
                                             </li>
                                       
                                             <li id="confirm" class="mb-2 col-lg-3 col-md-6 text-start">
                                                <a href="javascript:void();">
                                                   <div class="iq-icon me-3">
                                                      <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                      </svg>
                                                   </div>
                                                   <span class="dark-wizard">เรียบร้อยแล้ว</span>
                                                </a>
                                             </li>
                                          </ul>
                                          <!-- fieldsets -->
                                          <fieldset>
                                             <div class="form-card text-start">
                                                <div class="row">
                                                   <div class="col-7">
                                                      <h3 class="mb-4">ข้อมูลบัญชีผู้ใช้</h3>
                                                   </div>
                                                   <div class="col-5">
                                                      <h2 class="steps">ขั้นที่ 1 - 4</h2>
                                                   </div>
                                                </div>
                                                <div class="row">
                                                   <div class="col-md-6">
                                                      <div class="form-group">
                                                         <label class="form-label">Username: *</label>
                                                         <input type="text" class="form-control inp-user" name="" placeholder="Username" autocomplete="off" />
                                                      </div>
                                                   </div>
                                                   <div class="col-md-6">
                                                      <div class="form-group">
                                                         <label class="form-label">Password: *</label>
                                                         <input type="password" class="form-control inp-pwd" name="" placeholder="password" autocomplete="off" />
                                                      </div>
                                                   </div>

                                                </div>
                                             </div>
                                             <button type="button" name="next" class="btn btn-primary next action-button float-end" value="Next">Next</button>
                                          </fieldset>
                                          <fieldset>
                                             <div class="form-card text-start">
                                                <div class="row">
                                                   <div class="col-7">
                                                      <h3 class="mb-4">ข้อมูลของท่าน:</h3>
                                                   </div>
                                                   <div class="col-5">
                                                      <h2 class="steps">ขั้นที่ 2 - 4</h2>
                                                   </div>
                                                </div>
                                                <div class="row">
                                                   <div class="col-md-6">
                                                      <div class="form-group">
                                                         <label class="form-label">ชื่อจริง: *</label>
                                                         <input type="text" class="form-control inp-fname" name="fname" placeholder="ชื่อจริง" />
                                                      </div>
                                                   </div>
                                                   <div class="col-md-6">
                                                      <div class="form-group">
                                                         <label class="form-label">นามสกุล: *</label>
                                                         <input type="text" class="form-control inp-lname" name="lname" placeholder="นามสกุล" />
                                                      </div>
                                                   </div>
                                                   <div class="col-md-6">
                                                      <div class="form-group">
                                                         <label class="form-label">Email: *</label>
                                                         <input type="text" class="form-control inp-email" name="email" placeholder="Email" />
                                                      </div>
                                                   </div>
                                                   <div class="col-md-6">
                                                      <div class="form-group">
                                                         <label class="form-label">เบอร์โทรศัพท์.: *</label>
                                                         <input type="text" class="form-control inp-phone" name="phone" placeholder="เบอร์โทรศัทพ์" />
                                                      </div>
                                                   </div>

                                                </div>
                                             </div>
                                             <button type="button" name="next" class="btn btn-primary next action-button float-end" value="Next">Next</button>
                                             <button type="button" name="previous" class="btn btn-dark previous action-button-previous float-end me-1" value="Previous">Previous</button>
                                          </fieldset>

                                          
                                          <fieldset>
                                             <div class="form-card">
                                                <div class="row">
                                                   <div class="col-7">
                                                      <h3 class="mb-4 text-left">Finish:</h3>
                                                   </div>
                                                   <div class="col-5">
                                                      <h2 class="steps">ขั้นที่ 4 - 4</h2>
                                                   </div>
                                                </div>
                                                <br><br>
                                                <h2 class="text-center text-success"><strong>SUCCESS !</strong></h2>
                                                <br>
                                                <div class="row justify-content-center">
                                                   <div class="text-center col-7">
                                                      <h5 class="text-center purple-text">สมัครสมาชิกเรียบร้อยแล้ว เข้าสู่ระบบได้เลย!</h5>
                                                   </div>
                                                </div>

                                                <br><br>
                                                <div class="row justify-content-center">
                                                   <div class="col-3"><a class="btn btn-primary" href="sign-in.php">เข้าสู่ระบบ</a></div>
                                                </div>
                                             </div>
                                          </fieldset>
                                       </form>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="sign-bg sign-bg-right">
                     <svg width="280" height="230" viewBox="0 0 421 359" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.05">
                           <rect x="-15.0845" y="154.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -15.0845 154.773)" fill="#3A57E8" />
                           <rect x="149.47" y="319.328" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 149.47 319.328)" fill="#3A57E8" />
                           <rect x="203.936" y="99.543" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 203.936 99.543)" fill="#3A57E8" />
                           <rect x="204.316" y="-229.172" width="543" height="77.5714" rx="38.7857" transform="rotate(45 204.316 -229.172)" fill="#3A57E8" />
                        </g>
                     </svg>
                  </div>
               </div>
            </div>
      </section>
   </div>

   <!-- Library Bundle Script -->
   <script src="assets/js/core/libs.min.js"></script>

   <!-- External Library Bundle Script -->
   <script src="assets/js/core/external.min.js"></script>

   <!-- Widgetchart Script -->
   <script src="assets/js/charts/widgetcharts.js"></script>

   <!-- mapchart Script -->
   <script src="assets/js/charts/vectore-chart.js"></script>
   <script src="assets/js/charts/dashboard.js"></script>

   <!-- fslightbox Script -->
   <script src="assets/js/plugins/fslightbox.js"></script>

   <!-- Settings Script -->
   <script src="assets/js/plugins/setting.js"></script>

   <!-- Slider-tab Script -->
   <script src="assets/js/plugins/slider-tabs.js"></script>

   <!-- Form Wizard Script -->
   <script src="assets/js/plugins/form-wizard.js"></script>

   <!-- AOS Animation Plugin-->

   <!-- App Script -->
   <script src="assets/js/hope-ui.js" defer></script>
   <script src="js/sign_up.js"></script>

</body>

</html>
<script>

</script>