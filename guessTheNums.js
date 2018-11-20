/**
 * Created by 我是博文你是谁 on 2018/10/9.
 */
// 你正在和你的朋友玩 猜数字（Bulls and Cows）游戏：你写下一个数字让你的朋友猜。
// 每次他猜测后，你给他一个提示，告诉他有多少位数字和确切位置都猜对了（称为“Bulls”, 公牛）
// 有多少位数字猜对了但是位置不对（称为“Cows”, 奶牛）。你的朋友将会根据提示继续猜，直到猜出秘密数字。
// 请写出一个根据秘密数字和朋友的猜测数返回提示的函数，用 A 表示公牛，用 B 表示奶牛。
// 请注意秘密数字和朋友的猜测数都可能含有重复数字。

var getHint = function(secret, guess) {
    var secretArr = secret.split("");
    var guessArr = guess.split("");
    var bulls = 0;
    var cows = 0;
    var newSecretArr = [];
    var newGuessArr = [];
    var cowsSecretArr = [];
    var cowsGuessArr = [];
    for(var j = 0 ; j < secretArr.length; j++){
        var obj = {};
        obj.value = secretArr[j];
        obj.count = 1;
        newSecretArr.push(obj);
    }
    for(var j = 0 ; j < guessArr.length; j++){
        var obj = {};
        obj.value = guessArr[j];
        obj.count = 1;
        newGuessArr.push(obj);
    }
    var currentLength = newSecretArr.length<newGuessArr.length?newSecretArr.length:newGuessArr.length;
    for(var t=0;t<currentLength;t++){
        if(newGuessArr[t].value == newSecretArr[t].value){
            bulls = bulls + 1;
        }else{
            cowsSecretArr.push(newSecretArr[t]);
            cowsGuessArr.push(newGuessArr[t]);
        }
    }
    if(newGuessArr.length > currentLength){
        for(var i=currentLength;i<newGuessArr.length;i++){
            cowsGuessArr.push(newGuessArr[i]);
        }
    }else if(newSecretArr.length > currentLength){
        for(var i=currentLength;i<newSecretArr.length;i++){
            cowsSecretArr.push(newSecretArr[i]);
        }
    }else{
    }

    //词频统计
    if(cowsGuessArr.length >0 && cowsSecretArr.length >0){
        var cpSecret = [];
        var cpGuess = [];
        cpSecret.push(cowsSecretArr[0]);
        var length = cpSecret.length;
        for(var l=1;l<cowsSecretArr.length;l++){
            for(var k=0;k<length;k++){
                if(cowsSecretArr[l].value == cpSecret[k].value){
                    cpSecret[k].count++;
                    break;
                }else{
                    if(k == cpSecret.length-1){
                        cpSecret.push(cowsSecretArr[l]);
                        length = cpSecret.length;
                        break;
                    }else{}

                }
            }
        }

        cpGuess.push(cowsGuessArr[0]);
        var length1 = cpGuess.length;
        for(var l=1;l<cowsGuessArr.length;l++){
            for(var k=0;k<length1;k++){
                // if(cowsGuessArr[l]){
                if(cowsGuessArr[l].value == cpGuess[k].value){
                    cpGuess[k].count++;
                    break;
                }else{
                    if(k == length1-1){
                        cpGuess.push(cowsGuessArr[l]);
                        length1 = cpGuess.length;
                        break;
                    }else{}

                }
                // }

            }
        }
        // console.log(cpGuess);

        //母牛个数求和
        for(var i=0;i<cpSecret.length;i++){
            for(var j=0;j<cpGuess.length;j++){
                if(cpSecret[i].value == cpGuess[j].value){
                    if(cpSecret[i].count > cpGuess[j].count){
                        cows = cows + cpGuess[j].count;
                    }else{
                        cows = cows + cpSecret[i].count;
                    }
                }
            }
        }
        return bulls+"A"+cows+"B";
    }else{
        return bulls+"A"+cows+"B";
    }
};
console.log(getHint("7236","2962"));
