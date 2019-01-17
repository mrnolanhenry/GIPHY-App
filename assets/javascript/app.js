$('document').ready(function () {

    const APIkey = 'jcvWf6Wh12j6NKDPQw8Vyfb6x8GC7DiL';

    let animals = [
        "Alligator", "Anteater", "Donkey", "Baboon", "Bat", "Bear", "Butterfly", "Camel", "Cat", "Cheetah", "Chicken", "Crab", "Crocodile", "Dog", "Dolphin", "Eagle", "Elephant", "Fish", "Flamingo", "Fox", "Frog", "Giraffe", "Goat", "Gorilla", "Hawk", "Hedgehog", "Horse", "Jellyfish", "Kangaroo", "Koala", "Lemur", "Lion", "Llama", "Lobster", "Manatee", "Monkey", "Moose", "Mouse", "Narwhal", "Octopus", "Ostrich", "Otter", "Owl", "Panther", "Parrot", "Penguin", "Pig", "Porcupine", "Rabbit", "Raccoon", "Rhinoceros", "Shark", "Sheep", "Skunk", "Snake", "Tiger", "Turtle", "Whale", "Wolf", "Zebra"
    ]

    addButtonArray(animals, $('.btn-array'), 'animal-option btn btn-primary');

    function addButtonArray(array, div, className) {
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