$('document').ready(function () {

    const APIkey = 'jcvWf6Wh12j6NKDPQw8Vyfb6x8GC7DiL';
    const limit = 10;

    let animals = [
        "Alligator", "Baboon", "Bat", "Bear", "Butterfly", "Camel", "Cat", "Cheetah", "Chicken", "Crab", "Crocodile", "Dog", "Dolphin", "Donkey", "Eagle", "Elephant", "Fish", "Flamingo", "Fox", "Frog", "Giraffe", "Goat", "Gorilla", "Hawk", "Hedgehog", "Horse", "Jellyfish", "Kangaroo", "Koala", "Lemur", "Lion", "Llama", "Manatee", "Monkey", "Moose", "Mouse", "Octopus", "Ostrich", "Otter", "Owl", "Parrot", "Penguin", "Pig", "Porcupine", "Rabbit", "Raccoon", "Rhinoceros", "Shark", "Sheep", "Skunk", "Snake", "Tiger", "Turtle", "Whale", "Wolf", "Zebra"
    ]

    let currentAnimal;
    let ajaxCall;
    let offset = 0;
    let totalCount = 0;

    $('#nextBtn').hide();
    $('#prevBtn').hide();
    $('.favorites').hide();

    let goToFavoritesBtn = createGoToFavoritesButton('♥','btn btn-danger go-to-favorites');

    addButtonArray(animals, $('.btn-array'), 'animal-option btn btn-primary');

    function toggleFavorite(button, card) {
        if ($(button).text() === "♥") {
            $(button).text("✘");
            $('.favorites').append($(card));
        }
        else {
            $(button).text("♥");
            $(card).remove();
        }
    }

    function toggleAnimate(image) {
        if ($(image).attr('src') === $(image).attr('stillUrl')) {
            $(image).attr('src', $(image).attr('gifUrl'));
        }
        else {
            $(image).attr('src', $(image).attr('stillUrl'));
        }
    }

    function animalOptionClick(text) {
        $('.favorites').hide();
        $('.results').empty();
        $('.results').show();
        currentAnimal = text;
        ajaxCall = $.get("https://api.giphy.com/v1/gifs/search?q=" + currentAnimal + "&api_key=" + APIkey + "&limit=" + limit + "&offset=" + offset);
        ajaxCall.done(function (data) {
            totalCount = data.pagination.total_count;

            data.data.forEach(function (element) {
                let newCard = $('<div>');
                let newCardBody = $('<div>');
                let newImage = $('<img>');
                let newFav = $('<button>');

                newImage.attr('class', 'animal-pic');
                newImage.attr('stillUrl', element.images.fixed_height_still.url);
                newImage.attr('src', newImage.attr('stillUrl'));
                newImage.attr('gifUrl', element.images.fixed_height.url)
                newImage.attr('width', element.images.fixed_height_still.width);
                newImage.attr('height', element.images.fixed_height_still.height);
                newImage.attr('size', element.images.fixed_height.size);
                newImage.attr('mp4', element.images.fixed_height.mp4);
                newImage.attr('mp4_size', element.images.fixed_height.mp4_size);
                newImage.attr('webp', element.images.fixed_height.webp);
                newImage.attr('webp_size', element.images.fixed_height.webp_size);
                newImage.click(function () { toggleAnimate(newImage) });
                
                newFav.text('♥');
                newFav.attr('class','btn-link btn-sm favBtn')
                newFav.click(function () {toggleFavorite(newFav,newCard)});

                newCardBody.attr('class', 'card-body card-rating');
                newCardBody.append('Rating: ' + element.rating + ' ');
                newCardBody.append(newFav);
                
                newCard.attr('class', 'card animal-card');
                newCard.append(newCardBody);
                newCard.append(newImage);
                $('.results').append(newCard)
            });
        });
        $('#nextBtn:hidden').show();
    };

    function goToFavoritesClick() {
        $('.favorites').show();
        $('.results').hide();
    }

    $(document).on('click', '#submitBtn', function () {
        event.preventDefault();
        let inputVal = $('#input-field').val();
        if (inputVal !== "") {
            animals.push(inputVal);
        }
        goToFavoritesBtn = createGoToFavoritesButton('♥','btn btn-danger go-to-favorites');
        addButtonArray(animals, $('.btn-array'), 'animal-option btn btn-primary');
    });

    $(document).on('click', '#nextBtn', function () {
        offset = Math.min(totalCount - limit, offset + limit);
        animalOptionClick(currentAnimal);
        $('#prevBtn:hidden').show();
        if (offset === totalCount - limit) {
            $('#nextBtn').hide();
        }
    });

    $(document).on('click', '#prevBtn', function () {
        offset = Math.max(0, offset - limit);
        animalOptionClick(currentAnimal);
        $('#nextBtn:hidden').show();
        if (offset === 0) {
            $('#prevBtn').hide();
        }
    });


    function addButtonArray(array, div, className) {
        div.empty();
        div.prepend(goToFavoritesBtn);
        array.forEach(function (element) {
            let btn = createAnimalOptionButton(element, className);
            div.append(btn);
        });
    }

    function createAnimalOptionButton(text, className) {
        let btn = $("<button>");
        btn.text(text);
        btn.attr("class", className);
        btn.click(function () { animalOptionClick(text) })
        return btn;
    }

    function createGoToFavoritesButton(text,className) {
        let btn = $('<button>');
        btn.text(text);
        btn.attr('class',className);
        btn.click(function () { goToFavoritesClick() })
        return btn;
    }

});