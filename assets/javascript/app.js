$('document').ready(function () {

    const APIkey = 'jcvWf6Wh12j6NKDPQw8Vyfb6x8GC7DiL';
    const limit = 10;

    let animals = [
        "Alligator", "Baboon", "Bat", "Bear", "Butterfly", "Camel", "Cat", "Cheetah", "Chicken", "Crab", "Crocodile", "Dog", "Dolphin", "Donkey", "Eagle", "Elephant", "Fish", "Flamingo", "Fox", "Frog", "Giraffe", "Goat", "Gorilla", "Hawk", "Hedgehog", "Horse", "Jellyfish", "Kangaroo", "Koala", "Lemur", "Lion", "Llama", "Manatee", "Monkey", "Moose", "Mouse", "Narwhal", "Octopus", "Ostrich", "Otter", "Owl", "Parrot", "Penguin", "Pig", "Porcupine", "Rabbit", "Raccoon", "Rhinoceros", "Shark", "Sheep", "Skunk", "Snake", "Tiger", "Turtle", "Whale", "Wolf", "Zebra"
    ]

    let currentAnimal;

    addButtonArray(animals, $('.btn-array'), 'animal-option btn btn-primary');

    $(document).on('click','.animal-pic',function() {
        console.log(currentAnimal);
    })

    $('.animal-option').on('click', function () {
        $('.results').empty();
        let selectedAnimal = $(this).text();
        currentAnimal = selectedAnimal;
        let ajaxCall = $.get("http://api.giphy.com/v1/gifs/search?q=" + selectedAnimal + "&api_key=" + APIkey + "&limit=" + limit);
        ajaxCall.done(function(data) { 
            // console.log("success got data", data, data.data.length); 
            data.data.forEach(function (element) {
                let newCard = $('<span>');
                let newCardBody = $('<div>');
                let newImage = $('<img>');
                newImage.attr('class','animal-pic');
                newImage.attr('src',element.images.fixed_height_still.url);
                newImage.attr('width',element.images.fixed_height_still.width);
                newImage.attr('height',element.images.fixed_height_still.height);
                newCard.attr('class','card animal-card');
                newCardBody.attr('class','card-body');
                newCardBody.append('Rating: ' + element.rating);
                newCard.append(newCardBody);
                newCard.append(newImage);
                $('.results').append(newCard)
            });
        });
    });


    $(document).on('click','#submitBtn', function () {
        event.preventDefault();
        animals.push($('#input-field').val());
        addButtonArray(animals, $('.btn-array'), 'animal-option btn btn-primary');
    });

    function addButtonArray(array, div, className) { 
        div.empty();
        array.forEach(function (element) {
            let btn = createButton(element, className);
            div.append(btn);
        });
    }

    function createButton(text, className) {
        let btn = $("<button>");
        btn.text(text);
        btn.attr("class", className);
        return btn;
    }

});