import React from 'react'
import { Link } from 'react-router-dom'

function stripHTMLTags(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.slice(0, 30); // Return only the first 100 characters
}

const TodoCard = ({ todo }) => {
  return (
    <Link
    to={`/view-todo/${todo._id}`}
  className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-orange-600"
  ></span>

  <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
      { todo.title }
      </h3>

    </div>

   
  </div>

  <div className="mt-4">
    <p className="text-pretty text-sm text-gray-500">
    {stripHTMLTags(todo.description)} <br /> ......
    </p>
  </div>

  <dl className="mt-6 flex gap-4 sm:gap-6">
    <div className="flex flex-col-reverse">
      <dt className="text-sm font-medium text-gray-600">Last Updated On : <br />{new Date(todo.updatedAt).toLocaleDateString()}</dt>

    </div>

   
  </dl>
</Link>
  )
}

export default TodoCard
