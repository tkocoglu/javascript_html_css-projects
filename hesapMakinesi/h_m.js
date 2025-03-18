var btnNum = document.querySelectorAll("#btnNum");
var screen = document.querySelector("#screen");
var btnOper = document.querySelectorAll("#btnOper");
var opState = false;
var oper = "";
var final = 0;
var ilkSayi = true;

btnNum.forEach(num => {
    num.addEventListener("click", showNum);

    function showNum() {
        this.style.fontSize = "25px";

        // Eğer ekran "0" ise veya tamamen sıfırlanması gerekiyorsa (AC sonrası)
        if (screen.textContent === "0" || ilkSayi) {
            screen.textContent = this.textContent; // Yeni sayıyı ekrana yaz
            ilkSayi = false;
        } else {
            // Mevcut ifadeye sayıyı ekle (örneğin "65+" varsa "65+3" yapar)
            screen.textContent += this.textContent;
        }

        opState = false;

        setTimeout(() => {
            this.style.fontSize = "25px";
        }, 500);
    }
});

btnOper.forEach(operator => {
    operator.addEventListener("click", calculator);

    function calculator() {
        var newOper = this.textContent;
        this.style.fontSize = "25px";

        // AC tuşu için sıfırlama
        if (newOper === "AC") {
            screen.textContent = "0";
            final = 0;
            oper = "";
            ilkSayi = true;
            opState = false;
            return;
        }

        // +/- tuşunun işlevi ekleniyor
        if (newOper === "+/-") {
            let currentValue = screen.textContent;
            if (currentValue.startsWith("-")) {
                // Negatifse pozitife çevir (örneğin "-5" -> "5")
                screen.textContent = currentValue.substring(1);
            }else if(currentValue ==="Hata"){
                screen.textContent = 0;
            } else {
                // Pozitifse negatife çevir (örneğin "5" -> "-5")
                screen.textContent = "-" + currentValue;
            } 
            return; 
        }

        // Operatör ekleme veya hesaplama
        if (newOper !== "=") {
            // Operatör ekleniyorsa, ekrana operatörü ekle
            if (!opState) {
                // Mevcut ekran içeriğini bir sayı olarak al ve final'e ata
                if (oper === "") {
                    final = Number(screen.textContent.split(/[\+\-\x\/]/).pop()); // Son sayıyı al
                }
                screen.textContent += newOper; // Örneğin "65+" -> "65+34" için operatör eklenir
                oper = newOper; // Operatörü güncelle
                opState = true;
            }
        } else {
            // "=" tuşuna basıldığında hesaplama yap
            let expression = screen.textContent; // Örneğin "65+34+32"
            try {
                // İfadeyi parçala ve hesapla
                let numbers = expression.split(/[\+\-\x\/]/).map(Number); // Sayıları al: [65, 34, 32]
                let operators = expression.match(/[\+\-\x\/]/g); // Operatörleri al: ["+", "+"]
                
                final = numbers[0]; // İlk sayıyı al
                for (let i = 0; i < operators.length; i++) {
                    let nextNum = numbers[i + 1];
                    switch (operators[i]) {
                        case "+":
                            final += nextNum;
                            break;
                        case "-":
                            final -= nextNum;
                            break;
                        case "x":
                            final *= nextNum;
                            break;
                        case "/":
                            final /= nextNum;
                            break;
                    }
                }

                screen.textContent = final; // Sonucu ekrana yaz
                ilkSayi = true; // Yeni işlem için sıfırlama
                oper = "";
            } catch (e) {
                screen.textContent = "Hata";
                ilkSayi = true;
            }
        }

        setTimeout(() => {
            this.style.fontSize = "25px";
        }, 500);
    }
});


var ball = document.querySelector("#ball");
var mode = document.querySelector(".mode");
var body = document.querySelector("body");

ball.addEventListener("click", changeTheme);

var leftside = true;
function changeTheme(){
    if(leftside == true){
        ball.style.left = "40px";
        ball.style.backgroundColor = "#111";
        leftside = false;
        mode.style.backgroundColor = "#fff";
        body.style.backgroundColor = "#111";
        

    }else {
        ball.style.left = "5px";
        ball.style.backgroundColor = "#fff";
        leftside = true;
        mode.style.backgroundColor = "#111";
        body.style.backgroundColor = "#fff" ;
    }
}