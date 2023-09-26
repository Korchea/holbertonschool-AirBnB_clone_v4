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
