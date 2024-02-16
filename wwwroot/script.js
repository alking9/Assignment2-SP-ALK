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
        $('#searchResults').dialog({
            width: 400, // Set the width of the dialog box
            height: 400, // Let jQuery UI determine the height automatically
            position: { my: "center", at: "center", of: window }, // Position the dialog box at the center of the window
            resizable: true, // Disable resizing of the dialog box
            draggable: true, // Enable dragging of the dialog box
            modal: true // Make the dialog box modal (blocks interaction with the rest of the page)
        }); 
        })
        .fail(function () {
            alert("error");
        })

        .always(function () {
            // Reset the button text after the search is complete
            $('#searchButton').html('Search');
        });

}
document.getElementById('searchButton').addEventListener('click', function () {

    $('#searchButton').html('<span class="spinner-border spinner-border-sm"></span> Loading..');


    apiSearch();
});

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
    var currentTime = new Date();
    var formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('time').textContent = 'Current Time: ' + formattedTime;

    $("#time").dialog({
        title: "Current Time",
        modal: true,
        width: 300
    });
}

document.getElementById('showTimeButton').addEventListener('click', displayCurrentTime);

$(document).ready(function () {
    $('#searchEngineName').click(changeBackgroundImage); 
    $('#searchButton').click(apiSearch); 
    $('#showTimeButton').click(displayCurrentTime); 
});

document.getElementById('luckyButton').addEventListener('click', function () {
    apiSearch();
});