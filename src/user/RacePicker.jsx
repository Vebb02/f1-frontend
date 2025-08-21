import axios from 'axios';
import { useEffect, useState } from 'react';

function RacePicker(props) {
  const { setRaceId } = props;
  const [races, setRaces] = useState(null);
  const [years, setYears] = useState(null);

  function changeYear(year) {
    axios.get(`/api/public/race/list/${year}`, {
      params: {
        completedOnly: true
      }
    })
      .then(res => setRaces(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    axios.get('/api/public/year/list')
      .then(res => {
        setYears(res.data);
        if (res.data) {
          changeYear(res.data[0]);
        }
      })
      .catch(err => console.error(err));
    }, []);

    return (
    <form>
      <label>Velg år:
        <br />
        {years ?
          <select onChange={(e) => changeYear(e.target.value)}>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
          : ''}
      </label>
      <br /><br />
      <label>Velg løp:
        <br />
        {races ?
          <select defaultValue={races[races.length - 1].id} onChange={(e) => setRaceId(e.target.value)}>
            {races.map((race) =>
              <option key={race.id} value={race.id}>{race.position}. {race.name}</option>
            )}
          </select>
          : ''}
      </label>
    </form>
  )
}

export default RacePicker
