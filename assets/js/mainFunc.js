const keys = {
    left: 37,
    right: 39
}

const skins = {
    static: "assets/img/mario1.png",
    moving: "assets/img/mario2.png"
}

var count = 5;
var isKeyDown = false;

document.onkeydown = function (e) {
    if(e.keyCode == keys.left || e.keyCode == keys.right){
        if(!isKeyDown){
            setSkin(skins.moving);
            isKeyDown = true;
        }  
    
        moveCharacter(e.keyCode);
    
        if(count == 0) {
            setSkin();
            count = 5;
        } else {
            count -= 1;
        }
    }
    
};


document.onkeyup = function (e) {
    setSkin(skins.static);
    isKeyDown = false;
    count = 5;
};


function moveCharacter(key) {
    var currentPos = $("#mario").css("left");
    var newPos = parseFloat(currentPos);
    var marioWidth = parseFloat($("#mario").css("width"));
    var pipeCurrentPos = parseFloat($("#pipe").css("left"));
    var pipeWidth = parseFloat($("#pipe").css("width"));
    var pipeHeight = parseFloat($("#pipe").css("height"));
    
    if(key == keys.left) {
        newPos -= 100;
        $("#mario").removeClass("unflip").addClass("flip");
    }
    else if(key == keys.right){
        newPos += 100;
        $("#mario").removeClass("flip").addClass("unflip");
    }

    newPos = newPos.toString() + "px";
    $("#mario").css({left: newPos});
    var marioCurrentPos = parseFloat(newPos);

    console.log(marioWidth, marioCurrentPos, pipeCurrentPos);
    if(((marioCurrentPos + marioWidth) >= pipeCurrentPos) && (marioCurrentPos <= (pipeCurrentPos + pipeWidth))) {
        $("#mario").css("bottom", (100 + pipeHeight).toString() + "px");
    } else {
        $("#mario").css("bottom", "100px");
    }
};


function setSkin(skin) {
    if(skin == null){
        skin = $("#mario").attr("src");
        if(skin == skins.static)
            skin = skins.moving;
        else    
            skin = skins.static;
    }
    $("#mario").attr("src", skin);
};