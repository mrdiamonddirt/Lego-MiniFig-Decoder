// series 25 minifigures
const figtable = {
    "Barbarian": [59,60,93, "./images/figs/Barbarian.png"],
    "Fitness Trainer": [60,61,94, "./images/figs/Fitness_Trainer.png"],
    "Mushroom Sprite": [61,62,95, "./images/figs/Mushroom_Sprite.png"],
    "Goatherd": [62,63,96, "./images/figs/Goatherd.png"],
    "Harpy": [63,64,97, "./images/figs/Harpy.png"],
    "Train Kid": [64,65,98, "./images/figs/Train_Kid.png"],
    "Film Noir Detective": [65,66,99, "./images/figs/Film_Noir_Detective.png"],
    "Sprinter": [66,67,100, "./images/figs/Sprinter.png"],
    "Pet Groomer": [67,68,101, "./images/figs/Pet_Groomer.png"],
    "Tricertops Costume Fan": [68,69,102, "./images/figs/Tricertops_Costume_Fan.png"],
    "Black Falcon Gamer Girl": [69,70,103, "./images/figs/Falcon_Gamer_Girl.png"],
    "Vampire Knight": [70,71,104, "./images/figs/Vampire_Knight.png"],
}

document.getElementById("fig-table").innerHTML += `
    <tr>
        <th>Minifigure</th>
        <th>Europe</th>
        <th>North America</th>
        <th>Denmark</th>
        <th>Image</th>
    </tr>
    `;

// add all the data to the table
for (var key in figtable) {
    document.getElementById("fig-table").innerHTML += `
        <tr>
            <td>${key}</td>
            <td>${figtable[key][0]}</td>
            <td>${figtable[key][1]}</td>
            <td>${figtable[key][2]}</td>
            <td><img src="${figtable[key][3]}" style="width: 100px; height: auto;"></td>
        </tr>
        `;
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

const info_btn = document.getElementById("show-table");
// Gets info button element

info_btn.addEventListener("click", function () {
    // Adds event listener to info button
    // set display to block if it is none and none if it is block
    if (document.getElementById("fig-table").style.display == "none") {
        document.getElementById("fig-table").style.display = "block";
    } else {
        document.getElementById("fig-table").style.display = "none";
    }
}
);

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
    if (select.value == 0) {
        document.getElementById("result").innerHTML = `
        <h2>Please select a region</h2>
        `;
    }
    if (select.value == 1) {
        for (var key in figtable) {
            if (figtable[key][0] == lastTwoDigits) {
                document.getElementById("result").innerHTML = `
                    <h2>Success!</h2>
                    <p><a href="${result}">${result}</a></p>
                    <p>${key}</p>
                    <img id="fig-img" src="${figtable[key][3]}" style="width: 150px; height: auto;">
                    `;
                break;
            }
        }
    }
    if (select.value == 2) {
        for (var key in figtable) {
            if (figtable[key][1] == lastTwoDigits) {
                document.getElementById("result").innerHTML = `
                    <h2>Success!</h2>
                    <p><a href="${result}">${result}</a></p>
                    <p>${key}</p>
                    <img id="fig-img" src="${figtable[key][3]}" style="width: 150px; height: auto;">
                    `;
                break;
            }
        }
    }
    if (select.value == 3) {
        for (var key in figtable) {
            if (figtable[key][2] == lastTwoDigits) {
                document.getElementById("result").innerHTML = `
                    <h2>Success!</h2>
                    <p><a href="${result}">${result}</a></p>
                    <p>${key}</p>
                    <img id="fig-img" src="${figtable[key][3]}" style="width: 150px; height: auto;">
                    `;
                break;
            }
        }
    }
    document.getElementById("result").innerHTML += `
        <p><a href="index.html">Scan another</a></p>
        `;
}


// Function to retrieve the string based on the selected number

function error(err) {
    console.error(err);
    // Prints any errors to the console
}
