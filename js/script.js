var calculator = function (x, opiration, y) {
    switch (opiration) {
        case '+':
            return x + y;
            break;
        case '-':
            return x - y;
            break;
        case '÷':
            return x / y;
            break;
        case 'X':
            return x * y;
            break;
        case '%':
            var result = (y * 100) / x;
            return Number(result.toFixed(3));
            break;
        default:
            return;
            break;
    }
};
var sub;
var kondin = '';
var num1;
var num2;
var opiration;
var mass;
var triger = false;
var trigerButtomRed = true;
var reg = /^-?\d*\.?\d*$/;
var reg2 = /\D/;
var tank = '';
var startIt = false;
var stopIt = true;
var intDat = false;
var init = 0;
document.querySelectorAll('.keyboard__key').forEach(function (element) {
    element.addEventListener('click', function () {
        if (triger === true && !(((this.textContent === '-') || (this.textContent === '+')) ||
            ((this.textContent === '÷') || (this.textContent === 'X')))) {
            document.querySelector('.display__item').textContent = '';
            tank = '';
            triger = false;
        }
        tank += this.textContent;
        if (reg.test(tank) && tank.length < 15) {
            if (tank === '.') {
                tank = '0.';
            }
            if (tank === '-.') {
                tank = '-0.';
            }
            document.querySelector('.display__item').classList.remove('number--big');
            document.querySelector('.display__item').textContent = tank;
            if ((num1 || num1 === 0) && opiration) {
                num2 = +tank;
                document.querySelectorAll('.keyboard__key').forEach(function (element) {
                    if (element.textContent === '=') {
                        element.classList.add('inter--colorRedy');
                    }
                });
            }
        }
        else {
            if (tank === '--') {
                document.querySelector('.display__item').textContent = '';
                tank = '';
            }
            mass = tank.split('');
            var select = mass.pop();
            if ((((select === '+') || (select === '-')) || ((select === '÷') || (select === 'X')) || select === '%') &&
                ((document.querySelector('.display__item').textContent != '') &&
                    (document.querySelector('.display__item').textContent != '-')) &&
                trigerButtomRed) {
                /*console.log('первая переменная ' + num1)
                console.log('вторая переменная ' + num2)
                console.log('оператор ' + opiration)
                console.log('логический вывод ' + !((num1 && opiration) === 'undefined'))*/
                if (!((num1 && opiration && num2))) {
                    if (opiration === '-') {
                        opiration = '+';
                    }
                    else {
                        opiration = select; //--
                    }
                    document.querySelectorAll('.keyboard__key').forEach(function (element) {
                        element.classList.remove('inter--color');
                        if (element.textContent === opiration) {
                            element.classList.add('inter--color');
                        }
                    });
                    tank = mass.join('');
                    num1 = +tank; //--
                    triger = true;
                }
            }
            else {
                tank = document.querySelector('.display__item').textContent;
            }
            if (select === '>') {
                var arrTambur = document.querySelector('.display__item').textContent.split('');
                sub = arrTambur.pop();
                if (!(typeof sub === 'undefined') && (reg.test(sub))) {
                    kondin += sub;
                    tank = document.querySelector('.display__item').textContent = arrTambur.join('');
                }
            }
            else if (select === '<') {
                var arrTambur = kondin.split('');
                sub = arrTambur.pop();
                if (!(typeof sub == 'undefined') && (reg.test(document.querySelector('.display__item').textContent))) {
                    tank = document.querySelector('.display__item').textContent += sub;
                    kondin = arrTambur.join('');
                }
            }
            if (select === "С") {
                document.querySelectorAll('.keyboard__key').forEach(function (element) {
                    element.classList.remove('inter--color');
                    element.classList.remove('inter--colorRedy');
                    element.classList.remove('inter--colorError');
                });
                document.querySelector('.display__item').textContent = '';
                tank = '';
                num1 = null;
                num2 = null;
                triger = false;
                trigerButtomRed = true;
            }
            if (select === "=") {
                if ((num1 || num1 === 0) && opiration) {
                    document.querySelectorAll('.keyboard__key').forEach(function (element) {
                        element.classList.remove('inter--color');
                    });
                    element.classList.remove('inter--colorRedy');
                    tank = document.querySelector('.display__item').textContent;
                    num2 = +tank;
                    (String(calculator(num1, opiration, num2))).split('').forEach(function (element) {
                        if (element === '.') {
                            startIt = true;
                            stopIt = false;
                        }
                        else if (startIt === true) {
                            init++;
                            if (element === '0') {
                                intDat = true;
                            }
                        }
                    });
                    if (intDat) {
                        tank = document.querySelector('.display__item').textContent = String(calculator(num1, opiration, num2).toFixed(init));
                        init = 0;
                        intDat = false;
                    }
                    else {
                        tank = document.querySelector('.display__item').textContent = String(calculator(num1, opiration, num2));
                    }
                    if (stopIt) {
                        tank = document.querySelector('.display__item').textContent = String(calculator(num1, opiration, num2));
                    }
                    startIt = false;
                    stopIt = true;
                    if (tank.length > 14) {
                        (String(calculator(num1, opiration, num2))).split('').forEach(function (element) {
                            if (element === '.') {
                                startIt = true;
                                stopIt = false;
                            }
                            else if (startIt === true) {
                                init++;
                                if (element === '0') {
                                    tank = document.querySelector('.display__item').textContent = String(calculator(num1, opiration, num2).toFixed(init));
                                    init = 0;
                                }
                            }
                        });
                        if (stopIt) {
                            tank = document.querySelector('.display__item').textContent = String(calculator(num1, opiration, num2));
                        }
                        startIt = false;
                        stopIt = true;
                        //-----------------------------------------------------------------------------------------------------------------------------------------------
                        if (tank.length > 14) {
                            document.querySelector('.display__item').classList.add('number--big');
                            if (tank.length > 25) {
                                document.querySelector('.display__item').textContent = 'Как это у вас получилось?';
                            }
                        }
                    }
                    if (document.querySelector('.display__item').textContent === 'Infinity') {
                        document.querySelectorAll('.keyboard__key').forEach(function (element) {
                            if (element.textContent === 'c') {
                                element.classList.add('inter--colorError');
                            }
                        });
                        trigerButtomRed = false;
                        document.querySelector('.display__item').textContent = 'Вы серьезно!';
                    }
                    if (document.querySelector('.display__item').textContent === 'NaN') {
                        document.querySelectorAll('.keyboard__key').forEach(function (element) {
                            if (element.textContent === 'c') {
                                element.classList.add('inter--colorError');
                            }
                        });
                        trigerButtomRed = false;
                        document.querySelector('.display__item').textContent = 'Ха-ха! смешно :)';
                    }
                    opiration = null;
                    num1 = null;
                    num2 = null;
                    triger = false;
                }
            }
        }
    });
});
//Сделать минимальную анимацию.
