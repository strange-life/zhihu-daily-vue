export function setTopStories(state, topStories) {
  state.topStories = topStories;
}

export function setCurrentStoryId(state, currentStoryId) {
  state.currentStoryId = currentStoryId;
}

export function setDailies(state, dailies) {
  state.dailies = dailies;
}

export function setDaily(state, { index, data: { date, dateText, stories } }) {
  state.dailies.splice(index, 1, {
    date,
    dateText,
    stories,
  });
}
