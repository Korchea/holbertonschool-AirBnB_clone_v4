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

fetch('http://0.0.0.0:5001/api/v1/places_search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ data: {} }),
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((result) => {
      places_data.innerHTM = `
      <article>
        <div class="title_box">
          <h2>${result.name}</h2>
          <div class="price_by_night">${result.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${result.max_guest}</div>
          <div class="number_rooms">${result.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${result.number_bathrooms} Bathrooms</div>
        </div>
        <div class="description">
          ${result.description}
              </div>
      </article>`;
    });
  });
