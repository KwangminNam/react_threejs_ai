import React from 'react'
import state  from '../store';
import { useSnapshot } from 'valtio';

export default function CustomButton({
  type,
  title,
  handleClick,
  customStyles
}) {
  const snap = useSnapshot(state);
  const generateStyle = (typeP) => {
    if (typeP === 'filled') {
      return {
        backgroundColor: snap.color,
        color: '#fff'
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      onClick={handleClick}
      style={generateStyle(type)}
    >
      {title}
    </button>
  )
}
