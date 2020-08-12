import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card';
import Page from '../Page';
import DeckNav from '../DeckNav';
import SettingsNav from '../SettingsNav';
import { useDispatch, useSelector } from 'react-redux';
import {
  initDeck,
  selectDeck,
  updateSettings,
  cycleDeck,
  pauseCycleDeck,
  selectCard,
  handleToggleSide,
  toggleTheme,
  handleCardIndexChange,
  handleDeckIndexChange,
  initDeckCard,
} from '../../store/actions'

function Topic(props) {
  return (
    <Page loaded={true}>
        <div>
            <form action="/xml" method="post" encType="multipart/form-data">
                <input type="file" name="xml" />
                <button type="submit">submit</button>
            </form>
        </div>
    </Page>
  );
}
export default Topic;
