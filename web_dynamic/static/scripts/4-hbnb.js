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
fetch('http://localhost:5001/api/v1/places_search', {
  method: 'POST',
  body: JSON.stringify({}),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const placesCont = document.querySelector('section.places');
    data.forEach(place => {
      const article = document.createElement('article');
      article.innerHTML = `
    <div class="title_box">
    <h2>${place.name}</h2>
    <div class="price_by_night">${place.price_by_night}</div>
  </div>
  <div class="information">
    <div class="max_guest">${place.max_guest}</div>
    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
  </div>
  <div class="description">
    ${place.description}
  </div>
  `;
      placesCont.appendChild(article);
    });
  })

fetch('http://localhost:5001/api/v1/places_search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
})
  .then((response) => response.json())
  .then((data) => {
    const placesSection = document.querySelector('section.places');
    placesSection.innerHTML = ''

    data.forEach((place) => {
      const article = document.createElement('article');
      article.innerHTML = `
      <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest}</div>
          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
        </div>
        <div class="description">${place.description}</div>
      `;
      placesSection.appendChild(article);
    });
  })
  .catch((error) => {
    console.error('Error', error);
  });
