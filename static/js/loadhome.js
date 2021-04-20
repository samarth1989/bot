$(document).ready(function () {
    var jsonData = '';
    // FETCHING jsonData FROM JSON FILE 
    $.getJSON("static/property_complete.json",
        function (jsonData) {
            arrangeProps(jsonData)
        })
    $("#filterPrice").prop("disabled", "disabled");
});

//Filtering the houses from json based on the type filter selected and setting the values in price dropdown
function ddlTypeFunction() {
    var prices = {
        'show all': ['Show all'],
        'rent': ['Show all', '< \u20ac500', '< \u20ac1000', '< \u20ac1500', '< \u20ac2000', '< \u20ac2500'],
        'buy': ['Show all', '< \u20ac50000', '< \u20ac100000', '< \u20ac150000', '< \u20ac200000', '< \u20ac300000']
    }

    // just grab references to the two drop-downs
    inputType = document.getElementById("filterType");
    inputPrice = document.getElementById("filterPrice");

    valF = inputType.options[inputType.selectedIndex].text.toLowerCase();


    // populate the prices drop-down 
    setOptions(inputPrice, prices[valF]);

    $.getJSON("static/property_complete.json",
        function (jsonData) {
            filteredJson = jsonData;
            //console.log(valF);
            if (valF != 'show all') {
                filteredJson = jsonData.filter(item => (item.data.type.toLowerCase() == valF));
                $("#filterPrice").removeAttr("disabled");
            }
            else {
                $("#filterPrice").prop("disabled", "disabled");
            }
            //console.log(filteredJson.length)
            $("#mydiv").html("");
            arrangeProps(filteredJson);
        })
}


//Filtering the houses from json based on the type and prices filter selected by retaining the values in price dropdown
function ddlPricesFunction() {

    // just grab references to the two drop-downs
    inputType = document.getElementById("filterType");
    inputPrice = document.getElementById("filterPrice");

    valF = inputType.options[inputType.selectedIndex].text.toLowerCase();
    valPr = inputPrice.options[inputPrice.selectedIndex].text.toLowerCase();

    //console.log(valPr.slice(3));

    $.getJSON("static/property_complete.json",
        function (jsonData) {
            //console.log(valF);
            filteredJson = jsonData.filter(item => (item.data.type.toLowerCase() == valF));
            //console.log(valPr.slice(3));
            if (valPr.toLowerCase() != 'show all')
                filteredJson = filteredJson.filter(item => (parseInt(item.data.maxPrice) < valPr.slice(3)));
            //console.log(filteredJson.length);
            $("#mydiv").html("");
            arrangeProps(filteredJson);
        })
}


//Making dynamic html code using the json data

function arrangeProps(jsonData) {
    if (jsonData.length > 0) {
        for (var i = 0; i < jsonData.length; i++) {
            var mhtml = "";
            //console.log(jsonData[i].id);
            var alt = 'Address: ' + jsonData[i].data.address + "<br />" + ' County: ' + jsonData[i].data.county + ' Area: ' + jsonData[i].data.area + "<br />";
            var alt1 = jsonData[i].data.numBedroom + 'BHK' + ' For ' + jsonData[i].data.type + ' Price: ' + jsonData[i].data.maxPrice;
            mhtml += '<div class="imgDiv"><a href="housedetails.html?id=' + jsonData[i].id + '"><img src="' + jsonData[i].data.photo[0] + '" href="HouseDetails.html?id=' + jsonData[i].id + '"/></a>';
            mhtml += '<a href="HouseDetails.html?id=' + jsonData[i].id + '" style="color:blue;font-weight:15pt;">' + alt + '</a>';
            mhtml += '<a href="HouseDetails.html?id=' + jsonData[i].id + '">' + alt1 + '</a></div>';
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

