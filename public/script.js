'use strict';

let NEW_POSTS_URL ='/posts/new';
let DASHBOARD_URL ='/dashboard';

var cta = document.querySelector(".cta");
var check = 0;

cta.addEventListener('click', function(e){
    var text = e.target.nextElementSibling;
    var loginText = e.target.parentElement;
    text.classList.toggle('show-hide');
    loginText.classList.toggle('expand');
    if(check == 0)
    {
        cta.innerHTML = "<i class=\"fas fa-chevron-up\"></i>";
        check++;
    }
    else
    {
        cta.innerHTML = "<i class=\"fas fa-chevron-down\"></i>";
        check = 0;
    }
})


function newEntryButton() {
$('#new-submit-button').on('click', function() {
  e.preventDefault();i
displayPosts();  
})
}

function newPosts() {
$('#new-entry').on('click', function (e) {
  e.preventDefault();
  let dateInput = $(this).parent().find('#date').val();
  let locationInput = $(this).parent().find('#location').val();
  let textInput = $(this).parent().find('#text').val();

  let newDataInput = {
    'date': dateInput,
    'location': locationInput,
    'text': textInput,
    'id': _id
  };

  let htmlOutput = "";
$.ajax({
  method: 'POST',
  dataType: 'json',
  contentType: '/application/json',
  data: JSON.stringify(newDataInput),
  url: NEW_POSTS_URL
})

.done(function (data) {
  htmlOutput += `<div class="current-post">`;
  htmlOutput += `<input type="hidden" class="postId" value="${data._id}`;
  htmlOutput += `<h2>Date: </h2>`;
  htmlOutput += `<p class="post-date">${data.date}</p><br><br>`;
  htmlOutput += `<h2>Location: </h2>`;
  htmlOutput += `<p class="post-location">${data.location}</p><br><br>`;
  htmlOutput += `<h2>Insert Magic Here: </h2>`;
  htmlOutput += `<p class="post-text"> ${data.text}</p><br><br>`;
  htmlOutput += `</div>`;
  htmlOutput += `<button id="edit-button" class="post-edit-button">Edit</button>`;
  htmlOutput += `<button id="delete-button" class="post-delete-button">Delete</button>`;
  htmlOutput += `<button id="view-all-button" class="post-button">View All</button>`;
  $('.up-to-date-posts').html(htmlOutput);
  $('#new-posts').val("");
  $('#new-entry').addClass('hide-display');
  $('.up-to-date-posts').removeClass('hide-display')
})

.fail(function (jqXHR, error, errorThrown) {
console.log(jqXHR);
console.log(error);
console.log(errorThrown);
$('#new-posts').html('Error');
})
});
}

function displayPosts() {
  let dateInput = $(this).parent().find('#date').val();
  let locationInput = $(this).parent().find('#location').val();
  let textInput = $(this).parent().find('#text').val();

  let dataInput = {
    'date': dateInput,
    'location': locationInput,
    'text': textInput,
    '_id': idInput
  };
$.ajax({
  method: 'GET',
  url: DASHBOARD_URL
})
.done(function (dataInput) {
  if(dataInput != null && dataInput == 0) {
    $('#new-posts').html('<p>');
    return;
   }
  if(dataInput == null) {
    $('.up-to-date-posts').html('No Posts Found');
    return;
  }
});
let postInput = dataInput.map(function () { 
 return `<div id="entries"> 
  <input type="hidden" class="postID" value="${postInput._id}">
  <p class="post-info">Date:</p> <p class="post-text">${postInput.date}</p><br><br>
  <p class="post-info">Location:</p> <p class="post-text"> ${postInput.location}</p><br><br>
  <p class="post-info">Insert Magic</p> <p class="post-text"> ${postInput.text}</p><br><br>
  <div id="post-entry"><p class="post-info">Magic:</p> <p class="post-text"> ${postInput.text}</p></div><br><br>
  <button id="edit-button" class="post-button">Edit</button>
  <button id="delete-button" class="post-button">Delete</button>
  <button id="current-button" class="post-button">View</button>
  </div>`;
});

$('.up-to-date-posts').html(postInput);



function displayNewPostById() {
$('.up-to-date-posts').on('click', '#current-button', function () {
  let idParam = $(this).parent().find('.postId').val();
  $.ajax({
    method: 'POST',
    url: DASHBOARD_URL + idParam
  })
  .done(function (data) {
    let htmlOutput = "";
    htmlOutput += '<div class="current-post">';
    htmlOutput += '<input type="hidden" class="postId" value="';
    htmlOutput += data._id;
    htmlOutput += '">';
    htmlOutput += '<h2>Post: </h2>';
    htmlOutput += '<p class="post-date">';
    htmlOutput += data.date;
    htmlOutput += '</p><br><br>';
    htmlOutput += '<h2>Location: </h2>';
    htmlOutput += '<p class="post-location">';
    htmlOutput += data.location;
    htmlOutput += '</p><br><br>';
    htmlOutput += '<h2>Post: </h2>';
    htmlOutput += '<p class="post-text">';
    htmlOutput += data.text;
    htmlOutput += '</p><br><br>';
    htmlOutput += '</div>';
    htmlOutput += '<button id="edit-button" class="post-button">Edit</button>';
    htmlOutput += '<button id="delete-button" class="post-button">Delete</button>';
    htmlOutput += '<button id="view-all-button" class="post-button">View All</button>';
    $('.up-to-date-posts').html(htmlOutput);
  })
  .fail(function (jqXHR, error, errorThrown) {
    console.log(jqXHR);
    console.log(error);
    console.log(errorThrown);
    $('.up-to-date-posts').html('Nothing Found Here');
    $('#new-entry').removeClass('hide-display');
  })
})
}

function retrievePosts() {
$('.up-to-date-posts').on('click', '#edit-button', function () {
$('#new-entry').removeClass('hide-display');
$('#new-posts').addClass('hide-display');
let idParam = $(this).parent().find('.').val();
$.ajax({
  method: 'GET',
  url: DASHBOARD_URL + idParam,
  contentType: 'application/json'
})
.done(function (data) {
  $('#new-entry').html(`<form method="post" id="new-post">
                <input type="hidden" class="postId" value="${data._id}">
                <fieldset>
                <legend>Write A Post:</legend>
                <label>Date:</label><br>
                <input type="text" id="date" name="date" required value="${data.date}"><br>
                <label>Location:</label><br>
                <input type="text" id="location" name="location" value="${data.location}" required><br>
                <label>Post:</label><br>
                <textarea name="text" id="text" required>${data.text}</textarea><br>
                <button type="submit" id="update-button">Update</button>
                </fieldset>
                </form>`)
})
.fail(function(jqXHR, error, errorThrown) {
console.log(jqXHR);
console.log(error);
console.log(errorThrown);
$('.up-to-date-posts').html('Nothing Found');
})

});

}

function updatePosts() {
let idParam = $('#new-post').find('.postId').val();
let dateInput = $('#new-post').parent().find('#date').val();
let locationInput = $('#new-post').parent().find('#location').val();
let textInput = $('#new-post').parent().find('#text').val();
let newDataInput = {
  'date': dateInput,
  'location': locationInput,
  'text': textInput, 
};
let htmlOutput = "";

$.ajax({
  method: 'PUT',
  url: DASHBOARD_URL + idParam,
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify(newDataInput) 
})
.done(function (data) {
  htmlOutput += '<div class="current-post">';
  htmlOutput += '<input type="hidden" class="postId" value="';
  htmlOutput += idParam;
  htmlOutput += '">';
  htmlOutput += '<h2>Date: </h2>';
  htmlOutput += '<p class="post-date">';
  htmlOutput += data.date;
  htmlOutput += '</p><br><br>';
  htmlOutput += '<h2>Location: </h2>';
  htmlOutput += '<p class="post-location">';
  htmlOutput += data.location;
  htmlOutput += '</p><br><br>';
  htmlOutput += '<h2>Post: </h2>';
  htmlOutput += '<p class="post-text">';
  htmlOutput += data.text;
  htmlOutput += '</p><br><br>';
  htmlOutput += '</div>';
  htmlOutput += '<button id="edit-button" class="post-button">Edit</button>';
  htmlOutput += '<button id="delete-button" class="post-button">Delete</button>';
  htmlOutput += '<button id="view-all-button" class="post-button">View All</button>';
$('.up-to-date-posts').html(htmlOutput);
$('#new-entry').addClass('hide-display');
$('#new-posts').removeClass('hide-section')
})
.fail(function(jqXHR, error, errorThrown) {
  console.log(jqXHR);
  console.log(error);
  console.log(errorThrown);
})
}
function deletePosts() {
let idParam = $('div').find('.postId').val();
$.ajax({
  method: 'DELETE',
  url: DASHBOARD_URL + idParam,
  contentType: 'application/json',
  dataType: 'json'
})
.done(function () {
  console.log('deleting post');
  displayPosts();
})
.fail(function (jqXHR, error, errorThrown) {
  console.log(jqXHR);
  console.log(error);
  console.log(errorThrown);
  $('.new-posts').html('No Posts Found');
  $('#new-entry').removeClass('hide-display');
})
}

function handleDisplayPosts() {
$('#new-posts').on('click', function () {
  displayPosts();
  $('.up-to-date-posts').addClass('hide-display');
});
}

function handleDeletePosts() {
$('#new-posts').on('click','#delete-button', function () {
deletePosts();
});
}

function handleUpdatePosts() {
  $('#new-entry.').on('click','#update-button', function (e) {
    e.preventDefault();
  updatePosts();  
});
}

function handleNavAboutButton() {
$('.about-me').click(function () {
e.preventDefault();
$('.nav-about').show();
})
}

function handleNavPostsButton() {
$('.posts-link').click(function (e) {
  e.preventDefault();
  $('.up-to-date-posts').show();
})
}

function handleNavFunButton() {
$('.fun-stuff').click(function () {
  e.preventDefault();
  $('.nav-fun').show();
})
}

function handleNavThingsButton() {
$('.things-cool').click(function () {
  e.preventDefault();
$('.nav-things').show();
})
}

function handleLoginButton() {
$('.login-btn').click(function () {
  e.preventDefault();
  $('.main-page').show();
})
}

$('span').click(function() {
  $('.overlay').toggleClass('anim');
});

$('.animation').click(function(){
  $('.anim').toggleClass('reverse-animation');
})

$(function () {
  newEntryButton();
  newPosts();
  displayPosts();
  displayNewPostById();
  retrievePosts()
  updatePosts();
  deletePosts();
  handleDisplayPosts();
  handleDeletePosts();
  handleUpdatePosts();
  handleNavAboutButton();
  handleNavPostsButton();
  handleNavFunButton();
  handleNavThingsButton();
  handleLoginButton();
  handleRegisterButton();
})
}
