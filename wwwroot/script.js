var len;
var results = '';

function apiSearch() {

    var query = document.getElementById('query').value;
    var params = {
        "q": query,
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "6fef27d11dac412484eb2526746684ad");
        },
        type: "GET",

    })

    .done(function (data) {
            var search = '';
            if (data.webPages && data.webPages.value && data.webPages.value.length > 0) {
                data.webPages.value.forEach(function (page) {
                    search += "<p><a href='" + page.url + "'>" + page.name + "</a>: " + page.snippet + "</p>";
                });
            } else {
                search = "<p>No results found.</p>";
            }

            $('#searchResults').html(search); 
            $('#searchResults').dialog(); 
        })
        .fail(function () {
            alert("error");
        });

}

function changeBackgroundImage() {
    var body = document.querySelector("body");
    var currentBackground = body.style.backgroundImage;

    if (currentBackground.includes('backgroundd.jpg')) {
        body.style.backgroundImage = "url('./img/backgroundd2.jpg')";
    }
    else if (currentBackground.includes('backgroundd2.jpg')) {
        body.style.backgroundImage = "url('./img/backgroundd3.jpg')";
    }
    else if (currentBackground.includes('backgroundd3.jpg')) {
        body.style.backgroundImage = "url('./img/backgroundd4.jpg')"
    }
    else {
        body.style.backgroundImage = "url('./img/backgroundd.jpg')";
    }
}

document.getElementById('searchEngineName').addEventListener('click', changeBackgroundImage);


function displayCurrentTime() {
    document.getElementById('showTimeButton').addEventListener('click', function () {
        var currentTime = new Date();
        var formattedTime = currentTime.getHours() + ':' + ('0' + currentTime.getMinutes()).slice(-2);
        document.getElementById('time').textContent = 'Current Time: ' + formattedTime;

        $("#time").dialog({
            title: "Current Time",
            modal: true,
            width: 300
        });
    });
}

document.getElementById('showTimeButton').addEventListener('click', function () {
    var timeDiv = document.getElementById('time');
    var currentTime = new Date();
    timeDiv.textContent = 'Current Time: ' + currentTime.toLocaleTimeString();
});

document.getElementById('searchButton').addEventListener('click', function () {
    apiSearch();
});


$(document).ready(function () {
    $('#searchEngineName').click(changeBackgroundImage); 
    $('#searchButton').click(apiSearch); 
    $('#showTimeButton').click(displayCurrentTime); 
});

document.getElementById('luckyButton').addEventListener('click', function () {
    apiSearch();
});