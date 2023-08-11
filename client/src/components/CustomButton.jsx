import React from 'react'
import state from '../store';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';

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
        color: getContrastingColor(snap.color)
      }
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
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
