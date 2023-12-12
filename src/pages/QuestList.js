import React, {useContext, useState} from 'react'
import SettingsContext from '../services/SettingsContext';
import QuestListItem from '../components/quest/QuestListItem';

function QuestList() {
  const [settings, setSettings] = useContext(SettingsContext);
  const translations = settings?.translations[settings?.language];
  const sessionIds = JSON.parse(localStorage.getItem("sessionids") ?? "{}");
  const [filter, setFilter] = useState('all'); 

  return (
    <div className='p-5 flex flex-col w-full gap-3'>
        <h1 className='text-2xl font-bold text-center mb-3'>{translations.QUEST_LIST_SCREEN_TITLE}</h1>
        <div className='flex flex-row justify-end py-3'>
          <select className='bg-blue-500 p-3 text-white'
            onChange={event => setFilter(event.target.value)}>
            <option value="all">{translations.QUEST_LIST_SCREEN_OPTION_ALL}</option>
            <option value="active">{translations.QUEST_LIST_SCREEN_OPTION_UNSOLVED}</option>
            <option value="completed">{translations.QUEST_LIST_SCREEN_OPTION_SOLVED}</option>
          </select>
        </div>
        {Object.values(sessionIds).map((sessionId) => (
          <QuestListItem key={sessionId} sessionId={sessionId} filter={filter}/>
        ))}
    </div>
  )
}

export default QuestList