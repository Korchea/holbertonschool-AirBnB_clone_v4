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
