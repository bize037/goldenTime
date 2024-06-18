$(function() {

    // 현재 위치 버튼에 커서 올리면 '현재 위치' 메시지 뜨도록
    $('.curLocBtn').on('mouseenter', function() {
        $('.curLocInfo').css('display', 'block');
    });

    $('.curLocBtn').on('mouseleave', function() {
        $('.curLocInfo').css('display', 'none');
    });

    // 지역 옵션 바꾸는 함수
    function loadCity() {
        $("#city").empty();
        var local = $('#local').val();
        var url = "/cityOption?local=" + encodeURIComponent(local);
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(response) {
                var selectLocal = response.selectLocal;
                for (var i = 0; i < selectLocal.length; i++) {
                    $("#city").append('<option th:value=' + selectLocal[i].city + '>' + selectLocal[i].city + '</option>');
                }

                // 중복 제거
                var $selectElement = $("#city");
                var $options = $selectElement.find("option");

                $options.each(function(index) {
                  var $currentOption = $(this);
                  var $prevOption = $options.eq(index - 1);

                  if ($options.length == 1) {
                    console.log("한개");
                  } else if ($currentOption.text() === $prevOption.text()) {
                    $currentOption.remove();
                  }
                });
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }

    $(document).ready(function() {
        loadCity();
    });

    $("#local").change(function() {
        loadCity();
    });

});