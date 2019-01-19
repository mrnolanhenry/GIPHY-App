$('document').ready(function () {

    const APIkey = 'jcvWf6Wh12j6NKDPQw8Vyfb6x8GC7DiL';
    const limit = 10;

    let animals = [
        "Alligator", "Baboon", "Bat", "Bear", "Butterfly", "Camel", "Cat", "Cheetah", "Chicken", "Crab", "Crocodile", "Dog", "Dolphin", "Donkey", "Eagle", "Elephant", "Fish", "Flamingo", "Fox", "Frog", "Giraffe", "Goat", "Gorilla", "Hawk", "Hedgehog", "Horse", "Jellyfish", "Kangaroo", "Koala", "Lemur", "Lion", "Llama", "Manatee", "Monkey", "Moose", "Mouse", "Octopus", "Ostrich", "Otter", "Owl", "Parrot", "Penguin", "Pig", "Porcupine", "Rabbit", "Raccoon", "Rhinoceros", "Shark", "Sheep", "Skunk", "Snake", "Tiger", "Turtle", "Whale", "Wolf", "Zebra"
    ]

    let currentAnimal;
    let ajaxCall;
    // init offset and totalCount vars that inform 'previous page' and 'next page' buttons
    let offset = 0;
    let totalCount = 0;

    // hide page buttons and favorites section for now
    $('#nextBtn').hide();
    $('#prevBtn').hide();
    $('.favorites').hide();

    // create button that will display favorited gifs
    let goToFavoritesBtn = createButton('♥', 'btn btn-danger go-to-favorites')
    goToFavoritesBtn.click(function () { goToFavoritesClick() })

    addButtonArray(animals, $('.btn-array'), 'animal-option btn btn-primary');

    // toggle a gif as a favorite - add to or remove from favorites section
    function toggleFavorite(button, card) {
        if ($(button).text() === "♥") {
            $(button).text("✘");
            $('.favorites').prepend($(card));
        }
        else {
            $(button).text("♥");
            $(card).remove();
        }
    }

    // toggle animation - play or pause a gif
    function toggleAnimate(image) {
        if ($(image).attr('src') === $(image).attr('stillUrl')) {
            $(image).attr('src', $(image).attr('gifUrl'));
        }
        else {
            $(image).attr('src', $(image).attr('stillUrl'));
        }
    }

    // on clicking an animal from the top section
    function animalOptionClick(text) {
        // Hide favorites section, clear and show results section
        $('.favorites').hide();
        $('.results').empty();
        $('.results').show();

        // If clicking on a new animal, return to the first page of results
        if (currentAnimal !== text) {
            offset = 0;
        }

        currentAnimal = text;
        // AJAX CALL
        ajaxCall = $.get("https://api.giphy.com/v1/gifs/search?q=" + currentAnimal + "&api_key=" + APIkey + "&limit=" + limit + "&offset=" + offset);
        // FUNCTION UPON RETURNING FROM AJAX CALL
        ajaxCall.done(function (data) {
            totalCount = data.pagination.total_count;

            // for each result returned
            data.data.forEach(function (element) {
                let newCard = $('<div>');
                let newCardBody = $('<div>');
                let newImage = $('<img>');
                let newFav = $('<button>');

                // image tag that is given a stillUrl and animated gifUrl attribute to toggle between with an onclick function
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

                // button tag that has an onclick function to toggle the gif as a favorite
                newFav.text('♥');
                newFav.attr('class', 'btn-link btn-sm favBtn')
                newFav.click(function () { toggleFavorite(newFav, newCard) });

                newCardBody.attr('class', 'card-body card-rating');
                newCardBody.append('Rating: ' + element.rating + ' ');
                newCardBody.append(newFav);

                // div tag holding each result
                newCard.attr('class', 'card animal-card');
                newCard.append(newCardBody);
                newCard.append(newImage);
                $('.results').append(newCard)
            });
        });
        $('#nextBtn:hidden').show();
    };

    // onclick function for the favorites button that gets added to the top
    // shows favorites section and hides results section
    function goToFavoritesClick() {
        $('.favorites').show();
        $('.results').hide();
    }

    $(document).on('click', '#submitBtn', function () {
        // prevent page from reloading by default when hitting submit
        event.preventDefault();

        // add input to animals array
        let inputVal = $('#input-field').val();
        if (inputVal !== "") {
            animals.push(inputVal);
        }
        // re-render buttons at the top for favorites and each animal
        goToFavoritesBtn = createButton('♥', 'btn btn-danger go-to-favorites')
        goToFavoritesBtn.click(function () { goToFavoritesClick() })
        addButtonArray(animals, $('.btn-array'), 'animal-option btn btn-primary');
    });

    // go to next page of results
    $(document).on('click', '#nextBtn', function () {
        // re-run AJAX call in animalOptionClick function with a new offset variable
        offset = Math.min(totalCount - limit, offset + limit);
        animalOptionClick(currentAnimal);

        // show previous page button
        $('#prevBtn:hidden').show();

        // hide next page button if on the last page of results
        if (offset === totalCount - limit) {
            $('#nextBtn').hide();
        }
    });

    // go to previous page of results
    $(document).on('click', '#prevBtn', function () {
        // re-run AJAX call in animalOptionClick function with a new offset variable
        offset = Math.max(0, offset - limit);
        animalOptionClick(currentAnimal);

        // show next page button
        $('#nextBtn:hidden').show();

        // hide previous page button if on the first page of results
        if (offset === 0) {
            $('#prevBtn').hide();
        }
    });

    // for each animal, add button to top section 
    function addButtonArray(array, div, className) {
        div.empty();
        div.prepend(goToFavoritesBtn);
        array.forEach(function (element) {
            let btn = createButton(element, className);
            btn.click(function () { animalOptionClick(element) })
            div.append(btn);
        });
    }

    function createButton(text, className) {
        let btn = $('<button>');
        btn.text(text);
        btn.attr('class', className);
        return btn;
    }
});