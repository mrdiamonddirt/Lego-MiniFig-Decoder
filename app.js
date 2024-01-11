const figtable = {
    "Barbarian": [59,60,93],
    "Fitness Trainer": [61,62,94],
    "Mushroom Sprite": [63,64,95],
    "Goatherd": [65,66,96],
    "Harpy": [67,68,97],
    "Train Kid": [69,70,98],
    "Film Noir Detective": [71,72,99],
    "Sprinter": [73,74,100],
    "Pet Groomer": [75,76,101],
    "Tricertops Costume Fan": [77,78,102],
    "Black Falcon Gamer Girl": [79,80,103],
    "Vampire Knight": [81,82,104]
}

const scanner = new Html5QrcodeScanner("reader", {
    // Scanner will be initialized in DOM inside element with id of 'reader'
    qrbox: {
        width: 250,
        height: 250,
    }, // Sets dimensions of scanning box (set relative to reader element width)
    fps: 20, // Frames per second to attempt a scan
});

scanner.render(success, error);
// Starts scanner

function success(result) {
    document.getElementById("result").innerHTML = `
        <h2>Success!</h2>
        <p><a href="${result}">${result}</a></p>
        `;
    // Prints result as a link inside result element

    scanner.clear();
    // Clears scanning instance

    document.getElementById("reader").remove();
    // Removes reader element from DOM since no longer needed

    // get the numbers before the first space and slice the last 2 numbers from that value for example 68 from 6471968 146R3 13896418 011398
    var lastTwoDigits = result
        .split(" ")[0]
        .slice(-2)
        .replace(/^0+/, "");
    console.log(lastTwoDigits);

    // get the selection from the select drop down menu
    var select = document.getElementById("region-select");

    // if the selection is Europe, North America, or Denmark
    // compare the numbers to the relevant table and print the name of the result

    // if selection is 1 we only care ablout the first valie in the figtable array
    if (select.value == 1) {
        for (var key in figtable) {
            if (figtable[key][0] == lastTwoDigits) {
                document.getElementById("result").innerHTML = `
                    <h2>Success!</h2>
                    <p><a href="${result}">${result}</a></p>
                    <p>${key}</p>
                    `;
                break;
            }
        }
    }
}


// Function to retrieve the string based on the selected number

function error(err) {
    console.error(err);
    // Prints any errors to the console
}
