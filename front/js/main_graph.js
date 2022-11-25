import {submitAct} from "./utils_graph.js"

// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const func_id = 'func'
const from_id = 'from'
const to_id = 'to'
const sub_btn_id = 'sub_btn'

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
const func = document.getElementById(func_id);
func.oninput = (e) => func = e.target.value

const from = document.getElementById(from_id)
from.oninput = (e) => from = e.target.value

const to = document.getElementById(to_id);
to.oninput = (e) => to = e.target.value


const sub_btn = document.getElementById(sub_btn_id);

sub_btn.onclick = async (e) => {
  var func_str = func.value;
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  const obj = {f: func_str, from: from.value, to: to.value, epsilon:1e-6};
  const response = await submitAct(obj)//Функция отпраки данных на сервер для построения графа(пока пустая)
  const data = await response.json();

  console.log(data)
  console.log(func_str)
  console.log(to)
  console.log(from)
}