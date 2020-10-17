/** ************************* <MENU> ************************* **/
$('.menu-burger').click(function (event) {
    $('.menu-burger,.menu-body').toggleClass('active');
    $('body').toggleClass('lock');
});
$('.menu-link').click(function (event) {
    $('.menu-burger,.menu-body').removeClass('active');
    $('body').removeClass('lock');
});
/** ************************* <SCROLL> ************************* **/
window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;

    if (window.innerWidth > 768) {
        document.querySelectorAll('.page').forEach((el, i) => {
            if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance) {
                document.querySelectorAll('.menu-body a').forEach((el) => {
                    if (el.classList.contains('link')) {
                        el.classList.remove('link');
                    }
                });

                document.querySelectorAll('.menu-body li')[i].querySelector('a').classList.add('link');
            }
        });
    }
});
/** ************************* <POST> ************************* **/
 $(document).ready(function () {
     $(".menu-body").on("click", "a", function (event) {
         event.preventDefault();
         const id = $(this).attr('href'),
             top = $(id).offset().top;
         $('body,html').animate({
             scrollTop: top
         }, 1500);
     })
 });
 $('#up').click(function () {
     $('html, body').animate({
         scrollTop: 0
     }, 1000);
     return false;
 });
/** ************************* <POST> ************************* **/
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        // let formData = new FormData(form);
        // formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.classList.add('send');
            let response = await fetch('feedback.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('send');
            } else {
                alert('Error!');
                form.classList.remove('send');
            }
        } else {
            alert('Please enter your name and Email!');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');

        for(let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }


    function formAddError(input) {
        // input.parentElement.classList.add('error');
        input.classList.add('error');
    }
    function formRemoveError(input) {
        // input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});