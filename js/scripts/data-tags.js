
// function to remote duplicates in an array
function eliminateDuplicates(arr) {
    var i,
        len = arr.length,
        out = [],
        obj = {};

    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }


    for (i in obj) {
        out.push(i);
    }
    return out;
}


var tags = "";
var list = d3.select(".blogs").selectAll('li');

list.each(function () {
    tags += "," + d3.select(this).attr("data-tags");
});

// remove whitespace
tags = tags.replace(/\s/g, '');

// split tags into a new array
var tagArray = tags.split(",");

// sorts the array
tagArray.sort();

// remove dupes
tagArray = eliminateDuplicates(tagArray);	//Remove dupes

// eliminate blank first entry
tagArray.splice(0, 1);

// loop through the cleaned tags and add each tag as a list element
var ul = document.getElementById("tags")

for (var i = 0; i < tagArray.length; i++) {
    var thisTag = tagArray[i];
    ul.innerHTML += '<li><a style="text-decoration: none" href="#" id="' + thisTag + '">' + thisTag + '</a></li>'
}

