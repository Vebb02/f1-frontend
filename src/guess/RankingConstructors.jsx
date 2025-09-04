import Countdown from "./Countdown"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ErrorGuessNotAllowedYet } from "../error";
import RankCompetitors from "./RankCompetitors";
import qs from 'qs';

function RankingConstructors() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/guess/constructor')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
        setError(<ErrorGuessNotAllowedYet />);
      });
  }, []);

  function guessHandler(constructors) {

    axios.get('/api/public/csrf-token')
      .then(res => {
        const headerName = res.data.headerName;
        const token = res.data.token;
        axios.post('/api/guess/constructor', {}, {
          params: {
            rankedCompetitors: constructors
          },
          headers: {
            [headerName]: token
          },
          paramsSerializer: (params => qs.stringify(params, { arrayFormat: 'repeat' }))
        })
          .then(res => {
            alert('Gjetningen din ble lagret');
            navigate('/guess');
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      <title>Ranger konstruktørene</title>
      {data ?
        <>
          <h2>Ranger konstruktørene</h2>
          <Countdown initialTimeLeft={data.timeLeft} />
          <RankCompetitors initialCompetitors={data.competitors} guessHandler={guessHandler} />
        </>
        : ''}
      {error ? error : ''}
    </>
  )
}

export default RankingConstructors
