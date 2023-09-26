$(document).ready(function () {
    // Initialize an empty array to store Amenity IDs
    let selectedAmenities = [];

    // Listen for changes on all checkboxes with class "checkbox"
    $(".checkbox").on("change", function () {
        let id = $(this).data('id');
        let name = $(this).data('name');

        if ($(this).is(":checked")) {
            // Checkbox is checked, add Amenity ID to the array
            selectedAmenities.push(name);
        } else {
            // Checkbox is unchecked, remove Amenity ID from the array
            const index = selectedAmenities.indexOf(name);
            if (index !== -1) {
                selectedAmenities.splice(index, 1);
            }
        }

        // Update the content of the <h4> element with the selected amenities
        $('.amenities h4').html(selectedAmenities.join(", "));
    });
});

$(document).ready(function () {
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data, status, xhr) {
        if (xhr.status >= 200 && xhr.status <= 299) {
            // API is available, add the "available" class
            $("div#api_status").addClass("available");
        } else {
            // API is not available, remove the "available" class
            $("div#api_status").removeClass("available");
        }
    });
});

