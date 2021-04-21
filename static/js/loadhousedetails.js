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
var type = "";
var amount = "";
function showQuickReplies() {
    var quickRepliesData = ['Rent', 'Buy']
    let chips = "";
    for (let i = 0; i < quickRepliesData.length; i += 1) {
        const chip = `<div class="chip" data-payload='${quickRepliesData[i]}'>${quickRepliesData[i]}</div>`;
        chips += chip;
    }
    const quickReplies = `<div class="quickReplies">${chips}</div><div class="clearfix"></div>`;
    $(quickReplies).appendTo(".chats").fadeIn(1000);

    const terminalResultsDiv = document.getElementById("chats");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}
// on click of quickreplies, get the payload value and send
$(document).on("click", ".quickReplies .chip", function () {
    const text = this.innerText;
    if (text == "Click To View Results") {
        window.open("/filter?typee=" + type + "&price=" + amount + "", '_blank').focus();
        $(".quickReplies").remove();
        var initialText = "Do you need more assistance?";
        var userHtml = '<p class = "userText"><span>' + initialText + '</span></p>';
        $("#chatbox").append(userHtml);
        var quickRepliesData = ['Yes', 'No']
        let chips = "";
        for (let i = 0; i < quickRepliesData.length; i += 1) {
            const chip = `<div class="chip" data-payload='${quickRepliesData[i]}'>${quickRepliesData[i]}</div>`;
            chips += chip;
        }
        const quickReplies = `<div class="quickReplies">${chips}</div><div class="clearfix"></div>`;
        $(quickReplies).appendTo(".chats").fadeIn(1000);
        const terminalResultsDiv = document.getElementById("chats");
        terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
    }
    else if(text=="Thank You for contacting us! Have a nice day :)")
    {
        $(".quickReplies").remove();
        var userHtml = '<p class = "userText"><span>' + text + '</span></p>';
        $("#chatbox").append(userHtml);
    }
    else {
        const payload = this.getAttribute("data-payload");
        setUserResponse(text);
        getBotResponse(text);
        $(".quickReplies").remove();
    }
});
//Making dynamic html code using the json data
function chatProps(jsonData) {
    if (jsonData.length > 0) {
        for (var i = 0; i < jsonData.length; i++) {
            debugger;
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
function setUserResponse(message) {
    const user_response = `<img class="userAvatar" src="static/img/userAvatar.jpg"><p class="userMsg">${message} </p><div class="clearfix"></div>`;
    $("#chatbox").append(user_response);
    //scrollToBottomOfResults();
    //showBotTyping();
    $(".suggestions").remove();
}

function getBotResponse(message) {
    var rawText = message;
    $.get("/get", { msg: rawText }).done(function (data) {
        debugger;
        let quickRepliesData = [];
        let chips = "";
        if (data.startsWith("R-") || data.startsWith("B-")) {
            if (data.startsWith("R-")) {
                type = "rent";
                amount = data.split('-')[1];
                const chip = `<div class="chip">Click To View Results</div>`;
                chips += chip;
                const quickReplies = `<div class="quickReplies">${chips}</div><div class="clearfix"></div>`;
                $(quickReplies).appendTo(".chats").fadeIn(1000);
                const terminalResultsDiv = document.getElementById("chats");
                terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
            }
            else {
                type = "buy";
                amount = data.split('-')[1];
                const chip = `<div class="chip">Click To View Results</div>`;
                chips += chip;
                const quickReplies = `<div class="quickReplies">${chips}</div><div class="clearfix"></div>`;
                $(quickReplies).appendTo(".chats").fadeIn(1000);
                const terminalResultsDiv = document.getElementById("chats");
                terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
            }
        }
        else {
            let answ = data.split('\\n');
            answ.forEach(function (obj) {
                quickRepliesData.push(obj);
            });
            for (let i = 0; i < quickRepliesData.length; i += 1) {
                const chip = `<div class="chip" data-payload='${quickRepliesData[i]}'>${quickRepliesData[i]}</div>`;
                chips += chip;
            }
            const quickReplies = `<div class="quickReplies">${chips}</div><div class="clearfix"></div>`;
            $(quickReplies).appendTo(".chats").fadeIn(1000);
            const terminalResultsDiv = document.getElementById("chats");
            terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
        }
    });
}