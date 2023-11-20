import React from 'react'
import { Link } from 'react-router-dom'

function QuestList() {
  const sessionIds = JSON.parse(localStorage.getItem("sessionids") ?? "{}");
  Object.values(sessionIds).map((quest, index) => {console.log(quest, index)});
  return (
    <div className='p-5 flex flex-col w-full'>
        <h1 className='text-2xl font-bold text-center mb-3'>Quests</h1>
        {Object.values(sessionIds).map((quest) => (
          <Link key={quest} to={`/quest/${quest}`} className='text-blue-500'>
            {quest}
          </Link>
        ))}
    </div>
  )
}

export default QuestList