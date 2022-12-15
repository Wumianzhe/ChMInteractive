import { submitAct } from "./utils_graph.js"
import { setMethod } from "../graph/main"

// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const func_id = 'func'
const from_id = 'from'
const to_id = 'to'
const sub_btn_id = 'sub_btn'
const res_text_id = 'text_id'

const bisect_btn_id = 'btn_bes'

const methodClassArray = ['.Bisection','.Secant','.Newton']

function select(methodName) {
  active = methodName

  document.querySelectorAll(methodClassArray.join(", ")).forEach((node) => {
    node.visibility = "hidden"
  })
  document.querySelectorAll('.' + methodName).forEach((node) => {
    node.visibility = "visible"
  })
}
var active = "Bisection"

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
const func = document.getElementById(func_id)

const from = document.getElementById(from_id)

const to = document.getElementById(to_id)

const res_text = document.getElementById(res_text_id)

const sub_btn = document.getElementById(sub_btn_id)

const bisect_btn = document.getElementById(bisect_btn_id)
bisect_btn.onclick = (e) => {
  select("Bisection")
}

sub_btn.onclick = async (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  var method
  var obj

  switch (active) {
    case "Bisection":
      method = 'bisection'
      obj = { f: func.value, from: from.value, to: to.value };
      break;
    case "Ньютона":
      method = 'newton'
      obj = { f: func.value, to: to.value };
      break;
    case "Секущие":
      method = 'secant'
      obj = { f: func.value, fstp: from.value, sstp: to.value };
      break;
  }

  const response = await submitAct(method, obj)
  const data = await response.json()
  res_text.innerHTML = 'Root: ' + data.result
  res_text.style.visibility = 'visible'
  setMethod(data, method)

}
