$(document).ready(function () {

    $('input#checkbox').click(function () {
        const options = $('#list_item option')
        // if checkbox 'Show XML' is on
        if ($('input#checkbox').is(':checked')) {
            // creating list of options
            const list = []
            options.each(function () {
                list.push($(this).val())
            })
            // splitting each pair into name and value and sorting
            const newList = list.map(element => element.split('='))
            options.each(function (i) {
                $(this).text(`<${newList[i][0]}>${newList[i][1]}</${newList[i][0]}>`)
            })
            // if checkbox 'Show XML' is off
        } else {
            // creating list of options
            const list = []
            options.each(function () {
                list.push($(this).val())
            })
            // splitting each pair into name and value
            const newList = list.map(element => element.split('<'))
                .map(element => element[1])
                .map(element => element.split('>'))
            options.each(function (i) {
                $(this).text(`${newList[i][0]}=${newList[i][1]}`)
            })
        }
    });

})

function add() {
    // removing non alphanumeric chars w/o '='
    const val = $('#user_input').val().replace(/[^A-Za-z0-9=]/g, '')
    $('#user_input').val('')
    // calculating number of '='
    const equals = val.length - val.replaceAll('=', '').length
    // checking if: string non empty,
    //              first and last char not '=',
    //              string has only one '=',
    //              checkbox 'Show XML' is off
    if (val !== ''
        && equals === 1
        && val.charAt(0) !== '='
        && val.charAt(val.length - 1) !== '='
        && !$('input#checkbox').is(':checked')
    ) {
        $('#list_item').append(`<option>${val}</option>`) // adding name=value pair
        // checking if: string non empty,
        //              first and last char not '=',
        //              string has only one '=',
        //              checkbox 'Show XML' is on
    } else if (val !== ''
        && equals === 1
        && val.charAt(0) !== '='
        && val.charAt(val.length - 1) !== '='
        && $('input#checkbox').is(':checked')) {
        // if checkbox 'Show XML' is on
        const valArr = val.split('=')
        $('#list_item').append(`<option></option>`)
        $('#list_item option:last').text(`<${valArr[0]}>${valArr[1]}</${valArr[0]}>`) // adding <name>value</name>
    }
}

function remove() {
    $('select#list_item option:selected').remove()
}

// if value === 0 then sortByName
// if value === 1 then sortByValue
function sortBy(value) {
    // creating list of options
    const list = []
    const options = $('#list_item option')
    options.each(function () {
        list.push($(this).val())
    })
    if (list[0].includes('=')) {
        // splitting each pair into name and value and sorting
        const newList = list
            .map(element => element.split('='))
            .sort((a, b) => a[value].localeCompare(b[value]))
        // changing list with new values
        options.each(function (i) {
            $(this).text(`${newList[i][0]}=${newList[i][1]}`)
        })
    } else {
        const newList = list.map(element => element.split('<'))
            .map(element => element[1])
            .map(element => element.split('>'))
        newList.sort((a, b) => a[value].localeCompare(b[value]))
        // changing list with new values
        options.each(function (i) {
            $(this).text(`<${newList[i][0]}>${newList[i][1]}</${newList[i][0]}>`)
        })
    }
}