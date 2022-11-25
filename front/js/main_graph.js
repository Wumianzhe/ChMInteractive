import {submitAct} from "./utils_graph.js"

// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const func_id = 'func'
const from_id = 'from'
const to_id = 'to'
const sub_btn_id = 'sub_btn'

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
let func = document.getElementById(func_id);
func.oninput = (e) => func = e.target.value

let from = document.getElementById(from_id)
from.oninput = (e) => from = e.target.value

let to = document.getElementById(to_id);
to.oninput = (e) => to = e.target.value


const sub_btn = document.getElementById(sub_btn_id);

sub_btn.onclick = async (e) => {
  var func_str = func.replace(/\+/gi, '%2B');
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  
  const responce = await submitAct()//Функция отпраки данных на сервер для построения графа(пока пустая)
  //data = await responce.json();

  console.log(responce.json());
  console.log(func_str)
  console.log(to)
  console.log(from)
}