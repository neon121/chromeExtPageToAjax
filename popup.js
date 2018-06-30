var url = 'http://path/to/ajax.php';

$(function() {
    $('#start').click(function() {
        $('#process').css('display', 'block');
        ajax();
    });
    $('#inspect').attr('href', url);
});


function ajax() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        function (tab) {
            chrome.tabs.sendMessage(
                tab[0].id,
                {action: "getDOM"},
                function (response) {
                    var http = new XMLHttpRequest();
                    var data = 'html=' + btoa(encodeURIComponent(response));
                    http.open('POST', url, true);
                    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    http.onreadystatechange = function () {
                        if (http.readyState == 4 && http.status == 200) {
                            $('#process').css('display', 'none');
                        }
                    }
                    http.send(data);
                }
            );
        }
    );
}