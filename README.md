# Smart Goals App

## To run
Clone repo and run `npm install` -> `npm run dev`

## Dev notes / known issues
* Styles are minimal, no reset and/or css framework is used
* Browserlist config, Autoprefixer configs are skipped
* Create form is poorly implemented: bad ui, no input validations (server-side
only) and codewise component needs major rework
* EditGoalStats and DeleteGoalConfirm are similar in structure, and need a 
wrapper component to make their scss modules DRYer
* Updating a stat results in goals rerendered because of goalsSlice structure,
retrospectively following the json-api spec would have been a better 
[back-end](https://github.com/ianaverno/smart-goal-api) implementation
* no eager loading implemented
* no tests on the front-end
