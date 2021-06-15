const calculator = (x: number, opiration: string, y: number): number => {
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
         let result = (y * 100) / x;
         return Number(result.toFixed(3));
         break;
      default:
         return;
         break;
   }
}
let sub: string;
let kondin: string = '';
let num1: number;
let num2: number;
let opiration: string;
let mass: string[];
let triger: boolean = false;
let trigerButtomRed: boolean = true;
const reg = /^-?\d*\.?\d*$/
const reg2 = /\D/;
let tank: string = '';
document.querySelectorAll('.keyboard__key').forEach(element => {
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
         if((num1 || num1 === 0) && opiration){
            num2 = +tank;
            document.querySelectorAll('.keyboard__key').forEach(element => {
               if(element.textContent === '='){
               element.classList.add('inter--colorRedy');
               }
            });
         }
      } else {
         if (tank === '--') {
            document.querySelector('.display__item').textContent = '';
            tank = '';
         }
         mass = tank.split('');
         let select = mass.pop();
         if ((((select === '+') || (select === '-')) || ((select === '÷') || (select === 'X')) || select === '%') &&
         ((document.querySelector('.display__item').textContent != '') && 
         (document.querySelector('.display__item').textContent != '-')) && 
         trigerButtomRed) {
               /*console.log('первая переменная ' + num1)
               console.log('вторая переменная ' + num2)
               console.log('оператор ' + opiration)
               console.log('логический вывод ' + !((num1 && opiration) === 'undefined'))*/
               
               
         if(!((num1 && opiration && num2))){
            if (opiration === '-') {
               opiration = '+';
            } else {
               opiration = select;//--
            }
            document.querySelectorAll('.keyboard__key').forEach(element => {
               element.classList.remove('inter--color');
               if(element.textContent === opiration){
               element.classList.add('inter--color');
               }
            });
            tank = mass.join('');
            num1 = +tank;//--
            triger = true;
            }
         } else {
            tank = document.querySelector('.display__item').textContent;
         }
         if(select === '>'){
         let arrTambur = document.querySelector('.display__item').textContent.split('');
         sub = arrTambur.pop();
         if(!(typeof sub === 'undefined') && (reg.test(sub))){
         kondin += sub;
         tank = document.querySelector('.display__item').textContent = arrTambur.join('');
         }
         
         }else if(select === '<'){
         let arrTambur = kondin.split('');
         sub = arrTambur.pop();
         if(!(typeof sub == 'undefined') && (reg.test(document.querySelector('.display__item').textContent))){
         tank = document.querySelector('.display__item').textContent += sub;
         kondin = arrTambur.join('');
            }
         }
         if (select === "С") {
            document.querySelectorAll('.keyboard__key').forEach(element => {
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
               document.querySelectorAll('.keyboard__key').forEach(element => {
                  element.classList.remove('inter--color');
               });
               element.classList.remove('inter--colorRedy');
               tank = document.querySelector('.display__item').textContent;
               num2 = +tank;
               
               tank = document.querySelector('.display__item').textContent = String(calculator(num1, opiration, num2));
               if(tank.length > 14){
               tank = document.querySelector('.display__item').textContent = String(calculator(num1, opiration, num2)/*.toFixed(3)*/)
               if(tank.length > 14){
                  document.querySelector('.display__item').classList.add('number--big');
                  if(tank.length > 25){
                  document.querySelector('.display__item').textContent = 'Как это у вас получилось?'
                     }
                  }
               }
               if(document.querySelector('.display__item').textContent === 'Infinity'){
                  document.querySelectorAll('.keyboard__key').forEach(element => {
                     if(element.textContent === 'c'){
                     element.classList.add('inter--colorError');
                     }
                  });
                  trigerButtomRed = false;
                  document.querySelector('.display__item').textContent = 'Вы серьезно!'
               }
               if(document.querySelector('.display__item').textContent === 'NaN'){
                  document.querySelectorAll('.keyboard__key').forEach(element => {
                     if(element.textContent === 'c'){
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
