# Creative components

## Developer Radar

`/api/radar`

The radar uses six real GitHub dimensions:

- Code: authored commits in the selected period.
- Ship: owned public repositories.
- Collaboration: pull requests plus reviews.
- Impact: stars plus followers.
- Streak: longest contribution streak.
- Activity: contribution-calendar total.

Values are logarithmically normalized for visual comparison. The raw values are
shown on the right side of the SVG.

## Language Constellation

`/api/constellation`

Each node represents a repository language. Radius is derived from the language
percentage after aggregating the user’s owned repositories.

## Contribution Pulse

`/api/pulse`

The latest 364 contribution-calendar days are aggregated into 52 weekly points.
The component shows the latest week and its change from the previous week.

## Contribution Timeline

`/api/timeline`

Contribution-calendar days are aggregated into the latest twelve calendar months.
The strongest month is highlighted.

## Repository Stack

`/api/repos`

Uses owned, non-fork repositories ordered by `UPDATED_AT`. Each row displays the
real repository name, description, primary language, stars, forks and update date.

## Year In Code

`/api/year`

Combines real 12-month contribution total, active-day count, strongest month,
longest streak, daily average and top repository language.

## Signal Compare

`/api/compare`

Fetches two GitHub users independently and compares contributions, commits, pull
requests, reviews, stars and followers. No side is used as fallback for the other.

## Metrics Ticker

`/api/ticker`

An animated compact line containing the user’s current real metrics. Suitable for
README headers and project documentation.
