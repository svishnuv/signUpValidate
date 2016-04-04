$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip(); 
  $('[data-toggle="popover"]').popover(); 
  $('#signUpForm').validate({ // initialize the plugin
    errorClass: "text-warning",
    errorElement: "span",
    rules: {
      userName: {
        required: true,
        maxlength: 56,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      },
      confirmPassword: {
        required: true,
        minlength: 6,
        equalTo: '#password'
      },
      firstName: {
        required: true,
        lettersonly: true,
        maxlength: 50
      },
      lastName: {
        lettersonly: true,
        maxlength: 50
      },
      dob: {
        required: true,
        check_date_of_birth: true
      }
    },
    messages: {
      userName: {
        required: "Please enter an Email Address as User Name",
        maxlength: "Your username can have a max of 56 characters",
        email: "Example : like example@domain.com"
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long"
      },
      confirm_password: {
        equalTo: "Please enter the same password as above"
      },
      firstName: {
        required: "Please enter your First Name",
        maxlength: "Can Only contain a Max of 50 Letters"
      },
      lastName: {
        maxlength: "Can Only contain a Max of 50 Letters"
      },
      dob: {
        required: "Please enter your Birthday"
      }
    },
    submitHandler: function(form) {
      postSubmit();
  }

  });

  $.validator.addMethod("check_date_of_birth", function(value, element) {
    
    var inputDate = $("#dob").val();
    var splitDate = inputDate.split("-");
    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];

    var minAge = 14;
    var maxAge = 150;

    var mydate = new Date();
    mydate.setFullYear(year, month - 1, day);

    var currdate = new Date();
    currdate.setFullYear(currdate.getFullYear() - minAge);

    var maxRangeYear = new Date();
    maxRangeYear.setFullYear(currdate.getFullYear() + maxAge);

    return currdate > mydate && mydate < maxRangeYear;

  }, "You must be at least 14 years of age or you are way over 150 years!");

  var postSubmit = function() {
    
    
    var inDate = $("#dob").val().split("-");
    inDate = new Date(inDate);
    inDate = inDate.toISOString();
    $("#dob_ISO").val(inDate);
 
    //alert("Form Successfully Submitted");
    $('.formStatusContainer').html("<h3 class='alert alert-success'>Success</h3>");

    var data = JSON.stringify($("#signUpForm").serializeArray());

    console.log(data);

  }
  
  $('input#signUpFormReset').click(function(){
     $('.formStatusContainer').html("");
  })
});