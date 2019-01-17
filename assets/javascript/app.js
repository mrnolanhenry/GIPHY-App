$('document').ready(function () {

    const APIkey = 'jcvWf6Wh12j6NKDPQw8Vyfb6x8GC7DiL';
    const limit = 10;

    let animals = [
        "Alligator", "Baboon", "Bat", "Bear", "Butterfly", "Camel", "Cat", "Cheetah", "Chicken", "Crab", "Crocodile", "Dog", "Dolphin", "Donkey", "Eagle", "Elephant", "Fish", "Flamingo", "Fox", "Frog", "Giraffe", "Goat", "Gorilla", "Hawk", "Hedgehog", "Horse", "Jellyfish", "Kangaroo", "Koala", "Lemur", "Lion", "Llama", "Manatee", "Monkey", "Moose", "Mouse", "Octopus", "Ostrich", "Otter", "Owl", "Parrot", "Penguin", "Pig", "Porcupine", "Rabbit", "Raccoon", "Rhinoceros", "Shark", "Sheep", "Skunk", "Snake", "Tiger", "Turtle", "Whale", "Wolf", "Zebra"
    ]

    let currentAnimal;
    let ajaxCall;

    addButtonArray(animals, $('.btn-array'), 'animal-option btn btn-primary');


    function cardClick(image, element) {
        if ($(image).attr('src') === element.images.fixed_height_still.url) {
            $(image).attr('src', element.images.fixed_height_downsampled.url);
            $(image).attr('size', element.images.fixed_height_downsampled.size);
            $(image).attr('webp', element.images.fixed_height_downsampled.webp);
            $(image).attr('webp_size', element.images.fixed_height_downsampled.webp_size);
        }
        else {
            $(image).attr('src', element.images.fixed_height_still.url);
        }
    }

    function animalOptionClick(text) {
        $('.results').empty();
        currentAnimal = text;
        ajaxCall = $.get("https://api.giphy.com/v1/gifs/search?q=" + currentAnimal + "&api_key=" + APIkey + "&limit=" + limit);
        ajaxCall.done(function (data) {
            data.data.forEach(function (element, index) {
                let newCard = $('<div>');
                let newCardBody = $('<div>');
                let newImage = $('<img>');
                newImage.attr('class', 'animal-pic');
                newImage.attr('src', element.images.fixed_height_still.url);
                newImage.attr('width', element.images.fixed_height_still.width);
                newImage.attr('height', element.images.fixed_height_still.height);
                newCard.attr('class', 'card animal-card');
                newCard.attr('index', index);
                newCard.click(function () { cardClick(newImage, element) });
                newCardBody.attr('class', 'card-body card-rating');
                newCardBody.append('Rating: ' + element.rating);
                newCard.append(newCardBody);
                newCard.append(newImage);
                $('.results').append(newCard)
            });
        });
    };


    $(document).on('click', '#submitBtn', function () {
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
        btn.click(function() {animalOptionClick(text)})
        return btn;
    }

});