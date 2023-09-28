$(document).ready(function () {
    let selectAmenities = {};

    $('input[type="checkbox"]').change(function () {
        let amenityID = $(this).data('id');
        let amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            selectAmenities[amenityID] = amenityName;
        } else {
            delete selectAmenities[amenityID];
        }

        let amenities = Object.values(selectAmenities).join(', ');
        if (amenities.length > 30) {
            amenities = amenities.substring(0, 30) + "...";
        }
        $('.amenities h4').text(amenities);
    });
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/v1/status/',
        success: function (data) {
            if (data.status === 'OK') {
                $('div#api_status').addClass('available');
            }
            else {
                $('div#api_status').removeClass();
            }
        }
    });
});