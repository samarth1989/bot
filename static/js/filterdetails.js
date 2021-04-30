

var price = parseInt(getParameterByName('price'));
var typee = getParameterByName('type');

//console.log(propId);

$(document).ready(function () {

    var dataJson = '';
    // FETCHING DATA FROM JSON FILE 
    $.getJSON("static/property_complete.json",
        function (jsonData) {
            filteredJson = jsonData.filter(item => (item.data.type.toLowerCase() == typee));
            filteredJson = filteredJson.filter(item => (parseInt(item.data.maxPrice) < price));
            //console.log(filteredJson.length);
            $("#mydiv").html("");
            chatProps(filteredJson);
            $(".quickReplies").remove();
            var initialText = "Thank You for contacting us :)";
            setBotResponse(initialText);
        })
});
function chatProps(jsonData) {
    if (jsonData.length > 0) {
        for (var i = 0; i < jsonData.length; i++) {
            var mhtml = "";
            //console.log(jsonData[i].id);
            var alt = 'Address: ' + jsonData[i].data.address + "<br />" + ' County: ' + jsonData[i].data.county + ' Area: ' + jsonData[i].data.area + "<br />";
            var alt1 = jsonData[i].data.numBedroom + 'BHK' + ' For ' + jsonData[i].data.type + ' Price: ' + jsonData[i].data.maxPrice;
            mhtml += '<div class="imgDiv"><a href=details?id=' + jsonData[i].id + '><img src="' + jsonData[i].data.photo[0] + '" href=details?id=' + jsonData[i].id + '/></a>';
            mhtml += '<a href=details?id=' + jsonData[i].id + ' style="color:blue;font-weight:15pt;">' + alt + '</a>';
            mhtml += '<a href=details?id=' + jsonData[i].id + '>' + alt1 + '</a></div>';
            $('#mydiv').append(mhtml);
        }
        $("#lblMsg").css('visibility', 'hidden');
    }
    else {
        var mhtml = "";
        mhtml += '<div class="lblDiv"><label class="lblMsg">Sorry!!! No properties available under this category</label></div>';
        $('#mydiv').append(mhtml);
    }
}
function arrangeProps(jsonData) {
    if (jsonData.length > 0) {
        for (var i = 0; i < jsonData.length; i++) {
            var mhtml = "";
            //console.log(jsonData[i].id);
            var alt = 'Address: ' + jsonData[i].data.address + "<br />" + ' County: ' + jsonData[i].data.county + ' Area: ' + jsonData[i].data.area + "<br />";
            var alt1 = jsonData[i].data.numBedroom + 'BHK' + ' For ' + jsonData[i].data.type + ' Price: ' + jsonData[i].data.maxPrice;
            mhtml += '<div class="imgDiv"><a href=details?id=' + jsonData[i].id + '><img src="' + jsonData[i].data.photo[0] + '" href=details?id=' + jsonData[i].id + '/></a>';
            mhtml += '<a href=details?id=' + jsonData[i].id + ' style="color:blue;font-weight:15pt;">' + alt + '</a>';
            mhtml += '<a href=details?id=' + jsonData[i].id + '>' + alt1 + '</a></div>';
            $('#mydiv').append(mhtml);
        }
        $("#lblMsg").css('visibility', 'hidden');
    }
    else {
        var mhtml = "";
        mhtml += '<div class="lblDiv"><label class="lblMsg">Sorry!!! No properties available under this category</label></div>';
        $('#mydiv').append(mhtml);
    }
}

function getParameterByName(name, url = window.location.href) {

    //capture the query string params
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return (decodeURIComponent(results[2].replace(/\+/g, ' ')));
}
