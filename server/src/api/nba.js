const express = require('express');
const NBA = require('nba');



const fetchTeamsGames = () => {
  let teamGames = {};
  return NBA.stats.leagueGameLog({ PlayerOrTeam: 'T' })
      .then(res => {
        const { resultSets } = res;
        const headers = resultSets[0].headers;
        const rows = resultSets[0].rowSet;
        rows.forEach((row) => {
          const currTeamName = row[headers.indexOf('TEAM_NAME')];
          if (teamGames[currTeamName]) {
            teamGames[currTeamName].gameIds = teamGames[currTeamName].gameIds.concat(row[headers.indexOf('GAME_ID')]);
          } else {
            teamGames[currTeamName] = {
              gameIds: [row[headers.indexOf('GAME_ID')]],
              teamId: row[headers.indexOf('TEAM_ID')]
            };
          }
        });
        return teamGames;
      });
};

const router = express.Router();

router.get('/teams', async (req, res) => {
  const teams = await fetchTeamsGames();
  res.json(teams);
});

module.exports = router;
