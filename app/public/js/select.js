$(document).ready(function() {

    loadCountry();
    $('#country').change(function() {
        loadState($(this).find(':selected').val());
    });
    $('#state').change(function() {
        var curCountry = $('#country').find(':selected').val();
        var curState = $('#state').find(':selected').val();
        loadCity(curCountry, curState);
    });

    $('#country').change(function() {
        refreshSelect("#state", "Select State");
        refreshSelect("#city", "Select City");
    });
});

function loadCountry() {
    var myUrl = "data/countries.json";
    $.ajax({
        type: "GET",
        url: myUrl
    }).done(function(result) {
        renderSelect("#country", result, "Select Country");
    });
}

function loadState(countryId) {
    var myUrl = "/data/states/" + countryId + "/states.json";
    $.ajax({
        type: "GET",
        url: myUrl
    }).done(function(result) {
        renderSelect("#state", result, "Select State");
    }).fail(function(err) {
        refreshSelect("#state", "Select State");
        refreshSelect("#city", "Select City");
    });
}

function loadCity(countryId, stateId) {
    var myUrl = "/data/states/" + countryId + "/" + stateId + ".json";
    $.ajax({
        type: "GET",
        url: myUrl
    }).done(function(result) {
        renderSelect("#city", result, "Select City");
    }).fail(function(err) {
        refreshSelect("#city", "Select City");
    });
}

function renderSelect(id, result, placeHolder) {
    refreshSelect(id, placeHolder);
    // $(id).children().remove();
    $(result).each(function() {
        $(id).append($('<option>', {
            value: this.id,
            text: this.name
        }));
    });
}

function refreshSelect(id, placeHolder) {
    $(id).children().remove();
    $(id).append($('<option>', {
        value: "",
        text: placeHolder
    }));
}
