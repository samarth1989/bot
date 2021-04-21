$(document).ready(function () {
    var jsonData = '';
    // FETCHING jsonData FROM JSON FILE 
    $.getJSON("static/property_complete.json",
        function (jsonData) {
            arrangeProps(jsonData)
        })
    $("#filterPrice").prop("disabled", "disabled");
});
//Making dynamic html code using the json data

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

//This sets the prices dropdown values based on type dropdown
function setOptions(dropDown, options) {
    // clear out any existing values
    dropDown.innerHTML = '';
    // insert the new options into the drop-down
    options.forEach(function (value) {
        dropDown.innerHTML += '<option name="' + value + '">' + value + '</option>';
    });
}

