$(document).ready(function() {

  var datetime = null;
  var date = null;

  $(".add-text-btn").on("click", function(){
    // update timestamp
    var update = function (oldTime) {
      date = moment();
      $('.display-wrapper').find(".timestamp").html(`<div class="timestamp">${moment(oldTime).from(date)}</div>`);
    }

    // set up object
    let item = {};

    if ( $('input[type=checkbox]').is(':checked') ){
      item.key = sha256($(".user-input-title").val());
      item.value = sha256($(".user-input-title").val());
    } else {
      item.key = $(".user-input-title").val();
      item.value = $(".user-input-title").val();
    }
    
    let inputKey = item.key;
    let inputValue = item.value;

    // clear values
    $(".user-input-title").val("");
    $(".user-input-body").val("");

    // add to localStorage
    var addToObject = function(name, key, value) {
      var existing = localStorage.getItem(name);
      existing = existing ? JSON.parse(existing) : {};
      existing[key] = value;
      localStorage.setItem(inputKey, JSON.stringify(item));
    }
    addToObject(inputKey, inputKey, JSON.stringify(item));

    // append and display
    var timePassed = moment();
    let itemHtml = $(`<div class="display-wrapper fade-in-top" id="${inputKey}" data-storage-key="${inputKey}"><div class="display-item text-focus-in"> 
                      ${inputValue} <div class="timestamp">${timePassed.format('h:mm')}</div><a class="delete-item"><i class="far fa-trash-alt"></i></a>
                      <a class="add-comment"><i class="far fa-comment-dots"></i></a>
                      <a class="make-important"><i class="far fa-star"></i></a>
                      </div>
                    </div>`);
    $(".display").prepend(itemHtml);
    // setInterval(update, 1000, timePassed);

    // add comments
    $(`[id='${inputKey}']`).on('click', '.add-comment', function(){
      var commentField = `<input class="comment-input-body fade-in-bottom" placeholder="Enter the body of text"></input> <a class="add-comment-btn fade-in-bottom">send</a>`;
      $(`[id='${inputKey}']`).append(commentField);
      $(`.add-comment-btn`).on('click', function(){
        var comment = $(".comment-input-body").val();
        localStorage.setItem(comment, comment);
        $(".comment-input-body").remove();
        $(`.add-comment-btn`).remove();
        $(`[id='${inputKey}']`).append(`<div class="newcomments text-focus-in">${comment}</div>`);
      });
    })

    // mark as important
    $(`[id='${inputKey}']`).on('click', '.make-important', function(){
      $(`[id='${inputKey}']`).toggleClass('important');
    })

    // delete item
    $(`[id='${inputKey}']`).on('click', '.delete-item', function(){
      $(`[id='${inputKey}']`).toggleClass('puff-out-center').remove();
      localStorage.removeItem(inputKey);
    })

  


  })


   



  



    // $(".display-item").on("click", function(e){
    //   // plop the key:value back into the input boxes
    //   // get the values from the the divs?
    //   console.log("key=> ", e.target.dataset.storageKey); // user-input-title
    //   JSON.parse(localStorage.getItem(e.target.dataset.storageKey)); // user-input-body
    //   // set those values in the form fields
    //   $(".user-input-title").val(e.target.dataset.storageKey);
    //   $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
    // });





});




   // TODO add back in later
   // $(".user-input").on("keyup", function(){
   //   let inputValue = $(".user-input").val();
   //   localStorage.setItem("testStorage", inputValue);
   //   $(".display").text(localStorage.getItem("testStorage"));
   // });



//    $(".del-text-btn").on("click", function() {
//      localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
//      $(".user-input-title").val("");
//      $(".user-input-body").val("");
//      // clearing display? what if I have multiple items?
//      // after item is removed from local storage, redisplay items from local storage
//      // refresh from storage?
//    });


//    // iterative approach to adding items
//    // store data as stringified array of objects
//    // store data with individual keys
//   // how do we get keys? research Object.keys



// });