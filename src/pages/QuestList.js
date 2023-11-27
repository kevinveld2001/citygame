import React from 'react'
import QuestListItem from '../components/quest/QuestListItem';

function QuestList() {
  const sessionIds = JSON.parse(localStorage.getItem("sessionids") ?? "{}");

  return (
    <div className='p-5 flex flex-col w-full'>
        <h1 className='text-2xl font-bold text-center mb-3'>Quests</h1>
        {Object.values(sessionIds).map((sessionId) => (
          <QuestListItem key={sessionId} sessionId={sessionId} />
        ))}
    </div>
  )
}

export default QuestList