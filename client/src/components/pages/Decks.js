import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Page from "../Page"
import { useDeck, useSetting } from "../../hooks"

export default () => {
  const { getDecks, decks } = useDeck()
  useEffect(() => {
    getDecks()
  }, [])
  return (
    <div>
      <ul>
        {decks.map((deck) => (
          <li key={`deck-item-${deck.id}`}>
            <Link to={`/decks/${deck.id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
