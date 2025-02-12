$(document).ready(function(){
    var currentColor = "white";
    var currentBoardCells = ["board32", "board33", "board34", "board35"];
    var currentPegCells = ["peg32", "peg33", "peg34", "peg35"]
    var currentRow = 9;
    var possibleColors = ["blue", "green", "red", "yellow", "orange", "pink"];
    var hasWon = false;

    var cell1Color, cell2Color, cell3Color, cell4Color;

    //dictionary of colors
    var colors = {
        "rgb(0, 128, 0)": "green",
        "rgb(255, 255, 0)": "yellow",
        "rgb(255, 0, 0)": "red",
        "rgb(0, 0, 255)": "blue",
        "rgb(255, 192, 203)": "pink",
        "rgb(255, 165, 0)": "orange"
    }

    //create the random color code
    var code = [
        possibleColors[Math.floor(Math.random()*6)], 
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)]
    ];
    
    console.log(code);

    //create the cells and add them to the board
    for(let i = 0; i < 36; i++){
        let cell = "<div class=\"boardCell\" id=board"+i+"></div>"
        $(".board").append(cell);
    }

    //create cells for the pegs
    for(let i = 0; i < 36; i++){
        let cell = "<div class=\"pegCell\" id=peg"+i+"></div>"
        $(".pegs").append(cell);
    }

    //change the style of the board so you can view the rows
    $(".board").css("grid-template-rows", "repeat(9,60.18px)");
    $(".board").css("grid-template-columns", "repeat(4,70.18px)");
    $(".boardCell").css("border", "1px solid black");
    $(".boardCell").css("border-radius", "50%");
    $(".boardCell").css("background-color", "white");

    //change the style of the pegs
    $(".pegs").css("grid-template-rows", "repeat(18,29.59px)");
    $(".pegs").css("grid-template-columns", "repeat(2,20.59px");
    $(".pegCell").css("border", "1px solid black");
    $(".pegCell").css("border-radius", "50%")
    $(".pegCell").css("background-color", "gray")
 
    
    
    //add colors to the color board
    $(".color").each(function(){
        //set the color of the cell to its ID
        let color = $(this).attr("id");
        $(this).css("background-color", color);
        
    });

    //change the current color when the user clicks on the color board
    $(".color").click(function(){
        let color = $(this).attr("id");
        currentColor = color;
        $(".currentColor").css("background-color", color);
    });

    //change the color of a board cell on click
    $(".boardCell").click(function(){
        var id = $(this).attr("id");

        if(isValid(id)){
            $(this).css("background-color", currentColor);
        }
    });

    //do actions when the submit button is clicked
    $(".submit").click(function(){
        updatePegs();
        checkWin();
        changeCurrentRow();
    });

    //change the valid board cells to click on
    function changeCurrentRow(){
        currentRow -= 1;
        var mult = 4;

        currentBoardCells = [
            "board" + (currentRow*mult-4), 
            "board" + (currentRow*mult-3), 
            "board" + (currentRow*mult-2), 
            "board" + (currentRow*mult-1)];
        currentPegCells = [
            "peg" + (currentRow*mult-4), 
            "peg" + (currentRow*mult-3), 
            "peg" + (currentRow*mult-2), 
            "peg" + (currentRow*mult-1)];
    }

    //check whether the cell clicked on is valid
    function isValid(id){
        if(currentBoardCells.includes(id) && hasWon === false){
            return true;
        }
        return false;
    }

    //check if the player has won
    function checkWin(){
        if(code[0] === cell1Color &&
            code[1] === cell2Color &&
            code[2] === cell3Color &&
            code[3] === cell4Color){
            hasWon = true;
            alert("Congratulations, you have won!");
            alert("Thank you");
            $("#secretColor1").css("background-color", code[0]);
            $("#secretColor2").css("background-color", code[1]);
            $("#secretColor3").css("background-color", code[2]);
            $("#secretColor4").css("background-color", code[3]);
        }

        return hasWon; 
    }

    function updatePegs(){
        let cell1 = $("#"+currentBoardCells[0]);
        let cell2 = $("#"+currentBoardCells[1]);
        let cell3 = $("#"+currentBoardCells[2]);
        let cell4 = $("#"+currentBoardCells[3]);

        cell1Color = colors[cell1.css("background-color")];
        cell2Color = colors[cell2.css("background-color")];
        cell3Color = colors[cell3.css("background-color")];
        cell4Color = colors[cell4.css("background-color")];

        let peg1 = $("#"+currentPegCells[0]);
        let peg2 = $("#"+currentPegCells[1]);
        let peg3 = $("#"+currentPegCells[2]);
        let peg4 = $("#"+currentPegCells[3]);

        let pegs = [peg1, peg2, peg3, peg4];
        let filledPegs = [];
        let chosenCells = [];
        let codeCopy = [...code];
        if(code[0] === cell1Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            let index = codeCopy.indexOf(cell1Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(1);
            pegs[num-1].css("background-color", "red");
        }
        if(code[1] === cell2Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            let index = codeCopy.indexOf(cell2Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }
            chosenCells.push(2);
            pegs[num-1].css("background-color", "red");
        }
        if(code[2] === cell3Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            let index = codeCopy.indexOf(cell3Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }
            chosenCells.push(3);
            pegs[num-1].css("background-color", "red");
        }
        if(code[3] === cell4Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            let index = codeCopy.indexOf(cell4Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }
            chosenCells.push(4);
            pegs[num-1].css("background-color", "red");
        }

        if(codeCopy.includes(cell1Color) && !chosenCells.includes(1)){
            //choose a random peg that has not yet been filled
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            pegs[num-1].css("background-color", "white");
        }       
        if(codeCopy.includes(cell2Color) && !chosenCells.includes(2)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            pegs[num-1].css("background-color", "white");
        }    
        if(codeCopy.includes(cell3Color) && !chosenCells.includes(3)){
            //choose a random peg that has not yet been filled
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            pegs[num-1].css("background-color", "white");
        }    
        if(codeCopy.includes(cell4Color) && !chosenCells.includes(4)){
            //choose a random peg that has not yet been filled
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            pegs[num-1].css("background-color", "white");
        }     
    }
    function randomNum14(nums){
        //generate a number from 1-4
        let num = Math.floor(Math.random()*4) + 1;
        while(nums.includes(num)){
            num = Math.floor(Math.random()*4) + 1;
        }
        return num;
    }
});