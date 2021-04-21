

var propId = parseInt(getParameterByName('id'), 10) - 1;
var pid = getParameterByName('id');

//console.log(propId);

$(document).ready(function () {

    var dataJson = '';
    // FETCHING DATA FROM JSON FILE 
    $.getJSON("static/property_complete.json",
        function (data) {
            dataJson = data[propId].data;
            //console.log(dataJson);

            //displayPropDetail(dataJson);
            var alt = dataJson.listingName + "<br />" + ' County: ' + dataJson.county + ' Area: ' + dataJson.area + "<br />";
            var alt1 = dataJson.numBedroom + 'BHK' + ' For ' + 'Price: ' + dataJson.maxPrice;
            var mhtml = "";

            for (var i = 0; i < dataJson.photo.length; i++) {

                mhtml += '<img class="mySlides" src="' + dataJson.photo[i] + '"/>';
            }
            var mhtml1 = '<p>' + alt + '</p>';
            mhtml1 += '<p style="font-weight:bold;">' + alt1 + '</p>';
            mhtml1 += '<p>' + dataJson.description + '</p>';
            mhtml1 += '<a href=appointment?id=' + pid + ' class="buttonnn">Make Appointment</a>';
            //console.log(mhtml)
            $('#c123').append(mhtml);
            $('#c1234').append(mhtml1);
            var slideIndex = 1;
            showDivs(slideIndex);
        })
});
function getParameterByName(name, url = window.location.href) {

    //capture the query string params
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return (decodeURIComponent(results[2].replace(/\+/g, ' ')));
}
var slideIndex = 1;

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}