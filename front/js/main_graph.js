import {submitAct} from "./utils_graph.js"

// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const func_id = 'func'
const from_id = 'from'
const to_id = 'to'
const sub_btn_id = 'sub_btn'

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
const func = document.getElementById(func_id)

const from = document.getElementById(from_id)

const to = document.getElementById(to_id)


const sub_btn = document.getElementById(sub_btn_id);

sub_btn.onclick = async (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  const obj = {f: func.value, from: from.value, to: to.value};
  const response = await submitAct(obj)
  const data = await response.json()

  console.log(data)
  console.log(func.value)
  console.log(to.value)
  console.log(from.value)
}